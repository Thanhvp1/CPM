// Gửi tin nhắn đến webhook n8n
async function sendChatMessage(message) {
    try {
        const response = await fetch('https://workflow.mecode.pro/webhook/chatbot-cpm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        const replyText = await response.text();
        displayChatResponse(replyText, 'bot'); // Gửi sang displayChatResponse

    } catch (error) {
        console.error('Lỗi gửi tin nhắn:', error);
        displayChatResponse('⚠️ Đã có lỗi xảy ra, vui lòng thử lại sau.', 'bot');
    }
}

// Hiển thị tin nhắn trong giao diện
function displayChatResponse(message, sender = 'bot') {
    const chatWindow = document.getElementById('chat-window');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');

    if (sender === 'user') {
        messageDiv.classList.add('user-message');
        messageDiv.textContent = `👤 Bạn: ${message}`;
    } else {
        messageDiv.classList.add('bot-message');
        const html = marked.parse(message); // Chuyển Markdown thành HTML
        messageDiv.innerHTML = `🤖 Chatbot:<br>${html}`;
    }

    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Xử lý nút gửi
document.getElementById('send-btn').addEventListener('click', () => {
    const inputField = document.getElementById('chat-message');
    const userMessage = inputField.value.trim();

    if (userMessage !== '') {
        displayChatResponse(userMessage, 'user');
        sendChatMessage(userMessage);
        inputField.value = '';
    }
});

// Cho phép nhấn Enter
document.getElementById('chat-message').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('send-btn').click();
    }
});
