
export interface Message {
  id: string;
  name: "bot" | "user";
  message: string;
  timestamp: string;
  status?: "sending" | "sent" | "error";
}

export interface Settings {
  notifications: boolean;
  soundEnabled: boolean;
  autoScroll: boolean;
  geminiApiKey: string;
  model: "gemini-pro" | "gemini-pro-vision";
  temperature: number;
  maxTokens: number;
}