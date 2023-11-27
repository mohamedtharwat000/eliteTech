import Base from './base.js';

/**
 * Represents a graphics card product.
 * Extends the Base class for a unique identifier.
 */
export default class GPU extends Base {
  /**
   * Constructor for the GraphicsCard class.
   * @param {object} obj - An object containing properties for the graphics card.
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
    this.chipset = obj.chipset ?? null;
    this.memory = obj.memory ?? null;
    this.coreClock = obj.coreClock ?? null;
    this.boostClock = obj.boostClock ?? null;
    this.color = obj.color ?? null;
    this.length = obj.length ?? null;
  }
}
