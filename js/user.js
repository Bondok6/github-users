'use strict';

// Get username from URL query string
const getUsername = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  return username;
};

// Get user info
const getUser = async (username) => {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// render user info
const renderUser = (user) => {
  let userHTML = `
    <img src="${user.avatar_url}" alt="avatar" class="user__info">
    <div class="user-info">
      <h2>${user.login}</h2>
      <span>Bio: ${user.bio || 'Not available'}</span>
      <span>Followers: ${user.followers}</span>
      <span>Following: ${user.following}</span>
      <span>Public Repos: ${user.public_repos}</span>
      <span>Location: ${user.location}</span>
      <span>Company: ${user.company}</span>
      <span>Twitter: ${user.twitter_username || 'Not available'}</span>
    </div>
  `;

  document.querySelector('.user').insertAdjacentHTML('afterbegin', userHTML);
};

// Display user on page load
(async () => {
  const username = getUsername();
  const user = await getUser(username);
  renderUser(user);
})();
