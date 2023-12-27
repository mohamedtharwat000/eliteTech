# Elite Tech

Welcome to Elite Tech! This repository provides a versatile command-line interface (CLI) and (RESTful API) for efficient management of databases, supporting both file-based and MySQL database types.

### The docs site for the repo and the API are hosted here [elite tech](https://elitetech.lordy.tech/)

this project was created by [Mohamed Tharwat](https://www.linkedin.com/in/mohamedtharwat000/) and [Mohammed Khalid](https://www.linkedin.com/in/lordyyyyy/) as a portfolio project in the ALX Software Engineering program [ALX (alx africa)](https://www.alxafrica.com/)

## Key Features

- Interactive CLI for efficient CRUD operations
- Live API documentation site with an interactive demo
- RESTful API with 12+ hardware categories and advanced filtering/sorting
- Seamless switching between JSON and MySQL databases using environment variables
- Pagination and randomized ID generation for scalable data management
- Modular codebase with shared base classes for extensibility
- Clean and consistent data model across product categories

example from the website API demo
![API demo](https://github.com/mohamedtharwat000/eliteTech/blob/main/docs/assets/images/demo.png)

## Getting Started

### Prerequisites

- Node.js (>=12.0)
- MySQL (for database option)

### Installation

```bash
# Clone the repository
git clone https://github.com/user/eliteTech

# change directory
cd eliteTech

# Install dependencies
npm install
```

### Usage

- to run the console application
```bash
npm run console
```
- to run the API server
```bash
npm run server
```

#### Switch Databases
Elite Tech primarily uses JSON files as the default database type. However, if you prefer a MySQL database, we've got you covered. You can seamlessly switch between the two options using either npm scripts or environment variables.

1. modify the script in your `package.json` file to include your MySQL database user and password.

```json
"scripts": {
"mysql_init": "db=mysql dbHost=localhost dbUser=<your_username> dbPassword=<your_password> dbDatabase=elite_tech node ./models/database/sql/database.cjs",
"mysql_server": "db=mysql dbHost=localhost dbUser= dbPassword= dbDatabase=elite_tech nodemon ./api/server.js",
"mysql_console": "db=mysql dbHost=localhost dbUser= dbPassword= dbDatabase=elite_tech node console.js",
...
}
```

2. Initialize MySQL

```bash
npm run mysql_init
```

3. you can run the console application and the API server with MySQL.

- to run the console application
```bash
npm run mysql_console
```
- to run the API server
```bash
npm run mysql_server
```


### CLI Usage

The CLI allows efficient management of product data via the command line.

Usage:

```bash
npm run console # for file-based database

npm run mysql_console # for MySQL-based database

./console.js <command> [type] [options] # for non-interactive usage
```

**Commands:**

- `create`: Add a new product
- `read`: Fetch products from the database
- `update`: Edit a product
- `delete`: Remove a product

**Options:**

- `[type]`: Product type, e.g. cpu, gpu, case
- `--id`: Specify product ID

**Examples:**

```bash
# Create a new CPU
./console.js create cpu

# Update CPU with ID 10
./console.js update cpu --id 10

# Read RAM products
./console.js read ram
```

The CLI automatically prompts for additional details like product name, price etc when creating or updating.

### API Documentation

Elite Tech provides a powerful API for programmatically accessing product data.

See [Live API Docs](https://mohamedtharwat000.github.io/eliteTech/)

**Endpoints**

| Method | Endpoint       | Description              | Auth |
| ------ | -------------- | ------------------------ | ---- |
| GET    | /api/:type/:id | Get single product       | ❌   |
| GET    | /api/:type     | Get all products by type | ❌   |
| POST   | /api/:type/    | Create a new product     | ✅   |
| PUT    | /api/:type/:id | Update a product         | ✅   |
| DELETE | /api/:type/:id | Delete a product         | ✅   |

**For usage and examples see the API docs page**

**Options**

In addition to type and ID, the API supports these options:

- Pagination using start, end, limit
- Sorting via sort and order parameters
- Search by name and manufacturer
- Filter products by price and rating

### Data Model

Elite Tech standardizes product data across categories for consistency:

```js
Product {

  // Unique ID
  id: Number,

  // Product name/model
  name: String,

  // Brand name
  manufacturer: String,

  // Image URL
  imageURL: String,

  // Avg rating
  rating: Number,

  // Price in USD
  price: Number,

  // Inventory count
  stock: Number
}
```

Additional category-specific attributes are added, for example:

```js
CPU {

  // Product fields...

  // CPU cores
  coreCount: String

  // Clock speeds
  performanceCoreClock: String,
  performanceBoostClock: String

}
```

Refer to the models/products directory for definitions of each product type.

### Database Layer

The database layer provides a unified interface for switching between JSON and MySQL without coupling the application logic.

**Key Classes**

- `FileStorage` - Manages products stored as JSON
- `MySQLStorage` - Manages products in a MySQL database
- `Storage` - Factory class that initializes either of the above automatically based on environment variables

This abstraction allows seamlessly swapping databases by simply changing an environment variable.

### Authentication

Elite Tech uses encrypted JWT tokens to authenticate users for protected API routes.

### Customization

**Adding Models**

To add new product categories:

1. Create a model class under models/products extending Base
2. Sync the model to MySQL by updating models/database/sql/database.sql
3. Register the class in DataManager to enable CRUD operations


## Contributing

Contributions are welcome! Here are some ways you can contribute to this project:

- Report bugs and issues
- Fix bugs and issues
- Add new validation functionality
- Improve styling and overall UX
- Refactor code to improve quality
- Write documentation and improve existing docs

To contribute:
1. Fork the repository
2. Create a new branch
3. Make your changes and commit them
4. Push your branch and submit a pull request

I will review pull requests and provide feedback.

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

created by Mohamed Tharwat, Mohammed Khalid

