/**
 * Subtle Fundamental-Particle Field (behind content)
 * - Photons: faint cyan glows, wave-like drift
 * - Neutrinos: nearly invisible tiny dots, straight gentle drift
 * - Quark triplets: tiny triads orbiting a common center (very dim)
 * - Muons: rare, short, violet-ish streaks that fade quickly
 * Layers sit behind content (z-index:0); header/main/footer are above.
 * Respects prefers-reduced-motion.
 */
(function(){
  var doc = document;

  // ---- Palette from CSS variables (fallbacks included) ----
  function cssVar(name, fallback){
    var v = getComputedStyle(doc.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }
  var INK = cssVar('--ink', '#A7F0FF');           // cyan (photons)
  var PRI = cssVar('--primary', '#FFD580');       // ochre/gold (quarks)
  var SEC = cssVar('--secondary', '#6C63FF');     // soft violet (muons)

  // ---- Layering styles ----
  var styleId = 'particle-field-style';
  if(!doc.getElementById(styleId)){
    var st = doc.createElement('style');
    st.id = styleId;
    st.textContent = [
      '.particle-field{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:1 !important;}',
      'header.site-nav, main, footer.site-footer{position:relative;z-index:1;}',
      'body > .container{position:relative;z-index:1;}'
    ].join('\n');
    doc.head.appendChild(st);
  }

  // ---- Canvas ----
  var canvas = doc.createElement('canvas');
  canvas.className = 'particle-field';
  if (doc.body.firstChild) doc.body.insertBefore(canvas, doc.body.firstChild); else doc.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  var W=0,H=0, DPR=Math.max(1, Math.min(2, window.devicePixelRatio||1));

  // ---- Mouse tracking for local fade-out & lines ----
  var mouse = { x: 0, y: 0, active: false };
  doc.addEventListener('mousemove', function(e){ mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; });
  doc.addEventListener('mouseleave', function(){ mouse.active = false; });

  function resize(){
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.floor(W*DPR); canvas.height = Math.floor(H*DPR);
    canvas.style.width = W+'px'; canvas.style.height = H+'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
    init();
  }
  window.addEventListener('resize', resize);

  // ---- Particles ----
  var photons=[], neutrinos=[], quarks=[], muons=[];
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t0 = performance.now();

  function init(){
    photons.length = 0; neutrinos.length = 0; quarks.length = 0; muons.length = 0;

    // Density scales gently with screen area
    var base = Math.sqrt(W*H)/32; // conservative

    // Photons: very sparse random scatter (no visible grid), with minimum separation
    var target = Math.max(6, Math.round(Math.sqrt(W*H)/900)); // sparse target count by area
    var minD = Math.max(36, Math.min(72, Math.round(Math.min(W,H)/24))); // min separation in px
    var tries = 0, maxTries = target * 40; // conservative cap
    while (photons.length < target && tries < maxTries) {
      var x = Math.random() * W;
      var y = Math.random() * H;
      var ok = true;
      for (var pi = 0; pi < photons.length; pi++) {
        var pp = photons[pi];
        if (Math.hypot(pp.x0 - x, pp.y0 - y) < minD) { ok = false; break; }
      }
      if (ok) {
        photons.push({ x0: x, y0: y, x: x, y: y, amp: 3.5 + Math.random() * 2.5, phase: Math.random() * Math.PI * 2 });
      }
      tries++;
    }

    // Neutrinos: extremely sparse, tiny, near-invisible
    var nCount = Math.max(4, Math.round(base*0.10));
    for(var i=0;i<nCount;i++){
      neutrinos.push({x: Math.random()*W, y: Math.random()*H, vx: (Math.random()*0.2+0.05)*(Math.random()<.5?-1:1), vy:(Math.random()*0.2-0.1)});
    }

    // Quark triplets: very few dim triads
    var qCount = Math.max(1, Math.round(base*0.02));
    for(var q=0;q<qCount;q++){
      var cx = Math.random()*W, cy = Math.random()*H;
      var radius = 10+Math.random()*12; // small
      var rot = Math.random()*Math.PI*2;
      quarks.push({cx:cx, cy:cy, r:radius, rot:rot, spin: (Math.random()<.5?-1:1)*(0.1+Math.random()*0.1)});
    }

    // Muons: none at init; spawned occasionally during animation
  }

  // ---- Rendering helpers ----
  function glowCircle(x,y,r,inner,outer){
    var g = ctx.createRadialGradient(x,y,0,x,y,r);
    g.addColorStop(0, inner); g.addColorStop(1, outer);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x,y, r*0.24, 0, Math.PI*2); ctx.fill();
  }

  function withAlpha(hex, a){
    // Accepts #rrggbb
    var h = hex.replace('#','');
    var r = parseInt(h.substring(0,2),16), g = parseInt(h.substring(2,4),16), b = parseInt(h.substring(4,6),16);
    return 'rgba('+r+','+g+','+b+','+a+')';
  }

  function fadeFactor(dist, inner, outer){
    // 0 inside inner radius, 1 outside outer radius, smooth ramp in between
    if(dist <= inner) return 0;
    if(dist >= outer) return 1;
    var t = (dist - inner) / (outer - inner);
    // smoothstep
    return t*t*(3 - 2*t);
  }

  function draw(){
    // Very light motion trail for smoothness on black
    ctx.fillStyle = 'rgba(0,0,0,0.10)';
    ctx.fillRect(0,0,W,H);

    var t = (performance.now()-t0)*0.001;

    // Photons: wave-like drift
    for(var i=0;i<photons.length;i++){
      var p = photons[i];
      var y = p.y0 + (reduceMotion?0:(p.amp*Math.sin(p.phase + t*0.7)));
      var x = p.x0 + (reduceMotion?0:(p.amp*0.6*Math.cos(p.phase*0.8 + t*0.4)));
      p.x=x; p.y=y;
      var f = 1;
      if(mouse.active){
        var dx = p.x - mouse.x, dy = p.y - mouse.y;
        var d = Math.hypot(dx, dy);
        f = fadeFactor(d, 60, 140); // photons disappear near cursor, with a soft edge
      }
      glowCircle(x,y,8,  withAlpha(INK,0.35 * f), withAlpha(INK,0.05 * f));
    }

    // Neutrinos: straight, faint points
    ctx.fillStyle = withAlpha('#FFFFFF', 0.06);
    for(var j=0;j<neutrinos.length;j++){
      var n = neutrinos[j];
      if(!reduceMotion){ n.x += n.vx; n.y += n.vy; }
      if(n.x<0) n.x+=W; if(n.x>W) n.x-=W; if(n.y<0) n.y+=H; if(n.y>H) n.y-=H;
      var drawN = true;
      if(mouse.active){
        var dn = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        drawN = dn > 60; // vanish close to cursor
      }
      if(drawN) ctx.fillRect(n.x, n.y, 1, 1);
    }

    // Quark triplets: three points orbiting
    for(var k=0;k<quarks.length;k++){
      var q = quarks[k];
      if(!reduceMotion) q.rot += q.spin*0.02;
      for(var m=0;m<3;m++){
        var ang = q.rot + m*(Math.PI*2/3);
        var px = q.cx + q.r*Math.cos(ang);
        var py = q.cy + q.r*Math.sin(ang);
        var fq = 1;
        if(mouse.active){
          fq = fadeFactor(Math.hypot(px - mouse.x, py - mouse.y), 60, 140);
        }
        glowCircle(px,py,6, withAlpha(PRI,0.18 * fq), withAlpha(PRI,0.03 * fq));
      }
      // subtle binding lines (very faint)
      ctx.strokeStyle = withAlpha(PRI,0.05);
      ctx.beginPath();
      for(var m2=0;m2<3;m2++){
        var a = q.rot + m2*(Math.PI*2/3);
        var b = q.rot + ((m2+1)%3)*(Math.PI*2/3);
        ctx.moveTo(q.cx + q.r*Math.cos(a), q.cy + q.r*Math.sin(a));
        ctx.lineTo(q.cx + q.r*Math.cos(b), q.cy + q.r*Math.sin(b));
      }
      ctx.stroke();
    }

    // Muons: spawn rarely as short streaks
    if(!reduceMotion && Math.random() < 0.0015 && muons.length < 1){
      var angle = Math.random()*Math.PI*2;
      muons.push({
        x: Math.random()*W, y: Math.random()*H,
        vx: Math.cos(angle)*1.8, vy: Math.sin(angle)*1.8,
        life: 60, max: 60
      });
    }
    for(var u=muons.length-1; u>=0; u--){
      var m = muons[u];
      var ax = m.x, ay = m.y;
      var bx = m.x - m.vx*6, by = m.y - m.vy*6;
      var grd = ctx.createLinearGradient(ax,ay,bx,by);
      grd.addColorStop(0.0, withAlpha(SEC, 0.16));
      grd.addColorStop(1.0, withAlpha(SEC, 0.00));
      ctx.strokeStyle = grd; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.stroke();
      if(!reduceMotion){ m.x += m.vx; m.y += m.vy; m.life--; }
      if(m.life<=0) muons.splice(u,1);
    }

    // Intersecting faint lines at the cursor (subtle, several directions)
    if(mouse.active){
      var L = 160; // half-length of lines
      var angles = [0, Math.PI/3, 2*Math.PI/3];
      for(var ai=0; ai<angles.length; ai++){
        var a = angles[ai];
        var x1 = mouse.x - Math.cos(a)*L, y1 = mouse.y - Math.sin(a)*L;
        var x2 = mouse.x + Math.cos(a)*L, y2 = mouse.y + Math.sin(a)*L;
        var g = ctx.createLinearGradient(x1,y1,x2,y2);
        g.addColorStop(0, withAlpha(SEC, 0.00));
        g.addColorStop(0.5, withAlpha(SEC, 0.10));
        g.addColorStop(1, withAlpha(SEC, 0.00));
        ctx.strokeStyle = g;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      }
    }

    if(!reduceMotion) requestAnimationFrame(draw);
  }

  resize();
  // One static frame if reduced motion; otherwise animate continuously
  if(reduceMotion){
    ctx.fillStyle = 'rgba(0,0,0,1)'; ctx.fillRect(0,0,W,H);
    init(); draw();
  } else {
    ctx.fillStyle = 'rgba(0,0,0,1)'; ctx.fillRect(0,0,W,H);
    requestAnimationFrame(draw);
  }
})();

// === Navigation Menu Control (for nav.html) ===
(function(){
  if (document.documentElement.dataset.navInitialized === '1') return;
  document.documentElement.dataset.navInitialized = '1';

  function ready(fn){ 
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true});
    else fn();
  }

  ready(function(){
    const html = document.documentElement;
    const btn = document.querySelector('.menu-toggle');
    const nav = document.getElementById('nav-links');
    const backdrop = document.querySelector('.nav-backdrop');
    if(!btn || !nav) return;

    btn.setAttribute('aria-expanded','false');
    nav.setAttribute('aria-hidden','true');

    function openMenu(){
      html.classList.add('nav-open');
      btn.setAttribute('aria-expanded','true');
      nav.classList.add('open');
      nav.style.display = 'block';
      nav.setAttribute('aria-hidden','false');
      if (backdrop){ backdrop.hidden = false; backdrop.style.pointerEvents = 'auto'; }
      document.addEventListener('keydown', escHandler, true);
      document.addEventListener('click', outsideClick, true);
    }

    function closeMenu(){
      html.classList.remove('nav-open');
      btn.setAttribute('aria-expanded','false');
      nav.classList.remove('open');
      nav.style.display = '';
      nav.setAttribute('aria-hidden','true');
      if (backdrop){ backdrop.hidden = true; backdrop.style.pointerEvents = 'none'; }
      document.removeEventListener('keydown', escHandler, true);
      document.removeEventListener('click', outsideClick, true);
    }

    function escHandler(e){
      if (e.key === 'Escape') closeMenu();
    }

    function outsideClick(e){
      if (!html.classList.contains('nav-open')) return;
      if (nav.contains(e.target) || btn.contains(e.target)) return;
      closeMenu();
    }

    btn.addEventListener('click', function(){
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMenu(); else openMenu();
    });

    if (backdrop) backdrop.addEventListener('click', closeMenu);

    nav.addEventListener('click', function(e){
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')){
        e.preventDefault();
        const id = href.replace(/^#/, '');
        const target = document.getElementById(id);
        if (target){
          const header = document.querySelector('header.site-nav');
          const offset = (header && header.getBoundingClientRect().height) || 0;
          const y = target.getBoundingClientRect().top + window.pageYOffset - offset - 8;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        closeMenu();
      } else {
        setTimeout(closeMenu, 0);
      }
    });

    console.debug('[general.js] nav initialized');
  });
})();