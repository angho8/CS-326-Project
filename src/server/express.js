import express from 'express';
import bodyParser from 'body-parser';
import PouchDB from 'pouchdb';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize PouchDB
const db = new PouchDB("counters");

/**
 * Blood Alcohol Calculator Class
 */
export class BloodAlcoholCalculator {
    constructor() {
        this.gender = '';
        this.weight = weight;
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
     */
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
        updateDrinks();
    }
            
    /**
     * Decrements the type of drinks the user has indicated. 
     * */
    decrement(type) {
        if (drinks[type] > 0) {
            drinks[type]--;
            updateDrinks();
        }
    }

    /**
     * Updates the type of drinks the user has indicated
     */
    updateDrinks() {
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
        const drinkType = this.drinkType.toLowerCase();
        const drinkVolume = this.drinkVolume;

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
        const totalBodyWater = this.gender === 'male' ? (this.weight * 0.68) : (this.weight * 0.55);
        const userGender = this.gender === 'male' ? 0.68 : 0.55;
        const bac = (alcGrams / (totalBodyWater * userGender)) * 100;

        return bac;
    }
}

/**
 * Routes
 */
app.post('/calculateBAC', (req, res) => {
    const { gender, weight, drinkCount, drinkType, drinkVolume } = req.body;

    const bacCalculator = new BloodAlcoholCalculator();
    bacCalculator.setGender(gender);
    bacCalculator.setWeight(weight);
    bacCalculator.setDrinkCount(drinkCount);
    bacCalculator.setDrinkType(drinkType);
    bacCalculator.setDrinkVolume(drinkVolume);

    const bacResult = bacCalculator.calculateBAC();
    res.json({ bacResult });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
