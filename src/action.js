const cp = require('child_process');

const runCommand = str => cp.execSync(str, { cwd: process.cwd(), encoding: 'utf-8', stdio: 'inherit' });
const hasOption = (name, args) => args.includes(name) || args.includes(`--${name}`) || args.includes(`-${name}`);
const removeOption = (name, args) => args.filter(arg => arg !== `${name}` && arg !== `--${name}` && arg !== `-${name}`);

const displayEslintVersion = () => {
    console.log(`ESLint ${runCommand('eslint --version').trim()}`);
    console.log('---');
}

const configurations = {
    standard: '/app/eslint-default.config.js',
    typescript: '/app/eslint-typescript.config.js',
};

let args = process.argv.slice(2);

if (args[0] === '--') {
    args.shift();
}

if (!hasOption('config', args)) {
    if (hasOption('typescript', args)) {
        args = removeOption('--typescript', args);

        if (! hasOption('--ext', args)) {
            args.unshift('--ext ts,js,cjs,mjs');
        }

        args.unshift('--config ' + configurations.typescript);
    } else {
        if (! hasOption('--ext', args)) {
            args.unshift('--ext js,cjs,mjs');
        }

        args.unshift('--config ' + configurations.standard);
    }
}

args.unshift('--no-error-on-unmatched-pattern');

if (process.env.DEBUG_ACTION) {
    console.log(`args=${args.join(' ')}`);
}

try {
    displayEslintVersion();
    runCommand(`eslint ${args.join(' ')}`);
} catch (err) {
    console.log(`eslint failed: ${err.message}`);
}
