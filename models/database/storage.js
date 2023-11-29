import FileStorage from './fileStorage.js';
import MysqlStorage from './mysqlStorage.js';

let Storage = null;

if (process.env.db == 'mysql') {
  Storage = new MysqlStorage();
} else {
  Storage = new FileStorage();
}

export default Storage;
