:root {
  --bg: #f5f7fd;
  --bg-strong: #eef3ff;
  --surface: rgba(255, 255, 255, 0.82);
  --surface-strong: #ffffff;
  --panel: #f8f9ff;
  --card: #ffffff;
  --ink: #141b2c;
  --muted: #5d6a85;
  --line: rgba(20, 27, 44, 0.12);
  --primary: #5a52ff;
  --primary-strong: #3b34d8;
  --green: #0d9d69;
  --green-soft: rgba(13, 157, 105, 0.12);
  --red: #d93d5c;
  --red-soft: rgba(217, 61, 92, 0.12);
  --shadow: 0 22px 55px rgba(15, 23, 42, 0.08);
  --shadow-soft: 0 10px 30px rgba(90, 82, 255, 0.08);
}

body[data-theme="dark"] {
  --bg: #0b1220;
  --bg-strong: #111a2a;
  --surface: rgba(17, 24, 39, 0.78);
  --surface-strong: #111827;
  --panel: #101b2d;
  --card: #111b2d;
  --ink: #edf3ff;
  --muted: #9aa9c8;
  --line: rgba(148, 163, 184, 0.18);
  --primary: #8d82ff;
  --primary-strong: #b3a8ff;
  --green: #34d399;
  --green-soft: rgba(52, 211, 153, 0.12);
  --red: #ff7b92;
  --red-soft: rgba(255, 123, 146, 0.12);
  --shadow: 0 20px 50px rgba(2, 6, 23, 0.5);
  --shadow-soft: 0 10px 30px rgba(141, 130, 255, 0.16);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background: linear-gradient(180deg, var(--bg) 0%, var(--bg-strong) 100%);
  color: var(--ink);
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

img,
svg {
  max-width: 100%;
  display: block;
}

.page-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 24px 50px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 20px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: var(--surface);
  backdrop-filter: blur(14px);
  box-shadow: var(--shadow-soft);
  position: sticky;
  top: 16px;
  z-index: 20;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: linear-gradient(140deg, var(--primary), #97a2ff);
  color: white;
  font-weight: 800;
  font-size: 1.2rem;
}

.brand-name {
  font-weight: 800;
  letter-spacing: -0.05em;
  font-size: 1.2rem;
}

.brand-tag {
  font-size: 0.72rem;
  color: var(--muted);
}

.nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 22px;
}

.nav a {
  text-decoration: none;
  color: var(--muted);
  font-weight: 600;
}

.nav a:hover {
  color: var(--ink);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-toggle {
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.12);
  color: var(--ink);
  width: 42px;
  height: 42px;
  border-radius: 12px;
  font-size: 1.1rem;
}

.primary-btn,
.secondary-btn {
  border: none;
  border-radius: 12px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.82rem 1.2rem;
  font-weight: 700;
  transition: transform 0.2s ease;
}

.primary-btn {
  background: linear-gradient(135deg, var(--primary), var(--primary-strong));
  color: white;
  box-shadow: 0 12px 20px rgba(90, 82, 255, 0.22);
}

.primary-btn.small {
  min-width: 90px;
  padding: 0.7rem 0.9rem;
}

.secondary-btn {
  color: var(--primary-strong);
  background: rgba(90, 82, 255, 0.12);
}

.primary-btn:hover,
.secondary-btn:hover,
.theme-toggle:hover {
  transform: translateY(-1px);
}

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  padding: 44px 0 26px;
  align-items: center;
}

.eyebrow {
  display: inline-block;
  padding: 0.52rem 0.8rem;
  border-radius: 999px;
  background: rgba(90, 82, 255, 0.1);
  color: var(--primary-strong);
  text-transform: uppercase;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.hero-copy h1 {
  margin: 16px 0 16px;
  max-width: 560px;
  font-size: clamp(2.8rem, 4vw, 4.5rem);
  line-height: 0.96;
  letter-spacing: -0.08em;
}

.hero-copy p {
  margin: 0 0 26px;
  max-width: 640px;
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.market-panel,
.panel-section {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 24px;
  box-shadow: var(--shadow);
}

.market-panel {
  padding: 20px;
}

.panel-heading,
.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.panel-heading {
  margin-bottom: 16px;
  font-weight: 700;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.42rem 0.68rem;
  background: rgba(13, 157, 105, 0.12);
  color: var(--green);
  font-size: 0.72rem;
  font-weight: 700;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(160px,1fr));
  gap: 14px;
}

.metric-card {
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(135deg, var(--surface-strong), rgba(90,82,255,0.04));
  padding: 1rem;
}

.metric-card.accent {
  background: linear-gradient(135deg, rgba(90,82,255,0.08), rgba(90,82,255,0.14));
}

.metric-card label {
  display: block;
  color: var(--muted);
  font-size: 0.76rem;
  margin-bottom: 10px;
}

.metric-card strong {
  display: block;
  font-size: 1.35rem;
  letter-spacing: -0.04em;
  margin-bottom: 8px;
}

.trend {
  display: inline-block;
  border-radius: 999px;
  padding: 0.35rem 0.55rem;
  font-size: 0.78rem;
  font-weight: 700;
}

.trend.up {
  background: var(--green-soft);
  color: var(--green);
}

.trend.down {
  background: var(--red-soft);
  color: var(--red);
}

.stats-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(170px,1fr));
  gap: 18px;
  margin: 8px 0 30px;
}

.stats-strip article {
  padding: 1rem 1.1rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: var(--shadow-soft);
}

.stats-strip .label {
  display: block;
  margin-bottom: 8px;
  color: var(--muted);
  font-size: 0.72rem;
}

.stats-strip strong {
  display: block;
  font-size: 1.2rem;
  letter-spacing: -0.04em;
}

.stats-strip small {
  color: var(--muted);
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0,1.7fr) minmax(320px,0.9fr);
  gap: 26px;
  align-items: start;
}

.panel-section {
  padding: 20px;
}

.section-heading {
  margin-bottom: 14px;
}

.section-heading h2 {
  margin: 8px 0 0;
  font-size: clamp(1.8rem, 2vw, 2.5rem);
  letter-spacing: -0.06em;
}

.table-controls {
  display: grid;
  grid-template-columns: repeat(3, minmax(130px,1fr));
  gap: 10px;
  margin-bottom: 12px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--muted);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.field-group input,
.field-group select {
  width: 100%;
  border: 1px solid var(--line);
  background: var(--card);
  color: var(--ink);
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--card);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 680px;
}

thead {
  background: rgba(90,82,255,0.04);
}

th,
td {
  text-align: left;
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
}

th {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.74rem;
  color: var(--muted);
}

tbody tr:last-child td {
  border-bottom: none;
}

.coin-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}

.coin-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(90,82,255,0.1), rgba(90,82,255,0.18));
  color: var(--primary-strong);
  font-size: 0.72rem;
  font-weight: 800;
}

.row-up,
.row-down {
  font-weight: 700;
}

.row-up {
  color: var(--green);
}

.row-down {
  color: var(--red);
}

.community-panel {
  position: sticky;
  top: 110px;
}

.channel-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 16px;
}

.channel-tab {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--ink);
  padding: 0.5rem 0.8rem;
  font-weight: 600;
}

.channel-tab.active {
  background: var(--ink);
  border-color: var(--ink);
  color: white;
}

.chat-log {
  min-height: 240px;
  max-height: 320px;
  overflow-y: auto;
  background: linear-gradient(180deg, rgba(90,82,255,0.03), rgba(90,82,255,0.06));
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 14px;
}

.chat-message {
  margin-bottom: 14px;
}

.chat-message strong {
  display: block;
  margin-bottom: 4px;
  font-size: 0.82rem;
}

.chat-message span {
  display: block;
  background: var(--card);
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 0.7rem 0.8rem;
  line-height: 1.5;
}

.chat-empty {
  color: var(--muted);
  font-size: 0.92rem;
}

.composer {
  margin-top: 16px;
}

#nameInput {
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid var(--line);
  background: var(--card);
  color: var(--ink);
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
}

.compose-row {
  display: flex;
  gap: 10px;
}

#messageInput {
  flex: 1;
  border: 1px solid var(--line);
  background: var(--card);
  color: var(--ink);
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
}

.chart-section {
  margin-top: 28px;
}

.chart-grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 18px;
}

.chart-card {
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(90,82,255,0.03));
}

.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.chart-header strong {
  font-size: 1.08rem;
}

.sparkline {
  width: 100%;
  height: 120px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(90,82,255,0.04), rgba(90,82,255,0));
}

.news-section {
  margin-top: 30px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 18px;
  margin-top: 14px;
}

.news-card {
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(180deg, var(--card), rgba(90,82,255,0.02));
}

.news-card-top {
  padding: 1rem 1rem 0.5rem;
}

.news-category {
  display: inline-block;
  border-radius: 999px;
  padding: 0.4rem 0.6rem;
  background: rgba(90,82,255,0.1);
  color: var(--primary-strong);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.news-card h3 {
  margin: 12px 0 10px;
  font-size: 1.15rem;
  line-height: 1.35;
  letter-spacing: -0.04em;
}

.news-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.news-card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 1rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.8rem;
}

.news-link {
  color: var(--primary-strong);
  text-decoration: none;
  font-weight: 700;
}

@media (max-width: 980px) {
  .hero,
  .content-grid,
  .chart-grid,
  .news-grid {
    grid-template-columns: 1fr;
  }

  .community-panel {
    position: static;
  }

  .stats-strip {
    grid-template-columns: repeat(2, minmax(150px,1fr));
  }
}

@media (max-width: 680px) {
  .page-shell {
    padding-left: 16px;
    padding-right: 16px;
  }

  .topbar {
    flex-wrap: wrap;
  }

  .nav {
    order: 3;
    width: 100%;
    justify-content: space-between;
  }

  .stats-strip,
  .table-controls,
  .metric-grid {
    grid-template-columns: 1fr;
  }

  .compose-row {
    flex-direction: column;
  }
}


































































































































































































































































































































