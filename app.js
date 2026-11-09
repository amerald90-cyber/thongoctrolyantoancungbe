/**
 * THỎ NGỌC - CHUYÊN GIA AN TOÀN CHO TRẺ EM
 * Main Interactive Application Script
 */

// =============================================================================
// 1. STATE & STORAGE MANAGEMENT
// =============================================================================
const STATE = {
  activeScreen: 'cover-screen', // 'cover-screen' | 'app-screen'
  activeCategory: 'all',
  userName: localStorage.getItem('thongoc_child_name') || localStorage.getItem('endy_child_name') || 'Bạn nhỏ',
  userAvatar: localStorage.getItem('thongoc_child_avatar') || localStorage.getItem('endy_child_avatar') || 'assets/avatar_boy.svg',
  hasGreeted: false,
  isSpeaking: false,
  isListening: false
};

// =============================================================================
// 2. TING SOUND EFFECT (WEB AUDIO API)
// =============================================================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// "Ting Teng" chime effect when Tho Ngoc replies
function playTingSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    // Cheerful chime: E6 (1318.5Hz) & B6 (1975.5Hz)
    osc1.frequency.setValueAtTime(1318.51, ctx.currentTime);
    osc2.frequency.setValueAtTime(1975.53, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.14, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.22);
    osc2.start(ctx.currentTime + 0.08);
    osc2.stop(ctx.currentTime + 0.45);
  } catch (e) {
    console.warn('Audio chime note error:', e);
  }
}

// =============================================================================
// 3. NAVIGATION (SWITCHING SCREENS) & THỎ NGỌC BOUNCE GREETING
// =============================================================================
function showScreen(screenId) {
  const coverScreen = document.getElementById('cover-screen');
  const appScreen = document.getElementById('app-screen');

  if (screenId === 'app-screen') {
    if (coverScreen) {
      coverScreen.classList.remove('active');
      coverScreen.style.setProperty('display', 'none', 'important');
    }
    if (appScreen) {
      appScreen.classList.add('active');
      appScreen.style.setProperty('display', 'flex', 'important');
    }
    STATE.activeScreen = 'app-screen';

    // Trigger Tho Ngoc bouncing entrance greeting if first time entering!
    if (!STATE.hasGreeted) {
      triggerThoNgocGreeting();
      STATE.hasGreeted = true;
    }

    // Focus input
    const input = document.getElementById('chat-input');
    if (input) setTimeout(() => input.focus(), 300);
  } else {
    if (appScreen) {
      appScreen.classList.remove('active');
      appScreen.style.setProperty('display', 'none', 'important');
    }
    if (coverScreen) {
      coverScreen.classList.add('active');
      coverScreen.style.setProperty('display', 'flex', 'important');
    }
    STATE.activeScreen = 'cover-screen';
  }
}
window.showScreen = showScreen;

function goToChatCategory(category) {
  showScreen('app-screen');
  setTimeout(() => {
    selectCategory(category);
  }, 250);
}
window.goToChatCategory = goToChatCategory;

// Tho Ngoc bounces out and greets first!
function triggerThoNgocGreeting() {
  const chatMascot = document.getElementById('chat-hero-mascot');
  if (chatMascot) {
    chatMascot.style.animation = 'none';
    void chatMascot.offsetWidth; // trigger reflow
    chatMascot.style.animation = 'endyBounce 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  }

  // Play chime
  playTingSound();

  // Show typing indicator briefly, then greeting
  const typing = document.getElementById('typing-indicator');
  if (typing) typing.classList.add('active');

  setTimeout(() => {
    if (typing) typing.classList.remove('active');

    const greetingText =
      `**Chào ${STATE.userName}! 👋 Mình là Thỏ Ngọc - Chuyên gia an toàn cho trẻ em 🐰🛡️**\n\n` +
      `Mình rất vui được đồng hành cùng em rèn luyện kiến thức và kỹ năng **phòng, chống tai nạn thương tích và đuối nước**:\n` +
      `• 🏊 **Phòng chống đuối nước & bơi an toàn**\n` +
      `• 🚦 **An toàn giao thông & đi qua đường an toàn**\n` +
      `• 🧯 **Phòng cháy chữa cháy & kỹ năng thoát hiểm**\n` +
      `• 🩹 **Xử lý tai nạn thương tích (hóc nghẹn, bỏng, chó cắn...)**\n` +
      `• ⚡ **An toàn điện trong gia đình và trường học**\n` +
      `• 🛡️ **Quy tắc 5 ngón tay phòng chống xâm hại & bạo lực học đường**\n\n` +
      `Em hãy bấm vào các **câu hỏi gợi ý** bên dưới hoặc gõ câu hỏi vào ô chat để trò chuyện cùng Chuyên gia Thỏ Ngọc nhé! 😊`;

    appendBotMessage(greetingText, '', true, [
      '🐰 Thỏ Ngọc là ai và giúp được gì cho em?',
      '🛟 Nếu thấy bạn rơi xuống nước thì làm gì?',
      '🚒 Cháy điện có được dội nước không?',
      '📞 Bốn số điện thoại cứu hộ khẩn cấp'
    ]);
    playTingSound();
  }, 500);
}
window.triggerEndyGreeting = triggerThoNgocGreeting;
window.triggerThoNgocGreeting = triggerThoNgocGreeting;

// =============================================================================
// 4. CATEGORIES & SUGGESTED QUESTIONS
// =============================================================================
const CATEGORY_SUGGESTIONS = {
  all: [
    '🛟 Nếu thấy bạn rơi xuống nước thì làm gì?',
    '🚒 Cháy điện có được dội nước không?',
    '🚦 Đi qua đường thế nào cho an toàn?',
    '🔍 Em bị hóc nghẹn thì sao?',
    '🐶 Gặp chó lạ làm gì?',
    '🔥 Số cứu hỏa là gì?',
    '⚡ Không tự ý nghịch điện',
    '🏊 Bị chuột rút khi bơi làm sao?',
    '🩹 Bị bỏng nước sôi làm gì?',
    '🪖 Đội mũ bảo hiểm đúng cách?'
  ],
  drowning: [
    '🛟 Nếu thấy bạn rơi xuống nước thì làm gì?',
    '🏊 Bị chuột rút khi bơi làm sao?',
    '🌊 Kỹ năng nổi ngửa tự cứu thế nào?',
    '⚠️ Tại sao không được tự ý đi bơi một mình?',
    '🆘 Khi nào cần gọi số 115 cấp cứu?',
    '🦺 Mặc áo phao khi nào?'
  ],
  traffic: [
    '🚦 Đi qua đường thế nào cho an toàn?',
    '🪖 Quy tắc đội mũ bảo hiểm đúng cách?',
    '🚴 Đi xe đạp trên đường cần nhớ gì?',
    '🟡 Đèn giao thông màu vàng phải làm sao?',
    '🚶 Đi bộ trên đường không có vỉa hè?'
  ],
  fire: [
    '🚒 Cháy điện có được dội nước không?',
    '🔥 Số cứu hỏa là gì?',
    '🧯 Cách bò thấp thoát khỏi đám khói?',
    '💨 Dùng khăn ướt bịt mũi miệng khi cháy?',
    '🏢 Thoát hiểm nhà cao tầng khi có cháy?'
  ],
  injury: [
    '🔍 Em bị hóc nghẹn thì sao?',
    '🐶 Gặp chó lạ làm gì?',
    '🩹 Bị bỏng nước sôi làm gì?',
    '🐝 Bị ong đốt xử lý thế nào?',
    '✂️ Cẩn thận với dao kéo và vật sắc nhọn',
    '📞 Gọi 111 bảo vệ trẻ em khi nào?'
  ],
  electric: [
    '⚡ Không tự ý nghịch điện',
    '💧 Tay ướt có được chạm vào ổ cắm không?',
    '⚠️ Thấy dây điện rơi xuống đất làm gì?',
    '⛈️ Tránh sét đánh khi trời mưa dông?',
    '🔌 Dây điện bị hở phải làm sao?'
  ],
  quick: [
    '📞 Bốn số điện thoại cứu hộ khẩn cấp',
    '❓ Đố em câu hỏi đúng sai về an toàn',
    '🐰 Thỏ Ngọc là ai và giúp được gì cho em?',
    '🚨 Gọi 114 nói những thông tin gì?'
  ]
};

function selectCategory(categoryKey) {
  STATE.activeCategory = categoryKey;

  // Update sidebar active buttons
  const catButtons = document.querySelectorAll('.category-btn');
  catButtons.forEach(btn => {
    if (btn.dataset.category === categoryKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update suggestions bar
  renderSuggestions(categoryKey);

  // Bot intro tip for category
  sendCategoryWelcome(categoryKey);
}

function renderSuggestions(categoryKey) {
  const bar = document.getElementById('suggestions-bar');
  if (!bar) return;

  const suggestions = CATEGORY_SUGGESTIONS[categoryKey] || CATEGORY_SUGGESTIONS.all;
  let html = `<span class="suggestions-label">⚡ Gợi ý câu hỏi cho em:</span>`;

  suggestions.forEach(text => {
    const cleanQuery = text.replace(/^[\uD800-\uDBFF\uDC00-\uDFFF\u2600-\u27BF\uFE0F\s]+/, '').trim();
    html += `<button class="suggestion-chip" onclick="sendSuggestion('${cleanQuery.replace(/'/g, "\\'")}')">${text}</button>`;
  });

  bar.innerHTML = html;
  bar.scrollLeft = 0;
}

function sendCategoryWelcome(categoryKey) {
  if (categoryKey === 'all') return;

  let tipText = '';
  let badge = '';

  switch (categoryKey) {
    case 'drowning':
      tipText = '**Chủ đề: Phòng chống đuối nước 🛟**\nEm hãy luôn nhớ: Không tự ý đi tắm ao hồ, sông suối một mình. Luôn bơi ở nơi có người lớn giám sát và biết bơi an toàn!';
      badge = 'assets/illust_drowning.png';
      break;
    case 'traffic':
      tipText = '**Chủ đề: An toàn giao thông 🚦**\nKhi ra đường, hãy luôn đi bộ trên vạch sang đường khi đèn xanh, và nhớ đội mũ bảo hiểm đạt chuẩn khi ngồi trên xe máy, xe đạp điện nhé!';
      badge = 'assets/illust_traffic.png';
      break;
    case 'fire':
      tipText = '**Chủ đề: Phòng cháy chữa cháy 🧯**\nKhi phát hiện đám cháy, hãy hô to cho người lớn, bò thấp người để tránh khói độc, dùng khăn ướt bịt mũi miệng và gọi ngay số **114**!';
      badge = 'assets/illust_electric.png';
      break;
    case 'injury':
      tipText = '**Chủ đề: Phòng tránh tai nạn thương tích 🩹**\nChuyên gia Thỏ Ngọc sẽ hướng dẫn em cách xử lý khi bị hóc dị vật, bỏng nước sôi, gặp chó lạ và gọi số bảo vệ trẻ em **111**!';
      break;
    case 'electric':
      tipText = '**Chủ đề: An toàn điện ⚡**\nTuyệt đối không chọc que sắt vào ổ cắm, không chạm vào công tắc khi tay ướt và tránh xa các trạm biến áp, dây điện đứt!';
      badge = 'assets/illust_electric.png';
      break;
    case 'quick':
      tipText = '**Chủ đề: Câu hỏi nhanh & Đố vui an toàn 💬**\nEm có thể hỏi Chuyên gia Thỏ Ngọc bất kỳ câu hỏi nào hoặc bấm nút **Đố vui** trên thanh công cụ để thử tài hiểu biết nhé!';
      break;
  }

  if (tipText) {
    setTimeout(() => {
      appendBotMessage(tipText, badge);
      playTingSound();
    }, 200);
  }
}

// =============================================================================
// 5. CHAT MESSAGING ENGINE
// =============================================================================
function getCurrentTimeStr() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

function formatMarkdown(text) {
  if (!text) return '';
  let html = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  html = html.replace(/\n•/g, '<br>•');
  return html;
}

function appendUserMessage(text) {
  const container = document.getElementById('chat-messages');
  const time = getCurrentTimeStr();

  const row = document.createElement('div');
  row.className = 'msg-row user';
  row.innerHTML = `
    <img src="${STATE.userAvatar}" alt="User" class="msg-avatar">
    <div class="msg-content-wrapper">
      <div class="msg-bubble">
        ${escapeHtml(text)}
      </div>
      <span class="msg-time">${time}</span>
    </div>
  `;

  const typingIndicator = document.getElementById('typing-indicator');
  container.insertBefore(row, typingIndicator);
  scrollChatToBottom();
}

// Trạng thái ngữ cảnh trò chuyện thông minh
const CONVERSATION_STATE = {
  lastCategory: null,
  lastItemId: null,
  lastQuery: null
};

function appendBotMessage(text, badgeImgUrl, isGreeting = false, followups = []) {
  const container = document.getElementById('chat-messages');
  const time = getCurrentTimeStr();

  const formattedHtml = formatMarkdown(text);
  const badgeHtml = badgeImgUrl ? `<img src="${badgeImgUrl}" alt="Minh họa an toàn" class="bot-illustration-img">` : '';

  let followupsHtml = '';
  if (followups && followups.length > 0) {
    const chips = followups.map(f => {
      const escaped = f.replace(/'/g, "\\'");
      return `<button class="smart-chip-btn" onclick="sendSuggestion('${escaped}')">💡 ${f}</button>`;
    }).join('');
    followupsHtml = `
      <div class="bot-smart-followups">
        <div class="smart-followup-title">
          <span>Hỏi tiếp cùng Chuyên gia Thỏ Ngọc:</span>
        </div>
        <div class="smart-followup-chips">
          ${chips}
        </div>
      </div>
    `;
  }

  const row = document.createElement('div');
  row.className = `msg-row bot ${isGreeting ? 'endy-greeting' : ''}`;
  row.innerHTML = `
    <img src="assets/avatar_tho_ngoc.jpg" alt="Thỏ Ngọc" class="msg-avatar">
    <div class="msg-content-wrapper">
      <div class="msg-bubble">
        <div class="bot-header-name">
          <span>Chuyên gia Thỏ Ngọc</span>
          <span class="bot-badge-shield">🐰🛡️</span>
        </div>
        <div class="bot-body-layout">
          <div class="bot-text-area">
            ${formattedHtml}
          </div>
          ${badgeHtml}
        </div>
        ${followupsHtml}
        <div class="msg-actions">
          <button class="msg-action-btn" onclick="speakText(this)">🔊 Đọc to</button>
          <button class="msg-action-btn" onclick="copyMsgText(this)">📋 Sao chép</button>
          <span class="msg-time" style="margin-left: auto;">${time}</span>
        </div>
      </div>
    </div>
  `;

  const typingIndicator = document.getElementById('typing-indicator');
  container.insertBefore(row, typingIndicator);
  scrollChatToBottom();
}

function scrollChatToBottom() {
  const container = document.getElementById('chat-messages');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

function handleSendMessage() {
  const input = document.getElementById('chat-input');
  if (!input) return;

  const rawText = input.value.trim();
  if (!rawText) return;

  // 1. Add user message
  appendUserMessage(rawText);
  input.value = '';

  // 2. Show typing indicator
  const typing = document.getElementById('typing-indicator');
  if (typing) typing.classList.add('active');
  scrollChatToBottom();

  // 3. Search Tho Ngoc Knowledge Base với ngữ cảnh thông minh
  setTimeout(() => {
    if (typing) typing.classList.remove('active');

    let botResponse = null;
    let badge = '';
    let followups = [];

    const searchFn = window.searchThoNgocKB || window.searchEndyKB;
    if (searchFn) {
      const match = searchFn(rawText, CONVERSATION_STATE);
      if (match && match.item) {
        botResponse = match.item.response;
        badge = match.item.badge || '';
        followups = match.followups || [];
        // Cập nhật ngữ cảnh hội thoại
        CONVERSATION_STATE.lastCategory = match.item.category;
        CONVERSATION_STATE.lastItemId = match.item.id;
        CONVERSATION_STATE.lastQuery = rawText;
      }
    }

    if (!botResponse) {
      botResponse = `Xin lỗi **${STATE.userName}**, câu hỏi của em hơi vắn tắt nên Thỏ Ngọc chưa tìm được câu trả lời chính xác nhất! 😊\n\nEm có thể hỏi chuyên gia về:\n• **Bơi lội an toàn & cứu đuối** (như: *thấy bạn đuối nước làm gì?*)\n• **An toàn giao thông** (như: *đi qua đường an toàn*, *mũ bảo hiểm*)\n• **Phòng cháy chữa cháy** (như: *cháy điện có dội nước không?*, *số 114*)\n• **Tai nạn thương tích** (như: *bị hóc nghẹn*, *bị bỏng*, *gặp chó lạ*)\n\nHoặc em hãy bấm vào các gợi ý có sẵn bên dưới nhé! ❤️`;
    }

    appendBotMessage(botResponse, badge, false, followups);
    playTingSound();
  }, 450);
}

function sendSuggestion(text) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = text;
    handleSendMessage();
  }
}

function askHotline(number) {
  showScreen('app-screen');
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = `Số điện thoại ${number} là gì?`;
    handleSendMessage();
  }
}
window.askHotline = askHotline;
window.askEndyHotline = askHotline;

function clearChat() {
  if (confirm('Em có chắc muốn xóa lịch sử trò chuyện để bắt đầu cuộc trò chuyện mới không?')) {
    const container = document.getElementById('chat-messages');
    const typing = document.getElementById('typing-indicator');
    container.innerHTML = '';
    container.appendChild(typing);

    // Xóa ngữ cảnh thông minh khi bắt đầu mới
    CONVERSATION_STATE.lastCategory = null;
    CONVERSATION_STATE.lastItemId = null;
    CONVERSATION_STATE.lastQuery = null;

    appendBotMessage(
      `Chào **${STATE.userName}**! Mình là **Thỏ Ngọc - Chuyên gia an toàn cho trẻ em 🐰🛡️**.\nEm muốn học hoặc hỏi về tình huống an toàn nào hôm nay? 😊`
    );
    playTingSound();
  }
}

function escapeHtml(string) {
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return String(string).replace(/[&<>"']/g, s => entityMap[s]);
}

function copyMsgText(btn) {
  try {
    const bubble = btn.closest('.msg-bubble');
    const textArea = bubble.querySelector('.bot-text-area');
    if (textArea) {
      navigator.clipboard.writeText(textArea.innerText).then(() => {
        const origText = btn.textContent;
        btn.textContent = '✅ Đã chép!';
        setTimeout(() => { btn.textContent = origText; }, 1500);
      });
    }
  } catch (e) {
    console.error('Copy failed:', e);
  }
}

// =============================================================================
// 6. TEXT-TO-SPEECH (READ ALOUD IN VIETNAMESE)
// =============================================================================
function speakText(btn) {
  if (!('speechSynthesis' in window)) {
    alert('Trình duyệt của em chưa hỗ trợ tính năng đọc to giọng nói.');
    return;
  }

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    btn.textContent = '🔊 Đọc to';
    return;
  }

  const bubble = btn.closest('.msg-bubble');
  const textArea = bubble.querySelector('.bot-text-area');
  if (!textArea) return;

  const textToRead = textArea.innerText.replace(/[•*#⚠️🛟🚦⚡🚒🍎🐶🩹❤️]/g, ' ');
  const utterance = new SpeechSynthesisUtterance(textToRead);
  utterance.lang = 'vi-VN';
  utterance.rate = 0.95;
  utterance.pitch = 1.05;

  btn.textContent = '⏹️ Dừng';

  utterance.onend = () => { btn.textContent = '🔊 Đọc to'; };
  utterance.onerror = () => { btn.textContent = '🔊 Đọc to'; };

  window.speechSynthesis.speak(utterance);
}

// =============================================================================
// 7. SPEECH-TO-TEXT (VOICE INPUT)
// =============================================================================
function initVoiceInput() {
  const voiceBtn = document.getElementById('btn-voice-input');
  if (!voiceBtn) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    voiceBtn.title = 'Trình duyệt chưa hỗ trợ nhận diện giọng nói';
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'vi-VN';
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceBtn.addEventListener('click', () => {
    if (STATE.isListening) {
      recognition.stop();
      return;
    }

    try {
      recognition.start();
      STATE.isListening = true;
      voiceBtn.classList.add('listening');
      voiceBtn.title = 'Đang lắng nghe bạn nói...';
    } catch (e) {
      console.warn('Speech recognition start failed:', e);
    }
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const input = document.getElementById('chat-input');
    if (input) {
      input.value = transcript;
      handleSendMessage();
    }
  };

  recognition.onend = () => {
    STATE.isListening = false;
    voiceBtn.classList.remove('listening');
    voiceBtn.title = 'Nói câu hỏi của em bằng giọng nói';
  };

  recognition.onerror = () => {
    STATE.isListening = false;
    voiceBtn.classList.remove('listening');
  };
}

// =============================================================================
// 8. SAFETY QUIZ GAME (ĐỐ VUI AN TOÀN - KHO 200 CÂU HỎI NGẪU NHIÊN)
// =============================================================================
const QUIZ_ROUND_SIZE = 10;
let currentRoundQuestions = [];
let quizIndex = 0;
let quizScore = 0;

function shuffleQuizArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function openQuiz() {
  const bank = (typeof QUIZ_BANK !== 'undefined' && QUIZ_BANK.length > 0) ? QUIZ_BANK : [];
  if (bank.length > 0) {
    const shuffled = shuffleQuizArray(bank);
    currentRoundQuestions = shuffled.slice(0, Math.min(QUIZ_ROUND_SIZE, shuffled.length));
  } else {
    currentRoundQuestions = [
      {
        q: "Khi thấy bạn không may rơi xuống nước sâu, việc em nên làm ĐẦU TIÊN là gì?",
        options: [
          "Nhảy ngay xuống nước để kéo bạn lên",
          "Hô thật to gọi người lớn và tìm vật nổi ném cho bạn",
          "Bỏ chạy về nhà không nói với ai",
          "Đứng im xem bạn bơi thế nào"
        ],
        correct: 1,
        explain: "Chính xác! Trẻ em tuyệt đối không tự nhảy xuống nước cứu bạn vì rất dễ bị kéo chìm theo. Hãy hô to và ném vật nổi!",
        category: "Đuối nước"
      }
    ];
  }

  quizIndex = 0;
  quizScore = 0;
  document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('quiz-result-container').style.display = 'none';
  renderQuizQuestion();
  openModal('quiz-modal');
}

function renderQuizQuestion() {
  const q = currentRoundQuestions[quizIndex];
  if (!q) return;

  const totalBankCount = (typeof QUIZ_BANK !== 'undefined') ? QUIZ_BANK.length : 200;
  const indicator = document.getElementById('quiz-step-indicator');
  if (indicator) {
    indicator.innerHTML = `Câu <b>${quizIndex + 1}</b> / ${currentRoundQuestions.length} <span style="margin-left: 8px; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 2px 8px; border-radius: 12px; font-size: 11px;">${q.category || 'An toàn'}</span> <span style="color: #64748b; font-size: 11px; margin-left: 4px;">• Kho ${totalBankCount} câu</span>`;
  }

  document.getElementById('quiz-question-text').textContent = q.q;

  const optContainer = document.getElementById('quiz-options-list');
  optContainer.innerHTML = '';

  const feedback = document.getElementById('quiz-feedback-box');
  feedback.style.display = 'none';

  const nextBtn = document.getElementById('quiz-next-btn');
  nextBtn.style.display = 'none';

  q.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.textContent = `${String.fromCharCode(65 + idx)}. ${optText}`;
    btn.onclick = () => selectQuizOption(idx, btn);
    optContainer.appendChild(btn);
  });
}

function selectQuizOption(chosenIdx, clickedBtn) {
  const q = currentRoundQuestions[quizIndex];
  const allBtns = document.querySelectorAll('.quiz-opt-btn');
  allBtns.forEach(b => b.disabled = true);

  const feedback = document.getElementById('quiz-feedback-box');
  const nextBtn = document.getElementById('quiz-next-btn');

  if (chosenIdx === q.correct) {
    quizScore++;
    clickedBtn.classList.add('correct');
    feedback.className = 'quiz-feedback';
    feedback.style.display = 'block';
    feedback.style.background = '#dcfce7';
    feedback.style.color = '#15803d';
    feedback.innerHTML = `🎉 <b>Chính xác!</b> ${q.explain}`;
    playTingSound();
  } else {
    clickedBtn.classList.add('wrong');
    if (allBtns[q.correct]) allBtns[q.correct].classList.add('correct');
    feedback.className = 'quiz-feedback';
    feedback.style.display = 'block';
    feedback.style.background = '#fee2e2';
    feedback.style.color = '#b91c1c';
    feedback.innerHTML = `❌ <b>Chưa đúng rồi!</b> ${q.explain}`;
  }

  nextBtn.style.display = 'flex';
  nextBtn.textContent = (quizIndex + 1 < currentRoundQuestions.length) ? 'Câu tiếp theo ➜' : 'Xem kết quả thử thách 🏆';
  nextBtn.onclick = () => {
    quizIndex++;
    if (quizIndex < currentRoundQuestions.length) {
      renderQuizQuestion();
    } else {
      showQuizResult();
    }
  };
}

function showQuizResult() {
  document.getElementById('quiz-container').style.display = 'none';
  const resContainer = document.getElementById('quiz-result-container');
  resContainer.style.display = 'block';

  const scoreText = document.getElementById('quiz-score-text');
  if (scoreText) {
    scoreText.textContent = `Em đã trả lời đúng ${quizScore} / ${currentRoundQuestions.length} câu hỏi!`;
  }

  let titleBadge = '🎖️ Danh hiệu: "Dũng Sĩ An Toàn Endy"';
  let badgeColor = '#0369a1';
  let badgeBg = '#e0f2fe';
  let badgeBorder = '#38bdf8';

  if (quizScore >= 9) {
    titleBadge = '🌟 Danh hiệu: "Kiện Tướng An Toàn Xuất Sắc"';
    badgeColor = '#854d0e';
    badgeBg = '#fef08a';
    badgeBorder = '#ca8a04';
  } else if (quizScore >= 7) {
    titleBadge = '🏅 Danh hiệu: "Chiến Binh An Toàn Thông Thái"';
    badgeColor = '#15803d';
    badgeBg = '#dcfce7';
    badgeBorder = '#22c55e';
  } else if (quizScore < 5) {
    titleBadge = '💪 Cố lên em nhé! Cùng Thỏ Ngọc luyện tập thêm nào!';
    badgeColor = '#0369a1';
    badgeBg = '#f1f5f9';
    badgeBorder = '#cbd5e1';
  }

  const badgeEl = resContainer.querySelector('.quiz-badge') || resContainer.querySelector('div[style*="border: 2px dashed"]');
  if (badgeEl) {
    badgeEl.textContent = titleBadge;
    badgeEl.style.color = badgeColor;
    badgeEl.style.background = badgeBg;
    badgeEl.style.borderColor = badgeBorder;
  }

  playTingSound();
}

function restartQuiz() {
  openQuiz();
}

// =============================================================================
// 9. PROFILE & USER PREFERENCES
// =============================================================================
function openProfileModal() {
  const nameInput = document.getElementById('input-child-name');
  if (nameInput) nameInput.value = STATE.userName;

  const choices = document.querySelectorAll('.avatar-choice');
  choices.forEach(c => {
    if (c.dataset.avatar === STATE.userAvatar) {
      c.classList.add('selected');
    } else {
      c.classList.remove('selected');
    }
  });

  openModal('profile-modal');
}

function selectAvatar(element) {
  document.querySelectorAll('.avatar-choice').forEach(c => c.classList.remove('selected'));
  element.classList.add('selected');
}

function saveProfile() {
  const nameInput = document.getElementById('input-child-name');
  const selectedAvatar = document.querySelector('.avatar-choice.selected');

  if (nameInput && nameInput.value.trim()) {
    STATE.userName = nameInput.value.trim();
    localStorage.setItem('thongoc_child_name', STATE.userName);
    localStorage.setItem('endy_child_name', STATE.userName);
  }

  if (selectedAvatar && selectedAvatar.dataset.avatar) {
    STATE.userAvatar = selectedAvatar.dataset.avatar;
    localStorage.setItem('thongoc_child_avatar', STATE.userAvatar);
    localStorage.setItem('endy_child_avatar', STATE.userAvatar);
  }

  const display = document.getElementById('user-name-display');
  if (display) display.textContent = STATE.userName;

  const avatarDisplay = document.getElementById('user-avatar-display');
  if (avatarDisplay) avatarDisplay.src = STATE.userAvatar;

  closeModal('profile-modal');
  playTingSound();
}

// =============================================================================
// 10. MODAL HELPERS
// =============================================================================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });
});

// =============================================================================
// 11. INITIALIZATION & EVENT LISTENERS
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Update Initial Profile
  const nameDisplay = document.getElementById('user-name-display');
  if (nameDisplay) nameDisplay.textContent = STATE.userName;
  const avatarDisplay = document.getElementById('user-avatar-display');
  if (avatarDisplay) avatarDisplay.src = STATE.userAvatar;

  // Cover enter button
  const btnEnterChat = document.getElementById('btn-enter-chat');
  if (btnEnterChat) {
    btnEnterChat.addEventListener('click', (e) => {
      e.stopPropagation();
      showScreen('app-screen');
    });
  }

  // Cover stage/poster click enters chat
  const coverStageClick = document.getElementById('cover-stage-click');
  if (coverStageClick) {
    coverStageClick.addEventListener('click', () => {
      showScreen('app-screen');
    });
  }

  // Mascot hero click on cover also enters chat
  const mascotHeroClick = document.getElementById('mascot-hero-click');
  if (mascotHeroClick) {
    mascotHeroClick.addEventListener('click', (e) => {
      e.stopPropagation();
      showScreen('app-screen');
    });
  }

  // Back to cover button
  const btnBackCover = document.getElementById('btn-back-cover');
  if (btnBackCover) {
    btnBackCover.addEventListener('click', () => {
      showScreen('cover-screen');
    });
  }

  const logoBackCover = document.getElementById('logo-back-cover');
  if (logoBackCover) {
    logoBackCover.addEventListener('click', () => {
      showScreen('cover-screen');
    });
  }

  // Send message events
  const btnSend = document.getElementById('btn-send-msg');
  if (btnSend) {
    btnSend.addEventListener('click', handleSendMessage);
  }

  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSendMessage();
    });
  }

  // Clear chat
  const btnClear = document.getElementById('btn-clear-chat');
  if (btnClear) {
    btnClear.addEventListener('click', clearChat);
  }

  // Category buttons
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectCategory(btn.dataset.category);
    });
  });

  // Modals buttons
  const btnQuiz = document.getElementById('btn-open-quiz');
  if (btnQuiz) btnQuiz.addEventListener('click', openQuiz);

  const btnProfile = document.getElementById('btn-profile');
  if (btnProfile) btnProfile.addEventListener('click', openProfileModal);

  const btnTips = document.getElementById('btn-open-tips');
  if (btnTips) btnTips.addEventListener('click', () => openModal('tips-modal'));

  // QR Code Modals
  const btnQrCover = document.getElementById('btn-open-qr-cover');
  if (btnQrCover) btnQrCover.addEventListener('click', () => openModal('qr-modal'));

  const btnQrApp = document.getElementById('btn-open-qr-app');
  if (btnQrApp) btnQrApp.addEventListener('click', () => openModal('qr-modal'));

  // Init Voice Input
  initVoiceInput();

  // Play subtle entrance chime after brief delay
  setTimeout(() => {
    playTingSound();
  }, 1000);
});

// =============================================================================
// 12. BẢO VỆ AN TOÀN TRẺ EM: CHẶN CHUỘT PHẢI & PHÍM F12 / DEVTOOLS (SILENT LOCK)
// =============================================================================
function initSecurityProtection() {
  // 1. Chặn chuột phải hoàn toàn (Không hiện thông báo làm phiền)
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // 2. Chặn các phím tắt F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl + Shift + I (DevTools), Ctrl + Shift + J (Console), Ctrl + Shift + C (Inspect)
    if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl + U (View Source)
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl + S (Save Page)
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });
}

initSecurityProtection();

// =============================================================================
// 13. SAO CHÉP ĐƯỜNG LINK WEB APP
// =============================================================================
function copyWebUrl(btn) {
  const url = window.location.origin && window.location.origin.startsWith('http') ? window.location.origin : 'https://thongoc-chuyengiaan-toan.vercel.app';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      const orig = btn.textContent;
      btn.textContent = '✅ Đã sao chép!';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    }).catch(() => {
      prompt('Đường link trang web:', url);
    });
  } else {
    prompt('Đường link trang web:', url);
  }
}
window.copyWebUrl = copyWebUrl;
