import Base from './base.js';

/**
 * Represents a computer case product.
 * Extends the Base class for a unique identifier.
 */
export default class Case extends Base {
  /**
   * Constructor for the Case class.
   * @param {object} obj - An object containing properties for the case.
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
    this.color = obj.color ?? null;
    this.powerSupply = obj.powerSupply ?? null;
    this.sidePanel = obj.sidePanel ?? null;
    this.externalVolume = obj.externalVolume ?? null;
    this.internalBays = obj.internalBays ?? null;
  }
}
