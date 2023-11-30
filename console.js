// import { program, command } from 'bandersnatch';
// import data from './dataManager.js';

// const cmd = command()
//   .default()
//   .description('Outputs "bar".')
//   .action(() => console.log('bar'));

// const app = program().description('foo').add(cmd);

// app.run();

import data from './dataManager.js';

// put all data needed to creat and save to database new product
console.log(await data.create('mice', { name: '', type: '' }));

// update product with id = 1 with new data
console.log(await data.update('mice', { id: 1, name: 'new name' }));

// delete product with id = 1
console.log(await data.delete('mice', { id: 1 }));

// get product data with id = 1
console.log(await data.read('mice', { id: 1 }));

// get all products data
console.log(await data.read('mice', {}));
