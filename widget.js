(function() {
    var markedScript = document.createElement('script');
    markedScript.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
    document.head.appendChild(markedScript);

    var style = document.createElement('style');
    style.innerHTML = '#ai-chat-widget-btn { position: fixed; bottom: 20px; right: 20px; z-index: 9999; background: #25D366; color: #FFF; border: none; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; } #ai-chat-widget-btn:hover { transform: scale(1.05); } #ai-chat-window { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #ffffff; z-index: 10000; flex-direction: column; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; } #ai-chat-header { background: #1c1c1e; color: #FFF; padding: 30px 20px; display: flex; align-items: center; border-bottom-left-radius: 40px; border-bottom-right-radius: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); } #ai-chat-close { background: none; border: none; color: #FFF; font-size: 18px; cursor: pointer; padding-right: 15px; font-weight: bold; } #ai-chat-logo { width: 45px; height: 45px; border-radius: 50%; background: #444; margin-right: 15px; display: flex; justify-content: center; align-items: center; border: 2px solid #555; } #ai-chat-logo svg { width: 24px; height: 24px; fill: #bbb; } #ai-chat-title { font-size: 18px; font-weight: 600; } #ai-chat-messages { flex-grow: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; } .msg-wrapper { display: flex; flex-direction: column; max-width: 85%; } .msg-label { font-size: 11px; color: #888; margin-bottom: 5px; } .user-wrapper { align-self: flex-end; align-items: flex-end; } .user-msg { background: #25D366; color: #FFF; padding: 12px 18px; border-radius: 20px 20px 0 20px; font-size: 15px; line-height: 1.4; box-shadow: 0 1px 2px rgba(0,0,0,0.1); } .ai-wrapper { align-self: flex-start; align-items: flex-start; } .ai-msg { background: #F0F2F5; color: #111; padding: 12px 18px; border-radius: 20px 20px 20px 0; font-size: 15px; line-height: 1.4; box-shadow: 0 1px 2px rgba(0,0,0,0.05); } .ai-msg p { margin: 0 0 10px 0; } .ai-msg p:last-child { margin: 0; } .ai-msg a.wa-btn { display: flex; align-items: center; justify-content: center; background: #25D366; color: white; text-decoration: none; padding: 12px 20px; border-radius: 12px; font-weight: bold; margin-top: 10px; gap: 8px; font-size: 15px; } #ai-chat-input-area { display: flex; padding: 15px 20px; background: #FFF; align-items: center; gap: 10px; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); } #ai-chat-input { flex-grow: 1; background: #FFF; border: none; padding: 10px; outline: none; font-size: 15px; color: #000; } #ai-chat-input::placeholder { color: #bbb; } #ai-chat-send { background: none; border: none; cursor: pointer; display: flex; justify-content: center; align-items: center; padding: 10px; } #ai-chat-send svg { width: 24px; height: 24px; fill: #888; } .typing-indicator { display: flex; gap: 5px; padding: 5px 10px; } .dot { width: 8px; height: 8px; background: #aaa; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; } .dot:nth-child(1) { animation-delay: -0.32s; } .dot:nth-child(2) { animation-delay: -0.16s; } @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }';
    document.head.appendChild(style);

    var widgetContainer = document.createElement('div');
    widgetContainer.innerHTML = '<button id="ai-chat-widget-btn"><svg width="30" height="30" viewBox="0 0 24 24" fill="#FFF"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="3.5"/></svg></button><div id="ai-chat-window"><div id="ai-chat-header"><button id="ai-chat-close">&#10094;</button><div id="ai-chat-logo"><svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div><div id="ai-chat-title">Live Agent Transfer</div></div><div id="ai-chat-messages"><div class="msg-wrapper ai-wrapper"><div class="msg-label">PhonePlace</div><div class="ai-msg">Welcome to PhonePlace! We are happy to help you.</div></div></div><div id="ai-chat-input-area"><input type="text" id="ai-chat-input" placeholder="Type a message..."><button id="ai-chat-send"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg></button></div></div>';
    document.body.appendChild(widgetContainer);

    var chatBtn = document.getElementById('ai-chat-widget-btn');
    var chatWindow = document.getElementById('ai-chat-window');
    var closeBtn = document.getElementById('ai-chat-close');
    var chatInput = document.getElementById('ai-chat-input');
    var chatSend = document.getElementById('ai-chat-send');
    var chatMessages = document.getElementById('ai-chat-messages');

    chatBtn.addEventListener('click', function() { chatWindow.style.display = 'flex'; chatBtn.style.display = 'none'; });
    closeBtn.addEventListener('click', function() { chatWindow.style.display = 'none'; chatBtn.style.display = 'flex'; });

    // BACKEND URL PENDING RENDER DEPLOYMENT
    var BACKEND_URL = "https://phoneplace-release.onrender.com/api/chat";

    var waIconSVG = '<svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>';

    function typeHTML(element, htmlString, speed) {
        element.innerHTML = '';
        var i = 0;
        var isTag = false;
        var text = '';
        var startTime = Date.now();

        function typeWriter() {
            var isAtBottom = (chatMessages.scrollHeight - chatMessages.scrollTop - chatMessages.clientHeight) < 50;
            if (Date.now() - startTime > 5000) {
                element.innerHTML = htmlString;
                if (isAtBottom) chatMessages.scrollTop = chatMessages.scrollHeight;
                return;
            }
            if (i < htmlString.length) {
                text += htmlString.charAt(i);
                element.innerHTML = text;
                if (htmlString.charAt(i) === '<') isTag = true;
                if (htmlString.charAt(i) === '>') isTag = false;
                i++;
                if (isTag) { typeWriter(); } else { setTimeout(typeWriter, speed); if (isAtBottom) chatMessages.scrollTop = chatMessages.scrollHeight; }
            }
        }
        typeWriter();
    }

    async function sendMessage() {
        var text = chatInput.value.trim();
        if (!text) return;

        chatMessages.innerHTML += '<div class="msg-wrapper user-wrapper"><div class="msg-label">Customer</div><div class="user-msg">' + text + '</div></div>';
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        var loadingId = 'loading-' + Date.now();
        chatMessages.innerHTML += '<div id="' + loadingId + '" class="msg-wrapper ai-wrapper"><div class="msg-label">PhonePlace</div><div class="ai-msg"><div class="typing-indicator"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></div>';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            var response = await fetch(BACKEND_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text })
            });
            var data = await response.json();
            var formattedReply = (typeof marked !== 'undefined') ? marked.parse(data.reply) : data.reply;
            
            // Format the WhatsApp Link Button perfectly
            formattedReply = formattedReply.replace(/<a href/g, '<a class="wa-btn" target="_blank" href');
            formattedReply = formattedReply.replace(/>Connect on WhatsApp<\/a>/g, '>' + waIconSVG + ' Connect on WhatsApp</a>');

            var label = formattedReply.includes("wa-btn") ? "System" : "PhonePlace";
            
            var loadEl = document.getElementById(loadingId);
            if (loadEl) loadEl.remove();

            var typeId = 'type-' + Date.now();
            chatMessages.innerHTML += '<div class="msg-wrapper ai-wrapper"><div class="msg-label">' + label + '</div><div class="ai-msg" id="' + typeId + '"></div></div>';
            
            var typeTarget = document.getElementById(typeId);
            typeHTML(typeTarget, formattedReply, 10); 

        } catch (e) {
            var loadElErr = document.getElementById(loadingId);
            if (loadElErr) loadElErr.remove();
            chatMessages.innerHTML += '<div class="msg-wrapper ai-wrapper"><div class="msg-label">System</div><div class="ai-msg" style="color: red; font-weight: bold;">Server offline.</div></div>';
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') sendMessage(); });
})();
