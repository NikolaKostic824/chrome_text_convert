import { displaySelectedTexts } from "./uiTextModule.js";
import { clearSelectedTextAndInput } from "./listAndInputModule.js";
/**
 * Clears all data stored in Chrome's local storage for the extension.
 * Utilizes the `chrome.storage.local.clear` method to remove all stored items,
 * effectively resetting the storage used by the extension. This operation provides
 * a clean slate by removing all saved texts and conversion records.
 *
 * After clearing the storage, the function performs two key UI update operations:
 * 1. `clearSelectedTextAndInput` - Clears any currently selected text and resets the input field.
 *    This function is imported from "./listAndInputModule.js" and ensures that any
 *    remnants of previous selections or inputs are cleared from the UI.
 * 2. `displaySelectedTexts` - Updates the list display in the UI to reflect that all saved texts
 *    have been removed. This function is imported from "./uiTextModule.js" and is responsible
 *    for refreshing the list of texts shown to the user, which should be empty after the clear operation.
 *
 * This combined approach ensures that the UI accurately represents the current state of stored data
 * and user inputs, which is particularly useful for resetting the extension's state or for troubleshooting purposes.
 *
 * @exports
 * Executes two main UI update functions (`clearSelectedTextAndInput` and `displaySelectedTexts`)
 * to ensure the UI is in sync with the cleared storage state.
 */
export const clearAllStorage = () => {
  chrome.storage.local.clear(() => {
    clearSelectedTextAndInput();
    displaySelectedTexts();
  });
};

/**
 * Asynchronously updates the list of converted texts stored in Chrome's local storage.
 * This function either adds a new converted text entry or updates an existing one based on the provided text ID.
 * After updating the storage, it refreshes the displayed list of texts to reflect the changes.
 *
 * @param {string} convertedText - The converted text content to be saved or updated.
 * @param {string} conversationName - The name of the conversion applied, identifying how the text was converted.
 * @param {string} textId - The unique identifier for the text, used to find and update the entry in storage.
 * @async
 * @returns {Promise<void>} A promise that resolves when the storage is updated and the UI has been refreshed.
 */
export const updateConvertedTextInStorage = async (
  convertedText,
  conversationName,
  textId
) => {
  try {
    const data = await chrome.storage.local.get({ convertedTexts: [] });
    const existingIndex = data.convertedTexts.findIndex(
      (text) => text.id === textId
    );

    if (existingIndex !== -1) {
      // Update existing converted text
      data.convertedTexts[existingIndex] = {
        id: textId,
        str: convertedText,
        cn: conversationName,
      };
    } else {
      // Add new converted text
      const newText = { id: textId, str: convertedText, cn: conversationName };
      data.convertedTexts.push(newText);
    }

    await chrome.storage.local.set({ convertedTexts: data.convertedTexts });
    // Refresh the displayed list of texts
    displaySelectedTexts();
  } catch (error) {
    console.error("Error updating the converted texts in storage:", error);
  }
};
