// Dummy data (sonradan novels.json ilə əvəzləyə bilərsən)
let novels = [
  {
    id:1,
    title:"Sirlər Dünyası",
    author:"Orxan",
    cover:"images/cover1.jpg",
    description:"Fantastik bir roman.",
    chapters:[
      {title:"Bölüm 1", content:"Bölüm 1 mətni...", image:"images/ch1.jpg"},
      {title:"Bölüm 2", content:"Bölüm 2 mətni...", image:"images/ch2.jpg"}
    ],
    comments:[]
  },
  {
    id:2,
    title:"Sehirli Macəra",
    author:"Aytac",
    cover:"images/cover2.jpg",
    description:"Gizli sehr və macəra dolu.",
    chapters:[
      {title:"Bölüm 1", content:"Bölüm 1 mətni...", image:"images/ch3.jpg"}
    ],
    comments:[]
  }
];

// Elements
const novelsContainer = document.getElementById("novelsContainer");
const reader = document.getElementById("reader");
const novelTitle = document.getElementById("novelTitle");
const novelCover = document.getElementById("novelCover");
const novelDescription = document.getElementById("novelDescription");
const chapterList = document.getElementById("chapterList");
const chapterContent = document.getElementById("chapterContent");
const commentsList = document.getElementById("commentsList");
const commentInput = document.getElementById("commentInput");
const addCommentBtn = document.getElementById("addCommentBtn");
const backBtn = document.getElementById("backBtn");
const searchInput = document.getElementById("searchInput");
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

let currentNovel = null;
let currentChapterIndex = 0;

// Render novels
function renderNovels(list){
  novelsContainer.innerHTML = "";
  list.forEach(novel=>{
    const card = document.createElement("div");
    card.className = "novel-card";
    card.innerHTML = `
      <img src="${novel.cover}" alt="${novel.title}">
      <h3>${novel.title}</h3>
      <p>${novel.author}</p>
    `;
    card.onclick = ()=>openNovel(novel);
    novelsContainer.appendChild(card);
  });
}
renderNovels(novels);

// Open novel
function openNovel(novel){
  currentNovel = novel;
  currentChapterIndex = 0;
  reader.classList.remove("hidden");
  displayNovelInfo();
  displayChapterList();
  displayChapterContent(currentChapterIndex);
}

// Display novel info
function displayNovelInfo(){
  novelTitle.textContent = currentNovel.title;
  novelCover.src = currentNovel.cover;
  novelDescription.textContent = currentNovel.description;
}

// Display chapter list
function displayChapterList(){
  chapterList.innerHTML = "";
  currentNovel.chapters.forEach((ch,index)=>{
    const li = document.createElement("li");
    li.textContent = ch.title;
    li.onclick = ()=>displayChapterContent(index);
    chapterList.appendChild(li);
  });
}

// Display chapter content
function displayChapterContent(index){
  currentChapterIndex = index;
  const ch = currentNovel.chapters[index];
  chapterContent.innerHTML = `
    <h3>${ch.title}</h3>
    ${ch.image ? `<img src="${ch.image}" alt="${ch.title}">` : ""}
    <p>${ch.content}</p>
  `;
  renderComments();
}

// Comments
function renderComments(){
  commentsList.innerHTML = "";
  currentNovel.comments.forEach(c=>{
    const li = document.createElement("li");
    li.textContent = c;
    commentsList.appendChild(li);
  });
}

// Add comment
addCommentBtn.addEventListener("click", ()=>{
  const text = commentInput.value.trim();
  if(text==="") return;
  currentNovel.comments.push(text);
  renderComments();
  commentInput.value="";
});

// Back button
backBtn.addEventListener("click", ()=>{
  reader.classList.add("hidden");
});

// Search
searchInput.addEventListener("input", ()=>{
  const query = searchInput.value.toLowerCase();
  const filtered = novels.filter(n=>n.title.toLowerCase().includes(query) || n.author.toLowerCase().includes(query));
  renderNovels(filtered);
});

// Menu toggle (mobile)
menuBtn.addEventListener("click", ()=>{
  navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
});
