// Helper function to create the Repo Card
function createRepoCard(repo) {
  const formattedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let card = document.createElement("div");
  card.classList.add("repo-card");
  // Consider moving styles to a CSS file for better separation of concerns
  card.style.backgroundColor = "white";
  card.style.height = "auto"; // Using auto height, or set a fixed one if needed
  card.style.width = "500px"; // Consider making this responsive via CSS

  let title = document.createElement("h1");
  title.classList.add("repo-card-title");
  title.innerText = repo.name;
  card.appendChild(title);

  let date = document.createElement("p");
  date.classList.add("repo-card-date");
  date.innerText = formattedDate;
  card.appendChild(date);

  let link = document.createElement("a");
  link.classList.add("repo-card-link");
  link.href = repo.html_url;
  link.innerText = repo.html_url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  card.appendChild(link);

  let languageP = document.createElement("p");
  languageP.classList.add("repo-card-language");
  languageP.innerText = repo.language
    ? `Language: ${repo.language}`
    : "Language: N/A";
  card.appendChild(languageP);

  return card;
}

// Helper function to clear existing repo cards
function clearExistingRepoCards(profileContainerElement) {
  const existingCards = profileContainerElement.querySelectorAll(".repo-card");
  existingCards.forEach((card) => card.remove());
}

// This function creates and displays the repository cards
export function displayUserRepos(userRepos, profileContainerElement) {
  if (!Array.isArray(userRepos)) {
    console.error("Expected array of repositories, but received:", userRepos);
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("error-message");
    errorMsg.textContent = "Could not load repositories.";
    profileContainerElement.appendChild(errorMsg);
    return;
  }

  clearExistingRepoCards(profileContainerElement);

  if (userRepos.length === 0) {
    const noReposMsg = document.createElement("p");
    noReposMsg.textContent = "This user has no public repositories.";
    profileContainerElement.appendChild(noReposMsg);
    return;
  }

  userRepos.forEach((repo) => {
    const repoCard = createRepoCard(repo);
    profileContainerElement.appendChild(repoCard);
  });
}

// This function creates and displays the user's profile photo
function createUserProfilePhotoElement(avatarUrl, profileContainerElement) {
  const existingPhoto =
    profileContainerElement.querySelector(".profile-picture");
  if (existingPhoto) {
    existingPhoto.remove();
  }

  const imgElement = document.createElement("img");
  imgElement.classList.add("profile-picture");
  imgElement.width = "120";
  imgElement.height = "120";
  imgElement.src = avatarUrl;
  imgElement.alt = "User profile picture";

  profileContainerElement.prepend(imgElement);
}

// This function creates and displays the user's name
function createUsersNameHeadingElement(
  name = "",
  userName = "",
  profileContainerElement
) {
  const existingName = profileContainerElement.querySelector(".user-real-name");
  if (existingName) {
    existingName.remove();
  }

  let userRealName = document.createElement("h3");
  userRealName.classList.add("user-real-name");
  userRealName.innerText = name || userName;

  const profilePic = profileContainerElement.querySelector(".profile-picture");
  if (profilePic && profilePic.nextSibling) {
    profileContainerElement.insertBefore(userRealName, profilePic.nextSibling);
  } else if (profilePic) {
    profileContainerElement.appendChild(userRealName);
  } else {
    profileContainerElement.prepend(userRealName);
  }
}

// Main function to update the profile header section (photo and name)
// Ensure elements are added in a consistent order, e.g., photo first, then name.
export function displayProfileHeader(userData, profileContainerElement) {
  if (!userData) return;
  createUserProfilePhotoElement(userData.avatar_url, profileContainerElement);
  createUsersNameHeadingElement(
    userData.name,
    userData.login,
    profileContainerElement
  );
}

// Function to clear all dynamic content from profile container
export function clearProfileContainer(profileContainerElement) {
  const photo = profileContainerElement.querySelector(".profile-picture");
  if (photo) photo.remove();

  const nameEl = profileContainerElement.querySelector(".user-real-name");
  if (nameEl) nameEl.remove();

  clearExistingRepoCards(profileContainerElement);

  const errorMessages =
    profileContainerElement.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => msg.remove());

  const noReposMessages = profileContainerElement.querySelectorAll("p");
  noReposMessages.forEach((msg) => {
    if (
      msg.textContent === "This user has no public repositories." ||
      msg.textContent === "Could not load repositories."
    ) {
      msg.remove();
    }
  });
}

// Function to display an error message in the profile container
export function displayError(message, profileContainerElement) {
  clearProfileContainer(profileContainerElement);
  const errorElement = document.createElement("p");
  errorElement.classList.add("error-message");
  errorElement.textContent = message;
  profileContainerElement.appendChild(errorElement);
}
