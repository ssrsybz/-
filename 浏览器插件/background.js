// 自动发现 API 服务器端口
async function discoverApiPort() {
  // 优先尝试存储的端口
  const stored = await chrome.storage.local.get('apiPort');
  if (stored.apiPort) {
    try {
      const res = await fetch(`http://localhost:${stored.apiPort}/api/health`);
      if (res.ok) return stored.apiPort;
    } catch (e) { /* 继续探测 */ }
  }

  // 按优先级探测常见端口
  const portsToTry = [3001, 3000, 3002, 8080, 8000, 5000];
  for (const port of portsToTry) {
    try {
      const res = await fetch(`http://localhost:${port}/api/health`, {
        signal: AbortSignal.timeout(1500)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'ok') {
          // 缓存找到的端口
          await chrome.storage.local.set({ apiPort: port });
          console.log(`[后台] 发现 API 服务器端口: ${port}`);
          return port;
        }
      }
    } catch (e) { /* 端口不通，继续 */ }
  }

  return null;
}

// 监听来自 popup 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendToLocalApp') {
    (async () => {
      const videos = request.videos;
      // 如果指定了端口就用指定的，否则自动发现
      let port = request.port;
      if (!port) {
        port = await discoverApiPort();
      }
      if (!port) {
        sendResponse({ success: false, error: '未找到 API 服务器，请确保服务器已启动' });
        return;
      }

      const localAppUrl = `http://localhost:${port}`;

      console.log('========== 开始发送数据 ==========');
      console.log('目标URL:', localAppUrl);
      console.log('视频数量:', videos.length);

      try {
        const response = await fetch(`${localAppUrl}/api/videos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(videos)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('========== 发送成功 ==========');
        sendResponse({ success: true, data });
      } catch (error) {
        console.error('========== 发送失败 ==========');
        console.error('错误:', error.message);
        sendResponse({ success: false, error: error.message });
      }
    })();

    return true; // 异步响应
  }

  // 端口探测请求（供 popup 调用）
  if (request.action === 'discoverPort') {
    discoverApiPort().then(port => {
      sendResponse({ port });
    });
    return true;
  }
});

console.log('[后台] B站视频采集器服务已加载');
