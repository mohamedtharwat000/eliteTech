import Base from './base.js';

/**
 * Represents a keyboard product.
 * Extends the Base class for a unique identifier.
 */
export default class Keyboard extends Base {
  /**
   * Constructor for the Keyboard class.
   * @param {object} obj - An object containing properties for the keyboard.
   */
  constructor(obj = {}) {
    // Call the constructor of the Base class to set the unique identifier.
    super();

    this.manufacturer = obj.manufacturer ?? null;
    this.name = obj.name ?? null;
    this.imageURL = obj.imageURL ?? null;
    this.price = obj.price ?? 0.0;
    this.rating = obj.rating ?? 0.0;
    this.stock = obj.stock ?? 0;
    this.style = obj.style ?? null;
    this.switchType = obj.switchType ?? null;
    this.backlit = obj.backlit ?? null;
    this.tenkeyless = obj.tenkeyless ?? null;
    this.connectionType = obj.connectionType ?? null;
    this.color = obj.color ?? null;
  }
}
