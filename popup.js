/**
 * Converts text to lowercase.
 * @param {string} text - The text to be converted.
 * @returns {string} - The text converted to lowercase.
 */
const convertToLowercase = (text) => text.toLowerCase();

/**
 * Converts text to UPPERCASE.
 * @param {string} text - The text to be converted.
 * @returns {string} - The text converted to UPPERCASE.
 */
const convertToUppercase = (text) => text.toUpperCase();

/**
 * Converts text to camelCase.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to camelCase.
 */
const convertToCamelCase = (input) => {
  return input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .trim();
};

/**
 * Converts text to snake_case.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to snake_case.
 */
const convertToSnakeCase = (input) => {
  return input
    .toLowerCase() // Convert input to lowercase
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[^a-zA-Z0-9_]+/g, ""); // Remove non-alphanumeric characters except underscores
};

/**
 * Converts text to Sentence case.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to Sentence case.
 */
const convertToSentenceCase = (input) => {
  return input
    .toLowerCase() // Convert input to lowercase
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (match) => match.toUpperCase()); // Capitalize first letter of each sentence
};

/**
 * Converts text to capital case.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to Capital Case.
 */
const convertToCapitalCase = (input) => {
  return input
    .toLowerCase() // Convert input to lowercase
    .split(" ") // Split the input into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(" "); // Join the words back together
};

/**
 * Converts text to PascalCase.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to PascalCase.
 */
const convertToPascalCase = (input) => {
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

/**
 * Converts text to kebab-case.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to kebab-case.
 */
const convertToKebabCase = (input) => {
  return input
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

/**
 * Converts text to Title Case.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to Title Case.
 */
const convertToTitleCase = (input) => {
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Converts text to CONSTANT_CASE.
 * @param {string} input - The text to be converted.
 * @returns {string} - The text converted to CONSTANT_CASE.
 */
const convertToConstantCase = (input) => {
  return input
    .toUpperCase()
    .replace(/\s+/g, "_")
    .replace(/[^A-Z0-9_]/g, "");
};
const conversionFunctions = [
  { name: "Lowercase", func: convertToLowercase },
  { name: "Uppercase", func: convertToUppercase },
  { name: "Camel Case", func: convertToCamelCase },
  { name: "Snake Case", func: convertToSnakeCase },
  { name: "Sentence Case", func: convertToSentenceCase },
  { name: "Capital Case", func: convertToCapitalCase },
  { name: "Pascal Case", func: convertToPascalCase },
  { name: "Kebab Case", func: convertToKebabCase },
  { name: "Title Case", func: convertToTitleCase },
  { name: "Constant Case", func: convertToConstantCase },
];

let selectedText = null;

const downloadConvertedTexts = () => {
  chrome.storage.local.get({ convertedTexts: [] }, function (data) {
    if (data.convertedTexts.length === 0) {
      alert("There are no converted texts to download.");
      return;
    }

    const convertedTexts = data.convertedTexts
      .map((textObj) => textObj.str)
      .join("\n");
    const blob = new Blob([convertedTexts], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "converted_texts.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);

    clearAllStorage();
  });
};

const clearAllStorage = () => {
  chrome.storage.local.clear(function () {
    displaySelectedTexts();
  });
};
const createDownloadButton = () => {
  const buttonsContainer = document.getElementById("buttonsMainContainer");
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Download Converted Texts";
  downloadButton.addEventListener("click", downloadConvertedTexts);

  buttonsContainer.appendChild(downloadButton);
};
const updateConvertedTextInStorage = (
  convertedText,
  conversationName,
  textId
) => {
  chrome.storage.local.get({ convertedTexts: [] }, function (data) {
    const existingIndex = data.convertedTexts.findIndex(
      (text) => text.id === textId
    );

    if (existingIndex !== -1) {
      data.convertedTexts[existingIndex] = {
        id: textId,
        str: convertedText,
        cn: conversationName,
      };
    } else {
      let newText = { id: textId, str: convertedText, cn: conversationName };
      data.convertedTexts.push(newText);
    }

    chrome.storage.local.set(
      { convertedTexts: data.convertedTexts },
      function () {
        console.log("Konvertovani tekst je sačuvan.");
        chrome.storage.local.get(null, function (items) {
          console.log(items);
          displaySelectedTexts();
        });
      }
    );
  });
};

const deleteText = (textId) => {
  chrome.storage.local.get(
    { selectedTexts: [], convertedTexts: [] },
    function (data) {
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
        function () {
          displaySelectedTexts();
        }
      );
    }
  );
};

const selectText = (text) => {
  selectedText = text;
  const input = document.getElementById("textInput");
  input.value = text.str;
};

const displaySelectedTexts = () => {
  chrome.storage.local.get(
    { selectedTexts: [], convertedTexts: [] },
    function (data) {
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

        const selectButton = document.createElement("button");
        selectButton.textContent = "Select";
        selectButton.onclick = () => {
          selectText(textObj);
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.onclick = () => {
          deleteText(textObj.id);
        };

        listItem.appendChild(selectButton);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
      });
    }
  );
};

const createConversionButtons = () => {
  const buttonsContainer = document.getElementById("buttonsMainContainer");
  conversionFunctions.forEach((conversion) => {
    const button = document.createElement("button");
    button.textContent = conversion.name;
    button.addEventListener("click", () => {
      if (!selectedText) {
        alert("Please select a text first.");
        return;
      }
      const convertedText = conversion.func(selectedText.str);

      updateConvertedTextInStorage(
        convertedText,
        conversion.name,
        selectedText.id
      );
      selectedText = null;
      const input = document.getElementById("textInput");
      input.value = "";
      displaySelectedTexts();
    });

    buttonsContainer.appendChild(button);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  displaySelectedTexts();
  createConversionButtons();
  createDownloadButton();
});
