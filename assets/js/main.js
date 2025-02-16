import { dishes } from "./arrays.js";
import { allergies } from "./arrays.js";
import {
  generateRandomDishes,
  generateWeeklyFood,
  createWeekdayStructure,
} from "./util.js";


const today = new Date();
let userAlergies = new Set();
let userPickedStartDate = new Date().getDay();

const ulAlergies = document.getElementById("alergies");

const generateMenuButton = document.getElementById("generateBtn");
generateMenuButton.addEventListener("click", handleGenerateMenuBtnClick);

const calendarStartDate = document.getElementById("calendarStartDatePicker");
const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
calendarStartDate.min = formattedDate;

calendarStartDate.addEventListener("input", function (e) {
  //clickedDay is the day someone clicks on
  const clickedDay = new Date(e.target.value);

  //assigned Monday to index 0, Tuesday to index 1, Wednesday to index 2, Thursday to index 3, Friday to index 4, Saturday to index 5, Sunday to index 6
  let weekDay = clickedDay.getDay();

  userPickedStartDate = weekDay;
});

allergies.forEach((allergy) => {
  // Create a <li> element
  const li = document.createElement("li");
  li.className = "allergen flex justify-center align-center";

  // Create the <input> checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.id = allergy.toLowerCase().replace(/\s+/g, "-");
  checkbox.value = allergy;

  checkbox.addEventListener("click", handleCheckBoxClick);

  // Create the <p> element for the allergy text
  const label = document.createElement("label");
  label.textContent = allergy;
  label.htmlFor = allergy.toLowerCase().replace(/\s+/g, "-");

  // Append the checkbox and <p> to the <li>
  li.appendChild(checkbox);
  li.appendChild(label);

  // Append the <li> to the <ul>
  ulAlergies.appendChild(li);
});

//allergy boxes
function handleCheckBoxClick(event) {
  let checkBoxValue = event.target.value;

  if (userAlergies.has(checkBoxValue)) {
    userAlergies.delete(checkBoxValue);
  } else {
    userAlergies.add(checkBoxValue);
  }
}

function handleGenerateMenuBtnClick() {
  let randomDishes = generateRandomDishes(userAlergies, dishes, 7);
  generateWeeklyFood(randomDishes, userPickedStartDate);

  const bubbleText = document.querySelectorAll(".bubble");

  //Adds animation to bubble divs
  bubbleText.forEach(function (bubble) {
    bubble.classList.remove("fade-in");
    bubble.classList.add("fade-in");
  });
}
