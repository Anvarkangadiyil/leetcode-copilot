chrome.runtime.onInstalled.addListener(async () => {
  // Re-inject the content script into all active tabs
  for (const cs of chrome.runtime.getManifest().content_scripts!) {
    for (const tab of await chrome.tabs.query({ url: cs.matches })) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        files: [cs.js?.toString() ?? ""],
      });
    }
  }
});

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  console.log('Message received in service worker:', message);
  // if (message.action === "open_side_panel") {
  //   chrome.sidePanel
  //     .setOptions({
  //       tabId: sender.tab?.id,
  //       path: "sidepanel.html",
  //       enabled: true,
  //     })
  //     .then(() => {
  //       chrome.sidePanel.open({ tabId: sender.tab?.id! });
  //     });
  // }
});
