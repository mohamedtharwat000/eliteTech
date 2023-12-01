# Elite Tech

This repository offers a user-friendly command-line interface (CLI) for managing database types and performing various data operations (CURD), ensuring a smooth and efficient development experience.

## Switching Database Types

By default , Elite Tech uses JSON files as the database type. If you want to switch to a MYSQL database type, you can do so using the following command:

- import the mysql file for creating the database and it's tables

```sh
mysql -u <username> -p < ./modles/database/sql/database.sql
```

- then fill mysql database with data from json files

```sh
node ./modles/database/sql/fillDatabase.cjs
```

- switch between different database types using environment variables

```sh
export db=<database type> # Choose between 'mysql' or 'file'.
export dbHost=<database host> # Specify the host of mysql database. => 'localhost'.
export dbUser=<database username> # Provide your mysql username.
export dbPassword=<database user password> # your mysql database user password.
export dbDatabase=<database name> # mysql database to be used =>'elite_tech'.
```

## Data Management using CLI (console.js)

### For interactive mode:

```sh
./console.js
```

### For non-interactive mode:

```sh
./console.js create|update|read|delete
```

### CLI Commands

- **Create - Add a New Product**

```sh
./console.js create
```

This command allows you to add a new product to the database. You'll be prompted to input details such as the product type, and then further details about the product itself.

- **Update - Update a Product**

```sh
./console.js update
```

Use this command to update an existing product in the database. Provide the product type, and you'll be prompted to input updated details for the specified product.

- **Delete - Delete a Product**

```sh
./console.js delete
```

This command lets you delete a product from the database. Specify the product type and provide the product ID when prompted.

- **Read - Read from the Database**

```sh
./console.js read
```

Read data from the database based on the specified product type. You can input the product ID directly or provide start, end, and count values for a range of products.
