/*
 * QFS Scope Steps — Galaxy Design‑School (graphic stairs + abstract orbits)
 *
 * ✦ Transparent background（黒い枠なし）
 * ✦ 「研究計画」は表示しない（title-less）
 * ✦ テキストは提供文を一字一句そのまま（変更しない）
 * ✦ タイポは白、見出し hover 時のみゴールド下線（暖色はここだけ）
 * ✦ 構造：3列(Desktop) / 2列(Tablet) / 1列(Mobile)、段差オフセット（階段感）
 * ✦ 文字だけでなく、SVGで “ステップのレール” と “抽象オービット” を重ねて可視化
 * ✦ parallax（軽微）＋ prefers-reduced-motion で無効化
 */
(function(){
  'use strict';

  // ====== Provided text (verbatim) ======
  const DATA = {
    tiers: [
      {
        heading: 'I)量子技術による行動変容の研究(4分野)',
        items: [
          { term: '量子セキュリティと日常行動', desc: '量子技術の普及が人々の行動に与える影響。' },
          { term: '量子計算と意思決定様式', desc: '社会における設計・政策決定・研究開発のプロセスが量子計算利用によりどのように変容するか。' },
          { term: '量子センシングと環境認識', desc: '高感度センシング技術が日常的な環境認識・リスク対応行動をどのように変えるか。' },
          { term: '量子ネットワークと協働行動', desc: '分散型量子計算資源を共有することで、研究・産業・市⺠社会の協働様式がどう変化するか。' },
        ],
      },
      {
        heading: 'II)行動変容の積層による社会変革の研究(3分野)',
        items: [
          { term: '制度設計と規範形成', desc: '量子技術の普及がガバナンス、標準化、規制枠組みに与える変化。' },
          { term: '経済システム変容', desc: '量子経済圏(量子クラウド、量子セキュア金融、量子産業サプライチェーン)の出現が既存経済に及ぼす再編効果。' },
          { term: '社会受容性変容', desc: '人々の量子技術への理解や不安、倫理的課題を踏まえた受容ダイナミクスの研究。' },
        ],
      },
      {
        heading: 'III)量子未来社会のデザイン(4分野)',
        items: [
          { term: '量子社会基盤モデル', desc: '量子通信網、量子計算クラウド、量子センサーネットを含む社会基盤のビジョン設計。' },
          { term: '量子都市・生活モデル', desc: '量子技術を取り入れた都市インフラ、ライフスタイル、コミュニティ形成のデザイン。' },
          { term: '量子人材と協働エコシステム', desc: '理工学のみならずデザイン、社会科学、政策科学を統合した人材ネットワークの形成。' },
          { term: '包摂的社会シナリオ', desc: '量子技術による恩恵を社会全体が享受できる持続的・公平な未来社会の構想。' },
        ],
      },
    ],
  };

  // ====== Host ======
  function ensureHost(){
    let host = document.getElementById('qfs-pro');
    if(!host){
      host = document.createElement('article');
      host.id = 'qfs-pro';
      const main = document.querySelector('main') || document.body;
      const ref = main.querySelector('h1, h2');
      if (ref && ref.parentNode) ref.parentNode.insertBefore(host, ref.nextSibling);
      else main.prepend(host);
    }
    return host;
  }

  // ====== Style (white type; gold underline only on hover; SVG graphics) ======
  function injectStyleOnce(){
    const STYLE_ID = 'qfs-steps-gx-style';
    // Clean legacy styles
    ['qfs-pro-style','qfs-scope-style','qfs-steps-style','qfs-steps-galaxy-style'].forEach(id=>{
      const el = document.getElementById(id);
      if (el) el.remove();
    });

    let s = document.getElementById(STYLE_ID);
    if (!s){ s = document.createElement('style'); s.id = STYLE_ID; document.head.appendChild(s); }

    s.textContent = `
    #qfs-pro{
      --accent: #E6C47C; /* warm gold for hover underline only */
      --accentHi: #F1D89A;
      --ink: #fff;
      color: var(--ink);
      background: transparent; /* no frame */
      max-width: 1320px;
      margin: clamp(8px,3vw,36px) auto;
      padding: 0;
    }

    /* ===== Columns & steps ===== */
    #qfs-pro .qf-steps{ position:relative; }
    #qfs-pro .qf-grid{ position:relative; z-index:1; display:grid; grid-template-columns:1fr; gap: clamp(18px,2.6vw,36px); align-items:start; }
    @media (min-width: 880px){  #qfs-pro .qf-grid{ grid-template-columns: repeat(2, minmax(0,1fr)); } }
    @media (min-width: 1220px){ #qfs-pro .qf-grid{ grid-template-columns: repeat(3, minmax(0,1fr)); } }

    /* stair offsets */
    #qfs-pro .qf-group{ position:relative; }
    @media (min-width:1220px){
      #qfs-pro .qf-group:nth-child(1){ transform: translateY(28px); }
      #qfs-pro .qf-group:nth-child(2){ transform: translateY(0); }
      #qfs-pro .qf-group:nth-child(3){ transform: translateY(-28px); }
    }
    @media (min-width:880px) and (max-width:1219.98px){
      #qfs-pro .qf-group:nth-child(1){ transform: translateY(14px); }
      #qfs-pro .qf-group:nth-child(2){ transform: translateY(-14px); }
      #qfs-pro .qf-group:nth-child(3){ transform: translateY(14px); grid-column:2; }
    }

    /* ===== Headings ===== */
    #qfs-pro .qf-h3{
      position: relative; display: inline-block;
      font: 800 clamp(20px,2.6vw,30px)/1.08 "Inter", "Helvetica Neue", -apple-system, system-ui, "BIZ UDPGothic", "Noto Sans JP", sans-serif;
      letter-spacing:.012em; margin: 0 0 .55rem 0; color: var(--ink);
      text-shadow: 0 0 1px rgba(0,0,0,.30);
    }
    #qfs-pro .qf-h3::before{
      content:""; position:absolute; left:0; right:-18%; bottom:-0.46em; height:1px; opacity:.16;
      background: linear-gradient(90deg, rgba(255,255,255,.22), rgba(255,255,255,0));
    }
    #qfs-pro .qf-h3::after{
      content:""; position:absolute; left:0; right:0; bottom:-0.32em; height:2px;
      background: linear-gradient(90deg, transparent 0%, var(--accent) 12%, var(--accentHi) 50%, var(--accent) 88%, transparent 100%);
      background-size: 200% 100%;
      transform: scaleX(0); transform-origin: 0 50%; opacity: 0;
      transition: transform .45s cubic-bezier(.2,.8,.2,1), opacity .2s ease-out;
      will-change: transform, background-position;
    }
    #qfs-pro .qf-h3:hover::after{ opacity:1; transform: scaleX(1); animation: qfUnderline 1.05s linear forwards; }
    @keyframes qfUnderline{ 0%{ background-position:0% 50% } 100%{ background-position:100% 50% } }

    /* ===== Flow paragraphs ===== */
    #qfs-pro .qf-flow{ margin-top:.6rem; }
    #qfs-pro .qf-line{ margin: 0 0 .9rem 0; break-inside: avoid; }
    #qfs-pro .qf-term{
      font: 800 clamp(15px,1.6vw,19px)/1.7 "BIZ UDPGothic", "Noto Sans JP", system-ui, sans-serif;
      letter-spacing:.015em; color: var(--ink); text-shadow: 0 0 1px rgba(0,0,0,.25);
    }
    #qfs-pro .qf-colon{ font-weight:800; padding: 0 .35rem; color: var(--ink); }
    #qfs-pro .qf-desc{
      font: 500 clamp(14px,1.55vw,18px)/1.9 "BIZ UDPGothic", "Noto Sans JP", system-ui, sans-serif;
      color: var(--ink); text-shadow: 0 0 1px rgba(0,0,0,.25);
    }

    /* ===== SVG graphics (stairs & orbits) ===== */
    #qfs-pro .qf-graphic{ position:absolute; inset:0; pointer-events:none; z-index:0; will-change: transform; }
    #qfs-pro .qf-graphic .step{ fill: rgba(255,255,255,.22); }
    #qfs-pro .qf-graphic .step.thin{ height:1px; fill: rgba(255,255,255,.18); }
    #qfs-pro .qf-graphic .orbit{ fill:none; stroke: rgba(255,255,255,.28); stroke-width:1.5; stroke-linecap:round; opacity:.38;
                                  stroke-dasharray: 4 10; animation: qfDash 34s linear infinite; }
    #qfs-pro .qf-graphic .orbit.fast{ stroke-dasharray: 3 8; animation-duration: 22s; opacity:.32; }
    @keyframes qfDash{ to{ stroke-dashoffset: -420; } }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce){
      #qfs-pro .qf-graphic{ animation: none !important; transform:none !important; }
      #qfs-pro .qf-graphic .orbit{ animation: none; }
      #qfs-pro .qf-h3::after{ transition: transform .01s, opacity .2s; }
    }
    `;
  }

  // ====== Build Markup ======
  function buildHTML(){
    const parts = [];
    parts.push('<div class="qf-steps">');
    parts.push('<svg class="qf-graphic" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"></svg>');
    parts.push('<div class="qf-grid">');
    DATA.tiers.forEach(tier => {
      parts.push('<section class="qf-group">');
      parts.push(`<h3 class="qf-h3">${tier.heading}</h3>`);
      parts.push('<div class="qf-flow">');
      tier.items.forEach(it => {
        parts.push(`<p class="qf-line"><span class="qf-term">${it.term}</span><span class="qf-colon">:</span><span class="qf-desc">${it.desc}</span></p>`);
      });
      parts.push('</div>');
      parts.push('</section>');
    });
    parts.push('</div>'); // grid
    parts.push('</div>'); // steps
    return parts.join('');
  }

  // ====== Graphics (SVG) ======
  const SVG_NS = 'http://www.w3.org/2000/svg';
  function pathCubic(x1,y1, cx1,cy1, cx2,cy2, x2,y2){
    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  }

  function drawGraphics(container){
    const steps = container.querySelector('.qf-steps');
    const svg = steps.querySelector('.qf-graphic');
    const grid = steps.querySelector('.qf-grid');
    if (!svg || !grid) return;

    const hostRect = steps.getBoundingClientRect();
    const groups = Array.from(grid.querySelectorAll('.qf-group'));
    const heads  = groups.map(g => g.querySelector('.qf-h3'));

    const w = Math.max(1, Math.round(hostRect.width));
    const h = Math.max(1, Math.round(hostRect.height));
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);

    // clear
    while(svg.firstChild) svg.removeChild(svg.firstChild);

    const g = document.createElementNS(SVG_NS, 'g');

    // ---- Stepped rails: thin lines extending from each heading towards the right
    heads.forEach((h3,i)=>{
      if (!h3) return;
      const headRect = h3.getBoundingClientRect();
      const groupRect = groups[i].getBoundingClientRect();

      const y = Math.round(headRect.bottom - hostRect.top) - 2;
      const x = Math.round(groupRect.left - hostRect.left) + 6;
      const width = Math.max(12, Math.round(hostRect.width - (x + 8)));

      const r = document.createElementNS(SVG_NS, 'rect');
      r.setAttribute('x', x);
      r.setAttribute('y', y);
      r.setAttribute('width', width);
      r.setAttribute('height', 1.5);
      r.setAttribute('class', 'step thin');
      g.appendChild(r);
    });

    // ---- Abstract orbits (backcast ↔ forecast): two gentle curves across the field
    // orbit A: lower-left -> upper-right
    const p1a = {x: w*0.06, y: h*0.78};
    const p2a = {x: w*0.94, y: h*0.18};
    const c1a = {x: w*0.30, y: h*0.12};
    const c2a = {x: w*0.66, y: h*0.64};
    const pathA = document.createElementNS(SVG_NS, 'path');
    pathA.setAttribute('d', pathCubic(p1a.x,p1a.y,c1a.x,c1a.y,c2a.x,c2a.y,p2a.x,p2a.y));
    pathA.setAttribute('class','orbit');
    g.appendChild(pathA);

    // orbit B: upper-left -> lower-right
    const p1b = {x: w*0.10, y: h*0.22};
    const p2b = {x: w*0.90, y: h*0.86};
    const c1b = {x: w*0.28, y: h*0.56};
    const c2b = {x: w*0.70, y: h*0.34};
    const pathB = document.createElementNS(SVG_NS, 'path');
    pathB.setAttribute('d', pathCubic(p1b.x,p1b.y,c1b.x,c1b.y,c2b.x,c2b.y,p2b.x,p2b.y));
    pathB.setAttribute('class','orbit fast');
    g.appendChild(pathB);

    svg.appendChild(g);
  }

  // ====== Init ======
  function init(){
    injectStyleOnce();
    const host = ensureHost();
    host.innerHTML = buildHTML();

    const steps = host.querySelector('.qf-steps');
    const svg = steps.querySelector('.qf-graphic');

    const redraw = ()=> drawGraphics(host);
    const ro = new ResizeObserver(redraw);
    ro.observe(steps);

    // initial draw after layout
    requestAnimationFrame(redraw);

    // lightweight parallax (disabled for reduced motion)
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce){
      steps.addEventListener('pointermove', (e)=>{
        const r = steps.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        svg.style.transform = `translate(${(px*6).toFixed(2)}px, ${(py*4).toFixed(2)}px)`;
      });
      steps.addEventListener('pointerleave', ()=>{
        svg.style.transform = 'translate(0,0)';
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();