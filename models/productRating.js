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

    this.userID = obj.userID ?? null;
    this.productID = obj.productID ?? null;
    this.type = obj.type ?? null;
    this.rating = obj.rating ?? null;
  }
}
