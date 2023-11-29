import Base from './base.js';

/**
 * Represents a processor product.
 * Extends the Base class for a unique identifier.
 */
export default class CPU extends Base {
  /**
   * Constructor for the Processor class.
   * @param {object} obj - An object containing properties for the processor.
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
    this.coreCount = obj.coreCount ?? null;
    this.performanceCoreClock = obj.performanceCoreClock ?? null;
    this.performanceBoostClock = obj.performanceBoostClock ?? null;
    this.integratedGraphics = obj.integratedGraphics ?? null;
    this.tdp = obj.tdp ?? null;
    this.smt = obj.smt ?? null;
  }
}
