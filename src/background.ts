// background.ts
chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ Extension installed")
})

// Optional: log when a tab is updated
chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url?.includes("leetcode.com")) {
    console.log("🧠 LeetCode page loaded")
  }
})
