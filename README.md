## Elite Tech

### Seamless Database Configuration and Data Management

This repository provides a user-friendly approach to managing database types and data operations, ensuring a smooth and efficient development experience.

**Switching Database Types**

Effortlessly switch between different database types using environment variables:

```sh
export db=<database type> # Choose between 'mysql' or 'file'. Default is 'file'.
```

**using MYSQL Database**

```sh
export dbHost=<database host> # Specify the host of your database. Default is 'localhost'.
export dbUser=<database username> # Provide your database username.
export dbPassword=<database user password> # Input your database user password.
export dbDatabase=<database name> # Specify the database to be used, default is 'elite_tech'.
```

**Data Management with DataManager.js**

This project seamlessly integrates with the `dataManager.js` module, providing a comprehensive set of functions for managing product data:

### Import dataManager module

`import data from './dataManager.js';`

### Create and save a new product

`console.log(await data.create('mice', { name: '', type: '' }));`

### Update a product with id = 1 with new data

`console.log(await data.update('mice', { id: 1, name: 'new name' }));`

### Delete a product with id = 1

`console.log(await data.delete('mice', { id: 1 }));`

### Get product data with id = 1

`console.log(await data.read('mice', { id: 1 }));`

### Get all products data

`console.log(await data.read('mice', {}));`

### Get the count of products

`console.log(await data.read('mice', { count: 1 }));`

### Get all products data starting from product number start

`console.log(await data.read('mice', { start: 299 }));`

### Get all products data from start to product number end

`console.log(await data.read('mice', { end: 1 }));`

### Get all products data from start to product number end with a specified count

`console.log(await data.read('mice', { start: 1, count: 1 }));`
