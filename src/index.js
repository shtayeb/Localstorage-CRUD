/*
  * Done - as a user I should be able to register
  * Done - as a user I should be able to see the list of registered users
  * Done - as a user I should be able to remove a user
  * Done - handle male and female selection
  * Done - as a user I should be able to search in users: [name, email, address]
  * Done - as a user I should be able to filter user based on: [name, age, email, address]
  * 
  * DONE - User filter data should not reset or removed after page refresh
    TODO - as a user I should be able to edit a user
    TODO - User edit form data should not reset after refreshing the page
    TODO - UX/UI
    TODO - Clean coding
    TODO - Alert notification: warning, success, danger
    TODO - Brain Storming 
    TODO - add name and email to searchfilter
  
*/

import { saveUser, removeUser } from "./utils/storage.js";
import { displayUsers, setAgeBadges, setSearchBadges } from "./utils/views.js";
import { handleFilter, handleRemoveFilter } from "./utils/utils.js";

// to bind the removeUser to window
// or add an event Listner to the btn
window.removeUser = removeUser;

const form = document.getElementById("register");
const male = document.getElementById("male");
const female = document.getElementById("female");
// search
const searchInput = document.getElementById("search-input");
const searchSubmitBtn = document.getElementById("search-submit");
// const searchBadge = document.getElementById("search-badge");
// const searchBadgeContainer = document.getElementById("search-badge-container");
const clearSearch = document.getElementById("clear-search");
const clearAge = document.getElementById("clear-age");
// age
// const ageBadge = document.getElementById("age-badge");
// const ageBadgeContainer = document.getElementById("age-badge-container");
const ageInput = document.getElementById("age-input");

// filters from local storage
const filters = JSON.parse(localStorage.getItem("filters"));

// inital load ui display content
displayUsers();
setAgeBadges(filters?.ageLimits);
setSearchBadges(filters?.searchQuery);

// Handle Selection of male and female
male.addEventListener("click", (e) => {
  // console.log("male");
  female.classList.remove("selected");
  male.classList.add("selected");
});
// Handle Selection of male and female
female.addEventListener("click", (e) => {
  male.classList.remove("selected");
  female.classList.add("selected");
});

// handle submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const gender = male.classList.contains("selected") ? "Male" : "Female";

  let formData = new FormData(form);
  let user = {
    name: formData.get("name"),
    email: formData.get("email"),
    age: formData.get("age"),
    address: formData.get("address"),
    image: formData.get("image"),
    gender,
  };

  if (!user.name && !user.email && !user.image) {
    return;
  }

  saveUser(user);
  displayUsers(true);
  form.reset();
  // console.log(new FormData(form).get("name"));
});

// handle search functionality
searchSubmitBtn.addEventListener("click", () => {
  setSearchBadges();
  handleFilter(searchInput.value, ageInput.value);
});

// handle age select filter
ageInput.addEventListener("change", () => {
  setAgeBadges();
  handleFilter(searchInput.value, ageInput.value);
});

clearSearch.addEventListener("click", () => {
  // we send the age filter to function
  handleRemoveFilter("search", ageInput.value);
});
clearAge.addEventListener("click", () => {
  // we send the search to function
  handleRemoveFilter("age", searchInput.value);
});
