let extractedVideos = [];
let currentPageType = '';
let currentKeyword = '';

const extractBtn = document.getElementById('extractBtn');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const statusDiv = document.getElementById('status');
const videoCountDiv = document.getElementById('videoCount');
const sourceInfoDiv = document.getElementById('sourceInfo');
const logContent = document.getElementById('logContent');
const clearLogBtn = document.getElementById('clearLogBtn');
const portStatus = document.getElementById('portStatus');

function addLog(message, type = 'info', details = null) {
  const now = new Date();
  const time = now.toLocaleTimeString('zh-CN', { hour12: false });

  const logEntry = document.createElement('div');
  logEntry.className = `log-entry ${type}`;

  const timeSpan = document.createElement('span');
  timeSpan.className = 'log-time';
  timeSpan.textContent = `[${time}]`;

  const messageSpan = document.createElement('span');
  messageSpan.className = 'log-message';
  messageSpan.textContent = message;

  logEntry.appendChild(timeSpan);
  logEntry.appendChild(messageSpan);

  if (details) {
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'log-details';
    detailsDiv.textContent = typeof details === 'object' ? JSON.stringify(details, null, 2) : String(details);
    logEntry.appendChild(detailsDiv);
  }

  logContent.appendChild(logEntry);
  logContent.scrollTop = logContent.scrollHeight;
}

function showStatus(message, type = 'info') {
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;
  statusDiv.style.display = 'block';
  setTimeout(() => { statusDiv.style.display = 'none'; }, 5000);
}

function updateVideoCount() {
  if (extractedVideos.length > 0) {
    videoCountDiv.textContent = `已采集 ${extractedVideos.length} 个视频`;
    videoCountDiv.classList.add('show');
    sendBtn.disabled = false;
  } else {
    videoCountDiv.classList.remove('show');
    sendBtn.disabled = true;
  }
}

function updateSourceInfo() {
  if (currentPageType) {
    const sourceText = currentPageType === 'search' ? '搜索页面' : '首页';
    let html = `<span class="source-type">采集来源: ${sourceText}</span>`;
    if (currentKeyword) {
      html += ` | 关键词: <span class="keyword">"${currentKeyword}"</span>`;
    }
    sourceInfoDiv.innerHTML = html;
    sourceInfoDiv.classList.add('show');
  } else {
    sourceInfoDiv.classList.remove('show');
  }
}

function updatePortStatus(connected, port) {
  if (connected) {
    portStatus.innerHTML = `<span style="color:#4CAF50">● API 已连接 (端口 ${port})</span>`;
  } else {
    portStatus.innerHTML = '<span style="color:#F44336">● API 未连接</span>';
  }
}

// 自动探测端口
async function autoDiscover() {
  addLog('正在探测 API 服务器...', 'info');
  try {
    const response = await chrome.runtime.sendMessage({ action: 'discoverPort' });
    if (response && response.port) {
      addLog(`找到 API 服务器: 端口 ${response.port}`, 'success');
      updatePortStatus(true, response.port);
      return response.port;
    } else {
      addLog('未找到 API 服务器', 'warning');
      updatePortStatus(false, null);
      return null;
    }
  } catch (e) {
    addLog('端口探测失败: ' + e.message, 'error');
    updatePortStatus(false, null);
    return null;
  }
}

// 页面加载时自动探测
autoDiscover();

extractBtn.addEventListener('click', async () => {
  extractBtn.disabled = true;
  extractBtn.innerHTML = '<span class="loading"></span> 采集中...';
  addLog('开始采集视频数据', 'info');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    addLog('获取当前标签页', 'info', { url: tab.url, id: tab.id });

    if (!tab.url.includes('bilibili.com')) {
      addLog('不在B站页面', 'error', { currentUrl: tab.url });
      showStatus('请在B站页面使用此插件', 'error');
      extractBtn.disabled = false;
      extractBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        采集视频数据
      `;
      return;
    }

    const isSearchPage = tab.url.includes('search.bilibili.com');
    addLog('页面类型: ' + (isSearchPage ? '搜索页面' : '首页'), 'info');

    const response = await chrome.tabs.sendMessage(tab.id, { action: 'extractVideos' });
    addLog('采集响应', 'info', { videoCount: response?.videos?.length || 0 });

    if (response && response.videos && response.videos.length > 0) {
      extractedVideos = response.videos;
      currentPageType = response.pageType || 'homepage';
      currentKeyword = response.keyword || '';
      updateVideoCount();
      updateSourceInfo();
      addLog('采集成功', 'success', { count: extractedVideos.length, sample: extractedVideos[0] });
      showStatus(`成功采集 ${extractedVideos.length} 个视频`, 'success');
    } else {
      addLog('未找到视频数据', 'error');
      showStatus('未找到视频数据，请确保页面已加载完成', 'error');
    }
  } catch (error) {
    addLog('采集失败', 'error', { error: error.message });
    showStatus('采集失败，请刷新页面后重试', 'error');
  }

  extractBtn.disabled = false;
  extractBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
    采集视频数据
  `;
});

sendBtn.addEventListener('click', async () => {
  if (extractedVideos.length === 0) {
    showStatus('请先采集视频数据', 'error');
    return;
  }

  sendBtn.disabled = true;
  sendBtn.innerHTML = '<span class="loading"></span> 发送中...';
  addLog('开始发送数据', 'info', { count: extractedVideos.length });

  try {
    const response = await chrome.runtime.sendMessage({
      action: 'sendToLocalApp',
      videos: extractedVideos
    });

    if (response && response.success) {
      addLog('发送成功', 'success', { data: response.data });
      showStatus('数据已成功发送', 'success');
    } else {
      addLog('发送失败', 'error', { error: response?.error });
      showStatus('发送失败: ' + (response?.error || '未知错误'), 'error');
    }
  } catch (error) {
    addLog('发送异常', 'error', { error: error.message });
    showStatus('发送失败，请确保 API 服务器正在运行', 'error');
  }

  sendBtn.disabled = false;
  sendBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
    发送到本地应用
  `;
});

clearBtn.addEventListener('click', () => {
  extractedVideos = [];
  currentPageType = '';
  currentKeyword = '';
  updateVideoCount();
  updateSourceInfo();
  showStatus('数据已清空', 'info');
  addLog('已清空数据', 'info');
});

clearLogBtn.addEventListener('click', () => {
  logContent.innerHTML = '';
});

addLog('插件已加载', 'info');
