import express from 'express';
import bodyParser from 'body-parser';
import PouchDB from 'pouchdb';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('src'));

// Initialize PouchDB
const db = new PouchDB("counters");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initialize database
 */
const initdb = async () => {
    try {
        await db.get('users');
    } catch (e) {
        await db.put({ _id: 'users', users: [] });
    }

    try {
        await db.get('drinks');
    } catch (e) {
        await db.put({ _id: 'drinks', drinks: [] });
    }
};

initdb();

/**
 * Blood Alcohol Calculator Class
 */
export class BloodAlcoholCalculator {
    constructor() {
        this.gender = '';
        this.weight = 0;
        this.medical = '';
        this.drinkCount = 0;
        this.drinkType = '';
        this.drinkVolume = 0;
        this.drinks = {
            shots: 0,
            cocktails: 0,
            beers: 0
        };
    }

    /**
     * Sets user's gender.
     * @param {string} gender 
     */
    setGender(gender) {
        this.gender = gender;
    }

    /**
     * Sets user's weight.
     * @param {number} weight 
     * define weight **/

    setWeight(weight) {
        this.weight = weight;
    }


    /**
     * Sets user's weight.
     * @param {string} medical 
     */
    setMedical(medical) {
        this.medical = medical;
    }

  /**
   * Increments the type of drinks the user has indicated.
   * */
  increment(type) {
    drinks[type]++;
    updateUI();
  }

  /**
   * Decrements the type of drinks the user has indicated. 
   * @param {string} type - Type of drink to decrement (e.g., "shots", "cocktails", "beers").
   */
  decrement(type) {
    if (drinks[type] > 0) {
      drinks[type]--;
      updateUI();
    }
  }
          
  /**
   * Updates the type of drinks the user has indicated
   */
  updateUI() {
    for (let type in drinks) {
      document.getElementById(type).innerText = drinks[type];
    }
  }


    setDrinkType(drinkType){
        this.drinkType = drinkType;
    }

    setDrinkCount(drinkCount){
        this.drinkCount = drinkCount;
    }

    /**
     * Set volume of drink consumed based on drink type.
     * @param {string} drinkType - Type of drink consumed (e.g., "shot", "beer", "cocktail").
     */
    setDrinkVolume(drinkType) {
        switch (drinkType.toLowerCase()) {
            case 'shot':
                this.drinkVolume = 44;
                break;
            case 'cocktail':
                this.drinkVolume = 150;
                break;
            case 'beer':
                this.drinkVolume = 285;
                break;
            default:
                this.drinkVolume = 0;
        }
    }



    /**
     * Calculate Blood Alcohol Content (BAC) based on user input.
     * @returns {number} - Blood Alcohol Content (BAC) percentage.
     */
    calculateBAC() {
        const gender = this.gender;
        const weight = this.weight;
        const drinkType = this.drinkType;
        const drinkVolume = this.drinkVolume;

        drinkType = drinkType.toLowerCase();
        drinkVolume = drinkVolume;

        let defaultAbv;
        switch (drinkType) {
            case 'shot':
                defaultAbv = 0.4;
                break;
            case 'cocktail':
                defaultAbv = 0.15;
                break;
            case 'beer':
                defaultAbv = 0.05;
                break;
            default:
                defaultAbv = 0.05;
        }

        const alcGrams = (drinkVolume * 0.789) * defaultAbv;
        const totalBodyWater = gender === 'male' ? (weight * 0.68) : (weight * 0.55);
        const r = gender === 'male' ? 0.68 : 0.55;
        const bac = (alcGrams / (totalBodyWater * r)) * 100;

        return bac;
    }
}

const bacCalculator = new BloodAlcoholCalculator();

/**
 * Routes
 */
app.post('/calculateBAC', async (req, res, next) => {
    try {
        const { gender, weight, drinkCount, drinkType } = req.body;

        // Set user's information in the calculator instance
        bacCalculator.setGender(gender);
        bacCalculator.setWeight(weight);
        bacCalculator.setDrinkType(drinkType);
        bacCalculator.setDrinkCount(drinkCount);
        bacCalculator.setDrinkVolume(drinkType);

        // Calculate BAC
        const bacResult = bacCalculator.calculateBAC();

        // Send the BAC result as response
        res.json({ bacResult });
    } catch (e) {
        next(e);
    }
});

app.get('/users', async (req, res) => {
    try {
        const data = await db.get('users');
        res.json(data.users);
    } catch (e) {
        res.status(500).json({ message: 'Failed to retrieve users' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { userInfo } = req.body;
        const data = await db.get('users');
        data.users.push(userInfo);
        await db.put(data);
        res.status(201).json({ message: 'User added successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Failed to add user' });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userInfo } = req.body;
        const data = await db.get('users');
        const userIndex = data.users.findIndex(user => user._id === id);
        if (userIndex === -1) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        data.users[userIndex] = userInfo;
        await db.put(data);
        res.json({ message: 'User updated successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Failed to update user' });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await db.get('users');
        data.users = data.users.filter(user => user._id !== id);
        await db.put(data);
        res.json({ message: 'User deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.use(express.static(path.join(__dirname, '../client')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});