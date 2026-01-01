require("dotenv").config();
const OpenAI = require("openai");

async function testKey() {
    console.log("Testing OpenAI API Key...");

    if (!process.env.OPENAI_API_KEY) {
        console.error("❌ No OPENAI_API_KEY found in environment variables.");
        return;
    }

    // Mask key for safety in logs
    const maskedKey = process.env.OPENAI_API_KEY.substring(0, 8) + "..." + process.env.OPENAI_API_KEY.slice(-4);
    console.log(`Using Key: ${maskedKey}`);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    try {
        const response = await openai.models.list();
        console.log("✅ API Key is Valid! (Models listed)");

        console.log("Testing Chat Completion (GPT-3.5-Turbo)...");
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Hello, can you hear me?" }],
            max_tokens: 10
        });
        console.log("✅ Chat Completion Successful!");
        console.log("Response:", chatCompletion.choices[0].message.content);

    } catch (error) {
        console.error("❌ API Error:");
        console.error(`Status: ${error.status}`);
        console.error(`Message: ${error.message}`);
        console.error(`Code: ${error.code}`);
        if (error.code === 'insufficient_quota') {
            console.error("⚠️  QUOTA EXCEEDED - You need to add credits.");
        }
    }
}

testKey();
