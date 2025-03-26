import axios from "axios";

/**
 * Sends a request to the backend server to get AI-generated content.
 * @param {string} prompt - The user's input.
 * @returns {Promise<string>} - The AI-generated response.
 */
export const getGeminiResponse = async (prompt) => {
  try {
    const response = await axios.post("http://localhost:8090/api/shai", {
      contents: [{ parts: [{ text: prompt }] }],
    });

    return (
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received."
    );
  } catch (error) {
    console.error("Error fetching response:", error.message);
    return "Error connecting to AI.";
  }
};
