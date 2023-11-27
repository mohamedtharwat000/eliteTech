import Base from './base.js';

/**
 * Represents a mouse product.
 * Extends the Base class for a unique identifier.
 */
export default class Mice extends Base {
  /**
   * Constructor for the Mouse class.
   * @param {object} obj - An object containing properties for the mouse.
   */
  constructor(obj = {}) {
    // Call the constructor of the Base class to set the unique identifier.
    super();

    this.manufacturer = obj.manufacturer ?? null;
    this.name = obj.name ?? null;
    this.imageURL = obj.imageURL ?? null;
    this.price = obj.price ?? null;
    this.rating = obj.rating ?? 0.0;
    this.stock = obj.stock ?? 0.0;
    this.trackingMethod = obj.trackingMethod ?? null;
    this.connectionType = obj.connectionType ?? null;
    this.maximumDPI = obj.maximumDPI ?? 0;
    this.handOrientation = obj.handOrientation ?? null;
    this.color = obj.color ?? null;
  }
}
