const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

(async function processFiles() {
  const connection = await mysql.createConnection({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.dbDatabase,
  });

  const files = fs.readdirSync(path.resolve(__dirname, '..') + '/json');

  for (const file of files) {
    if (file.endsWith('.json')) {
      const filename = path.join(path.resolve(__dirname, '..') + '/json', file);

      const data = require(filename);

      if (data.length == 0) continue;

      const tableName = '`' + path.parse(filename).name + '`';

      const columns =
        '(' +
        Object.keys(data[0])
          .filter((column) => column !== 'id')
          .map((column) => {
            return '`' + column + '`';
          })
          .join(',') +
        ')';

      const values = data
        .map((obj) => {
          return (
            '(' +
            Object.entries(obj)
              .filter(([key, value]) => {
                return key !== 'id';
              })
              .map(([key, value]) => {
                return typeof value === 'number' ? value : `'${value}'`;
              })
              .join(',') +
            ')'
          );
        })
        .join();

      await connection.query(
        `INSERT INTO ${tableName} ${columns} VALUES ${values.replaceAll(
          `'null'`,
          `NULL`
        )}`
      );
    }
  }

  connection.end();
})();
