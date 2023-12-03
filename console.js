#!/usr/bin/env node

import data from './models/dataManager.js';
import { program, command } from 'bandersnatch';
import enquirer from 'enquirer';
const prompt = enquirer.prompt;

const cmdDefault = command()
  .default()
  .description('CLI for managing the backend database.\n')
  .action(() => console.log('write <help> for usage info'));

const cmdTypes = command('types')
  .description('Retrieves the types of all products.')
  .action(async () => {
    (await data.types()).forEach((obj) => {
      console.log(obj.id, obj.type);
    });
  });

const cmdCreate = command('create')
  .description('Add a new product to the database.')
  .argument('type', {
    prompt: 'product type: ',
    description: 'product type',
  })
  .action(async (args) => {
    if (!args.type) throw new Error('please provide type');
    const obj_id = await data.create(args.type);
    const obj = await data.read(args.type, { id: obj_id });
    for (const key in obj) {
      if (key === 'id') continue;
      obj[key] = (
        await prompt({
          type: key === 'password' ? 'password' : 'input',
          name: key,
          message: `input ${key}: `,
        })
      )[key];
    }
    console.log(await data.update(args.type, obj));
  });

const cmdRead = command('read')
  .description('reads from the database.')
  .argument('type', {
    prompt: 'product type: ',
    description: 'product type',
  })
  .action(async (args) => {
    if (!args.type) throw new Error('please provide type');
    const product_id = (
      await prompt({
        type: 'input',
        name: 'id',
        message: 'input id: ',
      })
    )['id'];
    if (product_id) {
      console.log(await data.read(args.type, { id: product_id }));
      return;
    }
    const types = ['start', 'end', 'count'];
    const limit = {};
    for (const key of types) {
      limit[key] =
        (
          await prompt({
            type: 'input',
            name: key,
            message: `input ${key}: `,
          })
        )[key] || undefined;
    }
    console.log(await data.read(args.type, limit));
  });

const cmdUpdate = command('update')
  .description('Update a product in the database.')
  .argument('type', {
    prompt: 'product type: ',
    description: 'product type',
  })
  .action(async (args) => {
    if (!args.type) throw new Error('please provide type');
    const product_id = (
      await prompt({
        type: 'input',
        name: 'id',
        message: 'input id: ',
      })
    )['id'];
    if (!product_id) {
      throw new Error('please provide id');
    }
    const obj = await data.read(args.type, { id: product_id });
    if (!obj) return;
    for (const key in obj) {
      if (key === 'id') continue;
      obj[key] = (
        await prompt({
          type: key === 'password' ? 'password' : 'input',
          name: key,
          message: `input ${key}: `,
        })
      )[key];
    }
    console.log(await data.update(args.type, obj));
  });

const cmdDelete = command('delete')
  .description('delete a product in the database.')
  .argument('type', {
    prompt: 'product type: ',
    description: 'product type',
  })
  .action(async (args) => {
    if (!args.type) throw new Error('please provide type');
    const product_id = (
      await prompt({
        type: 'input',
        name: 'id',
        message: 'input id: ',
      })
    )['id'];
    if (!product_id) {
      throw new Error('please provide id');
    }
    console.log(await data.delete(args.type, { id: product_id }));
  });

const app = program()
  .add(cmdDefault)
  .add(cmdTypes)
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
