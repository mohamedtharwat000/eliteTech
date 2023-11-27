import User from './user.js';
// to change database type
// use environment variables with export <export db= .........>
// db= database type <mysql | file> default file
// dbHost= database host <localhost>
// dbUser= database username <your username>
// dbPassword= database user password < your password>
// dbDatabase= database used <elite_tech>

const user = new User({ username: 'test', email: 'test', password: 'test' });
console.log(user);
console.log(user.toString());
console.log(await user.type());
console.log(await User.all());
// console.log(await User.add(user));
// console.log(await User.get({ id: 1 }));
// console.log(await User.delete({ id: 2 }));
// console.log(
//   await User.update({
//     id: 2,
//     username: 'abc',
//   })
// );
