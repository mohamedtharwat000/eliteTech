import Storage from './storage/storage.js';
import { v4 } from 'uuid';

/**
 * Base class for creating objects with a unique identifier.
 */
export default class Base {
  /**
   * Constructor for the Base class.
   * Generates a unique identifier using the 'uuid' library.
   */
  constructor() {
    this.id = v4();
  }

  /**
   * Converts the object to a JSON string.
   * @returns {string} JSON representation of the object.
   */
  toString() {
    return JSON.stringify(this);
  }

  /**
   * Saves the object using the 'Storage' module.
   */
  save() {
    Storage.save(this);
  }
}
