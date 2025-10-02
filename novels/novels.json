// Romanların siyahısını yüklə
function loadNovels() {
  fetch('novels/novels.json')
    .then(response => response.json())
    .then(novels => {
      const novelsContainer = document.getElementById('novels');
      novels.forEach(novel => {
        const novelElement = document.createElement('div');
        novelElement.classList.add('novel');
        novelElement.innerHTML = `
          <img src="${novel.cover}" alt="${novel.title}">
          <h3>${novel.title}</h3>
          <p>${novel.author}</p>
        `;
        novelElement.addEventListener('click', () => openNovel(novel));
        novelsContainer.appendChild(novelElement);
      });
    });
}

// Romanu aç
function openNovel(novel) {
  document.getElementById('novel-title').innerText = novel.title;
  document.getElementById('novel-cover').src = novel.cover;
  document.getElementById('novel-description').innerText = novel.description;
  
  const chapterList = document.getElementById('chapter-list');
  chapterList.innerHTML = '';
  novel.chapters.forEach((chapter, index) => {
    const chapterItem = document.createElement('li');
    chapterItem.innerText = chapter.title;
    chapterItem.addEventListener('click', () => openChapter(novel, index));
    chapterList.appendChild(chapterItem);
  });

  document.getElementById('novel-list').style.display = 'none';
  document.getElementById('reader').style.display = 'block';
}

// Bölümü aç
function openChapter(novel, index) {
  const chapter = novel.chapters[index];
  const chapterContent = document.getElementById('chapter-content');
  chapterContent.innerHTML = `
    <h3>${chapter.title}</h3>
    <img src="${chapter.image}" alt="${chapter.title}">
    <p>${chapter.content}</p>
  `;
}

// Geri düyməsi
document.getElementById('back').addEventListener('click', () => {
  document.getElementById('novel-list').style.display = 'block';
  document.getElementById('reader').style.display = 'none';
});

// Saytı yüklə
loadNovels();
