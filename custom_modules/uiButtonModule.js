import { conversionFunctions } from "./textModule.js";
import {
  selectedText,
  clearSelectedTextAndInput,
} from "./listAndInputModule.js";
import { updateConvertedTextInStorage } from "./storageModule.js";
import { displaySelectedTexts } from "./uiTextModule.js";
/**
 * Handles the click event on conversion buttons, performing the text conversion,
 * updating the storage, and refreshing the UI accordingly.
 *
 * @param {Object} conversion - The conversion object containing the name and the conversion function.
 */
const handleConversionButtonClick = async (conversion) => {
  if (!selectedText) {
    alert("Please select a text first.");
    return;
  }
  const convertedText = conversion.func(selectedText.str);

  await updateConvertedTextInStorage(
    convertedText,
    conversion.name,
    selectedText.id
  );
  clearSelectedTextAndInput();
  displaySelectedTexts();
};
/**
 * Creates and appends a button element to a specified parent element in the DOM.
 * Optionally, assigns a click event listener that executes a provided function
 * with optional data.
 *
 * @param {string} text - The text content for the button.
 * @param {Function|null} [fnc=null] - The function to execute on button click. Optional.
 * @param {any} [fncData=null] - The data to be passed to the click function. Optional.
 * @param {Element} parent - The parent DOM element to which the button will be appended.
 */
export const createButton = (text, fnc = null, fncData = null, parent) => {
  const button = document.createElement("button");
  button.textContent = text;

  // Assign the click event listener if a function is provided
  if (fnc !== null) {
    button.onclick = () => fnc(fncData);
  }

  // Append the button to the parent element if it's valid
  if (parent && parent.appendChild) {
    parent.appendChild(button);
  } else {
    console.warn("createButton: Provided parent element is invalid.", parent);
  }
};

/**
 * Creates and appends conversion buttons to a specified container element.
 * Each button corresponds to a text conversion function defined in the `conversionFunctions` array.
 * Upon clicking a button, the `handleConversionButtonClick` function is called, which processes
 * the conversion based on the selected text and the specific conversion function associated with the button.
 *
 * This function iterates over each conversion object in `conversionFunctions`, creating a button
 * for each conversion using the `createButton` utility function. The button is configured to trigger
 * the conversion process for the currently selected text when clicked.
 *
 * @requires createButton - This function relies on `createButton` to create each button element.
 * @requires handleConversionButtonClick - It also depends on `handleConversionButtonClick` to handle
 * the button click events, which perform the actual text conversion and UI updates.
 *
 * @example
 * createConversionButtons(); // Call this function to initialize and display conversion buttons.
 */
export const createConversionButtons = () => {
  const buttonsContainer = document.getElementById("buttonsMainContainer");
  conversionFunctions.forEach((conversion) => {
    createButton(
      conversion.name,
      () => handleConversionButtonClick(conversion),
      null,
      buttonsContainer
    );
  });
};
