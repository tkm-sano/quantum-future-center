document.addEventListener("DOMContentLoaded", () => {
  // Removed strict title check so JS content can appear on all pages if host exists
  if (!document.getElementById("qf-overview-host")) return;

  // --- Inject Overview body content from JS (verbatim text) ---
  const OVERVIEW_HTML = `
  <h1>Center for Quantum Future Society Design</h1>
  <section class="qf-intro">
    <div class="qf-pull">量子技術による社会変革を先導する「デザイン拠点」</div>
  </section>

  <!-- Why Now comes immediately after the pull-quote -->
  <h2>Why Now</h2>
  <ul class="qf-statlist">
    <li class="qf-stat"><span class="qf-stat__num">E2E</span><span class="qf-stat__label">量子計算のエラー訂正が前進</span></li>
    <li class="qf-stat"><span class="qf-stat__num">TESTBED</span><span class="qf-stat__label">国際量子ネットの実証網が拡大</span></li>
    <li class="qf-stat"><span class="qf-stat__num">DEPLOY</span><span class="qf-stat__label">量子センシングの社会実装が加速</span></li>
    <li class="qf-stat"><span class="qf-stat__num">2040+</span><span class="qf-stat__label">市場は数十兆円規模へ</span></li>
  </ul>

  <h2>Research Themes</h2>
  <section class="qf-themes">
    <h3>I. Behavior Change by Quantum Technologies (4 areas)</h3>
    <ol class="qf-list qf-aligned">
      <li><span class="qf-li-term">量子セキュリティと日常行動</span><span class="qf-li-desc">量子技術の普及が人々の行動に与える影響。</span></li>
      <li><span class="qf-li-term">量子計算と意思決定様式</span><span class="qf-li-desc">社会における設計・政策決定・研究開発のプロセスが量子計算利用によりどのように変容するか。</span></li>
      <li><span class="qf-li-term">量子センシングと環境認識</span><span class="qf-li-desc">高感度センシング技術が日常的な環境認識・リスク対応行動をどのように変えるか。</span></li>
      <li><span class="qf-li-term">量子ネットワークと協働</span><span class="qf-li-desc">分散型量子計算資源の共有により、研究・産業・市民の協働様式がどう変化するか。</span></li>
    </ol>

    <h3>II. Social Transformation via Layered Behavior Change (3 areas)</h3>
    <ol class="qf-list qf-aligned">
      <li><span class="qf-li-term">制度設計と規範形成</span><span class="qf-li-desc">量子技術の普及がガバナンス・標準化・規制枠組みに与える変化。</span></li>
      <li><span class="qf-li-term">経済システム変容</span><span class="qf-li-desc">量子経済圏（量子クラウド、量子セキュア金融、量子産業サプライチェーン）の出現が既存経済に及ぼす再編効果。</span></li>
      <li><span class="qf-li-term">社会受容性変容</span><span class="qf-li-desc">人々の量子技術への理解や不安、倫理的課題を踏まえた受容ダイナミクスの研究。</span></li>
    </ol>

    <h3>III. Design of Quantum Future Society (4 areas)</h3>
    <ol class="qf-list qf-aligned">
      <li><span class="qf-li-term">量子社会基盤モデル</span><span class="qf-li-desc">量子通信網・量子計算クラウド・量子センサーネットを含む社会基盤のビジョン設計。</span></li>
      <li><span class="qf-li-term">量子都市・生活モデル</span><span class="qf-li-desc">量子技術を取り入れた都市インフラ、ライフスタイル、コミュニティ形成のデザイン。</span></li>
      <li><span class="qf-li-term">量子人材と協働エコシステム</span><span class="qf-li-desc">理工・デザイン・社会科学・政策科学を統合した人材ネットワークの形成。</span></li>
      <li><span class="qf-li-term">包摂的社会シナリオ</span><span class="qf-li-desc">量子技術の恩恵を社会全体が享受できる持続的・公平な未来社会の構想。</span></li>
    </ol>
  </section>

  <h2>Outcomes</h2>
  <ol class="qf-list qf-aligned">
    <li><span class="qf-li-term">量子インターネット実証実験</span><span class="qf-li-desc">ユースケース創出。</span></li>
    <li><span class="qf-li-term">ワークショップ等主催・共同研究・ルール形成</span><span class="qf-li-desc">標準化・国際連携。</span></li>
    <li><span class="qf-li-term">量子人材育成プログラム連動</span><span class="qf-li-desc">産官学連携による人材育成。</span></li>
  </ol>
`;

  // Prefer explicit host container; else inject only if page lacks content
  const hostEl = document.getElementById("qf-overview-host");
  if (hostEl) {
    hostEl.innerHTML = OVERVIEW_HTML;
  } else if (!document.querySelector("h1, h2")) {
    const container = document.createElement("article");
    container.id = "qf-overview";
    container.innerHTML = OVERVIEW_HTML;
    (document.querySelector("main, .content, .container, article") || document.body).prepend(container);
  }

  // Fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("h2, h3, p, li").forEach(el => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // Highlight emphasized text
  document.querySelectorAll("strong, b").forEach(el => {
    el.classList.add("quantum-glow");
  });


  // Inject related CSS
  const style = document.createElement("style");
  style.textContent = `
.fade-in { opacity: 0; transform: translateY(20px); transition: all 0.8s ease-out; }
.fade-in-visible { opacity: 1; transform: translateY(0); }
.quantum-glow{ color:#fff; text-shadow:0 0 4px rgba(255,255,255,.18); }
`;
  document.head.appendChild(style);

  // ===== Overview: cards + chips TOC + dropcap + ambient skin =====
  const h1 = document.querySelector("h1");


  // Micro ToC chips (sticky + scrollable)
  const h2s = Array.from(document.querySelectorAll("h2"));
  if (h1 && h2s.length) {
    const wrap = document.createElement("div");
    wrap.className = "qf-toc-wrap";
    const toc = document.createElement("nav");
    toc.className = "qf-toc-chips";
    toc.setAttribute("aria-label", "セクション案内");
    h2s.forEach((h2, i) => {
      if (!h2.id) h2.id = "sec-" + String(i + 1).padStart(2, "0");
      const a = document.createElement("a");
      a.href = `#${h2.id}`;
      a.textContent = `${String(i + 1).toString().padStart(2, "0")} ${h2.textContent.replace(/\s+/g, " ").trim()}`;
      toc.appendChild(a);
    });
    wrap.appendChild(toc);
    const tocAnchor = h1;
    tocAnchor.insertAdjacentElement("afterend", wrap);
  }

  // Group into decorative sections (cards)
  const allH2 = Array.from(document.querySelectorAll("h2"));
  allH2.forEach((h2, i) => {
    // Wrapper
    const wrapper = document.createElement("section");
    wrapper.className = "qf-section";
    wrapper.dataset.index = String(i + 1);

    // Insert wrapper before h2, then move nodes until next h2
    h2.parentNode.insertBefore(wrapper, h2);
    const boundary = allH2[i + 1] || null;
    // move h2 itself
    wrapper.appendChild(h2);
    // move subsequent siblings until boundary
    let cursor = wrapper.nextSibling;
    while (cursor && cursor !== boundary) {
      const next = cursor.nextSibling;
      wrapper.appendChild(cursor);
      cursor = next;
    }

    // number badge
    const badge = document.createElement("span");
    badge.className = "qf-secno";
    badge.textContent = String(i + 1).padStart(2, "0");
    h2.insertAdjacentElement("afterbegin", badge);

    // ambient halo inside each card
    const halo = document.createElement("div");
    halo.className = "qf-ambient-bg";
    wrapper.appendChild(halo);
  });

  // Active ToC highlight + progress bar
  const tocLinks = Array.from(document.querySelectorAll(".qf-toc-chips a"));
  if (tocLinks.length) {
    const headings = Array.from(document.querySelectorAll(".qf-section > h2"));
    let activeId = null;
    const setActive = (id) => {
      if (id === activeId) return;
      activeId = id;
      tocLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    headings.forEach(h => io.observe(h));

    // Reading progress bar
    const prog = document.createElement("div");
    prog.className = "qf-progress";
    document.body.appendChild(prog);
    const onScroll = () => {
      const el = document.scrollingElement || document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? (el.scrollTop / max) : 0;
      prog.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Lead paragraph drop cap (first paragraph inside first card)
  const leadP = document.querySelector(".qf-section p");
  if (leadP) leadP.classList.add("qf-lead");

  // Ambient skin behind the page
  const skin = document.createElement("div");
  skin.className = "qf-page-ambient";
  document.body.appendChild(skin);

  // Parsons-style subtle grid overlay
  const grid = document.createElement("div");
  grid.className = "qf-grid";
  document.body.appendChild(grid);

  // Extra CSS for the above
  const extra = document.createElement("style");
  extra.textContent = `
  :root{
    --accent:#ffffff; /* All-white accent */
    --accent-08: rgba(255,255,255,.08);
    --accent-12: rgba(255,255,255,.12);
    --accent-20: rgba(255,255,255,.20);
    --accent-40: rgba(255,255,255,.40);
    --fg:#ffffff;
    --bg:#0b0b0b;
    --border-c: rgba(255,255,255,.12);
    --shadow: 0 10px 24px rgba(0,0,0,.35);
    --font-sans: "Neue", "Neue Haas Grotesk Text", "Neue Haas Grotesk Display", "Helvetica Neue", Helvetica, Arial, Inter, system-ui, -apple-system, "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif;
  }
  @media (prefers-color-scheme: dark){
    :root{ --fg:#ffffff; --bg:#0b0b0b; --border-c: rgba(255,255,255,.16); }
  }
  body{color:var(--fg);background:var(--bg);font-family:var(--font-sans)}
  #qf-overview-host, #qf-overview-host h1, #qf-overview-host h2, #qf-overview-host h3, #qf-overview-host h4, #qf-overview-host h5, #qf-overview-host h6, #qf-overview-host p, #qf-overview-host li, #qf-overview-host a, #qf-overview-host strong, #qf-overview-host em, #qf-overview-host small, #qf-overview-host .qf-secno, #qf-overview-host .qf-toc-chips a { color:#fff !important; }

  /* Parsons-inspired editorial typography */
  :root{
    --step--1: clamp(.92rem, .1vw + .9rem, 1rem);
    --step-0: clamp(1rem, .2vw + .98rem, 1.1rem);
    --step-1: clamp(1.25rem, .8vw + 1rem, 1.6rem);
    --step-2: clamp(1.6rem, 1.6vw + 1.1rem, 2.2rem);
    --step-3: clamp(2.2rem, 3vw + 1rem, 3.6rem);
  }
  h1{font-size:var(--step-3);line-height:1.05;letter-spacing:.01em;text-wrap:balance}
  h2{font-size:var(--step-2);line-height:1.12;letter-spacing:.01em;text-wrap:balance}
  h3{font-size:var(--step-1);line-height:1.18}
  .qf-section p,.qf-section li{font-size:var(--step-0);line-height:1.8;letter-spacing:.005em}
  .qf-section p + p{margin-top:.85rem}
  a{color:#fff;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.35)}
  a:hover{border-bottom-color:rgba(255,255,255,.8)}


  /* ToC chips (editorial) */
  .qf-toc-wrap{position:static;top:auto;z-index:auto;padding:.35rem .45rem;border-radius:10px;background:rgba(0,0,0,.5);backdrop-filter:saturate(120%) blur(6px);border:1px solid var(--border-c);box-shadow:var(--shadow);margin:.6rem 0 1rem}
  .qf-toc-chips{display:flex;gap:.5rem;overflow-x:auto;scroll-snap-type:x proximity;padding:.2rem}
  .qf-toc-chips::-webkit-scrollbar{display:none}
  .qf-toc-chips{scrollbar-width:none}
  .qf-toc-chips a{scroll-snap-align:start;white-space:nowrap;text-transform:uppercase;letter-spacing:.06em;text-decoration:none;padding:.5rem .8rem;border-radius:6px;border:1px solid var(--border-c);font-size:.82rem;font-weight:600;color:#fff}
  .qf-toc-chips a:hover{transform:translateY(-1px)}
  .qf-toc-chips a.active{background:var(--accent-12);border-color:var(--accent)}

  /* Sections (top rule accent) */
  .qf-section{
    position:relative;border:1px solid var(--border-c);
    background:var(--bg);border-radius:10px;padding:1.3rem 1.4rem;margin:1rem 0;
    box-shadow:var(--shadow);
    border-top:6px solid var(--accent);
    transition:transform .18s ease, box-shadow .18s ease;
    max-width:min(100%,1100px);margin-left:auto;margin-right:auto
  }
  .qf-section:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(0,0,0,.45)}
  .qf-section h2{margin-top:0}
  .qf-secno{display:inline-flex;align-items:center;justify-content:center;min-width:2.1rem;height:1.5rem;border-radius:6px;border:1px solid var(--border-c);margin-right:.55rem;font-weight:600;font-size:.82rem;letter-spacing:.05em;color:#fff}
  .qf-section h3{border-left:4px solid var(--accent);padding-left:.65rem;margin-top:1rem;text-transform:uppercase;letter-spacing:.04em}
  .qf-section ul{list-style:none;padding-left:1.1rem;margin:.6rem 0}
  .qf-section ul>li{position:relative;margin:.5rem 0}
  /* Big section index */
  .qf-section{position:relative}
  .qf-section::before{
    content: attr(data-index);
    position:absolute;left:-.3rem;top:-.8rem;z-index:0;
    font-size:clamp(2.8rem,8vw,7.5rem);font-weight:700;letter-spacing:.02em;
    color:rgba(255,255,255,.06);
    line-height:1;pointer-events:none;
  }
  .qf-secno{display:none}
  .qf-section>*{position:relative;z-index:1}
  .qf-section h2{padding-left:.2rem}
  .qf-section ul>li::before{content:"■";position:absolute;left:-1.1rem;top:.05rem;opacity:.6;font-size:.6rem;color:#fff}

  /* Ambient accents */
  .qf-ambient-bg{position:absolute;inset:-2px;border-radius:12px;z-index:-1;background:
    radial-gradient(1200px 400px at 0% 0%, var(--accent-08), transparent 60%),
    radial-gradient(1000px 300px at 100% 100%, var(--accent-08), transparent 60%);filter:blur(10px)}
  .qf-page-ambient{position:fixed;inset:0;z-index:-2;pointer-events:none;background:
    radial-gradient(60vw 40vh at 18% 12%, var(--accent-08), transparent 55%),
    radial-gradient(60vw 40vh at 85% 88%, var(--accent-08), transparent 55%)}
  .qf-grid{position:fixed;inset:0;z-index:-1;pointer-events:none;background:
    linear-gradient(to right, rgba(255,255,255,.04) 1px, transparent 1px) repeat,
    linear-gradient(to bottom, rgba(255,255,255,.04) 1px, transparent 1px) repeat;
    background-size:96px 96px, 96px 96px}

  /* Drop cap */
  .qf-lead::first-letter{font-size:2.6rem;font-weight:900;float:left;line-height:1;margin:.05rem .4rem 0 0;color:#fff;text-shadow:0 0 4px rgba(255,255,255,.15)}


  /* Sticky ToC active */
  .qf-toc-chips a.active{background:var(--accent-12);border-color:var(--accent)}

  /* progress bar */
  .qf-progress{position:fixed;left:0;top:0;height:3px;width:100%;transform-origin:left center;transform:scaleX(0);background:linear-gradient(90deg,var(--accent),rgba(255,255,255,.6));z-index:1}

  .nav-open .qf-progress, .nav-open .qf-toc-wrap{ z-index:0; pointer-events:none }
  .nav-open .qf-toc-wrap{ display:none !important; }
  .nav-open .qf-progress{ opacity:0; }

  /* anchor offset for sticky nav */
  .qf-section>h2{scroll-margin-top:0}

  /* typography (Parsons-like: bold, uppercase, editorial rhythm) */
  h1{font-weight:600;letter-spacing:.02em;text-transform:uppercase}
  h2{font-weight:600;letter-spacing:.01em;text-transform:uppercase}
  h3{font-weight:600;text-transform:uppercase}

  /* reduced motion */
  @media (prefers-reduced-motion: reduce){ html{scroll-behavior:auto} .qf-section{transition:none} }
  html{scroll-behavior:smooth}

  /* Editorial elements (Parsons-inspired) */
  .qf-kicker{font-weight:600;letter-spacing:.12em;text-transform:uppercase;opacity:.9;margin:.2rem 0 .4rem}
  .qf-deck{font-size:var(--step-1);line-height:1.6;max-width:60ch;opacity:.95;margin:.6rem 0 1rem}
  .qf-pull{font-size:var(--step-1);font-weight:600;line-height:1.35;border-left:6px solid var(--accent-40);padding:.6rem .8rem;margin:1rem 0;background:rgba(255,255,255,.04)}
  .qf-list{padding-left:1.1rem;margin:.6rem 0}
  .qf-list>li{margin:.35rem 0}
  .qf-statlist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.6rem;margin:.6rem 0}
  @media (min-width: 800px){ .qf-statlist{grid-template-columns:repeat(4,1fr)} }
  .qf-stat{display:flex;flex-direction:column;gap:.2rem;border:1px solid var(--border-c);border-radius:8px;padding:.6rem .7rem;background:rgba(255,255,255,.03)}
  .qf-stat__num{font-weight:600;font-size:1rem;letter-spacing:.08em;opacity:.95}
  .qf-stat__label{font-size:.9rem;opacity:.85}
  /* Numbered aligned lists (consistent width for term/desc) */
  .qf-aligned{ --term-w:22ch; --desc-w:60ch; counter-reset:item; list-style:none; padding:0; margin:.6rem 0; max-width:calc(3ch + var(--term-w) + var(--desc-w) + 2rem); font-variant-numeric: tabular-nums }
  .qf-aligned li{ display:grid; grid-template-columns: 3ch var(--term-w) var(--desc-w); column-gap:.6rem; row-gap:.1rem; align-items:flex-start; margin:.35rem 0 }
  .qf-aligned li::before{ content: counter(item) "."; counter-increment:item; justify-self:end; align-self:flex-start; font-size:var(--step-0); line-height:1.8; padding-right:.2rem; opacity:.9 }
  .qf-li-term{ font-weight:600 }
  .qf-li-term, .qf-li-desc{ font-size:var(--step-0); line-height:1.8 }
  .qf-li-desc{ opacity:.95 }
  @media (max-width: 720px){
    .qf-aligned{ --term-w: 1fr; --desc-w: 1fr; max-width:100% }
    .qf-aligned li{ grid-template-columns: 2ch 1fr; }
    .qf-li-desc{ grid-column: 2; margin-left:.6rem }
  }
  `;
  document.head.appendChild(extra);
});