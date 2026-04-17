// 判断当前页面类型
function getPageType() {
  const url = window.location.href;
  if (url.includes('search.bilibili.com')) {
    return 'search';
  }
  return 'homepage';
}

// 从URL或页面获取搜索关键词
function extractSearchKeyword() {
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get('keyword') || urlParams.get('query') || urlParams.get('wd');

  if (keyword) {
    return decodeURIComponent(keyword);
  }

  const searchInput = document.querySelector('.search-input-el') ||
                       document.querySelector('input[type="text"][class*="search"]') ||
                       document.querySelector('.nav-search-input');

  if (searchInput && searchInput.value) {
    return searchInput.value.trim();
  }

  const titleMatch = document.title.match(/(.+?)\s*[-_|]/);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1].trim();
  }

  return '';
}

function getCollectedAt() {
  return Date.now();
}

// 等待元素出现在页面中
function waitForElements(selector, timeout = 5000) {
  return new Promise((resolve) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      resolve(elements);
      return;
    }

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll(selector);
      if (els.length > 0) {
        observer.disconnect();
        resolve(els);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    setTimeout(() => {
      observer.disconnect();
      resolve(document.querySelectorAll(selector));
    }, timeout);
  });
}

// 安全获取文本
function safeText(el) {
  if (!el) return '';
  return (el.textContent || el.innerText || '').trim();
}

// 安全获取属性
function safeAttr(el, attr) {
  if (!el) return '';
  return el.getAttribute(attr) || '';
}

// === 搜索页面提取：多策略选择器 ===

function findVideoCardsOnSearch() {
  // 策略1: 标准 bili-video-card
  let cards = document.querySelectorAll('.bili-video-card');
  if (cards.length > 0) return cards;

  // 策略2: 搜索结果容器中的 video-list-item
  cards = document.querySelectorAll('.video-list-item');
  if (cards.length > 0) return cards;

  // 策略3: 搜索页面 video 卡片（含 video-card class）
  cards = document.querySelectorAll('.video-card');
  if (cards.length > 0) return cards;

  // 策略4: 包含 BV 链接的文章/section 容器
  const bvLinks = document.querySelectorAll('a[href*="video/BV"]');
  if (bvLinks.length > 0) {
    // 找到每个 BV 链接的最外层卡片容器
    const cardSet = new Set();
    bvLinks.forEach(link => {
      // 向上查找卡片容器（通常在 3-6 层内）
      let parent = link.parentElement;
      for (let i = 0; i < 8 && parent; i++) {
        if (parent.tagName === 'DIV' && (parent.className.includes('card') || parent.className.includes('item') || parent.querySelector('img'))) {
          // 确保这个容器没有被重复添加
          let isDuplicate = false;
          for (const existing of cardSet) {
            if (existing.contains(parent) || parent.contains(existing)) {
              // 保留更外层的那个
              if (existing.contains(parent)) {
                cardSet.delete(existing);
                cardSet.add(parent);
              }
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) cardSet.add(parent);
          break;
        }
        parent = parent.parentElement;
      }
    });
    if (cardSet.size > 0) return cardSet;
  }

  // 策略5: 包含图片和标题的通用卡片
  cards = document.querySelectorAll('.media-card, .search-video-card, [class*="video-item"], [class*="VideoCard"]');
  if (cards.length > 0) return cards;

  return [];
}

function extractTitleFromCard(card) {
  // 尝试多种标题选择器
  const selectors = [
    '.bili-video-card__info--tit a',
    '.bili-video-card__info--tit',
    '.video-card__title a',
    '.video-card__title',
    'a[title][href*="video/BV"]',
    'a[href*="video/BV"] h3',
    'a[href*="video/BV"]',
    '.title',
    'h3 a',
    'h3',
    '[class*="title"] a',
    '[class*="title"]'
  ];

  for (const sel of selectors) {
    const el = card.querySelector(sel);
    if (el) {
      // 优先用 title 属性，避免干扰文字
      const title = safeAttr(el, 'title') || safeText(el);
      if (title && title !== '稍后再看' && title.length > 1) return title;
    }
  }
  return '';
}

function extractThumbnailFromCard(card) {
  const selectors = [
    '.bili-video-card__cover img',
    '.bili-video-card__image img',
    '.video-card__cover img',
    '.cover img',
    '[class*="cover"] img',
    '[class*="image"] img',
    'img[src*="hdslb"]',
    'img[src*="bfs"]',
    'img[data-src*="hdslb"]',
    'img[data-src*="bfs"]',
    'img'
  ];

  for (const sel of selectors) {
    const el = card.querySelector(sel);
    if (el) {
      const src = el.src || safeAttr(el, 'data-src') || '';
      if (src && (src.includes('hdslb') || src.includes('bfs') || src.includes('bilivideo') || src.startsWith('http'))) {
        return src;
      }
    }
  }
  return '';
}

function extractViewsFromCard(card) {
  const selectors = [
    '.bili-video-card__stats--text',
    '.video-card__play',
    '.play',
    '[class*="play"]',
    '[class*="view"]',
    '[class*="watch"]',
    '[class*="stats"] span',
    '.bili-video-card__stats--item'
  ];

  for (const sel of selectors) {
    const els = card.querySelectorAll(sel);
    for (const el of els) {
      const text = safeText(el);
      // 匹配播放量格式：数字+万、纯数字等
      if (text && /^[\d,.]+\s*(万|亿)?$/.test(text)) {
        return text;
      }
      if (text && /^\d+$/.test(text) && parseInt(text) > 10) {
        return text;
      }
    }
  }

  // 尝试查找带播放图标的元素
  const svgIcons = card.querySelectorAll('svg');
  for (const svg of svgIcons) {
    const sibling = svg.nextElementSibling;
    if (sibling) {
      const text = safeText(sibling);
      if (text && /\d/.test(text)) return text;
    }
  }

  return '0';
}

function extractAuthorFromCard(card) {
  const selectors = [
    '.bili-video-card__info--owner',
    '.bili-video-card__info--author',
    '.video-card__author',
    '.author',
    '[class*="author"]',
    '[class*="up-name"]',
    '[class*="upName"]',
    '[class*="owner"]',
    'a[href*="space.bilibili.com"]'
  ];

  for (const sel of selectors) {
    const el = card.querySelector(sel);
    if (el) {
      let text = safeText(el);
      // 移除时间部分（"作者名 · 3天前" → "作者名"）
      const dotIndex = text.indexOf('·');
      if (dotIndex > 0) {
        text = text.substring(0, dotIndex).trim();
      }
      // 去掉可能的前缀图标文字
      text = text.replace(/^\s*UP\s*/, '').trim();
      if (text && text.length > 0 && text.length < 50) return text;
    }
  }

  // 尝试从空间链接提取
  const spaceLink = card.querySelector('a[href*="space.bilibili.com"]');
  if (spaceLink) {
    const text = safeText(spaceLink);
    if (text && text.length > 0 && text.length < 50) return text.trim();
  }

  return '未知UP主';
}

function extractUrlFromCard(card) {
  const selectors = [
    '.bili-video-card__image--link',
    '.bili-video-card__info--tit a',
    'a[href*="video/BV"]',
    'a[href*="bilibili.com/video"]'
  ];

  for (const sel of selectors) {
    const el = card.querySelector(sel);
    if (el && el.href) {
      return el.href;
    }
  }
  return '';
}

function extractDurationFromCard(card) {
  const selectors = [
    '.bili-video-card__stats__duration',
    '.video-card__duration',
    '[class*="duration"]',
    '[class*="time"]',
    '.time'
  ];

  for (const sel of selectors) {
    const el = card.querySelector(sel);
    if (el) {
      const text = safeText(el);
      if (text && /^\d{1,2}:\d{2}/.test(text)) return text;
    }
  }
  return '00:00';
}

// 从搜索页面提取视频数据
async function extractSearchVideos() {
  const keyword = extractSearchKeyword();
  console.log('[B站采集器] 搜索关键词:', keyword);

  // 等待视频卡片加载
  await waitForElements('.bili-video-card, .video-list-item, a[href*="video/BV"]', 5000);

  // 额外等待一小段时间确保图片加载
  await new Promise(resolve => setTimeout(resolve, 1000));

  const cards = findVideoCardsOnSearch();
  console.log('[B站采集器] 找到视频卡片数量:', cards.length);

  const videos = [];

  for (const [index, card] of [...cards].entries()) {
    try {
      const title = extractTitleFromCard(card);
      const thumbnail = extractThumbnailFromCard(card);
      const views = extractViewsFromCard(card);
      const author = extractAuthorFromCard(card);
      const url = extractUrlFromCard(card);
      const duration = extractDurationFromCard(card);

      // 至少需要标题和图片
      if (!title || !thumbnail) {
        console.warn(`[B站采集器] 卡片 ${index} 缺少关键数据:`, { title: !!title, thumbnail: !!thumbnail });
        continue;
      }

      const video = {
        id: `video_${Date.now()}_${index}`,
        title,
        thumbnail,
        views,
        danmaku: '0',
        duration,
        author,
        likeCount: '',
        url,
        source: 'search',
        keyword,
        collectedAt: getCollectedAt()
      };

      videos.push(video);
      console.log(`[B站采集器] 成功提取: ${title} | 播放:${views} | UP:${author}`);
    } catch (error) {
      console.error(`[B站采集器] 提取第 ${index} 个卡片失败:`, error);
    }
  }

  console.log('[B站采集器] 最终提取视频数量:', videos.length);
  return videos;
}

// 从首页提取视频数据
function extractHomepageVideos() {
  const videoCards = document.querySelectorAll('.bili-video-card');
  const videos = [];

  videoCards.forEach((card, index) => {
    try {
      const video = {
        id: `video_${Date.now()}_${index}`,
        title: extractTitleFromCard(card),
        thumbnail: extractThumbnailFromCard(card),
        views: extractViewsFromCard(card),
        danmaku: '0',
        duration: extractDurationFromCard(card),
        author: extractAuthorFromCard(card),
        likeCount: '',
        url: extractUrlFromCard(card),
        source: 'homepage',
        keyword: '',
        collectedAt: getCollectedAt()
      };

      if (video.title && video.thumbnail) {
        videos.push(video);
      }
    } catch (error) {
      console.error('[B站采集器] 提取视频数据失败:', error);
    }
  });

  return videos;
}

// 统一的视频提取函数
async function extractVideoData() {
  const pageType = getPageType();
  console.log('[B站采集器] 当前页面类型:', pageType);

  if (pageType === 'search') {
    return await extractSearchVideos();
  } else {
    return extractHomepageVideos();
  }
}

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractVideos') {
    extractVideoData().then(videos => {
      const pageType = getPageType();
      const keyword = pageType === 'search' ? extractSearchKeyword() : '';
      sendResponse({ videos, pageType, keyword });
    }).catch(error => {
      console.error('[B站采集器] 提取失败:', error);
      sendResponse({ videos: [], pageType: getPageType(), keyword: '', error: error.message });
    });
    return true; // 保持消息通道开启（异步响应）
  }
});

// ============================================================
// 自动搜索轮询：检测前端应用发来的搜索请求
// ============================================================

const API_BASE = 'http://localhost:3001';
let autoSearchEnabled = true;
let lastProcessedKeyword = '';
let isAutoExtracting = false;

// 从 API 服务器获取待处理的搜索关键词
async function fetchPendingSearch() {
  try {
    const res = await fetch(`${API_BASE}/api/pending-search`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.keyword || null;
  } catch (e) {
    return null;
  }
}

// 将提取的视频发送到 API 服务器
async function sendVideosToServer(videos) {
  try {
    const res = await fetch(`${API_BASE}/api/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videos)
    });
    const data = await res.json();
    console.log('[B站采集器] 自动发送结果:', data);
    return data.success;
  } catch (e) {
    console.error('[B站采集器] 自动发送失败:', e.message);
    return false;
  }
}

// 自动搜索主循环
async function autoSearchLoop() {
  if (!autoSearchEnabled || isAutoExtracting) return;

  const keyword = await fetchPendingSearch();
  if (!keyword) return;

  // 跳过已处理的关键词
  if (keyword === lastProcessedKeyword) return;

  console.log(`[B站采集器] 检测到搜索请求: "${keyword}"`);

  const currentUrl = window.location.href;
  const encodedKeyword = encodeURIComponent(keyword);

  // 判断是否已经在目标搜索页面
  const isOnCorrectPage = currentUrl.includes('search.bilibili.com') &&
    (currentUrl.includes(`keyword=${encodedKeyword}`) ||
     currentUrl.includes(`keyword=${keyword}`));

  if (isOnCorrectPage) {
    // 已在目标搜索页面，直接提取
    isAutoExtracting = true;
    lastProcessedKeyword = keyword;
    try {
      console.log('[B站采集器] 开始自动提取...');
      await waitForElements('.bili-video-card, .video-list-item, a[href*="video/BV"]', 8000);
      await new Promise(r => setTimeout(r, 1500));

      const videos = await extractSearchVideos();
      if (videos.length > 0) {
        // 用 API 服务器传来的关键词覆盖
        videos.forEach(v => { v.keyword = keyword; v.source = 'search'; });
        await sendVideosToServer(videos);
        console.log(`[B站采集器] 自动提取完成，发送了 ${videos.length} 个视频`);
      } else {
        console.warn('[B站采集器] 未提取到视频，可能页面未完全加载');
        // 重置以便下次重试
        lastProcessedKeyword = '';
      }
    } catch (e) {
      console.error('[B站采集器] 自动提取出错:', e);
      lastProcessedKeyword = '';
    } finally {
      isAutoExtracting = false;
    }
  } else if (currentUrl.includes('search.bilibili.com') || currentUrl.includes('bilibili.com')) {
    // 在B站但不在目标搜索页面，跳转
    console.log(`[B站采集器] 跳转到搜索页面: "${keyword}"`);
    lastProcessedKeyword = keyword;
    window.location.href = `https://search.bilibili.com/all?keyword=${encodedKeyword}`;
  }
}

// 启动轮询（每 3 秒检查一次）
console.log('[B站采集器] 启动自动搜索轮询...');
setInterval(autoSearchLoop, 3000);
// 首次立即执行一次
setTimeout(autoSearchLoop, 1000);

console.log('[B站采集器] 内容脚本已加载 (支持首页和搜索页面 + 自动搜索)');
