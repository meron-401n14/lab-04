'use strict';

const Teams = require('./models/teams.js');
const People = require('./models/people.js');
const Validator = require('./lib/validator.js');
const uuidValidate = require('uuid-validate');


let people = new People(process.argv.slice(2)[0]);
let teams = new Teams(process.argv.slice(3)[0]);

async function loadData() {
  let peopleData = await people.load();
  //console.log(peopleData);
  
  return peopleData
}

async function createPerson(person) {
  let team = await findTeam(person.team);
  if (!team.id) {
    team = await teams.create({ name: person.team });
  }
  return await people.create({ ...person, team: team.id });
}

async function findTeam(val) {

  let result = {};

  if (Validator.isString(val)) result = await teams.read('name', val);
  else if (Validator.isUUID(val)) result = await teams.read('id', val);

  // console.log('from team',result);
  return result;
}

async function readPerson(person) {
  let allPeople = await people.load();
  allPeople.forEach(person => {
    if (person.firstName==='Meron') 
    console.log(({ 'firstName': person.firstName, 'lastName': person.lastName, 'team': person.team }))
  });

}
  
  
      
    

async function updatePerson(id, newPersonData) {

  let updatePeople = await people.load();

}
async function deletePerson() {
  let res = {};
  let record = await teams.load();
  //console.log('fromdelete', record)
  record.forEach(item => {
    if (record.id === 'db12e2ae-042c-4fb0-b591-3b2955c82334') record.map(rec => item.delete(rec))

    //console.log(record)
  })

}

async function printTeams() {

}

async function runOperations() {
  await loadData();
  await createPerson({
    id: uuidValidate(),
    firstName: 'Meron',
    lastName: 'Sibani',
    team: 'Yellow Rhino'
  });
  await findTeam();
  await readPerson();
  await deletePerson();
  console.log('hi am here!')
}

runOperations();









