'use strict';

// Get 10 users
const fetchUsers = async () => {
  try {
    const res = await fetch('https://api.github.com/users?per_page=10');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Render list of users
const renderUsers = (data) => {
  data.forEach((user) => {
    let cardHTML = `
    <li class="card">
      <img src="${user.avatar_url}" alt="avatar">
      <h3>${user.login}</h3>
      <a href="../user.html?username=${user.login}">Check my profile</a>
    </li>
  `;

    document.querySelector('.cards').insertAdjacentHTML('afterbegin', cardHTML);
  });
};

// Display users on page load
(async () => {
  const data = await fetchUsers();
  console.log(data);
  renderUsers(data);
})();

// Search users
const searchUsers = async (searchTerm) => {
  try {
    const res = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}`
    );
    const data = await res.json();
    return data.items;
  } catch (err) {
    console.error(err);
  }
};

// Display search results
const displaySearchResults = async (searchTerm) => {
  const data = await searchUsers(searchTerm);
  renderUsers(data);
};

// Search input
const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  displaySearchResults(searchTerm);
});
