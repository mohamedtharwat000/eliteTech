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
    super(obj);

    this.manufacturer = obj.manufacturer ?? null;
    this.name = obj.name ?? null;
    this.imageURL = obj.imageURL ?? null;
    this.price = obj.price ?? null;
    this.rating = obj.rating ?? null;
    this.stock = obj.stock ?? null;
    this.type = obj.type ?? null;
    this.frequencyResponse = obj.frequencyResponse ?? null;
    this.microphone = obj.microphone ?? null;
    this.wireless = obj.wireless ?? null;
    this.enclosureType = obj.enclosureType ?? null;
    this.color = obj.color ?? null;
  }
}
