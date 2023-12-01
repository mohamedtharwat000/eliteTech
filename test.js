import Case from './models/case.js';
import CPU from './models/cpu.js';
import Cooler from './models/cooler.js';
import GPU from './models/gpu.js';
import RAM from './models/ram.js';
import Storage from './models/storage.js';
import Motherboard from './models/motherboard.js';
import PowerSupply from './models/powersupply.js';
import Monitor from './models/monitor.js';
import Keyboard from './models/keyboard.js';
import Headphone from './models/headphone.js';



import Mice from './models/mice.js';



let all_mices = await Mice.getAll();
let all_mices_len = all_mices.length;
console.log(all_mices[0]);
console.log(`Number of Stored Mices: ${all_mices_len}`);

let new_mice = new Mice({'name': 'HyperX', 'price': 99.99, 'maximumDPI': '160000', 'color': 'Black', 'manufactor': 'HP'});
await Mice.add(new_mice);

console.log('-------------------------')
console.log('Adding a new record....')
console.log(new_mice.toString())
console.log('-------------------------')

all_mices = await Mice.getAll();
let last_mice_id = all_mices.slice(-1)[0].id;
all_mices_len = all_mices.length;
console.log(`Number of Stored Mices after adding a new record: ${all_mices_len}`);

console.log('Deleting the last inserted record.....')
console.log('ID:', await Mice.delete({id: last_mice_id}))


console.log('-------------------------')


all_mices = await Mice.getAll()
all_mices_len = all_mices.length;
console.log(`Number of Stored Mices after deleting the last inserted record: ${all_mices_len}`);


