import Base from './base.js';

/**
 * Represents a motherboard product.
 * Extends the Base class for a unique identifier.
 */
export default class Motherboard extends Base {
  /**
   * Constructor for the Motherboard class.
   * @param {object} obj - An object containing properties for the motherboard.
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
    this.socketCPU = obj.socketCPU ?? null;
    this.formFactor = obj.formFactor ?? null;
    this.memoryMax = obj.memoryMax ?? null;
    this.memorySlots = obj.memorySlots ?? 0;
    this.color = obj.color ?? null;
  }
}
