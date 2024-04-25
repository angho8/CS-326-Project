/**
 * Class representing a Blood Alcohol Calculator.
 */
class BloodAlcoholCalculator {
    /**
     * Create a Blood Alcohol Calculator.
     */
    constructor() {
      this.gender = '';
      this.weight = weight;
      this.drinkCount = 0;
      this.drinkType = '';
      this.drinkVolume = 0;
    }
  
    /**
     * Sets user's gender.
     * @param {string} gender - User's gender anything typed in.
     */
    setGender(gender) {
      this.gender = gender;
    }
  
    /**
     * Sets user's weight.
     * @param {number} weight - User's weight in pounds.
     */
    setWeight(weight) {
      this.weight = weight;
    }
  
    /**
     * Sets number of drinks consumed.
     * @param {number} count - Number of drinks consumed.
     */
    setDrinkCount(count) {
      this.drinkCount += count;
    }
  
    /**
     * Sets type of drink consumed.
     * @param {string} type - Type of drink consumed.
     */
    setDrinkType(type) {
      this.drinkType = type;
    }
  
    /**
     * Set volume of drink consumed based on drink type.
     * @param {string} drinkType - Type of drink consumed (e.g., "shot", "glass", "martini", "rocks", "cocktail", "champagne").
     */
    setDrinkVolume(drinkType) {
        switch (drinkType.toLowerCase()) {
            case 'shot':
                this.drinkVolume = 44; 
                break;
            case 'glass':
                this.drinkVolume = 177; 
                break;
            case 'martini':
                this.drinkVolume = 120; 
                break;
            case 'rocks':
                this.drinkVolume = 89; 
                break;
            case 'cocktail':
                this.drinkVolume = 150; 
                break;
            case 'champagne':
                this.drinkVolume = 150; 
                break;
            case 'beer':
                this.drinkVolume = volume; // Set volume to user-provided value for beer
            break;
            // Add more cases for other drink types as needed
            default:
                this.drinkVolume = 0; // Set default volume to 0 if the drink type is not recognized
            }
        }

  
    /**
     * Calculate Blood Alcohol Content (BAC) based on user input.
     * @returns {number} - Blood Alcohol Content (BAC) percentage.
     */
    calculateBAC() {
        // Get the drink type and volume set by the user
        const drinkType = this.drinkType.toLowerCase();
        const drinkVolume = this.drinkVolume;
    
        // Determine the default ABV based on the drink type
        let defaultAbv;
        switch (drinkType) {
            case 'shot':
                defaultAbv = 0.4; // Average ABV for shots
                break;
            case 'glass':
                defaultAbv = 0.12; // Average ABV for wine in a glass
                break;
            case 'martini':
                defaultAbv = 0.24; // Average ABV for martinis
                break;
            case 'rocks':
                defaultAbv = 0.4; // Average ABV for drinks served on the rocks
                break;
            case 'cocktail':
                defaultAbv = 0.15; // Average ABV for cocktails
                break;
            case 'champagne':
                defaultAbv = 0.12; // Average ABV for champagne
                break;
            case 'beer':
                defaultAbv = 0.05; // Average ABV for beer
                break;
            default:
                defaultAbv = 0.05; // Default to beer if drink type is not recognized
            }

    
        // Calculate the volume of alcohol in grams
        const alcGrams = (drinkVolume * 0.789) * defaultAbv;
    
        // Calculate BAC using Widmark formula
        const totalBodyWater = this.gender === 'male' ? this.weight * 0.68 : this.weight * 0.55;
        const r = this.gender === 'male' ? 0.68 : 0.55;
        const bac = (alcGrams / (totalBodyWater * r)) * 100;
    
        return bac.toFixed(2); // Return BAC rounded to 2 decimal places
        }
    }
  
  
  // Create an instance of the BloodAlcoholCalculator class
  const bacCalculator = new BloodAlcoholCalculator();
  
  // Get DOM elements
  const calculateElement = document.getElementById("calculate");
  const userinfoElement = document.getElementById("user-info");
  
  // Function to handle calculation
  function calculate() {
    const gender = document.getElementById("gender").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const drinkCount = parseInt(document.getElementById("drink-count").value);
    const drinkType = document.getElementById("drink-type").value;
    const drinkVolume = parseFloat(document.getElementById("drink-volume").value);
  
    // Set user inputs
    bacCalculator.setGender(gender);
    bacCalculator.setWeight(weight);
    bacCalculator.setDrinkCount(drinkCount);
    bacCalculator.setDrinkType(drinkType);
    bacCalculator.setDrinkVolume(drinkVolume);
  
    // Calculate BAC
    const bacResult = bacCalculator.calculateBAC();
  
    // Display BAC result
    userinfoElement.innerHTML = `Blood Alcohol Content (BAC): ${bacResult}%`;
  }
  
  // Event listener for calculate button
  calculateElement.addEventListener("click", () => {
    calculate();
  });


  