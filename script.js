const URL = "https://api.github.com/";

let usernameInput = document.getElementById("usernameInput");
let submitButton = document.querySelector(".submit-button");
let profileContainer = document.querySelector(".profile-container");
let currUserData;

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
async function addUserProfilePhoto(avatarUrl) {
  const imgElement = document.createElement("img");
  imgElement.classList.add("profile-picture");
  if (imgElement) imgElement.src = avatarUrl;

  profileContainer.appendChild(imgElement);
}

async function handleClick() {
  const username = usernameInput.value.trim();
  usernameInput.value = "";

  if (!username) return;

  console.log("Fetching info for:", username);
  currUserData = await pullUserInfo(username);

  if (currUserData) {
    console.log("User login:", currUserData.login);
    const { avatar_url, bio, html_url, following_url, repos_url, name, login } =
      currUserData;

    console.log(`Bio: ${bio}`);
    console.log(`Avatar URL: ${avatar_url}`);
    await addUserProfilePhoto(avatar_url);
  } else {
    console.error("Unable to pull user data");
    return;
  }
}

submitButton.addEventListener("click", handleClick);
