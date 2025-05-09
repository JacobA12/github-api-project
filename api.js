// /home/libhead/workspace/github/JacobA12/github-api-project/api.js
const GITHUB_API_BASE_URL = "https://api.github.com/";

// This function fetches the users info object from GitHub REST API
export async function pullUserInfo(username) {
  try {
    const response = await fetch(`${GITHUB_API_BASE_URL}users/${username}`);
    // console.table(response); // Kept for debugging, consider removing for production

    if (!response.ok) {
      throw new Error(`User not found: ${response.status}`);
    }

    const userData = await response.json();
    // console.table(userData); // Kept for debugging
    return userData;
  } catch (error) {
    console.error(`Username not found error: ${error}`);
    return null;
  }
}

// This function fetches the user's repos
export async function pullUserRepos(reposUrl) {
  try {
    const response = await fetch(`${reposUrl}?sort=updated&per_page=5`);
    // console.table(response); // Kept for debugging

    if (!response.ok) {
      throw new Error(`Repos not found: ${response.status}`);
    }

    const userRepos = await response.json();
    // console.table(userRepos); // Kept for debugging
    return userRepos;
  } catch (error) {
    console.error(`Error detected: ${error}`);
    return null;
  }
}