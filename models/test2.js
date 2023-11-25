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



let user = new User({username: 'Ahmed', email: 'test13123@gmail.com', password: 'PASSWORD123'});

user.save();

await User.delete({id: 1});
await User.delete({id: 2});
await User.delete({id: 3});
await User.delete({id: 4});
await User.delete({id: 5});
await User.delete({id: 6});
await User.delete({id: 7});

let allUsers = await User.all();
console.log('all users:', allUsers);


let getUser = await User.get({id: 17});

console.log('getuser: ', getUser);
