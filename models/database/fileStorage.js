import { readFile, writeFile } from 'fs/promises';

/**
 * FileStorage class for handling CRUD operations on JSON files.
 */
export default class FileStorage {
  /**
   * Constructs a new FileStorage instance and triggers a data reload.
   */
  constructor() {
    this.reload();
  }

  /**
   * Reloads the data by setting it to an empty array.
   */
  reload() {
    this.data = [];
  }

  /**
   * Retrieves the types of all products.
   * @returns {Object} - The types information.
   */
  async types() {
    await this.read();
    return this.data;
  }

  /**
   * Retrieves all records of a specified class.
   * @param {Function} cls - The class of objects to retrieve.
   * @returns {Array} - An array of records.
   */
  async read(cls) {
    this.reload();
    const file = await readFile(
      `${process.cwd()}/models/database/json/${
        cls ? cls.name.toLowerCase() : 'type'
      }.json`,
      'utf8'
    );
    this.data = file ? JSON.parse(file) : [];
  }

  /**
   * Saves data to a JSON file based on the cls name.
   * @param {Function} cls - The class representing the product.
   * @param {Array} data - The data to be saved.
   */
  async save(cls, data) {
    await writeFile(
      `${process.cwd()}/models/database/json/${cls.name.toLowerCase()}.json`,
      JSON.stringify(data),
      'utf8'
    );
  }

  /**
   * Adds a new record to the specified class.
   * @param {Function} cls - The class of the object.
   * @param {Object} obj - The object to add.
   * @returns {number} - The ID of the added object.
   */
  async add(cls, obj) {
    await this.read(cls);
    this.data.push(obj);
    await this.save(cls, this.data);
    return obj.id;
  }

  /**
   * Updates an existing record in the specified class.
   * @param {Function} cls - The class of the object.
   * @param {Object} obj - The object with updated values.
   * @returns {number|null} - The ID of the updated object or null if not found.
   */
  async update(cls, obj) {
    await this.read(cls);
    const record = this.data.find((product) => product.id == obj.id);
    if (record) {
      this.data[this.data.indexOf(record)] = { ...record, ...obj };
      await this.save(cls, this.data);
      return obj.id;
    }
    return null;
  }

  /**
   * Deletes a record from the specified class.
   * @param {Function} cls - The class of the object.
   * @param {Object} obj - The object to delete.
   * @returns {number|null} - The ID of the deleted object or null if not found.
   */
  async delete(cls, obj) {
    await this.read(cls);
    const record = this.data.find((product) => product.id == obj.id);
    if (record) {
      this.data.splice(this.data.indexOf(record), 1);
      await this.save(cls, this.data);
      return obj.id;
    }
    return null;
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
    const options = ['price', 'rating'];
    await this.read(cls);

    if (obj.id) {
      this.data = this.data.filter((record) => record.id == obj.id);
      return this.data;
    }

    if (obj.manufacturer) {
      const partialName = obj.name.toLowerCase();
      this.data = this.data.filter(
        (record) => record.manufacturer.toLowerCase() == partialName
      );
    }

    if (obj.name) {
      const partialName = obj.name.toLowerCase();
      this.data = this.data.filter((record) =>
        record.name.toLowerCase().includes(partialName)
      );
    }

    if (obj.filterBy && obj.filterType && obj.filterValue) {
      const filterFunction = (record) => {
        const value = record[obj.filterBy];
        const filterValue = Number(obj.filterValue)
          ? +obj.filterValue
          : obj.filterValue;
        switch (obj.filterType) {
          case 'gt':
            return value > filterValue;
          case 'lt':
            return value < filterValue;
          case 'eq':
            return value == filterValue;
          default:
            return true;
        }
      };
      this.data.filter(filterFunction);
    }

    if (obj.sort && options.includes(obj.sort)) {
      this.data.sort((a, b) => a[obj.sort] - b[obj.sort]);
    }

    if (obj.order === 'DESC') {
      this.data.reverse();
    }

    const start = +obj.start || 0;
    const end = +obj.end || this.data.length;
    const limit = obj.limit ? Math.min(+obj.limit, +end - +start) : end;

    this.data.slice(start, limit);

    return this.data;
  }
}
