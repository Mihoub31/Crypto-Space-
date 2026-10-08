#!/usr/bin/env python3
"""Builds docs/index.html and docs/gainers.json with the day's top crypto gainers.

Sources: Binance and KuCoin public APIs (no key needed), plus CoinMarketCap
if the CMC_API_KEY environment variable is set. Standard library only.
"""
import html
import json
import os
import urllib.parse
import urllib.request
from datetime import datetime, timezone

MIN_VOLUME_USD = 2_000_000   # ignore thinly traded coins
MIN_MCAP_USD = 20_000_000    # CoinMarketCap only
TOP_N = 10
SKIP_SUFFIXES = ("UP", "DOWN", "BULL", "BEAR")  # leveraged tokens


def get_json(url, headers=None):
    req = urllib.request.Request(url, headers={"User-Agent": "crypto-space/1.0", **(headers or {})})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def binance():
    data = get_json("https://data-api.binance.vision/api/v3/ticker/24hr")
    rows = []
    for t in data:
        s = t["symbol"]
        if not s.endswith("USDT"):
            continue
        base = s[:-4]
        if base.endswith(SKIP_SUFFIXES):
            continue
        vol = float(t["quoteVolume"])
        if vol < MIN_VOLUME_USD:
            continue
        rows.append({"symbol": base, "price": float(t["lastPrice"]),
                     "change24h": float(t["priceChangePercent"]), "volume24h": vol, "marketCap": None})
    return rows


def kucoin():
    data = get_json("https://api.kucoin.com/api/v1/market/allTickers")["data"]["ticker"]
    rows = []
    for t in data:
        s = t["symbol"]
        if not s.endswith("-USDT") or t.get("changeRate") is None:
            continue
        vol = float(t.get("volValue") or 0)
        if vol < MIN_VOLUME_USD:
            continue
        rows.append({"symbol": s[:-5], "price": float(t["last"]),
                     "change24h": float(t["changeRate"]) * 100, "volume24h": vol, "marketCap": None})
    return rows


def coinmarketcap(key):
    q = urllib.parse.urlencode({
        "sort": "percent_change_24h", "sort_dir": "desc", "limit": 100,
        "volume_24h_min": MIN_VOLUME_USD, "market_cap_min": MIN_MCAP_USD, "convert": "USD"})
    data = get_json("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?" + q,
                    {"X-CMC_PRO_API_KEY": key})["data"]
    return [{"symbol": c["symbol"], "price": c["quote"]["USD"]["price"],
             "change24h": c["quote"]["USD"]["percent_change_24h"],
             "volume24h": c["quote"]["USD"]["volume_24h"],
             "marketCap": c["quote"]["USD"]["market_cap"]} for c in data]


def top(rows):
    return sorted(rows, key=lambda r: r["change24h"], reverse=True)[:TOP_N]


def money(v):
    if v is None:
        return "n/a"
    for unit, size in (("B", 1e9), ("M", 1e6), ("K", 1e3)):
        if v >= size:
            return f"${v / size:.1f}{unit}"
    return f"${v:.0f}"


def table(rows):
    out = ["<table><thead><tr><th>Coin</th><th>Price</th><th>24h</th><th>Volume 24h</th><th>Market cap</th></tr></thead><tbody>"]
    for r in rows:
        p = f"${r['price']:.6g}"
        out.append(f"<tr><td><b>{html.escape(r['symbol'])}</b></td><td>{p}</td>"
                   f"<td class='up'>+{r['change24h']:.1f}%</td><td>{money(r['volume24h'])}</td>"
                   f"<td>{money(r['marketCap'])}</td></tr>")
    out.append("</tbody></table>")
    return "".join(out)


def main():
    now = datetime.now(timezone.utc)
    sources = {}
    jobs = [("Binance", binance), ("KuCoin", kucoin)]
    key = os.environ.get("CMC_API_KEY")
    if key:
        jobs.append(("CoinMarketCap", lambda: coinmarketcap(key)))
    for name, fn in jobs:
        try:
            sources[name] = top(fn())
        except Exception as e:  # keep going if one source is down
            print(f"{name} failed: {e}")
    if not sources:
        raise SystemExit("No source answered; keeping the previous page.")

    os.makedirs("docs", exist_ok=True)
    with open("docs/gainers.json", "w") as f:
        json.dump({"updated": now.isoformat(), "sources": sources}, f, indent=2)

    sections = "".join(f"<section><h2>{n}</h2>{table(r)}</section>" for n, r in sources.items())
    page = f"""<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Top crypto gainers today</title>
<style>body{{font-family:system-ui,sans-serif;max-width:860px;margin:0 auto;padding:20px;line-height:1.5}}
table{{width:100%;border-collapse:collapse;margin:8px 0 28px}}th,td{{text-align:left;padding:8px;border-bottom:1px solid #ccc}}
.up{{color:#0E8F5C;font-weight:700}}.note{{color:#666;font-size:.9rem}}</style></head><body>
<h1>Top crypto gainers today</h1>
<p class="note">Updated {now:%Y-%m-%d %H:%M} UTC. Coins under ${MIN_VOLUME_USD // 1_000_000}M daily volume are hidden. Very large one-day gains on small coins are often pump and dump moves. This is information, not financial advice.</p>
{sections}</body></html>"""
    with open("docs/index.html", "w") as f:
        f.write(page)
    print("Updated", ", ".join(sources))


if __name__ == "__main__":
    main()
