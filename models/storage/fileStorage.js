import Base from '../base.js';
import Case from '../case.js';
import Cooler from '../cooler.js';
import CPU from '../cpu.js';
import GPU from '../gpu.js';
import Headphone from '../headphone.js';
import Keyboard from '../keyboard.js';
import Mice from '../mice.js';
import Monitor from '../monitor.js';
import Motherboard from '../motherboard.js';
import Powersupply from '../powersupply.js';
import Ram from '../ram.js';
import Storage from '../storage.js';
import User from '../user.js';
import Purchase from '../purchase.js';
import PurchaseItem from '../purchaseItem.js';
import ProductRating from '../productRating.js';
import { readFileSync } from 'fs';

const classes = {
  Base,
  Case,
  Cooler,
  CPU,
  GPU,
  Headphone,
  Keyboard,
  Mice,
  Monitor,
  Motherboard,
  Powersupply,
  Ram,
  Storage,
  User,
  Purchase,
  PurchaseItem,
  ProductRating,
};

export default class FileStorage {
  constructor() {
    this.data = {};
    this.path = '';
  }

  all() {
    try {
      const all = readFileSync(
        process.cwd() + '/models/storage/json/productTypes.json',
        'utf8'
      );
      return JSON.parse(all);
    } catch (err) {
      throw err;
    }
  }

  save() {}

  delete() {}

  get() {}

  close() {
    this.data = {};
  }
}
