// import {new, save, delete} from './storage/db.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Base class for creating objects with a unique identifier.
 */
export default class Base {
  /**
   * Constructor for the Base class.
   */
  constructor() {
    // Generate a unique identifier using the uuid library.
    this.id = uuidv4();
  }

  /**
   * Converts the object to a JSON string.
   * @returns {string} JSON representation of the object.
   */
  toString() {
    return JSON.stringify(this);
  }
}
