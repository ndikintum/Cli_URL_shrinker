// db_utils/index.js

import pool from "../db_config/db.js";
import chalk from "chalk";

// Function to save a shortened URL to the database
async function saveShortenedURL(originalURL, shortenedURL) {
  try {
    const query = {
      text: "INSERT INTO url_table(long_url, short_url) VALUES($1, $2)",
      values: [originalURL, shortenedURL],
    };
    await pool.query(query);
    console.log("Shortened URL saved successfully");
  } catch (error) {
    handleSaveShortenedURLError(error);
  }
}

// Function to retrieve the list of shortened URLs from the database
async function listShortenedURLs() {
  try {
    const query = "SELECT short_url FROM url_table";
    const result = await pool.query(query);
    return result.rows.map((row) => row.short_url);
  } catch (error) {
    handleListShortenedURLsError(error);
  }
}

// Function to handle error while saving shortened URL
function handleSaveShortenedURLError(error) {
  console.error(chalk.red("AN ERROR OCCURRED"), error);
  throw error.message;
}

// Function to handle error while listing shortened URLs
function handleListShortenedURLsError(error) {
  console.error(
    chalk.red(
      "An error occurred while retrieving shortened URLs, please try again"
    ), 
    error.message
  );
  throw error.message;
}

export { saveShortenedURL, listShortenedURLs };
