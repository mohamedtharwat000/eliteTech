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
    super();

    this.purchaseID = obj.purchaseID ?? null;
    this.productID = obj.productID ?? null;
    this.type = obj.type ?? null;
    this.quantity = obj.quantity ?? null;
    this.subtotal = obj.subtotal ?? null;
  }
}
