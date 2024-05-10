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


/**
 * Function to handle calculations
 */
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
  userinfoElement.innerHTML = `Blood Alcohol Content (BAC): ${data.bacResult}%`;
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
