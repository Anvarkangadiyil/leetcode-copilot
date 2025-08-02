import type { Message, Settings } from "@/types/type";

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




const SidePanel = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
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

  // Initialize welcome message based on API key status
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      name: "bot",
      message: settings.geminiApiKey
        ? "Hello! I'm your AI assistant powered by Google's Gemini. How can I help you today?"
        : "Hello! I'm your AI assistant powered by Google's Gemini. How can I help you today? \n\n💡 **Tip:** Make sure to add your Gemini API key in settings to get started!",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([welcomeMessage]);
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

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsSending(true);

    try {
      const ai = new GoogleGenAI({
        apiKey: settings.geminiApiKey,
      });
   
      const response = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: inputValue,
        config: {
          temperature: settings.temperature,
          
        },
      });

      const botResponseId = (Date.now() + 1).toString();
      const initialBotResponse: Message = {
        id: botResponseId,
        name: "bot",
        message: "",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [
        ...prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "sent" as const } : msg
        ),
        initialBotResponse,
      ]);

      let accumulatedText = "";

      for await (const chunk of response) {
        const chunkText = chunk.text ?? "";
        accumulatedText += chunkText;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botResponseId
              ? { ...msg, message: accumulatedText }
              : msg
          )
        );
      }

      setIsSending(false);
    } catch (error) {
      console.error("Streaming error:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "error" as const } : msg
        )
      );
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