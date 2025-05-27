# Live Notification Scraper for JNTUK/JNTUH Exam Updates

## Overview
This project is a web application that scrapes and displays exam notifications, results, and latest updates for JNTUK and JNTUH. It fetches data every 6 hours and allows manual scraping for real-time updates.

## Features
- Scrapes notifications for JNTUK and JNTUH.
- Displays latest updates, exam notifications, and results.
- Fetches data from the database every 6 hours.
- Manual scrape option for on-demand updates.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Scraping**: Axios, Cheerio

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables (e.g., MongoDB URI) in a `.env` file.
5. Start the backend server:
   ```bash
   npm run server
   ```
6. Start the frontend (in a new terminal):
   ```bash
   npm run client
   ```

## Usage
- Open `http://localhost:3000` in your browser.
- Switch between JNTUK and JNTUH tabs to view notifications.
- Click the refresh button to manually scrape for updates.

## Deployed Website
The application is live at:  
[https://jbuzzfrontend.vercel.app/](https://jbuzzfrontend.vercel.app/)

## Screenshot
Below is a screenshot of the application:  
![Application Screenshot](./screenshot.png)  
*Replace `path/to/screenshot.png` with the actual path to your screenshot after adding it to your repository (e.g., `images/screenshot.png`). To add the image: take a screenshot of the website, save it as `screenshot.png`, place it in an `images` folder in your repository, and update the path accordingly.*

## Contact
For any questions, reach out to [Your Name] at [your-email@example.com].