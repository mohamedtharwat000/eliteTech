import mysql from 'mysql2';

/**
 * MysqlStorage class for handling CRUD operations on a MySQL database.
 */
export default class MysqlStorage {
  /**
   * Constructs a new MysqlStorage instance and initializes a MySQL connection.
   */
  constructor() {
    this.data = null;
    this.db = null;
  }

  /**
   * Connects to the MySQL database.
   */
  connect() {
    this.data = null;
    this.db = mysql
      .createConnection({
        host: process.env.dbHost,
        user: process.env.dbUser,
        password: process.env.dbPassword || null,
        database: process.env.dbDatabase,
      })
      .promise();
  }

  /**
   * Closes the MySQL database connection.
   */
  close() {
    this.db.end();
  }

  /**
   * Retrieves a record based on the type of the provided object.
   * @param {Object} obj - The object whose type is used for retrieval.
   * @returns {Object} - The types information.
   */
  async types(obj) {
    this.connect();
    this.data = await this.db.query(`SELECT * FROM \`type\``);
    this.close();
    return this.data[0];
  }

  /**
   * Adds a new record to the specified class in the MySQL database.
   * @param {Function} cls - The class of the object.
   * @param {Object} obj - The object to add.
   * @returns {number} - The ID of the added object.
   */
  async add(cls, obj) {
    const columns = Object.keys(obj).join(',');
    const values = Object.values(obj)
      .map((value) => (typeof value === 'number' ? value : `'${value}'`))
      .join(',');

    this.connect();
    this.data = await this.db.query(
      `INSERT INTO \`${cls.name.toLowerCase()}\` (${columns}) VALUES (${values.replaceAll(
        `'null'`,
        `NULL`
      )})`
    );
    this.close();
    return this.data[0].insertId;
  }

  /**
   * Updates an existing record in the specified class in the MySQL database.
   * @param {Function} cls - The class of the object.
   * @param {Object} obj - The object with updated values.
   * @returns {number|null} - The ID of the updated object or null if not found.
   */
  async update(cls, obj) {
    const updates = Object.entries(obj)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(',');

    this.connect();
    this.data = await this.db.query(
      `UPDATE \`${cls.name.toLowerCase()}\` SET ${updates} WHERE id = ${obj.id}`
    );
    this.close();
    return obj.id;
  }

  /**
   * Deletes a record from the specified class in the MySQL database.
   * @param {Function} cls - The class of the object.
   * @param {Object} obj - The object to delete.
   * @returns {number|null} - The ID of the deleted object or null if not found.
   */
  async delete(cls, obj) {
    this.connect();
    this.data = await this.db.query(
      `DELETE FROM \`${cls.name.toLowerCase()}\` WHERE id = ${obj.id}`
    );
    this.close();
    return obj.id;
  }

  /**
   * Retrieves records from the storage based on specified criteria.
   *
   * @async
   * @param {Function} cls - The class of objects to be retrieved.
   * @param {Object} obj - Criteria for filtering, sorting, and pagination.
   * @returns {Promise<Array|Object|null>} Depending on the provided criteria,
   *  returns:
   *   - An array of records if pagination or no specific criteria are provided.
   *   - A single record if filtering by ID.
   *   - Null if no matching records are found.
   */
  async get(cls, obj) {
    debugger;
    this.connect();

    let sql = `SELECT * FROM \`${cls.name.toLowerCase()}\``;

    if (obj.id) {
      sql += ` WHERE id = ${obj.id}`;
    } else {
      if (obj.manufacturer) {
        const partialName = obj.manufacturer.toLowerCase();
        sql += ` WHERE manufacturer LIKE '${partialName}'`;
      }

      if (obj.name) {
        const partialName = obj.name.toLowerCase();
        sql += ` WHERE name LIKE '%${partialName}%'`;
      }
    }

    const options = ['price', 'rating'];

    if (obj.filterBy && obj.filterType && obj.filterValue) {
      sql += ` ${sql.includes('WHERE') ? 'AND' : 'WHERE'} ${obj.filterBy} ${
        obj.filterType == 'gt'
          ? '>'
          : obj.filterType == 'lt'
          ? '<'
          : obj.filterType == 'eq'
          ? '='
          : ''
      } `;
      sql += parseFloat(obj.filterValue)
        ? +obj.filterValue
        : `${obj.filterValue}`;
    }

    if (obj.sort && options.includes(obj.sort)) {
      sql += ` ORDER BY ${obj.sort}`;
      if (obj.order === 'DESC') {
        sql += ' DESC';
      } else {
        sql += ' ASC';
      }
    }

    if (obj.end || obj.limit) {
      sql += ` LIMIT ${Math.min(
        +obj.limit,
        obj.end ? +obj.end - (+obj.start || 0) : ''
      )}`;
    }

    if (obj.start) {
      sql += ` OFFSET ${+obj.start}`;
    }

    this.data = await this.db.query(sql);

    this.close();
    return this.data[0];
  }
}
