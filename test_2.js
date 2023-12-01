import data from './dataManager.js';

console.log('Adding a new Mice record......')
console.log(await data.create('gpu', {'name': 'MSI GEFORCE','chipest': 'RTX 3060 TI', 'price': 1200, 'color':'Grey', 'manufactor': 'MSI'}));

console.log('Adding a new Mice record with Zero data......')
console.log(await data.create('gpu', {}));


console.log('GPU with ID 2:')
console.log(await data.read('gpu', {id: 2}))


console.log('Update the name of a GPU with ID 2:')
console.log(await data.update('gpu', { id: 2 , 'price': 999.99}))

console.log('GPU with ID 2:')
console.log(await data.read('gpu', {id: 2}))

console.log('Delete a GPU with ID 2:')
console.log(await data.delete('gpu', {id: 2}))

console.log('Get all GPU')
// console.log(await data.read('gpu', {}))
// Commented the previous line because the output is huge.
