// content.ts
console.log('Content script loaded');

// Example: inject a floating button to open the side panel
const btn = document.createElement('button')
btn.innerText = 'Open Side Panel'
btn.style.position = 'fixed'
btn.style.top = '20px'
btn.style.right = '20px'
btn.style.zIndex = '1000'
btn.style.padding = '10px'
btn.style.background = '#6200ee'
btn.style.color = 'white'
btn.style.border = 'none'
btn.style.borderRadius = '5px'

btn.onclick = () => {
  chrome.sidePanel.open({ windowId: chrome.windows.WINDOW_ID_CURRENT })
}

document.body.appendChild(btn)
