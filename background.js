/**
 * Generates a random ID using a timestamp and a random number.
 * The timestamp is the current time in milliseconds since the Unix epoch.
 * The random portion is a number between 0 and 999, inclusive.
 * The ID format is "{timestamp}-{randomPortion}".
 *
 * @returns {string} A unique string ID consisting of a timestamp and a random portion, separated by a dash.
 */
const generateRandomID = () => {
  const timestamp = Date.now(); // Current time in milliseconds
  const randomPortion = Math.floor(Math.random() * 1000); // Random number between 0 and 999
  return `${timestamp}-${randomPortion}`; // Concatenates timestamp and random portion with a dash
};

/**
 * Listens for the extension's installation event and creates a context menu item.
 * This context menu item is shown when the user selects text in the browser,
 * allowing them to send the selected text to the "Chrome Text Converter" extension for conversion.
 *
 * The `chrome.runtime.onInstalled` event is used to set up the extension's initial state,
 * such as creating context menus or initializing storage. This ensures that the necessary
 * setup is done right after the extension is installed or updated.
 *
 * The `chrome.contextMenus.create` method is used to create a new item in the browser's context menu.
 * This item is configured to appear only when text is selected (`contexts: ["selection"]`), providing a user-friendly way
 * to interact with the extension's functionality directly from the browser's UI.
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sendToExtension", // Unique identifier for the context menu item
    title: "Chrome Text Converter", // Text to be displayed in the context menu
    contexts: ["selection"], // Specifies that the menu item should only appear in the context menu when text is selected
  });
});
/**
 * Adds an event listener for clicks on the context menu item.
 * When the user selects the "Chrome Text Converter" context menu item after selecting text,
 * this listener triggers and saves the selected text into local storage.
 *
 * The `chrome.contextMenus.onClicked` event listener checks if the clicked context menu item
 * matches the ID "sendToExtension" and if there is any text selected (`info.selectionText`).
 * If both conditions are met, it retrieves the currently saved texts from `localStorage`,
 * generates a new unique ID for the selected text, and adds the text to the storage.
 *
 * This approach allows for saving multiple selected texts with unique identifiers for later retrieval,
 * conversion, or other processing within the extension.
 *
 * @param {Object} info - An object containing information about the context menu item clicked and the context where the click happened.
 * @param {Object} tab - An object containing details about the tab where the click occurred.
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendToExtension" && info.selectionText) {
    chrome.storage.local.get({ selectedTexts: [] }, (data) => {
      let texts = data.selectedTexts;
      // Adds the newly selected text with a unique ID to the array of saved texts
      texts.push({ id: generateRandomID(), str: info.selectionText });
      // Updates the local storage with the new list of selected texts
      chrome.storage.local.set({ selectedTexts: texts });
    });
  }
});
