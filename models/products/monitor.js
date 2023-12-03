import Base from './base.js';

/**
 * Represents a monitor product.
 * Extends the Base class for a unique identifier.
 */
export default class Monitor extends Base {
  /**
   * Constructor for the Monitor class.
   * @param {object} obj - An object containing properties for the monitor.
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
    this.screenSize = obj.screenSize ?? null;
    this.resolution = obj.resolution ?? null;
    this.refreshRate = obj.refreshRate ?? null;
    this.responseTimeG2G = obj.responseTimeG2G ?? null;
    this.panelType = obj.panelType ?? null;
    this.aspectRatio = obj.aspectRatio ?? null;
  }
}
