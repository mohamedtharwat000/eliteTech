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

    const updatedId = await data.update(args.type, { ...responses, ...obj });

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
    if (!obj.id) {
      console.log(`Product with ID ${obj.id} not found.`);
      return;
    }
    const prompts = Object.keys(obj)
      .filter((key) => key !== 'id')
      .map((key) => ({
        type: key === 'password' ? 'password' : 'input',
        name: key,
        message: `Enter ${key}: `,
      }));

    const responses = await prompt(prompts);

    const updatedId = await data.update(args.type, { ...responses, ...obj });

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
  .option('id', {
    description: 'id of product',
    prompt: true,
  })
  .option('sortBy', {
    description: 'Choose field to sort by',
    choices: ['name', 'price', 'rating'],
    default: 'name',
    prompt: true,
  })
  .option('sortType', {
    description: 'Sort type (ASC or DESC)',
    choices: ['ASC', 'DESC'],
    default: 'ASC',
    prompt: true,
  })
  .option('filterBy', {
    description: 'Choose field to filter by',
    choices: ['name', 'price', 'rating'],
    default: 'name',
    prompt: true,
  })
  .option('filterType', {
    description: 'Filter type (gt, lt, eq)',
    choices: ['gt', 'lt', 'eq'],
    default: 'eq',
    prompt: true,
  })
  .option('filterValue', {
    description: 'Enter value for filtering',
    default: '',
    prompt: true,
  })
  .option('start', {
    description: 'Enter start index for pagination',
    default: 0,
    prompt: true,
  })
  .option('end', {
    description: 'Enter end index for pagination',
    default: undefined,
    prompt: true,
  })
  .option('count', {
    description: 'Enter count for pagination',
    default: undefined,
    prompt: true,
  })
  .action(async (args, options) => {
    const criteria = {};

    if (args.id) {
      console.log(await data.read(args.type, { id: args.id }));
      return;
    }

    // Handle pagination options
    criteria.start = options.start;
    criteria.end = options.end;
    criteria.count = options.count;

    // Set sorting options if provided
    if (options.sortBy) {
      criteria.sortBy = options.sortBy;
      criteria.sortType = options.sortType;
    }

    // Set filtering options if provided
    if (options.filterBy && options.filterType && options.filterValue) {
      criteria.filterBy = options.filterBy;
      criteria.filterType = options.filterType;
      criteria.filterValue = options.filterValue;
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
