import { displayUsers, removeAgeBadge, removeSearchBadge } from "./views.js";
import { getUsers } from "./storage.js";

const handleFilter = (searchQuery, ageQuery) => {
  const ageLimits = ageQuery.split("-");
  console.log(ageLimits);
  console.log(searchQuery);

  // Dont do anything if filters are empty
  // if (!searchQuery && ageLimits.length < 2) return;

  let users = [];
  let filteredUsersAddress;
  users = getUsers();

  if (searchQuery && ageLimits.length !== 2) {
    //  1 - We have only searchQuery
    filteredUsersAddress = users.filter(
      (u) =>
        u.address.toLowerCase() == searchQuery.toLowerCase() ||
        u.name.toLowerCase() == searchQuery.toLowerCase() ||
        u.email.toLowerCase() == searchQuery.toLowerCase()
    );
    console.log(filteredUsersAddress, "---------1-only search----------");
  } else if (searchQuery && ageLimits.length === 2) {
    //  2 - we have both search and age filters
    filteredUsersAddress = users.filter(
      (u) =>
        (u.address.toLowerCase() == searchQuery.toLowerCase() ||
          u.name.toLowerCase() == searchQuery.toLowerCase() ||
          u.email.toLowerCase() == searchQuery.toLowerCase()) &&
        u.age >= ageLimits[0] &&
        u.age < ageLimits[1]
    );
    console.log(filteredUsersAddress, "---------2-Both of them----------");
  } else if (ageLimits.length >= 2) {
    // 3 - we have only age filter
    filteredUsersAddress = users.filter(
      (user) => user.age >= ageLimits[0] && user.age < ageLimits[1]
    );
    console.log(filteredUsersAddress, "---------3-only age----------");
  } else {
    console.log("-------4--------Send all users");
    filteredUsersAddress = users;
  }

  displayUsers(false, "", filteredUsersAddress);
  localStorage.setItem(
    "filters",
    JSON.stringify({
      searchQuery,
      ageLimits: ageLimits.length >= 2 ? ageLimits : "",
    })
  );
};

const handleRemoveFilter = (selectedFilter, query) => {
  if (selectedFilter === "search") {
    // remove the search filter
    // we recieved the age with query
    handleFilter("", query);
    removeSearchBadge();
    console.log(query, "search filter removed");
  } else {
    // remove the age filter
    // we recieved the search with query
    handleFilter(query, "");
    removeAgeBadge();
    console.log(query, "age filter removed");
  }
};

export { handleFilter, handleRemoveFilter };
