// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-
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

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const messagesRef = db.ref("rooms/general/messages");

const messagesDiv = document.getElementById("messages");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

function renderMessage(msg) {
  const div = document.createElement("div");
  div.classList.add("message");

  const urlPattern = /(https?:\/\/.+\.(jpg|jpeg|png|gif|webp))$/i;
  if (urlPattern.test(msg.text)) {
    const img = document.createElement("img");
    img.src = msg.text;
    img.style.maxWidth = "100%";
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

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (text) {
    messagesRef.push({ text, timestamp: Date.now() });
    messageInput.value = "";
  }
});

messagesRef.on("child_added", (snapshot) => {
  const msg = snapshot.val();
  const div = renderMessage(msg);
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
