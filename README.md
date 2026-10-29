const fallbackData = {
  updated: "2026-10-29T12:42:27.711104+00:00",
  sources: {
    Binance: [
      { symbol: "HUMA", price: 0.0299, change24h: 11.567, volume24h: 2766062.23146, marketCap: null },
      { symbol: "HYPE", price: 89.0, change24h: 10.353, volume24h: 54268016.44291, marketCap: null },
      { symbol: "LITEB", price: 964.18, change24h: 9.976, volume24h: 4971905.37349, marketCap: null },
      { symbol: "KAT", price: 0.00458, change24h: 7.26, volume24h: 5435321.0863, marketCap: null },
      { symbol: "HFT", price: 0.00711, change24h: 6.278, volume24h: 2328073.1448576, marketCap: null }
    ]
  }
};

const newsItems = [
  {
    category: "Bitcoin",
    title: "Bitcoin moves higher as institutional buyers return to spot markets",
    summary: "Large caps are seeing renewed demand after a brief cooldown, with traders chasing momentum across leading exchanges.",
    time: "Today",
    link: "#"
  },
  {
    category: "Ethereum",
    title: "Ethereum layer-2 activity keeps accelerating amid stronger developer usage",
    summary: "Active addresses and stablecoin flows remain elevated, reinforcing confidence in the broader network expansion story.",
    time: "Today",
    link: "#"
  },
  {
    category: "Regulation",
    title: "New compliance rules reshape how stablecoin issuers operate across regions",
    summary: "Teams are adjusting treasury and reporting processes to align with a stricter global policy environment.",
    time: "Yesterday",
    link: "#"
  },
  {
    category: "DeFi",
    title: "DeFi protocols are prioritizing liquidity incentives to attract users",
    summary: "The shift toward sustainable user acquisition is prompting stronger retention strategies and lower-fee experiments.",
    time: "Yesterday",
    link: "#"
  },
  {
    category: "Market",
    title: "Market sentiment improves as volume expands across major crypto pairs",
    summary: "Traders are leaning back into risk assets while exchange flows stay consistent and the daily average remains healthy.",
    time: "2 days ago",
    link: "#"
  },
  {
    category: "Security",
    title: "Wallet security tools are gaining adoption as user awareness rises",
    summary: "New protections such as transaction previews and address whitelists are being added to mainstream consumer products.",
    time: "2 days ago",
    link: "#"
  }
];

const channelNames = ["General", "Support", "Ideas"];

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
  return `${sign}${value.toFixed(1)}%`;
}

function getTopEntry(rows) {
  if (!rows || !rows.length) return null;
  return [...rows].sort((a, b) => b.change24h - a.change24h)[0];
}

function renderGainers(data) {
  const rows = data?.sources ? Object.values(data.sources).flat() : fallbackData.sources.Binance;
  const formattedRows = [...rows].sort((a, b) => b.change24h - a.change24h).slice(0, 6);
  const tableBody = document.getElementById("gainersTableBody");

  if (!tableBody) return;

  tableBody.innerHTML = formattedRows
    .map((entry) => {
      const className = entry.change24h >= 0 ? "row-up" : "row-down";
      const changeText = formatChange(entry.change24h);
      const badge = entry.symbol.slice(0, 2).toUpperCase();

      return `
        <tr>
          <td>
            <div class="coin-cell">
              <span class="coin-badge">${badge}</span>
              <span>${entry.symbol}</span>
            </div>
          </td>
          <td>${formatPrice(entry.price)}</td>
          <td class="${className}">${changeText}</td>
          <td>${formatCompactNumber(entry.volume24h)}</td>
          <td>${formatCompactNumber(entry.marketCap || entry.volume24h * 2.5)}</td>
        </tr>
      `;
    })
    .join("");

  const top = getTopEntry(formattedRows);
  const topGainer = document.getElementById("topGainer");
  const topGainerMove = document.getElementById("topGainerMove");

  if (topGainer && top) {
    topGainer.textContent = top.symbol;
    topGainerMove.textContent = formatChange(top.change24h);
  }

  const updatedEl = document.getElementById("gainerUpdated");
  if (updatedEl) {
    const updated = data?.updated ? new Date(data.updated) : new Date();
    updatedEl.textContent = `Updated ${updated.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}`;
  }

  const updatedTimeEl = document.getElementById("updatedTime");
  if (updatedTimeEl) {
    const updated = data?.updated ? new Date(data.updated) : new Date();
    updatedTimeEl.textContent = updated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
}

function renderNews() {
  const newsGrid = document.getElementById("newsGrid");
  if (!newsGrid) return;

  newsGrid.innerHTML = newsItems
    .map(
      (item) => `
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
      `
    )
    .join("");
}

function setupChat() {
  const channelTabs = document.getElementById("channelTabs");
  const chatLog = document.getElementById("chatLog");
  const nameInput = document.getElementById("nameInput");
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");

  if (!channelTabs || !chatLog || !nameInput || !messageInput || !sendBtn) return;

  let activeChannel = channelNames[0];
  const storageKey = "ledgerline-room";

  function getRoomData() {
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) {
        return Object.fromEntries(channelNames.map((name) => [name, [{ name: "Team", text: `Welcome to ${name}. Ask anything and share your market take.` }]]));
      }
      return JSON.parse(stored);
    } catch (error) {
      return Object.fromEntries(channelNames.map((name) => [name, [{ name: "Team", text: `Welcome to ${name}. Ask anything and share your market take.` }]]));
    }
  }

  let roomData = getRoomData();

  function saveRoomData() {
    localStorage.setItem(storageKey, JSON.stringify(roomData));
  }

  function renderTabs() {
    channelTabs.innerHTML = channelNames
      .map(
        (channel) => `
          <button class="channel-tab ${channel === activeChannel ? "active" : ""}" data-channel="${channel}" type="button">
            ${channel}
          </button>
        `
      )
      .join("");

    const buttons = channelTabs.querySelectorAll(".channel-tab");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        activeChannel = button.dataset.channel;
        renderTabs();
        renderChat();
      });
    });
  }

  function renderChat() {
    const messages = roomData[activeChannel] || [];

    chatLog.innerHTML = messages.length
      ? messages
          .map(
            (message) => `
              <div class="chat-message">
                <strong>${message.name}</strong>
                <span>${message.text}</span>
              </div>
            `
          )
          .join("")
      : '<div class="chat-empty">No messages yet. Start the conversation.</div>';

    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function sendMessage() {
    const trimmed = messageInput.value.trim();
    if (!trimmed) return;

    const name = nameInput.value.trim() || "Guest";
    roomData[activeChannel] = roomData[activeChannel] || [];
    roomData[activeChannel].push({ name, text: trimmed });
    saveRoomData();
    renderChat();
    messageInput.value = "";
    messageInput.focus();
  }

  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") { sendMessage(); }
  });

  renderTabs();
  renderChat();
}

async function init() {
  try {
    const response = await fetch("./gainers.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Market data unavailable");
    const data = await response.json();
    renderGainers(data);
  } catch (error) {
    renderGainers(fallbackData);
  }

  renderNews();
  setupChat();
}

window.addEventListener("DOMContentLoaded", init);




















































































