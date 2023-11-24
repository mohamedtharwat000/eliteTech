import User from './user.js';

const user = new User({ username: 'test2', email: 'test2', password: 'test2' });
user.save();
console.log(User.data());
console.log(User.all());
console.log(User.get({ id: '2d6154f8-2df2-42b6-8218-79aec547c5d5' }));
User.delete({ id: '2d6154f8-2df2-42b6-8218-79aec547c5d5' });
