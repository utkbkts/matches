import { CheckCircle, HandHeart } from "lucide-react";
import Confetti from "react-confetti";

const SuccessPage = () => {
  return (
    <div className="h-screen flex items-center justify-center !overflow-hidden">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl !overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-emerald-400 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
            Payment Successful thanks{" "}
          </h1>
          <p className="text-emerald-400 text-center text-sm mb-6">
            You can check your email account for detailed information.{" "}
          </p>
          <div className="space-y-4">
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center"
            >
              <HandHeart className="mr-2" size={18} />
              Thank you for trusting us!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
