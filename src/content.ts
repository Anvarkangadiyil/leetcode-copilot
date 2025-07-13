// content.ts
console.log("✅ LeetCode AI Assistant content script loaded")

// Example: Inject a floating button
const button = document.createElement("button")
button.innerText = "Open Side Panel"
button.style.position = "fixed"
button.style.bottom = "20px"
button.style.right = "20px"
button.style.padding = "10px 16px"
button.style.zIndex = "9999"
button.style.backgroundColor = "#0f172a"
button.style.color = "white"
button.style.borderRadius = "8px"
button.style.border = "none"
button.style.cursor = "pointer"

button.onclick = () => {
 chrome.runtime.sendMessage('get-user-data', (response) => {
  // 3. Got an asynchronous response with the data from the service worker
  console.log('received user data', response);
  
});
}

document.body.appendChild(button)
