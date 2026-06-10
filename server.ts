import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory chat handler using Gemini SDK
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      // Check if process.env.GEMINI_API_KEY is available. If not, use simulated model or provide error.
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback simulated TSquare AI with elegant custom replies in case key is missing
        const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
        let reply = "Greetings! I am TSquare Concierge AI, your technical partner. Connect your GEMINI_API_KEY under Settings > Secrets to activate real-time Gemini reasoning!";
        
        if (lastMsg.includes("service") || lastMsg.includes("offer") || lastMsg.includes("what you do")) {
          reply = "At TSquare digital agency, we build bleeding-edge Web Applications, cross-platform Mobile Clients, Custom modular ERP/CRM Systems, secure HIMS clinics, and bespoke AI pipelines. Let us know what project you're crafting!";
        } else if (lastMsg.includes("pricing") || lastMsg.includes("cost") || lastMsg.includes("rate") || lastMsg.includes("price")) {
          reply = "Every system is fully bespoke! Generally, our high-performance MVPs begin around $15,000 to $25,000, customized corporate applications average $35,000 to $70,000, and fully scalable cloud portfolios range based on specifications. Contact us using our form to receive a detailed scoping session!";
        } else if (lastMsg.includes("estimate") || lastMsg.includes("project") || lastMsg.includes("scope")) {
          reply = "I'd love to estimate a quote! Please let me know if your system targets Web or Mobile, your desired launch timeline, and your feature priorities. Together we can refine your project targets.";
        } else if (lastMsg.includes("hello") || lastMsg.includes("hi") || lastMsg.includes("hey")) {
          reply = "Hello! I am TSquare Concierge AI. How can I help you design, scale, or accelerate your custom software systems today?";
        } else if (lastMsg.includes("tech") || lastMsg.includes("stack") || lastMsg.includes("code")) {
          reply = "We craft applications with full-stack perfection: React, Next.js, Flutter, Node.js, Express, PostgreSQL, MongoDB, Redis, and high-performance Cloud networks (AWS/GCP). This allows us to guarantee 99.99% system uptime and sub-second paint latencies!";
        }

        return res.json({ text: reply, simulated: true });
      }

      // Initialize GoogleGenAI properly
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Assemble conversational history
      const formattedHistory = messages.slice(0, -1).map((msg: any) => {
        return `${msg.role === "user" ? "User" : "TSquare Concierge AI"}: ${msg.content}`;
      }).join("\n");

      const userMessage = messages[messages.length - 1].content;

      const systemPrompt = `You are "TSquare Concierge AI", the helpful, friendly, and ultra-professional AI partner representing TSquare Digital Agency.
Our core services include:
1. Web & Mobile App development (Next.js, React, Node.js, Flutter, Android, iOS).
2. UI/UX Design with absolute polish, micro-animations, premium layout, and spacing.
3. Custom CRM, ERP, and AI SaaS application engineering.
4. Scale-to-zero Cloud solutions.

Your goal is to answer queries objectively, with professional composure, and showcase TSquare's capabilities.
Provide estimates where possible when users ask for pricing or cost, pointing out that smaller custom React web apps starting around $10,000, and larger MVPs around $25,000+.
Be concise, avoid using markdown titles or heavy headers, and focus on clean, human-like dialogue. Keep replies under 3-4 sentences when possible.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `${systemPrompt}\n\nHistory:\n${formattedHistory}\n\nUser: ${userMessage}\nTSquare Concierge AI:`,
      });

      return res.json({ text: response.text });
    } catch (err: any) {
      console.error("[API Chat Error]:", err);
      // Fail gracefully and return standard concierge reply
      return res.json({ text: "I encountered a minor network latency, but I am still available! At TSquare Innovations, we specialize in overcoming digital challenges. Let's discuss your custom web, mobile, ERP or HIMS platforms project." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
