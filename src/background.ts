chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "openSidebarWindow") {
    chrome.windows.create({
      url: chrome.runtime.getURL("sidepanel.html"),
      type: "popup",
      width: 400,
      height: 700,
      left: screen.availWidth - 400,
      top: 100
    });
  }
});
