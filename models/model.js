'use strict';

const fs = require('fs');
const util = require('util');
const uuid = require('uuid/v4');
const validator = require('../lib/validator.js');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Model {
  constructor(schema, file) {
    this.schema = schema;
    this.file = file;
    this.database = [];
  }
  /**
   * @load read the file asynchronously and save the results in contents 
   * @function
   */
  async load() {
    let contents = await readFile(this.file);
    this.database = JSON.parse(contents.toString().trim());
    return this.database;
  }


  /**
   * @create it create an item new object going to be write to the database 
   * @param {*} item 
   * 
   */

  async create(item) {

    let record = { id: uuid(), ...item };
    let isValid = this.sanitize(item);

    if (isValid) {
      this.database.push(record);
      await writeFile(this.file, JSON.stringify(this.database));

      return record;
    }

    return 'Invalid schema';
  }

  async read(key, val) {
    let found = {};
    await this.load();
    this.database.forEach(item => {
      if (item[key] === val) found = item;
    });

    return found;
  }

  async update(id, item) {

    let record = this.sanitize(item);
    if (record.id) {
      this.database = this.database.map((item) =>
        (item.id === id) ? record : item)
      await writeFile(this.database, JSON.stringify(this.database));
      return record;

    }

    return record;


  }

  async delete(id) {

    await this.database.forEach(record => {
      if (record.id === id) map.delete(record);
      let res = writeFile(this.database, JSON.stringify(this.database));
      return res;
    });


  }

  sanitize(item) {
    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach(field => {
      if (this.schema[field].required) {
        if (item[field]) {
          record[field] = item[field];
        } else {
          valid = false;
        }

      }
      else {
        record[field] = item[field];
      }
    });
    return valid ? record : undefined;
  }


}
/**
 * people and team schema and CRUD functions 
 * @module ModuleName
 */

module.exports = Model;


