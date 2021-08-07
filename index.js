#!/usr/bin/env node

import ora from 'ora';
import yargs from 'yargs';
import chalk from 'chalk';

import { hideBin } from 'yargs/helpers';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { spawnSync } from 'child_process';

const argv = yargs(hideBin(process.argv))
  .scriptName('remov')
  .usage('Usage: $0 <pattern>')
  .command(
    '$0 <pattern>',
    'Uninstall all packages that matches the provided pattern',
  )
  .positional('pattern', {
    type: 'string',
    description: 'Package pattern',
  })
  .options({
    dry: {
      alias: 'd',
      describe: 'Execute a dry run',
      type: 'boolean',
      default: false,
      demandOption: false,
    },
    global: {
      alias: 'g',
      describe: 'Do a global package uninstallation instead of current working directory',
      type: 'boolean',
      default: false,
      demandOption: false,
    }
  })
  .parseSync();

(async () => {
  const spinner = ora(
    chalk.greenBright('Analyzing project definition...'),
  ).start();
  const path = new URL('./package.json', import.meta.url);

  if (!existsSync(path)) {
    spinner.fail(
      chalk.redBright('Cannot find `package.json` in the current directory'),
    );
    return;
  }

  spinner.text = chalk.greenBright('Getting matching packages...');

  const { pattern, global, dry } = argv;
  const regex = new RegExp(pattern);

  const packageDef = JSON.parse(readFileSync(path));
  const { dependencies, devDependencies, peerDependencies } = packageDef;
  const target = [
    ...Object.keys(dependencies || {}).filter(n => regex.test(n)),
    ...Object.keys(devDependencies || {}).filter(n => regex.test(n)),
    ...Object.keys(peerDependencies || {}).filter(n => regex.test(n)),
  ];

  if (dry) {
    spinner.succeed(chalk.greenBright('Analysis complete\n'));
    console.log(chalk.cyanBright(
      `📦 There are ${target.length} packages that matches the criteria`
    ));
  } else if (target.length) {
    const isNpm = existsSync(resolve(cwd, 'package-lock.json'));
    const isYarn = existsSync(resolve(cwd, 'yarn.lock'));
    const isPnpm = existsSync(resolve(cwd, 'pnpm-lock.yaml'));

    const cmd = isNpm || (!isYarn && !isPnpm) ?
      /^win/.test(process.platform) ? 'npm.cmd' : 'npm' :
      isYarn ? 'yarn' : 'pnpm';

    spinner.text = chalk.greenBright(`Uninstalled ${target.length} packages...`);
    spawnSync(cmd, 'remove', target.join(' '));
    spinner.succeed(chalk.greenBright(`Successfully uninstalled ${target.length} packages`));
  }

  if (target.length) {
    target.forEach((name) => {
      console.log(chalk.cyanBright(` └── ${name}`));
    });
  }
})();
