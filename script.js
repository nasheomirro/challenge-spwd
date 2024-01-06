const usersContainer = document.querySelector(".users-container");

// load the users in and populate the users container
(async () => {
  let users = [];
  users = await fetchUsers();

  for (let user of users) {
    const userContainer = createUser(user);
    usersContainer.appendChild(userContainer);
  }
})();

// pretend it comes from a legitimate source
async function fetchUsers() {
  return fetch("/data.json").then((res) => res.json());
}
