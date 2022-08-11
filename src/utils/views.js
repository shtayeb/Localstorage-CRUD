// imports
import { getUsers } from "./storage.js";

//variables
const table = document.getElementById("user-rows");
const form = document.getElementById("register");

// functions
function displayUsers(isNewUser, email, usersList) {
  // // only when we give it a users array ourselves
  // if(usersList){

  // }
  // only runs when we deleted a user
  if (email) {
    console.log(email + " - " + "deleted");
    let userNode = document.getElementById(`${email}`);
    // console.log(userNode);
    table.removeChild(userNode);
    return;
  }

  const storageUsers = getUsers();
  let users = [];
  if (isNewUser) {
    // handle the display of new user
    let latestUser = storageUsers.pop();
    users.push(latestUser);
  } else if (usersList) {
    // only when we give it a users list
    table.innerHTML = "";
    if (usersList.length > 0) {
      users = usersList;
      //   console.log("userlist> 0");
    } else {
      //   console.log("userlist < 0");
      users = storageUsers;
    }
  } else {
    users = storageUsers;
  }
  if (users) {
    users.forEach((user) => {
      let trElement = document.createElement("div");
      trElement.setAttribute("id", user.email);
      trElement.innerHTML = `
              <div class="flex items-center space-x-4 py-3">
              <div class="flex-shrink-0">
                <img
                  class="w-8 h-8 rounded-full"
                  src=${user.image}
                  alt="Neil image"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p
                  class="text-sm font-medium text-gray-900 truncate dark:text-white"
                >
                ${user.name}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                ${user.email}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                ${user.age}
                </p>
              </div>
              <div
                class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
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
  }
}

export { displayUsers };
