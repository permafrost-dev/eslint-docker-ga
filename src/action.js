const cp = require('child_process');

const runCommand = str => cp.execSync(str, { cwd: process.cwd(), encoding: 'utf-8', stdio: 'inherit' });
const hasOption = (name, args) => args.includes(name) || args.includes(`--${name}`) || args.includes(`-${name}`);
const removeOption = (name, args) => args.filter(arg => arg !== `${name}` && arg !== `--${name}` && arg !== `-${name}`);

const displayEslintVersion = () => {
    process.stdout.write(`ESLint `);
    runCommand('/app/node_modules/.bin/eslint --version');

    process.stdout.write(`---\n`);
}

const configurations = {
    standard: '/app/.eslintrc-default.config.js',
    typescript: '/app/.eslintrc-typescript.config.js',
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
    // runCommand(`npm install`);
    //runCommand(`npm install @typescript-eslint/eslint-plugin --save-dev`);
    //runCommand(`npm install @typescript-eslint/parser --save-dev`);

    displayEslintVersion();
    runCommand(`/app/node_modules/.bin/eslint ${args.join(' ')}`);
} catch (err) {
    console.log(`eslint failed: ${err.message}`);
}
