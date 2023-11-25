import Base from './base.js';
import Case from './case.js';
import Cooler from './cooler.js';
import CPU from './cpu.js';
import GPU from './gpu.js';
import Headphone from './headphone.js';
import Keyboard from './keyboard.js';
import Mice from './mice.js';
import Monitor from './monitor.js';
import Motherboard from './motherboard.js';
import Powersupply from './powersupply.js';
import Ram from './ram.js';
import Storage from './storage.js';
import User from './user.js';
import Purchase from './purchase.js';
import PurchaseItem from './purchaseItem.js';
import ProductRating from './productRating.js';



let mice = new Mice({name: 'HyperX FPS Pro', price: 88.4, manufactor: 'HP', color: 'Black', connectionType: 'Wired'});

await mice.save();

let allMice = await Mice.all();
let getMice = allMice[allMice.length - 1];

console.log('last added mice: ', getMice);
