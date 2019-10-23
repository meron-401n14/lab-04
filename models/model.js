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
  

  // CRUD: create
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
    // item = the new object we're gonna write to our database

    // first, check that item is the right format
    // check it matches the schema
    // all the required fields are there
    // all the fields are of the right type
    // ... is the spread operator
    // it expands the contents of the variable so that
    // you can copy it into another object/array

      // let's create the thing!
      // first, add it to our local database object

      // write my changed database back to the file

  // CRUD: read / search - we don't know if it exists
  async read(key, val) {
    let found = {};
    await this.load();
    this.database.forEach(item => {
      if (item[key] === val) found = item;
    });

    return found;
  }
    // go through this.database array
    // if the object at this.database[indx] has a key
    // val pair that matches the parameter val
    // return that object


    // this is optional, but recommended
    // in case you forgot to load, made some
    // change and didn't update this.database, etc


  // CRUD: update - you usually only update something that exists
  // if something exists, it has an id

  async update(id, item) {

    let  record = this.sanitize(item);
    if(record.id)
    { this.database = this.database.map((item)=>
      (item.id === id)? record : item)
      return Promise.resolve(record);
    }

    return record;
   
    // change a piece of the data
    // change data where data.id === id
    // [async] write data to file
    // make sure your change is in this.database
    // write this.database to file
  }

  // CRUD: delete
  async delete(id) {
    this.database = this.database.filter((record)=> 
    record.id !==id);
    return Promise.resolve(record);
    // find this.database object where object.id === id (forEach??)
    // remove that object (map??)
    // [async] write the new (smaller) this.database to the file
  }

  // Validation
  sanitize(item) {
    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach(field => {
      if(this.schema[field].required){
        if(item[field]) {
          record[field] = item[field];
        } else {
          valid = false;
        }

      }
      else{
        record[field] = item[field];
    }
    });
    return valid ? record: undefined;
  }
  
    // do something to check that item is valid
    // against this.schema

}

/**
 * people and team schema and CRUD functions 
 * @module ModuleName
 */

module.exports = Model;
