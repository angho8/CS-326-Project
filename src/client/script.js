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
  }
  else {
    userinfoElement.innerHTML = `Blood Alcohol Content (BAC): >${data.bacResult}%`;
  }
}


/**
 * Fetch and display user information
 */
async function getUserInfo() {
  const response = await fetch('/users', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const data = await response.json();
  console.log(data); 
}

/**
 * Save user information
 */
async function saveUserInfo(userInfo) {
  const response = await fetch('/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userInfo })
  });
  const data = await response.json();
  console.log(data); 
}

/**
 * Update user information
 */
async function updateUserInfo(id, userInfo) {
  const response = await fetch(`/users/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userInfo })
  });
  const data = await response.json();
  console.log(data);
}

/**
 * Delete user information
 */
async function deleteUserInfo(id) {
  const response = await fetch(`/users/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const data = await response.json();
  console.log(data); 
}



/**
 * Updates the type of drinks the user has indicated
 */
async function updateDrinks() {
  for (let type in drinks) {
    document.getElementById(type).innerText = drinks[type];
  }
}

/**
 * Function to edit user information
 */
async function editUserInfo() {
  const userGender = prompt('Enter your gender : ');
  const userWeight= prompt('Enter your weight : ');
  const medDiag= prompt('Medical Diagnosis affecting Blood Alcohol: ');
  document.getElementById("gender").value = userGender;
  document.getElementById("weight").value = userWeight;
  document.getElementById("medical-diagnosis").value = medDiag;

  const userInfo = {
    gender: userGender,
    weight: userWeight,
    medicalDiagnosis: medDiag
  };
  function shouldShowImage() {
    if (calculateElement < 0.08){
      return true}
      else {
        return false
    }
  }

  // Check if the condition is true, and display the image if so
if (shouldShowImage()) {
  document.getElementById("myImage").style.display = "block";
}
  saveUserInfo(userInfo);
}
  
// Event listener for calculate button
calculateElement.addEventListener("click", calculate);

//Event listener for user info button
userinfoElement.addEventListener("click", editUserInfo);
