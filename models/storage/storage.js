import FileStorage from './fileStorage.js';
import MysqlStorage from './mysqlStorage.js';

const dbType = process.env.db;
let Storage = null;

if (dbType == 'mysql') {
  Storage = new MysqlStorage();
} else {
  Storage = new FileStorage();
}

export default Storage;
