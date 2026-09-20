/* Core – shared runtime for the prototypes. No dependencies.
   Pages provide: #frame containing their overlays (.ov). Core injects the canvas,
   base CSS, input handling (tap / 4-way swipe / drag, multitouch), haptics
   (Vibration API on Android, switch-label tick on iOS), synthesized audio,
   particles/texts/shake, seeded RNG, storage, toast and share helpers. */
window.Core = (() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeIn = t => t * t * t;
  const easeInOut = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const todayStr = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

  const F = {
    display: '"Lilita One", Impact, "Arial Black", system-ui, sans-serif',
    ui: 'Nunito, system-ui, -apple-system, sans-serif',
    emoji: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
  };

  // ------------------------------------------------------------ storage
  const store = prefix => ({
    get(k, d) { try { const v = localStorage.getItem(prefix + '.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(prefix + '.' + k, JSON.stringify(v)); } catch (e) {} },
  });

  // ------------------------------------------------------------ seeded rng
  function xmur3(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return (h ^= h >>> 16) >>> 0; };
  }
  function mulberry32(a) {
    return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const rngAt = (seed, i) => mulberry32(xmur3(seed + ':' + i)());
  const rngStream = seed => mulberry32(xmur3(seed)());
  const newSeed = () => Math.random().toString(36).slice(2, 8);
  const hash = () => new URLSearchParams(location.hash.replace(/^#/, ''));

  // ------------------------------------------------------------ haptics
  const haptics = {
    on: true, canVibrate: typeof navigator.vibrate === 'function', label: null,
    init(label) { this.label = label; },
    pulse(pattern) {
      if (!this.on) return;
      if (this.canVibrate) { try { navigator.vibrate(pattern); } catch (e) {} return; }
      if (!this.label) return;
      const arr = Array.isArray(pattern) ? pattern : [pattern];
      let t = 0;
      for (let k = 0; k < arr.length; k += 2) {
        if (k === 0) { try { this.label.click(); } catch (e) {} }
        else { const at = t; setTimeout(() => { try { this.label.click(); } catch (e) {} }, at); }
        t += arr[k] + (arr[k + 1] || 0);
      }
    },
    tap() { if (this.canVibrate) this.pulse(10); },
    tick() { if (this.canVibrate) this.pulse(6); },
    light() { this.pulse(18); },
    medium() { this.pulse(35); },
    heavy() { this.pulse(60); },
    success(n = 1) { this.pulse(n >= 5 ? [20, 30, 20, 30, 20, 30, 60] : n >= 2 ? [25, 40, 45] : [40]); },
    big() { this.pulse([70, 50, 70, 50, 140]); },
    fail() { this.pulse([140, 70, 220]); },
    win() { this.pulse([40, 40, 40, 40, 40, 40, 160]); },
  };

  // ------------------------------------------------------------ audio (synth)
  const audio = {
    on: true, ctx: null,
    unlock() {
      if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    },
    tone(f, dur, type = 'sine', gain = 0.15, slide = 0, delay = 0) {
      if (!this.on || !this.ctx) return;
      const t = this.ctx.currentTime + delay;
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = type; o.frequency.setValueAtTime(f, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + slide), t + dur);
      g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(this.ctx.destination); o.start(t); o.stop(t + dur + 0.02);
    },
    noise(dur, gain = 0.2, freq = 800, delay = 0, q = 0.7) {
      if (!this.on || !this.ctx) return;
      const t = this.ctx.currentTime + delay;
      const n = Math.floor(this.ctx.sampleRate * dur);
      const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      const s = this.ctx.createBufferSource(); s.buffer = buf;
      const f = this.ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
      const g = this.ctx.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      s.connect(f).connect(g).connect(this.ctx.destination); s.start(t);
    },
    blip(n = 1) { const b = 440 * Math.pow(1.05946, Math.min(n, 14) * 2); this.tone(b, 0.12, 'square', 0.06); this.tone(b * 1.5, 0.2, 'sine', 0.12); if (n >= 5) this.tone(b * 2, 0.25, 'sine', 0.08, 0, 0.06); },
    thud() { this.tone(150, 0.09, 'triangle', 0.25, -70); this.noise(0.06, 0.15, 500); },
    whoosh() { this.noise(0.18, 0.18, 1600); this.tone(500, 0.16, 'sine', 0.05, 700); },
    ding() { this.tone(1046, 0.25, 'sine', 0.12); this.tone(1568, 0.35, 'sine', 0.08, 0, 0.05); },
    pop() { this.tone(600, 0.06, 'square', 0.08, -300); },
    tick() { this.tone(1800, 0.03, 'square', 0.03); },
    buzz() { this.tone(320, 0.55, 'sawtooth', 0.14, -260); this.noise(0.3, 0.2, 200); },
    crunch() { this.tone(200, 0.25, 'sawtooth', 0.18, -150); this.noise(0.2, 0.25, 300); },
    fanfare() { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.2, 'triangle', 0.12, 0, i * 0.1)); },
    chord() { [523, 659, 784].forEach((f, i) => this.tone(f, 0.14, 'sine', 0.11, 0, i * 0.09)); },
    meow() { this.tone(700, 0.25, 'sawtooth', 0.07, 300); this.tone(1000, 0.25, 'sine', 0.05, -400, 0.2); },
    splash() { this.noise(0.3, 0.2, 900, 0, 0.4); },
    engine(vol = 0.03) { this.tone(80 + Math.random() * 20, 0.08, 'sawtooth', vol); },
    sparkle() { [0, 0.07, 0.14].forEach((d, i) => this.tone(880 * Math.pow(1.25, i), 0.16, 'triangle', 0.12, 0, d)); },
  };

  // ------------------------------------------------------------ drawing helpers
  function rrect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function text(ctx, str, x, y, size, color, align = 'center', font = F.display, stroke = true, strokeColor = 'rgba(20,12,40,.9)') {
    const m = /^(\d{3}|bold|normal)\s+(.*)$/.exec(font);
    ctx.font = m ? m[1] + ' ' + size + 'px ' + m[2] : size + 'px ' + font; ctx.textAlign = align; ctx.textBaseline = 'middle';
    if (stroke) { ctx.lineWidth = Math.max(2, size / 7); ctx.lineJoin = 'round'; ctx.strokeStyle = strokeColor; ctx.strokeText(str, x, y); }
    ctx.fillStyle = color; ctx.fillText(str, x, y);
  }
  function emoji(ctx, e, x, y, size) {
    ctx.font = size + 'px ' + F.emoji; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(e, x, y + size * 0.05);
  }

  // ------------------------------------------------------------ fx
  function makeFx() {
    const fx = { texts: [], parts: [], shake: 0, t: 0 };
    fx.text = (x, y, str, color, size = 22, life = 0.9) => fx.texts.push({ x, y, str, color, size, life, dur: life });
    fx.burst = (x, y, n, colors, spd = 260, life = 0.6, grav = 700) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, v = spd * (0.4 + Math.random() * 0.8);
        fx.parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 80, life, dur: life, size: 3 + Math.random() * 5, color: pick(colors), grav, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 12 });
      }
    };
    fx.ring = (x, y, color, life = 0.35) => fx.parts.push({ ring: true, x, y, r: 10, vr: 420, life, dur: life, color });
    fx.update = dt => {
      fx.t += dt;
      if (fx.shake > 0) fx.shake = Math.max(0, fx.shake - dt * 30);
      for (const q of fx.parts) { q.life -= dt; if (q.ring) { q.r += q.vr * dt; continue; } q.vy += q.grav * dt; q.x += q.vx * dt; q.y += q.vy * dt; q.rot += q.vr * dt; }
      fx.parts = fx.parts.filter(q => q.life > 0);
      for (const tx of fx.texts) { tx.life -= dt; tx.y -= 40 * dt; }
      fx.texts = fx.texts.filter(tx => tx.life > 0);
    };
    fx.draw = ctx => {
      for (const q of fx.parts) {
        const k = q.life / q.dur; ctx.save(); ctx.globalAlpha = Math.max(0, k);
        if (q.ring) { ctx.beginPath(); ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2); ctx.lineWidth = 6 * k; ctx.strokeStyle = q.color; ctx.stroke(); }
        else { ctx.translate(q.x, q.y); ctx.rotate(q.rot); ctx.fillStyle = q.color; ctx.fillRect(-q.size / 2, -q.size / 2, q.size, q.size * 0.7); }
        ctx.restore();
      }
      for (const tx of fx.texts) {
        const k = tx.life / tx.dur, pop = 1 + 0.25 * Math.max(0, (k - 0.75) / 0.25);
        ctx.save(); ctx.globalAlpha = Math.min(1, k * 3); ctx.translate(tx.x, tx.y); ctx.scale(pop, pop); text(ctx, tx.str, 0, 0, tx.size, tx.color); ctx.restore();
      }
    };
    fx.applyShake = ctx => { if (fx.shake > 0) ctx.translate((Math.random() - 0.5) * fx.shake, (Math.random() - 0.5) * fx.shake); };
    return fx;
  }

  // ------------------------------------------------------------ base css
  const BASE_CSS = `
html,body{height:100%;margin:0;background:var(--ground);color:var(--cream);font-family:${F.ui};overflow:hidden;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}
#stage{position:fixed;inset:0;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);background:var(--ground)}
#box{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center}
#frame{position:relative;width:100%;height:100%;overflow:hidden;background:var(--ground)}
#pad{position:absolute;inset:0;display:block;cursor:pointer}
canvas#c{display:block;width:100%;height:100%;touch-action:none}
.hx{position:absolute;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;margin:0}
.ov{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding-block:24px;padding-inline:20px;background:var(--panel);text-align:center;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);overflow-y:auto;z-index:2}
.ov[hidden]{display:none}
.logo{font-family:${F.display};font-size:clamp(48px,15vw,72px);line-height:1;margin:0;color:var(--accent);text-shadow:0 5px 0 var(--accent-shadow),0 12px 28px rgba(0,0,0,.45);letter-spacing:.02em;text-wrap:balance;font-weight:400}
.sub{color:var(--dim);font-weight:700;margin:0;max-width:32ch;text-wrap:balance;line-height:1.35}
.btn{font:900 20px/1 ${F.ui};border:0;border-radius:18px;padding:18px 28px;min-width:230px;color:var(--btn-text);background:var(--accent);box-shadow:0 6px 0 var(--accent-shadow);cursor:pointer;transition:transform .05s,box-shadow .05s;touch-action:manipulation}
.btn:active{transform:translateY(4px);box-shadow:0 2px 0 var(--accent-shadow)}
.btn:focus-visible{outline:3px solid var(--cream);outline-offset:3px}
.btn.sec{background:var(--card);color:var(--cream);box-shadow:0 6px 0 var(--card-dk);font-size:15px;padding:13px 18px;min-width:0}
.btn.sec:active{box-shadow:0 2px 0 var(--card-dk)}
.row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.how{display:grid;grid-template-columns:repeat(var(--how-cols,3),1fr);gap:8px;width:100%;max-width:360px}
.how div{background:var(--card);border:1px solid var(--line);border-radius:14px;padding-block:10px;padding-inline:6px;font-size:12px;font-weight:800;color:var(--dim);line-height:1.25}
.how b{display:block;font-size:24px;color:var(--cream);margin-bottom:4px;font-family:${F.display};font-weight:400}
.big{font-family:${F.display};font-size:64px;line-height:1;margin:0;color:var(--cream);font-variant-numeric:tabular-nums;font-weight:400}
.tag{font-size:13px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);margin:0}
.small{font-size:12px;color:var(--dim);margin:0;font-weight:700}
#toast{position:absolute;left:50%;bottom:28px;transform:translateX(-50%);background:var(--cream);color:var(--ground);padding-block:10px;padding-inline:14px;border-radius:12px;font-weight:800;font-size:14px;max-width:88%;opacity:0;transition:opacity .2s;pointer-events:none;z-index:5}
#toast.show{opacity:1}
.linkbox{width:100%;max-width:320px;font:700 12px ui-monospace,Menlo,monospace;padding:10px;border-radius:10px;border:1px solid var(--line);background:rgba(0,0,0,.35);color:var(--cream);-webkit-user-select:text;user-select:text}
.linkbox[hidden]{display:none}
@media (prefers-reduced-motion:reduce){.btn{transition:none}}
`;

  // ------------------------------------------------------------ ui helpers
  let toastTimer = 0;
  const ui = {
    toast(msg, ms = 1600) { const el = $('toast'); if (!el) return; el.textContent = msg; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), ms); },
    show(id) { const el = $(id); if (el) el.hidden = false; },
    hide(id) { const el = $(id); if (el) el.hidden = true; },
    hideAll() { document.querySelectorAll('.ov').forEach(el => { el.hidden = true; }); },
    bind(id, fn) { const el = $(id); if (el) el.addEventListener('click', e => { audio.unlock(); haptics.tap(); fn(e); }); },
    overlayTap(id, fn) { const el = $(id); if (el) el.addEventListener('pointerdown', e => { if (e.target.closest('button') || e.target.closest('input') || e.target.closest('a')) return; fn(e); }); },
    setText(id, str) { const el = $(id); if (el) el.textContent = str; },
  };

  function share({ text, url, linkboxId }) {
    const msg = text + (url ? ' ' + url : '');
    const showBox = () => { const b = linkboxId && $(linkboxId); if (!b) { ui.toast('Kunde inte kopiera – länken finns i adressfältet'); return; } b.hidden = false; b.value = url || msg; try { b.focus(); b.select(); } catch (e) {} ui.toast('Kopiera länken och skicka till en vän'); };
    const copyOr = fallback => { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(msg).then(() => ui.toast('Utmaning kopierad! Klistra in i en chatt.'), fallback); else fallback(); };
    if (navigator.share) navigator.share({ text: msg }).catch(() => copyOr(showBox)); else copyOr(showBox);
  }

  // ------------------------------------------------------------ mount
  function mount(opts) {
    const frame = $('frame');
    if (!$('core-css')) { const st = document.createElement('style'); st.id = 'core-css'; st.textContent = BASE_CSS; document.head.appendChild(st); }
    const label = document.createElement('label'); label.id = 'pad'; label.htmlFor = 'hxs';
    const canvas = document.createElement('canvas'); canvas.id = 'c'; canvas.setAttribute('aria-label', opts.ariaLabel || 'Spelplan');
    label.appendChild(canvas);
    const sw = document.createElement('input'); sw.type = 'checkbox'; sw.setAttribute('switch', ''); sw.id = 'hxs'; sw.className = 'hx'; sw.tabIndex = -1; sw.setAttribute('aria-hidden', 'true');
    frame.insertBefore(sw, frame.firstChild); frame.insertBefore(label, frame.firstChild);
    haptics.init(label);
    const ctx = canvas.getContext('2d');
    const box = $('box');
    const g = { canvas, ctx, W: opts.W || 390, H: 780, cssScale: 1, t: 0, dpr: 1, fx: makeFx(), paused: false, opts };
    const minRatio = opts.minRatio || 1.45, maxRatio = opts.maxRatio || 2.4;
    function resize() {
      const bw = box.clientWidth || window.innerWidth, bh = box.clientHeight || window.innerHeight;
      let cw = bw, ch = bh;
      if (bh / bw < minRatio) cw = Math.floor(bh / minRatio); else if (bh / bw > maxRatio) ch = Math.floor(bw * maxRatio);
      frame.style.width = cw + 'px'; frame.style.height = ch + 'px';
      g.H = Math.round(g.W * ch / cw); g.cssScale = cw / g.W;
      g.dpr = Math.min(3, window.devicePixelRatio || 1);
      canvas.width = Math.round(cw * g.dpr); canvas.height = Math.round(ch * g.dpr);
      ctx.setTransform(canvas.width / g.W, 0, 0, canvas.height / g.H, 0, 0);
      if (opts.onResize) opts.onResize(g);
    }
    resize(); window.addEventListener('resize', resize); window.addEventListener('orientationchange', () => setTimeout(resize, 200));

    // input: multitouch-aware tap / swipe / drag
    const ptrs = new Map();
    const swipePx = opts.swipePx || 22, tapPx = 12;
    const toLocal = e => { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) / g.cssScale, y: (e.clientY - r.top) / g.cssScale }; };
    canvas.addEventListener('pointerdown', e => {
      audio.unlock();
      const p = toLocal(e);
      ptrs.set(e.pointerId, { id: e.pointerId, sx: p.x, sy: p.y, x: p.y, lx: p.x, ly: p.y, swiped: false, moved: 0, t0: performance.now() });
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
      if (opts.onDown) opts.onDown(p.x, p.y, ptrs.get(e.pointerId));
    });
    canvas.addEventListener('pointermove', e => {
      const s = ptrs.get(e.pointerId); if (!s) return;
      const p = toLocal(e), dx = p.x - s.lx, dy = p.y - s.ly;
      s.moved = Math.max(s.moved, Math.hypot(p.x - s.sx, p.y - s.sy));
      s.lx = p.x; s.ly = p.y;
      if (opts.onMove) opts.onMove(p.x, p.y, dx, dy, s);
      if (opts.drag || s.swiped) return;
      const tx = p.x - s.sx, ty = p.y - s.sy;
      if (Math.hypot(tx, ty) >= swipePx) {
        s.swiped = true;
        const dir = Math.abs(tx) > Math.abs(ty) ? (tx > 0 ? 'right' : 'left') : (ty > 0 ? 'down' : 'up');
        if (opts.onSwipe) opts.onSwipe(dir, s);
      }
    });
    const end = e => {
      const s = ptrs.get(e.pointerId); if (!s) return; ptrs.delete(e.pointerId);
      const p = toLocal(e);
      if (opts.onUp) opts.onUp(p.x, p.y, s);
      if (!s.swiped && s.moved < tapPx && opts.onTap) opts.onTap(p.x, p.y, s);
    };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', e => { const s = ptrs.get(e.pointerId); ptrs.delete(e.pointerId); if (s && opts.onUp) opts.onUp(s.lx, s.ly, s); });
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    window.addEventListener('keydown', e => {
      if (e.repeat) return;
      const k = e.key;
      const fake = { sx: g.W / 2, sy: g.H / 2, lx: g.W / 2, ly: g.H / 2, key: true };
      if (k === ' ' || k === 'Enter') { e.preventDefault(); if (opts.onKey && opts.onKey(k) === true) return; if (opts.onTap) opts.onTap(g.W / 2, g.H / 2, fake); }
      else if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'ArrowUp' || k === 'ArrowDown') { e.preventDefault(); const dir = k.slice(5).toLowerCase(); if (opts.onKey && opts.onKey(k) === true) return; if (opts.onSwipe) opts.onSwipe(dir, fake); }
      else if (opts.onKey) opts.onKey(k);
    });

    let last = performance.now();
    const loop = now => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      try {
        if (!g.paused) { g.t += dt; g.fx.update(dt); if (opts.update) opts.update(dt, g); }
        if (opts.render) { ctx.setTransform(canvas.width / g.W, 0, 0, canvas.height / g.H, 0, 0); opts.render(ctx, g); }
      } catch (err) { if (!g._errLogged) { g._errLogged = true; console.error('frame error', err); } }
      requestAnimationFrame(loop);
    };
    g.start = () => { if (opts.onInit) opts.onInit(g); requestAnimationFrame(loop); };
    if (document.fonts && document.fonts.load) { document.fonts.load('20px "Lilita One"').catch(() => {}); }
    return g;
  }

  return { $, clamp, lerp, pick, easeOut, easeIn, easeInOut, todayStr, F, store, xmur3, mulberry32, rngAt, rngStream, newSeed, hash, haptics, audio, rrect, text, emoji, makeFx, ui, share, mount };
})();
