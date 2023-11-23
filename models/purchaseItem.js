import Base from './base.js';

/**
 * Represents a purchase item.
 * Inherits from the Base class for a unique identifier.
 */
export default class PurchaseItem extends Base {
  /**
   * Constructor for the PurchaseItem class.
   * @param {object} obj - An object containing properties for the purchase item.
   */
  constructor(obj = {}) {
    // Call the constructor of the Base class to set the unique identifier.
    super(obj);

    // Validate and set properties for the purchase item.
    if (
      obj.purchaseID &&
      obj.productID &&
      obj.productType &&
      obj.quantity &&
      obj.subtotal
    ) {
      this.purchaseID = obj.purchaseID;
      this.productID = obj.productID;
      this.productType = obj.productType;
      this.quantity = obj.quantity;
      this.subtotal = obj.subtotal;
    } else {
      throw new Error('Incomplete purchase item information.');
    }
  }
}
