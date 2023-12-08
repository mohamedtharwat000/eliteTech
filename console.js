#!/usr/bin/env node

import data from './models/dataManager.js';
import { program, command } from 'bandersnatch';
import enquirer from 'enquirer';
const prompt = enquirer.prompt;

const typeArg = {
  description: 'Product type',
  prompt: true,
  choices: (await data.types()).map((record) => record.type),
};

/**
 * Default command for the CLI.
 */
const cmdDefault = command()
  .default()
  .description('CLI for managing the backend database.\n')
  .action(() => console.log('write <help> for usage info'));

/**
 * Command for creating a new product in the database.
 */
const cmdCreate = command('create')
  .description('Add a new product to the database.')
  .argument('type', typeArg)
  .action(async (args) => {
    const obj_id = await data.create(args.type);

    const obj = (await data.read(args.type, { id: obj_id }))[0];

    const prompts = Object.keys(obj)
      .filter((key) => key !== 'id')
      .map((key) => ({
        type: key === 'password' ? 'password' : 'input',
        name: key,
        message: `Enter ${key}: `,
      }));

    const responses = await prompt(prompts);

    const updatedId = await data.update(args.type, { ...obj, ...responses });

    console.log(`${args.type} created with ID: ${updatedId}`);
  });

/**
 * Command for updating an existing product in the database.
 */
const cmdUpdate = command('update')
  .description('Update a product in the database.')
  .argument('type', typeArg)
  .option('id', {
    description: 'id',
    prompt: true,
  })
  .action(async (args) => {
    if (!args.id) throw new Error('Missing id argument.');

    const obj = (await data.read(args.type, { id: args.id }))[0];
    if (!obj.id) return console.log(`ID ${obj.id} not found.`);

    const prompts = Object.keys(obj)
      .filter((key) => key !== 'id')
      .map((key) => ({
        type: key === 'password' ? 'password' : 'input',
        name: key,
        message: `Enter ${key}: `,
      }));

    const responses = await prompt(prompts);

    const updatedId = await data.update(args.type, { ...obj, ...responses });

    console.log(`Updated ${args.type} with ID ${updatedId}`);
  });

/**
 * Command for deleting a product from the database.
 */
const cmdDelete = command('delete')
  .description('Delete a product from the database.')
  .argument('type', typeArg)
  .option('id', {
    description: 'id',
    prompt: true,
  })
  .action(async (args) => {
    if (!args.id) throw new Error('Missing id argument.');

    const deletedId = await data.delete(args.type, { id: args.id });

    if (deletedId) {
      console.log(`${args.type} with ID ${args.id} deleted.`);
    } else {
      console.log(`${args.type} with ID ${args.id} not found.`);
    }
  });

/**
 * Command for reading records from the database.
 */
const cmdRead = command('read')
  .description('Reads records from the database with options.')
  .argument('type', typeArg)
  .option('search', {
    description: 'Search by',
    choices: ['no search', 'manufacturer', 'name', 'id'],
    prompt: true,
  })
  .action(async (args) => {
    const criteria = {};

    if (args.search !== 'no search') {
      const searchTerm = await prompt({
        type: 'input',
        name: 'searchTerm',
        message: `Enter ${args.search}: `,
      });
      criteria[args.search] = searchTerm.searchTerm;
    }

    if (args.search === 'no search' || args.search !== 'id') {
      const options = await prompt([
        {
          type: 'select',
          name: 'sort',
          message: 'Choose field to sort by',
          choices: ['no sort', 'price', 'rating'],
        },
        {
          type: 'select',
          name: 'order',
          message: 'Sort type (ASC or DESC)',
          choices: ['no order', 'ASC', 'DESC'],
        },
        {
          type: 'select',
          name: 'filterBy',
          message: 'Choose field to filter by',
          choices: ['no filter', 'price', 'rating'],
        },
        {
          type: 'select',
          name: 'filterType',
          message: 'Filter type (gt, lt, eq)',
          choices: ['no filter', 'gt', 'lt', 'eq'],
        },
        {
          type: 'input',
          name: 'filterValue',
          message: 'Enter value for filtering',
          default: 'no value',
        },
        {
          type: 'input',
          name: 'start',
          message: 'Enter start index.',
          default: 'start',
        },
        {
          type: 'input',
          name: 'end',
          message: 'Enter end index.',
          default: 'end',
        },
        {
          type: 'input',
          name: 'limit',
          message: 'Enter the limit.',
          default: 'no limit',
        },
      ]);

      for (const [key, value] of Object.entries(options)) {
        if (value.startsWith('no') || value == 'start' || value == 'end') {
          continue;
        }
        criteria[key] = value;
      }
    }
    console.log(await data.read(args.type, criteria));
  });

/**
 * Main program for the CLI.
 */
const app = program()
  .add(cmdDefault)
  .add(cmdCreate)
  .add(cmdUpdate)
  .add(cmdDelete)
  .add(cmdRead)
  .runOrRepl()
  .catch((error) => {
    console.error('[failed]', String(error));
    if (!program().isRepl()) {
      process.exit(1);
    }
  });
