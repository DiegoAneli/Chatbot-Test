
const chatMessages = [
    {
        sender: 'bot',
        avatar: './image/surfer.png',
        text: "G'day! Sono SurfBot, il tuo concierge personale per il noleggio tavole e mute a Surf e Manly Beach! 🏄‍♀️\n\nPer consigliarti la tavola perfetta: qual è il tuo livello (principiante, intermedio o pro) e quali condizioni d'onda preferisci oggi?",
        timestamp: "13:40"
    },
    {
        sender: 'user',
        avatar: './image/client.png',
        text: "Ciao! Puoi aiutarmi a scegliere la tavola giusta per oggi pomeriggio a Surf? Sono un surfista intermedio e vorrei noleggiare anche la muta.",
        timestamp: "13:42"
    },
    {
        sender: 'bot',
        avatar: './image/surfer.png',
        text: "Ottima scelta! Con 3-4ft offshore a Surf South il banco di sabbia regge onde pulite e veloci.\n\nPer un livello intermedio ti raccomando la nostra Torq TET Funboard 7'6\": volume generoso (52.4L) per remare facile nel rip current e rail reattivi, abbinata alla muta Rip Curl Dawn Patrol 3/2mm.",
        timestamp: "13:43"
    }
];

/**
 * Genera il timestamp corrente visualizzato in minuti e secondi (mm:ss).
 * @param {Date} [date=new Date()]
 * @returns {string} Timestamp nel formato "mm:ss"
 */
function getFormattedTimestamp(date = new Date()) {
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${minutes}:${seconds}`;
}

/**
 * Funzione di rendering: itera sull'array di oggetti `chatMessages`
 * e genera l'HTML dinamico all'interno del container della chat.
 */
function renderChatMessages() {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    let html = `
        <div class="flex items-center justify-center">
            <span class="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm shadow-sm">
                Oggi
            </span>
        </div>
    `;

    chatMessages.forEach((msg) => {
        const isBot = msg.sender === 'bot';
        if (isBot) {
            html += `
                <div class="flex items-start gap-2 sm:gap-space-sm max-w-[90%] sm:max-w-[80%] md:max-w-[75%] self-start animate-fade-in">
                    <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container flex-shrink-0 p-1 shadow-sm mt-0.5">
                        <img alt="SurfBot Logo" class="w-full h-full object-contain rounded-full" src="${escapeHtml(msg.avatar)}" />
                    </div>
                    <div class="flex flex-col items-start gap-1">
                        <div class="bg-primary-container text-on-primary p-3 sm:p-space-md rounded-2xl rounded-tl-sm shadow-md font-body-md text-sm sm:text-body-md leading-relaxed text-left whitespace-pre-line">
                            ${escapeHtml(msg.text)}
                        </div>
                        <span class="font-label-sm text-label-sm text-on-surface-variant pl-1">${escapeHtml(msg.timestamp)}</span>
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="flex items-start gap-2 sm:gap-space-sm max-w-[90%] sm:max-w-[80%] md:max-w-[75%] self-end flex-row-reverse animate-fade-in">
                    <img alt="Customer Portrait" class="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover flex-shrink-0 shadow-sm mt-0.5 ring-2 ring-secondary/20" src="${escapeHtml(msg.avatar)}" />
                    <div class="flex flex-col items-end gap-1">
                        <div class="bg-secondary text-on-secondary p-3 sm:p-space-md rounded-2xl rounded-tr-sm shadow-md font-body-md text-sm sm:text-body-md leading-relaxed text-left whitespace-pre-line">
                            ${escapeHtml(msg.text)}
                        </div>
                        <span class="font-label-sm text-label-sm text-on-surface-variant pr-1">${escapeHtml(msg.timestamp)}</span>
                    </div>
                </div>
            `;
        }
    });

    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
}

/**
 * Crea un nuovo oggetto messaggio e lo aggiunge all'array di oggetti `chatMessages`.
 * @param {'bot'|'user'} sender
 * @param {string} text
 * @param {string} [avatar]
 * @returns {object} Il messaggio creato
 */
function addMessage(sender, text, avatar) {
    const defaultAvatar = sender === 'bot' ? './image/surfer.png' : './image/client.png';
    const messageObj = {
        sender: sender,
        avatar: avatar || defaultAvatar,
        text: text,
        timestamp: getFormattedTimestamp()
    };

    chatMessages.push(messageObj);
    renderChatMessages();
    return messageObj;
}

/**
 * URL base del backend Express (supporta sia esecuzione diretta su port 3000 che Live Server su porta differente tramite CORS)
 */
const BACKEND_URL = (window.location.protocol === 'http:' || window.location.protocol === 'https:')
    ? (window.location.origin.includes(':3000') ? '' : 'http://localhost:3000')
    : 'http://localhost:3000';

/**
 * Gestione invio form utente
 */
    async function handleChatSubmit(event) {
        event.preventDefault();
        const input = document.getElementById('user-input-field');
        const text = input.value.trim();
        if (!text) return;

        addMessage('user', text, './image/client.png');
        input.value = '';

        await sendChatMessageToServer(text);
    }

    /**
     * Invia il messaggio al server Express (/api/chat) che dialoga con OpenRouter
     */
    async function sendChatMessageToServer(userText) {
        try {
            const response = await fetch(`${BACKEND_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userText,
                    history: chatMessages
                })
            });

            if (!response.ok) {
                throw new Error(`Server error: status ${response.status}`);
            }

            const data = await response.json();
            if (data && data.reply) {
                addMessage('bot', data.reply, './image/surfer.png');
                return;
            }
        } catch (err) {
            console.warn('Impossibile contattare il server Express o OpenRouter. Utilizzo fallback locale:', err);
        }

        // Fallback simulato se il server Express non è avviato
        setTimeout(() => {
        respondBotSimulated(userText);
    }, 700);
}

/**
 * Risposta simulata del bot
 */
function respondBotSimulated(userPrompt) {
    const lower = userPrompt.toLowerCase();
    let reply = "";

    if (lower.includes('soft') || lower.includes('principiante')) {
        reply = "Per i principianti consiglio la nostra Mick Fanning Super Soft 8'0\"! Stabilità eccezionale sulle schiume di Bondi North e pinne morbide anti-infortunio. Vuoi includere anche il leash di sicurezza?";
    } else if (lower.includes('short') || lower.includes('performance')) {
        reply = "Ottima scelta pro! Abbiamo la JS Industries Monsta Box 6'0\" pronta nel locker. Con 3ft offshore farai curve pulite nella parte sud della baia!";
    } else if (lower.includes('long') || lower.includes('9ft')) {
        reply = "Il classico log surfing australiano! La nostra McTavish Fireball 9'1\" con single fin ti regalerà noseride lunghissimi verso il promontorio di Ben Buckler.";
    } else {
        reply = "Ricevuto! Sto sincronizzando i dettagli con il team di Surf Beach. Puoi bloccare la tavola al locker per riservare il materiale all'istante!";
    }

    addMessage('bot', reply, './image/surfer.png');
}

/**
 * Quick reply helper
 */
function handleQuickReply(chipText) {
    addMessage('user', chipText, './image/client.png');
    setTimeout(() => {
        respondBotSimulated(chipText);
    }, 700);
}

/**
 * Funzioni compatibilità
 */
function appendUserBubble(message) {
    return addMessage('user', message, './image/client.png');
}

function appendBotBubble(message) {
    return addMessage('bot', message, './image/surfer.png');
}

/**
 * Helper per escape caratteri speciali HTML
 */
function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Inizializzazione al caricamento
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderChatMessages);
} else {
    renderChatMessages();
}
