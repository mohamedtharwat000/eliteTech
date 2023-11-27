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
   * @returns {Object|null} - The retrieved record or null if not found.
   */
  async type(obj) {
    this.connect();
    this.data = await this.db.query(
      `SELECT * FROM type WHERE type = '${obj.constructor.name.toLowerCase()}'`
    );
    this.close();
    return this.data[0][0];
  }

  /**
   * Retrieves all records of a specified class from the MySQL database.
   * @param {Function} cls - The class of objects to retrieve.
   * @returns {Array} - An array of records.
   */
  async all(cls) {
    this.connect();
    this.data = await this.db.query(`SELECT * FROM ${cls.name.toLowerCase()}`);
    this.close();
    return this.data[0];
  }

  /**
   * Retrieves a specific record based on class and object ID from the MySQL database.
   * @param {Function} cls - The class of the object.
   * @param {Object} obj - The object to retrieve.
   * @returns {Object|null} - The retrieved record or null if not found.
   */
  async get(cls, obj) {
    this.connect();
    this.data = await this.db.query(
      `SELECT * FROM ${cls.name.toLowerCase()} WHERE id = ${obj.id}`
    );
    this.close();
    return this.data[0][0];
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
      .map((value) => `'${value}'`)
      .join(',');

    this.connect();
    this.data = await this.db.query(
      `INSERT INTO ${cls.name.toLowerCase()} (${columns}) VALUES (${values})`
    );
    this.close();
    return obj.id;
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
      `UPDATE ${cls.name.toLowerCase()} SET ${updates} WHERE id = ${obj.id}`
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
      `DELETE FROM ${cls.name.toLowerCase()} WHERE id = ${obj.id}`
    );
    this.close();
    return obj.id;
  }
}
