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

    this.userID = obj.userID ?? null;
    this.purchaseDate = obj.purchaseDate ?? null;
    this.totalAmount = obj.totalAmount ?? null;
  }
}
