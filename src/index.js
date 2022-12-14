/*
  * Done - as a user I should be able to register
  * Done - as a user I should be able to see the list of registered users
  * Done - as a user I should be able to remove a user
  * Done - handle male and female selection
  * Done - as a user I should be able to search in users: [name, email, address]
  * Done - as a user I should be able to filter user based on: [name, age, email, address]
  * 
  * DONE - User filter data should not reset or removed after page refresh
  * DONE - Specific filter removal
  * DONE - as a user I should be able to edit a user
  * DONE - add name and email to searchfilter
  * DONE - User edit form data should not reset after refreshing the page
  * DONE - Brain Storming 
  * DONE - UX/UI
  * Done - Clean coding
    ? - Alert notification: warning, success, danger  
*/

import { saveUser, removeUser, editUser } from "./utils/storage.js";
import {
  displayUsers,
  setAgeBadges,
  setSearchBadges,
  editUserUiUpdate,
  setInEditingUser,
} from "./utils/views.js";
import { handleFilter, handleRemoveFilter } from "./utils/utils.js";

// to bind the removeUser to window
// or add an event Listner to the btn
window.removeUser = removeUser;
window.editUser = editUser;
window.editUserUiUpdate = editUserUiUpdate;

const form = document.getElementById("register");
const male = document.getElementById("male");
const female = document.getElementById("female");
const searchInput = document.getElementById("search-input");
const searchSubmitBtn = document.getElementById("search-submit");
const clearSearch = document.getElementById("clear-search");
const clearAge = document.getElementById("clear-age");
const ageInput = document.getElementById("age-input");

// filters from local storage
const filters = JSON.parse(localStorage.getItem("filters"));

// inital load ui display content
displayUsers();
setAgeBadges(filters?.ageLimits);
setSearchBadges(filters?.searchQuery);
setInEditingUser();

// Handle Selection of male and female
male.addEventListener("click", (e) => {
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

  // Validation : dont do anything if the inputs are empty
  if (!user.name && !user.email && !user.image && !user.address) return;

  /*
    To handle Register and Update
      1 - check the text of submit-btn
      2 - if its register, perform register operation by calling saveUser()
      3 - if its edit, perform update operation by calling editUser()
  */

  // 1 - check the text of submit-btn
  const submitBtnTxt = document.getElementById("submit-btn").innerHTML;
  if (submitBtnTxt === "Register") {
    // 2 - if its register, perform register operation by calling saveUser()
    saveUser(user);
    displayUsers(true);
  } else if (submitBtnTxt === "Update") {
    // 3 - if its edit, perform update operation by calling editUser()
    editUser(user.email, user);
    // displayUsers(true);
    window.location.reload();
  } else {
    // ! something is seriously wrong reload the page
    window.location.reload();
  }

  // reset the form after either task if complete
  form.reset();
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

// Filter removal listners
clearSearch.addEventListener("click", () => {
  // we send the age filter to function
  handleRemoveFilter("search", ageInput.value);
});
clearAge.addEventListener("click", () => {
  // we send the search query to function
  handleRemoveFilter("age", searchInput.value);
});
