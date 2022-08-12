// imports
import { getUserByEmail, getUsers } from "./storage.js";
import { handleFilter } from "./utils.js";
//variables
const table = document.getElementById("user-rows");
const form = document.getElementById("register");

const searchBadgeContainer = document.getElementById("search-badge-container");
const searchBadge = document.getElementById("search-badge");
const searchInput = document.getElementById("search-input");

const ageBadge = document.getElementById("age-badge");
const ageBadgeContainer = document.getElementById("age-badge-container");
const ageInput = document.getElementById("age-input");

// functions
const displayUsers = (isNewUser, email, usersList) => {
  // only runs when we deleted a user
  if (email) {
    console.log(email + " - " + "deleted");
    let userNode = document.getElementById(`${email}`);
    // console.log(userNode);
    table.removeChild(userNode);
    return;
  }

  const storageUsers = getUsers();
  const filters = JSON.parse(localStorage.getItem("filters"));
  // console.log(filters);

  let users;
  if (isNewUser) {
    // handle the display of new user
    let latestUser = storageUsers.pop();
    // users.push(latestUser);
    users = [latestUser];
  } else if (usersList) {
    // only when we give it a users list
    console.log("we are in userslist");
    table.innerHTML = "";

    if (usersList.length > 0) {
      users = usersList;
      console.log("userlist> 0");
    } else {
      console.log("userlist < 0");
      // users = storageUsers;
      users = [];
    }
  } else if (
    filters &&
    (filters.ageLimits.length >= 2 || filters.searchQuery)
  ) {
    // console.log("we are in the filter param");
    const ageQuery =
      filters.ageLimits.length >= 2
        ? `${filters.ageLimits[0]}-${filters.ageLimits[1]}`
        : "";
    handleFilter(filters.searchQuery, ageQuery);
  } else {
    // console.log("we are in storage users");
    users = storageUsers;
  }
  if (!users) {
    return;
  }
  if (users.length > 0) {
    users.forEach((user, index) => {
      let trElement = document.createElement("div");
      trElement.setAttribute("id", user.email);
      trElement.innerHTML = `
              <div class="flex items-center space-x-4 py-3">
              <p class="text-gray-500">${index + 1}</p>
              <div class="flex-shrink-0">
                <img
                  class="w-8 h-8 rounded-full"
                  src=${user.image}
                  alt="Neil image"
                />
              </div>
              
              <div class="flex-1 min-w-0">
                <p
                  class="text-sm font-medium text-gray-900 truncate "
                >
                ${user.name}
                </p>
                <p class="text-sm text-gray-500 truncate ">
                ${user.email}
                </p>
                <p class="text-sm text-gray-500 truncate ">
                ${user.age} --- ${user.address}
                </p>
              </div>
              <div
                class="inline-flex items-center text-base font-semibold text-gray-900"
              >
                <img
                  src="./src/assets/images/edit.png"
                  alt="delete"
                  srcset=""
                  width="22"
                  height="22"
                  onClick="editUserUiUpdate('${user.email}')"
                  class="mr-4 hover:bg-blue-400 cursor-pointer"
                />
                <img
                  src="./src/assets/images/delete.png"
                  alt="delete"
                  srcset=""
                  width="22"
                  height="22"
                  id="delete-btn"
                  onClick="removeUser('${user.email}')"
                  class="mr-2 hover:bg-red-400 cursor-pointer"
                />
              </div>
            </div>
         `;
      table.appendChild(trElement);
      // console.log(user);
    });
  } else {
    let trElement = document.createElement("div");
    trElement.innerHTML = `
              <div class="flex items-center space-x-4 py-3 bg-yellow-200 px-2 rounded-lg">
                <div class="flex-1 min-w-0 flex justify-between px-2">
                  <p
                    class="text-sm font-medium text-gray-900 truncate "
                  >
                    No Users Found
                  </p>
                  <p class="text-sm text-gray-500 truncate ">
                    404
                  </p>
                </div>
            </div>
         `;
    table.appendChild(trElement);
  }
};

const setSearchBadges = (value) => {
  // console.log(value);

  if (value) {
    searchBadgeContainer.classList.remove("hidden");
    searchBadge.innerHTML = value;
    searchInput.value = value;
  } else {
    // console.log("2");
    if (searchInput.value) {
      searchBadgeContainer.classList.remove("hidden");
      searchBadge.innerHTML = searchInput.value;
    }
  }
};

const setAgeBadges = (value) => {
  // console.log(value);
  if (value && value.length >= 2) {
    // console.log(value.length);
    ageBadgeContainer.classList.remove("hidden");
    ageBadge.innerHTML = `${value[0]}-${value[1]}`;
    ageInput.value = `${value[0]}-${value[1]}`;
  } else {
    if (ageInput.value && ageInput.value !== "Choose an age range") {
      console.log(3);
      ageBadgeContainer.classList.remove("hidden");
      ageBadge.innerHTML = ageInput.value;
    }
  }
};

const removeSearchBadge = () => {
  searchBadgeContainer.classList.add("hidden");
  searchInput.value = "";
};

const removeAgeBadge = () => {
  ageBadgeContainer.classList.add("hidden");
  ageInput.value = `Choose an age range`;
};

const editUserUiUpdate = (email) => {
  /*
    * UI changes for edit
      0 - add the user data to form inputs
      1 - update the text of the submit btn to update
      2 - disable the email input
      3 - update the gender boxes according to user
  */
  const user = getUserByEmail(email);
  console.log(user);

  // 0 - add the user data to form inputs
  const formData = new FormData(form);
  for (var pair of formData.keys()) {
    // console.log(pair + "-" + user[pair]);
    document.getElementById(pair).value = user[pair];
  }

  // 1 - update the text of the submit btn to edit
  document.getElementById("submit-btn").innerHTML = "Update";

  // 2 - disable the email input
  document.getElementById("email").readOnly = true;

  // 3 - update the gender boxes according to user
  if (user.gender === "Male") {
    document.getElementById("male").classList.add("selected");
    document.getElementById("female").classList.remove("selected");
  } else {
    document.getElementById("female").classList.add("selected");
    document.getElementById("male").classList.remove("selected");
  }
};

export {
  displayUsers,
  setSearchBadges,
  setAgeBadges,
  removeSearchBadge,
  removeAgeBadge,
  editUserUiUpdate,
};
