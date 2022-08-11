// * done
// as a user I should be able to register
// * done
// as a user I should be able to see the list of registered users
// * done
// as a user I should be able to remove a user
// * done
// handle male and female selection
// * done
// as a user I should be able to search in users: [name, email, address]
// * done
// search autocomplete
// TODO
// as a user I should be able to edit a user
// TODO
// as a user I should be able to filter user based on: [name, age, email, address]

//

import { saveUser, removeUser } from "./utils/storage.js";
import { displayUsers } from "./utils/views.js";
import { handleSearch, handleAgeFilter } from "./utils/utils.js";

// to bind the removeUser to window
// or add an event Listner to the btn
window.removeUser = removeUser;

const form = document.getElementById("register");
const male = document.getElementById("male");
const female = document.getElementById("female");
// search
const searchInput = document.getElementById("search-input");
const searchSubmitBtn = document.getElementById("search-submit");
const searchBadge = document.getElementById("search-badge");
const searchBadgeContainer = document.getElementById("search-badge-container");
const clearSearch = document.getElementById("clear-search");
// age
const ageBadge = document.getElementById("age-badge");
const ageBadgeContainer = document.getElementById("age-badge-container");
const ageInput = document.getElementById("age-input");

displayUsers();

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
searchSubmitBtn.addEventListener("change", () => {
  if (searchBadgeContainer.classList.contains("hidden")) {
    searchBadgeContainer.classList.remove("hidden");
  }
  searchBadge.innerHTML = searchInput.value;
  handleSearch(searchInput.value);
});
searchInput.addEventListener("input", () => {
  if (searchBadgeContainer.classList.contains("hidden")) {
    searchBadgeContainer.classList.remove("hidden");
  }
  if (!searchInput.value) {
    searchBadgeContainer.classList.add("hidden");
  }
  searchBadge.innerHTML = searchInput.value;

  handleSearch(searchInput.value);
});
// clear all search
clearSearch.addEventListener("click", () => {
  displayUsers();
  searchBadgeContainer.classList.add("hidden");
  searchBadge.innerHTML = "";
});

// handle age select filter
ageInput.addEventListener("change", () => {
  if (ageBadgeContainer.classList.contains("hidden")) {
    ageBadgeContainer.classList.remove("hidden");
  }
  ageBadge.innerHTML = ageInput.value;
  handleAgeFilter(ageInput.value);
});
