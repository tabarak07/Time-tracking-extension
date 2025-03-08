# Time Tracking Extension

**COMPANY: CODTECH IT SOLUTIONS

NAME: TABARAK ZAFAR

INTERN ID: COD94278

DOMAIN: FULL STACK WEB DEVELOPMENT

DURATION: 6 WEEKS

MENTOR: NEELA SANTOSH**

This project is a comprehensive time tracking and productivity analysis tool. It consists of a backend server, a Chrome extension, and a dashboard for visualizing productivity data.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- Track time spent on different websites.
- Categorize activities as productive, unproductive, or neutral.
- View detailed analytics and reports.
- Chrome extension for real-time tracking.
- Dashboard for visualizing productivity data.

## Installation

### Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following content:
    ```env
    MONGO_URI=mongodb://localhost:27017/timeTracker
    PORT=3000
    ```

4. Start the backend server:
    ```sh
    npm run dev
    ```

### Chrome Extension

1. Navigate to the `chrome-extension` directory:
    ```sh
    cd chrome-extension
    ```

2. Load the extension in Chrome:
    - Open Chrome and go to `chrome://extensions/`.
    - Enable "Developer mode" in the top right corner.
    - Click "Load unpacked" and select the `chrome-extension` directory.

### Dashboard

1. Open the `dashboard/index.html` file in a web browser.

## Usage

### Backend

The backend server provides APIs for logging time spent on websites and fetching analytics data. It uses MongoDB for data storage.

### Chrome Extension

The Chrome extension tracks the time spent on different websites and categorizes them as productive, unproductive, or neutral. It stores the data locally and communicates with the backend server for analytics.

### Dashboard

The dashboard provides a visual representation of the productivity data. It uses Chart.js for rendering charts and fetches data from the backend server.

## Project Structure

```
backend/
    .env
    app.js
    package.json
    bin/
        www.js
    config/
        db.js
    models/
        Log.js
    routes/
        index.js
        logRoutes.js
        users.js
    views/
        error.pug
        index.ejs
        index.pug
        layout.pug
chrome-extension/
    background.js
    icon.png
    manifest.json
    popup.css
    popup.html
    popup.js
dashboard/
    index.html
    script.js
    style.css
```

## API Endpoints

### Logs

- `POST /logs` - Save a log
- `GET /logs` - Fetch logs for a user
- `GET /logs/analytics` - Fetch productivity analytics

### Users

- `GET /users` - Get all users
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user by ID
- `DELETE /users/:id` - Delete a user by ID

## License

This project is licensed under the MIT License.

## OUTPUT -
