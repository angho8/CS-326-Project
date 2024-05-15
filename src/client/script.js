<<<<<<< HEAD
=======
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
    this.drinks[type]++;
    this.updateDrinks();
      // if (this.drinks[type] !== undefined) {
      //     this.drinks[type]++;
      //     this.updateDrinks();
      // }
  }

  /**
   * Decrements the type of drinks the user has indicated. 
   * @param {string} type - Type of drink to decrement (e.g., "shots", "cocktails", "beers").
   */
  decrement(type) {
    this.drinks[type]--;
    this.updateDrinks();
      // if (this.drinks[type] > 0) {
      //     this.drinks[type]--;
      //     this.updateDrinks();
      // }
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
      const totalBodyWater = gender === 'male' ? (weight * 0.68) : (weight * 0.55);
      const r = gender === 'male' ? 0.68 : 0.55;
      const bac = (alcGrams / (totalBodyWater * r)) * 100;

      return bac;
  }
}


>>>>>>> parent of f168fce (a)
/**
 * Get DOM elements 
 */

const calculateElement = document.getElementById("calculate");
const userinfoElement = document.getElementById("userInfo");
const genderElement = document.getElementById("gender"); 
const weightElement = document.getElementById("weight"); 
const drinkCountElement = document.getElementById("drink-count"); 
const drinkTypeElement = document.getElementById("drink-type"); 
const drinkVolumeElement = document.getElementById("drink-volume");  


const incrementShotsButton = document.getElementById("incrementShots");
const decrementShotsButton = document.getElementById("decrementShots");
const incrementBeersButton = document.getElementById("incrementBeers");
const decrementBeersButton = document.getElementById("decrementBeers");
const incrementCocktailsButton = document.getElementById("incrementCocktails");
const decrementCocktailsButton = document.getElementById("decrementCocktails");

// Event listeners
incrementShotsButton.addEventListener("click", () => bacCalculator.increment("shots"));
decrementShotsButton.addEventListener("click", () => bacCalculator.decrement("shots"));
incrementBeersButton.addEventListener("click", () => bacCalculator.increment("beers"));
decrementBeersButton.addEventListener("click", () => bacCalculator.decrement("beers"));
incrementCocktailsButton.addEventListener("click", () => bacCalculator.increment("cocktails"));
decrementCocktailsButton.addEventListener("click", () => bacCalculator.decrement("cocktails"));

/**
 * Calculate BAC
 */
async function calculate() {
  const gender = genderElement.value;
  const weight = parseFloat(weightElement.value);
  const drinkCount = parseInt(drinkCountElement.value);
  const drinkType = drinkTypeElement.value;
  const drinkVolume = parseFloat(drinkVolumeElement.value);

  const response = await fetch('/calculateBAC', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gender: gender,
      weight: weight,
      drinkCount: drinkCount,
      drinkType: drinkType,
      drinkVolume: drinkVolume
    })
  });
  
  const data = await response.json();
  if (document.getElementById("medical-diagnosis").value === "false") {
    userinfoElement.innerHTML = `Blood Alcohol Content (BAC): ${data.bacResult}%`;
  } else {
    userinfoElement.innerHTML = `Blood Alcohol Content (BAC): >${data.bacResult}%`;
  }

  // Call shouldShowImage with the result of the calculation
  if (shouldShowImage(data.bacResult)) {
    document.getElementById("warning.png").style.display = "block";
  }
}

/**
 * Function to determine whether to show the image
 */
function shouldShowImage(bacResult) {
  return bacResult < 0.08; // Adjust the condition based on your requirement
}

/**
 * Function to edit user information
 */
async function editUserInfo() {
  const userGender = prompt('Enter your gender : ');
  const userWeight= prompt('Enter your weight : ');
  const medDiag= prompt('Medical Diagnosis affecting Blood Alcohol: ');
  genderElement.value = userGender;
  weightElement.value = userWeight;
  document.getElementById("medical-diagnosis").value = medDiag; // Assuming this is a select element

  const userInfo = {
    gender: userGender,
    weight: userWeight,
    medicalDiagnosis: medDiag
  };

  saveUserInfo(userInfo);
}
  
// Event listener for calculate button
calculateElement.addEventListener("click", calculate);

// Event listener for user info button
userinfoElement.addEventListener("click", editUserInfo);