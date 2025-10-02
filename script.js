let novels = [
  {
    id:1,
    title:"Sirlər Dünyası",
    author:"Orxan",
    cover:"https://via.placeholder.com/200x300.png?text=Cover1",
    description:"Fantastik bir roman.",
    chapters:[
      {title:"Bölüm 1", content:"Bölüm 1 mətni...", image:"https://via.placeholder.com/400x200.png?text=Chapter1"},
      {title:"Bölüm 2", content:"Bölüm 2 mətni...", image:"https://via.placeholder.com/400x200.png?text=Chapter2"}
    ],
    comments:[]
  },
  {
    id:2,
    title:"Sehirli Macəra",
    author:"Aytac",
    cover:"https://via.placeholder.com/200x300.png?text=Cover2",
    description:"Gizli sehr və macəra dolu.",
    chapters:[
      {title:"Bölüm 1", content:"Bölüm 1 mətni...", image:"https://via.placeholder.com/400x200.png?text=Chapter3"}
    ],
    comments:[]
  }
];

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

let currentNovel = null;
let currentChapterIndex = 0;

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

function openNovel(novel){
  currentNovel = novel;
  currentChapterIndex = 0;
  reader.classList.remove("hidden");
  displayNovelInfo();
  displayChapterList();
  displayChapterContent(currentChapterIndex);
}

function displayNovelInfo(){
  novelTitle.textContent = currentNovel.title;
  novelCover.src = currentNovel.cover;
  novelDescription.textContent = currentNovel.description;
}

function displayChapterList(){
  chapterList.innerHTML = "";
  currentNovel.chapters.forEach((ch,index)=>{
    const li = document.createElement("li");
    li.textContent = ch.title;
    li.onclick=()=>displayChapterContent(index);
    chapterList.appendChild(li);
  });
}

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

function renderComments(){
  commentsList.innerHTML = "";
  currentNovel.comments.forEach(c=>{
    const li = document.createElement("li");
    li.textContent = c;
    commentsList.appendChild(li);
  });
}

addCommentBtn.addEventListener("click", ()=>{
  const text = commentInput.value.trim();
  if(text==="") return;
  currentNovel.comments.push(text);
  renderComments();
  commentInput.value="";
});

backBtn.addEventListener("click", ()=>{
  reader.classList.add("hidden");
});
