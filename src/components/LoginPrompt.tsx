// LoginPrompt.tsx
import { Bot } from "lucide-react";
import { Link } from "react-router-dom";

export const LoginPrompt = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen! w-full!  gap-6 p-6 bg-gray-900 text-white">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-sm text-gray-300">
          Please log in to continue using your AI assistant
        </p>
      </div>
      <Link
        to="/login"
        className=" transition-all duration-200 shadow-md hover:shadow-lg"
      >
        Sign In
      </Link>
    </div>
  );
};