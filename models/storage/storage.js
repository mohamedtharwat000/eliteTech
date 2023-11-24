import FileStorage from './fileStorage.js';
// import MysqlStorage from './mysqlStorage.js';

const dbType = process.env.db;
let Storage = null;

if (dbType) {
  Storage = MysqlStorage;
} else {
  Storage = FileStorage;
}

export default Storage;
