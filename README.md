# Elite Tech CLI: Seamless Database Configuration and Data Management

This repository offers a user-friendly command-line interface (CLI) for managing database types and performing various data operations (CURD), ensuring a smooth and efficient development experience.

## Switching Database Types

By default , Elite Tech uses JSON files as the database type. If you want to switch to a MYSQL database type, you can do so using the following command:

### but first

- import the mysql file for creating the database and it's tables

```sh
mysql -u <username> -p
```

```sh
export db=<database type> # Choose between 'mysql' or 'file'. for example  'file'.
export dbHost=<database host> # Specify the host of your database. for example 'localhost'.
export dbUser=<database username> # Provide your database username.
export dbPassword=<database user password> # Input your database user password.
export dbDatabase=<database name> # Specify the database to be used; for example 'elite_tech'.
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

CLI Commands
Create - Add a New Product
sh
Copy code
./console.js create
This command allows you to add a new product to the database. You'll be prompted to input details such as the product type, and then further details about the product itself.

Update - Update a Product
sh
Copy code
./console.js update
Use this command to update an existing product in the database. Provide the product type, and you'll be prompted to input updated details for the specified product.

Delete - Delete a Product
sh
Copy code
./console.js delete
This command lets you delete a product from the database. Specify the product type and provide the product ID when prompted.

Read - Read from the Database
sh
Copy code
./console.js read
Read data from the database based on the specified product type. You can input the product ID directly or provide start, end, and count values for a range of products.

```

```
