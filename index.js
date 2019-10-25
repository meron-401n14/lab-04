'use strict';

const Teams = require('./models/teams.js');
const People = require('./models/people.js');
const Validator = require('./lib/validator.js');
 const uuidValidate = require('uuid-validate');


let people = new People(process.argv.slice(2)[0]);
let teams = new Teams(process.argv.slice(3)[0]);

async function loadData() {
  let peopleData = await people.load();
  console.log(peopleData);
  let teamData = await teams.load();
}



    

async function createPerson(person) {
  let team = await findTeam(person.team);

  if (!team.id) {
    team = await teams.create({ name: person.team });
  }
  
  return await people.create({ ...person, team: team.id });
  }
  // In order to create a new person
  // check if their team exists
  // if not, create a new team
  // set this new person's team equal to the new
  // team id created
  // finaly, create this person

    // should we first validate that:
    // person.team exists
    // person.team is NOT a uuid

    // create the team
    // get that new id
    // create person

async function findTeam(val) {
  // val can be either id or a string
  // shouldn't matter, i should just try to find
  // if that team exists

  let result = {};

  if (Validator.isString(val)) result = await teams.read('name', val);
  else if (Validator.isUUID(val)) result = await teams.read('id', val);

  console.log(result);
  return result;
}


async function readPerson(person) {
  // search
  // go through and read the people database
  // find people that match whatever params this function
  // has
  let res = await people.read('firstName', person);
console.log('my place', res);

}



async function updatePerson(id, newPersonData) {
  // call people.update

  people.update();
  if(item.id !== team.id) {

  
  }

  console.log("this is:",  newPersonData);
  // UNLESS
  // did this person change teams?
  // if they did
  // you need to verify the team they are now in exists
  // and you need to verify the team they left still has some people
}

async function deletePerson() {
  // if you delete a person and their team
  // no longer has people
  // you should delete the team!
}

async function printTeams() {
  // for each team
  // print the name
  // print the members of that team
}

async function runOperations() {
  await loadData();
  await createPerson({
    id:uuidValidate(),
    firstName: 'Meron',
    lastName: 'Sibani',
    team: 'Yellow Rhino'
  });
  await findTeam();
  await readPerson();
  console.log('hi am here!')
}
  


  

runOperations();
 


  


