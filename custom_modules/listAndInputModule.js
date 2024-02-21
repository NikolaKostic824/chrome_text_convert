import { displaySelectedTexts } from "./uiTextModule.js";

/**
 * Stores the currently selected text object, including its content, unique ID, and conversion type.
 * This global variable is updated whenever a user selects a piece of text for conversion,
 * allowing the extension to keep track of the current text selection.
 *
 * @type {?{id: string, str: string, cn?: string}}
 */
export let selectedText = null;

/**
 * Deletes a text entry from both the selected and converted texts stored in Chrome's local storage.
 * It filters out the text entry by its unique ID from both storage arrays and updates the storage.
 * After updating, it refreshes the displayed list of texts by calling `displaySelectedTexts`.
 *
 * @param {string} textId - The unique identifier of the text to be deleted.
 */
export const deleteText = (textId) => {
  chrome.storage.local.get(
    { selectedTexts: [], convertedTexts: [] },
    (data) => {
      const updatedSelectedTexts = data.selectedTexts.filter(
        (textObj) => textObj.id !== textId
      );
      const updatedConvertedTexts = data.convertedTexts.filter(
        (textObj) => textObj.id !== textId
      );

      chrome.storage.local.set(
        {
          selectedTexts: updatedSelectedTexts,
          convertedTexts: updatedConvertedTexts,
        },
        () => {
          displaySelectedTexts();
        }
      );
    }
  );
};

/**
 * Updates the global `selectedText` variable with the currently selected text object.
 * This includes the text's content, unique ID, and, optionally, the conversion name.
 * Also updates the text input field in the UI with the selected text's content.
 *
 * @param {{id: string, str: string, cn?: string}} text - The text object to be selected.
 */
export const selectText = (textObj) => {
  selectedText = textObj;
  const input = document.getElementById("textInput");
  input.value = textObj.str;
};

/**
 * Clears the currently selected text and resets the text input field in the UI.
 * This function is used to reset the selection and input field to their initial state,
 * typically after a text has been converted or deleted, or when clearing all storage.
 */
export const clearSelectedTextAndInput = () => {
  selectedText = null;
  const input = document.getElementById("textInput");
  input.value = "";
};
