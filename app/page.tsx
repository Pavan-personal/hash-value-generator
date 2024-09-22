"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [hashValue, setHashValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [encoding, setEncoding] = useState("hex");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/hash/${inputValue.trim()}?encoding=${encoding}`
      );
      setHashValue(response?.data?.hash);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen w-full flex-col bg-gradient-to-br from-teal-400 to-teal-900 flex items-center justify-center p-4">
      <div className="text-center text-white font-bold text-2xl sm:text-4xl mb-6 sm:mb-12">
        Hash Value Generator
      </div>

      <div
        className="bg-white shadow-2xl rounded-xl p-4 sm:p-8 w-full max-w-md"
        style={{ background: "rgba(255, 255, 255, 0.85)" }}
      >
        <div>
          <div className="font-semibold text-gray-700 mb-2 sm:mb-4 text-base sm:text-lg">
            Enter a Value
          </div>
          <input
            placeholder="Enter any text here"
            autoFocus
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <div className="mt-4 sm:mt-6">
          <div className="font-semibold text-gray-700 text-base sm:text-lg mb-2 sm:mb-4">
            Select Encoding Format
          </div>
          <div className="flex justify-between gap-2 sm:gap-3">
            {["base64", "binary", "hex"].map((format) => (
              <div
                key={format}
                onClick={() => setEncoding(format)}
                className={`cursor-pointer px-2 py-1 sm:px-4 sm:py-2 rounded-lg border-2 transition-all duration-300 text-sm sm:text-base ${
                  encoding === format
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-teal-100"
                }`}
              >
                {format.charAt(0).toUpperCase() + format.slice(1)}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className={`w-full mt-4 sm:mt-6 bg-teal-600 text-white font-semibold py-2 sm:py-3 rounded-lg transition-all duration-300 shadow-md ${
            loading || inputValue.trim().length === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-teal-700"
          }`}
          disabled={loading || inputValue.trim().length === 0}
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        {loading && (
          <div className="flex justify-center items-center mt-4 sm:mt-6">
            <svg
              className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-teal-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </div>
        )}

        <div className="mt-6 sm:mt-8">
          <div className="font-semibold text-gray-700 mb-2 sm:mb-4 text-base sm:text-lg">
            Hash Value of Given Input
          </div>
          <textarea
            readOnly
            value={loading ? "" : hashValue}
            rows={4}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg border-2 border-gray-300 focus:outline-none font-semibold bg-gray-50 text-gray-600 text-sm sm:text-base"
            placeholder="Hash value will appear here"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
