import { readFileSync, writeFileSync } from 'fs';

export default class FileStorage {
  constructor() {
    this.data = {};
  }

  all() {
    try {
      const all = readFileSync(
        process.cwd() + '/models/storage/json/productTypes.json',
        'utf8'
      );
      return JSON.parse(all);
    } catch (err) {
      throw err;
    }
  }

  save(obj) {
    let data = readFileSync(
      `${process.cwd()}/models/storage/json/${obj.constructor.name.toLowerCase()}.json`,
      'utf8'
    );
    data = JSON.parse(data);
    data.push(JSON.parse(obj.toString()));
    writeFileSync(
      `${process.cwd()}/models/storage/json/${obj.constructor.name.toLowerCase()}.json`,
      JSON.stringify(data),
      'utf8'
    );
  }

  delete() {}

  get() {}

  close() {
    this.data = {};
  }
}
