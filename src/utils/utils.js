import { displayUsers } from "./views.js";
import { getUsers } from "./storage.js";

const handleAgeFilter = (query) => {
  let users = getUsers();
  if (query === "10-20") {
    console.log("10-20");
    users = users.filter((user) => user.age >= 10 && user.age < 20);
    console.log(users);
  } else if (query === "20-30") {
    console.log("10-30");
    users = users.filter((user) => user.age >= 20 && user.age < 30);
    console.log(users);
  } else if (query === "30-40") {
    users = users.filter((user) => user.age >= 30 && user.age < 40);
  } else {
    users = users.filter((user) => user.age >= 40 && user.age < 50);
  }
  displayUsers(false, "", users);
};

const handleSearch = (query) => {
  //   console.log(query.toLowerCase());
  let finalfilter = [];
  if (!query) {
    console.log("empty");
    displayUsers(false, "", finalfilter);
    return;
  }
  const users = JSON.parse(localStorage.getItem("users"));
  const filteredUsersName = users.filter(
    (u) => u.name.toLowerCase() == query.toLowerCase()
  );
  const filteredUsersEmail = users.filter(
    (u) => u.email.toLowerCase() == query.toLowerCase()
  );
  const filteredUsersAddress = users.filter(
    (u) => u.address.toLowerCase() == query.toLowerCase()
  );

  finalfilter = [
    ...filteredUsersName,
    ...filteredUsersEmail,
    ...filteredUsersAddress,
  ];
  //   console.log(finalfilter);
  displayUsers(false, "", finalfilter);
};

export { handleSearch, handleAgeFilter };
