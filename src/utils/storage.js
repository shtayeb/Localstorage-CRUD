// imports
import { displayUsers } from "./views.js";

// functions
const saveUser = (user) => {
  let users = localStorage.getItem("users");
  //   console.log(users);
  if (users != null) users = JSON.parse(users);
  else users = [];

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
};

const removeUser = (userEmail) => {
  // console.log("delete");
  const users = JSON.parse(localStorage.getItem("users"));
  const filteredUsers = users.filter((u) => u.email != userEmail);
  localStorage.setItem("users", JSON.stringify(filteredUsers));
  displayUsers(false, userEmail);
};

const getUsers = () => {
  return JSON.parse(localStorage.getItem("users"));
};

const getUserByEmail = (email) => {
  let users = getUsers();
  let filteredUser = users.filter((user) => user.email === email);
  return filteredUser[0];
};

export { saveUser, removeUser, getUsers, getUserByEmail };
