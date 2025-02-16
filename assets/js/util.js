const days = ["Mon.", "Tues.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."];

// use this function to generate random dishes, with ingredients
export function generateRandomDishes(userAlergies, dishes, numberOfDishes) {
  // generate random dishes, without alergies

  let currentDishCount = 0;
  let randomDishes = {}; // {index: {dishDetail}}
  let visitedDish = new Set(); // (0)

  let dishesLength = dishes.length;

  while (currentDishCount < numberOfDishes && visitedDish.size < dishesLength) {
    // stop the loop 1) when we find the number of dishes we desire
    //               2) when we have visited all the possible dishes in our set

    let randomDishIndex = Math.floor(Math.random() * dishesLength); // 0

    if (visitedDish.has(randomDishIndex)) {
      continue;
    }

    visitedDish.add(randomDishIndex);

    if (randomDishIndex in randomDishes) continue; // not duplicating dish
    let randomDish = dishes[randomDishIndex];

    // check if any of the food ingeredients are present in the user alergies choice
    let foodHasAlergies = randomDish["ingredients"].some((ingredient) =>
      userAlergies.has(ingredient)
    );

    if (foodHasAlergies) {
      console.log(
        "Hash Alergi: " + foodHasAlergies + " Index: " + randomDishIndex
      );
      console.log(randomDish);
      continue;
    }

    // if dish is not in alergies list, and is unique, add
    randomDishes[randomDishIndex] = randomDish;
    currentDishCount += 1;
  }

  return Object.values(randomDishes); // ignore index of the dish and return dish detail
}

export function generateWeeklyFood(randomDishes, userPickedStartDate) {
  const daysContainer = document.getElementById("days");
  daysContainer.innerHTML = "";
  let numberOfDays = 7; // Math.abs(userPickedEndDate - userPickedStartDate);

  for (
    let startDay = userPickedStartDate;
    startDay < userPickedStartDate + numberOfDays;
    startDay++
  ) {
    let index = startDay % 7;
    daysContainer.appendChild(
      createWeekdayStructure(days[index], index, randomDishes[index])
    );
  }
}

export function createWeekdayStructure(day, index, dish) {
  // Create the parent list item element
  const li = document.createElement("li");
  li.className = `weekday ${"div" + (index + 1)}`;

  // Create the first child div with Sunday heading
  const boxDiv = document.createElement("div");
  boxDiv.className = `box ${day.toLowerCase()}`;

  const h3 = document.createElement("h3");
  h3.className = "day-name";
  h3.textContent = day;

  boxDiv.appendChild(h3);
  li.appendChild(boxDiv);

  // Create the bubble div
  const bubbleDiv = document.createElement("div");
  bubbleDiv.className = "bubble";
  bubbleDiv.id = day;

  // Create the foodinfo child divs
  const dishName = document.createElement("div");
  dishName.className = "dish-name";
  dishName.innerText = dish.name;

  const dishIngredients = document.createElement("ul");
  dishIngredients.className = "foodinfo dish-ingredients flex flex-wrap";

  dish.ingredients.forEach((ingredient, index) => {
    // create li
    const li = document.createElement("li");
    if (index != dish.ingredients.length - 1) {
      li.innerHTML = ingredient + ",";
    } else {
      li.innerHTML = ingredient;
    }

    dishIngredients.appendChild(li);
    // append it to dishIngredients
  });

  const dishCalories = document.createElement("div");
  dishCalories.className = "foodinfo dish-calories";
  dishCalories.innerText = dish.calories + " Calories";

  // Append the foodinfo divs to the bubble div
  bubbleDiv.appendChild(dishName);
  bubbleDiv.appendChild(dishIngredients);
  bubbleDiv.appendChild(dishCalories);

  // Append the bubble div to the list item
  li.appendChild(bubbleDiv);

  // Append the entire structure to the document (e.g., to a parent ul)
  return li;
}
