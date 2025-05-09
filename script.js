import { pullUserInfo, pullUserRepos } from "./api.js";
import {
  displayProfileHeader,
  displayUserRepos,
  clearProfileContainer,
  displayError,
} from "./ui.js";

let usernameInput = document.getElementById("usernameInput");
let submitButton = document.querySelector(".submit-button");
let profileContainer = document.querySelector(".profile-container");

// This function is handling the submit button after entering the username
async function handleSubmit() {
  const username = usernameInput.value.trim();
  usernameInput.value = "";

  if (!username) {
    displayError("Please enter a GitHub username.", profileContainer);
    return;
  }

  console.log("Fetching info for:", username);
  clearProfileContainer(profileContainer);

  const userData = await pullUserInfo(username);

  if (userData) {
    console.log("User login:", userData.login);
    displayProfileHeader(userData, profileContainer);

    const repos = await pullUserRepos(userData.repos_url);
    if (repos) {
      displayUserRepos(repos, profileContainer);
    } else {
      if (repos === null) {
        const repoError = document.createElement("p");
        repoError.classList.add("error-message");
        repoError.textContent = "Failed to load repositories for this user.";
        profileContainer.appendChild(repoError);
      }
    }
  } else {
    console.error("Unable to pull user data for:", username);
    displayError(
      `User "${username}" not found or an error occurred.`,
      profileContainer
    );
  }
}

submitButton.addEventListener("click", handleSubmit);

// Allows user to press enter instead of clicking button
usernameInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submission if it's in a form
    handleSubmit();
  }
});
