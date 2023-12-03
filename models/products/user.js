import Base from './base.js';

/**
 * Represents a user.
 * Inherits from the Base class for a unique identifier.
 */
export default class User extends Base {
  /**
   * Constructor for the User class.
   * @param {object} obj - An object containing properties for the user.
   */
  constructor(obj = {}) {
    // Call the constructor of the Base class to set the unique identifier.
    super();

    this.username = obj.username ?? null;
    this.email = obj.email ?? null;
    this.password = obj.password ?? null;
  }
}
