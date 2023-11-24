import Base from './base.js';

/**
 * Represents a purchase.
 * Inherits from the Base class for a unique identifier.
 */
export default class Purchase extends Base {
  /**
   * Constructor for the Purchase class.
   * @param {object} obj - An object containing properties for the purchase.
   */
  constructor(obj = {}) {
    // Call the constructor of the Base class to set the unique identifier.
    super();

    // Validate and set properties for the purchase.
    if (obj.userID && obj.purchaseDate && obj.totalAmount) {
      this.userID = obj.userID;
      this.purchaseDate = obj.purchaseDate;
      this.totalAmount = obj.totalAmount;
    } else {
      throw new Error('Incomplete purchase information.');
    }
  }
}
