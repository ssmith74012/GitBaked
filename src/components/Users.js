// grab our db client connection to use with our adapters
const client = require("./client");

async function createUser(data) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
       INSERT INTO users(username, password) 
      VALUES($1, $2) RETURNING *;
     `,
      [data.username, data.password]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers(data) {
  /* this adapter should fetch a list of users from your db */
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE username=$1;
    `,
      [data.username]
    );

    if (user.password !== data.password) {
      return;
    }
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE id=$1;
      `,
      [userId]
    );

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE username=$1;
    `,
      [userName]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
};
