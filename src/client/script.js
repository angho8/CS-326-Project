/**
 * Get DOM elements 
 */
const calculateElement = document.getElementById("calculate");
const userinfoElement = document.getElementById("user-info");
const gender = document.getElementById("gender").value;
const weight = parseFloat(document.getElementById("weight").value);
const drinkCount = parseInt(document.getElementById("drink-count").value);
const drinkType = document.getElementById("drink-type").value;
const drinkVolume = parseFloat(document.getElementById("drink-volume").value);


function calculateBloodAlcohol(gender, weight, height, shots=0, wine=0, cocktails=0, beers=0) {
    // Constants for the Widmark formula
    const genderCalc = gender.toLowerCase() === 'male' ? 0.55 : 0.68; // Widmark's distribution ratio
    const weightCalc = weight * 1000; // Convert weight to grams

    // Standard drink sizes in grams of alcohol
    const alcoholContent = {
        shot: 14,  // 1.5 oz of 40% alcohol
        wine: 10,  // 5 oz of 12% alcohol
        cocktail: 30,  // 3 oz of 20% alcohol
        beer: 14  // 12 oz of 5% alcohol
    };

    // Calculate total grams of alcohol consumed
    const totalAlcohol = (shots * alcoholContent['shot'] +
                          wine * alcoholContent['wine'] +
                          cocktails * alcoholContent['cocktail'] +
                          beers * alcoholContent['beer']);

    // Calculate Blood Alcohol Concentration (BAC)
    const bac = (totalAlcohol / (weightCalc * genderCalc)) * 100;

    return bac.toFixed(2);
}



async function calculate() {
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
  if (document.getElementById("medical-diagnosis").value === "false" {
  userinfoElement.innerHTML = `Blood Alcohol Content (BAC): ${data.bacResult}%`;
  
  else {
    userinfoElement.innerHTML = `Blood Alcohol Content (BAC): > ${data.bacResult}%`;
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
