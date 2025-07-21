import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env.REACT_APP_GITHUB_TOKEN;

if (!token) {
  console.error("GitHub token is missing. Please check your .env file");
  throw new Error("GitHub authentication token is not configured");
}

const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

const client = ModelClient(endpoint, new AzureKeyCredential(token));

export async function getChatCompletion(messages) {
  try {
    const response = await client.path("/chat/completions").post({
      body: {
        messages,
        temperature: 1,
        top_p: 1,
        model: model,
      },
    });

    if (isUnexpected(response)) {
      console.error("API Error:", response.body.error);
      throw new Error(response.body.error.message || "API request failed");
    }

    return response.body.choices[0].message.content;
  } catch (error) {
    console.error("Chat completion error:", error);
    throw error;
  }
}
