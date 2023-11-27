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
    this.price = obj.price ?? 0.0;
    this.rating = obj.rating ?? 0.0;
    this.stock = obj.stock ?? 0;
    this.capacity = obj.capacity ?? null;
    this.pricePerGb = obj.pricePerGb ?? null;
    this.type = obj.type ?? null;
    this.cache = obj.cache ?? null;
    this.formFactor = obj.formFactor ?? null;
    this.interface = obj.interface ?? null;
  }
}
