import Base from './base.js';

/**
 * Represents a headphone product.
 * Extends the Base class for a unique identifier.
 */
export default class Headphone extends Base {
  /**
   * Constructor for the Headphones class.
   * @param {object} obj - An object containing properties for the headphones.
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
    this.type = obj.type ?? null;
    this.frequencyResponse = obj.frequencyResponse ?? null;
    this.microphone = obj.microphone ?? null;
    this.wireless = obj.wireless ?? null;
    this.enclosureType = obj.enclosureType ?? null;
    this.color = obj.color ?? null;
  }
}
