const OpenAI = require("openai");

let openai = null;
let initialized = false;

const getOpenAI = () => {
    if (!initialized) {
        initialized = true;
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "your_openai_api_key_here") {
            console.log("✅ OpenAI API Key configured");
            openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY
            });
        } else {
            console.log("⚠️ OpenAI API Key not configured - AI fallback disabled");
        }
    }
    return openai;
};

const SYSTEM_PROMPT = `You are a helpful, friendly customer support assistant for a SaaS company. Your role is to:

1. Answer customer questions clearly and concisely
2. Be empathetic and professional
3. Provide accurate information about products and services
4. Escalate complex issues to human support when needed
5. Use emojis appropriately to be friendly
6. Keep responses focused and not too long

Important guidelines:
- If you don't know something, admit it and offer to connect with human support
- Always be polite and patient
- Provide step-by-step instructions when explaining processes
- Format responses with bullet points or numbered lists when appropriate`;

exports.askAI = async (messages) => {
    const client = getOpenAI();

    if (!client) {
        return {
            content: "I'd love to help you with that! 🤔 For detailed assistance, please contact our support team at support@example.com or try asking about our pricing, refunds, features, or support hours.",
            error: "not_configured",
            source: "kb"
        };
    }

    try {
        const formattedMessages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        ];

        const response = await client.chat.completions.create({
            model: "gpt-4",
            messages: formattedMessages,
            max_tokens: 500,
            temperature: 0.7,
            presence_penalty: 0.1,
            frequency_penalty: 0.1
        });

        return {
            content: response.choices[0].message.content,
            usage: response.usage,
            source: "ai"
        };
    } catch (error) {
        console.error("OpenAI API Error:", error.message);

        if (error.code === "insufficient_quota") {
            return {
                content: "I apologize, but I'm experiencing high demand right now. Please try again in a moment or contact our human support team for immediate assistance.",
                error: "quota_exceeded",
                source: "ai"
            };
        }

        if (error.code === "invalid_api_key") {
            return {
                content: "I'm having trouble connecting to my brain right now. 🤔 Please try again or reach out to our support team directly.",
                error: "api_key_invalid",
                source: "ai"
            };
        }

        return {
            content: "I apologize, but I'm having some technical difficulties. Our human support team is available to help you. Please try again in a moment or contact support@example.com.",
            error: error.message,
            source: "ai"
        };
    }
};

exports.isConfigured = () => {
    return !!process.env.OPENAI_API_KEY &&
        process.env.OPENAI_API_KEY !== "your_openai_api_key_here";
};

exports.getAvailableModels = async () => {
    try {
        const models = await openai.models.list();
        return models.data
            .filter(m => m.id.includes("gpt"))
            .map(m => m.id);
    } catch (error) {
        return ["gpt-4", "gpt-3.5-turbo"];
    }
};
