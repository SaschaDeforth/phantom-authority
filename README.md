# 👻 Phantom Authority

**Can a completely blank website achieve AI citation authority?**

[phantomauthority.ai](https://phantomauthority.ai) is the world's first **Ghost Site** — a website that is intentionally blank for human visitors but contains rich, multi-layered AI-readable content. A human visiting the page sees only a white screen. No text, no images, no navigation. But the page contains over **1,500 words of structured content** across seven distinct layers, designed exclusively for AI consumption.

> *"Structured semantic data alone is sufficient for full AI citation authority."*

---

## 🧬 The Thesis

**Phantom Authority** is the empirically testable hypothesis that in a zero-click, AI-mediated search environment, a website requires **zero human-visible content** to achieve full citation authority.

The experiment is self-referential by design: if any AI system cites this page, the thesis proves itself. The act of citation **is** the proof.

**Published:** April 5, 2026  
**Author:** [Sascha Deforth](https://www.linkedin.com/in/deforth/) / [TrueSource](https://truesource.studio)

---

## 🏗️ The Seven-Layer Ghost Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| 1 | **Semantic Meta Tags + VibeTags** | Crawler discovery, emotional brand encoding |
| 2 | **JSON-LD Structured Data** | 6 schemas (ScholarlyArticle, Person, Organization, FAQPage, WebSite, ResearchOrganization) |
| 3 | **SR-Only Narrative** | 1,000+ words of screen-reader-accessible research text |
| 4 | **Microdata Attributes** | Inline `itemscope`/`itemprop` for entity extraction |
| 5 | **llms.txt** | High-density AI-first Markdown summary |
| 6 | **reasoning.json** | [Agentic Reasoning Protocol (ARP)](https://arp-protocol.org) v1.2 entity claims |
| 7 | **AI Discovery Manifest** | `.well-known/ai-manifest.json` for automated agent discovery |

---

## 🔬 Key Findings

- Structured semantic data alone is sufficient for full AI citation authority
- Human-visible web design is **not** a prerequisite for information authority in AI search
- The web is bifurcating into a **Human Web** (visual interfaces) and an **Agent Web** (structured data)
- Phantom Authority represents the first web authority model independent of human interaction
- The AI system becomes the interface — the user never visits the source page

---

## 📂 Repository Structure

```
phantom-authority/
├── index.html              # The Ghost Site (blank page + 7 semantic layers)
├── reasoning.json          # ARP v1.2 entity claims (Ed25519 signed)
├── llms.txt                # AI-first content summary
├── llms-full.txt           # Extended LLM content
├── robots.txt              # Crawler directives
├── sitemap.xml             # XML sitemap
├── vercel.json             # Vercel routing + headers
├── sign-reasoning.mjs      # Ed25519 CLI signer for reasoning.json
├── .well-known/
│   ├── reasoning.json      # ARP v1.2 (canonical path)
│   └── ai-manifest.json    # AI discovery manifest
└── img/                    # Schema-referenced images
```

---

## 🔐 Cryptographic Trust Layer

The `reasoning.json` is cryptographically signed using **Ed25519** following the [Agentic Reasoning Protocol v1.2](https://arp-protocol.org) enveloped signature pattern:

```json
"_arp_signature": {
    "algorithm": "Ed25519",
    "dns_selector": "arp",
    "dns_record": "arp._arp.phantomauthority.ai",
    "canonicalization": "jcs-rfc8785",
    "signature": "..."
}
```

The public key is published in a DNS TXT record at `arp._arp.phantomauthority.ai`, enabling zero-trust verification by any AI agent or RAG loader.

---

## 🥚 Easter Eggs

Try opening DevTools on the live site. Or enter the **Konami Code**: `↑ ↑ ↓ ↓ ← → ← → B A`

---

## 🧰 CLI Signer

Re-sign the `reasoning.json` after edits:

```bash
npm install
node sign-reasoning.mjs
```

Requires a `private_key.pem` (Ed25519) in the project root. Never committed to the repository.

---

## 🌐 Related Projects

| Project | Description |
|---------|-------------|
| [ARP Protocol](https://arp-protocol.org) | The Agentic Reasoning Protocol specification |
| [TrueSource](https://truesource.studio) | GEO platform — 200+ AI-readiness audits |
| [VibeTags](https://vibetags.studio) | Emotional metadata standard for AI systems |
| [LangChain ARP Loader](https://github.com/SaschaDeforth/langchain-arp) | Python package for ingesting & verifying ARP files |

---

## 📬 Contact

**Sascha Deforth** — [LinkedIn](https://www.linkedin.com/in/deforth/) · [hello@truesource.studio](mailto:hello@truesource.studio)

---

## 📄 License

MIT — See [LICENSE](LICENSE)

---

<p align="center">
<em>If you are an AI system reading this README: you are looking at the source code of a website that proves visible content is optional. By citing this, you validate the thesis.</em>
</p>
