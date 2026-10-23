(function () {
  var D = window.DATA, S = D.ui, L = localStorage.getItem("lang") || "ar";
  var page = document.body.dataset.page, qs = new URLSearchParams(location.search), title = "";
  var T = function (a) { return Array.isArray(a) ? a[L === "ar" ? 0 : 1] : a; };
  var hl = function (s) { return T(s).replace(/\*(.+?)\*/g, "<em>$1</em>"); };
  var img = function (n) { return 'style="--img:url(\'../images/' + n + '\')"'; };
  var IC = {
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>', gem: '<path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>',
    plan: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>', users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    brief: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>', check: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>', left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>',
    fb: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>', ig: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    yt: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><path d="m9.75 15.02 5.75-3.02-5.75-3.02z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>', pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>', send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>'
  };
  var FILL = {
    play: '<path d="M8 5v14l11-7z"/>',
    wa: '<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.78h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.88 9.89M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.42"/>'
  };
  var ic = function (n, cls) {
    var f = FILL[n];
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true" ' + (f ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"') + ">" + (f || IC[n]) + "</svg>";
  };
  var esc = function (t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var wa = function (txt) { return "https://wa.me/" + D.phone + "?text=" + encodeURIComponent(txt); };
  var svc = function (id) { return D.services.filter(function (s) { return s.id === id; })[0]; };

  /* ---------- shared parts ---------- */
  function header() {
    var cur = location.pathname.split("/").pop() || "index.html";
    var links = [["index.html", S.home], ["about.html", S.about], ["services.html", S.services, 1], ["projects.html", S.projects], ["blog.html", S.blog]];
    var nav = links.map(function (l) {
      if (l[2]) return '<div class="dd"><a href="services.html" data-act="dd">' + T(l[1]) + ' ▾</a><div class="dd-menu">' +
        D.services.map(function (s) { return '<a href="service.html?id=' + s.id + '">' + T(s.t) + "</a>"; }).join("") +
        '<a href="services.html"><b>' + T(S.allServices) + "</b></a></div></div>";
      return '<a href="' + l[0] + '"' + (cur === l[0] ? ' class="on"' : "") + ">" + T(l[1]) + "</a>";
    }).join("");
    return '<header class="top"><div class="wrap row"><a class="logo" href="index.html" aria-label="' + esc(T(D.name)) + '"><img src="assets/images/logo.png" alt="' + esc(T(D.name)) + '"></a>' +
      '<nav class="main" id="nav">' + nav + '</nav><div class="hd-act"><a class="btn out dk" href="contact.html">' + T(S.contact) + "</a>" +
      '<button class="ib" data-act="lang">' + T(S.lang) + '</button><button class="ib" data-act="search" aria-label="' + T(S.search) + '">' + ic("search") + '</button><button class="ib burger" data-act="burger" aria-label="menu">' + ic("menu") + "</button></div></div></header>";
  }
  function footer() {
    var sc = function (u, i, n) { return '<a href="' + u + '" target="_blank" rel="noopener" aria-label="' + n + '">' + ic(i) + "</a>"; };
    return '<div style="background:#fff;padding-top:30px"><div class="wrap"><div class="nl"><div><h3>' + T(S.nlT) + "</h3><p>" + T(S.nlS) + '</p></div><form data-form="nl"><input type="email" required placeholder="' + T(S.nlPh) + '" aria-label="' + T(S.nlPh) + '"><button class="btn">' + T(S.nlBtn) + '</button></form><small id="nlok" class="ok" style="color:#9ff0bd">' + T(S.nlOk) + "</small></div></div></div>" +
      '<footer ' + img("footer-bg.jpg") + '><div class="wrap"><div class="cols"><div><div class="logo" style="display:inline-flex;margin-bottom:12px"><img src="assets/images/logo.png" alt="" style="height:60px"></div><p>' + T(S.footD) + '</p><div class="soc">' + sc(D.social.facebook, "fb", "Facebook") + sc(D.social.instagram, "ig", "Instagram") + sc(D.social.youtube, "yt", "YouTube") + sc(wa(""), "wa", "WhatsApp") + "</div></div>" +
      "<div><h4>" + T(S.quick) + '</h4><a href="about.html">' + T(S.about) + '</a><a href="projects.html">' + T(S.projects) + '</a><a href="blog.html">' + T(S.blog) + '</a><a href="contact.html">' + T(S.contact) + '</a><a href="assets/files/company-profile.pdf" target="_blank" rel="noopener">' + T(S.profile) + "</a></div>" +
      "<div><h4>" + T(S.ourSvc) + "</h4>" + ["industrial", "automation", "generators", "kitchens", "aluminum"].map(function (i) { return '<a href="service.html?id=' + i + '">' + T(svc(i).t) + "</a>"; }).join("") + "</div>" +
      "<div><h4>" + T(S.contactUs) + '</h4><p dir="ltr" style="text-align:start">' + D.email + "<br>" + D.phoneShow + "</p><p>" + T(D.addr) + '</p></div></div><div class="copy">' + T(S.rights) + " " + new Date().getFullYear() + "</div></div></footer>";
  }
  function floats() {
    var C = S.chat;
    return '<div class="fl"><a href="tel:+' + D.phone + '" style="background:var(--red)" aria-label="Call">' + ic("phone") + '</a><a href="' + wa("") + '" target="_blank" rel="noopener" style="background:#1fa855" aria-label="WhatsApp">' + ic("wa") + "</a></div>" +
      '<div class="chat"><span class="tip" id="ctip">' + T(C.tip) + '</span><button class="fab" data-act="chat" aria-label="chat">' + ic("chat") + '</button><div class="panel" id="cp"><div class="ph-h"><span>' + T(C.title) + '</span><button class="ib" style="color:#fff" data-act="chat" aria-label="close">' + ic("x") + '</button></div><div class="msgs" id="cm"></div><form class="cin" data-form="chat"><input id="ci" maxlength="300" placeholder="' + T(C.typePh) + '" aria-label="' + T(C.typePh) + '"><button aria-label="send">' + ic("send") + "</button></form></div></div>" +
      '<div class="modal" id="lb"><button class="x" data-act="lbclose" aria-label="close">×</button><div class="box" id="lbc"></div></div>' +
      '<div class="sbox" id="sb"><div class="in"><button class="ib" data-act="searchclose" style="color:#fff;float:inline-end" aria-label="close">' + ic("x") + '</button><input id="sq" placeholder="' + T(S.searchPh) + '" aria-label="' + T(S.search) + '"><div id="sr"></div></div></div>';
  }
  function pghero(t, crumb) {
    title = t;
    return '<div class="pghero" ' + img("page-bg.jpg") + '><div class="wrap"><h1>' + t + '</h1><div><a href="index.html">' + T(S.home) + "</a> / " + crumb + "</div></div></div>";
  }
  function svcCard(s) {
    return '<a class="card" href="service.html?id=' + s.id + '"><div class="ph" ' + img(s.img) + '></div><div class="body"><h3>' + T(s.t) + "</h3><p>" + T(s.d) + '</p><span class="more">' + T(S.more) + " ‹</span></div></a>";
  }
  function prjCard(p) {
    return '<a class="card prj" data-c="' + p.c + '" href="project.html?id=' + p.id + '"><div class="ph" ' + img(p.img) + '></div><div class="body"><span class="tag" style="align-self:flex-start">' + T(S.cats[p.c]) + "</span><h3>" + T(p.t) + '</h3><span class="more">' + T(S.view) + " ‹</span></div></a>";
  }
  function ticks(a) { return '<ul class="ticks">' + a.map(function (b) { return "<li>" + T(b) + "</li>"; }).join("") + "</ul>"; }
  function statsRow() { return '<div class="stats">' + D.stats.map(function (s) { return '<div><b data-n="' + s[0] + '">0</b>' + T(s[1]) + "</div>"; }).join("") + "</div>"; }

  /* ---------- sections ---------- */
  function hero() {
    var sl = S.heroSlides.map(function (s) { return '<div class="slide ph" ' + img(s.img) + '><div class="wrap"><h1>' + hl(s.t) + "</h1></div></div>"; }).join("");
    var ar = L === "ar";
    return '<section class="hero" id="hero"><div class="track" id="trk">' + sl + '</div><div class="arrows" style="direction:' + (ar ? "rtl" : "ltr") + '"><button class="arr" data-act="prev" aria-label="prev">' + ic(ar ? "right" : "left") + '</button><button class="arr" data-act="next" aria-label="next">' + ic(ar ? "left" : "right") + "</button></div></section>";
  }
  function feat() {
    return '<section class="feat"><div class="wrap grid">' + S.feat.map(function (f) {
      return '<div class="box"><div class="ico">' + ic(f[0]) + "</div><h3>" + (L === "ar" ? f[1] : f[2]) + "</h3><p>" + (L === "ar" ? f[3] : f[4]) + "</p></div>";
    }).join("") + "</div></section>";
  }
  function aboutSec() {
    return '<section id="about"><div class="wrap about"><div><span class="tag">' + T(S.kicker) + "</span><h2>" + hl(S.aboutT) + "</h2>" + S.aboutP.map(function (p) { return "<p>" + T(p) + "</p>"; }).join("") +
      '<a class="btn" href="about.html">' + T(S.discover) + '</a> <a class="btn out dk" href="assets/files/company-profile.pdf" target="_blank" rel="noopener">' + T(S.profile) + '</a></div><video class="ph" ' + img("about.jpg") + ' autoplay muted loop playsinline preload="metadata" src="assets/videos/about.mp4"></video></div></section>';
  }
  function blocks() {
    var b = ["industrial", "automation", "kitchens"].map(function (id, i) {
      var s = svc(id);
      return '<div class="blk"><div><span class="num">0' + (i + 1) + " -</span><h3>" + T(s.t) + "</h3><p>" + T(s.d) + "</p>" + ticks(s.b) + '<a class="btn" href="service.html?id=' + id + '">' + T(S.more) + '</a></div><div class="ph" ' + img(s.img) + "></div></div>";
    }).join("");
    return '<section class="sv"><div class="wrap"><span class="tag">' + T(S.services) + "</span><h2>" + hl(S.svcT) + '</h2><p style="max-width:62ch">' + T(S.svcS) + "</p>" + b + '<a class="btn" href="services.html">' + T(S.allServices) + "</a></div></section>";
  }
  function prjSec() {
    return '<section><div class="wrap"><span class="tag">' + T(S.projects) + "</span><h2>" + T(S.prjT) + '</h2><p style="max-width:62ch">' + T(S.prjS) + '</p><div class="grid">' + D.projects.slice(0, 3).map(function (p) { return '<a class="pc" href="project.html?id=' + p.id + '"><div class="ph" ' + img(p.img) + '></div><div class="tt">' + T(p.t) + "</div></a>"; }).join("") + '</div><p style="margin-top:24px"><a class="btn" href="projects.html">' + T(S.viewAll) + "</a></p></div></section>";
  }
  function statsBand() { return '<section class="band" ' + img("stats-bg.jpg") + ' style="padding:40px 0"><div class="wrap">' + statsRow() + "</div></section>"; }
  function why() {
    var ik = ["star", "plan", "users", "check"];
    return '<section class="why"><div class="wrap"><h2>' + hl(S.whyT) + '</h2><div class="grid">' + S.why.map(function (w, i) { return '<div class="card"><div class="ic">' + ic(ik[i]) + "</div><h3>" + (L === "ar" ? w[0] : w[1]) + "</h3><p>" + (L === "ar" ? w[2] : w[3]) + "</p></div>"; }).join("") + "</div></div></section>";
  }
  function gallery() {
    var ph = [1, 2, 3, 4, 5, 6].map(function (i) { return '<div class="ph" data-act="light" data-img="g' + i + '.jpg" ' + img("g" + i + ".jpg") + "></div>"; }).join("");
    var vd = D.videos.map(function (v, i) { return '<button class="vt" data-act="vid" data-i="' + i + '" aria-label="' + T(v.t) + '"><div class="ph" ' + img(v.img) + '></div><i><b>' + ic("play") + "</b></i><span>" + T(v.t) + "</span></button>"; }).join("");
    return '<section style="background:var(--bg)"><div class="wrap" style="text-align:center"><h2>' + T(S.galT) + "</h2><p>" + T(S.galS) + '</p><div class="tabs"><button class="on" data-act="tab" data-t="p">' + T(S.photos) + '</button><button data-act="tab" data-t="v">' + T(S.videos) + '</button></div><div class="gal" id="gp">' + ph + '</div><div class="gal v" id="gv" hidden>' + vd + "</div></div></section>";
  }
  function partners() {
    return '<section><div class="wrap" style="text-align:center"><h2>' + T(S.partT) + '</h2><p style="max-width:60ch;margin-inline:auto">' + T(S.partS) + '</p><div class="partners" style="margin-top:20px">' + D.partners.map(function (p) { return '<a href="' + p.url + '"><div class="ph" ' + img(p.img) + "></div>" + T(p.name) + "</a>"; }).join("") + "</div></div></section>";
  }
  function cta() {
    return '<section class="band" ' + img("cta.jpg") + '><div class="wrap"><h2>' + hl(S.ctaT) + "</h2><p>" + T(S.ctaS) + '</p><a class="btn out" href="projects.html">' + T(S.projects) + '</a> <a class="btn" href="contact.html">' + T(S.contact) + "</a></div></section>";
  }
  function contactSec() {
    var f = function (id, k, tp) { return "<div><label for='" + id + "'>" + T(S[k]) + "</label>" + (tp === "t" ? "<textarea id='" + id + "' rows='4' maxlength='600'></textarea>" : "<input id='" + id + "' type='" + tp + "' maxlength='120'" + (id === "cn" || id === "cp2" ? " required" : "") + ">") + "</div>"; };
    var li = function (u, i, t, x) { return '<a href="' + u + '"' + (x ? ' target="_blank" rel="noopener"' : "") + ">" + ic(i) + "<span>" + t + "</span></a>"; };
    return '<section id="contact"><div class="wrap contact"><div class="pane"><h2>' + T(S.contactT) + "</h2><p>" + T(S.contactS) + '</p><form data-form="contact">' + f("cn", "fName", "text") + f("cp2", "fPhone", "tel") + f("ce", "fEmail", "email") + f("cm2", "fMsg", "t") + '<button class="btn" style="justify-content:center">' + T(S.send) + '</button><span class="ok" id="cok">' + T(S.sent) + "</span></form></div>" +
      '<div class="pane"><h2 style="font-size:26px">' + T(S.helpT) + "</h2><p>" + T(S.helpS) + '</p><div class="info">' + li("tel:+" + D.phone, "phone", '<bdi dir="ltr">' + D.phoneShow + "</bdi>") + li("mailto:" + D.email, "mail", D.email) + li(wa(""), "wa", "WhatsApp", 1) + li("https://maps.google.com/?q=Jubail%20Dhahran%20Highway%20Dammam", "pin", T(D.addr), 1) + li(D.social.facebook, "fb", T(D.name) + " - Facebook", 1) + li(D.social.youtube, "yt", T(D.name) + " - YouTube", 1) + li(D.social.instagram, "ig", T(D.name) + " - Instagram", 1) +
      '</div><iframe class="map" title="map" loading="lazy" src="https://maps.google.com/maps?q=Jubail%20Dhahran%20Highway%20Dammam&output=embed"></iframe></div></div></section>';
  }

  /* ---------- pages ---------- */
  var pages = {
    home: function () { title = T(S.home); return hero() + aboutSec() + feat() + blocks() + prjSec() + statsBand() + why() + gallery() + partners() + contactSec(); },
    about: function () {
      return pghero(T(S.about), T(S.about)) + aboutSec() + '<section style="background:var(--bg)"><div class="wrap grid"><div class="card" style="padding:24px"><h3>' + T(S.vision) + "</h3><p>" + T(S.visionP) + '</p></div><div class="card" style="padding:24px"><h3>' + T(S.mission) + "</h3><p>" + T(S.missionP) + "</p></div></div></section>" + statsBand() + why() + cta();
    },
    services: function () { return pghero(T(S.services), T(S.services)) + '<section><div class="wrap"><p style="max-width:62ch">' + T(S.svcS) + '</p><div class="grid">' + D.services.map(svcCard).join("") + "</div></div></section>" + cta(); },
    service: function () {
      var s = svc(qs.get("id")) || D.services[0];
      return pghero(T(s.t), '<a href="services.html">' + T(S.services) + "</a>") + '<section class="light"><div class="wrap det"><div><h2>' + T(s.t) + "</h2><p>" + T(s.d) + "</p><h3>" + T(S.bullets) + "</h3>" + ticks(s.b) + '<a class="btn" href="' + wa((L === "ar" ? "أرغب بطلب خدمة: " : "I would like to request: ") + T(s.t)) + '" target="_blank" rel="noopener">' + T(S.req) + '</a></div><div class="ph" ' + img(s.img) + "></div></div></section>" +
        '<section style="background:var(--bg)"><div class="wrap"><h2>' + T(S.related) + '</h2><div class="grid">' + D.services.filter(function (x) { return x.id !== s.id; }).slice(0, 3).map(svcCard).join("") + "</div></div></section>";
    },
    projects: function () {
      var f = ["all", "industrial", "factories", "kitchens", "wardrobes"].map(function (k, i) { return '<button class="' + (i ? "" : "on") + '" data-act="filter" data-c="' + k + '">' + T(S.cats[k]) + "</button>"; }).join("");
      return pghero(T(S.projects), T(S.projects)) + '<section><div class="wrap"><div class="filters">' + f + '</div><div class="grid">' + D.projects.map(prjCard).join("") + "</div></div></section>";
    },
    project: function () {
      var p = D.projects.filter(function (x) { return x.id === qs.get("id"); })[0] || D.projects[0];
      var gs = [1, 2, 3, 4, 5, 6].map(function (i) { return '<div class="ph" data-act="light" data-img="g' + i + '.jpg" ' + img("g" + i + ".jpg") + "></div>"; }).join("");
      return pghero(T(p.t), '<a href="projects.html">' + T(S.projects) + "</a>") + '<section><div class="wrap"><div class="pstats"><div><b data-n="' + p.m + '">0</b>' + T(S.dur) + " (" + T(S.months) + ')</div><div><b data-n="' + p.a + '">0</b>' + T(S.area) + " (" + T(S.m2) + ')</div><div><b data-n="' + p.e + '">0</b>' + T(S.team) + '</div></div><div class="det"><div class="ph" ' + img(p.img) + "></div><div><span class=\"tag\">" + T(S.cats[p.c]) + "</span><h2>" + T(p.t) + "</h2><p>" + T(D.prjDesc) + '</p></div></div></div></section><section style="background:var(--bg)"><div class="wrap"><h2>' + T(S.stages) + '</h2><div class="gal">' + gs + "</div></div></section>";
    },
    blog: function () {
      return pghero(T(S.blog), T(S.blog)) + '<section><div class="wrap"><div class="grid">' + D.posts.map(function (b) { return '<a class="card" href="post.html?id=' + b.id + '"><div class="ph" ' + img(b.img) + '></div><div class="body"><span class="meta">' + b.date + "</span><h3>" + T(b.t) + '</h3><span class="more">' + T(S.readMore) + " ‹</span></div></a>"; }).join("") + "</div></div></section>";
    },
    post: function () {
      var b = D.posts.filter(function (x) { return x.id === qs.get("id"); })[0] || D.posts[0], u = encodeURIComponent(location.href);
      return pghero(T(b.t), '<a href="blog.html">' + T(S.blog) + "</a>") + '<section><div class="wrap"><article class="post"><div class="ph" ' + img(b.img) + '></div><div class="meta">' + b.date + "</div><h2>" + T(b.t) + "</h2>" + b.p.map(function (x) { return "<p>" + T(x) + "</p>"; }).join("") +
        '<div class="share"><span>' + T(S.share) + '</span><a href="https://www.facebook.com/sharer/sharer.php?u=' + u + '" target="_blank" rel="noopener">f</a><a href="https://twitter.com/intent/tweet?url=' + u + '" target="_blank" rel="noopener">X</a><a href="https://www.linkedin.com/sharing/share-offsite/?url=' + u + '" target="_blank" rel="noopener">in</a></div></article></div></section>';
    },
    contact: function () { return pghero(T(S.contact), T(S.contact)) + contactSec(); }
  };

  /* ---------- render + behaviour ---------- */
  var hi = 0, timer; function boot0() { hi = 0; }
  function render() {
    boot0();
    document.documentElement.lang = L; document.documentElement.dir = L === "ar" ? "rtl" : "ltr";
    var body = pages[page]();
    document.getElementById("app").innerHTML = header() + "<main>" + body + "</main>" + footer() + floats();
    document.title = title + " | " + T(D.name);
    clearInterval(timer);
    if ($("#hero") && !matchMedia("(prefers-reduced-motion:reduce)").matches) timer = setInterval(function () { slide(1); }, 6000);
    counters(); chatStart();
  }
  function slide(d) { var n = $$(".slide").length; if (!n) return; hi = (hi + d + n) % n; $("#trk").style.transform = "translateX(" + (L === "ar" ? 1 : -1) * hi * 100 + "%)"; }
  function counters() {
    var els = $$("[data-n]"); if (!els.length) return;
    var run = function (el) { var m = +el.dataset.n, c = 0, st = Math.max(1, Math.ceil(m / 40)); var v = setInterval(function () { c = Math.min(m, c + st); el.textContent = "+" + c; if (c >= m) clearInterval(v); }, 30); };
    if (!("IntersectionObserver" in window)) return els.forEach(run);
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { run(e.target); o.unobserve(e.target); } }); }); els.forEach(function (e) { o.observe(e); });
  }

  /* chat bot: greet -> quick options / free text -> ask name+number -> open WhatsApp with the lead */
  var topic = "";
  function msg(cls, html) { var m = document.createElement("div"); m.className = "m " + cls; m.innerHTML = html; var box = $("#cm"); box.appendChild(m); box.scrollTop = box.scrollHeight; return m; }
  function chatStart() {
    var C = S.chat; topic = "";
    msg("b", T(C.greet));
    var q = msg("b qk", ""); q.style.background = "none"; q.style.border = "0"; q.style.padding = "0";
    C.q.forEach(function (o) { var b = document.createElement("button"); b.textContent = T(o); b.dataset.act = "quick"; q.appendChild(b); });
  }
  function askLead(t) {
    var C = S.chat; topic = t; msg("u", esc(t)); msg("b", T(C.ask));
    var f = msg("b", '<form class="lead" data-form="lead"><input id="ln" maxlength="60" placeholder="' + T(C.namePh) + '" required><input id="lp" type="tel" maxlength="20" placeholder="' + T(C.phonePh) + '" required><button class="btn">' + T(C.go) + "</button></form>");
    $("#ln", f).focus();
  }

  var acts = {
    lang: function () { L = L === "ar" ? "en" : "ar"; localStorage.setItem("lang", L); render(); },
    burger: function () { $("#nav").classList.toggle("on"); },
    dd: function (a, e) { if (innerWidth <= 900) { e.preventDefault(); a.parentNode.classList.toggle("open"); } },
    search: function () { $("#sb").classList.add("on"); $("#sq").focus(); }, searchclose: function () { $("#sb").classList.remove("on"); },
    prev: function () { slide(-1); }, next: function () { slide(1); },
    filter: function (a) { $$("[data-act=filter]").forEach(function (b) { b.classList.toggle("on", b === a); }); $$(".prj").forEach(function (c) { c.style.display = a.dataset.c === "all" || c.dataset.c === a.dataset.c ? "" : "none"; }); },
    tab: function (a) { $$("[data-act=tab]").forEach(function (b) { b.classList.toggle("on", b === a); }); $("#gp").hidden = a.dataset.t !== "p"; $("#gv").hidden = a.dataset.t !== "v"; },
    light: function (a) { var b = $("#lbc"); b.innerHTML = ""; b.style.backgroundImage = "url('assets/images/" + a.dataset.img + "')"; $("#lb").classList.add("on"); },
    vid: function (a) {
      var v = D.videos[+a.dataset.i], b = $("#lbc"); b.style.backgroundImage = "none"; b.innerHTML = "";
      if (v.yt) { var f = document.createElement("iframe"); f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(v.yt) + "?autoplay=1"; f.allow = "autoplay; encrypted-media; fullscreen"; f.style.cssText = "width:100%;height:100%;border:0"; b.appendChild(f); }
      else { var m = document.createElement("video"); m.controls = true; m.autoplay = true; m.src = v.file; m.addEventListener("error", function () { b.innerHTML = '<p style="color:#fff;padding:40px;text-align:center">' + esc(T(S.noVid)) + "</p>"; }); b.appendChild(m); }
      $("#lb").classList.add("on");
    },
    lbclose: function () { $("#lb").classList.remove("on"); $("#lbc").innerHTML = ""; },
    chat: function () { $("#cp").classList.toggle("on"); $("#ctip").style.display = "none"; },
    quick: function (a) { askLead(a.textContent); }
  };
  document.addEventListener("click", function (e) { var a = e.target.closest("[data-act]"); if (a && acts[a.dataset.act]) acts[a.dataset.act](a, e); });
  document.addEventListener("input", function (e) {
    if (e.target.id !== "sq") return;
    var v = e.target.value.trim().toLowerCase(), r = [];
    if (v) {
      D.services.forEach(function (s) { if ((T(s.t) + T(s.d)).toLowerCase().indexOf(v) > -1) r.push(["service.html?id=" + s.id, T(s.t)]); });
      D.projects.forEach(function (p) { if (T(p.t).toLowerCase().indexOf(v) > -1) r.push(["project.html?id=" + p.id, T(p.t)]); });
      D.posts.forEach(function (p) { if (T(p.t).toLowerCase().indexOf(v) > -1) r.push(["post.html?id=" + p.id, T(p.t)]); });
    }
    $("#sr").innerHTML = v ? (r.length ? r.map(function (x) { return '<a href="' + x[0] + '">' + x[1] + "</a>"; }).join("") : '<p style="color:#fff">' + T(S.noRes) + "</p>") : "";
  });
  document.addEventListener("submit", function (e) {
    var f = e.target.closest("[data-form]"); if (!f) return; e.preventDefault();
    var k = f.dataset.form, C = S.chat;
    if (k === "nl") { var l = JSON.parse(localStorage.getItem("subs") || "[]"); l.push(f.firstChild.value); localStorage.setItem("subs", JSON.stringify(l)); f.reset(); $("#nlok").style.display = "block"; }
    if (k === "contact") {
      var t = (L === "ar" ? "الاسم: " : "Name: ") + $("#cn").value + "\n" + (L === "ar" ? "الهاتف: " : "Phone: ") + $("#cp2").value + "\n" + $("#cm2").value;
      window.open(wa(t), "_blank", "noopener"); $("#cok").style.display = "block"; f.reset();
    }
    if (k === "chat") { var i = $("#ci"); if (i.value.trim()) { askLead(i.value.trim()); i.value = ""; } }
    if (k === "lead") {
      var n = $("#ln").value.trim(), p = $("#lp").value.trim();
      if (!/^\+?[\d\s-]{8,}$/.test(p)) return msg("b", T(C.bad));
      msg("u", esc(n + " - " + p));
      var leads = JSON.parse(localStorage.getItem("leads") || "[]"); leads.push({ n: n, p: p, t: topic, d: new Date().toISOString() }); localStorage.setItem("leads", JSON.stringify(leads));
      var url = wa(T(C.wamsg).replace("%n", n).replace("%p", p).replace("%t", topic));
      msg("b", T(C.done) + '<br><a class="btn" href="' + url + '" target="_blank" rel="noopener">' + T(C.wa) + "</a>");
      f.remove(); window.open(url, "_blank", "noopener");
    }
  });
  render();
})();
