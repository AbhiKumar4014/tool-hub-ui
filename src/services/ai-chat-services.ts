declare global {
    interface Window {
        puter?: {
            ai?: {
                chat: (prompt: string) => Promise<{ message?: { content: string } } | string>;
            };
        };
    }
}

const getAiResponse = async (prompt: string): Promise<string> => {
    if (!window.puter?.ai?.chat) {
        throw new Error("Puter AI is not initialized. Ensure the Puter script is loaded correctly.");
    }

    try {
        const aiResponse = await window.puter.ai.chat(prompt);

        if (typeof aiResponse === "string") {
            return aiResponse;
        }

        if (aiResponse?.message?.content) {
            return aiResponse.message.content;
        }

        throw new Error("Unexpected response format from Puter AI.");
    } catch (error: unknown) {
        console.error("Error calling Puter AI:", error);
        throw new Error(`Failed to get AI response from Puter: ${(error as Error).message}`);
    }
};

export default getAiResponse;
