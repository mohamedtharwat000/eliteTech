import User from './user.js';
import Mice from './mice.js';
// to change database type
// use environment variables with export <export db= .........>
// db= database type <mysql | file> default file
// dbHost= database host <localhost>
// dbUser= database username <your username>
// dbPassword= database user password < your password>
// dbDatabase= database used <elite_tech>



/*!!!!!  TEST MICE  !!!!!!*/


// let mice1 = new Mice({name: 'Hyper X Pro', price: 55.6, manufactor: 'HP', color: 'Black'});
// let mice2 = new Mice({name: 'Logitech G502', price: 99.9, manufactor: 'Logitech', color: 'Red'});

// await Mice.add(mice1);
// await Mice.add(mice2);

// console.log(mice1);
// console.log(mice1.toString());


// console.log(mice2);
// console.log(mice2.toString());

// let mices = await Mice.all()
// console.log(mices[0].name);

/*!!!!! TEST USER  !!!!!!*/


// const user = new User({ username: 'test', email: 'test', password: 'test' });

// await User.add(user);
// console.log(user);
// console.log(user.toString());
// console.log(await user.type());
// console.log(await User.all());
// console.log(await User.get({id: 1}))

// console.log(await User.add(user));
// console.log(await User.get({ id: 1 }));
// console.log(await User.delete({ id: 2 }));
// console.log(
//   await User.update({
//     id: 2,
//     username: 'abc',
//   })
// );
