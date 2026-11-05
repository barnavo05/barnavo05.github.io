/* barnavo os · the "operating system".
   you shouldn't need to touch this file to change content. that's js/content.js. */
(() => {
"use strict";

const C = window.CONTENT;
const S = C.site;

/* ================= helpers ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const h = html => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
};
const isMobile = () => document.body.classList.contains("mobile");
const prettyUrl = u => String(u).replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/* ================= glyphs (all original, drawn here) ================= */
const G = {
  notes: '<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>',
  ask: '<path d="M4.5 6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11l-4 3.5v-3.5h-.5a2 2 0 0 1-2-2z"/><path d="M10.2 8.9a1.9 1.9 0 1 1 2.6 1.8c-.5.2-.8.6-.8 1.1v.4M12 14.3v.1"/>',
  legal: '<path d="M12 3.5l7 2.8v5.2c0 4.3-3 7.4-7 9-4-1.6-7-4.7-7-9V6.3z"/><path d="M9 12l2 2 4-4"/>',
  finder: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2.2h7.5A2.5 2.5 0 0 1 21 9.7v7.8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/><path d="M3 10.5h18"/>',
  camera: '<path d="M4 8.5h3l1.8-2.7h6.4L17 8.5h3v10.5H4z"/><circle cx="12" cy="13.5" r="3.4"/>',
  music: '<path d="M9 17.5V6.2l10-2.2v11.3"/><circle cx="6.6" cy="17.6" r="2.4"/><circle cx="16.6" cy="15.4" r="2.4"/>',
  terminal: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M7 9.5l3 2.5-3 2.5M12.5 15h4.5"/>',
  preview: '<path d="M6.5 3h7.5l4.5 4.5V21h-12z"/><path d="M14 3v4.5h4.5M9.5 12h6M9.5 15.5h6"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.5 7.5l8.5 6 8.5-6"/>',
  wallpaper: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 16.5l-5-5-9 8"/>',
  code: '<path d="M8.5 7.5L4 12l4.5 4.5M15.5 7.5L20 12l-4.5 4.5M13.5 5l-3 14"/>',
  person: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.2"/>'
};
const ico = (g, cls = "ico") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${G[g]}</svg>`;
const LOGO = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.3 6.8v10M9.3 11.4h2.9a2.7 2.7 0 0 1 0 5.4H9.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CHEV = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
const L_X = '<svg viewBox="0 0 10 10"><path d="M2.8 2.8l4.4 4.4M7.2 2.8L2.8 7.2"/></svg>';
const L_MIN = '<svg viewBox="0 0 10 10"><path d="M2.3 5h5.4"/></svg>';
const L_MAX = '<svg viewBox="0 0 10 10"><path d="M5 2.3v5.4M2.3 5h5.4"/></svg>';
const UP = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" style="stroke-width:2.4"><path d="M12 19V5M5.5 11.5L12 5l6.5 6.5"/></svg>';
const EXT = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5H5V6h5"/></svg>';
const PLAY = '<svg viewBox="0 0 24 24"><path d="M7 4.5v15l12.5-7.5z"/></svg>';
const PAUSE = '<svg viewBox="0 0 24 24"><rect x="6" y="4.5" width="4" height="15" rx="1"/><rect x="14" y="4.5" width="4" height="15" rx="1"/></svg>';
const PREV = '<svg viewBox="0 0 24 24"><path d="M11.5 12L20 6v12zM3 12l8.5-6v12z"/></svg>';
const NEXT = '<svg viewBox="0 0 24 24"><path d="M12.5 12L4 6v12zM21 12l-8.5-6v12z"/></svg>';
const FOLDER = '<svg viewBox="0 0 40 32" aria-hidden="true"><path d="M1.5 5a2.5 2.5 0 0 1 2.5-2.5h9l3.5 3.5H36a2.5 2.5 0 0 1 2.5 2.5V10h-37z" fill="var(--c2)"/><rect x="1" y="8" width="38" height="23" rx="3" fill="var(--c1)"/></svg>';

/* ================= apps ================= */
const APPS = {
  notes:      { name: "Notes",       glyph: "notes",     g: "#d9a521", size: [800, 540], render: Notes },
  ask:        { name: "Ask Barnavo", glyph: "ask",       g: "#1d6670", size: [430, 600], render: Ask },
  finder:     { name: "Finder",      glyph: "finder",    g: "#1f4fb8", size: [720, 470], render: Finder },
  photobooth: { name: "Photo Booth", glyph: "camera",    g: "#a8392f", size: [680, 600], render: PhotoBooth, cls: "dark" },
  music:      { name: "Music",       glyph: "music",     g: "#2f6b57", size: [360, 620], render: Music },
  terminal:   { name: "Terminal",    glyph: "terminal",  g: "#1c2629", size: [660, 430], render: Terminal, cls: "dark" },
  preview:    { name: "Preview",     glyph: "preview",   g: "#56707b", size: [700, 700], render: Preview },
  mail:       { name: "Mail",        glyph: "mail",      g: "#3567a6", size: [560, 560], render: Mail },
  wallpapers: { name: "Wallpapers",  glyph: "wallpaper", g: "#8a6a35", size: [470, 380], render: Wallpapers },
  about:      { name: "About This OS", glyph: "info",    g: "#5b6668", size: [380, 430], render: About, hidden: true },
  legal:      { name: "Privacy & Terms", glyph: "legal",   g: "#5b6668", size: [560, 600], render: Legal, hidden: true }
};
const DOCK = ["finder", "notes", "ask", "mail", "photobooth", "music", "preview"];
const HOME_DOCK = ["notes", "ask", "finder", "mail"];
const HOME_GRID = ["preview", "photobooth", "music", "wallpapers", "x:github", "x:linkedin"];
const LINK_TILES = {
  github: { name: "GitHub", glyph: "code", g: "#24292e", url: S.github },
  linkedin: { name: "LinkedIn", glyph: "person", g: "#0a66c2", url: S.linkedin }
};
const tile = (def, size) => `<span class="icon" style="--g:${def.g};${size ? `--s:${size}px` : ""}">${ico(def.glyph, "")}</span>`;

/* ================= mini markdown ================= */
function inline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  s = s.replace(/(^|[\s(])\*(?!\s)(.+?)\*(?=[\s.,!?)]|$)/g, "$1<i>$2</i>");
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => {
    if (/^(app|note|project|copy):/.test(u)) return `<a href="#" data-open="${u}">${t}</a>`;
    if (/^mailto:/.test(u)) return `<a href="${u}">${t}</a>`;
    return `<a href="${u}" target="_blank" rel="noopener">${t}</a>`;
  });
  return s;
}
const inlineBlock = s => String(s).split(/\n+/).map(inline).join("<br>");
function md(src) {
  const lines = String(src).trim().split("\n");
  let html = "", list = null, para = [], tl = {}, tlOpen = false;
  const flushT = () => { if (tlOpen) { html += `<div class="tldr">${tl.title ? `<b>${inline(tl.title)}</b>` : ""}${tl.items ? `<ul>${tl.items.map(i => `<li>${inline(i)}</li>`).join("")}</ul>` : ""}</div>`; tl = {}; tlOpen = false; } };
  const flushP = () => { if (para.length) { html += `<p>${inline(para.join(" "))}</p>`; para = []; } };
  const flushL = () => { if (list) { html += `<ul>${list.map(li => `<li>${inline(li)}</li>`).join("")}</ul>`; list = null; } };
  for (const raw of lines) {
    const l = raw.trim();
    let m;
    if (!l) { flushP(); flushL(); flushT(); continue; }
    if ((m = l.match(/^\{\{(\w+):([\w-]+)\}\}$/))) { flushP(); flushL(); html += block(m[1], m[2]); continue; }
    if (l.startsWith("## ")) { flushP(); flushL(); html += `<h2>${inline(l.slice(3))}</h2>`; continue; }
    if (l.startsWith("# ")) { flushP(); flushL(); html += `<h1>${inline(l.slice(2))}</h1>`; continue; }
    if (l.startsWith("~ ")) { flushP(); flushL(); html += `<p class="meta">${inline(l.slice(2))}</p>`; continue; }
    if (l.startsWith("> ")) { flushP(); flushL(); const v = l.slice(2); if (/^- /.test(v)) { (tl.items = tl.items || []).push(v.slice(2)); } else tl.title = v; tlOpen = true; continue; }
    if (tlOpen) flushT();
    if (l.startsWith("- ")) { flushP(); (list = list || []).push(l.slice(2)); continue; }
    flushL(); para.push(l);
  }
  flushP(); flushL(); flushT();
  return html;
}
const plain = s => String(s).replace(/^> /gm, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*`]/g, "").replace(/\s+/g, " ").trim();
function snippet(n) {
  const l = n.body.split("\n").map(x => x.trim()).find(x => x && !/^(#|\{\{|>)/.test(x) && plain(x.replace(/^[~-]\s*/, "")));
  return plain((l || "").replace(/^[~-]\s*/, ""));
}

function block(type, id) {
  const P = C.profile;
  if (type === "roadmap") { const p = C.projects.find(x => x.id === id); return p && p.roadmap ? roadmapHTML(p.roadmap) : ""; }
  if (type === "contact") return contactButtons();
  if (type === "experience") {
    const list = id === "all" ? P.experience : P.experience.filter(x => x.id === id);
    return list.map(x => `<div class="xp"><h2>${esc(x.company)}</h2><p class="meta">${esc(x.role)}, ${esc(x.period)}, ${esc(x.location)}</p><p>${inline(x.about)}</p><ul>${x.bullets.map(b => `<li>${inline(b)}</li>`).join("")}</ul><div class="tags">${x.stack.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div></div>`).join("");
  }
  if (type === "leadership") return `<ul>${P.leadership.map(l => `<li><b>${esc(l.role)}</b>, ${esc(l.org)}${l.note ? ` (${esc(l.note)})` : ""}</li>`).join("")}</ul>`;
  if (type === "education") { const e = P.education; return `<ul><li><b>${esc(e.degree)}</b>, ${esc(e.school)}</li><li>graduated ${esc(e.year)}, CGPA ${esc(e.cgpa)}</li></ul>`; }
  if (type === "skills") return Object.entries(P.skills).map(([k, v]) => `<p class="meta" style="margin:8px 0 4px">${esc(k)}</p><div class="tags">${v.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>`).join("");
  return "";
}
function roadmapHTML(r) {
  const col = (k, t) => r[k] && r[k].length ? `<div class="road-col ${k}"><h5>${t}</h5><ul>${r[k].map(i => `<li>${inline(i)}</li>`).join("")}</ul></div>` : "";
  return `<div class="roadmap">${col("done", "done")}${col("now", "in progress")}${col("next", "next up")}</div>`;
}
function contactButtons() {
  return `<div class="btn-row"><button class="btn primary" data-open="copy:${esc(S.email)}">copy email</button><a class="btn" href="mailto:${esc(S.email)}">email me</a><a class="btn" href="${esc(S.linkedin)}" target="_blank" rel="noopener">linkedin</a><a class="btn" href="${esc(S.github)}" target="_blank" rel="noopener">github</a></div>`;
}

/* ================= toast, copy, notifications ================= */
let toastT;
function toast(msg) {
  let t = $(".toast");
  if (!t) { t = h('<div class="toast" role="status"></div>'); document.body.appendChild(t); }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add("in"));
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("in"), 1800);
}
async function copyText(text) {
  let ok = false;
  try { await navigator.clipboard.writeText(text); ok = true; }
  catch (e) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta); ta.select();
    try { ok = document.execCommand("copy"); } catch (_) { /* nope */ }
    ta.remove();
  }
  toast(ok ? "email copied" : `copy didn't work, it's ${text}`);
}
function notify(n) {
  if (!n || !APPS[n.app]) return;
  const el = h(`<button class="notif" aria-label="${esc(n.title)}: ${esc(n.body)}">${tile(APPS[n.app])}<span class="notif-text"><b>${esc(n.title)}</b><span>${esc(n.body)}</span></span><span class="notif-time">now</span></button>`);
  document.body.appendChild(el);
  const out = () => { el.classList.remove("in"); setTimeout(() => el.remove(), 500); };
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("in")));
  el.onclick = () => { openApp(n.app); out(); };
  setTimeout(out, 7000);
}

/* ================= window manager ================= */
const WM = { wins: new Map(), z: 100, n: 0, active: null };

function openApp(id, opts = {}) {
  const a = APPS[id];
  if (!a) return;
  return openWindow({ key: id, appId: id, title: a.name, size: a.size, cls: a.cls, render: a.render, opts });
}
function openProject(id) {
  const p = C.projects.find(x => x.id === id);
  if (!p) return;
  return openWindow({ key: "project:" + id, appId: "finder", title: p.name, size: [600, 640], render: b => ProjectView(b, p), child: true });
}
function openTarget(s) {
  const i = s.indexOf(":"), k = s.slice(0, i), v = s.slice(i + 1);
  if (k === "app") openApp(v);
  else if (k === "note") openApp("notes", { note: v });
  else if (k === "project") openProject(v);
  else if (k === "copy") copyText(v);
  else if (k === "url") window.open(v, "_blank", "noopener");
}

function openWindow(cfg) {
  const ex = WM.wins.get(cfg.key);
  if (ex) { restore(ex); focus(ex); if (ex.api && ex.api.update) ex.api.update(cfg.opts || {}); return ex; }
  const w = Object.assign({}, cfg);
  if (isMobile()) buildSheet(w); else buildWindow(w);
  WM.wins.set(w.key, w);
  focus(w);
  try { w.api = w.render($(".win-body", w.el), w.opts || {}, w) || {}; }
  catch (e) { console.error(e); $(".win-body", w.el).innerHTML = '<p style="padding:20px">this app crashed. very on brand for an os.</p>'; w.api = {}; }
  syncDock();
  return w;
}

function buildWindow(w) {
  const desk = $("#windows");
  const vw = desk.clientWidth, vh = desk.clientHeight - 80;
  const [dw, dh] = w.size || [600, 420];
  const width = Math.min(dw, vw - 30), height = Math.max(220, Math.min(dh, vh - 16));
  const off = (WM.n++ % 7) * 28;
  const left = Math.max(8, Math.min(vw - width - 8, Math.round((vw - width) / 2) - 90 + off));
  const top = Math.max(6, Math.min(vh - height, Math.round((vh - height) / 2) - 40 + off));
  w.el = h(`<section class="win ${w.cls || ""}" role="dialog" aria-label="${esc(w.title)}" style="left:${left}px;top:${top}px;width:${width}px;height:${height}px">
    <header class="win-bar"><div class="lights"><button class="l close" aria-label="Close">${L_X}</button><button class="l min" aria-label="Minimize">${L_MIN}</button><button class="l max" aria-label="Zoom">${L_MAX}</button></div><div class="win-title">${esc(w.title)}</div></header>
    <div class="win-body"></div><div class="win-resize" aria-hidden="true"></div></section>`);
  desk.appendChild(w.el);
  w.el.addEventListener("pointerdown", () => { if (WM.active !== w) focus(w); });
  $(".close", w.el).onclick = e => { e.stopPropagation(); closeWin(w); };
  $(".min", w.el).onclick = e => { e.stopPropagation(); minimize(w); };
  $(".max", w.el).onclick = e => { e.stopPropagation(); w.el.classList.toggle("maxed"); };
  const bar = $(".win-bar", w.el);
  bar.addEventListener("dblclick", e => { if (!e.target.closest(".lights")) w.el.classList.toggle("maxed"); });
  dragWin(bar, w.el);
  resizeWin($(".win-resize", w.el), w.el);
}

function track(handle, e, onMove) {
  handle.setPointerCapture(e.pointerId);
  document.body.classList.add("dragging");
  const move = ev => onMove(ev);
  const up = () => {
    handle.removeEventListener("pointermove", move);
    handle.removeEventListener("pointerup", up);
    handle.removeEventListener("pointercancel", up);
    document.body.classList.remove("dragging");
  };
  handle.addEventListener("pointermove", move);
  handle.addEventListener("pointerup", up);
  handle.addEventListener("pointercancel", up);
}
function dragWin(bar, el) {
  bar.addEventListener("pointerdown", e => {
    if (e.button !== 0 || e.target.closest("button") || el.classList.contains("maxed")) return;
    const sx = e.clientX, sy = e.clientY, ox = el.offsetLeft, oy = el.offsetTop, P = el.parentElement;
    track(bar, e, ev => {
      el.style.left = Math.min(P.clientWidth - 90, Math.max(90 - el.offsetWidth, ox + ev.clientX - sx)) + "px";
      el.style.top = Math.min(P.clientHeight - 40, Math.max(0, oy + ev.clientY - sy)) + "px";
    });
  });
}
function resizeWin(grip, el) {
  grip.addEventListener("pointerdown", e => {
    if (e.button !== 0) return;
    e.stopPropagation();
    const sx = e.clientX, sy = e.clientY, ow = el.offsetWidth, oh = el.offsetHeight;
    track(grip, e, ev => {
      el.style.width = Math.max(320, ow + ev.clientX - sx) + "px";
      el.style.height = Math.max(220, oh + ev.clientY - sy) + "px";
    });
  });
}

function buildSheet(w) {
  const parent = [...WM.wins.values()].some(x => x.el && x.el.classList.contains("sheet"));
  w.el = h(`<section class="sheet ${w.cls || ""} ${parent ? "child" : ""}" role="dialog" aria-label="${esc(w.title)}"><header class="sheet-bar"><button class="sheet-back">${CHEV}${parent ? "back" : "home"}</button><div class="sheet-title">${esc(w.title)}</div></header><div class="win-body"></div></section>`);
  document.body.appendChild(w.el);
  $(".sheet-back", w.el).onclick = () => closeWin(w);
}

function focus(w) {
  if (!w || !w.el) return;
  w.el.style.zIndex = (isMobile() ? 6000 : 0) + (++WM.z);
  WM.wins.forEach(x => x.el.classList.toggle("inactive", x !== w));
  WM.active = w;
  updateMenuApp();
}
function focusTop() {
  let top = null;
  WM.wins.forEach(w => { if (!w.min && (!top || +w.el.style.zIndex > +top.el.style.zIndex)) top = w; });
  if (top) focus(top); else { WM.active = null; updateMenuApp(); }
}
function minimize(w) {
  const dockIcon = $(`.dock-item[data-app="${w.appId}"]`);
  if (dockIcon) {
    const a = dockIcon.getBoundingClientRect(), b = w.el.getBoundingClientRect();
    w.el.style.setProperty("--dx", (a.left + a.width / 2 - (b.left + b.width / 2)) + "px");
    w.el.style.setProperty("--dy", (a.top + a.height / 2 - (b.top + b.height / 2)) + "px");
  }
  w.min = true;
  w.el.classList.add("minimized");
  if (WM.active === w) focusTop();
}
function restore(w) { if (w.min) { w.min = false; w.el.classList.remove("minimized"); } }
function closeWin(w) {
  if (!WM.wins.has(w.key)) return;
  try { w.api && w.api.destroy && w.api.destroy(); } catch (e) { /* ignore */ }
  WM.wins.delete(w.key);
  w.el.classList.add(w.el.classList.contains("sheet") ? "out" : "closing");
  setTimeout(() => w.el.remove(), 260);
  if (WM.active === w) focusTop();
  syncDock();
}
function closeAll() {
  WM.wins.forEach(w => { try { w.api && w.api.destroy && w.api.destroy(); } catch (e) { /* ignore */ } w.el.remove(); });
  WM.wins.clear(); WM.active = null; syncDock(); updateMenuApp();
}
function dockClick(id) {
  WM.wins.forEach(w => { if (w.appId === id && w.min) restore(w); });
  openApp(id);
}
function syncDock() {
  const running = new Set([...WM.wins.values()].map(w => w.appId));
  $$(".dock-item").forEach(d => d.classList.toggle("running", running.has(d.dataset.app)));
}
function updateMenuApp() {
  const el = $("#mb-app");
  if (el) el.textContent = WM.active ? (APPS[WM.active.appId] || {}).name || "" : "Finder";
}

/* ================= menu bar, desktop, dock ================= */
function setWallpaper(id) {
  const wp = C.wallpapers.find(x => x.id === id) || C.wallpapers[0];
  if (!wp) return;
  $("#wall").style.backgroundImage = wp.image ? `url("${wp.image}")` : wp.css;
  store.set("bos-wall", wp.id);
  $$(".swatch").forEach(s => s.classList.toggle("on", s.dataset.wp === wp.id));
}
const swatchesHTML = () => `<div class="swatches">${C.wallpapers.map(w => `<button class="swatch" data-wp="${w.id}"><i style="background-image:${esc(w.image ? `url("${w.image}")` : w.css)}"></i>${esc(w.name)}</button>`).join("")}</div>`;
const currentWall = () => store.get("bos-wall") || S.defaultWallpaper;

function buildMenubar() {
  $("#menubar").innerHTML = `
    <div class="mb-left">
      <button class="mb-item mb-logo" data-menu="logo" aria-label="${esc(S.osName)} menu">${LOGO}</button>
      <span class="mb-item mb-name">${esc(S.name)}</span>
      <span class="mb-item mb-app" id="mb-app">Finder</span>
      <button class="mb-item mb-nav" data-open="note:about">about</button>
      <button class="mb-item mb-nav" data-open="app:finder">projects</button>
      <button class="mb-item mb-nav" data-open="app:preview">resume</button>
      <button class="mb-item mb-nav" data-open="note:hit-me-up">contact</button>
    </div>
    <div class="mb-right">
      <button class="mb-item mb-icon" data-menu="wall" aria-label="Change wallpaper">${ico("wallpaper")}</button>
      <span class="mb-item mb-date" id="mb-date"></span>
      <span class="mb-item mb-time" id="mb-time"></span>
    </div>`;
  document.body.appendChild(h(`<div class="menu" id="menu-logo" role="menu">
    <button data-open="app:about">About ${esc(S.osName)}</button><hr>
    <button data-open="note:hit-me-up">Hire Barnavo...</button>
    <button data-open="app:wallpapers">Change Wallpaper...</button>
    <button data-open="app:terminal">Open Terminal</button><hr>
    <button data-open="app:legal">Privacy and Terms</button><hr>
    <button data-act="closeall">Close All Windows</button>
    <button data-act="restart">Restart...</button></div>`));
  document.body.appendChild(h(`<div class="menu" id="menu-wall" role="menu"><div class="menu-label">wallpaper</div>${swatchesHTML()}</div>`));
  document.body.appendChild(h(`<div class="menu" id="menu-ctx" role="menu">
    <button data-open="app:wallpapers">Change Wallpaper...</button>
    <button data-open="app:finder">Open Projects</button>
    <button data-open="app:terminal">Open Terminal</button><hr>
    <button data-open="app:about">About ${esc(S.osName)}</button></div>`));

  $("#menubar").addEventListener("click", e => {
    const b = e.target.closest("[data-menu]");
    if (!b) return;
    e.stopPropagation();
    const m = $("#menu-" + b.dataset.menu), was = m.classList.contains("show");
    closeMenus();
    if (was) return;
    const r = b.getBoundingClientRect();
    m.style.top = (r.bottom + 2) + "px";
    m.style.left = Math.min(r.left, window.innerWidth - (b.dataset.menu === "wall" ? 300 : 240)) + "px";
    if (b.dataset.menu === "wall") m.style.width = "300px";
    m.classList.add("show"); b.classList.add("open");
  });
  $("#menu-logo").addEventListener("click", e => {
    const a = e.target.closest("[data-act]");
    if (!a) return;
    closeMenus();
    if (a.dataset.act === "closeall") closeAll();
    if (a.dataset.act === "restart") { closeAll(); boot(); }
  });
}
function closeMenus() {
  $$(".menu.show").forEach(m => m.classList.remove("show"));
  $$(".mb-item.open").forEach(m => m.classList.remove("open"));
}

function buildDesktop() {
  const icons = [
    { open: "app:finder", label: "Projects", def: APPS.finder },
    { open: "app:preview", label: "resume.pdf", def: APPS.preview },
    { open: "note:about", label: "read me first.txt", def: APPS.notes }
  ];
  $(".desk-icons").innerHTML = icons.map(i => `<button class="desk-icon" data-dbl="${i.open}">${tile(i.def, 54)}<span>${esc(i.label)}</span></button>`).join("");
  $(".desk-icons").addEventListener("click", e => {
    const b = e.target.closest(".desk-icon");
    $$(".desk-icon").forEach(x => x.classList.toggle("sel", x === b));
  });
  $(".desk-icons").addEventListener("dblclick", e => { const b = e.target.closest(".desk-icon"); if (b) openTarget(b.dataset.dbl); });
  $(".desk-icons").addEventListener("pointerup", e => { const b = e.target.closest(".desk-icon"); if (b && e.pointerType === "touch") openTarget(b.dataset.dbl); });
  $(".desk-icons").addEventListener("keydown", e => { const b = e.target.closest(".desk-icon"); if (b && e.key === "Enter") openTarget(b.dataset.dbl); });

  $("#desktop").addEventListener("pointerdown", e => { if (!e.target.closest(".desk-icon")) $$(".desk-icon").forEach(x => x.classList.remove("sel")); });
  $("#desktop").addEventListener("contextmenu", e => {
    if (e.target.closest(".win")) return;
    e.preventDefault(); closeMenus();
    const m = $("#menu-ctx");
    m.style.left = Math.min(e.clientX, window.innerWidth - 240) + "px";
    m.style.top = Math.min(e.clientY, window.innerHeight - 160) + "px";
    m.classList.add("show");
  });

  $("#dock").innerHTML = DOCK.map((id, i) => `${i === DOCK.length - 1 ? '<span class="dock-sep"></span>' : ""}<button class="dock-item" data-app="${id}" aria-label="${esc(APPS[id].name)}">${tile(APPS[id])}<span class="tip">${esc(APPS[id].name)}</span></button>`).join("");
  $("#dock").addEventListener("click", e => { const b = e.target.closest(".dock-item"); if (b) dockClick(b.dataset.app); });
}

function buildHome() {
  const t = id => {
    if (id.startsWith("x:")) { const L = LINK_TILES[id.slice(2)]; return `<a class="app-tile" href="${esc(L.url)}" target="_blank" rel="noopener">${tile(L)}<span>${esc(L.name)}</span></a>`; }
    return `<button class="app-tile" data-open="app:${id}">${tile(APPS[id])}<span>${esc(APPS[id].name)}</span></button>`;
  };
  $("#home").innerHTML = `
    <div class="status"><span class="status-time"></span><span class="status-icons" aria-hidden="true">
      <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
      <svg viewBox="0 0 28 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".5"/><rect x="2" y="2" width="17" height="9" rx="2"/><rect x="25" y="4.5" width="2" height="4" rx="1" opacity=".5"/></svg>
    </span></div>
    <div class="home-grid">
      <div class="widget"><span class="w-name">${esc(S.name)}</span><span class="w-sub">${esc(S.headline)}</span>
        <span class="w-row"><button class="btn primary" data-open="note:about">read about me</button><button class="btn" data-open="app:preview">resume</button><button class="btn" data-open="app:mail">contact</button></span></div>
      ${HOME_GRID.map(t).join("")}
    </div>
    <p class="home-legal"><button data-open="app:legal">privacy and terms</button></p>
    <nav class="home-dock" aria-label="Dock">${HOME_DOCK.map(t).join("")}</nav>`;
}

function tick() {
  const d = new Date();
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const date = `${d.toLocaleDateString("en-US", { weekday: "short" })} ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  const a = $("#mb-time"), b = $("#mb-date");
  if (a) a.textContent = time;
  if (b) b.textContent = date;
  $$(".status-time").forEach(e => { e.textContent = time.replace(/\s?[AP]M$/, ""); });
}

/* ================= NOTES ================= */
function Notes(body, opts) {
  const notes = C.notes;
  body.innerHTML = `<div class="notes"><aside class="notes-side"><div class="notes-search"><input type="search" placeholder="search notes" aria-label="Search notes"></div><h4>${esc(S.shortName)}'s notes</h4><div class="notes-list"></div></aside><article class="note-view"><button class="note-back">${CHEV}notes</button><div class="prose"></div></article></div>`;
  const root = $(".notes", body), list = $(".notes-list", body), view = $(".prose", body), art = $(".note-view", body), q = $("input", body);
  let cur = null;
  const drawList = () => {
    const f = q.value.trim().toLowerCase();
    const shown = notes.filter(n => !f || plain(n.title + " " + n.body).toLowerCase().includes(f));
    list.innerHTML = shown.map(n => `<button class="note-item ${n.id === cur ? "on" : ""}" data-id="${n.id}"><b>${esc(n.title)}</b><small>${esc(snippet(n))}</small></button>`).join("") || '<p class="empty">no notes found. try "jobpipe".</p>';
  };
  const show = id => {
    const n = notes.find(x => x.id === id) || notes[0];
    cur = n.id; view.innerHTML = md(n.body); art.scrollTop = 0;
    drawList(); root.classList.add("detail");
  };
  list.addEventListener("click", e => { const b = e.target.closest(".note-item"); if (b) show(b.dataset.id); });
  $(".note-back", body).onclick = () => root.classList.remove("detail");
  q.addEventListener("input", drawList);
  show(opts.note || notes[0].id);
  if (isMobile() && !opts.note) root.classList.remove("detail");
  return { update(o) { if (o.note) show(o.note); } };
}

/* ================= ASK BARNAVO ================= */
function matchAnswer(q) {
  const A = C.askBarnavo;
  const t = " " + q.toLowerCase().replace(/[^a-z0-9/.+ ]/g, " ").replace(/\s+/g, " ").trim() + " ";
  let best = null, score = 0;
  for (const item of A.qa) {
    let s = 0;
    for (const k of item.keywords) {
      const kk = k.toLowerCase();
      if (t.includes(" " + kk + " ")) s += 2 + kk.split(" ").length;
      else if (kk.length > 4 && t.includes(kk)) s += 1;
    }
    if (s > score) { score = s; best = item; }
  }
  return best ? best.a : A.fallback;
}
function profileContext() {
  return C.notes.map(n => `## ${n.title}\n${plain(n.body.replace(/\{\{[^}]+\}\}/g, ""))}`).join("\n\n") +
    "\n\n## experience\n" + C.profile.experience.map(x => `${x.company}, ${x.role}, ${x.period}: ${x.bullets.join("; ")}`).join("\n") +
    "\n\n## projects\n" + C.projects.map(p => `${p.name}: ${p.what} live: ${p.live || "none"} repo: ${p.repo}`).join("\n");
}
/* swap point for a real llm. it POSTs to YOUR endpoint (see README), never to an llm directly. */
async function getAnswer(q, history) {
  const cfg = C.askBarnavo.llm;
  if (cfg && cfg.enabled && cfg.endpoint) {
    try {
      const r = await fetch(cfg.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history: history.slice(-8), context: profileContext() })
      });
      if (r.ok) { const j = await r.json(); if (j && j.answer) return j.answer; }
    } catch (e) { /* fall back to keywords */ }
  }
  return matchAnswer(q);
}
function Ask(body) {
  const A = C.askBarnavo;
  const initials = S.name.split(" ").map(x => x[0]).join("").slice(0, 2);
  body.innerHTML = `<div class="ask"><div class="ask-head"><span class="ask-avatar">${esc(initials)}</span><div><b>Ask Barnavo</b><small>${esc(A.subtitle)}</small></div></div>
    <div class="ask-log" role="log" aria-live="polite"></div><div class="ask-chips"></div>
    <form class="ask-form"><input placeholder="${esc(A.placeholder)}" aria-label="Ask a question" autocomplete="off" maxlength="300" enterkeyhint="send"><button class="ask-send" aria-label="Send">send</button></form></div>`;
  const log = $(".ask-log", body), input = $("input", body), history = [];
  let busy = false;
  const bubble = (who, html) => { const b = h(`<div class="msg ${who}"><div class="bub">${html}</div></div>`); log.appendChild(b); log.scrollTop = log.scrollHeight; return b; };
  async function ask(q) {
    q = q.trim();
    if (!q || busy) return;
    busy = true;
    bubble("me", esc(q)); input.value = "";
    history.push({ role: "user", content: q });
    const t = bubble("bot", '<span class="dots"><i></i><i></i><i></i></span>');
    const [ans] = await Promise.all([getAnswer(q, history), sleep(500 + Math.random() * 450)]);
    $(".bub", t).innerHTML = inlineBlock(ans);
    t.classList.add("pop");
    history.push({ role: "assistant", content: ans });
    log.scrollTop = log.scrollHeight;
    busy = false;
  }
  bubble("bot", inlineBlock(A.greeting));
  $(".ask-chips", body).innerHTML = A.chips.map(c => `<button class="chip">${esc(c)}</button>`).join("");
  $(".ask-chips", body).addEventListener("click", e => { const c = e.target.closest(".chip"); if (c) ask(c.textContent); });
  $(".ask-form", body).addEventListener("submit", e => { e.preventDefault(); ask(input.value); });
  if (!isMobile()) setTimeout(() => input.focus(), 250);
}

/* ================= FINDER ================= */
function Finder(body) {
  const P = C.projects;
  body.innerHTML = `<div class="finder"><aside class="f-side">
      <h4>Favorites</h4>
      <button class="f-link on">${ico("finder")}Projects</button>
      <button class="f-link" data-open="app:preview">${ico("preview")}resume.pdf</button>
      <button class="f-link" data-open="app:notes">${ico("notes")}Notes</button>
      <h4>Elsewhere</h4>
      <a class="f-link" href="${esc(S.github)}" target="_blank" rel="noopener">${ico("code")}GitHub</a>
      <a class="f-link" href="${esc(S.linkedin)}" target="_blank" rel="noopener">${ico("person")}LinkedIn</a>
    </aside><main class="f-main"><div class="f-top"><b>Projects</b><span>${P.length} items</span></div>
    <div class="f-list">${P.map((p, i) => `<button class="f-row" data-open="project:${p.id}"><span class="folder" style="--c1:${p.colors[0]};--c2:${p.colors[1]}">${FOLDER}</span><span><b>${esc(p.name)}</b><small>${esc(p.tagline)}</small></span><span class="f-status ${i === 0 ? "hot" : ""}">${esc(p.status || "")}</span></button>`).join("")}</div>
    </main></div>`;
}
function ProjectView(body, p) {
  const btns = [
    p.live ? `<a class="btn primary" href="${esc(p.live)}" target="_blank" rel="noopener">${EXT}live demo</a>` : "",
    p.repo ? `<a class="btn" href="${esc(p.repo)}" target="_blank" rel="noopener">${ico("code")}github</a>` : ""
  ].join("");
  const sec = (t, html) => html ? `<h2>${t}</h2>${html}` : "";
  body.innerHTML = `<div class="scroll"><div class="proj-hero" style="--c1:${p.colors[0]};--c2:${p.colors[1]}"><span class="proj-badge">${esc(p.status)}</span><h1>${esc(p.name)}</h1><p>${inline(p.tagline)}</p>
    <div class="btn-row" style="margin:0">${btns}${!p.live ? '<span class="note-live">no live link yet, still cooking</span>' : ""}</div></div>
    <div class="proj-body prose">
      ${p.demo ? `<figure class="demo-wrap"><div class="demo skel">${/\.(mp4|webm)$/.test(p.demo) ? `<video src="${esc(p.demo)}" muted loop playsinline autoplay preload="metadata"></video>` : `<img src="${esc(p.demo)}" alt="${esc(p.name)} screenshot" loading="lazy">`}</div>${p.demoCaption ? `<figcaption>${inline(p.demoCaption)}</figcaption>` : ""}</figure>` : ""}
      ${sec("what it is", `<p>${inline(p.what)}</p>`)}
      ${sec("the problem", p.problem ? `<p>${inline(p.problem)}</p>` : "")}
      ${sec("my decisions", p.decisions && p.decisions.length ? `<ul>${p.decisions.map(d => `<li>${inline(d)}</li>`).join("")}</ul>` : "")}
      ${sec("wins", p.highlights && p.highlights.length ? `<ul>${p.highlights.map(d => `<li>${inline(d)}</li>`).join("")}</ul>` : "")}
      ${p.roadmap ? sec("roadmap", roadmapHTML(p.roadmap)) : ""}
      ${sec("what i'd do next", p.next ? `<p>${inline(p.next)}</p>` : "")}
      ${sec("stack", p.stack && p.stack.length ? `<div class="tags">${p.stack.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div>` : "")}
    </div></div>`;
  const media = $(".demo img, .demo video", body);
  if (media) {
    const done = () => media.parentElement.classList.remove("skel");
    media.addEventListener(media.tagName === "IMG" ? "load" : "loadeddata", done);
    media.addEventListener("error", () => media.closest("figure").remove());
    if (media.complete && media.naturalWidth) done();
  }
}

/* ================= PHOTO BOOTH ================= */
const FILTERS = [
  { name: "normal", ops: [] },
  { name: "mono", ops: [["grayscale", 1]] },
  { name: "noir", ops: [["grayscale", 1], ["contrast", 1.6], ["brightness", 0.95]] },
  { name: "vintage", ops: [["sepia", 0.65], ["contrast", 1.1], ["brightness", 1.05]] },
  { name: "pop", ops: [["saturate", 1.9], ["contrast", 1.15]] },
  { name: "alien", ops: [["hue-rotate", 110], ["saturate", 1.5]] },
  { name: "x-ray", ops: [["grayscale", 1], ["invert", 1], ["contrast", 1.3]] }
];
const cssFilter = ops => ops.length ? ops.map(([k, v]) => k === "hue-rotate" ? `${k}(${v}deg)` : `${k}(${v})`).join(" ") : "none";
/* same color matrices browsers use for css filters, so the photo matches the preview */
function matrix(k, v) {
  if (k === "grayscale") { const a = 1 - v; return [.2126 + .7874 * a, .7152 - .7152 * a, .0722 - .0722 * a, .2126 - .2126 * a, .7152 + .2848 * a, .0722 - .0722 * a, .2126 - .2126 * a, .7152 - .7152 * a, .0722 + .9278 * a]; }
  if (k === "sepia") { const a = 1 - v; return [.393 + .607 * a, .769 - .769 * a, .189 - .189 * a, .349 - .349 * a, .686 + .314 * a, .168 - .168 * a, .272 - .272 * a, .534 - .534 * a, .131 + .869 * a]; }
  if (k === "saturate") return [.213 + .787 * v, .715 - .715 * v, .072 - .072 * v, .213 - .213 * v, .715 + .285 * v, .072 - .072 * v, .213 - .213 * v, .715 - .715 * v, .072 + .928 * v];
  if (k === "hue-rotate") { const r = v * Math.PI / 180, c = Math.cos(r), s = Math.sin(r); return [.213 + c * .787 - s * .213, .715 - c * .715 - s * .715, .072 - c * .072 + s * .928, .213 - c * .213 + s * .143, .715 + c * .285 + s * .140, .072 - c * .072 - s * .283, .213 - c * .213 - s * .787, .715 - c * .715 + s * .715, .072 + c * .928 + s * .072]; }
  return null;
}
function applyOps(img, ops) {
  const d = img.data;
  for (const [k, v] of ops) {
    const m = matrix(k, v);
    for (let p = 0; p < d.length; p += 4) {
      let r = d[p], g = d[p + 1], b = d[p + 2];
      if (m) { const nr = m[0] * r + m[1] * g + m[2] * b, ng = m[3] * r + m[4] * g + m[5] * b, nb = m[6] * r + m[7] * g + m[8] * b; r = nr; g = ng; b = nb; }
      else if (k === "contrast") { r = (r - 127.5) * v + 127.5; g = (g - 127.5) * v + 127.5; b = (b - 127.5) * v + 127.5; }
      else if (k === "brightness") { r *= v; g *= v; b *= v; }
      else if (k === "invert") { r += (255 - 2 * r) * v; g += (255 - 2 * g) * v; b += (255 - 2 * b) * v; }
      d[p] = r; d[p + 1] = g; d[p + 2] = b;
    }
  }
}
function PhotoBooth(body) {
  body.innerHTML = `<div class="pb"><div class="pb-stage"><video playsinline muted autoplay></video>
      <div class="pb-off"><span class="lens"></span><p>photo booth needs your camera.<br>everything stays on your device. nothing is uploaded, ever.</p><button class="btn primary pb-start">turn on camera</button></div>
      <div class="pb-count" aria-live="assertive"></div><div class="pb-flash"></div></div>
    <div class="pb-filters" role="toolbar" aria-label="Filters">${FILTERS.map((f, i) => `<button data-i="${i}" class="${i ? "" : "on"}">${f.name}</button>`).join("")}</div>
    <div class="pb-controls"><button class="shutter" disabled aria-label="Take photo"></button></div>
    <div class="pb-strip" aria-label="Your photos"></div>
    <p class="pb-note">tap a photo to download it. photos live only in this tab.</p></div>`;
  const video = $("video", body), off = $(".pb-off", body), shutter = $(".shutter", body), count = $(".pb-count", body), strip = $(".pb-strip", body);
  let stream = null, f = FILTERS[0], shots = 0, busy = false, dead = false;

  $(".pb-start", body).onclick = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      $("p", off).innerHTML = "this browser can't reach a camera here. photo booth needs https and a camera."; return;
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
      if (dead) { stream.getTracks().forEach(t => t.stop()); return; }
      video.srcObject = stream;
      off.hidden = true; shutter.disabled = false;
    } catch (e) {
      $("p", off).innerHTML = "no camera access. if you blocked it, you can allow it in your browser's site settings and try again.";
    }
  };
  $(".pb-filters", body).addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    f = FILTERS[+b.dataset.i];
    $$(".pb-filters button", body).forEach(x => x.classList.toggle("on", x === b));
    video.style.filter = cssFilter(f.ops);
  });
  shutter.onclick = async () => {
    if (busy || !stream) return;
    busy = true;
    for (const n of [3, 2, 1]) { count.textContent = n; await sleep(650); }
    count.textContent = "";
    const vw = video.videoWidth, vh = video.videoHeight;
    if (!vw) { busy = false; return; }
    const cv = document.createElement("canvas");
    cv.width = vw; cv.height = vh;
    const ctx = cv.getContext("2d");
    ctx.translate(vw, 0); ctx.scale(-1, 1); ctx.drawImage(video, 0, 0, vw, vh); ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (f.ops.length) { const img = ctx.getImageData(0, 0, vw, vh); applyOps(img, f.ops); ctx.putImageData(img, 0, 0); }
    const fs = Math.round(vh * .028);
    ctx.font = `600 ${fs}px ${getComputedStyle(document.body).fontFamily}`;
    ctx.fillStyle = "rgba(255,255,255,.85)"; ctx.textAlign = "right"; ctx.shadowColor = "rgba(0,0,0,.5)"; ctx.shadowBlur = 6;
    ctx.fillText(`${S.osName} photo booth`, vw - fs, vh - fs);
    const flash = $(".pb-flash", body); flash.classList.remove("go"); void flash.offsetWidth; flash.classList.add("go");
    const url = cv.toDataURL("image/jpeg", .92);
    shots++;
    strip.prepend(h(`<a href="${url}" download="barnavo-os-photo-${shots}.jpg" title="download photo ${shots}"><img src="${url}" alt="photo ${shots}"></a>`));
    while (strip.children.length > 10) strip.lastElementChild.remove();
    toast("snap! tap the photo to download");
    busy = false;
  };
  return { destroy() { dead = true; if (stream) stream.getTracks().forEach(t => t.stop()); } };
}

/* ================= MUSIC ================= */
function Music(body) {
  const T = C.music.tracks || [];
  if (!T.length) { body.innerHTML = '<p style="padding:24px" class="muted">no tracks yet. add some in js/content.js</p>'; return; }
  const audio = new Audio(); audio.preload = "metadata";
  const WAVE = '<svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 C20 30 35 30 50 45 S80 65 100 45 S135 20 150 38 S185 60 200 42 V80 H0Z" fill="rgba(255,255,255,.25)"/><path d="M0 62 C25 50 40 55 60 60 S95 70 115 58 S160 45 200 58 V80 H0Z" fill="rgba(255,255,255,.3)"/></svg>';
  body.innerHTML = `<div class="music scroll"><div class="mu-art">${WAVE}<span class="mu-art-title"></span></div>
    <div class="mu-meta"><b class="mu-title"></b><span class="mu-artist"></span></div>
    <input class="mu-seek" type="range" min="0" max="1000" value="0" aria-label="Seek">
    <div class="mu-times"><span class="mu-cur">0:00</span><span class="mu-dur">0:00</span></div>
    <div class="mu-ctrls"><button class="mu-prev" aria-label="Previous track">${PREV}</button><button class="mu-play" aria-label="Play">${PLAY}</button><button class="mu-next" aria-label="Next track">${NEXT}</button></div>
    <p class="mu-err" hidden></p>
    <ol class="mu-list">${T.map((t, k) => `<li><button data-i="${k}"><span>${k + 1}</span><b>${esc(t.title)}</b><small>${esc(t.length || "")}</small></button></li>`).join("")}</ol>
    ${C.music.credit ? `<p class="mu-credit">${inline(C.music.credit)}</p>` : ""}</div>`;
  const el = s => $(s, body);
  const fmt = s => isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00";
  let i = 0;
  const set = p => { el(".mu-play").innerHTML = p ? PAUSE : PLAY; el(".mu-play").setAttribute("aria-label", p ? "Pause" : "Play"); };
  const play = () => { const pr = audio.play(); if (pr && pr.catch) pr.catch(() => {}); };
  function load(k, autoplay) {
    i = (k + T.length) % T.length;
    const t = T[i];
    audio.src = t.src;
    el(".mu-title").textContent = t.title; el(".mu-artist").textContent = t.artist; el(".mu-art-title").textContent = t.title;
    const c = t.colors || ["#2e4b57", "#c9b48a"];
    el(".mu-art").style.setProperty("--c1", c[0]); el(".mu-art").style.setProperty("--c2", c[1]);
    el(".mu-err").hidden = true; el(".mu-seek").value = 0; el(".mu-cur").textContent = "0:00"; el(".mu-dur").textContent = "0:00";
    $$(".mu-list button", body).forEach((b, j) => b.classList.toggle("on", j === i));
    if (autoplay) play();
  }
  audio.onplay = () => set(true);
  audio.onpause = () => set(false);
  audio.ontimeupdate = () => { if (audio.duration) { el(".mu-seek").value = audio.currentTime / audio.duration * 1000; el(".mu-cur").textContent = fmt(audio.currentTime); } };
  audio.onloadedmetadata = () => { el(".mu-dur").textContent = fmt(audio.duration); };
  audio.onended = () => load(i + 1, true);
  audio.onerror = () => {
    if (!audio.getAttribute("src")) return;
    set(false);
    const e = el(".mu-err"); e.hidden = false;
    e.textContent = `couldn't load "${T[i].title}". check that the file exists at ${T[i].src}`;
  };
  el(".mu-play").onclick = () => audio.paused ? play() : audio.pause();
  el(".mu-prev").onclick = () => (audio.currentTime > 3 ? (audio.currentTime = 0) : load(i - 1, !audio.paused));
  el(".mu-next").onclick = () => load(i + 1, !audio.paused);
  el(".mu-seek").oninput = e => { if (audio.duration) audio.currentTime = e.target.value / 1000 * audio.duration; };
  el(".mu-list").addEventListener("click", e => { const b = e.target.closest("button"); if (b) load(+b.dataset.i, true); });
  load(0, false);
  return { destroy() { audio.pause(); audio.removeAttribute("src"); audio.load(); } };
}

/* ================= TERMINAL ================= */
function resumeText() {
  const P = C.profile, e = P.education;
  const out = [];
  out.push(`<b>${esc(S.name.toUpperCase())}</b>`, esc(S.headline), `${esc(S.email)} · ${esc(prettyUrl(S.linkedin))} · ${esc(prettyUrl(S.github))}`, "");
  out.push("<b>EXPERIENCE</b>");
  P.experience.forEach(x => { out.push(`${esc(x.company)}, ${esc(x.role)} (${esc(x.period)}, ${esc(x.location)})`); x.bullets.forEach(b => out.push(`  • ${esc(b)}`)); out.push(`  stack: ${esc(x.stack.join(", "))}`); });
  out.push("", "<b>PRODUCTS</b>");
  C.projects.forEach(p => out.push(`  • ${esc(p.name)}: ${esc(p.tagline)}`));
  out.push("", "<b>EDUCATION</b>", `${esc(e.degree)}, ${esc(e.school)}, ${esc(e.year)}, CGPA ${esc(e.cgpa)}`);
  out.push("", "<b>LEADERSHIP</b>");
  P.leadership.forEach(l => out.push(`  • ${esc(l.role)}, ${esc(l.org)}`));
  out.push("", "<b>SKILLS</b>");
  Object.entries(P.skills).forEach(([k, v]) => out.push(`  ${esc(k)}: ${esc(v.join(", "))}`));
  out.push("", 'want the pdf? type <code>open resume</code>');
  return out.join("\n");
}
function Terminal(body, opts, win) {
  const T = C.terminal, PROMPT = `${T.user}@${T.host} ~ %`;
  body.innerHTML = `<div class="term"><div class="term-out"></div><form class="term-line"><span class="prompt">${esc(PROMPT)}</span><input class="term-in" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Terminal command" enterkeyhint="go"></form></div>`;
  const term = $(".term", body), out = $(".term-out", body), input = $(".term-in", body);
  const hist = []; let hi = 0, running = false;
  const print = (html, cls = "") => { out.insertAdjacentHTML("beforeend", `<div class="tl ${cls}">${html}</div>`); term.scrollTop = term.scrollHeight; };
  const link = (t, target) => `<a href="#" data-open="${target}">${esc(t)}</a>`;
  const appIds = Object.keys(APPS).filter(a => !APPS[a].hidden);

  const CMDS = {
    help() {
      print([
        "commands you can try:",
        "  <b>whoami</b>            who is this guy",
        "  <b>ls</b> [projects]     look around",
        "  <b>cat</b> resume        the resume, in plain text",
        "  <b>cat</b> &lt;note&gt;        read a note, try <code>cat about</code>",
        "  <b>open</b> &lt;thing&gt;      open an app or project, try <code>open jobpipe</code>",
        "  <b>neofetch</b>          system info, sort of",
        "  <b>hire barnavo</b>      you know what this does",
        "  <b>sudo make coffee</b>  please",
        "  <b>clear</b>, <b>date</b>, <b>echo</b>, <b>history</b>, <b>exit</b>",
        '<span class="tl dim">there are a few hidden ones too.</span>'
      ].join("\n"));
    },
    whoami() { print(`${esc(S.name.toLowerCase())}\n${esc(S.headline)}\n${C.profile.education.degree.toLowerCase()}, ${esc(C.profile.education.school)}, ${C.profile.education.year}`); },
    ls(args) {
      const a = args.filter(x => !x.startsWith("-"))[0];
      if (!a) return print(`<b>projects/</b>  <b>notes/</b>  resume.pdf  secrets.txt`);
      if (/^projects\/?$/.test(a)) return print(C.projects.map(p => `${link(p.id + "/", "project:" + p.id)}  ${esc(p.tagline)}`).join("\n"));
      if (/^notes\/?$/.test(a)) return print(C.notes.map(n => link(n.id + ".txt", "note:" + n.id)).join("  "));
      print(`ls: ${esc(a)}: no such file or directory`, "err");
    },
    cat(args) {
      const a = (args[0] || "").replace(/^notes\//, "").replace(/\.(txt|md)$/, "");
      if (!a) return print("usage: cat &lt;file&gt;. try <code>cat resume</code>", "dim");
      if (a === "resume") return print(resumeText());
      if (a === "resume.pdf") return print("that's a binary file, your terminal would cry. try <code>cat resume</code> or <code>open resume</code>");
      if (a === "secrets") return print(inline(T.secrets));
      const n = C.notes.find(x => x.id === a || x.title === a);
      if (n) {
        const txt = n.body.trim().split("\n").map(l => {
          l = l.trim();
          if (/^\{\{/.test(l)) return "(open this note to see this part)";
          if (/^#{1,2} /.test(l)) return "<b>" + esc(plain(l.replace(/^#{1,2} /, ""))) + "</b>";
          if (/^~ /.test(l)) return '<span class="tl dim">' + esc(plain(l.slice(2))) + "</span>";
          return esc(plain(l).replace(/^- /, "  • "));
        }).join("\n").replace(/\n{3,}/g, "\n\n");
        return print(txt + `\n\n${link("open in notes", "note:" + n.id)}`);
      }
      print(`cat: ${esc(a)}: no such file. try <code>ls notes</code>`, "err");
    },
    open(args) {
      const a = (args.join(" ") || "").toLowerCase();
      if (!a) return print("usage: open &lt;app|project|resume&gt;", "dim");
      if (a === "resume" || a === "resume.pdf") { openApp("preview"); return print("opening resume.pdf in preview", "ok"); }
      const app = appIds.find(id => id === a.replace(/\s/g, "") || APPS[id].name.toLowerCase() === a);
      if (app) { openApp(app); return print(`opening ${esc(APPS[app].name)}`, "ok"); }
      const p = C.projects.find(x => x.id === a || x.name.toLowerCase() === a);
      if (p) { openProject(p.id); return print(`opening ${esc(p.name)}`, "ok"); }
      const n = C.notes.find(x => x.id === a.replace(/^notes\//, "") || x.title === a);
      if (n) { openApp("notes", { note: n.id }); return print(`opening ${esc(n.title)}`, "ok"); }
      print(`open: can't find "${esc(a)}". try <code>ls</code>`, "err");
    },
    neofetch() {
      const e = C.profile.education, x = C.profile.experience[0];
      const art = ["  ____   ", " | __ )  ", " |  _ \\  ", " | |_) | ", " |____/  ", "         ", "         ", "         "];
      const info = [
        `<b>${esc(T.user)}@${esc(T.host)}</b>`,
        "-----------------",
        `<b>os</b>: ${esc(S.osName)} 1.0`,
        `<b>user</b>: ${esc(S.name)}`,
        `<b>role</b>: product analyst / apm`,
        `<b>edu</b>: ${esc(e.degree.toLowerCase())}, srm, ${esc(e.year)} (cgpa ${esc(e.cgpa)})`,
        x ? `<b>now</b>: ${esc(x.role.toLowerCase())} @ ${esc(x.company.toLowerCase())}` : "",
        `<b>building</b>: ${esc(C.projects[0].name.toLowerCase())} (in public)`
      ];
      print(art.map((l, k) => `<span class="prompt">${esc(l)}</span> ${info[k] || ""}`).join("\n"));
    },
    async hire(args) {
      if ((args[0] || "").toLowerCase() !== "barnavo") return print("hire who? try <code>hire barnavo</code>", "dim");
      const steps = [
        ["initiating hire sequence...", "dim"],
        ["locating resume.pdf ... found", "ok"],
        [`scanning projects ... ${C.projects.length} found, 1 building in public`, "ok"],
        ["checking coffee compatibility ... ok", "ok"],
        ["opening mail so you can say hi ...", "ok"]
      ];
      for (const [s, c] of steps) { print(s, c); await sleep(450); }
      openApp("mail");
    },
    async sudo(args) {
      const a = args.join(" ").toLowerCase();
      if (a === "make coffee" || a === "make me coffee") {
        for (const l of T.coffee) { print(inline(l), /^error/.test(l) ? "err" : ""); await sleep(420); }
        return;
      }
      if (a.startsWith("hire")) return CMDS.hire(args.slice(1));
      print("guest is not in the sudoers file. this incident will be reported. (it won't.)", "err");
    },
    rm(args) { if (args.join(" ").includes("-rf")) return print("absolutely not. this is my portfolio. [nice try]", "err"); print("rm: permission denied", "err"); },
    vim() { print("you're now stuck in vim forever. just kidding, there's no vim here. type <code>help</code>.", "dim"); },
    cd() { print("there's nowhere to go. you're already home.", "dim"); },
    pwd() { print("/home/" + esc(T.user)); },
    date() { print(esc(new Date().toString())); },
    echo(args) { print(esc(args.join(" "))); },
    history() { print(hist.map((c, k) => `  ${k + 1}  ${esc(c)}`).join("\n") || "(empty)"); },
    clear() { out.innerHTML = ""; },
    exit() { if (win) closeWin(win); },
    coffee() { CMDS.sudo(["make", "coffee"]); },
    contact() { print(`email     <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>\nlinkedin  <a href="${esc(S.linkedin)}" target="_blank" rel="noopener">${esc(prettyUrl(S.linkedin))}</a>\ngithub    <a href="${esc(S.github)}" target="_blank" rel="noopener">${esc(prettyUrl(S.github))}</a>`); },
    hello() { print("hey! type <code>help</code> to see what i can do."); }
  };
  CMDS.hi = CMDS.hello; CMDS.man = CMDS.help; CMDS.cls = CMDS.clear; CMDS.nano = CMDS.vim; CMDS.emacs = CMDS.vim;

  async function run(line) {
    print(`<span class="prompt">${esc(PROMPT)}</span> ${esc(line)}`);
    const parts = line.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return;
    hist.push(line); hi = hist.length;
    const [cmd, ...args] = parts;
    const fn = CMDS[cmd.toLowerCase()];
    if (!fn) return print(`command not found: ${esc(cmd)}. try <code>help</code>`, "err");
    running = true;
    try { await fn(args); } finally { running = false; term.scrollTop = term.scrollHeight; }
  }
  $(".term-line", body).addEventListener("submit", e => { e.preventDefault(); if (running) return; const v = input.value; input.value = ""; run(v); });
  input.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") { e.preventDefault(); if (hi > 0) input.value = hist[--hi]; }
    else if (e.key === "ArrowDown") { e.preventDefault(); if (hi < hist.length - 1) input.value = hist[++hi]; else { hi = hist.length; input.value = ""; } }
    else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); out.innerHTML = ""; }
    else if (e.key === "Tab") {
      e.preventDefault();
      const v = input.value, sp = v.lastIndexOf(" ");
      const pool = sp < 0 ? Object.keys(CMDS) : ["projects", "notes", "resume", ...appIds, ...C.projects.map(p => p.id), ...C.notes.map(n => n.id)];
      const word = v.slice(sp + 1).toLowerCase();
      const hits = pool.filter(x => x.startsWith(word));
      if (hits.length === 1) input.value = v.slice(0, sp + 1) + hits[0] + " ";
      else if (hits.length > 1) print(hits.join("  "), "dim");
    }
  });
  term.addEventListener("click", e => { if (!e.target.closest("a") && !window.getSelection().toString()) input.focus(); });
  print(`last login: ${esc(new Date().toDateString())} on ttys000`, "dim");
  print(`welcome to ${esc(S.osName)}. type <b>help</b> to see what's possible.`);
  if (!isMobile()) setTimeout(() => input.focus(), 250);
}

/* ================= PREVIEW ================= */
function Preview(body) {
  const url = S.resume, file = url.split("/").pop();
  body.innerHTML = `<div class="pv"><div class="pv-bar"><span class="pv-file">${ico("preview")}${esc(file)}</span><span class="pv-actions"><a class="btn sm" href="${esc(url)}" target="_blank" rel="noopener">open</a><a class="btn sm primary" href="${esc(url)}" download="${esc(S.resumeDownloadName)}">download</a></span></div><div class="pv-doc"></div></div>`;
  const doc = $(".pv-doc", body);
  const card = (title, text, buttons) => `<div class="pv-empty"><div class="paper"></div><b>${title}</b><p class="muted">${text}</p>${buttons ? `<div class="btn-row"><a class="btn" href="${esc(url)}" target="_blank" rel="noopener">open</a><a class="btn primary" href="${esc(url)}" download="${esc(S.resumeDownloadName)}">download pdf</a></div>` : ""}</div>`;
  const embed = () => {
    // phones don't render pdfs inside pages well, so give them a clean card instead
    if (isMobile() || window.matchMedia("(pointer: coarse)").matches) doc.innerHTML = card(`${esc(S.name)}, resume`, "one page. opens in your phone's pdf viewer.", true);
    else {
      doc.innerHTML = `<iframe src="${esc(url)}#view=FitH" title="Resume of ${esc(S.name)}"></iframe><div class="pv-sheet"><div class="skel-lines">${'<i class="skel"></i>'.repeat(14)}</div></div>`;
      const fr = $("iframe", doc);
      fr.addEventListener("load", () => $(".pv-sheet", doc).classList.add("gone"));
      setTimeout(() => { const sh = $(".pv-sheet", doc); if (sh) sh.classList.add("gone"); }, 4000);
    }
  };
  const missing = () => { doc.innerHTML = card("resume.pdf not found", `drop your resume at <code>${esc(url)}</code> and it shows up here.`, false); };
  doc.innerHTML = `<div class="pv-sheet"><div class="skel-lines">${'<i class="skel"></i>'.repeat(14)}</div></div>`;
  if (location.protocol === "file:") embed();
  else fetch(url, { method: "HEAD", cache: "no-store" }).then(r => (r.ok ? embed() : missing())).catch(embed);
}

/* ================= MAIL ================= */
function Mail(body) {
  const M = C.mail;
  body.innerHTML = `<div class="mail scroll">
    <div class="mail-head">
      <div class="mail-row"><span>to</span><b>${esc(S.email)}</b><button class="btn sm" data-open="copy:${esc(S.email)}">copy email</button></div>
      <label class="mail-row"><span>subject</span><input class="mail-subj" value="${esc(M.subject)}"></label>
    </div>
    <textarea class="mail-body" placeholder="${esc(M.placeholder)}" aria-label="Message"></textarea>
    <div class="mail-actions"><button class="btn primary mail-send">${ico("mail")}open in my mail app</button></div>
    <div class="mail-links">
      <a class="mlink" href="mailto:${esc(S.email)}"><span>email</span><b>${esc(S.email)}</b></a>
      <a class="mlink" href="${esc(S.linkedin)}" target="_blank" rel="noopener"><span>linkedin</span><b>${esc(prettyUrl(S.linkedin))}</b></a>
      <a class="mlink" href="${esc(S.github)}" target="_blank" rel="noopener"><span>github</span><b>${esc(prettyUrl(S.github))}</b></a>
    </div>
    <div class="mail-foot"><p class="muted small">the button opens your own mail app with this filled in. nothing is sent from this site.</p></div></div>`;
  $(".mail-send", body).onclick = () => {
    const subj = $(".mail-subj", body).value, msg = $(".mail-body", body).value;
    location.href = `mailto:${S.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(msg)}`;
  };
}

/* ================= WALLPAPERS + ABOUT ================= */
function Wallpapers(body) {
  body.innerHTML = `<div class="scroll wp-app">${swatchesHTML()}</div>`;
  setWallpaper(currentWall());
}
function About(body) {
  body.innerHTML = `<div class="scroll"><div class="about-os"><div class="big-logo">${LOGO}</div><h2>${esc(S.osName)}</h2><p class="muted">version 1.0</p>
    <dl><dt>built by</dt><dd>${esc(S.name)}</dd><dt>made with</dt><dd>plain html, css and javascript</dd><dt>frameworks</dt><dd>zero</dd><dt>running cost</dt><dd>₹0</dd><dt>secret</dt><dd>press the <code>\`</code> key</dd></dl>
    <div class="btn-row" style="justify-content:center"><a class="btn" href="${esc(S.sourceRepo)}" target="_blank" rel="noopener">${ico("code")}view source</a><button class="btn primary" data-open="note:hit-me-up">say hi</button></div>
    <p class="small"><a href="#" data-open="app:legal">privacy and terms</a></p></div></div>`;
}
function Legal(body) {
  body.innerHTML = `<div class="scroll legal"><div class="prose">${md(C.legal)}</div></div>`;
}

/* ================= boot, routing, modes ================= */
function route() {
  const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  if (!raw) return false;
  const [a, b] = raw.split("/");
  if (a === "project" && b) { openProject(b); return true; }
  if ((a === "notes" || a === "note") ) { openApp("notes", b ? { note: b } : {}); return true; }
  if (APPS[a]) { openApp(a); return true; }
  if (C.projects.some(p => p.id === a)) { openProject(a); return true; }
  return false;
}

let booting = false;
function boot() {
  const b = $("#boot");
  const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 250 : 1000;
  booting = true;
  b.hidden = false; b.classList.remove("done", "run"); void b.offsetWidth;
  b.style.setProperty("--boot", dur + "ms");
  b.classList.add("run");
  setTimeout(() => {
    b.classList.add("done");
    setTimeout(() => { b.hidden = true; }, 450);
    booting = false;
    afterBoot();
  }, dur + 80);
}
let notified = false;
function afterBoot() {
  if (!route() && !isMobile() && S.openOnBoot && APPS[S.openOnBoot]) openApp(S.openOnBoot);
  if (!notified && C.notification) {
    notified = true;
    setTimeout(() => { if (![...WM.wins.values()].some(w => w.appId === C.notification.app)) notify(C.notification); }, C.notification.delay || 4500);
  }
}

const mq = window.matchMedia("(max-width: 760px)");
function applyMode() {
  const was = isMobile();
  document.body.classList.toggle("mobile", mq.matches);
  if (was !== mq.matches) closeAll();
}

function init() {
  buildMenubar(); buildDesktop(); buildHome();
  applyMode();
  if (mq.addEventListener) mq.addEventListener("change", applyMode); else mq.addListener(applyMode);
  setWallpaper(currentWall());
  tick(); setInterval(tick, 1000);

  document.addEventListener("click", e => {
    const sw = e.target.closest(".swatch");
    if (sw) { setWallpaper(sw.dataset.wp); return; }
    const t = e.target.closest("[data-open]");
    if (t) { e.preventDefault(); closeMenus(); openTarget(t.dataset.open); return; }
    if (!e.target.closest(".menu")) closeMenus();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMenus();
    if (e.key === "`" && !e.target.closest("input, textarea") && !isMobile()) { e.preventDefault(); openApp("terminal"); }
  });
  window.addEventListener("hashchange", () => { if (!booting) route(); });
  boot();
}

window.barnavoOS = { openApp, openProject, openTarget };
init();
})();
