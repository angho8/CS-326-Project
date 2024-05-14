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
        this.updateDrinks();
    }
            
    /**
     * Decrements the type of drinks the user has indicated. 
     * */
    decrement(type) {
        if (drinks[type] > 0) {
            drinks[type]--;
            this.updateDrinks();
        }
    }

    /**
     * Updates the type of drinks the user has indicated
     */
    // updateDrinks() {
    //     for (let type in drinks) {
    //       document.getElementById(type).innerText = drinks[type];
    
    //     }
    // }

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

        const calculateElement = document.getElementById("calculate");
        const userinfoElement = document.getElementById("user-info");
        const gender = document.getElementById("gender").value;
        const weight = parseFloat(document.getElementById("weight").value);
        const drinkCount = parseInt(document.getElementById("drink-count").value);
        const drinkType = document.getElementById("drink-type").value;
        const drinkVolume = parseFloat(document.getElementById("drink-volume").value);



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
        const userGender = gender === 'male' ? 0.68 : 0.55;
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
