
import PouchDB from 'pouchdb';

/**
 * Initializes a PouchDB instance and creates necessary collections if they don't exist.
 *
 * @param {string} dbname - The name of the database to initialize.
 */
const initdb = async (dbname) => {
  const db = new PouchDB(dbname);

  try {
    // Get the users collection. If it doesn't exist, create it.
    await db.get('users');
  } catch (e) {
    await db.put({ _id: 'users', users: [] });
  }

  try {
    // Get the drinks collection. If it doesn't exist, create it.
    await db.get('drinks');
  } catch (e) {
    await db.put({ _id: 'drinks', drinks: [] });
  }

  await db.close();
};

/**
 * Factory function to create a database instance using PouchDB for managing
 * user information and drink data.
 *
 * @param {string} dbname - The name of the database.
 * @returns {Object} - Database instance with saveUserInfo and saveDrinkData methods.
 */
const Database = async (dbname) => {
  await initdb(dbname);

  const getDB = () => new PouchDB(dbname);

  const obj = {
    /**
     * Asynchronously saves user information to the database.
     *
     * @param {object} userInfo - User information to be saved.
     * @returns {object} - Status object indicating success or error.
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
     * Asynchronously saves drink data to the database.
     *
     * @param {object} drinkData - Drink data to be saved.
     * @returns {object} - Status object indicating success or error.
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
