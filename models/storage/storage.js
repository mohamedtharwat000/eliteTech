import FileStorage from './fileStorage';
import MysqlStorage from './mysqlStorage';

const dbType = process.env.db;
let Storage = null;

if (dbType) {
  Storage = MysqlStorage;
} else {
  Storage = FileStorage;
}

export default Storage;
