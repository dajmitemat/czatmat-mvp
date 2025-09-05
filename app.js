// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 🔑 Twoje dane z Firebase
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

// 🚀 Start Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Funkcja wysyłania wiadomości
window.sendMessage = function() {
  const input = document.getElementById("messageInput");
  const message = input.value;

  if (message.trim() !== "") {
    push(ref(db, "messages"), {
      text: message,
      time: Date.now()
    });
    input.value = "";
  }
};

// Odbieranie wiadomości
const messagesDiv = document.getElementById("messages");
onChildAdded(ref(db, "messages"), (snapshot) => {
  const data = snapshot.val();
  const p = document.createElement("p");
  p.textContent = data.text;
  messagesDiv.appendChild(p);
});
