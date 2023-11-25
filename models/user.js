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
    if (obj.username && obj.email && obj.password) {
      super();
      this.username = obj.username;
      this.email = obj.email;
      this.password = obj.password;
    } else {
      throw new Error('Incomplete user information.');
    }
  }
}

