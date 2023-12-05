#!/usr/bin/env node

import data from './models/dataManager.js';
import { program, command } from 'bandersnatch';
import enquirer from 'enquirer';
const prompt = enquirer.prompt;

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
  .argument('type', {
    description: 'Product type',
    prompt: true,
    choices: (await data.types()).map((record) => record.type),
  })
  .action(async (args) => {
    debugger;
    const obj_id = await data.create(args.type);

    const obj = await data.read(args.type, { id: obj_id });

    const prompts = Object.keys(obj)
      .filter((key) => key !== 'id')
      .map((key) => ({
        type: key === 'password' ? 'password' : 'input',
        name: key,
        message: `Enter ${key}: `,
      }));

    const responses = await prompt(prompts);

    const filteredResponses = Object.fromEntries(
      Object.entries(responses).filter(([key, value]) => value !== '')
    );

    const updatedId = await data.update(args.type, {
      ...obj,
      ...filteredResponses,
    });

    console.log(`${args.type} created with ID: ${updatedId}`);
  });

/**
 * Command for updating an existing product in the database.
 */
const cmdUpdate = command('update')
  .description('Update a product in the database.')
  .argument('type', {
    description: 'Product type',
    prompt: true,
    choices: (await data.types()).map((record) => record.type),
  })
  .option('id', {
    description: 'id of product',
    prompt: true,
  })
  .action(async (args) => {
    if (!args.id) throw new Error('Missing required argument: id');

    const obj = await data.read(args.type, { id: args.id });
    if (!obj.id) return console.log(`Product with ID ${obj.id} not found.`);

    const prompts = Object.keys(obj)
      .filter((key) => key !== 'id')
      .map((key) => ({
        type: key === 'password' ? 'password' : 'input',
        name: key,
        message: `Enter ${key}: `,
      }));

    const responses = await prompt(prompts);

    const filteredResponses = Object.fromEntries(
      Object.entries(responses).filter(([key, value]) => value !== '')
    );

    const updatedId = await data.update(args.type, {
      ...obj,
      ...filteredResponses,
    });

    console.log(`Updated ${args.type} with ID ${updatedId}`);
  });

/**
 * Command for deleting a product from the database.
 */
const cmdDelete = command('delete')
  .description('Delete a product from the database.')
  .argument('type', {
    description: 'Product type',
    prompt: true,
    choices: (await data.types()).map((record) => record.type),
  })
  .option('id', {
    description: 'id of product',
    prompt: true,
  })
  .action(async (args) => {
    if (!args.id) throw new Error('Missing required argument: id');

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
  .argument('type', {
    description: 'Product type',
    prompt: true,
    choices: (await data.types()).map((record) => record.type),
  })
  .argument('search', {
    description: 'Search by',
    choices: ['no search', 'name', 'id'],
    default: 'no search',
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

    if (args.search === 'no search') {
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
          default: '',
        },
        {
          type: 'input',
          name: 'start',
          message: 'Enter start index for pagination',
          default: 0,
        },
        {
          type: 'input',
          name: 'end',
          message: 'Enter end index for pagination',
          default: undefined,
        },
        {
          type: 'input',
          name: 'limit',
          message: 'Enter count for pagination',
          default: undefined,
        },
      ]);

      for (const [key, value] of Object.entries(options)) {
        if (value !== undefined && value !== null) {
          criteria[key] = value;
        }
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
