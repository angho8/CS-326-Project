/**
 * Database configuration file for initializing and managing PouchDB.
 */
import PouchDB from 'pouchdb';

/**
 *
 * This function creates a new PouchDB instance.
 * It attempts to retrieve collections for 'users' and 'drinks'. If these
 * collections do not exist, it creates them with initial empty arrays.
 *
 * @param {string} dbname - The name of the database to initialize.
 */
const initdb = async (dbname) => {
  // Initialize the database if it doesn't exist
  const db = new PouchDB(dbname);

  // Get the users collection. If it doesn't exist, create it.
  try {
    const users = await db.get('users');
  } catch (e) {
    await db.put({ _id: 'users', users: [] });
  }

  // Get the drinks collection. If it doesn't exist, create it.
  try {
    const drinks = await db.get('drinks');
  } catch (e) {
    await db.put({ _id: 'drinks', drinks: [] });
  }

  // Close the database connection
  await db.close();
};

/**
 * Factory function to create a database instance using PouchDB for managing
 * user information and drink data.
 *
 * This function initializes a database with the given name if it does not
 * already exist. It provides methods to save user information and drink data.
 * The database is re-instantiated with each method call to ensure that the
 * most recent data is used.
 * 
 */
const Database = async (dbname) => {
  // Initialize the database
  await initdb(dbname);

  const getDB = () => new PouchDB(dbname);

  const obj = {
    /**
     * Asynchronously saves user information to the database. This method
     * handles database connection, data retrieval, data modification, and
     * error handling.
     *
     */
    saveUserInfo: async (userInfo) => {
      try {
        const db = getDB();
        const data = await db.get('users');
        data.users.push(userInfo);
        await db.put(data);
        await db.close();
        return { status: 'success' };
      } catch (e) {
        return {
          status: 'error',
          message: 'Failed to save user information',
          error: e.message,
        };
      }
    },

    /**
     * Asynchronously saves drink data to the database. This method handles
     * database connection, data retrieval, data modification, and error
     * handling.
     *
     * @param {object} drinkData - Object containing drink data to be saved.
     * @returns {Promise<object>} 
     */
    saveDrinkData: async (drinkData) => {
      try {
        const db = getDB();
        const data = await db.get('drinks');
        data.drinks.push(drinkData);
        await db.put(data);
        await db.close();
        return { status: 'success' };
      } catch (e) {
        return {
          status: 'error',
          message: 'Failed to save drink data',
          error: e.message,
        };
      }
    },
  };

  return obj;
};

export default Database;
