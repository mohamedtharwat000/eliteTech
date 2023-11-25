// import Base from '../base.js';
// import Case from '../case.js';
// import Cooler from '../cooler.js';
// import CPU from '../cpu.js';
// import GPU from '../gpu.js';
// import Headphone from '../headphone.js';
// import Keyboard from '../keyboard.js';
// import Mice from '../mice.js';
// import Monitor from '../monitor.js';
// import Motherboard from '../motherboard.js';
// import Powersupply from '../powersupply.js';
// import Ram from '../ram.js';
// import Storage from '../storage.js';
// import User from '../user.js';
// import Purchase from '../purchase.js';
// import PurchaseItem from '../purchaseItem.js';
// import ProductRating from '../productRating.js';

import mysql from 'mysql2/promise';
const tables = {Case: 'cases', Cooler: 'coolers', CPU: 'cpus',
				GPU: 'gpus', Headphone: 'headphone', Keyboard: 'keyboards',
				Mice: 'mices', Monitor: 'monitors', Motherboard: 'motherboards',
				Powersupply: 'powersupplies', Ram: 'rams', Storage: 'storages',
				User: 'users', Purchase: 'purchases', PurchaseItem: 'purchaseItems',
				ProductRating: 'productRating'
			}


/**
 * @summary Class for handling db storage operations.
 * @class
 * @public
 */

export default class MysqlStorage {
	constructor() {
		this.connect();
	};

	async connect() {
		try {
			this.db = await mysql.createConnection({
				host		: 'localhost',
				user		: 'lordy',
				password	: '',
				database	: 'elite_tech',
			});

			console.log("Connected to DB!");
		} catch (err) {
			  console.error('Error connecting to MySQL:', err);
		      throw err;
		}
	}

	
	async all(cls){
		if (!this.db) {
	        await this.connect();
		};
		console.log('cls.name: ',cls.name);
		console.log('tables[cls.name]: ', tables[cls.name]);
		let sql = `SELECT * FROM ${tables[cls.name]}`;
		const [rows, fields] = await this.db.execute(sql);
		console.log('SQL runs!');
	    return rows;
	}


	async close() {
		try {
		    await this.db.end();
		    console.log('Connection Closed.');
		} catch (err) {
		    console.error('Error closing MySQL:', err);
		}
}
	
};
