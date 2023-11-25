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


// const user = new Mice({ username: 'test2', email: 'test2', password: 'test2' });
// user.save();
// console.log(Mice.data());
let all = await Mice.all()
console.log('mice.all(): ', all[0]);

all = await Ram.all();
console.log('ram.all()[1]:', all[1]);

let get = await Ram.get({id: 5});
console.log('get ram id = 5: ', get)

let del = await Mice.delete({id: 9});
let del1 = await Mice.delete({id: 10});
let del2 = await Mice.delete({id: 11});
console.log('deleted mice? ', del);
console.log('deleted DNE mice? ', del1);
console.log('deleted mice? ', del2);
// console.log('mice.all(): ', await Mice.all());
// console.log(Mice.get({ id: '2d6154f8-2df2-42b6-8218-79aec547c5d5' }));
// Mice.delete({ id: '2d6154f8-2df2-42b6-8218-79aec547c5d5' });
