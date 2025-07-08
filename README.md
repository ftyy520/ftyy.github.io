<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>文档编辑器 | GitHub Pages</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/marked@4.2.12/marked.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#165DFF',
            secondary: '#6B7280',
            accent: '#3B82F6',
            dark: '#1F2937',
            light: '#F3F4F6',
          },
          fontFamily: {
            inter: ['Inter', 'sans-serif'],
          },
        },
      }
    }
  </script>
  
  <style type="text/tailwindcss">
    @layer utilities {
      .content-auto {
        content-visibility: auto;
      }
      .editor-shadow {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }
      .sidebar-shadow {
        box-shadow: 2px 0 15px rgba(0, 0, 0, 0.05);
      }
      .transition-height {
        transition: max-height 0.3s ease-in-out;
      }
    }
  </style>
</head>
<body class="font-inter bg-gray-50 text-dark min-h-screen flex flex-col">
  <!-- 顶部导航栏 -->
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <i class="fa fa-file-text-o text-primary text-2xl"></i>
        <h1 class="text-xl font-semibold text-dark">文档编辑器</h1>
      </div>
      
      <div class="hidden md:flex items-center space-x-4">
        <button id="saveBtn" class="flex items-center space-x-1 text-sm px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
          <i class="fa fa-save text-gray-600"></i>
          <span>保存</span>
        </button>
        <button id="exportBtn" class="flex items-center space-x-1 text-sm px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
          <i class="fa fa-download text-gray-600"></i>
          <span>导出</span>
        </button>
        <button id="shareBtn" class="flex items-center space-x-1 text-sm px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
          <i class="fa fa-share-alt text-gray-600"></i>
          <span>分享</span>
        </button>
      </div>
      
      <div class="flex items-center space-x-2">
        <button id="themeToggle" class="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <i class="fa fa-moon-o text-gray-600"></i>
        </button>
        <button id="mobileMenuToggle" class="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors">
          <i class="fa fa-bars text-gray-600"></i>
        </button>
      </div>
    </div>
  </header>

  <!-- 主内容区 -->
  <main class="flex-1 flex overflow-hidden">
    <!-- 左侧边栏：导航索引 -->
    <aside id="sidebar" class="w-64 bg-white sidebar-shadow border-r border-gray-200 transform -translate-x-full md:translate-x-0 fixed md:static h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out z-40">
      <div class="p-4 border-b border-gray-200">
        <div class="relative">
          <input type="text" placeholder="搜索标题..." class="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
          <i class="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
      
      <div class="p-4">
        <h2 class="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">文档导航</h2>
        <nav id="tableOfContents" class="space-y-1 text-sm">
          <!-- 导航索引将通过JS动态生成 -->
          <div class="text-gray-400 italic">无内容</div>
        </nav>
      </div>
      
      <div class="mt-auto p-4 border-t border-gray-200">
        <button id="newDocBtn" class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <i class="fa fa-plus"></i>
          <span>新建文档</span>
        </button>
      </div>
    </aside>
    
    <!-- 主编辑区 -->
    <div class="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
      <div class="max-w-5xl mx-auto">
        <!-- 文档标题 -->
        <div class="mb-6">
          <input type="text" id="documentTitle" placeholder="输入标题..." class="w-full text-[clamp(1.5rem,3vw,2.5rem)] font-bold bg-transparent border-none focus:outline-none placeholder-gray-400">
        </div>
        
        <!-- 工具栏 -->
        <div class="mb-4 bg-white rounded-lg p-2 editor-shadow flex flex-wrap gap-1">
          <button class="p-2 rounded hover:bg-gray-100 transition-colors" title="粗体 (Ctrl+B)">
            <i class="fa fa-bold"></i>
          </button>
          <button class="p-2 rounded hover:bg-gray-100 transition-colors" title="斜体 (Ctrl+I)">
            <i class="fa fa-italic"></i>
          </button>
          <button class="p-2 rounded hover:bg-gray-100 transition-colors" title="删除线 (Ctrl+S)">
            <i class="fa fa-strikethrough"></i>
          </button>
          <div class="h-6 w-px bg-gray-300 mx-1"></div>
          <button class="p-2 rounded hover:bg-gray-100 transition-colors" title="标题">
            <i class="fa fa-header"></i>
          </button>
          <button class="p-2 rounded hover:bg-gray-100 transition-colors" title="列表">
            <i class="fa fa-list-ul"></i>
          </button>
          <button class="p-2 rounded hover:bg-gray-100 transition-colors" title="有序列表">
            <i class="fa fa-list-ol"></i>
          </button>
          <button class="p-2 rounded hover:bg-gray-100 transition-colors" title="引用">
            <i class="fa fa-quote-left"></i>
          </button>
          <div class="h-6 w-px bg-gray-300 mx-1"></div>
          <button class="p-2 rounded hover:bg-gray-100 transition-colors" title="链接 (Ctrl+K)">
            <i class="fa fa-link"></i>
          </button>
          <button class="p-2 rounded hover:bg-gray-100 transition-colors" title="图片">
            <i class="fa fa-image"></i>
          </button>
          <button class="p-2 rounded hover:bg-gray-100 transition-colors" title="代码块">
            <i class="fa fa-code"></i>
          </button>
          <div class="h-6 w-px bg-gray-300 mx-1"></div>
          <button id="togglePreview" class="p-2 rounded hover:bg-gray-100 transition-colors" title="预览 (Ctrl+P)">
            <i class="fa fa-eye"></i>
          </button>
        </div>
        
        <!-- 编辑器和预览区 -->
        <div class="flex flex-col lg:flex-row gap-6">
          <!-- 编辑区 -->
          <div id="editorContainer" class="flex-1">
            <textarea id="editor" class="w-full h-[60vh] p-4 border border-gray-300 rounded-lg editor-shadow focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="在此输入内容..."></textarea>
          </div>
          
          <!-- 预览区 -->
          <div id="previewContainer" class="flex-1 hidden lg:block">
            <div id="preview" class="w-full h-[60vh] p-6 bg-white border border-gray-300 rounded-lg editor-shadow overflow-auto">
              <div class="text-gray-400 italic text-center py-16">
                <i class="fa fa-file-text-o text-4xl mb-3"></i>
                <p>预览将显示在这里</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- 页脚 -->
  <footer class="bg-white border-t border-gray-200 py-4">
    <div class="container mx-auto px-4 text-center text-sm text-gray-500">
      <p>© 2025 文档编辑器 | 基于 GitHub Pages 构建</p>
    </div>
  </footer>

  <!-- 移动设备菜单遮罩 -->
  <div id="sidebarOverlay" class="fixed inset-0 bg-black bg-opacity-50 z-30 hidden md:hidden"></div>

  <script>
    // DOM 元素
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const documentTitle = document.getElementById('documentTitle');
    const tableOfContents = document.getElementById('tableOfContents');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const togglePreview = document.getElementById('togglePreview');
    const previewContainer = document.getElementById('previewContainer');
    const editorContainer = document.getElementById('editorContainer');
    
    // 初始化
    documentTitle.value = localStorage.getItem('documentTitle') || '';
    editor.value = localStorage.getItem('editorContent') || '';
    updatePreview();
    generateTableOfContents();
    
    // 编辑器内容变化时更新预览
    editor.addEventListener('input', () => {
      updatePreview();
      generateTableOfContents();
      saveContent();
    });
    
    // 标题变化时保存
    documentTitle.addEventListener('input', saveContent);
    
    // 保存内容到本地存储
    function saveContent() {
      localStorage.setItem('editorContent', editor.value);
      localStorage.setItem('documentTitle', documentTitle.value);
    }
    
    // 更新预览
    function updatePreview() {
      if (editor.value.trim() === '') {
        preview.innerHTML = `
          <div class="text-gray-400 italic text-center py-16">
            <i class="fa fa-file-text-o text-4xl mb-3"></i>
            <p>预览将显示在这里</p>
          </div>
        `;
        return;
      }
      
      // 配置 marked
      marked.setOptions({
        highlight: function(code, lang) {
          if (lang && window.hljs.getLanguage(lang)) {
            return window.hljs.highlight(code, { language: lang }).value;
          }
          return window.hljs.highlightAuto(code).value;
        },
        breaks: true,
        gfm: true
      });
      
      // 渲染 Markdown
      preview.innerHTML = marked.parse(editor.value);
    }
    
    // 生成目录
    function generateTableOfContents() {
      if (editor.value.trim() === '') {
        tableOfContents.innerHTML = `
          <div class="text-gray-400 italic">无内容</div>
        `;
        return;
      }
      
      // 提取所有标题
      const headings = editor.value.match(/^(#+)\s+(.*)$/gm);
      
      if (!headings || headings.length === 0) {
        tableOfContents.innerHTML = `
          <div class="text-gray-400 italic">无标题</div>
        `;
        return;
      }
      
      // 生成目录 HTML
      let tocHtml = '';
      headings.forEach(heading => {
        const matches = heading.match(/^(#+)\s+(.*)$/);
        if (!matches) return;
        
        const level = matches[1].length;
        const text = matches[2];
        const id = text.toLowerCase().replace(/[^\w]+/g, '-');
        
        tocHtml += `
          <a href="#${id}" class="block pl-[${(level-1)*12}px] py-1 hover:text-primary transition-colors" onclick="scrollToHeading('${id}')">
            ${text}
          </a>
        `;
      });
      
      tableOfContents.innerHTML = tocHtml;
    }
    
    // 滚动到指定标题
    function scrollToHeading(id) {
      const element = preview.querySelector(`h1[id="${id}"], h2[id="${id}"], h3[id="${id}"], h4[id="${id}"], h5[id="${id}"], h6[id="${id}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        
        // 关闭移动端侧边栏
        if (window.innerWidth < 768) {
          toggleSidebar();
        }
      }
    }
    
    // 移动端侧边栏切换
    function toggleSidebar() {
      sidebar.classList.toggle('-translate-x-full');
      sidebarOverlay.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden');
    }
    
    mobileMenuToggle.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
    
    // 预览切换
    togglePreview.addEventListener('click', () => {
      previewContainer.classList.toggle('hidden');
      editorContainer.classList.toggle('lg:w-full');
      editorContainer.classList.toggle('lg:max-w-full');
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
      // Ctrl+B: 粗体
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        insertText('**粗体文本**', 2, 6);
      }
      
      // Ctrl+I: 斜体
      if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        insertText('*斜体文本*', 1, 5);
      }
      
      // Ctrl+K: 链接
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        insertText('[链接文本](https://example.com)', 1, 5);
      }
      
      // Ctrl+P: 预览
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        togglePreview.click();
      }
    });
    
    // 在编辑器中插入文本
    function insertText(text, startOffset, endOffset) {
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      const selectedText = editor.value.substring(start, end);
      
      if (selectedText) {
        editor.value = editor.value.substring(0, start) + text.replace('粗体文本', selectedText).replace('斜体文本', selectedText).replace('链接文本', selectedText) + editor.value.substring(end);
      } else {
        editor.value = editor.value.substring(0, start) + text + editor.value.substring(end);
      }
      
      // 设置光标位置
      const newCursorPos = selectedText ? start + text.length : start + (endOffset || text.length);
      editor.selectionStart = newCursorPos;
      editor.selectionEnd = newCursorPos;
      
      // 触发更新
      editor.dispatchEvent(new Event('input'));
      editor.focus();
    }
    
    // 工具栏按钮事件
    document.querySelectorAll('.editor-shadow button').forEach(button => {
      button.addEventListener('click', function() {
