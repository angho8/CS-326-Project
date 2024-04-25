let drinks = {
    shots: 0,
    wine: 0,
    cocktails: 0,
    beers: 0
  };
  
  function increment(type) {
    drinks[type]++;
    updateUI();
  }
  
  function decrement(type) {
    if (drinks[type] > 0) {
      drinks[type]--;
      updateUI();
    }
  }
  
  function calculateBAC() {
    const totalDrinks = drinks.shots + drinks.wine + drinks.cocktails + drinks.beers;
    // Calculation logic here, assuming a standard BAC calculation formula
    const BAC = calculateBACValue(totalDrinks);
    document.getElementById('result').innerText = `Your Blood Alcohol Content (BAC) is ${BAC.toFixed(2)}`;
  }
  
  function calculateBACValue(totalDrinks) {
    // Insert your BAC calculation logic here
    // This is a dummy calculation, replace it with the actual formula
    return totalDrinks * 0.02; // Just an example calculation
  }
  
  function updateUI() {
    for (let type in drinks) {
      document.getElementById(type).innerText = drinks[type];
    }
  }
  