// background.ts
chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ Extension installed");
  chrome.sidePanel.open({ tabId: parseInt(chrome.runtime.id) });
});

// Optional: log when a tab is updated
chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url?.includes("leetcode.com")) {
    console.log("🧠 LeetCode page loaded");
  }
});

chrome.action.onClicked.addListener(() => {
  console.log(
    "To open the AI side panel, click your extension icon and choose 'Show Side Panel'."
  );
});
//please i want to open the side panel when button that is added in content.js
chrome.action.onClicked.addListener(() => {
  chrome.sidePanel.open({ tabId: parseInt(chrome.runtime.id) });
});

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  if (message === "get-user-data") {
    chrome.sidePanel.open({ tabId: parseInt(chrome.runtime.id) });
  }
});
