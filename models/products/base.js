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
      this.id = Math.floor(Math.random() * 10000000);
    }
  }

  /**
   * Retrieves the type of the object using the associated Storage.
   * @returns {Object} - The types information.
   */
  static async types() {
    return await Storage.types();
  }

  /**
   * Retrieves a specific record based on the provided object using the associated Storage.
   * @param {Object} obj - The object to retrieve.
   * @returns {Object|null} - The retrieved record or null if not found.
   */
  static async get(obj) {
    return await Storage.get(this, obj);
  }

  /**
   * Adds a new record to the current class using the associated Storage.
   * @param {Object} obj - The object to add.
   * @returns {number} - The ID of the added object.
   */
  static async add(obj) {
    return await Storage.add(this, obj);
  }

  /**
   * Updates an existing record in the current class using the associated Storage.
   * @param {Object} obj - The object with updated values.
   * @returns {number|null} - The ID of the updated object or null if not found.
   */
  static async update(obj) {
    return await Storage.update(this, obj);
  }

  /**
   * Deletes a record from the current class using the associated Storage.
   * @param {Object} obj - The object to delete.
   * @returns {number|null} - The ID of the deleted object or null if not found.
   */
  static async delete(obj) {
    return await Storage.delete(this, obj);
  }
}
