const fallbackRows = [
  { symbol: "BTC", name: "Bitcoin", price: 64280, change24h: 1.8, volume24h: 33200000000, marketCap: 1270000000000 },
  { symbol: "ETH", name: "Ethereum", price: 3420, change24h: 2.3, volume24h: 16100000000, marketCap: 411000000000 },
  { symbol: "SOL", name: "Solana", price: 146.5, change24h: 4.2, volume24h: 3870000000, marketCap: 67000000000 },
  { symbol: "XRP", name: "XRP", price: 0.58, change24h: 1.5, volume24h: 2330000000, marketCap: 32900000000 },
  { symbol: "ADA", name: "Cardano", price: 0.67, change24h: 3.1, volume24h: 920000000, marketCap: 24000000000 },
  { symbol: "LINK", name: "Chainlink", price: 17.2, change24h: 2.6, volume24h: 560000000, marketCap: 10400000000 },
  { symbol: "ARB", name: "Arbitrum", price: 1.38, change24h: 5.4, volume24h: 540000000, marketCap: 5200000000 },
  { symbol: "DOGE", name: "Dogecoin", price: 0.17, change24h: -0.9, volume24h: 690000000, marketCap: 25000000000 },
  { symbol: "AVAX", name: "Avalanche", price: 35.2, change24h: 2.1, volume24h: 320000000, marketCap: 13200000000 },
  { symbol: "TRX", name: "Tron", price: 0.13, change24h: 1.2, volume24h: 580000000, marketCap: 12000000000 }
];

const chartSeries = {
  BTC: [42, 48, 44, 60, 58, 67, 74, 78, 82, 86, 90],
  ETH: [30, 34, 32, 40, 51, 49, 58, 62, 69, 71, 74],
  SOL: [20, 22, 28, 31, 36, 39, 44, 56, 52, 59, 63]
};

const newsItems = [
  { category: "Bitcoin", title: "Bitcoin sees stronger demand after renewed institutional flows", summary: "Spot market interest is climbing again, helping momentum build across larger-cap names.", time: "Today", link: "#" },
  { category: "Ethereum", title: "Ethereum activity rises as L2 adoption improves on mainnet", summary: "Usage and stablecoin flow remain elevated, supporting a constructive macro backdrop.", time: "Today", link: "#" },
  { category: "Regulation", title: "Crypto compliance rules increasingly guide exchange operations", summary: "Participants are adjusting their governance and reporting stacks for a more regulated environment.", time: "Yesterday", link: "#" },
  { category: "DeFi", title: "Protocols are prioritizing liquidity over short-term fee capture", summary: "User retention strategies are becoming more important than yield compression alone.", time: "Yesterday", link: "#" },
  { category: "Market", title: "High-trust tokens attract fresh capital as risk appetite improves", summary: "The market breadth continues to broaden as traders rotate from momentum names into stronger narratives.", time: "2 days ago", link: "#" },
  { category: "Security", title: "Wallet security tools are becoming standard for new crypto users", summary: "Safer account practices and better transaction previews are helping onboard new participants.", time: "2 days ago", link: "#" }
];

const channelNames = ["General", "Support", "Ideas"];

const state = {
  theme: localStorage.getItem("ledgerline-theme") || "light",
  marketRows: [],
  sortKey: "change24h",
  sortDirection: "desc",
  search: "",
  trendFilter: "all",
  activeChannel: "General",
  portfolio: JSON.parse(localStorage.getItem("ledgerline-portfolio") || "[]")
};

function formatPrice(value) {
  if (value === null || value === undefined) return "n/a";
  if (value >= 1000) return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  if (value >= 1) return `$${value.toLocaleString(undefined, { maximumFractionDigits: 4 })}`;
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 6 })}`;
}

function formatCompactNumber(value) {
  if (value === null || value === undefined) return "n/a";
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

function formatChange(value) {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${Number(value || 0).toFixed(1)}%`;
}

function savePortfolio() {
  localStorage.setItem("ledgerline-portfolio", JSON.stringify(state.portfolio));
}

function renderTheme() {
  const button = document.getElementById("themeToggle");
  if (button) button.textContent = state.theme === "dark" ? "☀️" : "🌙";
  document.body.setAttribute("data-theme", state.theme);
  localStorage.setItem("ledgerline-theme", state.theme);
}

function getVisibleRows() {
  const rows = [...state.marketRows];
  const filtered = rows.filter((row) => {
    const matchSearch = row.symbol.toLowerCase().includes(state.search.trim().toLowerCase());
    const matchTrend = state.trendFilter === "all" ||
      (state.trendFilter === "up" && row.change24h >= 0) ||
      (state.trendFilter === "down" && row.change24h < 0);
    return matchSearch && matchTrend;
  });

  return filtered.sort((a, b) => {
    const left = a[state.sortKey];
    const right = b[state.sortKey];

    if (typeof left === "string" && typeof right === "string") {
      return state.sortDirection === "asc" ? left.localeCompare(right) : right.localeCompare(left);
    }

    const diff = Number(left) - Number(right);
    return state.sortDirection === "asc" ? diff : -diff;
  });
}

function getTopEntry(rows) {
  if (!rows || !rows.length) return null;
  return [...rows].sort((a, b) => b.change24h - a.change24h)[0];
}

function renderGainers(data) {
  const rows = data?.rows || fallbackRows;
  state.marketRows = rows.slice(0, 12).sort((a, b) => b.change24h - a.change24h);

  const tableBody = document.getElementById("gainersTableBody");
  if (!tableBody) return;

  const visibleRows = getVisibleRows();
  tableBody.innerHTML = visibleRows.map((entry) => {
    const trendClass = entry.change24h >= 0 ? "row-up" : "row-down";
    const badge = entry.symbol.slice(0, 2).toUpperCase();
    const isSelected = window.location.hash === `#coin/${entry.symbol}`;
    return `
      <tr data-symbol="${entry.symbol}" class="${isSelected ? "selected-row" : ""}">
        <td>
          <div class="coin-cell">
            <span class="coin-badge">${badge}</span>
            <button class="symbol-button" type="button" data-symbol="${entry.symbol}">${entry.symbol}</button>
          </div>
        </td>
        <td>${formatPrice(entry.price)}</td>
        <td class="${trendClass}">${formatChange(entry.change24h)}</td>
        <td>${formatCompactNumber(entry.volume24h)}</td>
        <td>${formatCompactNumber(entry.marketCap || entry.volume24h * 2.5)}</td>
      </tr>
    `;
  }).join("");

  tableBody.querySelectorAll(".symbol-button").forEach((button) => {
    button.addEventListener("click", () => {
      const symbol = button.dataset.symbol;
      window.location.hash = `coin/${symbol}`;
      loadCoinDetail(symbol);
    });
  });

  const top = getTopEntry(state.marketRows);
  const topGainer = document.getElementById("topGainer");
  const topGainerMove = document.getElementById("topGainerMove");
  if (top && topGainer) {
    topGainer.textContent = top.symbol;
    topGainerMove.textContent = formatChange(top.change24h);
  }

  const updatedEl = document.getElementById("gainerUpdated");
  const updatedTime = document.getElementById("updatedTime");
  if (updatedEl) {
    const updated = data?.updated ? new Date(data.updated) : new Date();
    updatedEl.textContent = `Updated ${updated.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}`;
  }
  if (updatedTime) {
    const updated = data?.updated ? new Date(data.updated) : new Date();
    updatedTime.textContent = updated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
}

function buildSparkline(points, color) {
  const width = 320; const height = 120; const min = Math.min(...points); const max = Math.max(...points); const range = max - min || 1;
  const coords = points.map((point, index) => {
    const x = (index / (points.length - 1)) * width;
    const y = height - ((point - min) / range) * (height - 10) - 5;
    return `${x},${y}`;
  }).join(" ");

  return `
    <svg class="sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-label="Trend line" role="img">
      <polyline fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${coords}" />
    </svg>
  `;
}

function renderCharts() {
  const chartGrid = document.getElementById("chartGrid");
  if (!chartGrid) return;

  const entries = Object.entries(chartSeries).slice(0, 3);
  chartGrid.innerHTML = entries.map(([symbol, values]) => {
    const color = symbol === "BTC" ? "#5a52ff" : symbol === "ETH" ? "#0d9d69" : "#f59e0b";
    return `
      <div class="chart-card">
        <div class="chart-header">
          <strong>${symbol}</strong>
          <span class="trend up">+${(((values[values.length - 1] - values[0]) / values[0]) * 100).toFixed(1)}%</span>
        </div>
        ${buildSparkline(values, color)}
      </div>
    `;
  }).join("");
}

function renderNews() {
  const newsGrid = document.getElementById("newsGrid");
  if (!newsGrid) return;
  newsGrid.innerHTML = newsItems.map((item) => `
    <article class="news-card">
      <div class="news-card-top">
        <span class="news-category">${item.category}</span>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
      </div>
      <div class="news-card-bottom">
        <span>${item.time}</span>
        <a href="${item.link}" class="news-link">Read more</a>
      </div>
    </article>
  `).join("");
}

function loadMessages() {
  const saved = localStorage.getItem("ledgerline-room");
  if (saved) {
    try { return JSON.parse(saved); } catch (error) { return null; }
  }
  return Object.fromEntries(channelNames.map((channel) => [channel, [{ name: "Team", text: `Welcome to ${channel}. Share your latest crypto take.` }]]));
}

async function fetchMessages() {
  try {
    const response = await fetch("/api/messages", { cache: "no-store" });
    if (!response.ok) throw new Error("Backend unavailable");
    const data = await response.json();
    return data;
  } catch (error) {
    return loadMessages();
  }
}

async function postMessage(payload) {
  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("Unable to save");
    const data = await response.json();
    return data.messages;
  } catch (error) {
    const room = loadMessages();
    room[payload.channel] = room[payload.channel] || [];
    room[payload.channel].push({ name: payload.name, text: payload.text });
    localStorage.setItem("ledgerline-room", JSON.stringify(room));
    return room;
  }
}

function renderChannelTabs() {
  const channelTabs = document.getElementById("channelTabs");
  if (!channelTabs) return;

  channelTabs.innerHTML = channelNames.map((channel) => `
    <button class="channel-tab ${channel === state.activeChannel ? "active" : ""}" type="button" data-channel="${channel}">${channel}</button>
  `).join("");

  channelTabs.querySelectorAll(".channel-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeChannel = button.dataset.channel;
      renderChannelTabs();
      renderChat();
    });
  });
}

function renderChat() {
  const chatLog = document.getElementById("chatLog");
  if (!chatLog) return;
  const room = window.__chatData || loadMessages();
  const messages = room[state.activeChannel] || [];

  chatLog.innerHTML = messages.length ? messages.map((message) => `
    <div class="chat-message">
      <strong>${message.name}</strong>
      <span>${message.text}</span>
    </div>
  `).join("") : '<div class="chat-empty">No messages yet. Start the conversation.</div>';

  chatLog.scrollTop = chatLog.scrollHeight;
}

async function sendChatMessage() {
  const messageInput = document.getElementById("messageInput");
  const nameInput = document.getElementById("nameInput");
  const text = messageInput?.value.trim();
  if (!text) return;

  const payload = {
    channel: state.activeChannel,
    name: nameInput?.value.trim() || "Guest",
    text
  };

  const nextRoom = await postMessage(payload);
  window.__chatData = nextRoom;
  renderChat();
  if (messageInput) messageInput.value = "";
}

async function loadCoinDetail(symbol) {
  const detailTitle = document.getElementById("detailTitle");
  const detailBox = document.getElementById("tokenDetail");
  if (!detailTitle || !detailBox) return;

  const row = state.marketRows.find((entry) => entry.symbol.toUpperCase() === symbol.toUpperCase()) || fallbackRows.find((entry) => entry.symbol.toUpperCase() === symbol.toUpperCase());
  if (!row) return;

  detailTitle.textContent = row.name || row.symbol;

  try {
    const response = await fetch(`/api/coin/${encodeURIComponent(row.symbol.toLowerCase())}`);
    const data = await response.json();
    const price = data?.current_price || row.price;
    const change = data?.price_change_percentage_24h || row.change24h;
    const market = data?.market_cap || row.marketCap || row.volume24h * 2.5;
    const volume = data?.total_volume || row.volume24h;

    detailBox.innerHTML = `
      <div class="token-card">
        <div class="token-head">
          <div class="token-logo">${row.symbol.slice(0, 2).toUpperCase()}</div>
          <div>
            <h3>${data?.name || row.name || row.symbol}</h3>
            <div class="trend ${change >= 0 ? "up" : "down"}">${formatChange(change)}</div>
          </div>
        </div>
        <div class="token-stats">
          <div class="token-stat"><span>Price</span><strong>${formatPrice(price)}</strong></div>
          <div class="token-stat"><span>Market cap</span><strong>${formatCompactNumber(market)}</strong></div>
          <div class="token-stat"><span>24h volume</span><strong>${formatCompactNumber(volume)}</strong></div>
          <div class="token-stat"><span>Rank</span><strong>#${data?.market_cap_rank || "—"}</strong></div>
        </div>
      </div>
    `;
  } catch (error) {
    detailBox.innerHTML = `
      <div class="token-card">
        <div class="token-head">
          <div class="token-logo">${row.symbol.slice(0, 2).toUpperCase()}</div>
          <div>
            <h3>${row.name || row.symbol}</h3>
            <div class="trend ${row.change24h >= 0 ? "up" : "down"}">${formatChange(row.change24h)}</div>
          </div>
        </div>
        <div class="token-stats">
          <div class="token-stat"><span>Price</span><strong>${formatPrice(row.price)}</strong></div>
          <div class="token-stat"><span>Market cap</span><strong>${formatCompactNumber(row.marketCap || row.volume24h * 2.5)}</strong></div>
          <div class="token-stat"><span>24h volume</span><strong>${formatCompactNumber(row.volume24h)}</strong></div>
          <div class="token-stat"><span>Trend</span><strong>${formatChange(row.change24h)}</strong></div>
        </div>
      </div>
    `;
  }
}

function updatePortfolioList() {
  const list = document.getElementById("portfolioList");
  if (!list) return;

  if (!state.portfolio.length) {
    list.innerHTML = '<div class="portfolio-item"><div><strong>No holdings yet</strong><div class="portfolio-value">Add a position to start tracking.</div></div></div>';
    return;
  }

  const rows = state.marketRows.length ? state.marketRows : fallbackRows;

  list.innerHTML = state.portfolio.map((entry) => {
    const market = rows.find((row) => row.symbol.toUpperCase() === entry.symbol.toUpperCase()) || fallbackRows.find((row) => row.symbol.toUpperCase() === entry.symbol.toUpperCase());
    const price = market ? market.price : 0;
    const value = Number(entry.amount) * Number(price);
    const gain = value - (Number(entry.amount) * Number(entry.avgCost || 0));

    return `
      <div class="portfolio-item">
        <div>
          <strong>${entry.symbol.toUpperCase()}</strong>
          <div class="portfolio-value">${entry.amount} coins @ ${formatPrice(entry.avgCost || price)}</div>
        </div>
        <div>
          <strong>${formatPrice(value)}</strong>
          <div class="portfolio-value ${gain >= 0 ? "up" : "down"}">${gain >= 0 ? "+" : ""}${formatPrice(gain)}</div>
        </div>
      </div>
    `;
  }).join("");
}

function bindControls() {
  const themeToggle = document.getElementById("themeToggle");
  const marketSearch = document.getElementById("marketSearch");
  const trendFilter = document.getElementById("trendFilter");
  const sortSelect = document.getElementById("sortSelect");
  const sendBtn = document.getElementById("sendBtn");
  const messageInput = document.getElementById("messageInput");
  const portfolioForm = document.getElementById("portfolioForm");

  themeToggle?.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    renderTheme();
  });

  marketSearch?.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderGainers({ rows: state.marketRows });
  });

  trendFilter?.addEventListener("change", (event) => {
    state.trendFilter = event.target.value;
    renderGainers({ rows: state.marketRows });
  });

  sortSelect?.addEventListener("change", (event) => {
    state.sortKey = event.target.value;
    state.sortDirection = state.sortKey === "symbol" ? "asc" : "desc";
    renderGainers({ rows: state.marketRows });
  });

  sendBtn?.addEventListener("click", sendChatMessage);
  messageInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendChatMessage();
    }
  });

  portfolioForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const symbolInput = document.getElementById("portfolioSymbol");
    const amountInput = document.getElementById("portfolioAmount");
    const costInput = document.getElementById("portfolioCost");

    const symbol = symbolInput?.value.trim();
    const amount = Number(amountInput?.value || 0);
    const avgCost = Number(costInput?.value || 0);

    if (!symbol || !amount || !avgCost) return;

    state.portfolio.push({ symbol: symbol.toUpperCase(), amount, avgCost });
    savePortfolio();
    updatePortfolioList();
    portfolioForm.reset();
  });
}

async function initDashboard() {
  renderTheme();
  bindControls();
  renderCharts();
  renderNews();

  try {
    const response = await fetch("/api/market", { cache: "no-store" });
    if (!response.ok) throw new Error("API failed");
    const data = await response.json();
    renderGainers(data);
  } catch (error) {
    renderGainers({ rows: fallbackRows, updated: new Date().toISOString() });
  }

  updatePortfolioList();

  const hash = window.location.hash.replace(/^#\/?/, "");
  if (hash.startsWith("coin/")) {
    loadCoinDetail(hash.replace("coin/", ""));
  } else {
    loadCoinDetail("BTC");
  }

  window.addEventListener("hashchange", () => {
    const currentHash = window.location.hash.replace(/^#\/?/, "");
    if (currentHash.startsWith("coin/")) {
      loadCoinDetail(currentHash.replace("coin/", ""));
    }
  });

  window.__chatData = await fetchMessages();
  renderChannelTabs();
  renderChat();
}

window.addEventListener("DOMContentLoaded", initDashboard);



































































































































































































































































































































































































n




















































































































































































































































