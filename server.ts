import express from "express";
import path from "path";
import net from "net";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

function parseArgPort() {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--port" && args[i + 1]) {
      return Number(args[i + 1]);
    }
    if (arg.startsWith("--port=")) {
      return Number(arg.split("=")[1]);
    }
  }
  return undefined;
}

function isPortFree(port: number, host: string) {
  return new Promise<boolean>((resolve) => {
    const server = net.createServer();
    server.once("error", (err: any) => {
      server.close(() => resolve(false));
    });
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port, host);
  });
}

async function resolvePort(preferredPort: number, host: string, maxAttempts = 10) {
  let port = preferredPort;
  for (let i = 0; i <= maxAttempts; i++) {
    if (await isPortFree(port, host)) {
      return port;
    }
    port += 1;
  }
  throw new Error(`No free port found between ${preferredPort} and ${preferredPort + maxAttempts}`);
}

async function startServer() {
  const app = express();
  const argPort = parseArgPort();
  const desiredPort = Number(argPort ?? process.env.PORT ?? process.env.APP_PORT) || 3000;
  const HOST = process.env.HOST || "0.0.0.0";
  const PORT = await resolvePort(desiredPort, HOST);

  if (PORT !== desiredPort) {
    console.log(`[Server] Port ${desiredPort} is in use. Falling back to http://${HOST}:${PORT}`);
  }

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Server-side AI Terminal endpoint for Vivek's Portfolio
  app.post("/api/terminal/ask", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          response:
            "[AI Assistant]: GEMINI_API_KEY is not configured in the environment. Vivek's security profile response generator is running in local fallback mode.\n\nVivek Bhandari is a Web Application Security Researcher, Bug Bounty Hunter, and CTF Player at Team Void-Walkers specializing in OWASP Top 10, OAuth vulnerabilities, SSRF/LFI mitigation, and web application security auditing.",
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-2.5-flash";

      const systemInstruction = `You are the AI Security Assistant on the personal interactive 3D portfolio website of Vivek Bhandari.
Vivek Bhandari details:
- Role: Web Application Security Researcher, Bug Bounty Hunter, CTF Player at Team Void-Walkers
- Focus: Web exploitation, OWASP Top 10, API security, privilege escalation, vulnerability discovery & mitigation.
- Projects: Exploit Feed (CVE intelligence tracker), URLPathGuard (URL path sanitization against SSRF/LFI), ZeroStalker (OSINT & attack surface mapping), Bandit OverTheWire solutions, Void-Walkers CTF Writeups.
- Profiles: GitHub (https://github.com/vivekbhandarisec), LinkedIn (https://www.linkedin.com/in/vivekbhandarisec/), Email (vivekbhandari.sec@gmail.com), Resume (https://vivekbhandarisec.github.io/security/resume.pdf).

Answer cleanly, concisely, and professionally in terminal-formatted plain text. Avoid Markdown headings or extra fluff. Keep responses succinct, technical yet approachable, with security research context.`;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      });

      const text = response.text || "No response generated.";
      res.json({ response: text });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      res.status(500).json({
        error: "Failed to generate AI response",
        details: err?.message || String(err),
      });
    }
  });

  // Vite development middleware vs production static server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: HOST, port: PORT },
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

  app.listen(PORT, HOST, () => {
    console.log(`[Server] Running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
