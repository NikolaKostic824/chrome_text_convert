import { createButton } from "./uiButtonModule.js";
import { selectText, deleteText } from "./listAndInputModule.js";
/**
 * Displays the list of selected texts stored in Chrome's local storage.
 * Retrieves the texts from storage and dynamically generates list items in the UI for each text.
 * For each text, it provides options for selecting and deleting the text by creating buttons
 * using the `createButton` function imported from "./uiButtonModule.js".
 *
 * Each list item displays the original text and its conversion name (if converted),
 * alongside "Select" and "Delete" buttons for further interactions.
 *
 * The "Select" button, when clicked, triggers the `selectText` function, passing the
 * selected text object as an argument. The "Delete" button triggers the `deleteText`
 * function, passing the ID of the text to be deleted.
 *
 * This approach modularizes button creation and enhances code readability and maintainability.
 *
 * @exports
 * @function displaySelectedTexts
 * Utilizes the `chrome.storage.local.get` method to fetch stored texts and iterates
 * over them to dynamically update the UI with relevant information and interaction options.
 */
export const displaySelectedTexts = () => {
  chrome.storage.local.get(
    { selectedTexts: [], convertedTexts: [] },
    (data) => {
      const list = document.getElementById("textsList");
      list.innerHTML = "";

      data.selectedTexts.forEach((textObj) => {
        const listItem = document.createElement("li");

        const convertedTextObj = data.convertedTexts.find(
          (converted) => converted.id === textObj.id
        );
        const conversionName = convertedTextObj
          ? convertedTextObj.cn
          : "Original";

        listItem.textContent = `${textObj.str} - ${conversionName}`;

        // Use the `createButton` function to add "Select" and "Delete" buttons to each list item
        createButton("Select", selectText, textObj, listItem);
        createButton("X", deleteText, textObj.id, listItem);

        list.appendChild(listItem);
      });
    }
  );
};
