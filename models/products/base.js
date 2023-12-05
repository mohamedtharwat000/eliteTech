import Storage from '../database/storage.js';

/**
 * Base class serving as a foundation for other classes with CRUD operations.
 */
export default class Base {
  /**
   * Constructs a new Base instance.
   */
  constructor() {
    if (Storage.constructor.name === 'FileStorage') {
      this.fileStorageId();
    }
  }

  /**
   * Generates an ID if the Storage is of type FileStorage.
   */
  async fileStorageId() {
    this.id = (await this.constructor.get({})).length + 1;
  }

  /**
   * Converts the object to a JSON string.
   * @returns {string} - The JSON representation of the object.
   */
  toString() {
    return JSON.stringify(this);
  }

  /**
   * Retrieves the type of the object using the associated Storage.
   * @returns {Object} - The types information.
   */
  static types() {
    return Storage.types();
  }

  /**
   * Retrieves a specific record based on the provided object using the associated Storage.
   * @param {Object} obj - The object to retrieve.
   * @returns {Object|null} - The retrieved record or null if not found.
   */
  static get(obj) {
    return Storage.get(this, obj);
  }

  /**
   * Adds a new record to the current class using the associated Storage.
   * @param {Object} obj - The object to add.
   * @returns {number} - The ID of the added object.
   */
  static add(obj) {
    return Storage.add(this, obj);
  }

  /**
   * Updates an existing record in the current class using the associated Storage.
   * @param {Object} obj - The object with updated values.
   * @returns {number|null} - The ID of the updated object or null if not found.
   */
  static update(obj) {
    return Storage.update(this, obj);
  }

  /**
   * Deletes a record from the current class using the associated Storage.
   * @param {Object} obj - The object to delete.
   * @returns {number|null} - The ID of the deleted object or null if not found.
   */
  static delete(obj) {
    return Storage.delete(this, obj);
  }
}
