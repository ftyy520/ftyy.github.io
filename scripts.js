// 章节数据示例（用户可扩展）
const chapters = [
  { id: 1, title: "校园生活指南", content: "在此填写第一章内容..." },
  { id: 2, title: "学习资源导航", content: "在此填写第二章内容..." },
  { id: 3, title: "社团活动手册", content: "..." }
];

// 显示指定区域
function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(el => 
    el.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
}

// 加载章节内容
function loadChapter(chapterId) {
  const chapter = chapters.find(c => c.id === chapterId);
  document.getElementById('chapter-title').textContent = chapter.title;
  document.getElementById('chapter-content').innerHTML = chapter.content;
  showSection('chapter-container');
}

// 初始化目录按钮
function initTocButtons() {
  const container = document.getElementById('chapter-buttons');
  chapters.forEach(chapter => {
    const btn = document.createElement('button');
    btn.textContent = chapter.title;
    btn.onclick = () => loadChapter(chapter.id);
    container.appendChild(btn);
  });
}

// 页面加载时初始化
window.onload = () => {
  initTocButtons();
  document.getElementById('sidebarToggle').onclick = () => 
    showSection('toc');
};