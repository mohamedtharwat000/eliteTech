import Base from './base.js';

/**
 * Represents a product rating.
 * Inherits from the Base class for a unique identifier.
 */
export default class ProductRating extends Base {
  /**
   * Constructor for the ProductRating class.
   * @param {object} obj - An object containing properties for the product rating.
   */
  constructor(obj = {}) {
    // Call the constructor of the Base class to set the unique identifier.
    super();

    // Validate and set properties for the product rating.
    if (obj.userID && obj.productID && obj.productType && obj.rating) {
      this.userID = obj.userID;
      this.productID = obj.productID;
      this.productType = obj.productType;
      this.rating = obj.rating;
    } else {
      throw new Error('Incomplete product rating information.');
    }
  }
}
