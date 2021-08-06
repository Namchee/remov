#!/usr/bin/env node

import ora from 'ora';
import yargs from 'yargs';
import chalk from 'chalk';

import { existsSync } from 'fs';
import { resolve } from 'path';

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
    }
  })
  .help()
  .parseSync();

(() => {
  const spinner = ora(
    'Analyzing project definition',
  ).start();
  const cwd = process.cwd();
  
  if (!existsSync(resolve(cwd, 'package.json'))) {
    spinner.fail(
      chalk.redBright('Cannot find `package.json` in the current directory'),
    );
    return;
  }
})();
