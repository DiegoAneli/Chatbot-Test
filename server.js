require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware di sicurezza e parsing
app.use(cors());
app.use(express.json());

// Servire file statici (index.html, style.css, main.js, cartella image)
app.use(express.static(__dirname));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        openRouterConfigured: Boolean(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY.trim())
    });
});

// Endpoint di chat con OpenRouter
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Il campo "message" è obbligatorio.' });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        // Se l'API Key non è ancora configurata nel file .env
        if (!apiKey || apiKey.trim() === '' || apiKey === 'your_openrouter_api_key_here') {
            return res.json({
                reply: "⚠️ API Key OpenRouter non trovata nel file .env. Incolla la tua chiave in `OPENROUTER_API_KEY` dentro il file `.env` e riavvia il server per abilitare le risposte AI reali!",
                simulated: true
            });
        }

        // Costruzione dei messaggi per OpenRouter
        const systemPrompt = {
            role: 'system',
            content: "Sei SurfBot, il concierge virtuale appassionato, amichevole e professionale di Surf Beach e Bondi/Manly. " +
                     "Aiuti surfisti principianti, intermedi e pro a scegliere la tavola giusta (shortboard, funboard, longboard, softboard), " +
                     "la muta migliore e a comprendere le condizioni del mare e del vento. Rispondi in italiano in modo conciso, naturale ed entusiasta (usa occasionalmente emoji da surf come 🏄‍♂️, 🤙, 🌊)."
        };

        const formattedMessages = [systemPrompt];

        // Se è presente la cronologia dei messaggi precedenti
        if (Array.isArray(history)) {
            history.forEach(item => {
                if (item && item.text) {
                    formattedMessages.push({
                        role: item.sender === 'user' ? 'user' : 'assistant',
                        content: item.text
                    });
                }
            });
        }

        // Aggiungi il messaggio corrente dell'utente
        formattedMessages.push({
            role: 'user',
            content: message
        });

        const model = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct:free';

        // Chiamata all'API di OpenRouter
        const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey.trim()}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': `http://localhost:${PORT}`,
                'X-Title': 'SurfBot Concierge'
            },
            body: JSON.stringify({
                model: model,
                messages: formattedMessages
            })
        });

        if (!openRouterResponse.ok) {
            const errorData = await openRouterResponse.text();
            console.error('Errore risposta OpenRouter:', errorData);
            return res.status(openRouterResponse.status).json({
                error: 'Errore durante la comunicazione con OpenRouter.',
                details: errorData
            });
        }

        const data = await openRouterResponse.json();
        const reply = data.choices && data.choices[0] && data.choices[0].message
            ? data.choices[0].message.content
            : "Mi dispiace, non sono riuscito a elaborare una risposta. Riprova tra poco!";

        res.json({ reply });
    } catch (error) {
        console.error('Errore nel server /api/chat:', error);
        res.status(500).json({ error: 'Errore interno del server.', message: error.message });
    }
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`🏄 Server SurfBot avviato su http://localhost:${PORT}`);
    console.log(`⚡ Watch mode attivo con Express, dotenv e CORS`);
});

