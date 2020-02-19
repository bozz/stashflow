#!/usr/bin/env node

const yargs = require('yargs');
const util = require('util');
const fs = require('fs');

let readFile = util.promisify(fs.readFile);
let accessFile = util.promisify(fs.access);

const db = require('./lib/db');
const csvImporter = require('./lib/csvImporter');

const args = yargs
  .usage('Usage: <command> [options]')
  .command('import', 'import CSV file', {
    file: {
      alias: 'f',
      describe: 'path to CSV file',
      demandOption: true
    },
    template: {
      alias: 't',
      describe: 'path to import template file (JSON)',
      demandOption: true
    },
    preview: {
      alias: 'p',
      boolean: true,
      describe: 'only generate preview output, no actual import'
    }
  })
  .demandCommand(1, 'You need to specify a command')
  .help().argv;

const importTemplate = {
  account: 'bankA',
  skipLinesStart: 13,
  skipLinesEnd: 2,
  mapping: {
    date: {
      col: 0,
      processors: [
        {
          type: 'formatDate',
          args: {
            format: 'dd.MM.yyyy'
          }
        }
      ]
    },
    target: 3,
    description: 8,
    type: 4,
    amount: {
      col: 11,
      processors: [
        { type: 'convertFloat' },
        {
          type: 'ifColEquals',
          args: {
            col: 12,
            equals: 'S',
            then: [
              {
                type: 'negateNumber'
              }
            ]
          }
        }
      ]
    },
    currency: 10
  }
};

if (args && args._.length) {
  switch (args._[0]) {
    case 'import':
      console.log('Importing file:', args.file);

      accessFile(args.file, fs.constants.F_OK)
        .then(noFile => {
          if (noFile) {
            throw new Error('Error: File not found:', args.file);
          }
          return readFile(args.file);
        })
        .then(fileData => {
          const data = fileData.toString();

          return db
            .init({
              dbConfig: {
                dialect: 'sqlite',
                storage: './data/stashflow.db',
                logging: false
              }
            })
            .then(() => {
              return csvImporter.import(db, data, importTemplate, {
                file: args.file,
                preview: args.p
              });
            });
        })
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.error(err);
        });
      break;
  }
}

/**
 * Notes for template config JSON
 * - skipLinesStart (Integer)
 * - skipLinesEnd (Integer)
 * - mapping (Object) from CSV to DB columns (column processors?)
 * - account (String) key or name of account to import to
 */
