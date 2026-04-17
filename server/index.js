const express = require('express');
const http = require('http');
const https = require('https');
const { WebSocketServer } = require('ws');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const app = express();
const server = http.createServer(app);

// WebSocket server - no path matching, handles upgrade at root
const wss = new WebSocketServer({ server, path: '/ws' });

// 确保图片存储目录存在
const IMAGES_DIR = path.join(__dirname, 'images');
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// 静态文件服务：让前端可以通过 /images/xxx.jpg 访问本地图片
app.use('/images', express.static(IMAGES_DIR));

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ---- 图片下载工具 ----

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const extMatch = url.match(/\.(jpg|jpeg|png|gif|webp)/i);
    const ext = extMatch ? extMatch[1] : 'jpg';
    const filename = `thumb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filepath = path.join(IMAGES_DIR, filename);

    protocol.get(url, { headers: { 'Referer': 'https://www.bilibili.com/', 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // 跟随重定向
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const stream = fs.createWriteStream(filepath);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve(`/images/${filename}`);
      });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function processVideoThumbnails(videos) {
  const processed = [];
  for (const video of videos) {
    try {
      if (video.thumbnail && video.thumbnail.startsWith('http')) {
        const localUrl = await downloadImage(video.thumbnail);
        processed.push({ ...video, thumbnail: localUrl });
      } else {
        processed.push(video);
      }
    } catch (err) {
      console.error(`[图片] 下载失败: ${video.thumbnail} - ${err.message}`);
      processed.push(video); // 保留原始URL作为降级
    }
  }
  return processed;
}

// ---- State ----
let pendingSearch = null;
const wsClients = new Set();

// ---- REST API ----

// Plugin sends extracted videos here
app.post('/api/videos', async (req, res) => {
  const videos = req.body;
  console.log(`[API] 收到视频数据: ${Array.isArray(videos) ? videos.length : 0} 条`);

  // 下载缩略图到本地，替换CDN URL为本地路径
  const processedVideos = await processVideoThumbnails(videos);

  // Broadcast to all connected WebSocket clients (frontend)
  const payload = JSON.stringify({ type: 'searchResults', data: processedVideos });
  wsClients.forEach((client) => {
    if (client.readyState === 1) {
      // WebSocket.OPEN
      client.send(payload);
    }
  });

  // Clear pending search after results are received
  if (pendingSearch) {
    console.log(`[API] 搜索完成，清除关键词: "${pendingSearch}"`);
    pendingSearch = null;
  }

  res.json({ success: true, count: Array.isArray(videos) ? videos.length : 0 });
});

// Plugin polls this to check for pending searches
app.get('/api/pending-search', (req, res) => {
  res.json({ keyword: pendingSearch || null });
});

// Frontend can also submit a search via REST (fallback)
app.post('/api/search', (req, res) => {
  const { keyword } = req.body;
  if (!keyword || !keyword.trim()) {
    return res.status(400).json({ error: '关键词不能为空' });
  }
  pendingSearch = keyword.trim();
  console.log(`[API] 新搜索请求: "${pendingSearch}"`);
  res.json({ success: true, keyword: pendingSearch });
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', pendingSearch, wsClients: wsClients.size });
});

// ---- WebSocket ----

wss.on('connection', (ws) => {
  wsClients.add(ws);
  console.log(`[WS] 新客户端连接，当前连接数: ${wsClients.size}`);

  // Send current state on connect
  ws.send(JSON.stringify({ type: 'connected', pendingSearch }));

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw);
      if (msg.type === 'search' && msg.keyword) {
        pendingSearch = msg.keyword.trim();
        console.log(`[WS] 收到搜索请求: "${pendingSearch}"`);

        // Acknowledge
        ws.send(JSON.stringify({ type: 'searchAck', keyword: pendingSearch }));
      }
    } catch (e) {
      console.error('[WS] 解析消息失败:', e.message);
    }
  });

  ws.on('close', () => {
    wsClients.delete(ws);
    console.log(`[WS] 客户端断开，当前连接数: ${wsClients.size}`);
  });
});

// ---- Start ----

server.listen(PORT, () => {
  console.log(`\n====================================`);
  console.log(`  B站视频采集 API 服务器已启动`);
  console.log(`  REST API:  http://localhost:${PORT}`);
  console.log(`  WebSocket: ws://localhost:${PORT}/ws`);
  console.log(`====================================\n`);
});
