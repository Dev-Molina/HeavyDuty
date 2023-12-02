function calculateBMR() {
    const gender = document.getElementById('gender').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const weightUnit = document.getElementById('weight-unit').value;

    // Determine height in centimeters
    let height;
    const heightUnit = document.getElementById('heightUnit').value
    const heightFeet = parseFloat(document.getElementById('feet').value) || 0;
    const heightInches = parseFloat(document.getElementById('inches').value) || 0;
    const heightCm = parseFloat(document.getElementById('centimeters').value) || 0;


    if (heightUnit === "feet_inches") {
        // Convert feet and inches to centimeters
        height = (heightFeet * 30.48) + (heightInches * 2.54);
    } else {
        // Use height in centimeters if provided
        height = heightCm;
    }

    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
        alert('Please enter valid numeric values.');
        return;
    }

    // Convert weight to kilograms if in pounds
    const weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;

    let bmr;

    if (gender === 'male') {
        bmr = 10 * weightInKg + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weightInKg + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE based on activity level
    let tdee;
    const activityLevel = document.getElementById('activity-level').value;
    switch (activityLevel) {
        case 'sedentary':
            tdee = bmr * 1.2;
            break;
        case 'lightly-active':
            tdee = bmr * 1.375;
            break;
        case 'moderately-active':
            tdee = bmr * 1.55;
            break;
        case 'very-active':
            tdee = bmr * 1.725;
            break;
        default:
            tdee = bmr;
    }

    // Adjust TDEE based on weight management goal
    const goal = document.getElementById('goal').value;
    switch (goal) {
        case 'lose':
            tdee -= 500; // Caloric deficit for weight loss
            break;
        case 'gain':
            tdee += 500; // Caloric surplus for weight gain
            break;
        default:
        // Maintain weight, no adjustment needed
    }

    document.getElementById('result').innerHTML = `Your Basal Metabolic Rate (BMR) is ${bmr.toFixed(2)} calories per day. Your Total Daily Energy Expenditure (TDEE) is ${tdee.toFixed(2)} calories per day. Adjust your daily caloric intake based on your goals.`;
}

function logWorkout() {
    const exercise = document.getElementById('exercise').value;
    const sets = parseInt(document.getElementById('sets').value, 10);
    const maxReps = parseInt(document.getElementById('max-reps').value, 10);
    const weightLbs = parseFloat(document.getElementById('weight-lbs').value) || 0;
    const warmUpSets = document.getElementById('warm-up-sets').value;

    // Create a workout object
    const workout = {
        exercise: exercise,
        sets: sets,
        maxReps: maxReps,
        weightLbs: weightLbs,
        warmUpSets: warmUpSets,
        date: new Date().toLocaleDateString()
    };

    // Retrieve existing workouts from localStorage
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

    // Add the current workout to the list
    workouts.push(workout);

    // Save the updated workouts back to localStorage
    localStorage.setItem('workouts', JSON.stringify(workouts));

    // Clear the form fields for the next entry
    document.getElementById('exercise').value = '';
    document.getElementById('sets').value = '';
    document.getElementById('max-reps').value = '';
    document.getElementById('weight-lbs').value = '';
    document.getElementById('warm-up-sets').value = '';

    // Optionally, you can display a success message or perform other actions
    console.log('Workout logged successfully!');

    window.location.href = 'history.html';
}

function capitalized(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
