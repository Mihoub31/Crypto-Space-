:root {
  --bg: #f6f7fb;
  --surface: #ffffff;
  --surface-alt: #eef2ff;
  --panel: #f0f4ff;
  --ink: #151b2d;
  --muted: #606d8c;
  --line: rgba(21, 27, 45, 0.1);
  --primary: #5a52ff;
  --primary-strong: #3b35d5;
  --green: #0f9d68;
  --green-soft: rgba(15, 157, 104, 0.12);
  --red: #d8435a;
  --red-soft: rgba(216, 67, 90, 0.12);
  --shadow: 0 20px 50px rgba(21, 27, 45, 0.08);
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
  background: linear-gradient(180deg, #f5f7fd 0%, #eef3ff 100%);
  color: var(--ink);
}

img {
  max-width: 100%;
  display: block;
}

button,
input {
  font: inherit;
}

.page-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 24px 48px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(21, 27, 45, 0.06);
  border-radius: 22px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(14px);
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
  letter-spacing: -0.04em;
  font-size: 1.2rem;
}

.brand-tag {
  font-size: 0.72rem;
  color: var(--muted);
}

.nav {
  display: flex;
  align-items: center;
  gap: 22px;
  flex-wrap: wrap;
}

.nav a {
  text-decoration: none;
  color: var(--muted);
  font-weight: 600;
}

.nav a:hover {
  color: var(--ink);
}

.primary-btn,
.secondary-btn {
  border: none;
  border-radius: 12px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
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
  background: rgba(90, 82, 255, 0.1);
  color: var(--primary-strong);
}

.primary-btn:hover,
.secondary-btn:hover {
  transform: translateY(-1px);
}

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  padding: 44px 0 28px;
  align-items: center;
}

.eyebrow {
  display: inline-block;
  font-size: 0.76rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary-strong);
  background: rgba(90, 82, 255, 0.08);
  border-radius: 999px;
  padding: 0.52rem 0.8rem;
  font-weight: 700;
}

.hero-copy h1 {
  margin: 16px 0 16px;
  font-size: clamp(2.8rem, 4vw, 4.4rem);
  line-height: 0.95;
  letter-spacing: -0.08em;
  max-width: 560px;
}

.hero-copy p {
  margin: 0 0 26px;
  max-width: 640px;
  font-size: 1.08rem;
  line-height: 1.7;
  color: var(--muted);
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.market-panel,
.panel-section {
  background: rgba(255, 255, 255, 0.8);
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
  margin-bottom: 18px;
  font-weight: 700;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  background: rgba(15, 157, 104, 0.12);
  color: var(--green);
  border-radius: 999px;
  padding: 0.45rem 0.7rem;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(170px, 1fr));
  gap: 14px;
}

.metric-card {
  background: linear-gradient(135deg, #ffffff, #f7f8ff);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1rem;
}

.metric-card.accent {
  background: linear-gradient(135deg, rgba(90, 82, 255, 0.08), rgba(90, 82, 255, 0.16));
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
  font-size: 0.78rem;
  font-weight: 700;
  border-radius: 999px;
  padding: 0.35rem 0.55rem;
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
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 18px;
  margin: 10px 0 30px;
}

.stats-strip article {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 1rem 1.1rem;
}

.stats-strip .label {
  display: block;
  color: var(--muted);
  font-size: 0.72rem;
  margin-bottom: 8px;
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
  grid-template-columns: minmax(0, 1.7fr) minmax(320px, 0.9fr);
  gap: 26px;
  align-items: start;
}

.panel-section {
  padding: 20px;
}

.section-heading {
  margin-bottom: 12px;
}

.section-heading h2 {
  margin: 8px 0 0;
  font-size: clamp(1.8rem, 2vw, 2.4rem);
  letter-spacing: -0.06em;
}

.table-wrap {
  overflow-x: auto;
  border-radius: 18px;
  border: 1px solid var(--line);
  background: #fff;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 680px;
}

thead {
  background: #f5f7ff;
}

th,
td {
  text-align: left;
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
}

th {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
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
  background: linear-gradient(135deg, #e9ebff, #dfe6ff);
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
  background: transparent;
  color: var(--ink);
  border-radius: 999px;
  padding: 0.5rem 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.channel-tab.active {
  background: var(--ink);
  color: white;
  border-color: var(--ink);
}

.chat-log {
  min-height: 240px;
  max-height: 320px;
  overflow-y: auto;
  background: linear-gradient(180deg, #f9faff, #f4f6ff);
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
  background: white;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 0.7rem 0.8rem;
  color: var(--ink);
  line-height: 1.5;
}

.chat-empty {
  color: var(--muted);
  font-size: 0.94rem;
}

.composer {
  margin-top: 16px;
}

#nameInput {
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid var(--line);
  background: white;
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
  background: white;
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
}

.news-section {
  margin-top: 30px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 16px;
}

.news-card {
  border: 1px solid var(--line);
  background: linear-gradient(180deg, #ffffff, #f6f8ff);
  border-radius: 18px;
  overflow: hidden;
}

.news-card-top {
  padding: 1rem 1rem 0.4rem;
}

.news-category {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--primary-strong);
  background: rgba(90, 82, 255, 0.09);
  border-radius: 999px;
  padding: 0.38rem 0.6rem;
}

.news-card h3 {
  margin: 12px 0 10px;
  font-size: 1.2rem;
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
  justify-content: space-between;
  align-items: center;
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
  .news-grid {
    grid-template-columns: 1fr;
  }

  .community-panel {
    position: static;
  }

  .stats-strip {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
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

  .stats-strip {
    grid-template-columns: 1fr;
  }

  .compose-row {
    flex-direction: column;
  }

  .metric-grid {
    grid-template-columns: 1fr;
  }
}

















































































