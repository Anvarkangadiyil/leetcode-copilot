// background.ts
import { supabase, initializeSupabaseClient } from "./helper/supabase-client";

// Initialize on startup
chrome.runtime.onStartup.addListener(async () => {
  await initializeSupabaseClient();
});

chrome.runtime.onInstalled.addListener(async () => {
  await initializeSupabaseClient();
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "signUp") {
    const { email, password } = message.payload;

    supabase.auth
      .signUp({ email, password })
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
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
