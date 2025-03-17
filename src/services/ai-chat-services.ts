const getAiResponse = async (prompt: string) => {
    const aiResponse = await window.puter.ai.chat(prompt);

    const responseText =
        typeof aiResponse === "object" && aiResponse.message
            ? aiResponse.message.content
            : String(aiResponse);
    return responseText;
};

export default getAiResponse;