import Base from './base.js';

/**
 * Represents a RAM product.
 * Extends the Base class for a unique identifier.
 */
export default class Ram extends Base {
  /**
   * Constructor for the Ram class.
   * @param {object} obj - An object containing properties for the RAM.
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
    this.speed = obj.speed ?? null;
    this.modules = obj.modules ?? null;
    this.pricePerGb = obj.pricePerGb ?? null;
    this.color = obj.color ?? null;
    this.firstWordLatency = obj.firstWordLatency ?? null;
    this.casLatency = obj.casLatency ?? null;
  }
}
