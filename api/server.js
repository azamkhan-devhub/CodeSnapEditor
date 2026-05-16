// // // // // // require('dotenv').config();
// // // // // // const express = require('express');
// // // // // // const path = require('path');

// // // // // // const app = express();
// // // // // // const PORT = process.env.PORT || 3000;

// // // // // // app.use(express.json());
// // // // // // app.use(express.static(__dirname));

// // // // // // app.get('/', (req, res) => {
// // // // // //   res.sendFile(path.join(__dirname, 'index.html'));
// // // // // // });

// // // // // // app.post('/api/explain', async (req, res) => {
// // // // // //   try {
// // // // // //     const { code } = req.body;

// // // // // //     if (!code || !code.trim()) {
// // // // // //       return res.status(400).json({ error: 'Code is required' });
// // // // // //     }

// // // // // //     if (!process.env.GROQ_API_KEY) {
// // // // // //       return res.status(500).json({ error: 'GROQ_API_KEY is missing' });
// // // // // //     }

// // // // // //     const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
// // // // // //       method: 'POST',
// // // // // //       headers: {
// // // // // //         'Content-Type': 'application/json',
// // // // // //         'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
// // // // // //       },
// // // // // //       body: JSON.stringify({
// // // // // //         model: 'llama-3.3-70b-versatile',
// // // // // //         messages: [
// // // // // //           {
// // // // // //             role: 'system',
// // // // // //             content: 'You are a helpful code explainer. Explain the code clearly in simple language.'
// // // // // //           },
// // // // // //           {
// // // // // //             role: 'user',
// // // // // //             content: `Explain this code:\n\n${code}`
// // // // // //           }
// // // // // //         ]
// // // // // //       })
// // // // // //     });

// // // // // //     const data = await response.json();

// // // // // //     if (!response.ok) {
// // // // // //       return res.status(response.status).json({
// // // // // //         error: data?.error?.message || 'Groq API request failed'
// // // // // //       });
// // // // // //     }

// // // // // //     const text = data?.choices?.[0]?.message?.content || 'No explanation returned.';
// // // // // //     res.json({ text });
// // // // // //   } catch (err) {
// // // // // //     res.status(500).json({ error: 'Server error while calling Groq' });
// // // // // //   }
// // // // // // });

// // // // // // // app.listen(PORT, () => {
// // // // // // //   console.log(`Server running on http://localhost:${PORT}`);
// // // // // // // });
// // // // // // app.get('/', (req, res) => {
// // // // // //   res.sendFile(path.join(__dirname, 'index.html'));
// // // // // // });

// // // // // // module.exports = app;

// // // // // require('dotenv').config();
// // // // // const express = require('express');
// // // // // const path = require('path');

// // // // // const app = express();

// // // // // app.use(express.json());
// // // // // app.use(express.static(__dirname));

// // // // // app.get('/', (req, res) => {
// // // // //   res.sendFile(path.join(__dirname, 'index.html'));
// // // // // });

// // // // // app.post('/api/explain', async (req, res) => {
// // // // //   try {
// // // // //     const { code } = req.body;

// // // // //     if (!code || !code.trim()) {
// // // // //       return res.status(400).json({ error: 'Code is required' });
// // // // //     }

// // // // //     const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
// // // // //       method: 'POST',
// // // // //       headers: {
// // // // //         'Content-Type': 'application/json',
// // // // //         'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
// // // // //       },
// // // // //       body: JSON.stringify({
// // // // //         model: 'llama-3.3-70b-versatile',
// // // // //         messages: [
// // // // //           {
// // // // //             role: 'system',
// // // // //             content: 'You are a helpful code explainer.'
// // // // //           },
// // // // //           {
// // // // //             role: 'user',
// // // // //             content: `Explain this code:\n\n${code}`
// // // // //           }
// // // // //         ]
// // // // //       })
// // // // //     });

// // // // //     const data = await response.json();

// // // // //     res.json({
// // // // //       text: data?.choices?.[0]?.message?.content || 'No response'
// // // // //     });

// // // // //   } catch (err) {
// // // // //     res.status(500).json({ error: 'Server Error' });
// // // // //   }
// // // // // });

// // // // // module.exports = app;

// // // // require('dotenv').config();

// // // // const express = require('express');
// // // // const path = require('path');

// // // // const app = express();

// // // // app.use(express.json());

// // // // app.post('/api/explain', async (req, res) => {
// // // //   try {
// // // //     const { code } = req.body;

// // // //     if (!code) {
// // // //       return res.status(400).json({
// // // //         error: 'Code is required'
// // // //       });
// // // //     }

// // // //     const response = await fetch(
// // // //       'https://api.groq.com/openai/v1/chat/completions',
// // // //       {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //           'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
// // // //         },
// // // //         body: JSON.stringify({
// // // //           model: 'llama-3.3-70b-versatile',
// // // //           messages: [
// // // //             {
// // // //               role: 'system',
// // // //               content: 'Explain code simply.'
// // // //             },
// // // //             {
// // // //               role: 'user',
// // // //               content: code
// // // //             }
// // // //           ]
// // // //         })
// // // //       }
// // // //     );

// // // //     const data = await response.json();

// // // //     res.json({
// // // //       text:
// // // //         data?.choices?.[0]?.message?.content ||
// // // //         'No explanation generated.'
// // // //     });

// // // //   } catch (err) {
// // // //     res.status(500).json({
// // // //       error: 'Server Error'
// // // //     });
// // // //   }
// // // // });

// // // // module.exports = app;

// // // require('dotenv').config();
// // // const express = require('express');
// // // const path = require('path');

// // // const app = express();

// // // app.use(express.json());

// // // app.use(express.static(path.join(__dirname, '..')));

// // // app.get('/', (req, res) => {
// // //   res.sendFile(path.join(__dirname, '..', 'index.html'));
// // // });

// // // app.post('/api/explain', async (req, res) => {
// // //   try {
// // //     const { code } = req.body;

// // //     if (!code || !code.trim()) {
// // //       return res.status(400).json({ error: 'Code is required' });
// // //     }

// // //     if (!process.env.GROQ_API_KEY) {
// // //       return res.status(500).json({ error: 'GROQ_API_KEY is missing' });
// // //     }

// // //     const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
// // //       method: 'POST',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //         'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
// // //       },
// // //       body: JSON.stringify({
// // //         model: 'llama-3.3-70b-versatile',
// // //         messages: [
// // //           {
// // //             role: 'system',
// // //             content: 'You are a helpful code explainer.'
// // //           },
// // //           {
// // //             role: 'user',
// // //             content: `Explain this code:\n\n${code}`
// // //           }
// // //         ]
// // //       })
// // //     });

// // //     const data = await response.json();

// // //     const text =
// // //       data?.choices?.[0]?.message?.content ||
// // //       'No explanation returned.';

// // //     res.json({ text });

// // //   } catch (err) {
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // });

// // // module.exports = app;

// // require('dotenv').config();
// // const express = require('express');
// // const path = require('path');

// // const app = express();

// // app.use(express.json());

// // app.use(express.static(path.join(__dirname, '..')));

// // app.get('/', (req, res) => {
// //   res.sendFile(path.join(__dirname, '..', 'index.html'));
// // });

// // app.post('/api/explain', async (req, res) => {
// //   try {
// //     const { code } = req.body;

// //     if (!code || !code.trim()) {
// //       return res.status(400).json({ error: 'Code is required' });
// //     }

// //     if (!process.env.GROQ_API_KEY) {
// //       return res.status(500).json({ error: 'GROQ_API_KEY is missing' });
// //     }

// //     const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
// //       },
// //       body: JSON.stringify({
// //         model: 'llama-3.3-70b-versatile',
// //         messages: [
// //           {
// //             role: 'system',
// //             content: 'You are a helpful code explainer.'
// //           },
// //           {
// //             role: 'user',
// //             content: `Explain this code:\n\n${code}`
// //           }
// //         ]
// //       })
// //     });

// //     const data = await response.json();

// //     res.json({
// //       text: data?.choices?.[0]?.message?.content || 'No explanation returned.'
// //     });

// //   } catch (err) {
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // module.exports = app;

// require("dotenv").config();

// const express = require("express");
// const path = require("path");

// const app = express();

// app.use(express.json());

// /*
//  Serve static files
// */
// app.use(express.static(path.join(__dirname, "..")));

// /*
//  Home Route
// */
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "index.html"));
// });

// /*
//  API Route
// */
// app.post("/api/explain", async (req, res) => {
//   try {
//     const { code } = req.body;

//     if (!code || !code.trim()) {
//       return res.status(400).json({
//         error: "Code is required"
//       });
//     }

//     if (!process.env.GROQ_API_KEY) {
//       return res.status(500).json({
//         error: "GROQ_API_KEY is missing"
//       });
//     }

//     const response = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`
//         },
//         body: JSON.stringify({
//           model: "llama-3.3-70b-versatile",
//           messages: [
//             {
//               role: "system",
//               content: "You are a helpful code explainer."
//             },
//             {
//               role: "user",
//               content: `Explain this code:\n\n${code}`
//             }
//           ]
//         })
//       }
//     );

//     const data = await response.json();

//     res.json({
//       text:
//         data?.choices?.[0]?.message?.content ||
//         "No explanation returned."
//     });

//   } catch (err) {
//     console.error(err);

//     res.status(500).json({
//       error: "Server error"
//     });
//   }
// });

// /*
//  Start Local Server
// */
// if (require.main === module) {
//   const PORT = process.env.PORT || 3000;

//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }

// /*
//  Export for Vercel
// */
// module.exports = app;

require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

/*
  Serve static files from ROOT directory (where index.html lives)
  This must come BEFORE route definitions
*/
app.use(express.static(path.join(__dirname, "..")));

/*
  API Route — AI Code Explanation via Groq
*/
app.post("/api/explain", async (req, res) => {
  try {
    const { code, lang } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ error: "Code is required" });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "GROQ_API_KEY is not configured" });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 600,
          messages: [
            {
              role: "system",
              content: `You are CodeSnap's AI code explainer. Explain code clearly for students.
Be concise but insightful. Cover: what it does, how it works, notable patterns or issues.
Use simple language with emoji bullet points. Keep it under 200 words.
Format your response with these sections:
📌 What it does: (1-2 sentences)
⚙️ How it works: (3-5 bullet points)
💡 Tips/Issues: (1-3 bullet points if any)`
            },
            {
              role: "user",
              content: `Explain this ${lang || "code"}:\n\n\`\`\`${lang || ""}\n${code}\n\`\`\``
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", response.status, errText);
      return res.status(502).json({ error: "AI service error. Try again." });
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "No explanation returned.";

    res.json({ text });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

/*
  Catch-all: serve index.html for all non-API routes (SPA routing)
*/
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

/*
  Start local dev server
*/
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ CodeSnap server running at http://localhost:${PORT}`);
  });
}

/*
  Export for Vercel serverless
*/
module.exports = app;