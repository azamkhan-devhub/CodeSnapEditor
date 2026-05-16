module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { code, lang } = req.body || {};

  if (!code || !code.trim()) {
    return res.status(400).json({ error: "Code is required" });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "GROQ_API_KEY is not configured" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        max_tokens: 600,
        messages: [
          {
            role: "system",
            content: `You are CodeSnap's AI code explainer. Explain code clearly for students. Be concise but insightful. Cover: what it does, how it works, notable patterns or issues. Use simple language with emoji bullet points. Keep it under 200 words. Format your response with these sections:\n📌 What it does: (1-2 sentences)\n⚙️ How it works: (3-5 bullet points)\n💡 Tips/Issues: (1-3 bullet points if any)`
          },
          {
            role: "user",
            content: `Explain this ${lang || "code"}:\n\n\`\`\`${lang || ""}\n${code}\n\`\`\``
          }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", response.status, errText);
      return res.status(502).json({ error: "AI service error. Try again." });
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "No explanation returned.";
    return res.status(200).json({ text });
  } catch (error) {
    console.error("Vercel function error:", error);
    return res.status(500).json({ error: "Server error. Please try again." });
  }
};
