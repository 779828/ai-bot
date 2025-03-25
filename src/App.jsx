import React, { useState } from "react";
import { getGeminiResponse } from "./geminiApi";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    if (!input) return;
    setResponse("Generating...");
    const aiResponse = await getGeminiResponse(input);
    setResponse(aiResponse);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center">
          AI Chat Bot
        </h1>

        <textarea
          className="w-full p-3 mt-4 text-white bg-gray-700 border-2 border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
          rows="4"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={handleGenerate}
        >
          Generate
        </button>

        <div className="mt-6 p-4 bg-gray-700 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-white">Response:</h2>
          <div
            className="mt-2 text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: response }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
