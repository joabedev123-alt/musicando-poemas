/* ═══════════════════════════════════════════════════════════
   MUSICANDO POEMAS — main.js
   GSAP · ScrollTrigger · Lenis · SplitType · Canvas
   ═══════════════════════════════════════════════════════════ */
(() => {
'use strict';

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const COARSE  = matchMedia('(hover: none), (pointer: coarse)').matches;
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* Falha de CDN não pode deixar a página em branco */
const revealAll = () => {
  $$('[data-fade],[data-split-line]').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
};

/* ═══════════════════════════════════════════════════════════
   1. DADOS
   ═══════════════════════════════════════════════════════════ */

/* — Aplicações — */
const APLICACOES = [
  { t:'Vídeos',         d:'Trilha autoral que conduz a narrativa do primeiro ao último quadro.', art:'wave',   ico:'play'  },
  { t:'Redes sociais',  d:'Cortes verticais pensados para prender nos três primeiros segundos.', art:'orbit',  ico:'share' },
  { t:'Campanhas',      d:'Assinatura sonora que faz a marca ser lembrada pelo ouvido.',         art:'grid',   ico:'star'  },
  { t:'Documentários',  d:'Camada emocional que sustenta depoimentos e silêncios.',              art:'ridge',  ico:'film'  },
  { t:'Eventos',        d:'Abertura, homenagem e encerramento com peso de cerimônia.',           art:'burst',  ico:'spark' },
  { t:'Casamentos',     d:'A história do casal virando canção — não a canção de todo mundo.',    art:'bloom',  ico:'heart' },
  { t:'Homenagens',     d:'Um presente que atravessa gerações e não cabe em uma caixa.',         art:'halo',   ico:'gift'  },
  { t:'Empresas',       d:'Cultura, aniversário e manifesto traduzidos em melodia.',             art:'lines',  ico:'build' },
  { t:'Cinema',         d:'Peça original licenciada para trilha, tema ou créditos finais.',      art:'scope',  ico:'reel'  },
  { t:'Apresentações',  d:'Um encerramento que faz a sala inteira parar para escutar.',          art:'stage',  ico:'mic'   }
];

/* — Plataformas de distribuição (lidas do painel da distribuidora) —
   s = slug do ícone oficial em cdn.simpleicons.org · null = monograma tipográfico.
   O catálogo do simple-icons muda com o tempo; se um ícone sumir, o card cai
   automaticamente no monograma (ver o listener de 'error' em renderPlataformas). */
const PLATAFORMAS = [
  { n:'Spotify',                     s:'spotify' },
  { n:'Apple Music',                 s:'applemusic' },
  { n:'Amazon Music',                s:null, m:'Am' },
  { n:'YouTube Music & Content ID',  s:'youtubemusic' },
  { n:'Deezer',                      s:'deezer' },
  { n:'TIDAL',                       s:'tidal' },
  { n:'SoundCloud',                  s:'soundcloud' },
  { n:'TikTok',                      s:'tiktok' },
  { n:'Pandora',                     s:'pandora' },
  { n:'iHeartRadio',                 s:'iheartradio' },
  { n:'Napster',                     s:'napster' },
  { n:'Qobuz',                       s:null, m:'Qz' },
  { n:'Anghami',                     s:null, m:'An' },
  { n:'JioSaavn',                    s:null, m:'Js' },
  { n:'NetEase Cloud Music',         s:'neteasecloudmusic' },
  { n:'KkBox',                       s:null, m:'Kk' },
  { n:'LINE Music',                  s:'line' },
  { n:'Kuaishou',                    s:'kuaishou' },
  { n:'Peloton',                     s:'peloton' },
  { n:'Facebook Audio Library',      s:'facebook' },
  { n:'Facebook Fingerprinting',     s:'facebook' },
  { n:'Tencent',                     s:null, m:'Te' },
  { n:'Joox',                        s:null, m:'Jx' },
  { n:'AWA',                         s:null, m:'AW' },
  { n:'7Digital',                    s:null, m:'7D' },
  { n:'Audible Magic',               s:null, m:'AM' },
  { n:'Bmat',                        s:null, m:'Bm' },
  { n:'LyricFind',                   s:null, m:'LF' },
  { n:'Music Worx',                  s:null, m:'MW' },
  { n:'TouchTunes',                  s:null, m:'TT' },
  { n:'Trebel Music',                s:null, m:'Tr' },
  { n:'Gracenote',                   s:null, m:'Gr' },
  { n:'Hook Music',                  s:null, m:'Hk' },
  { n:'Kuack Media',                 s:null, m:'Ku' },
  { n:'Ami Entertainment',           s:null, m:'Ai' },
  { n:'Nuuday A/S',                  s:null, m:'Nu' },
  { n:'Phononet',                    s:null, m:'Ph' },
  { n:'Pretzel Rocks',               s:null, m:'Pr' },
  { n:'Qisum',                       s:null, m:'Qi' },
  { n:'Vialma',                      s:null, m:'Vi' },
  { n:'fizy',                        s:null, m:'fz' },
  { n:'iMusica / Claro SA',          s:null, m:'iM' }
];

/* — Galeria —
   TODO: trocar `url` pelos links reais dos vídeos publicados. */
const GALERIA = [
  { tag:'TikTok',    t:'O verso que virou refrão',   s:'Poema musicado · trecho',  art:'ridge', url:'https://www.tiktok.com/@musicandopoemas21' },
  { tag:'Instagram', t:'Memória em três minutos',    s:'Reels · homenagem',        art:'bloom', url:'https://www.instagram.com/musicandopoemas' },
  { tag:'YouTube',   t:'A carta que ninguém enviou', s:'Vídeo completo',           art:'wave',  url:'https://music.youtube.com/playlist?list=PLIt2tBcgBI60&si=fgVbvCXCVha2U-hp' },
  { tag:'Spotify',   t:'O poema em melodia',         s:'Playlist oficial · áudio', art:'burst', url:'https://open.spotify.com/playlist/6SVkyYlVTKC00bOgkYYUNU?si=y0cbqHR8S-SeYLFE56cvWw&utm_source=copy-link&pi=PNx9Y6cVR1a_A' }
];

/* ═══════════════════════════════════════════════════════════
   2. ARTE GENERATIVA (SVG inline — zero requisições)
   ═══════════════════════════════════════════════════════════ */
const GOLD = '#D79A1F', INK = '#111111';

function art(kind, dark = false){
  const c1 = GOLD, c2 = dark ? '#FFFFFF' : INK;
  const o  = dark ? .55 : .8;
  const head = `<svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="g_${kind}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${c1}" stop-opacity="${dark ? .45 : .32}"/>
        <stop offset="100%" stop-color="${c1}" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="300" height="400" fill="url(#g_${kind})"/>`;

  const body = {
    wave:  Array.from({length:16},(_,i)=>`<path d="M-20,${90+i*16} Q60,${60+i*16} 150,${90+i*16} T320,${90+i*16}" fill="none" stroke="${c1}" stroke-opacity="${o*(.5-i*.022)}" stroke-width="1"/>`).join(''),
    orbit: Array.from({length:9},(_,i)=>`<ellipse cx="150" cy="200" rx="${28+i*17}" ry="${72+i*13}" fill="none" stroke="${c1}" stroke-opacity="${o*(.45-i*.04)}" stroke-width="1" transform="rotate(${i*11} 150 200)"/>`).join(''),
    grid:  Array.from({length:12},(_,i)=>`<line x1="${i*27}" y1="0" x2="${i*27}" y2="400" stroke="${c2}" stroke-opacity="${o*.12}" stroke-width="1"/>`).join('') +
           Array.from({length:16},(_,i)=>`<line x1="0" y1="${i*27}" x2="300" y2="${i*27}" stroke="${c1}" stroke-opacity="${o*.16}" stroke-width="1"/>`).join(''),
    ridge: Array.from({length:34},(_,i)=>{const h=18+Math.abs(Math.sin(i*.7))*120;return `<rect x="${6+i*8.6}" y="${200-h/2}" width="2.6" height="${h}" rx="1.3" fill="${c1}" fill-opacity="${o*.5}"/>`}).join(''),
    burst: Array.from({length:26},(_,i)=>{const a=i*(Math.PI*2/26);return `<line x1="${150+Math.cos(a)*44}" y1="${200+Math.sin(a)*44}" x2="${150+Math.cos(a)*168}" y2="${200+Math.sin(a)*168}" stroke="${c1}" stroke-opacity="${o*.35}" stroke-width="1"/>`}).join(''),
    bloom: Array.from({length:14},(_,i)=>`<circle cx="150" cy="200" r="${20+i*13}" fill="none" stroke="${c1}" stroke-opacity="${o*(.4-i*.026)}" stroke-width="1"/>`).join(''),
    halo:  `<circle cx="150" cy="180" r="86" fill="none" stroke="${c1}" stroke-opacity="${o*.5}" stroke-width="1"/>` +
           Array.from({length:44},(_,i)=>{const a=i*(Math.PI*2/44);return `<circle cx="${150+Math.cos(a)*(112+(i%3)*16)}" cy="${180+Math.sin(a)*(112+(i%3)*16)}" r="1.5" fill="${c1}" fill-opacity="${o*.6}"/>`}).join(''),
    lines: Array.from({length:22},(_,i)=>`<path d="M0,${i*19} L300,${i*19-46}" stroke="${c1}" stroke-opacity="${o*(.28-i*.008)}" stroke-width="1"/>`).join(''),
    scope: `<rect x="42" y="112" width="216" height="176" fill="none" stroke="${c1}" stroke-opacity="${o*.4}" stroke-width="1"/>` +
           Array.from({length:11},(_,i)=>`<rect x="10" y="${34+i*32}" width="16" height="16" rx="3" fill="none" stroke="${c2}" stroke-opacity="${o*.2}"/><rect x="274" y="${34+i*32}" width="16" height="16" rx="3" fill="none" stroke="${c2}" stroke-opacity="${o*.2}"/>`).join(''),
    stage: Array.from({length:9},(_,i)=>`<path d="M150,400 L${-40+i*60},60" stroke="${c1}" stroke-opacity="${o*.24}" stroke-width="1"/>`).join('') +
           `<circle cx="150" cy="120" r="52" fill="none" stroke="${c1}" stroke-opacity="${o*.45}" stroke-width="1"/>`
  }[kind] || '';

  return head + body + '</svg>';
}

const ICONS = {
  play : '<path d="M8 5v14l11-7z"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  star : '<path d="m12 3 2.5 6.2L21 11l-6.5 1.8L12 19l-2.5-6.2L3 11l6.5-1.8z"/>',
  film : '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 12h18"/>',
  spark: '<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5.6 5.6l4 4M14.4 14.4l4 4M18.4 5.6l-4 4M9.6 14.4l-4 4"/>',
  heart: '<path d="M12 20s-7-4.6-7-9.4A4 4 0 0 1 12 8a4 4 0 0 1 7-.6c0 4.8-7 12.6-7 12.6Z"/>',
  gift : '<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13h18M12 9v12M12 9C10 5 7 5 7 7s3 2 5 2c2 0 5 0 5-2s-3-2-5 2Z"/>',
  build: '<path d="M4 21V7l7-4v18M11 21h9V11l-9-4M14 12h3M14 16h3"/>',
  reel : '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="8" r="2"/><circle cx="8.5" cy="14" r="2"/><circle cx="15.5" cy="14" r="2"/>',
  mic  : '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8"/>'
};

/* ═══════════════════════════════════════════════════════════
   3. RENDER
   ═══════════════════════════════════════════════════════════ */
function renderAplicacoes(){
  const grid = $('#aplicGrid');
  if (!grid) return;
  grid.innerHTML = APLICACOES.map(a => `
    <article class="card" data-fade data-tilt>
      <div class="card__art">${art(a.art)}</div>
      <div class="card__veil"></div>
      <svg class="card__i" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[a.ico]}</svg>
      <h3 class="card__t">${a.t}</h3>
      <p class="card__d">${a.d}</p>
    </article>`).join('');
}

function renderPlataformas(){
  const grid = $('#platGrid');
  if (!grid) return;
  grid.innerHTML = PLATAFORMAS.map(p => {
    const mono = p.m || p.n.slice(0, 2);
    const mark = p.s
      ? `<img class="plat__logo" src="https://cdn.simpleicons.org/${p.s}/ffffff" alt="" loading="lazy" decoding="async" width="26" height="26">
         <span class="plat__mono" hidden>${mono}</span>`
      : `<span class="plat__mono">${mono}</span>`;
    return `<div class="plat__c" data-fade title="${p.n}">${mark}<span class="plat__n">${p.n}</span></div>`;
  }).join('');

  /* Se o CDN de ícones falhar, cai no monograma sem buraco visual */
  $$('.plat__logo', grid).forEach(img => {
    img.addEventListener('error', () => {
      const card = img.closest('.plat__c');   /* antes do remove(): depois vira null */
      img.remove();
      const m = card && $('.plat__mono', card);
      if (m) m.hidden = false;
    }, { once:true });
  });
}

function renderGaleria(){
  const rail = $('#galeriaRail');
  if (!rail) return;
  rail.innerHTML = GALERIA.map(v => `
    <a class="vid" href="${v.url}" target="_blank" rel="noopener" data-fade
       aria-label="${v.t} — abrir no ${v.tag}">
      <div class="vid__art">${art(v.art, true)}</div>
      <div class="vid__grad"></div>
      <span class="vid__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>
      <div class="vid__meta">
        <span class="vid__tag">${v.tag}</span>
        <h3 class="vid__t">${v.t}</h3>
        <p class="vid__s">${v.s}</p>
      </div>
    </a>`).join('');
}

/* ═══════════════════════════════════════════════════════════
   4. CANVAS — partículas douradas (hero) e ondas (CTA)
   ═══════════════════════════════════════════════════════════ */
function heroParticles(){
  const cv = $('#heroCanvas');
  if (!cv || REDUCED) return;
  const ctx = cv.getContext('2d', { alpha:true });
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let w = 0, h = 0, parts = [], raf = 0, visible = true;
  const mouse = { x:-999, y:-999 };

  const resize = () => {
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const maxParts = COARSE ? 25 : 80;
    const n = Math.round(Math.min(maxParts, (w * h) / 19000));
    parts = Array.from({ length:n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + .35,
      vx: (Math.random() - .5) * .16,
      vy: -(Math.random() * .22 + .05),
      a: Math.random() * .5 + .12,
      p: Math.random() * Math.PI * 2
    }));
  };

  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    for (const s of parts){
      s.p += .012;
      s.x += s.vx + Math.sin(s.p) * .12;
      s.y += s.vy;

      /* leve repulsão do ponteiro — sensação de profundidade */
      const dx = s.x - mouse.x, dy = s.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 14400){
        const f = (1 - Math.sqrt(d2) / 120) * 1.1;
        s.x += dx * .012 * f; s.y += dy * .012 * f;
      }

      if (s.y < -10){ s.y = h + 10; s.x = Math.random() * w; }
      if (s.x < -10) s.x = w + 10;
      if (s.x > w + 10) s.x = -10;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(215,154,31,${s.a * (.6 + Math.sin(s.p) * .4)})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  };

  addEventListener('resize', resize, { passive:true });
  addEventListener('mousemove', e => {
    const r = cv.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  }, { passive:true });

  /* pausa quando sai da tela — não gasta bateria à toa */
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (visible) raf = requestAnimationFrame(tick);
  }, { threshold:0 }).observe(cv);

  resize();
  raf = requestAnimationFrame(tick);
}

function ctaWaves(){
  const cv = $('#ctaCanvas');
  if (!cv || REDUCED) return;
  const ctx = cv.getContext('2d', { alpha:true });
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let w = 0, h = 0, t = 0, raf = 0;

  const resize = () => {
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    const lines = 9;
    for (let i = 0; i < lines; i++){
      ctx.beginPath();
      const amp = 18 + i * 9;
      const off = h * .5 + (i - lines / 2) * 16;
      for (let x = 0; x <= w; x += 8){
        const y = off
          + Math.sin(x * .0042 + t * .55 + i * .55) * amp
          + Math.sin(x * .0013 - t * .3 + i) * amp * .5;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(215,154,31,${.05 + (1 - i / lines) * .12})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    t += .01;
    raf = requestAnimationFrame(tick);
  };

  addEventListener('resize', resize, { passive:true });
  new IntersectionObserver(([e]) => {
    cancelAnimationFrame(raf);
    if (e.isIntersecting) raf = requestAnimationFrame(tick);
  }, { threshold:0 }).observe(cv);

  resize();
}

/* ═══════════════════════════════════════════════════════════
   5. CURSOR + MAGNÉTICO + TILT
   ═══════════════════════════════════════════════════════════ */
function cursor(){
  if (COARSE || REDUCED || !window.gsap) return;
  const dot = $('#cursor'), ring = $('#cursorRing');
  if (!dot || !ring) return;

  gsap.set([dot, ring], { opacity:1 });
  const xd = gsap.quickTo(dot,  'x', { duration:.16, ease:'power3' });
  const yd = gsap.quickTo(dot,  'y', { duration:.16, ease:'power3' });
  const xr = gsap.quickTo(ring, 'x', { duration:.55, ease:'power3' });
  const yr = gsap.quickTo(ring, 'y', { duration:.55, ease:'power3' });

  addEventListener('mousemove', e => {
    xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY);
  }, { passive:true });

  const hot = 'a,button,.card,.vid,.plat__c,.rede,[data-magnetic]';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hot)) ring.classList.add('is-hot');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hot)) ring.classList.remove('is-hot');
  });

  /* anel clareia sobre as seções escuras */
  $$('.plat,.cta,.foot').forEach(sec => {
    sec.addEventListener('mouseenter', () => ring.classList.add('on-dark'));
    sec.addEventListener('mouseleave', () => ring.classList.remove('on-dark'));
  });
}

function magnetic(){
  if (COARSE || REDUCED || !window.gsap) return;
  $$('[data-magnetic]').forEach(el => {
    const strength = 0.32;
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x:(e.clientX - r.left - r.width / 2) * strength,
        y:(e.clientY - r.top - r.height / 2) * strength,
        duration:.5, ease:'power3.out'
      });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x:0, y:0, duration:.7, ease:'elastic.out(1,.4)' });
    });
  });
}

/* Hover de elevação + inclinação.
   Precisa ser GSAP: as animações de entrada deixam um transform inline
   no elemento, e transform inline vence qualquer regra :hover do CSS. */
function hoverFX(){
  if (COARSE || REDUCED || !window.gsap) return;

  const setup = (sel, { lift = -8, scale = 1, tiltDeg = 0 }) => {
    $$(sel).forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(el, { y:lift, scale, duration:.55, ease:'power3.out', overwrite:'auto' });
      });
      if (tiltDeg){
        el.addEventListener('mousemove', e => {
          const r = el.getBoundingClientRect();
          gsap.to(el, {
            rotateY:((e.clientX - r.left) / r.width  - .5) * tiltDeg,
            rotateX:((e.clientY - r.top)  / r.height - .5) * -tiltDeg,
            transformPerspective:900, duration:.5, ease:'power3.out'
          });
        });
      }
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          y:0, scale:1, rotateX:0, rotateY:0,
          duration:.75, ease:'power3.out', overwrite:'auto'
        });
      });
    });
  };

  setup('.card',     { lift:-10, tiltDeg:7 });
  setup('.rede',     { lift:-8,  tiltDeg:6 });
  setup('.plat__c',  { lift:-7,  scale:1.035 });
  setup('.dif__card',{ lift:-7 });
  setup('.vid',      { lift:-10, scale:1.012 });
}

/* ═══════════════════════════════════════════════════════════
   6. NAV
   ═══════════════════════════════════════════════════════════ */
function nav(lenis){
  const nv = $('#nav'), burger = $('#burger'), menu = $('#menu');

  addEventListener('scroll', () => {
    nv.classList.toggle('is-stuck', scrollY > 40);
    nv.classList.toggle('is-in',    scrollY > innerHeight * .72);
  }, { passive:true });

  /* menu mobile */
  const setMenu = open => {
    menu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('is-locked', open);
    lenis && (open ? lenis.stop() : lenis.start());
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* âncoras suaves */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      setMenu(false);
      lenis ? lenis.scrollTo(target, { offset:-70, duration:1.5 })
            : target.scrollIntoView({ behavior:'smooth' });
    });
  });

  /* link ativo */
  const links = $$('[data-nav]');
  const byId = new Map(links.map(l => [l.getAttribute('href').slice(1), l]));
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      const l = byId.get(en.target.id);
      if (l && en.isIntersecting){
        links.forEach(x => x.classList.remove('is-active'));
        l.classList.add('is-active');
      }
    });
  }, { rootMargin:'-45% 0px -50% 0px' });
  byId.forEach((_, id) => { const s = document.getElementById(id); s && io.observe(s); });
}

/* ═══════════════════════════════════════════════════════════
   7. ANIMAÇÕES DE SCROLL
   ═══════════════════════════════════════════════════════════ */
function scrollAnims(){
  if (!window.gsap || !window.ScrollTrigger){ revealAll(); return; }
  gsap.registerPlugin(ScrollTrigger);

  if (REDUCED){ revealAll(); return; }

  /* O hero é coreografado pela intro() — fica de fora daqui. */
  const notHero = el => !el.closest('.hero');

  /* — títulos: revelação por palavra dentro de linhas mascaradas — */
  $$('[data-split]').filter(notHero).forEach(el => {
    if (window.SplitType){
      const split = new SplitType(el, { types:'lines,words', lineClass:'line' });
      gsap.from(split.words, {
        yPercent:118, opacity:0,
        duration:1.1, ease:'expo.out', stagger:.028,
        scrollTrigger:{ trigger:el, start:'top 86%', once:true },
        /* desfaz o split depois de animar: as .line são um agrupamento
           congelado e quebrariam o texto se a janela mudasse de largura */
        onComplete: () => split.revert()
      });
    } else {
      gsap.from(el, {
        y:40, opacity:0, duration:1, ease:'expo.out',
        scrollTrigger:{ trigger:el, start:'top 86%', once:true }
      });
    }
  });

  /* — poema do "Sobre": linha a linha, com respiro — */
  $$('[data-split-line]').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity:0, y:34 },
      { opacity:1, y:0, duration:1.2, ease:'expo.out', delay:i * .12,
        scrollTrigger:{ trigger:el, start:'top 88%', once:true } }
    );
  });

  /* — fades genéricos (agrupa irmãos para stagger natural) — */
  const groups = new Map();
  $$('[data-fade]').filter(notHero).forEach(el => {
    const p = el.parentElement;
    if (!groups.has(p)) groups.set(p, []);
    groups.get(p).push(el);
  });
  groups.forEach(items => {
    gsap.to(items, {
      opacity:1, y:0, duration:1, ease:'expo.out',
      /* grades grandes (42 plataformas) não podem levar 3s para entrar */
      stagger:{ amount: Math.min(items.length * .06, .9) },
      scrollTrigger:{ trigger:items[0], start:'top 92%', once:true }
    });
  });

  /* — timeline do processo — */
  $$('[data-step]').forEach(step => {
    ScrollTrigger.create({
      trigger:step, start:'top 72%', once:true,
      onEnter: () => step.classList.add('is-on')
    });
  });

  /* — parallax discreto — */
  $$('[data-parallax]').forEach(el => {
    gsap.to(el, {
      y: parseFloat(el.dataset.parallax) || -60, ease:'none',
      scrollTrigger:{ trigger:el, start:'top bottom', end:'bottom top', scrub:1 }
    });
  });

  /* — interlúdios: entram e saem como respiração — */
  $$('.interlude').forEach(sec => {
    gsap.fromTo(sec,
      { opacity:.15 },
      { opacity:1, ease:'none',
        scrollTrigger:{ trigger:sec, start:'top 85%', end:'center 55%', scrub:.8 } }
    );
  });

  /* — logo do hero sobe e some com o scroll — */
  const hero = $('#hero');
  if (hero){
    gsap.to('.hero__content', {
      y:-90, opacity:0, ease:'none',
      scrollTrigger:{ trigger:hero, start:'top top', end:'bottom top', scrub:.6 }
    });
    gsap.to('.hero__waves', {
      y:70, ease:'none',
      scrollTrigger:{ trigger:hero, start:'top top', end:'bottom top', scrub:1 }
    });
  }

  /* — galeria: cards entram deslizando da direita —
     (o trilho continua livre para arrastar; nada de scroll sequestrado) */
  gsap.from('.vid', {
    x:60, ease:'expo.out', duration:1.1, stagger:.08,
    scrollTrigger:{ trigger:'.galeria__rail', start:'top 85%', once:true }
  });

  /* — contadores — */
  $$('[data-count]').forEach(el => {
    const end = +el.dataset.count;
    const obj = { v:0 };
    ScrollTrigger.create({
      trigger:el, start:'top 88%', once:true,
      onEnter: () => gsap.to(obj, {
        v:end, duration:2, ease:'power2.out',
        onUpdate: () => { el.textContent = Math.round(obj.v); }
      })
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   8. ABERTURA (preloader → hero)
   ═══════════════════════════════════════════════════════════ */
function intro(){
  const pre = $('#preloader');

  if (REDUCED || !window.gsap){
    pre && pre.remove();
    const logo = $('#heroLogo');
    if (logo) logo.style.opacity = '1';
    revealAll();
    return;
  }

  /* Rede de segurança: a cortina nunca pode ficar presa sobre a página.
     Só conta tempo com a aba visível — em aba de fundo o rAF é congelado
     e a timeline legitimamente fica parada. */
  let alive = 0;
  const watchdog = setInterval(() => {
    if (document.visibilityState === 'visible') alive += 500;
    if (alive >= 7000){
      clearInterval(watchdog);
      const p = $('#preloader');
      if (p) p.remove();
      const logo = $('#heroLogo');
      if (logo) logo.style.opacity = '1';
      revealAll();
    }
  }, 500);

  const tl = gsap.timeline({ onComplete: () => clearInterval(watchdog) });

  tl.to('.preloader__logo', { opacity:1, duration:.9, ease:'power2.out' })
    .to('.preloader__bar span', { width:'100%', duration:1.15, ease:'power2.inOut' }, '-=.5')
    .to('.preloader__logo', { opacity:0, y:-14, duration:.5, ease:'power2.in' }, '+=.12')
    .to(pre, {
      clipPath:'inset(0 0 100% 0)', duration:1, ease:'expo.inOut',
      onComplete: () => pre.remove()
    }, '-=.15')

    /* HERO — logo, título, subtítulo, botões (nessa ordem) */
    .fromTo('#heroLogo',
      { opacity:0, y:34, scale:.96, filter:'blur(8px)' },
      { opacity:1, y:0, scale:1, filter:'blur(0px)', duration:1.5, ease:'expo.out' }, '-=.55');

  if (window.SplitType){
    const t = new SplitType('.hero__title', { types:'lines,words', lineClass:'line' });
    tl.from(t.words, {
      yPercent:120, opacity:0, duration:1.25, ease:'expo.out', stagger:.045,
      onComplete: () => t.revert()
    }, '-=1.05');
  } else {
    tl.from('.hero__title', { y:40, opacity:0, duration:1.1, ease:'expo.out' }, '-=1.05');
  }

  tl.to('.hero__sub',     { opacity:1, y:0, duration:1, ease:'expo.out' }, '-=.7')
    .to('.hero__actions', { opacity:1, y:0, duration:1, ease:'expo.out' }, '-=.75')
    .from('.hero__scroll', { opacity:0, y:16, duration:.8, ease:'power2.out' }, '-=.5')
    .from('.hero__waves',  { opacity:0, duration:1.6, ease:'power2.out' }, '-=1.6');
}

/* ═══════════════════════════════════════════════════════════
   9. BOOT
   ═══════════════════════════════════════════════════════════ */
function boot(){
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();

  renderAplicacoes();
  renderPlataformas();
  renderGaleria();

  /* Lenis — scroll suave */
  let lenis = null;
  if (window.Lenis && !REDUCED){
    lenis = new Lenis({
      duration:1.15,
      easing:t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel:true,
      touchMultiplier:1.6
    });
    const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (window.ScrollTrigger){
      lenis.on('scroll', () => ScrollTrigger.update());
    }
  }

  function waFloat(){
    const closeBtn = $('#waFloatClose');
    const tooltip = $('#waFloatTooltip');
    if(!closeBtn || !tooltip) return;
    closeBtn.addEventListener('click', () => {
      tooltip.classList.add('is-hidden');
    });
  }

  nav(lenis);
  cursor();
  magnetic();
  hoverFX();
  heroParticles();
  ctaWaves();
  waFloat();

  /* O SplitType congela a quebra de linha no momento em que roda.
     Se a fonte ainda não carregou, ele mede com a fonte de fallback e
     o título quebra errado — daí esperar fonts.ready (com teto de 2s). */
  const fontsReady = document.fonts
    ? Promise.race([ document.fonts.ready, new Promise(r => setTimeout(r, 2000)) ])
    : Promise.resolve();

  fontsReady.then(() => {
    scrollAnims();
    intro();
    window.ScrollTrigger && ScrollTrigger.refresh();
  });

  addEventListener('resize', () => {
    clearTimeout(boot._rz);
    boot._rz = setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 200);
  }, { passive:true });
}

/* Rede de segurança: se GSAP não carregar, nada fica invisível */
addEventListener('load', () => {
  setTimeout(() => { if (!window.gsap) revealAll(); }, 400);
});

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', boot)
  : boot();

})();
