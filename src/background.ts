import { supabase, initializeSupabaseClient } from "./helper/supabase-client";
import { questionDbPromise } from "./lib/indexedDB";

// Initialize on startup
chrome.runtime.onStartup.addListener(async () => {
  await initializeSupabaseClient();
});

chrome.runtime.onInstalled.addListener(async () => {
  await initializeSupabaseClient();
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  
  if (message.action === "SAVE_PROBLEM") {
    questionDbPromise.then(async (db) => {
      const tx = db.transaction("questions", "readwrite");
      await tx.store.put(message.payload); // keyPath is "id" = "currentQ"
      console.log("Saved current problem:", message.payload);

      // notify side panel to refresh
      chrome.runtime.sendMessage({ action: "UPDATE_Q" });
    });
    sendResponse({ status: "ok" });
    return true;
  }

  if (message.action === "signUp") {
    const { email, password, name } = message.payload;

    supabase.auth
      .signUp({ email, password, options: { data: { name } } })
      .then(({ data, error }) => {
        sendResponse({ data, error });
      })
      .catch((error) => {
        sendResponse({ data: null, error });
      });

    return true;
  }

  if (message.action === "signIn") {
    const { email, password } = message.payload;

    supabase.auth
      .signInWithPassword({ email, password })
      .then(({ data, error }) => {
        sendResponse({ data, error });
      })
      .catch((error) => {
        sendResponse({ data: null, error });
      });

    return true;
  }

  if (message.action === "signOut") {
    supabase.auth
      .signOut()
      .then(({ error }) => {
        sendResponse({ error: error || null });
      })
      .catch((error) => {
        sendResponse({ error });
      });

    return true;
  }

  if (message.action === "getSession") {
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        sendResponse({ data, error });
      })
      .catch((error) => {
        sendResponse({ data: null, error });
      });

    return true;
  }
  if (message.action == "openSidePanel") {
    chrome.sidePanel.open({ tabId: _sender.tab?.id! }, () => {
      console.log("Side Panel Opened");
    });
  }
  if (message.action == "getProblem") {
    questionDbPromise.then(async (db) => {
      const tabUrl = _sender.tab?.url;
      if (tabUrl) {
        const data = await db.get("questions", tabUrl);
        console.log(data);
        sendResponse({ problemName: data?.name, error: null });
      }
    });
  }
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
