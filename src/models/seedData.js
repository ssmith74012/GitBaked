const client = require("./client")

async function dropTables() {
  try {

  
  console.log("Dropping All Tables...")
  client.query(`
  DROP TABLE IF EXISTS orders CASCADE;
  DROP TABLE IF EXISTS products CASCADE;
  DROP TABLE IF EXISTS users CASCADE;
      
      
    `);

    console.log('Finished dropping tables!');
  } catch (error) {
    console.error('Error while dropping tables!');

    throw error;
  }
}

  // drop all tables, in the correct order
  async function createTables() {
    try {
      console.log("Starting to build tables...");
      // create all tables, in the correct order
  
      await  client.query(`
        CREATE TABLE users(
          id  SERIAL PRIMARY KEY, 
          email VARCHAR(255) UNIQUE NOT NULL, 
          password VARCHAR(255) NOT NULL
        );
      `)
  
      await  client.query(`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY, 
          name VARCHAR(255) UNIQUE NOT NULL,
          description TEXT NOT NULL
          price INTEGER
        );
      `)
      await  client.query(`
        CREATE TABLE orders(
          id SERIAL PRIMARY KEY, 
          "orderId" INTEGER REFERENCES users(id),
          email VARCHAR(255) UNIQUE NOT NULL,
          product name VARCHAR(255) NOT NULL,
          quantity INTEGER
        );
      `)
    
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }

/* 

DO NOT CHANGE ANYTHING BELOW. This is default seed data, and will help you start testing, before getting to the tests. 

*/

async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    console.log("Users created:")
    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!")
    throw error
  }
}


async function createInitialRoutines() {
  console.log("starting to create routines...")

  console.log("Routines Created: ")
  console.log("Finished creating routines.")
}

async function createInitialRoutineActivities() {
  console.log("starting to create routine_activities...")
  

 
 

  console.log("routine_activities created: ")
  console.log("Finished creating routine_activities!")
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers()
    await createInitialRoutines()
    await createInitialRoutineActivities()
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
}
