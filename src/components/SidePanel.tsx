import type { Message, QuestionInformation, Settings } from "@/types/type";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GoogleGenAI } from "@google/genai";
import { supabase } from "@/helper/supabase-client";
import { LoadingScreen } from "./LoadingScreen";
import { LoginPrompt } from "./LoginPrompt";
import { Header } from "./chat/Header";
import { MessageList } from "./chat/MessageList";
import { MessageInput } from "./chat/MessageInput";
import { SettingsModal } from "./settings/SettingsModel";
import { SYSTEM_PROMPT } from "@/utils/prompts";
import { dbPromise, questionDbPromise } from "@/lib/indexedDB";

const SidePanel = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [problem, setProblem] = useState("");
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    soundEnabled: true,
    autoScroll: true,
    geminiApiKey: "",
    model: "gemini-pro",
    temperature: 0.7,
    maxTokens: 1000,
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const navigate = useNavigate();

  const [qInformation, setQInformation] = useState<QuestionInformation | null>(
    null
  );

  useEffect(() => {
    const loadDb = async () => {
      try {
        const indexDB = await dbPromise;
        const qIndexDB = await questionDbPromise;

        // First, get the current question
        const currentQ: QuestionInformation | undefined = await qIndexDB.get(
          "questions",
          "currentQ"
        );

        let currentProblem = problem;

        if (currentQ) {
          setProblem(currentQ.name);
          setQInformation(currentQ);
          currentProblem = currentQ.name;
        }

        if (currentProblem) {
          const chatHistory = await indexDB.get("chats", currentProblem);
          if (chatHistory) {
            setMessages(chatHistory.chatHistory);
          } else {
            const welcomeMessage: Message = {
              id: "welcome",
              name: "model",
              message: settings.geminiApiKey
                ? "Hello! I'm your Leet code companion powered. How can I help you today? "
                : "Hello! I'm your Leet code companion. How can I help you today? \n\n💡 **Tip:** Make sure to add your Gemini API key in settings to get started!" +
                  "\n\n👉 **Settings** -> **API Configuration**",
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
            setMessages([welcomeMessage]);
          }
        } else {
          // No current problem, show welcome message
          const welcomeMessage: Message = {
            id: "welcome",
            name: "model",
            message: settings.geminiApiKey
              ? "Hello! I'm your Leet code companion powered. How can I help you today? "
              : "Hello! I'm your Leet code companion. How can I help you today? \n\n💡 **Tip:** Make sure to add your Gemini API key in settings to get started!" +
                "\n\n👉 **Settings** -> **API Configuration**",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages([welcomeMessage]);
        }
      } catch (error) {
        console.error("Error loading data from IndexedDB:", error);
      }
    };

    loadDb();

    const listener = (message: any) => {
      if (message.action === "UPDATE_Q") {
        loadDb();
      }
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, [settings.geminiApiKey]);

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      name: "user",
      message: inputValue,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sending",
    };

    const updatedMessagesWithUser = [...messages, newMessage];
    setMessages(updatedMessagesWithUser);

    const currentMessage = inputValue;
    setInputValue("");
    setIsSending(true);

    try {
      const ai = new GoogleGenAI({
        apiKey: settings.geminiApiKey,
      });

      const db = await dbPromise;
      const chats = await db.get("chats", problem);

      const geminiHistory = (chats?.chatHistory.slice(-10) || [])
        .filter((msg) => msg.id !== "welcome" && msg.status !== "error")
        .map((message: Message) => ({
          role: message.name === "user" ? "user" : "model",
          parts: [{ text: message.message }],
        }));

      //TODO: get the the problem statement and the code and the language and pass it with the prombt
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction:
            SYSTEM_PROMPT +
            `\n\nProblem: ${qInformation?.description}\n\nCode: ${qInformation?.answer}\n\nLanguage: ${qInformation?.programmingLanguage}`,
        },
        history: geminiHistory,
      });

      // Fix: Pass message directly, not as object
      const stream = await chat.sendMessageStream({ message: currentMessage });

      const botResponseId = (Date.now() + 1).toString();
      const initialBotResponse: Message = {
        id: botResponseId,
        name: "model",
        message: "",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sending",
      };

      const messagesWithBotResponse = [
        ...updatedMessagesWithUser.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "sent" as const } : msg
        ),
        initialBotResponse,
      ];
      setMessages(messagesWithBotResponse);

      let accumulatedText = "";

      for await (const chunk of stream) {
        const chunkText = chunk.text ?? "";
        accumulatedText += chunkText;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botResponseId
              ? { ...msg, message: accumulatedText, status: "sent" as const }
              : msg
          )
        );
      }

      const finalMessages = messagesWithBotResponse.map((msg) =>
        msg.id === botResponseId
          ? { ...msg, message: accumulatedText, status: "sent" as const }
          : msg
      );

      await db.put("chats", {
        problemName: problem,
        chatHistory: finalMessages,
      });

      setIsSending(false);
    } catch (error) {
      console.error("Streaming error:", error);

      const errorMessages = updatedMessagesWithUser.map((msg) =>
        msg.id === newMessage.id ? { ...msg, status: "error" as const } : msg
      );
      setMessages(errorMessages);

      const db = await dbPromise;
      await db.put("chats", {
        problemName: problem,
        chatHistory: errorMessages,
      });

      setIsSending(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
      } else {
        setIsLoggedIn(false);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsChange = (key: keyof Settings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    localStorage.setItem(
      "ai-assistant-settings",
      JSON.stringify({ ...settings, [key]: value })
    );
  };

  // Load settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("ai-assistant-settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error checking session:", error);
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(!!session);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      setIsLoading(false);

      if (event === "SIGNED_OUT") {
        navigate("/", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (!isLoggedIn) {
    return <LoginPrompt />;
  }

  return (
    <div className="flex flex-col h-screen w-full transition-colors duration-200 bg-gray-900 text-white">
      <Header
        onSettingsClick={() => setShowSettings(true)}
        onLogoutClick={handleLogout}
        currentProblem={problem}
      />

      <MessageList messages={messages} isSending={isSending} />

      <MessageInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSend={handleSend}
        isSending={isSending}
        onKeyPress={handleKeyPress}
      />

      <SettingsModal
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        settings={settings}
        showApiKey={showApiKey}
        setShowApiKey={setShowApiKey}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
};

export default SidePanel;
