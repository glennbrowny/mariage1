/* =========================================================
   Invitation de mariage — script principal
   ---------------------------------------------------------
   Les informations sont lues dans config.json.
   Si config.json est inaccessible (ex. fichier ouvert en
   double-clic, sans serveur), les valeurs ci-dessous sont
   utilisées : gardez-les synchronisées avec config.json.
   ========================================================= */

const DEFAULT_CONFIG = {
  couple: {
    groom: {
      firstName: "Alexandre",
      fullName: "Alexandre Martin",
      photo: "assets/marie.jpg",
      city: "Libreville, Gabon",
      bio: "Ingénieur passionné et éternel optimiste, Alexandre aime les longues discussions au coucher du soleil, les voyages improvisés et les repas partagés en famille. Il a trouvé en Camille sa plus belle aventure.",
      passions: ["Voyages", "Football", "Cuisine", "Musique"],
      quote: "Je t'ai cherchée sans le savoir, et je t'ai reconnue au premier regard."
    },
    bride: {
      firstName: "Camille",
      fullName: "Camille Dubois",
      photo: "assets/mariee.jpg",
      city: "Libreville, Gabon",
      bio: "Créative, douce et pleine d'énergie, Camille illumine chaque pièce où elle entre. Amoureuse des fleurs, de la lecture et des grands éclats de rire, elle s'apprête à écrire le plus beau chapitre de sa vie.",
      passions: ["Fleurs", "Lecture", "Danse", "Photographie"],
      quote: "Avec toi, chaque jour ressemble à une promesse tenue."
    }
  },
  wedding: {
    date: "2027-06-12",
    time: "15:00",
    venueName: "Église Saint-Michel",
    address: "Boulevard Triomphal Omar Bongo",
    city: "Libreville, Gabon",
    mapsQuery: "Église Saint-Michel, Libreville, Gabon",
    tagline: "Nous étions une promesse, et Dieu l'a accomplie.",
    heroImage: "assets/hero.jpg",
    couplePhoto: "assets/couple.jpg",
    music: "",
    dressCode: {
      text: "Tenue de soirée élégante. Nous vous invitons à porter des tons doux : ivoire, blush, champagne ou or.",
      colors: ["#f3ece2", "#e8bfc0", "#d9b98a", "#c6a15b", "#6e5260"]
    },
    practicalInfo: [
      "Merci d'arriver 30 minutes avant le début de la cérémonie.",
      "Un parking gratuit est disponible à proximité du lieu.",
      "Tenue de soirée souhaitée — touches de blush et d'or bienvenues.",
      "Pour toute question, contactez-nous par téléphone ou par e-mail."
    ]
  },
  contact: { phone: "+241 00 00 00 00", email: "mariage@exemple.com" },
  rsvp: { deadline: "2027-05-01", maxGuests: 6, endpoint: "" },
  programme: [
    { time: "15:00", title: "Cérémonie", description: "Échange des vœux et des alliances, entourés de ceux que nous aimons.", place: "Église Saint-Michel", icon: "rings" },
    { time: "16:30", title: "Séance photos", description: "Immortalisons ensemble ce moment : photos de groupe avec familles et amis.", place: "Jardins de l'église", icon: "camera" },
    { time: "18:00", title: "Réception", description: "Cocktail de bienvenue, rafraîchissements et douceurs pour célébrer les jeunes mariés.", place: "Salle des Fêtes Le Jardin", icon: "glass" },
    { time: "20:00", title: "Dîner", description: "Un dîner raffiné, des discours émouvants et beaucoup de rires.", place: "Salle des Fêtes Le Jardin", icon: "dinner" },
    { time: "22:30", title: "Première danse & soirée", description: "Ouverture du bal par les mariés, puis place à la fête jusqu'au bout de la nuit !", place: "Salle des Fêtes Le Jardin", icon: "music" }
  ],
  accommodations: [
    { name: "Hôtel Le Cristal", address: "Bord de mer, Libreville", phone: "+241 00 00 00 01", note: "À 10 minutes du lieu" },
    { name: "Résidence Les Palmiers", address: "Quartier Louis, Libreville", phone: "+241 00 00 00 02", note: "Tarif préférentiel en mentionnant le mariage" },
    { name: "Hôtel du Jardin", address: "Centre-ville, Libreville", phone: "+241 00 00 00 03", note: "Navette prévue après la soirée" }
  ]
};

/* ---------- Icônes (SVG en ligne) ---------- */
const ICONS = {
  heart: '<path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2 0 3.4 1.1 4.4 2.6 1-1.5 2.4-2.6 4.4-2.6 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z" fill="currentColor"/>',
  heartLine: '<path d="M12 20s-7-4.3-9-8.7C1.6 8 3.6 4.8 6.8 4.8c1.9 0 3.2 1 4.2 2.4 1-1.4 2.3-2.4 4.2-2.4 3.2 0 5.2 3.2 3.8 6.5C17 15.7 12 20 12 20z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="2.4" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  groom: '<circle cx="12" cy="7.5" r="3.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 20.5c.8-4 3.6-6.5 7-6.5s6.2 2.5 7 6.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="m10.3 15.5 1.7 1.3 1.7-1.3-1.7-1.3z" fill="currentColor"/>',
  bride: '<circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8.6 6.5C9 3.8 15 3.8 15.4 6.5M4.5 20.5 8 14.8c1.2-.6 2.5-.8 4-.8s2.8.2 4 .8l3.5 5.7z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  rings: '<circle cx="9" cy="14" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="15" cy="14" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m13.5 4.5 1.5-2 1.5 2-1.5 1.5z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  camera: '<path d="M4 8.5A2 2 0 0 1 6 6.5h2l1.5-2h5l1.5 2h2a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  glass: '<path d="M7 3.5h4l-.3 5a2.3 2.3 0 0 1-3.4 0zM9 10v8m-2.5 2.5h5M13 3.5h4l-.3 5a2.3 2.3 0 0 1-3.4 0zM15 10v8m-2.5 2.5h5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
  dinner: '<circle cx="12" cy="12.5" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3 3.5v5a1.5 1.5 0 0 0 3 0v-5M4.5 8.5v12M21 3.5c-1.7 1-2.5 3-2.5 6h2.5v11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  music: '<path d="M9 18.5V6l11-2.5v12.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="6.5" cy="18.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17.5" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  envelope: '<rect x="3" y="5.5" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  phone: '<path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  route: '<circle cx="6" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M18 3.5c-2.2 0-4 1.7-4 3.9C14 10.2 18 14 18 14s4-3.8 4-6.6c0-2.2-1.8-3.9-4-3.9z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  info: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5.5M12 7.8v.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  hotel: '<path d="M3.5 20.5V5.5h10v15m0-9h7v9M2 20.5h20M7 9h3M7 12.5h3M7 16h3M16.5 15h1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  sound: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  mute: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="m16 9.5 5 5m0-5-5 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
};
const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.heart}</svg>`;

/* ---------- Utilitaires ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = {
  get(area, key) { try { return window[area].getItem(key); } catch { return null; } },
  set(area, key, val) { try { window[area].setItem(key, val); } catch { /* stockage indisponible */ } }
};

function deepMerge(base, extra) {
  if (Array.isArray(base) || typeof base !== "object" || base === null) return extra ?? base;
  const out = { ...base };
  for (const k of Object.keys(extra || {})) {
    const v = extra[k];
    out[k] = v && typeof v === "object" && !Array.isArray(v) ? deepMerge(base[k] || {}, v) : v;
  }
  return out;
}

function parseDate(d, t = "12:00") {
  const [y, m, day] = String(d).split("-").map(Number);
  const [hh, mm] = String(t || "12:00").split(":").map(Number);
  return new Date(y, (m || 1) - 1, day || 1, hh || 0, mm || 0);
}
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const fmt = (date, opts) => new Intl.DateTimeFormat("fr-FR", opts).format(date);
const fmtLong = (date) => capitalize(fmt(date, { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
const fmtDay = (date) => fmt(date, { day: "numeric", month: "long", year: "numeric" }).replace(/^1 /, "1er ");
const fmtTime = (t) => String(t || "").replace(":", "h");
const slug = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");

async function loadConfig() {
  try {
    const res = await fetch("config.json", { cache: "no-store" });
    if (res.ok) return deepMerge(DEFAULT_CONFIG, await res.json());
  } catch { /* ouverture en local sans serveur : on garde les valeurs par défaut */ }
  return DEFAULT_CONFIG;
}

/* Nom de l'invité (paramètre ?invite=… conservé pendant la visite) */
function getInvite() {
  const fromUrl = new URLSearchParams(location.search).get("invite");
  if (fromUrl && fromUrl.trim()) {
    const clean = fromUrl.trim().replace(/\s+/g, " ").slice(0, 80);
    store.set("sessionStorage", "invite", clean);
    return clean;
  }
  return store.get("sessionStorage", "invite") || "";
}

/* Image de remplacement élégante (initiale) */
function placeholderPhoto(initial, tone) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'>
  <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#fdf8f3'/><stop offset='1' stop-color='${tone}'/></linearGradient></defs>
  <rect width='400' height='500' fill='url(#g)'/>
  <circle cx='200' cy='205' r='118' fill='none' stroke='#c6a15b' stroke-opacity='.55'/>
  <circle cx='200' cy='205' r='108' fill='#fff' fill-opacity='.45'/>
  <text x='200' y='238' text-anchor='middle' font-family='Georgia, serif' font-size='96' fill='#a7843f'>${esc(initial)}</text>
  <text x='200' y='392' text-anchor='middle' font-family='Georgia, serif' font-style='italic' font-size='24' fill='#6e5260'>Photo à venir</text>
  <path d='M150 420h100' stroke='#c6a15b' stroke-opacity='.6'/></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function setPhoto(img, src, initial, tone) {
  const fallback = placeholderPhoto(initial, tone);
  img.onerror = () => { img.onerror = null; img.src = fallback; };
  img.src = src || fallback;
}

/* =========================================================
   Mise en page commune
   ========================================================= */
const PAGES = [
  { id: "home", href: "index.html", label: "Accueil" },
  { id: "groom", href: "marie.html", label: "Le marié" },
  { id: "bride", href: "mariee.html", label: "La mariée" },
  { id: "programme", href: "programme.html", label: "Programme" },
  { id: "location", href: "localisation.html", label: "Localisation" },
  { id: "rsvp", href: "rsvp.html", label: "RSVP", cta: true }
];

function renderChrome(cfg, vars, page) {
  const links = PAGES.map((p) => {
    const cur = p.id === page ? ' aria-current="page"' : "";
    return `<li><a href="${p.href}"${cur}${p.cta ? ' class="nav-cta"' : ""}>${p.label}</a></li>`;
  }).join("");

  const header = document.createElement("header");
  header.innerHTML = `
    <nav class="site-nav" aria-label="Navigation principale">
      <a class="brand" href="index.html" aria-label="Accueil">${esc(vars.groomInitial)}<span>&amp;</span>${esc(vars.brideInitial)}</a>
      <ul class="nav-links">${links}</ul>
      <button class="nav-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false"><span></span></button>
    </nav>
    <div class="mobile-menu" id="mobile-menu"><ul>${links}</ul></div>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="site-footer__mono">${esc(vars.groomInitial)} &amp; ${esc(vars.brideInitial)}</div>
    <p>Fait avec amour <span class="heart">♥</span> · ${esc(vars.groomFirst)} &amp; ${esc(vars.brideFirst)}</p>
    <p>${esc(vars.dateLong)} · ${esc(vars.city)}</p>`;
  document.body.append(footer);

  // Menu mobile
  const toggle = $(".nav-toggle");
  const setOpen = (open) => {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  };
  toggle.addEventListener("click", () => setOpen(!document.body.classList.contains("nav-open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });

  // Navigation qui se densifie au scroll
  const nav = $(".site-nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Favicon avec les initiales
  const fav = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#e3cc9a'/><stop offset='1' stop-color='#a7843f'/></linearGradient></defs><circle cx='32' cy='32' r='31' fill='url(#g)'/><circle cx='32' cy='32' r='27' fill='none' stroke='#fff' stroke-opacity='.5'/><text x='32' y='41' text-anchor='middle' font-family='Georgia,serif' font-size='24' fill='#fff'>${esc(vars.groomInitial)}${esc(vars.brideInitial)}</text></svg>`;
  let link = $('link[rel="icon"]');
  if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.append(link); }
  link.type = "image/svg+xml";
  link.href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(fav);

  // Titre de l'onglet
  const base = document.title.split("·")[0].trim();
  document.title = `${base} · ${vars.groomFirst} & ${vars.brideFirst}`;
}

/* Remplit les éléments [data-bind="clé"] */
function bindData(vars) {
  $$("[data-bind]").forEach((el) => {
    const v = vars[el.dataset.bind];
    if (v !== undefined) el.textContent = v;
  });
}

/* Ajoute ?invite=… aux liens internes pour garder le prénom */
function propagateInvite(invite) {
  if (!invite) return;
  $$('a[href$=".html"], a[href*=".html#"]').forEach((a) => {
    const url = new URL(a.getAttribute("href"), location.href);
    if (url.origin !== location.origin && location.protocol !== "file:") return;
    url.searchParams.set("invite", invite);
    a.setAttribute("href", url.pathname.split("/").pop() + url.search + url.hash);
  });
}

/* =========================================================
   Effets visuels
   ========================================================= */
function splitWords() {
  $$("[data-split]").forEach((el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(part); return; }
            const outer = document.createElement("span");
            outer.className = "split-word";
            const inner = document.createElement("span");
            inner.textContent = part;
            inner.style.setProperty("--d", `${0.08 * i++}s`);
            outer.append(inner);
            frag.append(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) walk(child);
      });
    };
    walk(el);
    el.classList.add("reveal");
  });
}

let revealObserver;
function observeReveals() {
  if (!("IntersectionObserver" in window) || reducedMotion) {
    $$(".reveal, .timeline__item").forEach((el) => el.classList.add("is-visible"));
    return;
  }
  revealObserver = revealObserver || new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  $$(".reveal:not(.is-visible), .timeline__item:not(.is-visible)").forEach((el) => revealObserver.observe(el));
}

/* Pétales qui tombent doucement */
function startPetals() {
  if (reducedMotion) return;
  const canvas = document.createElement("canvas");
  canvas.id = "petals";
  canvas.setAttribute("aria-hidden", "true");
  document.body.append(canvas);
  const ctx = canvas.getContext("2d");
  const colors = ["#f2c9cb", "#e8bfc0", "#f6e1df", "#ecd7aa", "#fffaf4"];
  let w, h, petals = [], running = true;

  const make = (initial) => ({
    x: Math.random() * w,
    y: initial ? Math.random() * h : -20 - Math.random() * 60,
    s: 5 + Math.random() * 8,
    vy: 0.35 + Math.random() * 0.75,
    vx: -0.25 + Math.random() * 0.5,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.03,
    sway: Math.random() * Math.PI * 2,
    swaySpeed: 0.008 + Math.random() * 0.015,
    flip: Math.random() * Math.PI * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: 0.45 + Math.random() * 0.4
  });

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = w < 600 ? 14 : w < 1100 ? 22 : 30;
    while (petals.length < count) petals.push(make(true));
    petals.length = count;
  };

  const draw = (p) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.scale(1, 0.35 + Math.abs(Math.cos(p.flip)) * 0.65);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, -p.s);
    ctx.bezierCurveTo(p.s * 0.95, -p.s * 0.55, p.s * 0.7, p.s * 0.75, 0, p.s);
    ctx.bezierCurveTo(-p.s * 0.7, p.s * 0.75, -p.s * 0.95, -p.s * 0.55, 0, -p.s);
    ctx.fill();
    ctx.globalAlpha = p.alpha * 0.5;
    ctx.strokeStyle = "rgba(201,138,143,.6)";
    ctx.lineWidth = 0.6;
    ctx.beginPath(); ctx.moveTo(0, -p.s * 0.6); ctx.lineTo(0, p.s * 0.7); ctx.stroke();
    ctx.restore();
  };

  const tick = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    petals.forEach((p, i) => {
      p.sway += p.swaySpeed;
      p.flip += 0.02;
      p.x += p.vx + Math.sin(p.sway) * 0.6;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.y > h + 20 || p.x < -30 || p.x > w + 30) petals[i] = make(false);
      draw(p);
    });
    requestAnimationFrame(tick);
  };

  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(tick);
  });
  resize();
  requestAnimationFrame(tick);
}

/* Transitions fluides entre les pages */
function setupPageTransitions() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === "_blank" || a.hasAttribute("download")) return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    const url = new URL(href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return;
    e.preventDefault();
    document.body.classList.remove("nav-open");
    document.body.classList.add("is-leaving");
    setTimeout(() => { location.href = url.href; }, reducedMotion ? 0 : 380);
  });
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) document.body.classList.remove("is-leaving");
  });
}

/* Musique de fond (facultative) */
let audio;
function setupMusic(cfg) {
  const src = cfg.wedding.music;
  if (!src) return;
  audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0.55;
  const t = parseFloat(store.get("sessionStorage", "music-time"));
  if (t) audio.currentTime = t;

  const btn = document.createElement("button");
  btn.className = "music-toggle";
  btn.type = "button";
  document.body.append(btn);

  const render = () => {
    const playing = !audio.paused;
    btn.classList.toggle("is-playing", playing);
    btn.innerHTML = icon(playing ? "music" : "mute");
    btn.setAttribute("aria-label", playing ? "Couper la musique" : "Lancer la musique");
  };
  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      store.set("sessionStorage", "music-on", "1");
    } else {
      audio.pause();
      store.set("sessionStorage", "music-on", "0");
    }
  });
  audio.addEventListener("play", render);
  audio.addEventListener("pause", render);
  window.addEventListener("pagehide", () => store.set("sessionStorage", "music-time", String(audio.currentTime)));
  render();
  if (store.get("sessionStorage", "music-on") === "1") audio.play().catch(render);
}
function playMusic() {
  if (audio && audio.paused) {
    audio.play().catch(() => {});
    store.set("sessionStorage", "music-on", "1");
  }
}

/* =========================================================
   Pages
   ========================================================= */
function initHome(cfg, vars, invite) {
  // Image de fond / photo du couple
  const card = $("#hero-card");
  if (card) {
    if (cfg.wedding.couplePhoto) {
      card.classList.add("has-photo");
      const img = document.createElement("img");
      img.className = "hero__photo";
      img.alt = `${vars.groomFirst} et ${vars.brideFirst}`;
      img.src = cfg.wedding.couplePhoto;
      card.prepend(img);
    } else if (cfg.wedding.heroImage) {
      card.style.setProperty("--hero-img", `url("${cfg.wedding.heroImage}")`);
    }
  }

  // Enveloppe d'ouverture (une fois par visite)
  const screen = $("#envelope-screen");
  if (screen) {
    const skipIntro = new URLSearchParams(location.search).get("intro") === "0";
    if (skipIntro || store.get("sessionStorage", "envelope-opened") === "1") {
      screen.hidden = true;
    } else {
      screen.hidden = false;
      document.body.style.overflow = "hidden";
      document.body.classList.add("has-envelope");
      const forEl = $("#envelope-for");
      if (invite && forEl) forEl.textContent = `Pour ${invite}`;
      const open = () => {
        screen.classList.add("is-open");
        document.body.style.overflow = "";
        setTimeout(() => document.body.classList.remove("has-envelope"), 1200);
        store.set("sessionStorage", "envelope-opened", "1");
        playMusic();
        setTimeout(() => { screen.hidden = true; }, 2200);
      };
      $(".envelope", screen).addEventListener("click", open, { once: true });
    }
  }

  // Compte à rebours
  const cd = $("#countdown");
  if (cd) {
    const target = parseDate(cfg.wedding.date, cfg.wedding.time).getTime();
    const units = [["days", "Jours"], ["hours", "Heures"], ["minutes", "Minutes"], ["seconds", "Secondes"]];
    cd.innerHTML = units.map(([k, l]) => `<div class="countdown__item"><span class="countdown__value" data-u="${k}">00</span><span class="countdown__label">${l}</span></div>`).join("");
    const update = () => {
      let diff = Math.max(0, target - Date.now());
      if (diff === 0) {
        cd.innerHTML = `<p class="countdown__done">${Date.now() - target < 864e5 ? "C'est le grand jour !" : "Merci d'avoir partagé ce jour avec nous"}</p>`;
        clearInterval(timer);
        return;
      }
      const vals = {
        days: Math.floor(diff / 864e5),
        hours: Math.floor((diff / 36e5) % 24),
        minutes: Math.floor((diff / 6e4) % 60),
        seconds: Math.floor((diff / 1e3) % 60)
      };
      units.forEach(([k]) => { $(`[data-u="${k}"]`, cd).textContent = String(vals[k]).padStart(2, "0"); });
    };
    const timer = setInterval(update, 1000);
    update();
  }

  // Calendrier (veille, jour J, lendemain)
  const cal = $("#calendar");
  if (cal) {
    const d = parseDate(cfg.wedding.date);
    const day = (offset) => { const x = new Date(d); x.setDate(d.getDate() + offset); return x; };
    const cell = (x, main) => `
      <div class="calendar__day${main ? " calendar__day--main" : ""}">
        <small>${esc(fmt(x, { weekday: main ? "long" : "short" }).replace(".", ""))}</small>
        <span>${x.getDate()}${main ? '<svg class="calendar__heart" viewBox="0 0 120 110" aria-hidden="true"><path d="M60 104C38 88 6 66 7 38 8 18 22 6 38 7c11 1 18 8 22 17 4-9 11-16 22-17 16-1 30 11 31 31 1 28-31 50-53 66" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ""}</span>
      </div>`;
    cal.innerHTML = `<div class="calendar__month">${esc(capitalize(fmt(d, { month: "long", year: "numeric" })))}</div>${cell(day(-1))}${cell(d, true)}${cell(day(1))}`;
  }

  // Dress code
  const sw = $("#swatches");
  if (sw) sw.innerHTML = (cfg.wedding.dressCode?.colors || []).map((c) => `<li style="--c:${esc(c)}" title="${esc(c)}"></li>`).join("");
}

function initProfile(cfg, vars, who) {
  const p = cfg.couple[who];
  if (!p) return;
  const img = $("#profile-photo");
  if (img) {
    img.alt = `Portrait de ${p.fullName}`;
    setPhoto(img, p.photo, (p.firstName || "?").charAt(0), who === "groom" ? "#ead9c4" : "#f0cfd0");
  }
  const chips = $("#profile-passions");
  if (chips) chips.innerHTML = (p.passions || []).map((x) => `<li>${esc(x)}</li>`).join("");
  const set = (sel, val) => { const el = $(sel); if (el) el.textContent = val || ""; };
  set("#profile-name", p.fullName);
  set("#profile-city", p.city);
  set("#profile-bio", p.bio);
  set("#profile-quote", p.quote);
  set("#profile-sign", p.firstName);
}

function initProgramme(cfg) {
  const list = $("#timeline-items");
  if (!list) return;
  list.innerHTML = cfg.programme.map((step) => `
    <article class="timeline__item">
      <div class="timeline__dot">${icon(step.icon)}</div>
      <div class="timeline__card glass">
        <span class="timeline__time">${esc(fmtTime(step.time))}</span>
        <h2 class="timeline__title">${esc(step.title)}</h2>
        <p class="timeline__desc">${esc(step.description)}</p>
        ${step.place ? `<span class="timeline__place">${icon("pin")} ${esc(step.place)}</span>` : ""}
      </div>
    </article>`).join("");

  // Ligne de progression qui se remplit au scroll
  const tl = $(".timeline");
  const bar = $(".timeline__progress");
  const update = () => {
    const r = tl.getBoundingClientRect();
    const total = tl.offsetHeight - 90;
    const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / total));
    bar.style.height = `${progress * total}px`;
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

function initRsvp(cfg, vars, invite) {
  const form = $("#rsvp-form");
  if (!form) return;
  const card = $("#rsvp-card");
  const confirmBox = $("#confirmation");
  const storageKey = `rsvp:${slug(vars.groomFirst)}-${slug(vars.brideFirst)}-${cfg.wedding.date}`;
  const max = Math.max(1, Number(cfg.rsvp.maxGuests) || 6);

  // Contact
  const contact = $("#rsvp-contact");
  if (contact) {
    const parts = [];
    if (cfg.contact?.phone) parts.push(`<a href="tel:${esc(cfg.contact.phone.replace(/\s/g, ""))}">${icon("phone")} ${esc(cfg.contact.phone)}</a>`);
    if (cfg.contact?.email) parts.push(`<a href="mailto:${esc(cfg.contact.email)}">${icon("envelope")} ${esc(cfg.contact.email)}</a>`);
    contact.innerHTML = parts.join("");
  }

  // Message d'accueil personnalisé
  const greet = $("#rsvp-greeting");
  if (invite) {
    greet.textContent = `Bonjour ${invite}`;
    $("#guest-name").value = invite;
  } else {
    greet.textContent = "Chers invités";
  }

  const showConfirmation = (r) => {
    const yes = r.attending === "oui";
    const first = r.name.split(" ")[0];
    $("#confirm-icon").className = `confirmation__icon${yes ? "" : " confirmation__icon--soft"}`;
    $("#confirm-icon").innerHTML = icon(yes ? "check" : "heart");
    $("#confirm-title").textContent = yes ? `Merci ${first} !` : `Merci ${first}`;
    $("#confirm-text").textContent = yes
      ? `Votre présence est bien confirmée. ${vars.groomFirst} & ${vars.brideFirst} ont hâte de célébrer ce jour avec vous le ${vars.dateLong.toLowerCase()} à ${vars.timeLabel}.`
      : `Nous avons bien reçu votre réponse. Vous nous manquerez, et nous penserons à vous en ce jour si spécial.`;
    $("#confirm-recap").innerHTML = `
      <div><dt>Nom</dt><dd>${esc(r.name)}</dd></div>
      <div><dt>Présence</dt><dd>${yes ? "Oui, avec joie" : "Non, à regret"}</dd></div>
      ${yes ? `<div><dt>Personnes</dt><dd>${r.guests}</dd></div>` : ""}
      ${r.message ? `<div><dt>Message</dt><dd>${esc(r.message)}</dd></div>` : ""}
      <div><dt>Envoyé le</dt><dd>${esc(fmtDay(new Date(r.sentAt)))}</dd></div>`;
    card.hidden = true;
    confirmBox.hidden = false;
    confirmBox.classList.add("is-visible");
  };

  // Réponse déjà envoyée depuis ce navigateur ?
  const saved = store.get("localStorage", storageKey);
  if (saved) {
    try { showConfirmation(JSON.parse(saved)); return; } catch { /* donnée invalide : on réaffiche le formulaire */ }
  }

  // Date limite dépassée ?
  const deadline = parseDate(cfg.rsvp.deadline, "23:59");
  if (Date.now() > deadline.getTime()) {
    form.innerHTML = `<p class="rsvp-intro">La date limite de réponse (${esc(vars.deadline)}) est dépassée. Contactez-nous directement si besoin.</p>`;
    return;
  }

  // Stepper « nombre de personnes »
  let guests = 1;
  const out = $("#guests-output");
  const minus = $("#guests-minus");
  const plus = $("#guests-plus");
  const renderGuests = () => {
    out.textContent = guests;
    $("#guests").value = guests;
    minus.disabled = guests <= 1;
    plus.disabled = guests >= max;
  };
  minus.addEventListener("click", () => { guests = Math.max(1, guests - 1); renderGuests(); });
  plus.addEventListener("click", () => { guests = Math.min(max, guests + 1); renderGuests(); });
  renderGuests();

  // Masquer le nombre de personnes si « Non »
  $$('input[name="attending"]').forEach((r) => r.addEventListener("change", () => {
    $(".field--guests").classList.toggle("is-hidden", r.value === "non" && r.checked);
    $("#field-attending").classList.remove("has-error");
  }));
  $("#guest-name").addEventListener("input", () => $("#field-name").classList.remove("has-error"));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = $("#guest-name").value.trim().replace(/\s+/g, " ");
    const attending = form.attending.value;
    let ok = true;
    if (name.length < 2) { $("#field-name").classList.add("has-error"); ok = false; }
    if (!attending) { $("#field-attending").classList.add("has-error"); ok = false; }
    if (!ok) return;

    // Double protection : une seule réponse
    if (store.get("localStorage", storageKey)) { showConfirmation(JSON.parse(store.get("localStorage", storageKey))); return; }

    const response = {
      name,
      attending,
      guests: attending === "oui" ? guests : 0,
      message: $("#guest-message").value.trim().slice(0, 1000),
      sentAt: new Date().toISOString()
    };

    const btn = $(".rsvp-submit");
    btn.disabled = true;
    btn.textContent = "Envoi en cours…";

    // Envoi facultatif vers un service (Formspree, Google Apps Script…)
    if (cfg.rsvp.endpoint) {
      try {
        await fetch(cfg.rsvp.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...response, mariage: `${vars.groomFirst} & ${vars.brideFirst}` })
        });
      } catch { /* la réponse reste enregistrée localement */ }
    }

    store.set("localStorage", storageKey, JSON.stringify(response));
    showConfirmation(response);
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
}

function initLocation(cfg, vars) {
  const q = encodeURIComponent(cfg.wedding.mapsQuery || vars.fullAddress);
  const frame = $("#map");
  if (frame) frame.src = `https://www.google.com/maps?q=${q}&output=embed`;
  const dir = $("#directions");
  if (dir) dir.href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

  const copyBtn = $("#copy-address");
  if (copyBtn) copyBtn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(`${vars.venueName}, ${vars.fullAddress}`); toast("Adresse copiée"); }
    catch { toast(vars.fullAddress); }
  });

  const info = $("#practical-info");
  if (info) info.innerHTML = (cfg.wedding.practicalInfo || []).map((t, i) =>
    `<li class="glass reveal" style="--d:${i * 0.08}s">${icon(i === 0 ? "clock" : "info")}<span>${esc(t)}</span></li>`).join("");

  const stays = $("#stays");
  if (stays) {
    const list = cfg.accommodations || [];
    if (!list.length) { $("#stays-section")?.remove(); return; }
    stays.innerHTML = list.map((s, i) => `
      <article class="stay glass reveal" style="--d:${i * 0.1}s">
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.address)}</p>
        ${s.phone ? `<a href="tel:${esc(s.phone.replace(/\s/g, ""))}">${esc(s.phone)}</a>` : ""}
        ${s.note ? `<p class="stay__note">${esc(s.note)}</p>` : ""}
      </article>`).join("");
  }
}

function toast(msg) {
  let t = $(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.append(t); }
  t.textContent = msg;
  t.classList.add("is-shown");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("is-shown"), 2400);
}

/* =========================================================
   Démarrage
   ========================================================= */
(async function init() {
  try {
    await start();
  } catch (err) {
    console.error(err);
  } finally {
    // Lever le voile puis lancer les apparitions
    requestAnimationFrame(() => {
      document.body.classList.add("is-ready");
      observeReveals();
    });
  }
})();

async function start() {
  const cfg = await loadConfig();
  const page = document.body.dataset.page;
  const invite = getInvite();
  const { groom, bride } = cfg.couple;
  const w = cfg.wedding;
  const date = parseDate(w.date, w.time);

  const vars = {
    groomFirst: groom.firstName,
    brideFirst: bride.firstName,
    groomFull: groom.fullName,
    brideFull: bride.fullName,
    groomInitial: (groom.firstName || "?").charAt(0).toUpperCase(),
    brideInitial: (bride.firstName || "?").charAt(0).toUpperCase(),
    couple: `${groom.firstName} & ${bride.firstName}`,
    dateLong: fmtLong(date),
    dateShort: fmt(date, { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "."),
    timeLabel: fmtTime(w.time),
    venueName: w.venueName,
    address: w.address,
    city: w.city,
    fullAddress: [w.address, w.city].filter(Boolean).join(", "),
    deadline: fmtDay(parseDate(cfg.rsvp.deadline)),
    tagline: w.tagline,
    dressCode: w.dressCode?.text || "",
    phone: cfg.contact?.phone || "",
    email: cfg.contact?.email || "",
    invite
  };
  vars.monogram = `${vars.groomInitial} | ${vars.brideInitial}`;

  // Icônes déclarées dans le HTML : <span data-icon="heart"></span>
  $$("[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon); });

  renderChrome(cfg, vars, page);
  bindData(vars);

  if (page === "home") initHome(cfg, vars, invite);
  if (page === "groom" || page === "bride") initProfile(cfg, vars, page);
  if (page === "programme") initProgramme(cfg);
  if (page === "rsvp") initRsvp(cfg, vars, invite);
  if (page === "location") initLocation(cfg, vars);

  propagateInvite(invite);
  splitWords();
  startPetals();
  setupPageTransitions();
  setupMusic(cfg);
}
