chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'open_side_panel') {
    // Open the side panel for the current tab that sent the message
    chrome.sidePanel.open({ tabId: sender.tab?.id! }); //
  }
});
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }) //
  .catch((error) => console.error(error)); //



