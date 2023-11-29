/**
 * DataManager class for managing data operations with various models.
 */
import Base from './models/base.js';
import User from './models/user.js';
import Purchase from './models/purchase.js';
import PurchaseItem from './models/purchaseItem.js';
import ProductRating from './models/productRating.js';
import Case from './models/case.js';
import CPU from './models/cpu.js';
import Cooler from './models/cooler.js';
import GPU from './models/gpu.js';
import RAM from './models/ram.js';
import Storage from './models/storage.js';
import Motherboard from './models/motherboard.js';
import PowerSupply from './models/powersupply.js';
import Monitor from './models/monitor.js';
import Mice from './models/mice.js';
import Keyboard from './models/keyboard.js';
import Headphone from './models/headphone.js';

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
   * Create a new record in the specified model.
   * @param {string} type - The model name.
   * @param {object} data - The data for the new record.
   * @returns {number} - The ID of the added object.
   */
  dbCreate(type = '', data = {}) {
    const cls =
      typeof type === 'string'
        ? type in this.classes
          ? this.classes[type]
          : Base
        : Base;

    return cls.add(new cls(data));
  }

  /**
   * Read records from the specified model.
   * @param {string} type - The model name.
   * @param {string|number|object} data - Query parameter (e.g., 'all', record ID, or number of records).
   * @returns {object|array} - The retrieved record or records.
   */
  dbRead(type = '', data = {}) {
    const cls =
      typeof type === 'string'
        ? type in this.classes
          ? this.classes[type]
          : Base
        : Base;

    if (data === 'all') {
      return cls.getAll();
    }

    if (typeof data === 'number') {
      return cls.getAll().slice(0, data);
    }

    return cls.get(data);
  }

  /**
   * Update a record in the specified model.
   * @param {string} type - The model name.
   * @param {object} data - The data for updating the record.
   * @returns {number|null} - The ID of the updated object or null if not found.
   */
  dbUpdate(type = '', data = {}) {
    const cls =
      typeof type === 'string'
        ? type in this.classes
          ? this.classes[type]
          : Base
        : Base;

    return cls.update(data);
  }

  /**
   * Delete a record from the specified model.
   * @param {string} type - The model name.
   * @param {object} data - The data for deleting the record.
   * @returns {number|null} - The ID of the deleted object or null if not found.
   */
  dbDelete(type = '', data = {}) {
    const cls =
      typeof type === 'string'
        ? type in this.classes
          ? this.classes[type]
          : Base
        : Base;

    return cls.delete(data);
  }
}

export default new DataManager();
