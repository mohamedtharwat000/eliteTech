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

	/**
	 * connect to the database
	 *
	 * @async
	 * @returns {Promise<[TODO:type]>} database Connection
	 */
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

	
	/**
	 * get all the entries in a table
	 *
	 * @async
	 * @param {Class object} cls - a clase object
	 * @returns {Promise<[TODO:type]>} return the query results 
	 */
	async all(cls) {
		if (!this.db) {
	        await this.connect();
		};
		try {
			let sql = `SELECT * FROM ${tables[cls.name]}`;
			const [rows, fields] = await this.db.execute(sql);
			console.log('SQL runs!');
			return (rows);
		} catch(err) {
			console.log(`Error Fetching Data from ${tables[cls.name]}: `, err);
			throw err;
		};
	}

	/**
	 * get an entry from the database
	 *
	 * @async
	 * @param {class object} cls - a class object
	 * @param {map} obj - a map contains the entry id
	 * @returns the query result
	 */
	async get(cls, obj) {
		if (!this.db) {
			await this.connect();
		}
		try {
			let sql = `SELECT * FROM ${tables[cls.name]} WHERE ID = ${obj.id}`;
			const [rows, fields] = await this.db.execute(sql);

			return (rows);
		} catch (err) {
			console.log('Error! ', err);
			throw err;
		};
	}

	/**
	 * delete an entry from a table
	 *
	 * @async
	 * @param {class object} cls - a class object
	 * @param {map} obj - a map that contains the entry id
	 * @returns 0 on success
	 */
	async delete(cls, obj) {
		if (!this.db) {
			await this.connect();
		}
		try {
			let sql = `DELETE FROM ${tables[cls.name]} WHERE ID = ${obj.id}`;
			const [rows, fields] = await this.db.execute(sql);

			return (0);
		} catch (err) {
			console.error(`Error deleting from ${tables[cls.name]}:`, err);
			throw err;
		};
	}

	async save(obj) {
		if (!this.db) {
			await this.connect();
		}
		let cls = obj.constructor.name
		
		try {
			// console.log(obj.toString())
			const columns = Object.keys(JSON.parse(obj.toString())).join(', ');
			const values = Object.values(JSON.parse(obj.toString())).map(value => this.db.escape(value)).join(', ');
			// console.log('cols: ', columns);
			// console.log('rows: ', values);
			let sql = `INSERT INTO ${tables[cls]} (${columns}) VALUES (${values})`;
			const [result] = await this.db.execute(sql);
		} catch (err){
			console.error(`Error inserting into ${tables[cls.name]}:`, err);
		    throw err;
		};

		// await this.close();
	} 

	/**
	 * close the db connection
	 *
	 * @async
	 */
	async close() {
		try {
		    await this.db.end();
		    console.log('Connection Closed.');
		} catch (err) {
		    console.error('Error closing MySQL:', err);
		}
	}

	
};
