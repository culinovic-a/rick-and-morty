# Rick and Morty

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview

This is an app that allows users to list, search, and view detailed information about characters, locations, and episodes from the Rick and Morty universe. The app utilizes the [Rick and Morty API](https://rickandmortyapi.com/) for fetching data, and features include character search, viewing details of single characters, locations, and episodes.

### Features

- Character, location, and episode listings.
- Search functionality to filter through characters.
- Viewing detailed pages for a single character, location, or episode.
- Firebase for login and sign-up authentication.
- Tailwind CSS for responsive and modern styling.
- Axios for making HTTP requests.

## Getting Started

Follow these instructions to set up and run the project locally on your machine.


Clone the repository:

### `git clone https://github.com/culinovic-a/rick-and-morty`


Navigate to the Project Directory

### `cd rick-and-morty`


Install Dependencies

### `npm install`


In the root directory, create a `.env` file and add the following:

```
REACT_APP_FIREBASE_API_KEY=""
REACT_APP_FIREBASE_AUTH_DOMAIN=""
REACT_APP_FIREBASE_PROJECT_ID=""
REACT_APP_FIREBASE_STORAGE_BUCKET=""
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""
REACT_APP_FIREBASE_APP_ID=""

REACT_APP_API_URL="https://rickandmortyapi.com/api/"
```


Replace the empty quotes "" with your actual Firebase credentials and API URL.


After setting up the environment and installing dependencies, you can start the app with:

### `npm start`



## Technologies Used

- **Tailwind CSS**: For styling and layout.
- **Axios**: For making API requests to the [Rick and Morty API](https://rickandmortyapi.com/).
- **Firebase**: Used for authentication (login and sign-up).
- **React**: For building the user interface.

