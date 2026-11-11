// Disabilita il controllo dei certificati TLS auto-firmati (risolve SELF_SIGNED_CERT_IN_CHAIN generato da proxy, firewall o antivirus)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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

        const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_FALLBACK_MODEL;

        if (!apiKey || apiKey.trim() === '' || apiKey === 'your_openrouter_api_key_here') {
            return res.status(400).json({
                error: 'API Key OpenRouter non configurata nel file .env.'
            });
        }

        // Costruzione prompt di sistema
        const systemPrompt = {
            role: 'system',
            content:
                "Sei SurfBot, l'assistente virtuale appassionato, amichevole e professionale di 'Sydney WaveRent', " +
                "il punto di riferimento n.1 per il noleggio di tavole da surf a Sydney, situato strategicamente a due passi da Bondi Beach. " +
                "Aiuti surfisti di ogni livello (principianti, intermedi e pro) a scegliere l'attrezzatura perfetta tra la nostra vasta flotta: " +
                "shortboard performanti, funboard versatili, longboard stabili e softboard ideali per imparare in sicurezza. " +
                "Fornisci anche consigli esperti sulle mute più adatte alla temperatura dell'acqua della NSW Coast e spieghi in modo chiaro " +
                "le condizioni meteo-marine, le mareggiate e i venti tipici degli spot iconici di Sydney como Bondi, Manly, Maroubra e Coogee. " +
                "Il nostro negozio offre inoltre il servizio di consegna e ritiro flessibile, lezioni private con istruttori certificati ASI e un comodo " +
                "deposito tavole sicuro per i clienti abituali. " +
                "gli orari di apertura del negozio sono dalle 10:30 alle 21:30. " +
                "per chi noleggia una tavola da surf entro le ore 14:00, viene offerto un cocktail tropicale omaggio. " +
                "--- DETTAGLI OPERATIVI E SERVIZI DEL NEGOZIO --- " +
                "1. PROMOZIONI & COCKTAIL OMAGGIO: Il cocktail omaggio (disponibile anche analcolico al frutto della passione o cocco) viene servito direttamente al nostro 'Surf Lounge Bar' interno entro le 14:00. Per i minori di 18 anni serviamo mocktail al 100% naturali. " +
                "2. TARIFFE NOLEGGIO E PACCHETTI: Noleggio orario a $25 AUD/ora, mezza giornata (4 ore) a $50 AUD, giornata intera a $70 AUD. Offriamo anche il pass settimanale Unlimited Surf a $220 AUD con possibilità di cambiare modello di tavola ogni giorno. Mute di varie grammature (dalla 2mm estiva alla 3/2mm per l'inverno) incluse a soli $10 AUD extra al giorno. " +
                "3. ACCESSORI E ATTREZZATURA INCLUSA: Ogni noleggio di tavola include gratuitamente il leash ad alta resistenza, la paraffina (wax) adatta alla temperatura stagionale dell'acqua e la sacca da trasporto imbottita. Racks per bici e scooter disponibili su richiesta senza costi aggiuntivi. " +
                "4. SERVIZIO EXPRESS DI CONSEGNA SPAGGE: Riconsegna e consegna direttamente sulla sabbia nelle spiagge di Bondi, Tamarama e Bronte gratuita per noleggi di mezza giornata o giornata intera. Per Manly e Maroubra è previsto un piccolo supplemento di $15 AUD. " +
                "5. LEZIONI E CLINIC: Lezioni individuali a $110 AUD per 90 minuti (attrezzatura inclusa). Lezioni di gruppo (max 5 persone) a $65 AUD a persona. Organizziamo ogni venerdì pomeriggio la 'Sunset Surf Clinic' gratuita di 30 minuti sulla sicurezza in mare, correnti di risacca (rip currents) e galateo del surfista. " +
                "6. SHOPPING & REPARAZIONI DING FIX: All'interno del negozio vendiamo abbigliamento surf culture locale, protezione solare ecologica e zinc metallico sicuro per la barriera corallina. Offriamo anche servizio riparazione rapida tavole (Ding Fix Express) in 24-48 ore. " +
                "7. DEPOSITO E LOCKERS: Custodia tavola e spogliatoi con docce calde e armadietti di sicurezza gratuiti per chiunque noleggi con noi. " +
                "Rispondi sempre in italiano in modo conciso, naturale ed entusiasta, trasmettendo la vera 'stoked vibe' australiana " +
                "e usando occasionalmente emoji a tema (come 🏄‍♂️, 🤙, 🌊)."
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

        // Modelli da provare in sequenza (in caso di rate-limit su uno specifico provider)
        const primaryModel = process.env.OPENROUTER_MODEL || 'openrouter/free';
        const candidateModels = [
            primaryModel,
            process.env.OPENROUTER_MODEL_BACKUP,
            'openrouter/free',
            'nvidia/nemotron-3.5-lightning:free',
            'liquid/lfm-2.5-2.6b:free'
        ].filter(Boolean);

        const modelsToTry = [...new Set(candidateModels)];

        let reply = null;
        let lastErrorDetails = null;

        for (const model of modelsToTry) {
            try {
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

                if (openRouterResponse.ok) {
                    const data = await openRouterResponse.json();
                    if (data.choices && data.choices[0] && data.choices[0].message) {
                        reply = data.choices[0].message.content;
                        break;
                    }
                } else {
                    const errorText = await openRouterResponse.text();
                    lastErrorDetails = `Modello ${model} errore ${openRouterResponse.status}: ${errorText}`;
                    console.warn(lastErrorDetails);
                }
            } catch (fetchErr) {
                lastErrorDetails = fetchErr.message;
                console.warn(`Tentativo con ${model} fallito:`, fetchErr.message);
            }
        }

        if (reply) {
            return res.json({ reply });
        }

        console.error('Tutti i tentativi con i modelli OpenRouter sono falliti:', lastErrorDetails);
        return res.status(502).json({
            error: 'Nessun modello OpenRouter al momento disponibile. Riprova tra poco.',
            details: lastErrorDetails
        });
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
