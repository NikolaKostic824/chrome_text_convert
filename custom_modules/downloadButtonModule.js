import { clearAllStorage } from "./storageModule.js";

/**
 * Initiates the download of all converted texts stored in local storage.
 * This function retrieves the converted texts from Chrome's local storage,
 * combines them into a single string with newline characters between texts,
 * and then creates a downloadable TXT file containing all the texts.
 * If no converted texts are available, it alerts the user.
 * After downloading, it clears all data from storage using `clearAllStorage` from storageModule.js.
 */
const downloadConvertedTexts = () => {
  chrome.storage.local.get({ convertedTexts: [] }, (data) => {
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

/**
 * Creates and appends a download button to the specified container element.
 * When clicked, the button triggers the `downloadConvertedTexts` function,
 * which handles the creation and download of the TXT file containing all
 * converted texts. The button is appended to the "buttonsMainContainer" div.
 */
export const createDownloadButton = () => {
  const buttonsContainer = document.getElementById("buttonsMainContainer");
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Download Converted Texts";
  downloadButton.addEventListener("click", downloadConvertedTexts);
  buttonsContainer.appendChild(downloadButton);
};
