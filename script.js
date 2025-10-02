let novels = [];
let messages = [];

function openAdmin() {
  document.getElementById("admin-panel").classList.remove("hidden");
}

function closeAdmin() {
  document.getElementById("admin-panel").classList.add("hidden");
}

function addNovel() {
  const title = document.getElementById("novel-title").value;
  const status = document.getElementById("novel-status").value;
  const fileInput = document.getElementById("novel-img");
  
  let imgSrc = "https://via.placeholder.com/200"; // default şəkil
  if (fileInput.files[0]) {
    imgSrc = URL.createObjectURL(fileInput.files[0]);
  }

  novels.push({ title, status, img: imgSrc });
  renderNovels();
  closeAdmin();
}

function renderNovels() {
  const list = document.getElementById("novel-list");
  list.innerHTML = "";
  novels.forEach(n => {
    list.innerHTML += `
      <div class="novel-card">
        <img src="${n.img}" alt="novel">
        <h3>${n.title}</h3>
        <span class="status ${n.status}">${n.status}</span>
      </div>
    `;
  });
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  if (!input.value) return;
  messages.push(input.value);
  renderMessages();
  input.value = "";
}

function renderMessages() {
  const box = document.getElementById("messages");
  box.innerHTML = "";
  messages.forEach(m => {
    box.innerHTML += `<div>👤 ${m}</div>`;
  });
}

// Axtarış funksiyası
document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtered = novels.filter(n => n.title.toLowerCase().includes(q));
  const list = document.getElementById("novel-list");
  list.innerHTML = "";
  filtered.forEach(n => {
    list.innerHTML += `
      <div class="novel-card">
        <img src="${n.img}" alt="novel">
        <h3>${n.title}</h3>
        <span class="status ${n.status}">${n.status}</span>
      </div>
    `;
  });
});
