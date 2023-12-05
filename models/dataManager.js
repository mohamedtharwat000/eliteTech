/**
 * DataManager class for managing data operations with various models.
 */
import Base from './products/base.js';
import User from './products/user.js';
import Purchase from './products/purchase.js';
import PurchaseItem from './products/purchaseItem.js';
import ProductRating from './products/productRating.js';
import Case from './products/case.js';
import CPU from './products/cpu.js';
import Cooler from './products/cooler.js';
import GPU from './products/gpu.js';
import RAM from './products/ram.js';
import Storage from './products/storage.js';
import Motherboard from './products/motherboard.js';
import PowerSupply from './products/powersupply.js';
import Monitor from './products/monitor.js';
import Mice from './products/mice.js';
import Keyboard from './products/keyboard.js';
import Headphone from './products/headphone.js';
import bcrypt from 'bcrypt';

class DataManager {
  /**
   * Constructor initializes a mapping of model names to their respective classes.
   */
  constructor() {
    this.classes = {
      user: User,
      purchase: Purchase,
      purchaseItem: PurchaseItem,
      productRating: ProductRating,
      case: Case,
      cpu: CPU,
      cooler: Cooler,
      gpu: GPU,
      ram: RAM,
      storage: Storage,
      motherboard: Motherboard,
      powerSupply: PowerSupply,
      monitor: Monitor,
      mice: Mice,
      keyboard: Keyboard,
      headphone: Headphone,
    };
  }

  /**
   * Retrieves the types of all products.
   * @returns {object|array} - The available types.
   */
  async dbTypes() {
    return Base.types();
  }

  /**
   * Create a new record in the specified model.
   * @param {string} type - The model name.
   * @param {object} data - The data for the new record.
   * @returns {number} - The ID of the added object.
   */
  async dbCreate(type = '', data = {}) {
    const cls = this.classes[type];
    if (!cls) throw new Error('product type not available');

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(data.password, salt);
      data.password = hash;
    }

    return cls.add(new cls(data));
  }

  /**
   * Read records from the specified model.
   * @param {string} type - The model name.
   * @param {string|number|object} data - Query parameter (e.g., 'all', record ID, or number of records).
   * @returns {object|array} - The retrieved record or records.
   */
  async dbRead(type = '', data = {}) {
    const cls = this.classes[type];
    if (!cls) throw new Error('product type not available');

    if (Object.keys(data).length === 0) {
      return cls.getAll();
    }

    if ('start' in data || 'end' in data || 'count' in data) {
      let limit = await cls.getAll();
      if ('count' in data && data.count) {
        debugger;
        data.count = data.start ? +data.start + +data.count : data.count;
        limit = limit.slice(data.start, data.count);
      } else {
        limit = limit.slice(data.start, data.end);
      }
      return limit;
    }

    return cls.get(data);
  }

  /**
   * Update a record in the specified model.
   * @param {string} type - The model name.
   * @param {object} data - The data for updating the record.
   * @returns {number|null} - The ID of the updated object or null if not found.
   */
  async dbUpdate(type = '', data = {}) {
    const cls = this.classes[type];
    if (!cls) throw new Error('product type not available');

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(data.password, salt);
      data.password = hash;
    }

    return cls.update(data);
  }

  /**
   * Delete a record from the specified model.
   * @param {string} type - The model name.
   * @param {object} data - The data for deleting the record.
   * @returns {number|null} - The ID of the deleted object or null if not found.
   */
  async dbDelete(type = '', data = {}) {
    const cls = this.classes[type];
    if (!cls) throw new Error('product type not available');

    return cls.delete(data);
  }
}

const data = new DataManager();
export default {
  types: data.dbTypes.bind(data),
  create: data.dbCreate.bind(data),
  read: data.dbRead.bind(data),
  update: data.dbUpdate.bind(data),
  delete: data.dbDelete.bind(data),
};