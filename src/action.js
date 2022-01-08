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

if (args[0] === 'none') {
    args.shift(); //no extra packages to install
} else {
    if (args[0].includes('eslint') && args[0].includes('-')) {
        const packageNames = args[0].split(',').filter(name => name.includes('eslint'));
        process.chdir('/app');
        runCommand(`npm i -D ${packageNames.join(' ')}`);
    }
}

runCommand(`ln -s /app/node_modules /github/workspace/node_modules`);

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
    runCommand(`/github/workspace/node_modules/.bin/eslint ${args.join(' ')}`);
} catch (err) {
    console.log(`eslint failed: ${err.message}`);
}

runCommand(`rm /github/workspace/node_modules`);
