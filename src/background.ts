chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'open_side_panel') {
    chrome.sidePanel.open({ tabId: sender.tab?.id! }); //
  }
});


chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }) 
  .catch((error) => console.error(error)); 



