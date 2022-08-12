import { displayUsers } from "./views.js";
import { getUsers } from "./storage.js";

const handleFilter = (searchQuery, ageQuery) => {
  const ageLimits = ageQuery.split("-");
  console.log(ageLimits);
  console.log(searchQuery);

  let users = [];
  let filteredUsersAddress;
  users = getUsers();

  if (searchQuery && ageLimits.length !== 2) {
    //  1 - We have only searchQuery
    filteredUsersAddress = users.filter(
      (u) => u.address.toLowerCase() == searchQuery.toLowerCase()
    );
    console.log(filteredUsersAddress, "---------1-only search----------");
  } else if (searchQuery && ageLimits.length === 2) {
    //  2 - we have both search and age filters
    filteredUsersAddress = users.filter(
      (u) =>
        u.address.toLowerCase() == searchQuery.toLowerCase() &&
        u.age >= ageLimits[0] &&
        u.age < ageLimits[1]
    );
    console.log(filteredUsersAddress, "---------2-Both of them----------");
  } else {
    // 3 - we have only age filter
    filteredUsersAddress = users.filter(
      (user) => user.age >= ageLimits[0] && user.age < ageLimits[1]
    );
    console.log(filteredUsersAddress, "---------3-only age----------");
  }

  displayUsers(false, "", filteredUsersAddress);
  localStorage.setItem("filteredUsers", JSON.stringify(filteredUsersAddress));
  localStorage.setItem(
    "filters",
    JSON.stringify({
      searchQuery,
      ageLimits: ageLimits.length >= 2 ? ageLimits : "",
    })
  );
};

const handleAgeFilter = (query) => {
  let users = [];
  const prevFilteredUser = JSON.parse(localStorage.getItem("filteredUsers"));
  if (prevFilteredUser) {
    users = prevFilteredUser;
  } else {
    users = getUsers();
  }
  console.log(users);
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
    console.log(users);
  }
  // console.log(users);
  displayUsers(false, "", users);
  localStorage.setItem("filteredUsers", JSON.stringify(users));
};

const handleSearch = (query) => {
  //   console.log(query.toLowerCase());

  if (!query) {
    // console.log("empty");
    displayUsers(false, "", finalfilter);
    return;
  }
  let finalfilter = [];
  let users = [];
  const prevFilteredUser = JSON.parse(localStorage.getItem("filteredUsers"));

  if (prevFilteredUser) {
    users = prevFilteredUser;
  } else {
    users = getUsers();
  }

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
  localStorage.setItem("filteredUsers", JSON.stringify(finalfilter));
};

export { handleSearch, handleAgeFilter, handleFilter };
