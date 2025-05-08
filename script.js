const URL = "https://api.github.com/";

let usernameInput = document.getElementById("usernameInput");
let submitButton = document.querySelector(".submit-button");
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

async function handleClick() {
  const username = usernameInput.value.trim();
  usernameInput.value = "";

  if (!username) return;

  console.log("Fetching info for:", username);
  currUserData = await pullUserInfo(username);

  if (currUserData) {
    console.log("User login:", currUserData.login);
  }
}

submitButton.addEventListener("click", handleClick);
