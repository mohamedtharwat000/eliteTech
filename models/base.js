import Storage from './storage/storage.js';
import { v4 } from 'uuid';


const dbType = process.env.db;


/**
 * @summary Base class for creating objects with a unique identifier.
 * @class
 * @public
 */
export default class Base {
  /**
   * @summary Constructor for the Base class.
   * Generates a unique identifier using the 'uuid' library.
   * @constructor
   * @public
   */
  constructor() {
	if (!dbType) {
		this.id = v4();
	}
  }

  /**
   * @summary Converts the object to a JSON string.
   * @method
   * @returns {string} JSON representation of the object.
   * @public
   */
  toString() {
    return JSON.stringify(this);
  }

  /**
   * @summary Saves the object using the 'Storage' module.
   * @method
   * @public
   */
  async save() {
    Storage.save(this);
  }

  /**
   * @summary Gets all data from storage.
   * @method
   * @returns {Array} Array containing all stored objects of the current type.
   * @public
   */
  static async all() {
    return Storage.all(this);

  }

  /**
   * @summary Gets data from storage based on the provided object.
   * @method
   * @param {Object} obj - The object to be retrieved.
   * @returns {Object|null} The retrieved object or null if not found.
   * @public
   */
  static async get(obj) {
    return Storage.get(this, obj);
  }

  /**
   * @summary delete data from storage based on the provided object.
   * @method
   * @param {Object} obj - The object to be deleted.
   * @public
   */
  static async delete(obj) {
    return Storage.delete(this, obj);
  }

  /**
   * @summary Gets all stored data.
   * @method
   * @returns {Array} Array containing all stored objects.
   * @public
   */
  static data() {
    return Storage.data();
  }
}
