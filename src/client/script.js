
/**
 * Get DOM elements 
 */
const calculateElement = document.getElementById("calculate");
const userinfoElement = document.getElementById("userInfo"); // Changed ID to match HTML
const genderElement = document.getElementById("gender"); 
const weightElement = document.getElementById("weight"); 
const drinkCountElement = document.getElementById("drink-count"); 
const drinkTypeElement = document.getElementById("drink-type"); 
const drinkVolumeElement = document.getElementById("drink-volume"); 

/**
 * Calculate BAC
 */
async function calculate() {
  const gender = genderElement.value;
  const weight = parseFloat(weightElement.value);
  const drinkCount = parseInt(drinkCountElement.value);
  const drinkType = drinkTypeElement.value.to;
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
