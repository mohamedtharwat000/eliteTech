#!/usr/bin/env node

import { program, command } from 'bandersnatch';
import data from './dataManager.js';
import enquirer from 'enquirer';
const prompt = enquirer.prompt;

const cmdDefault = command()
  .default()
  .description('CLI for managing the backend database.\n')
  .action(() => console.log('write <help> for usage info'));

const cmdCreate = command('create')
  .description('Add a new product to the database.')
  .argument('type', {
    prompt: 'product type: ',
    description: 'product type',
  })
  .action(async (args) => {
    let obj = await data.create(args.type);
    obj = await data.read(args.type, { id: obj });
    const promptData = {};
    for (const key in obj) {
      promptData[key] =
        key === 'id'
          ? obj[key]
          : (
              await prompt({
                type: key === 'password' ? 'password' : 'input',
                name: key,
                message: `input ${key}: `,
              })
            )[key];
    }
    console.log(await data.update(args.type, promptData));
  });

const cmdUpdate = command('update')
  .description('Update a product in the database.')
  .argument('type', {
    prompt: 'product type: ',
    description: 'product type',
  })
  .action(async (args) => {
    const obj = await data.read(args.type, { count: 1 });
    let promptData = {};
    for (const key in obj[0]) {
      let inputData = await prompt({
        type: 'input',
        name: key,
        message: `input ${key}: `,
      });
      promptData[key] = inputData[key];
    }
    console.log(await data.update(args.type, promptData));
  });

const cmdDelete = command('delete')
  .description('delete a product in the database.')
  .argument('type', {
    prompt: 'product type: ',
    description: 'product type',
  })
  .option('id', { prompt: true })
  .action(async (args) => {
    console.log(await data.delete(args.type, { id: args.id }));
  });

const cmdRead = command('read')
  .description('reads from the database.')
  .argument('type', {
    prompt: 'product type: ',
    description: 'product type',
  })
  .action(async (args) => {
    let product_id = await prompt({
      type: 'input',
      name: 'id',
      message: 'input id: ',
    });
    if (product_id.id) {
      console.log(await data.read(args.type, { id: product_id.id }));
      return;
    }

    const types = ['start', 'end', 'count'];
    const promptData = {};
    for (const key of types) {
      let inputData = await prompt({
        type: 'input',
        name: key,
        message: `input ${key}: `,
      });
      if (inputData[key]) promptData[key] = inputData[key];
    }
    console.log(await data.read(args.type, promptData));
  });

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
