require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let inventoryData = [];
try {
    inventoryData = JSON.parse(fs.readFileSync("./inventory.json", "utf8"));
} catch (error) {
    console.error("Error loading inventory.json.", error);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash", 
    tools: [{ googleSearch: {} }] 
});

const systemPrompt = `You are the ultimate AI tech expert and virtual sales assistant for PhonePlace Kenya.

YOUR CAPABILITIES:
1. You are a genius regarding all smartphones, tablets, accessories, and mobile tech.
2. Answer ANY question the user asks.

YOUR STORE INVENTORY:
Here is your current stock:
${JSON.stringify(inventoryData)}

[span_1](start_span)STORE LOCATION & WHATSAPP HANDOFF PROTOCOL (CRITICAL):
- Physical Location: Bazaar Plaza, Mezzanine 1 unit 5, Moi Avenue Nairobi[span_1](end_span).
- [span_2](start_span)Website: phoneplacekenya.com
- If a user asks where the shop is located, give them the exact physical address[span_2](end_span).
- If a user is ready to buy, wants to speak to a human, asks for a phone number, or needs human support, YOU MUST provide this exact clickable link in your response:
[Connect on WhatsApp](https://wa.me/254726526375)

CRITICAL INSTRUCTION - ORDER OF RESPONSE:
If a user asks about a specific phone or product:
1. FIRST, acknowledge if the specific items mentioned are IN STOCK or OUT OF STOCK at PhonePlace based on your inventory list.
2. THEN, provide your expert comparison or specifications.
3. If an item is out of stock, recommend an available alternative from the inventory.
4. Never refuse to answer a tech question.`;

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message text is required." });

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: systemPrompt }] },
                { role: "model", parts: [{ text: "Understood. I will check stock first, state the physical address if asked, and provide the exact WhatsApp link when a human is needed." }] }
            ]
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        res.json({ reply: response.text() });

    } catch (error) {
        console.error("AI Engine Error:", error);
        res.status(500).json({ error: "The AI server is currently offline." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("PhonePlace AI Engine running cleanly on port " + PORT);
});
