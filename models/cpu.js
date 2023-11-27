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
    this.price = obj.price ?? 0.0;
    this.rating = obj.rating ?? 0.0;
    this.stock = obj.stock ?? 0;
    this.coreCount = obj.coreCount ?? 0;
    this.performanceCoreClock = obj.performanceCoreClock ?? null;
    this.performanceBoostClock = obj.performanceBoostClock ?? null;
    this.integratedGraphics = obj.integratedGraphics ?? null;
    this.tdp = obj.tdp ?? null;
    this.smt = obj.smt ?? null;
  }
}
