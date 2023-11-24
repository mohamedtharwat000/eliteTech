import { readFileSync, writeFileSync } from 'fs';

/**
 * @summary Class for handling file-based storage operations.
 * @class
 * @public
 */
export default class FileStorage {
  /**
   * @summary Constructor for the FileStorage class.
   * @constructor
   * @public
   */
  constructor() {}

  /**
   * @summary Retrieves all data from the specified JSON file.
   * @method
   * @returns {Array} Array containing all stored objects.
   * @public
   */
  data() {
    const data = readFileSync(
      process.cwd() + '/models/storage/json/productType.json',
      'utf8'
    );
    return JSON.parse(data);
  }

  /**
   * @summary Retrieves all objects of a specific class from the corresponding JSON file.
   * @method
   * @param {Function} cls - The class of objects to retrieve.
   * @returns {Array} Array containing all stored objects of the specified class.
   * @public
   */
  all(cls) {
    const data = readFileSync(
      `${process.cwd()}/models/storage/json/${cls.name.toLowerCase()}.json`,
      'utf8'
    );
    return JSON.parse(data);
  }

  /**
   * @summary Saves the provided object to the corresponding JSON file.
   * @method
   * @param {Object} obj - The object to be saved.
   * @public
   */
  save(obj) {
    const data = this.all(obj.constructor);
    data.push(JSON.parse(obj.toString()));
    writeFileSync(
      `${process.cwd()}/models/storage/json/${obj.constructor.name.toLowerCase()}.json`,
      JSON.stringify(data),
      'utf8'
    );
  }

  /**
   * @summary Retrieves a specific object from the specified class based on the provided object.
   * @method
   * @param {Function} cls - The class of objects to search.
   * @param {Object} obj - The object to retrieve.
   * @returns {Object|null} The retrieved object or null if not found.
   * @public
   */
  get(cls, obj) {
    const data = this.all(cls);
    for (const record of data) {
      if (record.id == obj.id) {
        return record;
      }
    }
    return null;
  }

  /**
   * @summary Deletes a specific object from the specified class based on the provided object.
   * @method
   * @param {Function} cls - The class of objects to search.
   * @param {Object} obj - The object to delete.
   * @public
   */
  delete(cls, obj) {
    const data = this.all(cls);
    for (const record of data) {
      if (record.id == obj.id) {
        data.splice(data.indexOf(record), 1);
      }
    }
    writeFileSync(
      `${process.cwd()}/models/storage/json/${cls.name.toLowerCase()}.json`,
      JSON.stringify(data),
      'utf8'
    );
  }
}
