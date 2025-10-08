import type { Message, QuestionInformation } from "@/types/type";
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

interface QuestionDB extends DBSchema {
  questions: {
    key: string;
    value: QuestionInformation;
  };
}

export const dbPromise = openDB<ChatDB>("chat-db", 1, {
  upgrade(db) {
    db.createObjectStore("chats", { keyPath: "problemName" });
  },
});

export const questionDbPromise = openDB<QuestionDB>("question-db", 1, {
  upgrade(db) {
    db.createObjectStore("questions", { keyPath: "id" });
  }


});
