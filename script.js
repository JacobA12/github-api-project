const URL = "https://api.github.com/";

let usernameInput = document.getElementById("usernameInput");
let submitButton = document.querySelector(".submit-button");
let profileContainer = document.querySelector(".profile-container");
let currUserData;

// Talks to the GitHub API and gets the JSON object that represents the Username submitted
async function pullUserInfo(username) {
  try {
    const response = await fetch(`${URL}users/${username}`);
    console.table(response);

    if (!response.ok) {
      throw new Error(`User not found: ${response.status}`);
    }

    const userData = await response.json();
    console.table(userData);
    return userData;
  } catch (error) {
    console.error(`Username not found error: ${error}`);
    return null;
  }
}

// Pulls user profile picture, creates an <img> element and adds it to the DOM
async function createProfilePhotoElement(avatarUrl) {
  console.log("Creating User Profile Picture Element");
  const imgElement = document.createElement("img");
  imgElement.classList.add("profile-picture");
  imgElement.width = "120";
  imgElement.height = "120";
  imgElement.src = avatarUrl;

  profileContainer.appendChild(imgElement);
  console.log(`Done creating User Profile Picture Element`);
  console.log(imgElement);
}

// This function creates a new header element to display the user's name
function createUsersNameElement(name = "", userName = "") {
  let userRealName = document.createElement("h3");
  userRealName.classList.add("user-real-name");
  userRealName.innerText = name || userName;
  console.log(`Username used is ${userRealName.innerText}`);
  profileContainer.appendChild(userRealName);
}

// This function is handling the submit button after entering the username
async function handleSubmit() {
  const username = usernameInput.value.trim();
  usernameInput.value = "";

  if (!username) return;

  console.log("Fetching info for:", username);
  currUserData = await pullUserInfo(username);

  if (currUserData) {
    console.log("User login:", currUserData.login);
    const { avatar_url, bio, html_url, following_url, repos_url, name, login } =
      currUserData;

    await createProfilePhotoElement(avatar_url);
    createUsersNameElement(name, login);
  } else {
    console.error("Unable to pull user data");
    return;
  }
}

submitButton.addEventListener("click", handleSubmit);
