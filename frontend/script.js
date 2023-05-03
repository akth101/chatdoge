
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');

function addMessageToChatBox(message) {
	const messageElement = document.createElement('p');
	messageElement.innerText = JSON.stringify(message);
	chatBox.appendChild(messageElement);
  }
  
async function sendMessage() {
	const message = messageInput.value;
	addMessageToChatBox(`You: ${message}`);
	messageInput.value = '';
  
	try {
	  const response = await fetch('http://localhost:3000/fortuneTell', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({ message })
	  });
  
	  const data = await response.json();
	  addMessageToChatBox(`Chatbot: ${data.assistant}`);
	} catch (error) {
	  console.error(error);
	}
  }
  

sendButton.addEventListener('click', sendMessage);
