/**
 * Main script for initializing the Chrome extension's popup page.
 * This script is responsible for setting up the user interface by displaying
 * the list of selected texts, creating conversion buttons, and adding a download button
 * to the popup page. It leverages functions imported from various modules to organize
 * the popup's functionality into manageable parts.
 *
 * @fileOverview This file serves as the entry point for the popup page of the Chrome extension.
 * It orchestrates the setup of the popup's interactive elements by utilizing functions
 * imported from separate modules dedicated to specific UI components.
 *
 * @requires downloadButtonModule.js - Provides the `createDownloadButton` function to add a button
 * for downloading the converted texts as a text file.
 * @requires uiTextModule.js - Provides the `displaySelectedTexts` function to populate the popup
 * with a list of texts that have been selected and possibly converted.
 * @requires uiButtonModule.js - Provides the `createConversionButtons` function to generate
 * buttons for each available text conversion option.
 */

import { createDownloadButton } from "./custom_modules/downloadButtonModule.js";
import { displaySelectedTexts } from "./custom_modules/uiTextModule.js";
import { createConversionButtons } from "./custom_modules/uiButtonModule.js";

// Setup the popup page once the DOM content has fully loaded
document.addEventListener("DOMContentLoaded", () => {
  displaySelectedTexts(); // Display the list of selected/converted texts
  createConversionButtons(); // Create buttons for text conversion options
  createDownloadButton(); // Add a download button for exporting converted texts
});
