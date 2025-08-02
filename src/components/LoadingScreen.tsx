import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message: string;
}

export const LoadingScreen = ({ message }: LoadingScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen! gap-4 bg-gray-900 text-white">
      <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      <p className="text-sm text-gray-300">{message}</p>
    </div>
  );
};