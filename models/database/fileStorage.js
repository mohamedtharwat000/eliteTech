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
   * Retrieves all records of a specified class.
   * @param {Function} cls - The class of objects to retrieve.
   * @returns {Array} - An array of records.
   */
  async read(cls) {
    this.reload();
    const file =
      (await readFile(
        `${process.cwd()}/models/database/json/${
          cls ? cls.name.toLowerCase() : 'type'
        }.json`,
        'utf8'
      )) || '[]';
    this.data = JSON.parse(file);
    return this.data;
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
   * Retrieves the types of all products.
   * @returns {Object} - The types information.
   */
  async types() {
    await this.read();
    return this.data;
  }

  /**
   * Adds a new record to the specified class.
   * @param {Function} cls - The class of the object.
   * @param {Object} obj - The object to add.
   * @returns {number} - The ID of the added object.
   */
  async add(cls, obj) {
    await this.read(cls);
    this.data.push(JSON.parse(obj.toString()));
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
    const record = this.data.find((product) => product.id === obj.id);
    if (record) {
      this.data[this.data.indexOf(record)] = { ...obj };
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
   * @param {Function} cls - The class of objects should be retrieved.
   * @param {Object} obj - Criteria for filtering, sorting, and pagination.
   * @returns {Promise<Array|Object|null>} =>
   *  Depending on the provided criteria, returns:
   *   - An array of records if pagination or no specific criteria are provided.
   *   - A single record if filtering by ID.
   *   - Null if no matching records are found.
   */
  async get(cls, obj) {
    await this.read(cls);

    if (Object.keys(obj).length === 0) {
      return this.data;
    }

    if (obj.id) {
      return this.data.find((record) => record.id == obj.id) || null;
    }

    if (obj.start || obj.end || obj.count) {
      this.data = this.data.slice(
        obj.start || 0,
        obj.count ? (obj.start ? +obj.start + +obj.count : +obj.count) : obj.end
      );
      return this.data;
    }

    const options = ['name', 'price', 'rating'];

    for (const option of options) {
      if (!this.data.length || !option in this.data[0]) {
        return this.data;
      }
    }

    if (obj.sortBy && options.includes(obj.sortBy)) {
      this.data.sort((a, b) => a[obj.sortBy] - b[obj.sortBy]);
      if (obj.sortType === 'DESC') {
        this.data.reverse();
      }
      return this.data;
    }

    const filterTypes = ['gt', 'lt', 'eq'];

    if (obj.filterBy && obj.filterType && obj.filterValue) {
      if (
        filterTypes.includes(obj.filterType) &&
        options.includes(obj.filterBy)
      ) {
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
        this.data = this.data.filter(filterFunction);
      }

      return this.data;
    }

    return null;
  }
}
