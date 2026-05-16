// // // require('dotenv').config();
// // // const express = require('express');
// // // const path = require('path');

// // // const app = express();
// // // const PORT = process.env.PORT || 3000;

// // // app.use(express.json());
// // // app.use(express.static(__dirname));

// // // app.get('/', (req, res) => {
// // //   res.sendFile(path.join(__dirname, 'index.html'));
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
// // //             content: 'You are a helpful code explainer. Explain the code clearly in simple language.'
// // //           },
// // //           {
// // //             role: 'user',
// // //             content: `Explain this code:\n\n${code}`
// // //           }
// // //         ]
// // //       })
// // //     });

// // //     const data = await response.json();

// // //     if (!response.ok) {
// // //       return res.status(response.status).json({
// // //         error: data?.error?.message || 'Groq API request failed'
// // //       });
// // //     }

// // //     const text = data?.choices?.[0]?.message?.content || 'No explanation returned.';
// // //     res.json({ text });
// // //   } catch (err) {
// // //     res.status(500).json({ error: 'Server error while calling Groq' });
// // //   }
// // // });

// // // // app.listen(PORT, () => {
// // // //   console.log(`Server running on http://localhost:${PORT}`);
// // // // });
// // // app.get('/', (req, res) => {
// // //   res.sendFile(path.join(__dirname, 'index.html'));
// // // });

// // // module.exports = app;

// // require('dotenv').config();
// // const express = require('express');
// // const path = require('path');

// // const app = express();

// // app.use(express.json());
// // app.use(express.static(__dirname));

// // app.get('/', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'index.html'));
// // });

// // app.post('/api/explain', async (req, res) => {
// //   try {
// //     const { code } = req.body;

// //     if (!code || !code.trim()) {
// //       return res.status(400).json({ error: 'Code is required' });
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
// //       text: data?.choices?.[0]?.message?.content || 'No response'
// //     });

// //   } catch (err) {
// //     res.status(500).json({ error: 'Server Error' });
// //   }
// // });

// // module.exports = app;

// require('dotenv').config();

// const express = require('express');
// const path = require('path');

// const app = express();

// app.use(express.json());

// app.post('/api/explain', async (req, res) => {
//   try {
//     const { code } = req.body;

//     if (!code) {
//       return res.status(400).json({
//         error: 'Code is required'
//       });
//     }

//     const response = await fetch(
//       'https://api.groq.com/openai/v1/chat/completions',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
//         },
//         body: JSON.stringify({
//           model: 'llama-3.3-70b-versatile',
//           messages: [
//             {
//               role: 'system',
//               content: 'Explain code simply.'
//             },
//             {
//               role: 'user',
//               content: code
//             }
//           ]
//         })
//       }
//     );

//     const data = await response.json();

//     res.json({
//       text:
//         data?.choices?.[0]?.message?.content ||
//         'No explanation generated.'
//     });

//   } catch (err) {
//     res.status(500).json({
//       error: 'Server Error'
//     });
//   }
// });

// module.exports = app;

require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.post('/api/explain', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ error: 'Code is required' });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'GROQ_API_KEY is missing' });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful code explainer.'
          },
          {
            role: 'user',
            content: `Explain this code:\n\n${code}`
          }
        ]
      })
    });

    const data = await response.json();

    const text =
      data?.choices?.[0]?.message?.content ||
      'No explanation returned.';

    res.json({ text });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = app;