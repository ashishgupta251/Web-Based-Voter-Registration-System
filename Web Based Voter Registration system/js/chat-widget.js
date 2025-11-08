// --- Inject Chatbot HTML dynamically ---
const chatbotHTML = `
  <link rel="stylesheet" href="css/chatbot.css">
  <div class="chatbot">
    <div class="chat-header">
      <h4>👮‍♂️Support Chat</h4>
      <button id="close-chat">&times;</button>
    </div>

    <div class="chat-body" id="chat-body">
      </div>

    <div class="chat-input">
      <input type="text" id="user-input" placeholder="Type a message..." />
      <button id="send-btn">
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  </div>
  <button id="chat-toggle">🧑‍💼</button>
`;

document.body.insertAdjacentHTML("beforeend", chatbotHTML);

// --- Chatbot logic ---
const chatToggle = document.getElementById("chat-toggle");
const chatbot = document.querySelector(".chatbot");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

// --- 1. Add Message to Chat (Bubbles) ---
function addMessage(text, className) {
  const msgDiv = document.createElement("div");
  msgDiv.textContent = text;
  msgDiv.classList.add("chat-message", className);
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// --- 2. Show/Hide Typing Indicator ---
function showTypingIndicator() {
  const indicator = document.createElement("div");
  indicator.classList.add("typing-indicator");
  indicator.id = "typing-indicator";
  indicator.innerHTML = `<span></span><span></span><span></span>`;
  chatBody.appendChild(indicator);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function hideTypingIndicator() {
  const indicator = document.getElementById("typing-indicator");
  if (indicator) {
    chatBody.removeChild(indicator);
  }
}

// --- 3. Bot Reply Logic ---
function botReply(input) {
  let reply = "I'm here to assist you.";

  input = input.toLowerCase();
  if (input.includes("register")) reply = "You can register using the Register tab above.";
  else if (input.includes("verify")) reply = "Verification can be done via the Verify page.";
  else if (input.includes("login")) reply = "Use your email and password on the Login page.";
  else if (input.includes("help")) reply = "Sure! Tell me what issue you're facing.";
  else if (input.includes("thank")) reply = "You're most welcome! 😊";

  hideTypingIndicator();
  addMessage(reply, "bot");
}

// --- 4. Event Handlers ---
chatToggle.addEventListener("click", () => chatbot.style.display = "flex");
closeChat.addEventListener("click", () => chatbot.style.display = "none");

function sendMessage() {
  const msg = userInput.value.trim();
  if (msg) {
    addMessage(msg, "user");
    userInput.value = "";
    showTypingIndicator();
    setTimeout(() => botReply(msg), 1500); 
  }
}

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Form submit hone se roke (agar form mein ho)
    sendMessage();
  }
});

// --- 5. Add Initial Bot Message ---
addMessage("Hello! How can I assist you today?", "bot");