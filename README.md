# Elite Tech

Welcome to Elite Tech! This repository provides a versatile command-line interface (CLI) and (RESTful API) for efficient management of databases, supporting both file-based and MySQL database types.

### this code was tested on Linux (ubuntu 22.04) with nodejs runtime installed

### before running or testing the code run (npm install) to install all dependencies

## Switching Between Database Types

Elite Tech primarily uses JSON files as the default database type. However, if you prefer a MySQL database, we've got you covered. You can seamlessly switch between the two options using either npm scripts or environment variables.

### Using NPM Scripts

1. First, modify the script in your `package.json` file to include your MySQL database user and password.

```json
"scripts": {
"mysql_init": "db=mysql dbHost=localhost dbUser=<your_username> dbPassword=<your_password> dbDatabase=elite_tech node ./models/database/sql/database.cjs",
// ... (other scripts)
}
```

2. Now, you can easily initialize and run your application with MySQL using the following npm scripts:

```sh
npm run mysql_init # Initialize MySQL database
npm run console # Run the console in interactive mode with MySQL
```

### Using Environment Variables

Alternatively, if you prefer to run the code without npm scripts, set the following environment variables:

- `db`: Choose between 'mysql' or 'file'.
- `dbHost`: Specify the MySQL database host (e.g., 'localhost').
- `dbUser`: Provide your MySQL username.
- `dbPassword`: Your MySQL database user password.
- `dbDatabase`: Specify the MySQL database to be used (e.g., 'elite_tech').

Now, you can run your application without npm scripts, and the code will dynamically adapt to the configured environment variables.

## Data Management using CLI (console.js)

### Interactive Mode:

```sh
./console.js
```

### Non-Interactive Mode:

```sh
./console.js <create|update|read|delete> <product type (e.g., cpu)>
```

**CLI Commands:**

- **Create:** Add a new product.
- **Update:** Update an existing product.
- **Delete:** Delete a product.
- **Read:** Read data from the database.

**Interactive Mode:**

In interactive mode, a prompt will guide you through each command.

**Non-Interactive Mode:**

For non-interactive mode, specify the command followed by the product type. For commands requiring additional information, such as product ID, you will be prompted accordingly.

**Example:**

```sh
./console.js create cpu
```

This command will create a new CPU product. You will be prompted to provide details such as the CPU model, manufacturer, and specifications.

## API Usage

To interact with the Elite Tech application programmatically, you can use the provided API. The API includes various endpoints for searching, reading, updating, deleting, and creating data of different types.

**Endpoints:**

| Endpoint                   | Description                                   |
| -------------------------- | --------------------------------------------- | 
| POST /api/:type/              | Create a new product                          |
| PUT /api/:type/:id            | Update by type and ID                         |
| DELETE /api/:type/:id         | Delete by type and ID                         |
| GET /api/:type/:id            | Retrieve by type and ID                                   |
| GET /api/:type/               | Retrieve all by type




**Example:**

# Get all CPUs

curl http://localhost:3000/api/cpu/

**Supported Product Types:**

- case
- cpu
- cooler
- gpu
- ram
- storage
- motherboard
- powerSupply
- monitor
- mice
- keyboard
- headphone
