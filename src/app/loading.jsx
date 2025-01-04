import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="text-center">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-white animate-spin mx-auto" />
        </div>
        <h2 className="mt-4 text-white text-2xl font-bold">Loading...</h2>
        <p className="mt-2 text-gray-200">
          Hang tight! We're getting things ready for you.
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
