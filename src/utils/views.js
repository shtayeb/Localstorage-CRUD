// imports
import { getUsers } from "./storage.js";

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
function displayUsers(isNewUser, email, usersList) {
  // only runs when we deleted a user
  if (email) {
    console.log(email + " - " + "deleted");
    let userNode = document.getElementById(`${email}`);
    // console.log(userNode);
    table.removeChild(userNode);
    return;
  }

  const storageUsers = getUsers();
  const storageFilteredUsers = JSON.parse(
    localStorage.getItem("filteredUsers")
  );

  let users = [];
  if (isNewUser) {
    // handle the display of new user
    let latestUser = storageUsers.pop();
    users.push(latestUser);
  } else if (usersList) {
    // only when we give it a users list
    // console.log("should be here");
    table.innerHTML = "";

    if (usersList.length > 0) {
      users = usersList;
      // console.log("userlist> 0");
    } else {
      // console.log("userlist < 0");
      // users = storageUsers;
      users = [];
    }
  } else if (storageFilteredUsers && storageFilteredUsers.length > 0) {
    users = storageFilteredUsers;
  } else {
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
    // trElement.setAttribute("id");
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
}

const setSearchBadges = (value) => {
  console.log(value);

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
  console.log(value);
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

export {
  displayUsers,
  setSearchBadges,
  setAgeBadges,
  removeSearchBadge,
  removeAgeBadge,
};
