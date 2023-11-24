import Base from './base.js';

/**
 * Represents a power supply product.
 * Extends the Base class for a unique identifier.
 */
export default class PowerSupply extends Base {
  /**
   * Constructor for the PowerSupply class.
   * @param {object} obj - An object containing properties for the power supply.
   */
  constructor(obj = {}) {
    // Call the constructor of the Base class to set the unique identifier.
    super();

    this.manufacturer = obj.manufacturer ?? null;
    this.name = obj.name ?? null;
    this.imageURL = obj.imageURL ?? null;
    this.price = obj.price ?? null;
    this.rating = obj.rating ?? null;
    this.stock = obj.stock ?? null;
    this.type = obj.type ?? null;
    this.efficiencyRating = obj.efficiencyRating ?? null;
    this.wattage = obj.wattage ?? null;
    this.modular = obj.modular ?? null;
    this.color = obj.color ?? null;
  }
}
