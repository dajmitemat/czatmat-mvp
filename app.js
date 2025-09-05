// Import Firebase SDK (modułowy)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCM4H0jTDtwQsHo5kLRaf37dr-OyMTQcUY",
  authDomain: "czatmat-cb69c.firebaseapp.com",
  databaseURL: "https://czatmat-cb69c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "czatmat-cb69c",
  storageBucket: "czatmat-cb69c.firebasestorage.app",
  messagingSenderId: "730574738546",
  appId: "1:730574738546:web:8149e8bef54eab9f2f1eeb",
  measurementId: "G-PW1DHDD195"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Referencja do wiadomości
const messagesRef = ref(db, "rooms/general/messages");

const messagesDiv = document.getElementById("messages");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

// Funkcja renderująca wiadomość
function renderMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");

  // Sprawdzenie czy to link do obrazka/gifa
  const urlPattern = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i;
  if (urlPattern.test(msg.text)) {
    const img = document.createElement("img");
    img.src = msg.text;
    img.style.maxWidth = "200px";
    img.style.borderRadius = "8px";
    div.appendChild(img);
  } else if (msg.text.startsWith("http")) {
    const a = document.createElement("a");
    a.href = msg.text;
    a.target = "_blank";
    a.textContent = msg.text;
    div.appendChild(a);
  } else {
    div.textContent = msg.text;
  }

  return div;
}

// Obsługa wysyłania wiadomości
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (text) {
    push(messagesRef, { text, timestamp: Date.now() });
    messageInput.value = "";
  }
});

// Nasłuchiwanie nowych wiadomości
onChildAdded(messagesRef, (snapshot) => {
  const msg = snapshot.val();
  const div = renderMessage(msg);
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
