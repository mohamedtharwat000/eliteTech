import Mice from './mice.js';

// const user = new Mice({ username: 'test2', email: 'test2', password: 'test2' });
// user.save();
// console.log(Mice.data());
let all = await Mice.all()
console.log('mice.all(): ', all[0]);
// console.log('mice.all(): ', await Mice.all());
// console.log(Mice.get({ id: '2d6154f8-2df2-42b6-8218-79aec547c5d5' }));
// Mice.delete({ id: '2d6154f8-2df2-42b6-8218-79aec547c5d5' });
