import Base from './base.js';

/**
 * Represents a cooler product.
 * Extends the Base class for a unique identifier.
 */
export default class Cooler extends Base {
  /**
   * Constructor for the Cooler class.
   * @param {object} obj - An object containing properties for the cooler.
   */
  constructor(obj = {}) {
    // Call the constructor of the Base class to set the unique identifier.
    super(obj);

    this.manufacturer = obj.manufacturer ?? null;
    this.name = obj.name ?? null;
    this.imageURL = obj.imageURL ?? null;
    this.price = obj.price ?? null;
    this.rating = obj.rating ?? null;
    this.stock = obj.stock ?? null;
    this.fanRPM = obj.fanRPM ?? null;
    this.noiseLevel = obj.noiseLevel ?? null;
    this.color = obj.color ?? null;
    this.radiatorSize = obj.radiatorSize ?? null;
  }
}
