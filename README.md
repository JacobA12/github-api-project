# GitHub Profile Info

A web application that allows users to search for GitHub profiles and view their recent repositories using the GitHub API.

## Features

- Search for GitHub users by username
- Display user profile information including:
  - Profile picture
  - User name
  - Recent repositories (up to 5)
- Show repository details including:
  - Repository name
  - Last update date
  - Programming language
  - Repository URL
- Error handling for invalid usernames or API failures

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- GitHub REST API
- Inter Font (Google Fonts)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/github-api-project.git
cd github-api-project
```

2. Open the project in Visual Studio Code or your preferred IDE.

3. Start a local development server:

   - Using VS Code's Live Server extension.
   - Or any other local server of your choice.

4. Open your browser and navigate to:

```
http://localhost:5501
```

## Project Structure

```
├── index.html          # Main HTML file
├── style.css          # Stylesheet
├── script.js         # Main JavaScript file
├── api.js           # GitHub API integration
├── ui.js           # UI components and rendering
└── img/           # Image assets
    ├── github-mark.svg
    └── search-icon.svg
```

## Usage

1. Enter a GitHub username in the search box
2. Click the search button or press Enter
3. View the user's profile information and recent repositories
4. Click on repository links to visit them on GitHub

## Error Handling

The application handles several error cases:

- Empty username input
- Invalid/non-existent username
- API request failures
- Missing repository data
