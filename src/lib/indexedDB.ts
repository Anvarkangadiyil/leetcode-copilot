import type { Message } from "@/types/type";
import { openDB, type DBSchema } from "idb";

interface ChatDB extends DBSchema {
  chats: {
    key: string;
    value: {
      problemName: string;
      chatHistory: Message[];
    };
  };
}

export const dbPromise = openDB<ChatDB>("chat-db", 1, {
  upgrade(db) {
    db.createObjectStore("chats", { keyPath: "problemName" });
  },
});