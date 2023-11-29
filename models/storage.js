import Base from './base.js';

/**
 * Represents a storage product.
 * Extends the Base class for a unique identifier.
 */
export default class Storage extends Base {
  /**
   * Constructor for the Storage class.
   * @param {object} obj - An object containing properties for the storage.
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
    this.capacity = obj.capacity ?? null;
    this.pricePerGb = obj.pricePerGb ?? null;
    this.type = obj.type ?? null;
    this.cache = obj.cache ?? null;
    this.formFactor = obj.formFactor ?? null;
    this.interface = obj.interface ?? null;
  }
}
