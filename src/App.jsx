import React, { useState } from "react";
import { getGeminiResponse } from "./geminiApi";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleGenerate = async () => {
    if (!input) return;
    setResponse("Generating...");
    const aiResponse = await getGeminiResponse(input);
    setResponse(formatResponse(aiResponse)); // Format response properly
  };

  // Function to format AI response into structured HTML
  const formatResponse = (text) => {
    return text
      .replace(/\n\n/g, "<br/><br/>") // Keep paragraph spacing
      .replace(/\n• /g, "<li>") // Handle bullet points
      .replace(/\n/g, "<br/>") // Handle normal line breaks
      .replace(/<\/li><br\/>/g, "</li>") // Clean unnecessary breaks in lists
      .replace(
        /(Basics:|Intermediate:|Advanced:|Specific Questions I Can Answer:|To help me give you the best answer, please tell me:)/g,
        "<h3 class='text-lg font-semibold text-blue-600 border-b border-gray-300 pb-1 mt-4'>$1</h3>"
      ) // Convert headings
      .replace(
        /(What is React\?|Why use React\?|Core Concepts:|Setting up a React project:|Basic Syntax:|Component communication:|Conditional Rendering:|Lists and Keys:|Form Handling:|Styling:|Routing:|API Integration:|State Management:|Error Handling:|Performance Optimization:|Custom Hooks:|Higher-Order Components \(HOCs\):|Server-Side Rendering \(SSR\):|Testing:|TypeScript with React:|React Native:|Accessibility \(a11y\):)/g,
        "<strong class='text-gray-800'>$1</strong>"
      ); // Bold key topics
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          AI Chat Bot
        </h1>

        <textarea
          className="w-full p-3 mt-4 text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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

        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800">Response:</h2>
          <div
            className="mt-2 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: response }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
