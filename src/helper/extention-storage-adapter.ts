
import type { SupportedStorage } from '@supabase/supabase-js';

export class ChromeStorageAdapter implements SupportedStorage {
  async getItem(key: string): Promise<string | null> {
    try {
      const result = await chrome.storage.local.get([key]);
      return result[key] || null;
    } catch (error) {
      console.error('ChromeStorageAdapter getItem error:', error);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      await chrome.storage.local.set({ [key]: value });
    } catch (error) {
      console.error('ChromeStorageAdapter setItem error:', error);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await chrome.storage.local.remove([key]);
    } catch (error) {
      console.error('ChromeStorageAdapter removeItem error:', error);
    }
  }
}
