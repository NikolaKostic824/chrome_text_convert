const generateRandomID = () => {
  const timestamp = Date.now();
  const randomPortion = Math.floor(Math.random() * 1000);
  return `${timestamp}-${randomPortion}`;
};

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "sendToExtension",
    title: "Chrome Text Converter",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "sendToExtension" && info.selectionText) {
    chrome.storage.local.get({ selectedTexts: [] }, function (data) {
      console.log(chrome.storage.local);
      let texts = data.selectedTexts;
      texts.push({ id: generateRandomID(), str: info.selectionText });
      chrome.storage.local.set({ selectedTexts: texts }, function () {
        chrome.storage.local.get(null, function (items) {
          console.log(items);
        });
      });
    });
  }
});
