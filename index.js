#!/usr/bin/env node

import ora from 'ora';
import yargs from 'yargs';
import chalk from 'chalk';

import { existsSync } from 'fs';
import { resolve } from 'path';
import { spawnSync } from 'child_process';

const argv = yargs
  .scriptName('remov')
  .usage('Usage: $0 <pattern>')
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
  .help()
  .parseSync();

(() => {
  const spinner = ora(
    chalk.greenBright('Analyzing project definition...'),
  ).start();
  const path = resolve(process.cwd(), 'package.json');

  if (!existsSync(path)) {
    spinner.fail(
      chalk.redBright('Cannot find `package.json` in the current directory'),
    );
    return;
  }

  spinner.text = chalk.greenBright('Getting matching packages...');

  const { pattern, dry } = argv;
  const regex = new RegExp(pattern);

  const packageDef = require(path);
  const { dependencies, devDependencies, peerDependencies } = packageDef;
  const target = [
    ...Object.keys(dependencies).filter(n => regex.test(n)),
    ...Object.keys(devDependencies).filter(n => regex.test(n)),
    ...Object.keys(peerDependencies).filter(n => regex.test(n)),
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
      console.log(chalk.greenBright(` └── ${name}`));
    });
  }
})();
