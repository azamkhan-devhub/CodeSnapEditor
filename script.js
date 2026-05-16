// var currentSnippetId = null;
// var timerInterval = null;
// var expirySeconds = 0;
// var expiryEnd = null;
// var isLightTheme = false;
// var viewSnippetId = null;
// var viewTimerInterval = null;

// function getSnippets() {
//   try { return JSON.parse(localStorage.getItem('codesnap-snippets')) || {}; } catch(e) { return {}; }
// }
// function saveSnippets(snippets) {
//   localStorage.setItem('codesnap-snippets', JSON.stringify(snippets));
// }
// function generateId() {
//   return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
// }

// var LANGEXT = { javascript:'js', python:'py', html:'html', css:'css', java:'java', csharp:'cs', cpp:'cpp', php:'php', typescript:'ts', sql:'sql', bash:'sh', json:'json', markdown:'md', plaintext:'txt' };
// var LANGPREVIEW = ['html', 'css', 'javascript'];

// function getLang() {
//   return document.getElementById('lang-select').value;
// }
// function updateLanguage() {
//   var lang = getLang();
//   var ext = LANGEXT[lang] || 'txt';
//   document.getElementById('editor-title-label').textContent = 'untitled.' + ext;
//   document.getElementById('stat-lang').textContent = lang;
//   var showPreview = LANGPREVIEW.indexOf(lang) !== -1;
//   document.getElementById('preview-panel').style.display = showPreview ? 'block' : 'none';
//   if (showPreview) refreshPreview();
// }
// function updateFontSize() {
//   var size = parseInt(document.getElementById('font-size').value || 14);
//   document.getElementById('code-input').style.fontSize = size + 'px';
// }
// function onCodeInput() {
//   updateStats();
//   var lang = getLang();
//   if (LANGPREVIEW.indexOf(lang) !== -1) refreshPreview();
// }
// function updateStats() {
//   var code = document.getElementById('code-input').value;
//   var lines = code ? code.split('\n').length : 0;
//   var chars = code.length;
//   var words = code.trim() ? code.trim().split(/\s+/).length : 0;
//   var bytes = new Blob([code]).size;
//   var sizeStr = bytes < 1024 ? bytes + ' B' : (bytes / 1024).toFixed(1) + ' KB';
//   document.getElementById('stat-lines').textContent = lines;
//   document.getElementById('stat-chars').textContent = chars.toLocaleString();
//   document.getElementById('stat-words').textContent = words.toLocaleString();
//   document.getElementById('stat-size').textContent = sizeStr;
// }
// function handleTabKey(e) {
//   if (e.key === 'Tab') {
//     e.preventDefault();
//     var ta = e.target;
//     var start = ta.selectionStart;
//     var end = ta.selectionEnd;
//     ta.value = ta.value.substring(0, start) + '\t' + ta.value.substring(end);
//     ta.selectionStart = ta.selectionEnd = start + 2;
//     onCodeInput();
//   }
// }

// function refreshPreview() {
//   var frame = document.getElementById('preview-frame');
//   var code = document.getElementById('code-input').value;
//   var lang = getLang();
//   var html = '';
//   if (lang === 'html') {
//     html = code;
//   } else if (lang === 'css') {
//     html = '<html><head><style>' + code + '</style></head><body><div style="padding:20px;font-family:sans-serif;"><h1>Preview</h1><p>Your CSS is applied above.</p><button>Button</button><a href="#">Link</a></div></body></html>';
//   } else if (lang === 'javascript') {
//     var sc1 = '<scr' + 'ipt>';
//     var sc2 = '</scr' + 'ipt>';
//     var jsBody = '';
//     var log = 'console.log', err = 'console.error', warn = 'console.warn';
//     var out = 'document.getElementById("output")';
//     function display(t, c) { var el = document.createElement('pre'); el.style.color = c; el.textContent = typeof t === 'object' ? JSON.stringify(t, null, 2) : String(t); out.appendChild(el); }
//     html = '<!DOCTYPE html><html><head><style>body{font-family:monospace;padding:16px;background:#1a1a2e;color:#e0e0e0;}pre{background:#0d0d1a;padding:12px;border-radius:6px;white-space:pre-wrap;}</style></head><body><div id="output"></div>' + sc1 + jsBody + sc2 + '</body></html>';
//   }
//   var blob = new Blob([html], { type:'text/html' });
//   frame.src = URL.createObjectURL(blob);
// }
// function openPreviewWindow() {
//   var code = document.getElementById('code-input').value;
//   var lang = getLang();
//   var sc1 = '<scr' + 'ipt>';
//   var sc2 = '</scr' + 'ipt>';
//   var html = lang === 'html' ? code : '<!DOCTYPE html><html><body>' + sc1 + code + sc2 + '</body></html>';
//   var win = window.open();
//   win.document.write(html);
// }

// function copyCode() {
//   var code = document.getElementById('code-input').value;
//   if (!code.trim()) { toast('Nothing to copy!', 'warning'); return; }
//   navigator.clipboard.writeText(code).then(function () {
//     var btn = document.getElementById('copy-btn');
//     btn.textContent = 'Copied!';
//     document.getElementById('editor-panel').classList.add('copy-flash');
//     toast('Code copied to clipboard!', 'success');
//     setTimeout(function () {
//       btn.textContent = 'Copy';
//       document.getElementById('editor-panel').classList.remove('copy-flash');
//     }, 2000);
//   }).catch(function () {
//     var ta = document.getElementById('code-input');
//     ta.select();
//     document.execCommand('copy');
//     toast('Code copied!', 'success');
//   });
// }

// function clearEditor() {
//   if (!document.getElementById('code-input').value.trim()) return;
//   if (confirm('Clear the editor? This cannot be undone.')) {
//     document.getElementById('code-input').value = '';
//     document.getElementById('snippet-title').value = '';
//     document.getElementById('snippet-desc').value = '';
//     document.getElementById('snippet-password').value = '';
//     document.getElementById('share-panel').classList.remove('visible');
//     currentSnippetId = null;
//     updateStats();
//     refreshPreview();
//     toast('Editor cleared', 'info');
//   }
// }

// function formatCode() {
//   var ta = document.getElementById('code-input');
//   var code = ta.value;
//   if (!code.trim()) { toast('Nothing to format!', 'warning'); return; }
//   var lines = code.split('\n');
//   var indent = 0;
//   var formatted = lines.map(function (line) {
//     var trimmed = line.trim();
//     if (!trimmed) return '';
//     if (/^\}/.test(trimmed)) indent = Math.max(0, indent - 1);
//     var result = '  '.repeat(indent) + trimmed;
//     if (/\{$/.test(trimmed) || /\{\s*$/.test(trimmed) || /\bdo$/.test(trimmed)) indent++;
//     return result;
//   }).join('\n');
//   ta.value = formatted;
//   updateStats();
//   toast('Code formatted', 'success');
// }

// function updateExpiry() {
//   var val = parseInt(document.getElementById('expiry-select').value);
//   expirySeconds = val;
//   clearInterval(timerInterval);
//   if (val === 0) {
//     document.getElementById('expiry-dot').style.display = 'none';
//     document.getElementById('timer-display').style.display = 'none';
//     expiryEnd = null;
//     return;
//   }
//   expiryEnd = Date.now() + val * 1000;
//   document.getElementById('expiry-dot').style.display = 'block';
//   document.getElementById('timer-display').style.display = 'block';
//   function tick() {
//     var remaining = Math.max(0, expiryEnd - Date.now());
//     var el = document.getElementById('timer-display');
//     if (remaining <= 0) {
//       el.textContent = 'EXPIRED';
//       el.classList.add('expired');
//       clearInterval(timerInterval);
//       toast('This snippet has expired!', 'warning');
//       return;
//     }
//     var h = Math.floor(remaining / 3600000);
//     var m = Math.floor((remaining % 3600000) / 60000);
//     var s = Math.floor((remaining % 60000) / 1000);
//     el.textContent = (h > 0 ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
//   }
//   tick();
//   timerInterval = setInterval(tick, 1000);
// }

// function saveSnippet() {
//   var code = document.getElementById('code-input').value.trim();
//   if (!code) { toast('Please paste some code first!', 'warning'); return; }
//   var title = document.getElementById('snippet-title').value.trim() || 'Untitled Snippet';
//   var desc = document.getElementById('snippet-desc').value.trim();
//   var pass = document.getElementById('snippet-password').value;
//   var lang = getLang();
//   var id = currentSnippetId || generateId();
//   var snippet = {
//     id: id,
//     title: title,
//     desc: desc,
//     lang: lang,
//     code: code,
//     password: pass || null,
//     createdAt: Date.now(),
//     expiryEnd: expiryEnd,
//     views: 0
//   };
//   var snippets = getSnippets();
//   snippets[id] = snippet;
//   saveSnippets(snippets);
//   currentSnippetId = id;
//   var shareUrl = location.href.split('#')[0] + '#snippet-' + id;
//   document.getElementById('share-link-input').value = shareUrl;
//   document.getElementById('share-panel').classList.add('visible');
//   document.getElementById('share-panel').scrollIntoView({ behavior:'smooth', block:'nearest' });
//   document.getElementById('qr-container').classList.remove('visible');
//   document.getElementById('qr-code').innerHTML = '';
//   renderHistoryList();
//   toast('Snippet saved! Link ready to share.', 'success');
//   history.pushState(null, '', '#snippet-' + id);
// }

// function copyShareLink() {
//   var val = document.getElementById('share-link-input').value;
//   navigator.clipboard.writeText(val).then(function () {
//     toast('Share link copied!', 'success');
//   }).catch(function () {
//     document.getElementById('share-link-input').select();
//     document.execCommand('copy');
//     toast('Link copied!', 'success');
//   });
// }

// // function toggleQR() {
// //   var container = document.getElementById('qr-container');
// //   var isVisible = container.classList.contains('visible');
// //   if (!isVisible) {
// //     var url = document.getElementById('share-link-input').value;
// //     document.getElementById('qr-code').innerHTML = '';
// //     new QRCode(document.getElementById('qr-code'), {
// //       text: url,
// //       width: 160,
// //       height: 160,
// //       colorDark: '0a0c10',
// //       colorLight: 'ffffff',
// //       correctLevel: QRCode.CorrectLevel.H
// //     });
// //     container.classList.add('visible');
// //     toast('QR code generated!', 'info');
// //   } else {
// //     container.classList.remove('visible');
// //   }
// // }

// // function toggleViewQR() {
// //   var container = document.getElementById('view-qr-container');
// //   var qrEl = document.getElementById('view-qr-code');
// //   if (container.style.display === 'none' || !container.style.display) {
// //     qrEl.innerHTML = '';
// //     new QRCode(qrEl, {
// //       text: location.href,
// //       width: 140,
// //       height: 140,
// //       colorDark: '0a0c10',
// //       colorLight: 'ffffff',
// //       correctLevel: QRCode.CorrectLevel.H
// //     });
// //     container.style.display = 'inline-block';
// //   } else {
// //     container.style.display = 'none';
// //     qrEl.innerHTML = '';
// //   }
// // }


// // ----------------------------------------------------------------
// // QR CODE
// // ----------------------------------------------------------------
// function toggleQR() {
//   var container = document.getElementById('qr-container');
//   var isVisible = container.classList.contains('visible');

//   if (!isVisible) {
//     var url = document.getElementById('share-link-input').value;
//     document.getElementById('qr-code').innerHTML = '';
//     new QRCode(document.getElementById('qr-code'), {
//       text: url,
//       width: 160, height: 160,
//       colorDark: '#0a0c10',
//       colorLight: '#ffffff',
//       correctLevel: QRCode.CorrectLevel.H
//     });
//     container.classList.add('visible');
//     toast('QR code generated! 📱', 'info');
//   } else {
//     container.classList.remove('visible');
//   }
// }

// function toggleViewQR() {
//   var container = document.getElementById('view-qr-container');
//   var qrEl = document.getElementById('view-qr-code');
//   if (container.style.display === 'none' || !container.style.display) {
//     qrEl.innerHTML = '';
//     new QRCode(qrEl, {
//       text: location.href,
//       width: 140, height: 140,
//       colorDark: '#0a0c10',
//       colorLight: '#ffffff',
//       correctLevel: QRCode.CorrectLevel.H
//     });
//     container.style.display = 'inline-block';
//   } else {
//     container.style.display = 'none';
//     qrEl.innerHTML = '';
//   }
// }
// function downloadCode() {
//   var code = document.getElementById('code-input').value;
//   var lang = getLang();
//   var title = document.getElementById('snippet-title').value.trim() || 'codesnap';
//   var ext = LANGEXT[lang] || 'txt';
//   var fileName = title.replace(/[^a-z0-9-]/gi, '_') + '.' + ext;
//   var blob = new Blob([code], { type:'text/plain' });
//   var a = document.createElement('a');
//   a.href = URL.createObjectURL(blob);
//   a.download = fileName;
//   a.click();
//   toast('Downloaded as ' + fileName, 'success');
// }

// function downloadViewCode() {
//   var snippets = getSnippets();
//   var s = snippets[viewSnippetId];
//   if (!s) return;
//   var ext = LANGEXT[s.lang] || 'txt';
//   var fileName = (s.title || 'codesnap').replace(/[^a-z0-9-]/gi, '_') + '.' + ext;
//   var blob = new Blob([s.code], { type:'text/plain' });
//   var a = document.createElement('a');
//   a.href = URL.createObjectURL(blob);
//   a.download = fileName;
//   a.click();
//   toast('Downloaded', 'success');
// }

// function shareNative() {
//   var url = document.getElementById('share-link-input').value;
//   var title = document.getElementById('snippet-title').value.trim() || 'CodeSnap Snippet';
//   if (navigator.share) {
//     navigator.share({ title:title, text:'Check out this code snippet!', url:url }).catch(function(){});
//   } else {
//     copyShareLink();
//   }
// }

// function deleteCurrentSnippet() {
//   if (!currentSnippetId) return;
//   if (!confirm('Delete this snippet permanently?')) return;
//   var snippets = getSnippets();
//   delete snippets[currentSnippetId];
//   saveSnippets(snippets);
//   currentSnippetId = null;
//   document.getElementById('share-panel').classList.remove('visible');
//   history.pushState(null, '', location.pathname);
//   renderHistoryList();
//   toast('Snippet deleted', 'info');
// }

// function togglePassVisibility() {
//   var input = document.getElementById('snippet-password');
//   var eye = document.getElementById('pass-eye');
//   if (input.type === 'password') {
//     input.type = 'text';
//     eye.textContent = '🙈';
//   } else {
//     input.type = 'password';
//     eye.textContent = '👁';
//   }
// }

// function toggleFullscreen() {
//   var panel = document.getElementById('editor-panel');
//   if (!document.fullscreenElement) {
//     if (panel.requestFullscreen) panel.requestFullscreen();
//   } else if (document.exitFullscreen) {
//     document.exitFullscreen();
//   }
// }

// function toggleTheme() {
//   isLightTheme = !isLightTheme;
//   document.body.classList.toggle('light-theme', isLightTheme);
//   document.getElementById('theme-toggle').textContent = isLightTheme ? '☀' : '☾';
//   localStorage.setItem('codesnap-theme', isLightTheme ? 'light' : 'dark');
//   toast(isLightTheme ? 'Light mode on' : 'Dark mode on', 'info');
// }

// // function explainCode() {
// //   var code = document.getElementById('code-input').value.trim();
// //   var outputEl = document.getElementById('ai-output');
// //   if (!code) { toast('Please add some code first!', 'warning'); return; }
// //   var btn = document.getElementById('explain-btn');
// //   if (btn) { btn.disabled = true; btn.textContent = 'Analyzing...'; }
// //   outputEl.innerHTML = '<div class="ai-typing"><span></span><span></span><span></span></div><span style="color:var(--text-muted);font-size:0.82rem;margin-left:8px;">Analyzing your code structure...</span>';
// //   setTimeout(function () {
// //     var result = analyzeCode(code, getLang());
// //     outputEl.innerHTML = result;
// //     if (btn) { btn.disabled = false; btn.textContent = 'Explain My Code'; }
// //     toast('Analysis complete!', 'success');
// //   }, 900);
// // }


// // async function explainCode() {
// //   var code = document.getElementById('code-input').value.trim();
// //   var outputEl = document.getElementById('ai-output');
// //   var btn = document.getElementById('explain-btn');

// //   if (!code) { toast('Please add some code first!', 'warning'); return; }

// //   btn.disabled = true;
// //   btn.textContent = 'Analyzing...';
// //   outputEl.innerHTML = '<div class="ai-typing"><span></span><span></span><span></span></div><span style="color:var(--text-muted);font-size:0.82rem;margin-left:8px;">Analyzing your code...</span>';

// //   try {
// //     const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         
// //       },
// //       body: JSON.stringify({
// //         model: 'llama-3.3-70b-versatile',
// //         messages: [
// //           {
// //             role: 'system',
// //             content: 'You are a helpful code explainer. Explain the code clearly in simple language.'
// //           },
// //           {
// //             role: 'user',
// //             content: `Explain this code:\n\n${code}`
// //           }
// //         ]
// //       })
// //     });

// //     const data = await response.json();
// //     const text = data?.choices?.[0]?.message?.content || 'No explanation returned.';
// //     outputEl.innerHTML = '<div style="white-space:pre-wrap;line-height:1.7;">' + text.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</div>';
// //   } catch (err) {
// //     outputEl.innerHTML = '<span style="color:var(--error);">Error calling Groq API.</span>';
// //   } finally {
// //     btn.disabled = false;
// //     btn.textContent = 'Explain My Code';
// //   }
// // }

// async function explainCode() {
//   var code = document.getElementById('code-input').value.trim();
//   var outputEl = document.getElementById('ai-output');
//   var btn = document.getElementById('explain-btn');

//   if (!code) { toast('Please add some code first!', 'warning'); return; }

//   btn.disabled = true;
//   btn.textContent = 'Analyzing...';
//   outputEl.innerHTML = '<div class="ai-typing"><span></span><span></span><span></span></div><span style="color:var(--text-muted);font-size:0.82rem;margin-left:8px;">Analyzing your code...</span>';

//   try {
//     const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         
//       },
//       body: JSON.stringify({
//         model: 'llama-3.3-70b-versatile',
//         messages: [
//           {
//             role: 'system',
//             content: 'You are a helpful code explainer. Explain the code clearly in simple language.'
//           },
//           {
//             role: 'user',
//             content: `Explain this code:\n\n${code}`
//           }
//         ]
//       })
//     });

//     const data = await response.json();
//     const text = data?.choices?.[0]?.message?.content || 'No explanation returned.';
//     outputEl.innerHTML = '<div style="white-space:pre-wrap;line-height:1.7;">' + text.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</div>';
//   } catch (err) {
//     outputEl.innerHTML = '<span style="color:var(--error);">Error calling Groq API.</span>';
//   } finally {
//     btn.disabled = false;
//     btn.textContent = 'Explain My Code';
//   }
// }

// function analyzeCode(code, lang) {
//   var lines = code.split('\n');
//   var totalLines = lines.length;
//   var points = [];
//   var purposeMap = [
//     { pattern: /fetch|XMLHttpRequest|axios/i, emoji:'🌐', text:'Makes HTTP/API requests to fetch data from the internet.' },
//     { pattern: /addEventListener|onclick|onchange/i, emoji:'🖱️', text:'Handles user interaction events like clicks or input changes.' },
//     { pattern: /class/, emoji:'🏗️', text:'Defines a class or uses Object-Oriented Programming (OOP) structure.' },
//     { pattern: /function/, emoji:'🔧', text:'Contains functions that group reusable blocks of logic.' },
//     { pattern: /for|while|\.forEach|\.map/i, emoji:'🔁', text:'Uses loops to repeat operations over data or collections.' },
//     { pattern: /if|else|switch/i, emoji:'🔀', text:'Contains conditional logic that makes decisions based on values.' },
//     { pattern: /localStorage|sessionStorage|cookie/i, emoji:'💾', text:'Reads or writes data to browser storage.' },
//     { pattern: /document\.querySelector|getElementById/i, emoji:'🎯', text:'Manipulates the DOM and interacts with HTML elements on the page.' },
//     { pattern: /import|require/i, emoji:'📦', text:'Imports external modules or libraries.' },
//     { pattern: /async|await|Promise|\.then/i, emoji:'⏳', text:'Uses asynchronous code to handle operations that take time.' },
//     { pattern: /try|catch/i, emoji:'🛡️', text:'Includes error handling to prevent crashes.' },
//     { pattern: /SELECT|INSERT|UPDATE|DELETE|FROM/i, emoji:'🗄️', text:'Contains SQL database query commands.' },
//     { pattern: /def|print/i, emoji:'🐍', text:'Python code defines functions or uses Python syntax.' },
//     { pattern: /html|div|body|head/i, emoji:'🌐', text:'HTML structure defines layout and content of a webpage.' },
//     { pattern: /color|margin|padding|display/i, emoji:'🎨', text:'CSS styling controls the visual appearance of elements.' },
//     { pattern: /return/, emoji:'↩️', text:'Functions return values and pass results back.' },
//     { pattern: /console\.log|error|warn/i, emoji:'🐞', text:'Contains debugging statements used to inspect values.' },
//     { pattern: /Math|parseInt|parseFloat/i, emoji:'🔢', text:'Performs mathematical or numeric calculations.' },
//     { pattern: /\.sort|\.filter|\.reduce/i, emoji:'🧮', text:'Uses array methods to sort, filter, or transform data.' },
//     { pattern: /new/, emoji:'✨', text:'Creates new object instances using constructors.' }
//   ];
//   purposeMap.forEach(function (item) {
//     if (item.pattern.test(code)) points.push(item.emoji + ' ' + item.text);
//   });

//   var fnCount = (code.match(/function/g) || []).length;
//   var loopCount = (code.match(/for|while|\.forEach|\.map/g) || []).length;
//   var condCount = (code.match(/if|else|switch/g) || []).length;
//   var commentCount = (code.match(/\/\//g) || []).length;
//   var complexity = fnCount + loopCount * 2 + condCount;

//   var complexityLabel, complexityColor;
//   if (complexity <= 3) {
//     complexityLabel = 'Beginner-friendly';
//     complexityColor = '#00d4aa';
//   } else if (complexity <= 8) {
//     complexityLabel = 'Intermediate';
//     complexityColor = '#d29922';
//   } else {
//     complexityLabel = 'Advanced';
//     complexityColor = '#f85149';
//   }

//   var langTipsMap = {
//     javascript: code.indexOf('=>') !== -1 ? 'Uses modern ES6 arrow functions for cleaner, shorter syntax.' : '',
//     python: code.indexOf('self') !== -1 ? 'Uses `self` as a Python class method pattern.' : '',
//     html: code.indexOf('id') !== -1 ? 'Uses `id` attributes, good for targeting elements with JS.' : '',
//     css: code.indexOf(':root') !== -1 ? 'Uses CSS variables via `:root`, great for theming.' : '',
//     sql: code.toUpperCase().indexOf('JOIN') !== -1 ? 'Uses SQL JOIN, which combines rows from multiple tables.' : '',
//     java: code.indexOf('public static void main') !== -1 ? 'Contains the main entry point of a Java program.' : ''
//   };
//   var langTip = langTipsMap[lang] || '';

//   var issues = [];
//   if (lang === 'javascript' || lang === 'typescript') {
//     if (code.indexOf('var ') !== -1) issues.push('Uses `var`; consider `let` or `const` instead.');
//     if (code.indexOf('eval(') !== -1) issues.push('Uses `eval`; this is a security risk and should be avoided.');
//     if (code.indexOf('document.write') !== -1) issues.push('`document.write` is outdated; prefer `innerHTML` or DOM methods.');
//     if (code.indexOf('try') !== -1 && code.indexOf('fetch') !== -1) issues.push('Your fetch call has no try/catch; consider adding error handling.');
//   }
//   if (lang === 'html') {
//     if (code.toLowerCase().indexOf('alt=') === -1) issues.push('Images may be missing `alt` attributes, which is important for accessibility.');
//     if (code.toLowerCase().indexOf('<!doctype') === -1) issues.push('No DOCTYPE declaration detected; add `<!DOCTYPE html>` at the top.');
//   }

//   var html = '<div style="color:var(--text-primary);line-height:1.8;">';
//   html += '<div style="font-size:0.8rem;font-weight:700;color:var(--neon-purple);margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">CodeSnap AI Code Analysis</div>';
//   html += '<div style="display:flex;flex-wrap:wrap;gap:10px;margin:12px 0;padding:12px;background:rgba(0,0,0,0.2);border-radius:8px;border:1px solid var(--border);">';
//   html += '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">Lines: <strong>' + totalLines + '</strong></span>';
//   html += '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">Functions: <strong>' + fnCount + '</strong></span>';
//   html += '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">Loops: <strong>' + loopCount + '</strong></span>';
//   html += '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">Conditions: <strong>' + condCount + '</strong></span>';
//   html += '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">Comments: <strong>' + commentCount + '</strong></span>';
//   html += '<span style="font-family:var(--font-mono);font-size:0.75rem;margin-left:auto;">Complexity: <strong style="color:' + complexityColor + ';">' + complexityLabel + '</strong></span>';
//   html += '</div>';
//   if (points.length > 0) {
//     html += '<div style="font-size:0.82rem;font-weight:600;color:var(--neon-green);margin:10px 0 6px;">What This Code Does</div>';
//     html += '<div style="display:flex;flex-direction:column;gap:4px;">';
//     points.slice(0, 6).forEach(function (p) {
//       html += '<div style="font-size:0.82rem;color:var(--text-secondary);padding:4px 0;">' + p + '</div>';
//     });
//     html += '</div>';
//   }
//   if (langTip) {
//     html += '<div style="margin-top:12px;padding:10px 14px;background:rgba(88,166,255,0.08);border-left:3px solid var(--neon-blue);border-radius:0 6px 6px 0;font-size:0.8rem;color:var(--text-secondary);">' + langTip + '</div>';
//   }
//   if (issues.length > 0) {
//     html += '<div style="font-size:0.82rem;font-weight:600;color:var(--neon-orange);margin:12px 0 6px;">Suggestions</div>';
//     issues.forEach(function (issue) {
//       html += '<div style="font-size:0.8rem;color:var(--text-secondary);padding:3px 0;">' + issue + '</div>';
//     });
//   }
//   if (points.length === 0 && issues.length === 0) {
//     html += '<div style="font-size:0.82rem;color:var(--text-muted);">Plain text or unrecognized pattern. Try selecting the correct language from the toolbar.</div>';
//   }
//   html += '<div style="margin-top:12px;font-size:0.72rem;color:var(--text-muted);font-family:var(--font-mono);">Analysis powered by CodeSnap\'s built-in engine. Works offline.</div>';
//   html += '</div>';
//   return html;
// }

// function explainViewCode() {
//   var snippets = getSnippets();
//   var s = snippets[viewSnippetId];
//   if (!s) return;
//   var outputEl = document.getElementById('view-ai-output');
//   outputEl.innerHTML = '<div class="ai-typing"><span></span><span></span><span></span></div><span style="color:var(--text-muted);font-size:0.82rem;margin-left:8px;">Analyzing...</span>';
//   setTimeout(function () {
//     outputEl.innerHTML = analyzeCode(s.code, s.lang);
//     toast('Analysis complete!', 'success');
//   }, 900);
// }

// function copyViewCode() {
//   var snippets = getSnippets();
//   var s = snippets[viewSnippetId];
//   if (!s) return;
//   navigator.clipboard.writeText(s.code).then(function () { toast('Code copied!', 'success'); });
// }

// function loadSnippetInEditor() {
//   var snippets = getSnippets();
//   var s = snippets[viewSnippetId];
//   if (!s) return;
//   showEditorPage();
//   document.getElementById('code-input').value = s.code;
//   document.getElementById('snippet-title').value = s.title;
//   document.getElementById('snippet-desc').value = s.desc;
//   document.getElementById('lang-select').value = s.lang;
//   currentSnippetId = s.id;
//   updateLanguage();
//   updateStats();
//   toast('Snippet loaded in editor', 'info');
// }

// function toggleHistory() {
//   var drawer = document.getElementById('history-drawer');
//   var overlay = document.getElementById('drawer-overlay');
//   var isOpen = drawer.classList.contains('open');
//   drawer.classList.toggle('open', !isOpen);
//   overlay.classList.toggle('active', !isOpen);
//   if (!isOpen) renderHistoryList();
// }

// function renderHistoryList() {
//   var snippets = getSnippets();
//   var listEl = document.getElementById('history-list');
//   var keys = Object.keys(snippets).reverse();
//   if (keys.length === 0) {
//     listEl.innerHTML = '<div class="empty-history"><span>🕘</span>No snippets saved yet.<br>Create your first one!</div>';
//     return;
//   }
//   listEl.innerHTML = keys.map(function (id) {
//     var s = snippets[id];
//     var time = timeAgo(s.createdAt);
//     var locked = s.password ? ' 🔒' : '';
//     var preview = s.code.substring(0, 40).replace(/\n/g, ' ');
//     if (s.code.length > 40) preview += '...';
//     return '<div class="history-item" onclick="openSnippetFromHistory(\'' + id + '\')">' +
//       '<button class="history-delete" onclick="event.stopPropagation();deleteHistoryItem(\'' + id + '\')">×</button>' +
//       '<div class="history-item-title">' + locked + escapeHtml(s.title) + '</div>' +
//       '<div style="font-size:0.73rem;color:var(--text-muted);margin-bottom:6px;font-family:var(--font-mono);">' + escapeHtml(preview) + '</div>' +
//       '<div class="history-item-meta"><span class="history-lang-badge">' + s.lang + '</span><span>' + time + '</span></div>' +
//       '</div>';
//   }).join('');
// }

// function openSnippetFromHistory(id) {
//   toggleHistory();
//   history.pushState(null, '', '#snippet-' + id);
//   loadSnippetView(id);
// }

// function deleteHistoryItem(id) {
//   if (!confirm('Delete this snippet?')) return;
//   var snippets = getSnippets();
//   delete snippets[id];
//   saveSnippets(snippets);
//   renderHistoryList();
//   if (currentSnippetId === id) currentSnippetId = null;
//   toast('Snippet deleted', 'info');
// }

// function loadSnippetView(id) {
//   var snippets = getSnippets();
//   var s = snippets[id];
//   if (!s) { toast('Snippet not found or expired', 'error'); showEditorPage(); return; }
//   if (s.expiryEnd && Date.now() > s.expiryEnd) {
//     delete snippets[id];
//     saveSnippets(snippets);
//     toast('This snippet has expired and been deleted', 'warning');
//     showEditorPage();
//     return;
//   }
//   if (s.password) {
//     showPasswordOverlay(id, s);
//     return;
//   }
//   renderViewPage(s);
// }

// var pendingPasswordSnippet = null;
// function showPasswordOverlay(id, snippet) {
//   pendingPasswordSnippet = { id:id, snippet:snippet };
//   document.getElementById('pass-overlay').classList.add('active');
//   document.getElementById('pass-input').value = '';
//   document.getElementById('pass-error').textContent = '';
//   setTimeout(function () {
//     document.getElementById('pass-input').focus();
//   }, 100);
// }

// function unlockSnippet() {
//   var input = document.getElementById('pass-input').value;
//   var id = pendingPasswordSnippet.id;
//   var snippet = pendingPasswordSnippet.snippet;
//   if (input === snippet.password) {
//     document.getElementById('pass-overlay').classList.remove('active');
//     pendingPasswordSnippet = null;
//     renderViewPage(snippet);
//   } else {
//     document.getElementById('pass-error').textContent = 'Incorrect password. Try again.';
//     document.getElementById('pass-input').value = '';
//     document.getElementById('pass-input').focus();
//   }
// }

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Enter' && document.getElementById('pass-overlay').classList.contains('active')) unlockSnippet();
//   if (e.key === 'Escape' && document.getElementById('pass-overlay').classList.contains('active')) {
//     document.getElementById('pass-overlay').classList.remove('active');
//     pendingPasswordSnippet = null;
//     showEditorPage();
//   }
// });

// function renderViewPage(s) {
//   viewSnippetId = s.id;
//   document.getElementById('editor-page').style.display = 'none';
//   document.getElementById('view-page').style.display = 'block';
//   document.getElementById('view-title').textContent = s.title || 'Untitled Snippet';
//   document.getElementById('view-meta-info').textContent = s.lang + ' • ' + s.code.split('\n').length + ' lines • ' + timeAgo(s.createdAt) + (s.password ? ' • Protected' : '');

//   var codeEl = document.getElementById('view-code-block');
//   if (codeEl) {
//     codeEl.className = 'language-' + s.lang;
//     codeEl.textContent = s.code;
//     if (typeof Prism !== 'undefined') Prism.highlightElement(codeEl);
//   }

//   clearInterval(viewTimerInterval);
//   if (s.expiryEnd) {
//     document.getElementById('view-timer-bar').style.display = 'block';
//     function viewTick() {
//       var remaining = Math.max(0, s.expiryEnd - Date.now());
//       if (remaining <= 0) {
//         clearInterval(viewTimerInterval);
//         document.getElementById('view-timer-count').textContent = 'EXPIRED';
//         toast('Snippet expired!', 'warning');
//         return;
//       }
//       var m = Math.floor(remaining / 60000);
//       var sec = Math.floor((remaining % 60000) / 1000);
//       document.getElementById('view-timer-count').textContent = m + ':' + String(sec).padStart(2, '0');
//     }
//     viewTick();
//     viewTimerInterval = setInterval(viewTick, 1000);
//   } else {
//     document.getElementById('view-timer-bar').style.display = 'none';
//   }

//   document.getElementById('view-qr-container').style.display = 'none';
//   document.getElementById('view-qr-code').innerHTML = '';

//   var snippets = getSnippets();
//   if (snippets[s.id]) {
//     snippets[s.id].views = (snippets[s.id].views || 0) + 1;
//     saveSnippets(snippets);
//   }

//   document.getElementById('view-ai-output').innerHTML = 'Click Explain to understand this code instantly.';
// }

// function showEditorPage() {
//   document.getElementById('view-page').style.display = 'none';
//   document.getElementById('editor-page').style.display = 'flex';
//   viewSnippetId = null;
//   clearInterval(viewTimerInterval);
//   if (location.hash.indexOf('snippet-') === -1) history.pushState(null, '', location.pathname);
// }

// function checkHashAndRoute() {
//   var hash = location.hash;
//   var match = hash.match(/snippet-(.+)/);
//   if (match) {
//     var id = match[1];
//     loadSnippetView(id);
//   } else {
//     showEditorPage();
//   }
// }

// window.addEventListener('hashchange', checkHashAndRoute);
// window.addEventListener('load', function () {
//   checkHashAndRoute();
//   renderHistoryList();
//   var savedTheme = localStorage.getItem('codesnap-theme');
//   if (savedTheme === 'light') {
//     isLightTheme = true;
//     document.body.classList.add('light-theme');
//     document.getElementById('theme-toggle').textContent = '☀';
//   }
//   updateStats();
//   updateLanguage();
// });

// function toast(message, type) {
//   type = type || 'info';
//   var icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
//   var container = document.getElementById('toast-container');
//   var el = document.createElement('div');
//   el.className = 'toast ' + type;
//   el.innerHTML = '<span class="toast-icon">' + icons[type] + '</span><span>' + message + '</span>';
//   container.appendChild(el);
//   setTimeout(function () {
//     el.classList.add('out');
//     setTimeout(function () { el.remove(); }, 350);
//   }, 3000);
// }

// function timeAgo(timestamp) {
//   var diff = Date.now() - timestamp;
//   if (diff < 60000) return 'just now';
//   if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
//   if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
//   return Math.floor(diff / 86400000) + 'd ago';
// }

// function escapeHtml(str) {
//   return String(str)
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;');
// }



var currentSnippetId = null;
var timerInterval = null;
var expirySeconds = 0;
var expiryEnd = null;
var isLightTheme = false;
var viewSnippetId = null;
var viewTimerInterval = null;

function getSnippets() {
  try { return JSON.parse(localStorage.getItem('codesnap-snippets')) || {}; } catch(e) { return {}; }
}
function saveSnippets(snippets) {
  localStorage.setItem('codesnap-snippets', JSON.stringify(snippets));
}
function generateId() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

var LANGEXT = { javascript:'js', python:'py', html:'html', css:'css', java:'java', csharp:'cs', cpp:'cpp', php:'php', typescript:'ts', sql:'sql', bash:'sh', json:'json', markdown:'md', plaintext:'txt' };
var LANGPREVIEW = ['html', 'css', 'javascript'];

function getLang() {
  return document.getElementById('lang-select').value;
}
function updateLanguage() {
  var lang = getLang();
  var ext = LANGEXT[lang] || 'txt';
  document.getElementById('editor-title-label').textContent = 'untitled.' + ext;
  document.getElementById('stat-lang').textContent = lang;
  var showPreview = LANGPREVIEW.indexOf(lang) !== -1;
  document.getElementById('preview-panel').style.display = showPreview ? 'block' : 'none';
  if (showPreview) refreshPreview();
}
function updateFontSize() {
  var size = parseInt(document.getElementById('font-size').value || 14);
  document.getElementById('code-input').style.fontSize = size + 'px';
}
function onCodeInput() {
  updateStats();
  var lang = getLang();
  if (LANGPREVIEW.indexOf(lang) !== -1) refreshPreview();
}
function updateStats() {
  var code = document.getElementById('code-input').value;
  var lines = code ? code.split('\n').length : 0;
  var chars = code.length;
  var words = code.trim() ? code.trim().split(/\s+/).length : 0;
  var bytes = new Blob([code]).size;
  var sizeStr = bytes < 1024 ? bytes + ' B' : (bytes / 1024).toFixed(1) + ' KB';
  document.getElementById('stat-lines').textContent = lines;
  document.getElementById('stat-chars').textContent = chars.toLocaleString();
  document.getElementById('stat-words').textContent = words.toLocaleString();
  document.getElementById('stat-size').textContent = sizeStr;
}
function handleTabKey(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    var ta = e.target;
    var start = ta.selectionStart;
    var end = ta.selectionEnd;
    ta.value = ta.value.substring(0, start) + '\t' + ta.value.substring(end);
    ta.selectionStart = ta.selectionEnd = start + 2;
    onCodeInput();
  }
}

function refreshPreview() {
  var frame = document.getElementById('preview-frame');
  var code = document.getElementById('code-input').value;
  var lang = getLang();
  var html = '';
  if (lang === 'html') {
    html = code;
  } else if (lang === 'css') {
    html = '<html><head><style>' + code + '</style></head><body><div style="padding:20px;font-family:sans-serif;"><h1>Preview</h1><p>Your CSS is applied above.</p><button>Button</button><a href="#">Link</a></div></body></html>';
  } else if (lang === 'javascript') {
    var sc1 = '<scr' + 'ipt>';
    var sc2 = '</scr' + 'ipt>';
    var jsBody = '';
    html = '<!DOCTYPE html><html><head><style>body{font-family:monospace;padding:16px;background:#1a1a2e;color:#e0e0e0;}pre{background:#0d0d1a;padding:12px;border-radius:6px;white-space:pre-wrap;}</style></head><body><div id="output"></div>' + sc1 + jsBody + sc2 + '</body></html>';
  }
  var blob = new Blob([html], { type:'text/html' });
  frame.src = URL.createObjectURL(blob);
}
function openPreviewWindow() {
  var code = document.getElementById('code-input').value;
  var lang = getLang();
  var sc1 = '<scr' + 'ipt>';
  var sc2 = '</scr' + 'ipt>';
  var html = lang === 'html' ? code : '<!DOCTYPE html><html><body>' + sc1 + code + sc2 + '</body></html>';
  var win = window.open();
  win.document.write(html);
}

function copyCode() {
  var code = document.getElementById('code-input').value;
  if (!code.trim()) { toast('Nothing to copy!', 'warning'); return; }
  navigator.clipboard.writeText(code).then(function () {
    var btn = document.getElementById('copy-btn');
    btn.textContent = 'Copied!';
    document.getElementById('editor-panel').classList.add('copy-flash');
    toast('Code copied to clipboard!', 'success');
    setTimeout(function () {
      btn.textContent = 'Copy';
      document.getElementById('editor-panel').classList.remove('copy-flash');
    }, 2000);
  }).catch(function () {
    var ta = document.getElementById('code-input');
    ta.select();
    document.execCommand('copy');
    toast('Code copied!', 'success');
  });
}

function clearEditor() {
  if (!document.getElementById('code-input').value.trim()) return;
  if (confirm('Clear the editor? This cannot be undone.')) {
    document.getElementById('code-input').value = '';
    document.getElementById('snippet-title').value = '';
    document.getElementById('snippet-desc').value = '';
    document.getElementById('snippet-password').value = '';
    document.getElementById('share-panel').classList.remove('visible');
    currentSnippetId = null;
    updateStats();
    refreshPreview();
    toast('Editor cleared', 'info');
  }
}

function formatCode() {
  var ta = document.getElementById('code-input');
  var code = ta.value;
  if (!code.trim()) { toast('Nothing to format!', 'warning'); return; }
  var lines = code.split('\n');
  var indent = 0;
  var formatted = lines.map(function (line) {
    var trimmed = line.trim();
    if (!trimmed) return '';
    if (/^\}/.test(trimmed)) indent = Math.max(0, indent - 1);
    var result = '  '.repeat(indent) + trimmed;
    if (/\{$/.test(trimmed) || /\{\s*$/.test(trimmed) || /\bdo$/.test(trimmed)) indent++;
    return result;
  }).join('\n');
  ta.value = formatted;
  updateStats();
  toast('Code formatted', 'success');
}

function updateExpiry() {
  var val = parseInt(document.getElementById('expiry-select').value);
  expirySeconds = val;
  clearInterval(timerInterval);
  if (val === 0) {
    document.getElementById('expiry-dot').style.display = 'none';
    document.getElementById('timer-display').style.display = 'none';
    expiryEnd = null;
    return;
  }
  expiryEnd = Date.now() + val * 1000;
  document.getElementById('expiry-dot').style.display = 'block';
  document.getElementById('timer-display').style.display = 'block';
  function tick() {
    var remaining = Math.max(0, expiryEnd - Date.now());
    var el = document.getElementById('timer-display');
    if (remaining <= 0) {
      el.textContent = 'EXPIRED';
      el.classList.add('expired');
      clearInterval(timerInterval);
      toast('This snippet has expired!', 'warning');
      return;
    }
    var h = Math.floor(remaining / 3600000);
    var m = Math.floor((remaining % 3600000) / 60000);
    var s = Math.floor((remaining % 60000) / 1000);
    el.textContent = (h > 0 ? h + ':' : '') + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }
  tick();
  timerInterval = setInterval(tick, 1000);
}

function saveSnippet() {
  var code = document.getElementById('code-input').value.trim();
  if (!code) { toast('Please paste some code first!', 'warning'); return; }
  var title = document.getElementById('snippet-title').value.trim() || 'Untitled Snippet';
  var desc = document.getElementById('snippet-desc').value.trim();
  var pass = document.getElementById('snippet-password').value;
  var lang = getLang();
  var id = currentSnippetId || generateId();
  var snippet = {
    id: id,
    title: title,
    desc: desc,
    lang: lang,
    code: code,
    password: pass || null,
    createdAt: Date.now(),
    expiryEnd: expiryEnd,
    views: 0
  };
  var snippets = getSnippets();
  snippets[id] = snippet;
  saveSnippets(snippets);
  currentSnippetId = id;
  var shareUrl = location.href.split('#')[0] + '#snippet-' + id;
  document.getElementById('share-link-input').value = shareUrl;
  document.getElementById('share-panel').classList.add('visible');
  document.getElementById('share-panel').scrollIntoView({ behavior:'smooth', block:'nearest' });
  document.getElementById('qr-container').classList.remove('visible');
  document.getElementById('qr-code').innerHTML = '';
  renderHistoryList();
  toast('Snippet saved! Link ready to share.', 'success');
  history.pushState(null, '', '#snippet-' + id);
}

function copyShareLink() {
  var val = document.getElementById('share-link-input').value;
  navigator.clipboard.writeText(val).then(function () {
    toast('Share link copied!', 'success');
  }).catch(function () {
    document.getElementById('share-link-input').select();
    document.execCommand('copy');
    toast('Link copied!', 'success');
  });
}

function toggleQR() {
  var container = document.getElementById('qr-container');
  var isVisible = container.classList.contains('visible');
  if (!isVisible) {
    var url = document.getElementById('share-link-input').value;
    document.getElementById('qr-code').innerHTML = '';
    new QRCode(document.getElementById('qr-code'), {
      text: url,
      width: 160, height: 160,
      colorDark: '#0a0c10',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
    container.classList.add('visible');
    toast('QR code generated! 📱', 'info');
  } else {
    container.classList.remove('visible');
  }
}

function toggleViewQR() {
  var container = document.getElementById('view-qr-container');
  var qrEl = document.getElementById('view-qr-code');
  if (container.style.display === 'none' || !container.style.display) {
    qrEl.innerHTML = '';
    new QRCode(qrEl, {
      text: location.href,
      width: 140, height: 140,
      colorDark: '#0a0c10',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
    container.style.display = 'inline-block';
  } else {
    container.style.display = 'none';
    qrEl.innerHTML = '';
  }
}
function downloadCode() {
  var code = document.getElementById('code-input').value;
  var lang = getLang();
  var title = document.getElementById('snippet-title').value.trim() || 'codesnap';
  var ext = LANGEXT[lang] || 'txt';
  var fileName = title.replace(/[^a-z0-9-]/gi, '_') + '.' + ext;
  var blob = new Blob([code], { type:'text/plain' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
  toast('Downloaded as ' + fileName, 'success');
}

function downloadViewCode() {
  var snippets = getSnippets();
  var s = snippets[viewSnippetId];
  if (!s) return;
  var ext = LANGEXT[s.lang] || 'txt';
  var fileName = (s.title || 'codesnap').replace(/[^a-z0-9-]/gi, '_') + '.' + ext;
  var blob = new Blob([s.code], { type:'text/plain' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
  toast('Downloaded', 'success');
}

function shareNative() {
  var url = document.getElementById('share-link-input').value;
  var title = document.getElementById('snippet-title').value.trim() || 'CodeSnap Snippet';
  if (navigator.share) {
    navigator.share({ title:title, text:'Check out this code snippet!', url:url }).catch(function(){});
  } else {
    copyShareLink();
  }
}

function deleteCurrentSnippet() {
  if (!currentSnippetId) return;
  if (!confirm('Delete this snippet permanently?')) return;
  var snippets = getSnippets();
  delete snippets[currentSnippetId];
  saveSnippets(snippets);
  currentSnippetId = null;
  document.getElementById('share-panel').classList.remove('visible');
  history.pushState(null, '', location.pathname);
  renderHistoryList();
  toast('Snippet deleted', 'info');
}

function togglePassVisibility() {
  var input = document.getElementById('snippet-password');
  var eye = document.getElementById('pass-eye');
  if (input.type === 'password') {
    input.type = 'text';
    eye.textContent = '🙈';
  } else {
    input.type = 'password';
    eye.textContent = '👁';
  }
}

function toggleFullscreen() {
  var panel = document.getElementById('editor-panel');
  if (!document.fullscreenElement) {
    if (panel.requestFullscreen) panel.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

function toggleTheme() {
  isLightTheme = !isLightTheme;
  document.body.classList.toggle('light-theme', isLightTheme);
  document.getElementById('theme-toggle').textContent = isLightTheme ? '☀' : '☾';
  localStorage.setItem('codesnap-theme', isLightTheme ? 'light' : 'dark');
  toast(isLightTheme ? 'Light mode on' : 'Dark mode on', 'info');
}

async function explainCode() {
  var code = document.getElementById('code-input').value.trim();
  var outputEl = document.getElementById('ai-output');
  var btn = document.getElementById('explain-btn');

  if (!code) { toast('Please add some code first!', 'warning'); return; }

  btn.disabled = true;
  btn.textContent = 'Analyzing...';
  outputEl.innerHTML = '<div class="ai-typing"><span></span><span></span><span></span></div><span style="color:var(--text-muted);font-size:0.82rem;margin-left:8px;">Analyzing your code...</span>';

  try {
    const response = await fetch('/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');

    outputEl.innerHTML = '<div style="white-space:pre-wrap;line-height:1.7;">' +
      data.text.replace(/</g, '&lt;').replace(/>/g, '&gt;') +
      '</div>';
  } catch (err) {
    outputEl.innerHTML = '<span style="color:var(--error);">Error calling Groq API.</span>';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Explain My Code';
  }
}

function analyzeCode(code, lang) {
  var lines = code.split('\n');
  var totalLines = lines.length;
  var points = [];
  var purposeMap = [
    { pattern: /fetch|XMLHttpRequest|axios/i, emoji:'🌐', text:'Makes HTTP/API requests to fetch data from the internet.' },
    { pattern: /addEventListener|onclick|onchange/i, emoji:'🖱️', text:'Handles user interaction events like clicks or input changes.' },
    { pattern: /class/, emoji:'🏗️', text:'Defines a class or uses Object-Oriented Programming (OOP) structure.' },
    { pattern: /function/, emoji:'🔧', text:'Contains functions that group reusable blocks of logic.' },
    { pattern: /for|while|\.forEach|\.map/i, emoji:'🔁', text:'Uses loops to repeat operations over data or collections.' },
    { pattern: /if|else|switch/i, emoji:'🔀', text:'Contains conditional logic that makes decisions based on values.' },
    { pattern: /localStorage|sessionStorage|cookie/i, emoji:'💾', text:'Reads or writes data to browser storage.' },
    { pattern: /document\.querySelector|getElementById/i, emoji:'🎯', text:'Manipulates the DOM and interacts with HTML elements on the page.' },
    { pattern: /import|require/i, emoji:'📦', text:'Imports external modules or libraries.' },
    { pattern: /async|await|Promise|\.then/i, emoji:'⏳', text:'Uses asynchronous code to handle operations that take time.' },
    { pattern: /try|catch/i, emoji:'🛡️', text:'Includes error handling to prevent crashes.' },
    { pattern: /SELECT|INSERT|UPDATE|DELETE|FROM/i, emoji:'🗄️', text:'Contains SQL database query commands.' },
    { pattern: /def|print/i, emoji:'🐍', text:'Python code defines functions or uses Python syntax.' },
    { pattern: /html|div|body|head/i, emoji:'🌐', text:'HTML structure defines layout and content of a webpage.' },
    { pattern: /color|margin|padding|display/i, emoji:'🎨', text:'CSS styling controls the visual appearance of elements.' },
    { pattern: /return/, emoji:'↩️', text:'Functions return values and pass results back.' },
    { pattern: /console\.log|error|warn/i, emoji:'🐞', text:'Contains debugging statements used to inspect values.' },
    { pattern: /Math|parseInt|parseFloat/i, emoji:'🔢', text:'Performs mathematical or numeric calculations.' },
    { pattern: /\.sort|\.filter|\.reduce/i, emoji:'🧮', text:'Uses array methods to sort, filter, or transform data.' },
    { pattern: /new/, emoji:'✨', text:'Creates new object instances using constructors.' }
  ];
  purposeMap.forEach(function (item) {
    if (item.pattern.test(code)) points.push(item.emoji + ' ' + item.text);
  });

  var fnCount = (code.match(/function/g) || []).length;
  var loopCount = (code.match(/for|while|\.forEach|\.map/g) || []).length;
  var condCount = (code.match(/if|else|switch/g) || []).length;
  var commentCount = (code.match(/\/\//g) || []).length;
  var complexity = fnCount + loopCount * 2 + condCount;

  var complexityLabel, complexityColor;
  if (complexity <= 3) {
    complexityLabel = 'Beginner-friendly';
    complexityColor = '#00d4aa';
  } else if (complexity <= 8) {
    complexityLabel = 'Intermediate';
    complexityColor = '#d29922';
  } else {
    complexityLabel = 'Advanced';
    complexityColor = '#f85149';
  }

  var langTipsMap = {
    javascript: code.indexOf('=>') !== -1 ? 'Uses modern ES6 arrow functions for cleaner, shorter syntax.' : '',
    python: code.indexOf('self') !== -1 ? 'Uses `self` as a Python class method pattern.' : '',
    html: code.indexOf('id') !== -1 ? 'Uses `id` attributes, good for targeting elements with JS.' : '',
    css: code.indexOf(':root') !== -1 ? 'Uses CSS variables via `:root`, great for theming.' : '',
    sql: code.toUpperCase().indexOf('JOIN') !== -1 ? 'Uses SQL JOIN, which combines rows from multiple tables.' : '',
    java: code.indexOf('public static void main') !== -1 ? 'Contains the main entry point of a Java program.' : ''
  };
  var langTip = langTipsMap[lang] || '';

  var issues = [];
  if (lang === 'javascript' || lang === 'typescript') {
    if (code.indexOf('var ') !== -1) issues.push('Uses `var`; consider `let` or `const` instead.');
    if (code.indexOf('eval(') !== -1) issues.push('Uses `eval`; this is a security risk and should be avoided.');
    if (code.indexOf('document.write') !== -1) issues.push('`document.write` is outdated; prefer `innerHTML` or DOM methods.');
    if (code.indexOf('try') !== -1 && code.indexOf('fetch') !== -1) issues.push('Your fetch call has no try/catch; consider adding error handling.');
  }
  if (lang === 'html') {
    if (code.toLowerCase().indexOf('alt=') === -1) issues.push('Images may be missing `alt` attributes, which is important for accessibility.');
    if (code.toLowerCase().indexOf('<!doctype') === -1) issues.push('No DOCTYPE declaration detected; add `<!DOCTYPE html>` at the top.');
  }

  var html = '<div style="color:var(--text-primary);line-height:1.8;">';
  html += '<div style="font-size:0.8rem;font-weight:700;color:var(--neon-purple);margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">CodeSnap AI Code Analysis</div>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:10px;margin:12px 0;padding:12px;background:rgba(0,0,0,0.2);border-radius:8px;border:1px solid var(--border);">';
  html += '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">Lines: <strong>' + totalLines + '</strong></span>';
  html += '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">Functions: <strong>' + fnCount + '</strong></span>';
  html += '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">Loops: <strong>' + loopCount + '</strong></span>';
  html += '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">Conditions: <strong>' + condCount + '</strong></span>';
  html += '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">Comments: <strong>' + commentCount + '</strong></span>';
  html += '<span style="font-family:var(--font-mono);font-size:0.75rem;margin-left:auto;">Complexity: <strong style="color:' + complexityColor + ';">' + complexityLabel + '</strong></span>';
  html += '</div>';
  if (points.length > 0) {
    html += '<div style="font-size:0.82rem;font-weight:600;color:var(--neon-green);margin:10px 0 6px;">What This Code Does</div>';
    html += '<div style="display:flex;flex-direction:column;gap:4px;">';
    points.slice(0, 6).forEach(function (p) {
      html += '<div style="font-size:0.82rem;color:var(--text-secondary);padding:4px 0;">' + p + '</div>';
    });
    html += '</div>';
  }
  if (langTip) {
    html += '<div style="margin-top:12px;padding:10px 14px;background:rgba(88,166,255,0.08);border-left:3px solid var(--neon-blue);border-radius:0 6px 6px 0;font-size:0.8rem;color:var(--text-secondary);">' + langTip + '</div>';
  }
  if (issues.length > 0) {
    html += '<div style="font-size:0.82rem;font-weight:600;color:var(--neon-orange);margin:12px 0 6px;">Suggestions</div>';
    issues.forEach(function (issue) {
      html += '<div style="font-size:0.8rem;color:var(--text-secondary);padding:3px 0;">' + issue + '</div>';
    });
  }
  if (points.length === 0 && issues.length === 0) {
    html += '<div style="font-size:0.82rem;color:var(--text-muted);">Plain text or unrecognized pattern. Try selecting the correct language from the toolbar.</div>';
  }
  html += '<div style="margin-top:12px;font-size:0.72rem;color:var(--text-muted);font-family:var(--font-mono);">Analysis powered by CodeSnap\'s built-in engine. Works offline.</div>';
  html += '</div>';
  return html;
}

function explainViewCode() {
  var snippets = getSnippets();
  var s = snippets[viewSnippetId];
  if (!s) return;
  var outputEl = document.getElementById('view-ai-output');
  outputEl.innerHTML = '<div class="ai-typing"><span></span><span></span><span></span></div><span style="color:var(--text-muted);font-size:0.82rem;margin-left:8px;">Analyzing...</span>';
  setTimeout(function () {
    outputEl.innerHTML = analyzeCode(s.code, s.lang);
    toast('Analysis complete!', 'success');
  }, 900);
}

function copyViewCode() {
  var snippets = getSnippets();
  var s = snippets[viewSnippetId];
  if (!s) return;
  navigator.clipboard.writeText(s.code).then(function () { toast('Code copied!', 'success'); });
}

function loadSnippetInEditor() {
  var snippets = getSnippets();
  var s = snippets[viewSnippetId];
  if (!s) return;
  showEditorPage();
  document.getElementById('code-input').value = s.code;
  document.getElementById('snippet-title').value = s.title;
  document.getElementById('snippet-desc').value = s.desc;
  document.getElementById('lang-select').value = s.lang;
  currentSnippetId = s.id;
  updateLanguage();
  updateStats();
  toast('Snippet loaded in editor', 'info');
}

function toggleHistory() {
  var drawer = document.getElementById('history-drawer');
  var overlay = document.getElementById('drawer-overlay');
  var isOpen = drawer.classList.contains('open');
  drawer.classList.toggle('open', !isOpen);
  overlay.classList.toggle('active', !isOpen);
  if (!isOpen) renderHistoryList();
}

function renderHistoryList() {
  var snippets = getSnippets();
  var listEl = document.getElementById('history-list');
  var keys = Object.keys(snippets).reverse();
  if (keys.length === 0) {
    listEl.innerHTML = '<div class="empty-history"><span>🕘</span>No snippets saved yet.<br>Create your first one!</div>';
    return;
  }
  listEl.innerHTML = keys.map(function (id) {
    var s = snippets[id];
    var time = timeAgo(s.createdAt);
    var locked = s.password ? ' 🔒' : '';
    var preview = s.code.substring(0, 40).replace(/\n/g, ' ');
    if (s.code.length > 40) preview += '...';
    return '<div class="history-item" onclick="openSnippetFromHistory(\'' + id + '\')">' +
      '<button class="history-delete" onclick="event.stopPropagation();deleteHistoryItem(\'' + id + '\')">×</button>' +
      '<div class="history-item-title">' + locked + escapeHtml(s.title) + '</div>' +
      '<div style="font-size:0.73rem;color:var(--text-muted);margin-bottom:6px;font-family:var(--font-mono);">' + escapeHtml(preview) + '</div>' +
      '<div class="history-item-meta"><span class="history-lang-badge">' + s.lang + '</span><span>' + time + '</span></div>' +
      '</div>';
  }).join('');
}

function openSnippetFromHistory(id) {
  toggleHistory();
  history.pushState(null, '', '#snippet-' + id);
  loadSnippetView(id);
}

function deleteHistoryItem(id) {
  if (!confirm('Delete this snippet?')) return;
  var snippets = getSnippets();
  delete snippets[id];
  saveSnippets(snippets);
  renderHistoryList();
  if (currentSnippetId === id) currentSnippetId = null;
  toast('Snippet deleted', 'info');
}

function loadSnippetView(id) {
  var snippets = getSnippets();
  var s = snippets[id];
  if (!s) { toast('Snippet not found or expired', 'error'); showEditorPage(); return; }
  if (s.expiryEnd && Date.now() > s.expiryEnd) {
    delete snippets[id];
    saveSnippets(snippets);
    toast('This snippet has expired and been deleted', 'warning');
    showEditorPage();
    return;
  }
  if (s.password) {
    showPasswordOverlay(id, s);
    return;
  }
  renderViewPage(s);
}

var pendingPasswordSnippet = null;
function showPasswordOverlay(id, snippet) {
  pendingPasswordSnippet = { id:id, snippet:snippet };
  document.getElementById('pass-overlay').classList.add('active');
  document.getElementById('pass-input').value = '';
  document.getElementById('pass-error').textContent = '';
  setTimeout(function () {
    document.getElementById('pass-input').focus();
  }, 100);
}

function unlockSnippet() {
  var input = document.getElementById('pass-input').value;
  var id = pendingPasswordSnippet.id;
  var snippet = pendingPasswordSnippet.snippet;
  if (input === snippet.password) {
    document.getElementById('pass-overlay').classList.remove('active');
    pendingPasswordSnippet = null;
    renderViewPage(snippet);
  } else {
    document.getElementById('pass-error').textContent = 'Incorrect password. Try again.';
    document.getElementById('pass-input').value = '';
    document.getElementById('pass-input').focus();
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && document.getElementById('pass-overlay').classList.contains('active')) unlockSnippet();
  if (e.key === 'Escape' && document.getElementById('pass-overlay').classList.contains('active')) {
    document.getElementById('pass-overlay').classList.remove('active');
    pendingPasswordSnippet = null;
    showEditorPage();
  }
});

function renderViewPage(s) {
  viewSnippetId = s.id;
  document.getElementById('editor-page').style.display = 'none';
  document.getElementById('view-page').style.display = 'block';
  document.getElementById('view-title').textContent = s.title || 'Untitled Snippet';
  document.getElementById('view-meta-info').textContent = s.lang + ' • ' + s.code.split('\n').length + ' lines • ' + timeAgo(s.createdAt) + (s.password ? ' • Protected' : '');

  var codeEl = document.getElementById('view-code-block');
  if (codeEl) {
    codeEl.className = 'language-' + s.lang;
    codeEl.textContent = s.code;
    if (typeof Prism !== 'undefined') Prism.highlightElement(codeEl);
  }

  clearInterval(viewTimerInterval);
  if (s.expiryEnd) {
    document.getElementById('view-timer-bar').style.display = 'block';
    function viewTick() {
      var remaining = Math.max(0, s.expiryEnd - Date.now());
      if (remaining <= 0) {
        clearInterval(viewTimerInterval);
        document.getElementById('view-timer-count').textContent = 'EXPIRED';
        toast('Snippet expired!', 'warning');
        return;
      }
      var m = Math.floor(remaining / 60000);
      var sec = Math.floor((remaining % 60000) / 1000);
      document.getElementById('view-timer-count').textContent = m + ':' + String(sec).padStart(2, '0');
    }
    viewTick();
    viewTimerInterval = setInterval(viewTick, 1000);
  } else {
    document.getElementById('view-timer-bar').style.display = 'none';
  }

  document.getElementById('view-qr-container').style.display = 'none';
  document.getElementById('view-qr-code').innerHTML = '';

  var snippets = getSnippets();
  if (snippets[s.id]) {
    snippets[s.id].views = (snippets[s.id].views || 0) + 1;
    saveSnippets(snippets);
  }

  document.getElementById('view-ai-output').innerHTML = 'Click Explain to understand this code instantly.';
}

function showEditorPage() {
  document.getElementById('view-page').style.display = 'none';
  document.getElementById('editor-page').style.display = 'flex';
  viewSnippetId = null;
  clearInterval(viewTimerInterval);
  if (location.hash.indexOf('snippet-') === -1) history.pushState(null, '', location.pathname);
}

function checkHashAndRoute() {
  var hash = location.hash;
  var match = hash.match(/snippet-(.+)/);
  if (match) {
    var id = match[1];
    loadSnippetView(id);
  } else {
    showEditorPage();
  }
}

window.addEventListener('hashchange', checkHashAndRoute);
window.addEventListener('load', function () {
  checkHashAndRoute();
  renderHistoryList();
  var savedTheme = localStorage.getItem('codesnap-theme');
  if (savedTheme === 'light') {
    isLightTheme = true;
    document.body.classList.add('light-theme');
    document.getElementById('theme-toggle').textContent = '☀';
  }
  updateStats();
  updateLanguage();
});

function toast(message, type) {
  type = type || 'info';
  var icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  var container = document.getElementById('toast-container');
  var el = document.createElement('div');
  el.className = 'toast ' + type;
  el.innerHTML = '<span class="toast-icon">' + icons[type] + '</span><span>' + message + '</span>';
  container.appendChild(el);
  setTimeout(function () {
    el.classList.add('out');
    setTimeout(function () { el.remove(); }, 350);
  }, 3000);
}

function timeAgo(timestamp) {
  var diff = Date.now() - timestamp;
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
  if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
  return Math.floor(diff / 86400000) + 'd ago';
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}