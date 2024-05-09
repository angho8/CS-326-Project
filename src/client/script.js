  
/**
 * Get DOM elements 
 */
const calculateElement = document.getElementById("calculate");
const userinfoElement = document.getElementById("user-info");
const gender = document.getElementById("gender");
const weight = parseFloat(document.getElementById("weight"));
const drinkCount = parseInt(document.getElementById("drink-count"));
const drinkType = document.getElementById("drink-type");
const drinkVolume = parseFloat(document.getElementById("drink-volume"));


/**
 * Function to handle calculations
 */
async function calculate() {
  const response = await fetch('/calculateBAC',{
    method: 'POST', 
  })

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


/**
 * Function to edit user information
 */
async function editUserInfo() {
  const userGender = prompt('Gender : ');
  const userWeight= prompt('Weight : ');
  const userHeight = prompt('Height : ' );
  const medDiag= prompt('Medical Diagnosis affecting Blood Alcohol: ');
  document.getElementById("gender").value = userGender;
  document.getElementById("weight").value = userWeight;
  document.getElementById("height").value = userHeight;
  document.getElementById("medical-diagnosis").value = medDiag;
}
  
// Event listener for calculate button
calculateElement.addEventListener("click", calculate);

//Event listener for user info button
userinfoElement.addEventListener("click", editUserInfo);
