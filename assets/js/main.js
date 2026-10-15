/* AdPulse IMC — site interactions */
(function () {
  "use strict";
  var d = document, w = window, root = d.documentElement;
  var q = function (s, c) { return (c || d).querySelector(s); };
  var qa = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var reduced = w.matchMedia && w.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = w.matchMedia && w.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var hasGsap = !!(w.gsap && w.ScrollTrigger);
  if (hasGsap) w.gsap.registerPlugin(w.ScrollTrigger);
  var store = {
    get: function (k) { try { return w.sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { w.sessionStorage.setItem(k, v); } catch (e) { } }
  };
  var WA = "923008463041";

  /* ---------- Smooth scroll ---------- */
  var lenis = null;
  if (w.Lenis && !reduced) {
    try {
      lenis = new w.Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
      if (hasGsap) {
        lenis.on("scroll", w.ScrollTrigger.update);
        w.gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
        w.gsap.ticker.lagSmoothing(0);
      } else (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
      d.addEventListener("click", function (e) {
        var a = e.target.closest && e.target.closest('a[href^="#"]');
        if (!a || a.getAttribute("href").length < 2) return;
        var t = q(a.getAttribute("href")); if (!t) return;
        e.preventDefault(); lenis.scrollTo(t, { offset: -80 });
      });
    } catch (err) { lenis = null; }
  }
  var lockScroll = function (v) { if (lenis) { v ? lenis.stop() : lenis.start(); } d.body.style.overflow = v ? "hidden" : ""; };

  /* ---------- Intro: Pakistan pulse map ---------- */
  var pre = q(".preloader");
  var readyFired = false;
  function finishPreloader() { if (readyFired) return; readyFired = true; root.classList.add("is-loaded"); d.dispatchEvent(new Event("adpulse:ready")); }
  if (pre) {
    if (store.get("ap-seen") || reduced || !hasGsap) { pre.remove(); pre = null; setTimeout(finishPreloader, 0); }
    else {
      store.set("ap-seen", "1");
      lockScroll(true);
      var G = w.gsap, map = q(".intro__map", pre), outline = q(".intro__outline", pre), arcs = qa(".intro__arc", pre), cities = qa(".intro__city", pre);
      var L = outline.getTotalLength();
      G.set(outline, { strokeDasharray: L, strokeDashoffset: L });
      arcs.forEach(function (a) { var l = a.getTotalLength(); G.set(a, { strokeDasharray: l, strokeDashoffset: l }); });
      G.set(cities, { scale: 0, opacity: 0, transformOrigin: "50% 50%" });
      G.set(".intro__line", { y: 20, opacity: 0 });
      G.set(".intro__brand .logo__emblem", { scale: 0, rotate: -120, opacity: 0 });
      G.set([".intro__brand .logo__word", ".intro__brand .logo__imc"], { clipPath: "inset(0 100% 0 0)" });
      var tl = G.timeline({ onComplete: function () { pre.classList.add("is-done"); pre.remove(); } });
      tl.fromTo(map, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }, 0)
        .to(outline, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, 0)
        .fromTo(".intro__base", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.7)
        .to(".intro__dots", { opacity: 0.32, duration: 0.8 }, 1.0)
        .to(cities[0], { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(3)" }, 1.15)
        .fromTo(".intro__wave.w1", { attr: { r: 10 }, opacity: 1 }, { attr: { r: 1150 }, opacity: 0.25, duration: 1.9, ease: "power2.out" }, 1.3)
        .fromTo(".intro__wave.w2", { attr: { r: 10 }, opacity: 1 }, { attr: { r: 1150 }, opacity: 0.2, duration: 1.9, ease: "power2.out" }, 1.6)
        .fromTo(".intro__wave.w3", { attr: { r: 10 }, opacity: 1 }, { attr: { r: 1150 }, opacity: 0, duration: 1.9, ease: "power2.out" }, 1.9)
        .to(".intro__dots", { opacity: 0.6, duration: 0.5, yoyo: true, repeat: 1 }, 1.5)
        .to(arcs, { strokeDashoffset: 0, duration: 0.7, ease: "power2.out", stagger: 0.09 }, 1.4)
        .to(cities.slice(1), { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(2.6)", stagger: 0.11 }, 1.7)
        .to(".intro__brand .logo__emblem", { scale: 1, rotate: 0, opacity: 1, duration: 0.9, ease: "back.out(1.8)" }, 1.8)
        .to(".intro__brand .logo__word", { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "expo.out" }, 2.1)
        .to(".intro__brand .logo__imc", { clipPath: "inset(0 0% 0 0)", duration: 0.6, ease: "expo.out" }, 2.35)
        .to(".intro__line", { y: 0, opacity: 1, duration: 0.7, ease: "expo.out" }, 2.05)
        .addLabel("exit", 4.1)
        .to(map, { scale: 1.18, opacity: 0, duration: 0.8, ease: "power3.in" }, "exit")
        .to([".intro__line", ".intro__skip"], { opacity: 0, duration: 0.4 }, "exit")
        .add(function () { flyLogo(); }, "exit+=0.35");
      /* FLIP: the intro logo flies into the header logo's spot */
      var flown = false;
      function flyLogo() {
        if (flown) return; flown = true;
        var from = q(".intro__brand", pre), target = q(".site-header .logo");
        var done = function () { if (target) G.set(target, { opacity: 1 }); lockScroll(false); finishPreloader(); pre.classList.add("is-done"); pre.remove(); };
        if (!from || !target) { G.to(pre, { opacity: 0, duration: 0.6, onComplete: done }); return; }
        G.set(target, { opacity: 0 });
        var a = from.getBoundingClientRect(), b = target.getBoundingClientRect();
        var k = b.width / a.width;
        G.to(from, { x: (b.left + b.width / 2) - (a.left + a.width / 2), y: (b.top + b.height / 2) - (a.top + a.height / 2), scale: k, duration: 1.05, ease: "expo.inOut", transformOrigin: "50% 50%" });
        G.to(pre, { backgroundColor: "rgba(10,12,11,0)", duration: 0.9, delay: 0.25, ease: "power2.inOut" });
        pre.style.setProperty("--grid-o", "0");
        G.delayedCall(1.08, done);
      }
      q(".intro__skip", pre).addEventListener("click", function () { if (!flown) { tl.seek("exit"); tl.progress(1); flyLogo(); } });
      d.addEventListener("keydown", function esc(e) { if (e.key === "Escape" && !flown) { tl.progress(1); flyLogo(); d.removeEventListener("keydown", esc); } });
    }
  } else setTimeout(finishPreloader, 0);

  /* ---------- Cursor spotlight on dark bands ---------- */
  if (finePointer && !reduced) qa(".services.on-dark, .stats.on-dark, .reels, .svc-stage").forEach(function (sec) {
    sec.classList.add("spot");
    sec.addEventListener("pointermove", function (e) { var r = sec.getBoundingClientRect(); sec.style.setProperty("--mx", (e.clientX - r.left) + "px"); sec.style.setProperty("--my", (e.clientY - r.top) + "px"); });
  });

  /* ---------- Page wipe transitions ---------- */
  var wipe = q(".wipe");
  if (wipe && !reduced) {
    var panels = qa("span", wipe);
    /* gsap owns the transform: clear the CSS translate so x never offsets xPercent */
    if (hasGsap) w.gsap.set(panels, { x: 0, xPercent: -101 });
    if (store.get("ap-wipe") === "1" && hasGsap) {
      store.set("ap-wipe", "0");
      w.gsap.set(panels, { x: 0, xPercent: 0 });
      w.gsap.to(panels, { xPercent: 101, duration: 0.7, ease: "power4.inOut", stagger: { each: 0.08, from: "end" } });
    }
    d.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (a.target === "_blank" || a.hasAttribute("download") || a.dataset.noWipe !== undefined) return;
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#" || /^(mailto|tel|sms|javascript):/i.test(href)) return;
      var url; try { url = new URL(a.href, w.location.href); } catch (err) { return; }
      if (url.origin !== w.location.origin || (url.pathname === w.location.pathname && url.hash)) return;
      if (!hasGsap) return;
      e.preventDefault();
      store.set("ap-wipe", "1");
      w.gsap.fromTo(panels, { x: 0, xPercent: -101 }, { x: 0, xPercent: 0, duration: 0.55, ease: "power4.inOut", stagger: 0.07, onComplete: function () { w.location.href = a.href; } });
    });
    w.addEventListener("pageshow", function (e) { if (e.persisted && hasGsap) w.gsap.set(panels, { x: 0, xPercent: -101 }); });
  }

  if (wipe) setTimeout(function () { if (!d.hidden && store.get("ap-wipe") !== "1" && hasGsap) { var r = qa("span", wipe).some(function (sp) { var b = sp.getBoundingClientRect(); return b.right > 4 && b.left < w.innerWidth - 4; }); if (r) w.gsap.set(qa("span", wipe), { x: 0, xPercent: -101 }); } }, 2500);

  /* ---------- Header ---------- */
  var header = q(".site-header"), progress = q(".progress"), lastY = w.scrollY;
  function onScroll() {
    var y = w.scrollY, h = root.scrollHeight - w.innerHeight;
    if (header) {
      header.classList.toggle("is-solid", y > 40);
      var probe = (header.offsetHeight || 76) + 2, under = null;
      var stack = d.elementsFromPoint ? d.elementsFromPoint(w.innerWidth / 2, probe) : [];
      for (var i = 0; i < stack.length; i++) { if (!header.contains(stack[i]) && !stack[i].closest(".progress, .cursor, .cursor-ring, .chat, .chat-fab")) { under = stack[i]; break; } }
      var dark = y <= 40 || !!(under && under.closest(".on-dark, .cta, .site-footer, .hero, .page-hero, .preloader"));
      header.classList.toggle("is-dark", dark);
      header.classList.toggle("is-light", !dark);
      if (!root.classList.contains("nav-open")) header.classList.toggle("is-hidden", y > 260 && y > lastY && !q(".menu li.is-open"));
    }
    if (progress) progress.style.transform = "scaleX(" + (h > 0 ? y / h : 0) + ")";
    lastY = y;
  }
  w.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* mega menu */
  qa(".menu .has-mega").forEach(function (li) {
    var btn = q("button", li), timer;
    function open(v) { li.classList.toggle("is-open", v); btn.setAttribute("aria-expanded", v ? "true" : "false"); }
    btn.addEventListener("click", function () { open(!li.classList.contains("is-open")); });
    if (finePointer) {
      li.addEventListener("mouseenter", function () { clearTimeout(timer); open(true); });
      li.addEventListener("mouseleave", function () { timer = setTimeout(function () { open(false); }, 180); });
    }
    d.addEventListener("click", function (e) { if (!li.contains(e.target)) open(false); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") open(false); });
  });

  /* drawer */
  var burger = q(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = !root.classList.contains("nav-open");
      root.classList.toggle("nav-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      lockScroll(open);
      if (header) header.classList.remove("is-hidden");
    });
    qa(".drawer a").forEach(function (a) { a.addEventListener("click", function () { root.classList.remove("nav-open"); lockScroll(false); }); });
  }

  /* ---------- Cursor ---------- */
  if (finePointer && !reduced) {
    var dot = d.createElement("div"), ring = d.createElement("div");
    dot.className = "cursor"; ring.className = "cursor-ring"; ring.innerHTML = "<span></span>";
    d.body.appendChild(dot); d.body.appendChild(ring); root.classList.add("has-cursor");
    var mx = -100, my = -100, rx = -100, ry = -100, label = q("span", ring);
    w.addEventListener("pointermove", function (e) { mx = e.clientX; my = e.clientY; dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)"; }, { passive: true });
    (function tick() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)"; requestAnimationFrame(tick); })();
    d.addEventListener("pointerover", function (e) {
      var t = e.target.closest && e.target.closest("[data-cursor], a, button, summary, input, select, textarea");
      ring.classList.remove("is-hover", "is-label");
      if (!t) return;
      var l = t.getAttribute("data-cursor");
      if (l) { label.textContent = l; ring.classList.add("is-label"); } else ring.classList.add("is-hover");
    });
    d.addEventListener("pointerleave", function () { mx = my = -100; });
  }

  /* ---------- Magnetic ---------- */
  if (finePointer && !reduced) {
    qa(".btn, .cf-btn, .chat-fab, .svc-row__go").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect(), x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + x * 0.22 + "px," + y * 0.3 + "px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- Kinetic type: split into words > chars ---------- */
  qa("[data-split]").forEach(function (el) {
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var parts = n.textContent.split(/(\s+)/), frag = d.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(d.createTextNode(" ")); return; }
            var o = d.createElement("span"); o.className = "w";
            Array.from(p).forEach(function (c) { var ch = d.createElement("span"); ch.className = "ch"; ch.textContent = c; o.appendChild(ch); });
            frag.appendChild(o);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== "BR" && n.tagName !== "svg") walk(n);
      });
    };
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    walk(el); el.classList.add("split");
    qa(".w", el).forEach(function (x) { x.setAttribute("aria-hidden", "true"); });
  });
  function animateSplit(el, delay, done) {
    if (!hasGsap || reduced) { if (done) done(); return; }
    var chars = qa(".ch", el);
    w.gsap.fromTo(chars,
      { yPercent: 115, rotateX: -85, opacity: 0, filter: "blur(6px)" },
      { yPercent: 0, rotateX: 0, opacity: 1, filter: "blur(0px)", transformPerspective: 700, transformOrigin: "50% 100%",
        duration: 1.1, ease: "expo.out", stagger: { each: Math.min(0.028, 0.9 / chars.length) }, delay: delay || 0,
        clearProps: "filter", onComplete: done });
  }
  qa("[data-split]").forEach(function (el) {
    if (el.hasAttribute("data-split-now")) {
      if (hasGsap && !reduced) w.gsap.set(qa(".ch", el), { yPercent: 115, opacity: 0 });
      d.addEventListener("adpulse:ready", function () { animateSplit(el, 0.1, function () { el.dispatchEvent(new Event("split:done")); }); }, { once: true });
    } else if (hasGsap && !reduced) {
      w.gsap.set(qa(".ch", el), { yPercent: 115, opacity: 0 });
      w.ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: function () { animateSplit(el); } });
    }
  });

  /* outline words fill with colour as you scroll (red → green per letter) */
  qa(".h-section .outline, .cta h2 .outline").forEach(function (o) {
    var chars = qa(".ch", o), n = chars.length; if (!n) return;
    var onDark = !!o.closest(".on-dark"), onRed = !!o.closest(".cta");
    chars.forEach(function (c, i) {
      var t = n > 1 ? i / (n - 1) : 0;
      c.style.setProperty("--c", onRed ? "#FFFFFF" : onDark ? (t < .5 ? "#FFFFFF" : "var(--green-glow)") : "color-mix(in srgb, var(--red) " + Math.round((1 - t) * 100) + "%, var(--green))");
    });
    o.classList.add("fillable");
    if (!hasGsap || reduced) { chars.forEach(function (c) { c.classList.add("is-filled"); }); return; }
    w.ScrollTrigger.create({
      trigger: o, start: "top 80%", end: "top 35%", scrub: true,
      onUpdate: function (self) { var k = self.progress * (n + 1); chars.forEach(function (c, i) { c.classList.toggle("is-filled", i < k - 0.5); }); }
    });
  });

  /* marquee-bulb light chase across outline words in dark heroes */
  function chase(o) {
    var chars = qa(".ch", o), n = chars.length, head = -4, vis = true;
    if (!n || reduced) return;
    if ("IntersectionObserver" in w) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; }).observe(o);
    setInterval(function () {
      if (!vis || d.hidden) return;
      head = head > n + 12 ? -4 : head + 1;
      chars.forEach(function (c, i) { var dd = head - i; c.classList.toggle("is-lit", dd >= 0 && dd < 3); });
    }, 70);
  }

  /* decode / scramble for mono labels */
  var GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>=";
  function scramble(el, dur) {
    if (reduced || el._scr) return;
    var node = Array.prototype.find.call(el.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); });
    if (!node) return;
    var orig = node._orig || (node._orig = node.textContent), len = orig.length, t0 = performance.now();
    dur = dur || 600; el._scr = true;
    (function f(now) {
      var k = Math.min(1, (now - t0) / dur), out = "";
      for (var i = 0; i < len; i++) {
        var c = orig[i];
        out += (!/[A-Za-z0-9]/.test(c) || i / len < k) ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      node.textContent = out;
      if (k < 1) requestAnimationFrame(f); else { node.textContent = orig; el._scr = false; }
    })(t0);
  }
  if ("IntersectionObserver" in w && !reduced) {
    var sio2 = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { scramble(x.target, 900); sio2.unobserve(x.target); } }); }, { threshold: 0.6 });
    qa(".eyebrow, .stat__label, .svc-card__no, .footer__tag").forEach(function (el) { sio2.observe(el); });
  }
  if (finePointer) qa(".menu > li > a, .menu > li > button, .btn, .link-arrow, .chip, .filters button").forEach(function (el) {
    el.addEventListener("mouseenter", function () { scramble(el, 420); });
  });

  /* hero headline: light chase on outline words ("Energy") */
  qa(".hero h1, .page-hero h1").forEach(function (h) {
    var start = function () {
      qa(".outline", h).forEach(chase);
    };
    if (hasGsap && !reduced && h.hasAttribute("data-split-now")) h.addEventListener("split:done", start, { once: true }); else start();
  });

  /* crossing ticker bands — speed follows scroll velocity */
  qa(".ticker__band").forEach(function (band) {
    var track = q(".ticker__track", band), dir = band.classList.contains("ticker__band--rev") ? 1 : -1, x = 0, vel = 0, lastSY = w.scrollY, vis = true;
    if (!track) return;
    track.innerHTML += track.innerHTML;
    if (reduced) return;
    if ("IntersectionObserver" in w) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; }).observe(band);
    (function f() {
      var sy = w.scrollY; vel += ((sy - lastSY) - vel) * 0.1; lastSY = sy;
      if (vis && !d.hidden) {
        var half = track.scrollWidth / 2;
        x += dir * (0.8 + Math.min(12, Math.abs(vel) * 0.35));
        if (x <= -half) x += half; if (x > 0) x -= half;
        track.style.transform = "translate3d(" + x + "px,0,0) skewX(" + Math.max(-10, Math.min(10, -vel * 0.4)) + "deg)";
      }
      requestAnimationFrame(f);
    })();
  });

  if ("IntersectionObserver" in w) {
    var rio = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("is-in"); rio.unobserve(x.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    qa(".reveal").forEach(function (el, i) { el.style.transitionDelay = (el.dataset.delay || 0) + "ms"; rio.observe(el); });
  } else qa(".reveal").forEach(function (el) { el.classList.add("is-in"); });

  var relayoutAll = function () { [q(".hero__canvas"), ].concat(qa("canvas[data-scene]")).forEach(function (c) { if (c && c._ctrl && c._ctrl.relayout) c._ctrl.relayout(); }); };
  w.addEventListener("load", function () { setTimeout(relayoutAll, 300); });
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { setTimeout(relayoutAll, 200); });

  /* ---------- Hero photo frame: keeps the 3D object + real photo aligned with the hero text ---------- */
  function textRight(els) {
    var r = 0;
    els.forEach(function (el) {
      if (!el) return;
      var rg = d.createRange(); rg.selectNodeContents(el);
      var b = rg.getBoundingClientRect(); if (b.width) r = Math.max(r, b.right);
    });
    return r;
  }
  function makeFrame(canvas, scope, o) {
    var last = null, lastW = 0;
    var calc = function () {
      var cr = canvas.getBoundingClientRect(), vw = w.innerWidth;
      if (!cr.width || !cr.height) return null;
      var hdr = q(".site-header"), hb = hdr ? hdr.getBoundingClientRect().bottom - cr.top : 80;
      var box = q(o.textBox, scope), cont = q(".container", scope), cb = cont.getBoundingClientRect();
      var bb = { top: 1e9, bottom: -1e9 };
      Array.prototype.forEach.call(box.children, function (k) { var r = k.getBoundingClientRect(); if (r.height) { bb.top = Math.min(bb.top, r.top); bb.bottom = Math.max(bb.bottom, r.bottom); } });
      if (bb.top > bb.bottom) bb = box.getBoundingClientRect();
      var pad = parseFloat(w.getComputedStyle(cont).paddingRight) || 16;
      var R = function (x, y, ww, hh) { return { x: Math.round(x), y: Math.round(y), w: Math.round(ww), h: Math.round(hh) }; };
      if (vw < 900) {
        // stacked: photo sits in the open space above the text
        var top = Math.max(hb + 14, 70), bottom = bb.top - cr.top - 22, left = cb.left - cr.left + pad, right = cb.right - cr.left - pad;
        var hh = Math.min(bottom - top, (right - left) * 0.8);
        if (hh < 130) return null;
        return R(left, bottom - hh, right - left, hh);
      }
      var tr = textRight(qa(o.textEls, scope)) - cr.left;
      var colL = Math.max(tr + 56, cr.width * 0.5);
      var idx = o.avoid ? q(o.avoid, scope) : null, ir = idx && idx.offsetParent ? idx.getBoundingClientRect() : null;
      var colR = (ir && ir.width ? ir.left - cr.left - 40 : cb.right - cr.left - pad);
      var t = (o.topEl ? q(o.topEl, scope).getBoundingClientRect().top : bb.top) - cr.top;
      var b = bb.bottom - cr.top;
      if (colR - colL < 280) {
        // headline is too wide: use the space above it on the right
        colL = cr.width * 0.5; colR = cb.right - cr.left - pad; b = bb.top - cr.top - 26; t = hb + 24;
        if (b - t < 200) return null;
      }
      var fw = colR - colL, fh = b - t;
      if (fh > fw * 1.55) { var nh = fw * 1.55; t += (fh - nh) / 2; fh = nh; }
      if (fw > fh * 1.6) { var nw = fh * 1.6; colL += (fw - nw) / 2; fw = nw; }
      return R(colL, t, fw, fh);
    };
    // keep the last good frame if a transient state (headline glitch, font swap) makes the measure fail
    return function () {
      var r = calc(), vw = w.innerWidth;
      if (r) { last = r; lastW = vw; return r; }
      return lastW === vw ? last : null;
    };
  }

  /* ---------- Home hero: service-wise 3D ---------- */
  var hero = q("#hero");
  if (hero) {
    var slides = qa(".hero__index button", hero), nameEl = q(".now__name", hero), subEl = q(".now__sub", hero), linkEl = q(".now__link", hero), chEl = q(".onair b", hero), bar = q(".now__progress i", hero), iconEl = q(".now__icon", hero);
    var ctrl = w.AdPulse3D ? w.AdPulse3D.mount(q(".hero__canvas", hero), { from: 0, offsetX: 2.6, mobileOffsetY: 1.7, rightPad: 190, cycle: false, preloadAll: true,
      frame: makeFrame(q(".hero__canvas", hero), hero, { textBox: ".hero__copy", textEls: ".hero__copy h1, .hero__text, .hero__actions", topEl: ".hero__copy h1", avoid: ".hero__index" }) }) : null;
    if (ctrl) q(".hero__canvas", hero)._ctrl = ctrl;
    var idx = 0, DUR = 8000, t0 = performance.now(), paused = false, pausedAt = 0;
    function show(i, user) {
      idx = (i + slides.length) % slides.length;
      var b = slides[idx];
      slides.forEach(function (s, k) { s.classList.toggle("is-active", k === idx); s.setAttribute("aria-selected", k === idx ? "true" : "false"); });
      var swap = function () {
        nameEl.textContent = b.dataset.name; subEl.textContent = b.dataset.sub; linkEl.href = b.dataset.href;
        linkEl.setAttribute("aria-label", "Learn more about " + b.dataset.name);
        if (iconEl) {
          var btnImg = b.querySelector("img");
          if (btnImg) iconEl.src = btnImg.src;
        }
        if (chEl) chEl.textContent = "CH " + ("0" + (idx + 1)).slice(-2);
      };
      if (hasGsap && !reduced) {
        w.gsap.to([nameEl, subEl, iconEl].filter(Boolean), { y: -14, opacity: 0, duration: 0.25, ease: "power2.in", onComplete: function () { swap(); w.gsap.fromTo([nameEl, subEl, iconEl].filter(Boolean), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.05 }); } });
      } else swap();
      if (ctrl) ctrl.goTo(b.dataset.scene !== undefined ? +b.dataset.scene : idx);
      t0 = performance.now();
      if (user && slides[idx].scrollIntoView && w.innerWidth < 1080) slides[idx].scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }
    slides.forEach(function (b, i) { b.addEventListener("click", function () { show(i, true); }); });
    hero.addEventListener("keydown", function (e) {
      if (e.target.closest("button") && (e.key === "ArrowDown" || e.key === "ArrowRight")) { e.preventDefault(); show(idx + 1, true); slides[idx].focus(); }
      if (e.target.closest("button") && (e.key === "ArrowUp" || e.key === "ArrowLeft")) { e.preventDefault(); show(idx - 1, true); slides[idx].focus(); }
    });
    var idxWrap = q(".hero__index", hero);
    idxWrap.addEventListener("mouseenter", function () { paused = true; });
    idxWrap.addEventListener("mouseleave", function () { paused = false; });
    // swipe on canvas area
    var sx = null;
    hero.addEventListener("pointerdown", function (e) { if (!e.target.closest("a,button")) sx = e.clientX; });
    hero.addEventListener("pointerup", function (e) { if (sx === null) return; var dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 60) show(idx + (dx < 0 ? 1 : -1), true); });
    // timecode + progress
    var tc = q(".hero__tc span", hero), start = performance.now(), heroVisible = true, last = performance.now();
    if ("IntersectionObserver" in w) new IntersectionObserver(function (en) { heroVisible = en[0].isIntersecting; }).observe(hero);
    idxWrap.addEventListener("mouseleave", function () { last = performance.now(); });
    (function tick(now) {
      var dt = now - last; last = now;
      if (!heroVisible || d.hidden || paused || reduced) { t0 += dt; }
      else {
        var el = (now - start) / 1000, f = Math.floor(el * 25) % 25, s = Math.floor(el) % 60, m = Math.floor(el / 60) % 60, h = Math.floor(el / 3600);
        if (tc) tc.textContent = [h, m, s, f].map(function (n) { return ("0" + n).slice(-2); }).join(":");
        var k = (now - t0) / DUR;
        if (bar) bar.style.transform = "scaleX(" + Math.min(1, k) + ")";
        if (k >= 1) show(idx + 1);
      }
      requestAnimationFrame(tick);
    })(performance.now());
    show(0);
  }

  /* ---------- Inner-page single-scene hero ---------- */
  qa("canvas[data-scene]").forEach(function (c) {
    if (!w.AdPulse3D) return;
    var ph = c.closest(".page-hero");
    var ctrl = w.AdPulse3D.mount(c, { from: +c.dataset.scene, offsetX: +(c.dataset.offset || 2.4), scale: +(c.dataset.scale || 1), mobileOffsetY: 1.2,
      frame: ph ? makeFrame(c, ph, { textBox: ".page-hero__inner", textEls: ".page-hero__inner > *" }) : null });
    c._ctrl = ctrl;
  });
  /* services overview: rows drive the stage scene */
  var stage = q(".svc-stage canvas");
  if (stage) {
    var rows = qa(".svc-row");
    rows.forEach(function (r) {
      var go = function () { rows.forEach(function (x) { x.classList.toggle("is-active", x === r); }); if (stage._ctrl) stage._ctrl.goTo(+r.dataset.scene); };
      r.addEventListener("mouseenter", go); r.addEventListener("focusin", go);
    });
    if ("IntersectionObserver" in w && !finePointer) {
      var sio = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { rows.forEach(function (y) { y.classList.toggle("is-active", y === x.target); }); if (stage._ctrl) stage._ctrl.goTo(+x.target.dataset.scene); } }); }, { rootMargin: "-45% 0px -45% 0px" });
      rows.forEach(function (r) { sio.observe(r); });
    }
  }

  /* ---------- Services horizontal scroll ---------- */
  var svc = q(".services");
  if (svc) {
    var track = q(".services__track", svc);
    /* auto-sliding 3D conveyor: cards drift left forever, tilting in depth; pauses on hover */
    if (!reduced) {
      var vp = q(".services__viewport", svc);
      qa(".svc-card:not(.svc-card--intro)", track).forEach(function (c) { var cl = c.cloneNode(true); cl.setAttribute("aria-hidden", "true"); qa("a", cl).forEach(function (a) { a.tabIndex = -1; }); track.appendChild(cl); });
      var intro = q(".svc-card--intro", track); if (intro) intro.remove();
      svc.classList.add("is-auto");
      var all = qa(".svc-card", track), half = 0, x = 0, paused = false, vis = false, lastT = performance.now();
      var measure = function () { half = track.scrollWidth / 2; };
      measure(); w.addEventListener("resize", measure);
      vp.addEventListener("mouseenter", function () { paused = true; }); vp.addEventListener("mouseleave", function () { paused = false; });
      if ("IntersectionObserver" in w) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; }).observe(vp); else vis = true;
      (function run(now) {
        var dt = Math.min(64, now - lastT); lastT = now;
        if (vis && !d.hidden) {
          if (!paused) { x -= dt * 0.06; if (-x >= half) x += half; }
          track.style.transform = "translate3d(" + x.toFixed(1) + "px,0,0)";
          var vw = vp.clientWidth;
          all.forEach(function (c) {             /* each card turns in 3D by its position on screen */
            var r = c.getBoundingClientRect(), mid = (r.left + r.width / 2) / vw - 0.5;
            c.style.setProperty("--tilt-y", (-mid * 38).toFixed(1) + "deg");
            c.style.setProperty("--tilt-x", "0deg");
            c.style.setProperty("--cz", (-Math.abs(mid) * 160).toFixed(0) + "px");
          });
        }
        requestAnimationFrame(run);
      })(lastT);
    }
  }

  /* ---------- Counters ---------- */
  var counters = qa("[data-count]");
  function runCount(el) {
    var end = +el.dataset.count, dur = reduced ? 1 : 2000, t0 = performance.now();
    (function f(now) {
      var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = Math.round(end * e).toLocaleString("en-US");
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  }
  if ("IntersectionObserver" in w) {
    var cio = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { runCount(x.target); cio.unobserve(x.target); } }); }, { threshold: 0.4 });
    counters.forEach(function (c) { cio.observe(c); });
  } else counters.forEach(function (c) { c.textContent = c.dataset.count; });

  /* ---------- Lightbox ---------- */
  var lb = q(".lightbox"), lbFrame = lb && q(".lightbox__video", lb), lastFocus = null;
  function openVideo(id, title, cat) {
    if (!lb) return;
    lastFocus = d.activeElement;
    lbFrame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="' + (title || "Video") + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    q(".lightbox__title", lb).textContent = title || "";
    q(".lightbox__cat", lb).textContent = cat || "";
    q(".lightbox__yt", lb).href = "https://www.youtube.com/watch?v=" + id;
    lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false");
    lockScroll(true);
    q(".lightbox__close", lb).focus();
  }
  function closeVideo() {
    if (!lb || !lb.classList.contains("is-open")) return;
    lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true");
    setTimeout(function () { lbFrame.innerHTML = ""; }, 350);
    lockScroll(false);
    if (lastFocus) lastFocus.focus();
  }
  if (lb) {
    q(".lightbox__close", lb).addEventListener("click", closeVideo);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeVideo(); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") closeVideo(); });
  }
  d.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-video]");
    if (!t || e.target.closest("a.link-arrow")) return;
    if (t.classList.contains("cf-card") && !t.classList.contains("is-active")) return;
    e.preventDefault();
    openVideo(t.dataset.video, t.dataset.title, t.dataset.label || t.dataset.cat);
  });
  qa("[data-video]").forEach(function (t) {
    if (t.tagName !== "BUTTON" && t.tagName !== "A") {
      t.setAttribute("tabindex", "0"); t.setAttribute("role", "button");
      t.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); t.click(); } });
    }
  });

  /* ---------- Coverflow ---------- */
  var cf = q(".coverflow");
  if (cf) {
    var cards = qa(".cf-card", cf), dotsWrap = q(".cf-dots"), active = 0, n = cards.length, auto, hover = false, inView = false;
    cards.forEach(function (c, i) {
      var b = d.createElement("button"); b.type = "button"; b.setAttribute("aria-label", "Show " + c.dataset.title);
      b.addEventListener("click", function () { go(i); }); dotsWrap.appendChild(b);
      c.addEventListener("click", function () { if (i !== active) go(i); });
    });
    var dots = qa("button", dotsWrap);
    function go(i) {
      active = (i + n) % n;
      var narrow = cf.clientWidth < 700;
      cards.forEach(function (c, k) {
        var o = k - active; if (o > n / 2) o -= n; if (o < -n / 2) o += n;
        var a = Math.abs(o);
        c.style.transform = "translate(-50%,-50%) translateX(" + o * (narrow ? 72 : 56) + "%) translateZ(" + (-a * 200) + "px) rotateY(" + (-o * 30) + "deg) scale(" + (1 - Math.min(a, 3) * 0.08) + ")";
        c.style.opacity = a > 2 ? 0 : a === 2 ? 0.35 : 1;
        c.style.zIndex = 10 - a;
        c.style.filter = a ? "brightness(.55) saturate(.8)" : "none";
        c.classList.toggle("is-active", a === 0);
        c.setAttribute("aria-hidden", a > 1 ? "true" : "false");
        c.tabIndex = a === 0 ? 0 : -1;
      });
      dots.forEach(function (b, k) { b.classList.toggle("is-active", k === active); });
    }
    q(".cf-prev").addEventListener("click", function () { go(active - 1); });
    q(".cf-next").addEventListener("click", function () { go(active + 1); });
    var px = null;
    cf.addEventListener("pointerdown", function (e) { px = e.clientX; });
    cf.addEventListener("pointerup", function (e) { if (px === null) return; var dx = e.clientX - px; px = null; if (Math.abs(dx) > 50) { go(active + (dx < 0 ? 1 : -1)); } });
    cf.addEventListener("mouseenter", function () { hover = true; });
    cf.addEventListener("mouseleave", function () { hover = false; });
    if ("IntersectionObserver" in w) new IntersectionObserver(function (en) { inView = en[0].isIntersecting; }).observe(cf);
    if (!reduced) auto = setInterval(function () { if (inView && !hover && !d.hidden && !(lb && lb.classList.contains("is-open"))) go(active + 1); }, 5200);
    go(0);
    w.addEventListener("resize", function () { go(active); });

    /* Auto-sync latest uploads directly from YouTube channel */
    (function syncYouTube() {
      function applyVideos(videos) {
        if (!videos || !videos.length) return;
        videos.slice(0, cards.length).forEach(function (v, k) {
          if (!v || !v.id || !cards[k]) return;
          cards[k].dataset.video = v.id;
          cards[k].dataset.title = v.title;
          var img = cards[k].querySelector("img");
          if (img) img.src = "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg";
          var h3 = cards[k].querySelector("figcaption h3");
          if (h3) h3.textContent = v.title;
          var dot = dots[k];
          if (dot) dot.setAttribute("aria-label", "Show " + v.title);
        });
      }

      fetch("/api/youtube")
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && data.videos && data.videos.length) applyVideos(data.videos);
        })
        .catch(function () {
          // Fallback if accessed as purely static page without backend server
          fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUCJfBhcCIDi1nuhFsdvqQLcg")
            .then(function (res) { return res.json(); })
            .then(function (data) {
              if (data && data.items && data.items.length) {
                var list = data.items.map(function (it) {
                  var vidId = (it.guid || it.link || "").split("/").pop().replace("watch?v=", "");
                  return { id: vidId, title: it.title };
                });
                applyVideos(list);
              }
            })
            .catch(function () {});
        });
    })();
  }

  /* ---------- Process pulse line ---------- */
  var proc = q(".process");
  if (proc) {
    var steps = qa(".step", proc), fg = q(".process__line .fg", proc);
    var light = function (p) { steps.forEach(function (s, i) { s.classList.toggle("is-lit", p >= (i + 0.35) / steps.length); }); };
    if (fg) { var L = fg.getTotalLength(); fg.style.strokeDasharray = L; fg.style.strokeDashoffset = L; }
    if (hasGsap && !reduced) {
      w.ScrollTrigger.create({
        trigger: proc, start: "top 70%", end: "bottom 75%", scrub: 0.6,
        onUpdate: function (self) { if (fg) fg.style.strokeDashoffset = fg.getTotalLength() * (1 - self.progress); light(self.progress); }
      });
    } else { if (fg) fg.style.strokeDashoffset = 0; light(1); }
  }

  /* ---------- Service pages: 3D sections ---------- */
  /* 2a · paragraph words light up as you scroll */
  qa(".scrub-text").forEach(function (pEl) {
    var words = pEl.textContent.trim().split(/\s+/);
    pEl.innerHTML = words.map(function (wd) { return '<span class="sw">' + wd.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</span>"; }).join(" ");
    if (!hasGsap || reduced) return;
    pEl.classList.add("is-scrub");
    var sw = qa(".sw", pEl), n = sw.length;
    w.ScrollTrigger.create({
      trigger: pEl, start: "top 82%", end: "bottom 48%", scrub: true,
      onUpdate: function (self) {
        var k = self.progress * n;
        sw.forEach(function (x, i) { x.classList.toggle("on", i < k - 1.5); x.classList.toggle("hot", i >= k - 1.5 && i < k); });
      },
      onLeave: function () { sw.forEach(function (x) { x.classList.add("on"); x.classList.remove("hot"); }); }
    });
  });

  /* 2b · 3D panel: swings in on scroll, then tilts with the cursor */
  qa("[data-p3d]").forEach(function (panel) {
    var stage = panel.parentNode, shadow = q(".p3d__shadow", stage), layers = qa(".p3d__layer", panel);
    var base = { rx: 0, ry: 0 }, mouse = { rx: 0, ry: 0 };
    var apply = function () {
      panel.style.setProperty("--rx", (base.rx + mouse.rx).toFixed(2) + "deg");
      panel.style.setProperty("--ry", (base.ry + mouse.ry).toFixed(2) + "deg");
    };
    if (hasGsap && !reduced) {
      var st = { rx: 28, ry: -38, z: -260, sp: 1.6, o: 0 };
      var render = function () {
        base.rx = st.rx; base.ry = st.ry; apply();
        panel.style.transform = "translateZ(" + st.z + "px) rotateX(var(--rx)) rotateY(var(--ry))";
        panel.style.opacity = st.o;
        layers.forEach(function (l) { l.style.transform = "translateZ(calc(var(--z) * " + st.sp.toFixed(3) + "))"; });
        if (shadow) shadow.style.setProperty("--ss", (0.6 + 0.4 * st.o).toFixed(3));
      };
      render();
      w.gsap.to(st, { rx: 0, ry: 0, z: 0, sp: 1, o: 1, ease: "power3.out", onUpdate: render,
        scrollTrigger: { trigger: stage, start: "top 92%", end: "top 30%", scrub: 0.9 } });
    }
    if (!reduced) {                                   /* auto 3D sway, forever */
      var vis2 = false, t1 = performance.now();
      if ("IntersectionObserver" in w) new IntersectionObserver(function (en) { vis2 = en[0].isIntersecting; }).observe(stage);
      (function sway(now) {
        if (vis2 && !d.hidden) { var t = (now - t1) / 1000; mouse.ry = Math.sin(t * 0.7) * 14; mouse.rx = Math.cos(t * 0.5) * 6; apply(); }
        requestAnimationFrame(sway);
      })(t1);
    }
    if (false) {
      stage.addEventListener("pointermove", function (e) {
        var r = panel.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        mouse.ry = (x - 0.5) * 18; mouse.rx = -(y - 0.5) * 14; apply();
        panel.style.setProperty("--gx", (x * 100) + "%"); panel.style.setProperty("--gy", (y * 100) + "%"); panel.style.setProperty("--go", 1);
      });
      stage.addEventListener("pointerleave", function () { mouse.rx = mouse.ry = 0; apply(); panel.style.setProperty("--go", 0); });
    }
  });

  /* 3 · Capabilities: 3D ring that turns by itself, one card every 3s */
  qa("[data-cap3d]").forEach(function (box) {
    var sec = box.closest(".cap-sec"), ring = q(".cap3d__ring", box), cards = qa(".cap", box), n = cards.length;
    var items = qa(".cap-list li", sec), step = 360 / n, front = -1;
    if (!hasGsap || reduced || !n) return;
    box.classList.add("is-3d");
    var st = { r: 0 }, idx = 0, hover = false, vis = false, t0 = performance.now(), DUR = 3000;
    function setFront(i) {
      if (i === front) return; front = i;
      cards.forEach(function (c, k) { c.classList.toggle("is-front", k === i); c.setAttribute("aria-hidden", k === i ? "false" : "true"); });
      items.forEach(function (li, k) { li.classList.toggle("is-active", k === i); });
    }
    function render() {
      var r = st.r; ring.style.setProperty("--rot", r.toFixed(2) + "deg");
      setFront(((Math.round(-r / step) % n) + n) % n);
      cards.forEach(function (c, k) {
        var a = ((k * step + r) % 360 + 540) % 360 - 180, f = Math.cos(a * Math.PI / 180);
        c.style.opacity = (0.25 + 0.75 * Math.max(0, f)).toFixed(3);
        c.style.pointerEvents = Math.abs(a) < step / 2 ? "auto" : "none";
      });
    }
    function go(i) { idx = i; t0 = performance.now(); w.gsap.to(st, { r: -i * step, duration: 1.1, ease: "power3.inOut", onUpdate: render, overwrite: true }); }
    render();
    w.gsap.fromTo(q(".cap3d__scene", box), { y: 120, scale: 0.7, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: box, start: "top 85%", once: true } });
    items.forEach(function (li, i) { q("button", li).addEventListener("click", function () { var cur = idx % n; var d2 = ((i - cur) % n + n) % n; if (d2 > n / 2) d2 -= n; go(idx + d2); }); });
    box.addEventListener("mouseenter", function () { hover = true; }); box.addEventListener("mouseleave", function () { hover = false; t0 = performance.now(); });
    if ("IntersectionObserver" in w) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; }).observe(box);
    var last = performance.now();
    (function tick(now) { var dt = now - last; last = now; if (!vis || hover || d.hidden) t0 += dt; if (now - t0 >= DUR) go(idx + 1); requestAnimationFrame(tick); })(last);
    if (finePointer) {
      box.addEventListener("pointermove", function (e) { var r = box.getBoundingClientRect(); ring.style.setProperty("--tilt", (-6 - ((e.clientY - r.top) / r.height - 0.5) * 12).toFixed(1) + "deg"); });
      box.addEventListener("pointerleave", function () { ring.style.setProperty("--tilt", "-6deg"); });
    }
  });

  /* ---------- Team: 3D sliding carousel (auto) ---------- */
  qa("[data-tslider]").forEach(function (sl) {
    var cards = qa(".tm", sl), n = cards.length, stage = q(".tslider__stage", sl);
    var nowName = q(".tslider__now b", sl), nowRole = q(".tslider__now span", sl), bar = q(".tslider__bar i", sl);
    if (!n || reduced) return;
    sl.classList.add("is-3d");
    var active = 0, entered = false, hover = false, inView = false, t0 = performance.now(), DUR = 3500;
    function layout() {
      var cw = cards[0].offsetWidth, narrow = w.innerWidth < 720;
      var X = cw * (narrow ? 0.62 : 0.78), Z = narrow ? 260 : 220, A = narrow ? 32 : 38;
      cards.forEach(function (c, k) {
        var o = k - active; if (o > n / 2) o -= n; if (o < -n / 2) o += n;
        var a = Math.abs(o);
        if (!entered) { c.style.transform = "translate(-50%,-50%) translate3d(0,80px,-900px) rotateY(" + (o * 20) + "deg)"; c.style.opacity = 0; return; }
        c.style.transform = a === 0 ? "translate(-50%,-50%)"
          : "translate(-50%,-50%) translate3d(" + Math.round(o * X) + "px, " + (a * 14) + "px, " + (-a * Z) + "px) rotateY(" + (-Math.sign(o) * Math.min(a, 2) * A) + "deg)";
        c.style.opacity = a > 3 ? 0 : 1;
        c.style.zIndex = 20 - a;
        c.classList.toggle("is-front", a === 0);
        c.setAttribute("aria-hidden", a === 0 ? "false" : "true");
      });
      if (nowName) nowName.textContent = q(".tm__name", cards[active]).textContent;
      if (nowRole) nowRole.textContent = q(".tm__role", cards[active]).textContent;
    }
    function go(i) { active = (i + n) % n; t0 = performance.now(); layout(); }
    layout();
    if ("IntersectionObserver" in w) new IntersectionObserver(function (en) {
      inView = en[0].isIntersecting;
      if (inView && !entered) { entered = true; cards.forEach(function (c, k) { c.style.transitionDelay = (k * 0.08) + "s"; }); layout(); setTimeout(function () { cards.forEach(function (c) { c.style.transitionDelay = "0s"; }); }, 1700); }
    }, { threshold: 0.25 }).observe(sl);
    else { entered = true; inView = true; layout(); }
    q(".tslider__prev", sl).addEventListener("click", function () { go(active - 1); });
    q(".tslider__next", sl).addEventListener("click", function () { go(active + 1); });
    cards.forEach(function (c, k) { c.addEventListener("click", function () { if (k !== active) go(k); }); });
    sl.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") go(active - 1); if (e.key === "ArrowRight") go(active + 1); });
    var sx = null, moved = 0;
    stage.addEventListener("pointerdown", function (e) { sx = e.clientX; moved = 0; });
    w.addEventListener("pointermove", function (e) { if (sx !== null) moved = e.clientX - sx; });
    w.addEventListener("pointerup", function () { if (sx === null) return; if (Math.abs(moved) > 50) go(active + (moved < 0 ? 1 : -1)); sx = null; });
    sl.addEventListener("mouseenter", function () { hover = true; });
    sl.addEventListener("mouseleave", function () { hover = false; t0 = performance.now(); });
    var last = performance.now();
    (function tick(now) {
      var dt = now - last; last = now;
      if (!inView || hover || d.hidden || !entered) t0 += dt;
      var k = Math.min(1, (now - t0) / DUR);
      if (bar) bar.style.transform = "scaleX(" + k + ")";
      if (k >= 1) go(active + 1);
      requestAnimationFrame(tick);
    })(last);
    w.addEventListener("resize", layout);
  });

  /* ---------- CTA ribbons ---------- */
  qa(".cta canvas").forEach(function (cv) {
    var ctx = cv.getContext("2d"); if (!ctx) return;
    var W, H, dpr = Math.min(w.devicePixelRatio || 1, 2), vis = false, raf = 0;
    function size() { W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); w.addEventListener("resize", size);
    var ribbons = [
      { c: "rgba(0,166,81,", amp: .16, f: 1.2, s: .5, y: .72, lines: 22 },
      { c: "rgba(255,255,255,", amp: .12, f: 1.7, s: -.35, y: .58, lines: 16 }
    ];
    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      ribbons.forEach(function (r) {
        for (var l = 0; l < r.lines; l++) {
          ctx.beginPath();
          var off = l * 0.018;
          for (var x = 0; x <= W; x += 12) {
            var u = x / W;
            var y = H * (r.y + Math.sin(u * Math.PI * r.f + t * r.s + off * 6) * r.amp + Math.sin(u * 7 + t * .7 + l * .2) * .015) + l * 3;
            x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
          }
          ctx.strokeStyle = r.c + (0.08 + (l / r.lines) * 0.22) + ")";
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });
    }
    function loop(ts) { raf = 0; if (!vis || d.hidden) return; draw(ts / 1000); raf = requestAnimationFrame(loop); }
    if (reduced) { draw(0); return; }
    if ("IntersectionObserver" in w) new IntersectionObserver(function (en) { vis = en[0].isIntersecting; if (vis && !raf) raf = requestAnimationFrame(loop); }).observe(cv);
    else { vis = true; raf = requestAnimationFrame(loop); }
  });

  /* ---------- Portfolio: 3D card entrance + tilt ---------- */
  var pfCards = qa(".pf-card");
  if (pfCards.length) {
    if (hasGsap && !reduced) {
      pfCards.forEach(function (c, i) {
        c._in = w.gsap.fromTo(q(".pf-card__in", c), { rotateX: 38, rotateY: (i % 3 - 1) * -14, z: -260, y: 120, opacity: 0 },
          { rotateX: 0, rotateY: 0, z: 0, y: 0, opacity: 1, duration: 1.3, ease: "expo.out", delay: (i % 3) * 0.08,
            clearProps: "transform", scrollTrigger: { trigger: c, start: "top 92%", once: true } });
      });
    }
    if (finePointer && !reduced) pfCards.forEach(function (c) {
      c.addEventListener("pointermove", function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.classList.add("is-tilting");
        c.style.setProperty("--ry", ((x - 0.5) * 16).toFixed(2) + "deg");
        c.style.setProperty("--rx", ((0.5 - y) * 12).toFixed(2) + "deg");
        c.style.setProperty("--mx", (x * 100).toFixed(1) + "%"); c.style.setProperty("--my", (y * 100).toFixed(1) + "%");
      });
      c.addEventListener("pointerleave", function () { c.classList.remove("is-tilting"); c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); });
    });
  }

  /* ---------- Filters (gallery) ---------- */
  qa(".filters").forEach(function (f) {
    var btns = qa("button", f), items = qa(f.dataset.target + " [data-cat]");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (x) { x.classList.toggle("is-active", x === b); x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        var v = b.dataset.filter;
        items.forEach(function (it) { if (it._in) { it._in.progress(1); if (it._in.scrollTrigger) it._in.scrollTrigger.kill(); } });
        if (w.ScrollTrigger) setTimeout(function () { w.ScrollTrigger.refresh(); }, 50);
        items.forEach(function (it) { it.classList.toggle("is-hidden", v !== "all" && it.dataset.cat.split(" ").indexOf(v) < 0); });
        if (hasGsap && !reduced) w.gsap.fromTo(items.filter(function (i) { return !i.classList.contains("is-hidden"); }), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.04 });
      });
    });
  });

  /* ---------- Contact form → WhatsApp ---------- */
  var form = q("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      qa("[required]", form).forEach(function (f) {
        var err = q("#" + f.id + "-err"), bad = !f.value.trim() || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
        f.setAttribute("aria-invalid", bad ? "true" : "false");
        if (err) err.textContent = bad ? (f.type === "email" && f.value.trim() ? "Enter a valid email, like name@company.com." : "This field is required.") : "";
        if (bad && ok) { f.focus(); ok = false; }
      });
      if (!ok) return;
      var v = function (id) { var el = q("#" + id); return el ? el.value.trim() : ""; };
      var text = "Hello AdPulse IMC,%0A%0A" +
        encodeURIComponent("Name: " + v("cf-name")) + "%0A" +
        encodeURIComponent("Company: " + (v("cf-company") || "-")) + "%0A" +
        encodeURIComponent("Email: " + v("cf-email")) + "%0A" +
        encodeURIComponent("Phone: " + (v("cf-phone") || "-")) + "%0A" +
        encodeURIComponent("Service: " + v("cf-service")) + "%0A%0A" +
        encodeURIComponent(v("cf-message"));
      var url = "https://wa.me/" + WA + "?text=" + text;
      var okBox = q(".form__ok", form);
      okBox.hidden = false;
      q("a", okBox).href = url;
      var mail = q(".form__mail", form);
      if (mail) mail.href = "mailto:info@adpulse.pk?subject=" + encodeURIComponent("Project enquiry — " + v("cf-service")) + "&body=" + decodeURIComponent(text).replace(/%0A/g, "\n").split("\n").map(encodeURIComponent).join("%0D%0A");
      w.open(url, "_blank", "noopener");
    });
  }

  /* ---------- Chatbot (Conversational Brand Strategist) ---------- */
  var fab = q(".chat-fab"), chat = q(".chat");
  if (fab && chat) {
    var log = q(".chat__log", chat), quick = q(".chat__quick", chat), input = q(".chat__form input", chat);
    var lang = "ur_ro"; // Default to natural Roman Urdu (Pakistani conversational standard), auto-adapts
    var topic = null;
    var userName = null;
    var turn = 0;
    var greeted = false;

    var SVC = [
      ["TVC Production", "/services/tvc-production/", "🎬"],
      ["Outdoor Media", "/services/outdoor-media/", "🏢"],
      ["Media Buying", "/services/media-buying/", "📺"],
      ["Corporate Events", "/services/corporate-events/", "🎪"],
      ["PR & Promotion", "/services/pr-promotion/", "📰"],
      ["BTL Marketing", "/services/btl-marketing/", "⚡"],
      ["Digital Marketing", "/services/digital-marketing/", "📱"],
      ["AI Video Ads", "/services/ai-video-ads/", "🤖"]
    ];

    var ROMAN_URDU_WORDS = [
      "salam", "assalam", "walaikum", "aoa", "kia", "kya", "bhai", "hal", "kaise", "kese",
      "karna", "krna", "chahiye", "chahta", "hoga", "hain", "hun", "ho", "kahan", "kitna",
      "kitni", "kharcha", "qeemat", "bataen", "batao", "shukriya", "acha", "theek", "boht",
      "meherbani", "mujhe", "hum", "humein", "aap", "apka", "apke", "kaam", "kam", "lagana",
      "lagwana", "karen", "chahie", "kab", "konsa", "shehar", "pesa", "paise", "bhej", "rahe",
      "kuch", "shuru", "karo", "pe", "par", "mein", "me", "ko", "se"
    ];

    function detectLanguage(text) {
      if (/[\u0600-\u06FF]/.test(text)) {
        if (/مرحب|شكرا|خدمات|أسعار|أين|كيف|باقة/.test(text)) return "ar";
        return "ur";
      }
      var lower = text.toLowerCase();
      if (/(hola|gracias|servicios|precio|cuanto|dónde|donde|ubicación|oficina)/.test(lower)) return "es";

      var words = lower.split(/[^a-z0-9]+/);
      var roScore = 0;
      words.forEach(function (w) {
        if (ROMAN_URDU_WORDS.indexOf(w) > -1) roScore++;
      });

      if (roScore >= 1) return "ur_ro";
      if (/(urdu me|urdu mein|roman urdu)/.test(lower)) return "ur_ro";
      if (/(what|how|where|who|can|could|please|package|packages|price|pricing|service|services|tell me|marketing|commercial|billboard|need|want|hello|hi)/.test(lower)) return "en";
      return lang || "ur_ro";
    }

    function extractUserName(text) {
      var patterns = [
        /(?:mera\s+naam|my\s+name\s+is|i\s+am|iam|name\s+is)\s+([a-zA-Z\u0600-\u06FF]+)/i,
        /(?:main|mein)\s+([a-zA-Z\u0600-\u06FF]+)\s+(?:baat\s+kar\s+raha|bol\s+raha|hoon)/i
      ];
      for (var i = 0; i < patterns.length; i++) {
        var m = text.match(patterns[i]);
        if (m && m[1] && m[1].length > 2 && ["adpulse", "assistant", "bhai", "sir", "madam"].indexOf(m[1].toLowerCase()) === -1) {
          return m[1].charAt(0).toUpperCase() + m[1].slice(1);
        }
      }
      return null;
    }

    function hasWord(text, list) {
      return list.some(function (item) {
        if (item.indexOf(" ") > -1 || /[\u0600-\u06FF]/.test(item)) return text.indexOf(item) > -1;
        var re = new RegExp("(?:^|[^a-z0-9])" + item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?:$|[^a-z0-9])", "i");
        return re.test(text);
      });
    }

    function say(html, who, dir) {
      var m = d.createElement("div");
      m.className = "msg msg--" + (who || "bot");
      if (who === "me") {
        m.textContent = html;
      } else {
        m.innerHTML = html;
        if (dir) m.setAttribute("dir", dir);
      }
      log.appendChild(m);
      log.scrollTop = log.scrollHeight;
    }

    function showTyping() {
      var m = d.createElement("div");
      m.className = "msg msg--bot msg--typing";
      m.innerHTML = "<span></span><span></span><span></span>";
      log.appendChild(m);
      log.scrollTop = log.scrollHeight;
      return m;
    }

    function getInitialGreeting() {
      if (lang === "ur_ro") {
        return {
          text: "Walaikum Assalam! AdPulse Pakistan me khush-amdeed 😊<br><br>Main AdPulse ka Senior Brand Strategist Assistant hoon. Hum 15+ saal se Pakistan ke leading brands (Toyota, Diners, Imtiaz, Abbott) ki 360° marketing, TV commercials, outdoor billboards aur digital campaigns lead kar rahe hain.<br><br>Aap batayein, aaj kis hawalay se guide karoon?",
          pills: ["📺 Hamari Services", "🎬 TV Commercials", "🏢 Billboards / OOH", "💰 Pricing Packages", "💼 Top Clients", "📱 WhatsApp Chat"]
        };
      } else if (lang === "ur") {
        return {
          text: "وعلیکم السلام! ایڈپلس پاکستان میں خوش آمدید 😊<br><br>ہم گزشتہ 15 سال سے پاکستان کے نامور برانڈز کی 360 ڈگری ایڈورٹائزنگ، ٹی وی سی، بل بورڈز اور ڈیجیٹل مہمات سنبھال رہے ہیں۔ آج ہم آپ کے برانڈ کی ترقی میں کس طرح رہنمائی کر سکتے ہیں؟",
          pills: ["📺 ہماری سروسز", "🎬 ٹی وی سی اشتہارات", "🏢 بل بورڈز", "💰 پرائسنگ", "💼 کلائنٹس", "📱 واٹس ایپ"]
        };
      } else if (lang === "ar") {
        return {
          text: "مرحباً بك في AdPulse باكستان 😊<br><br>نحن وكالة إعلانية متكاملة 360° بخبرة أكثر من 15 عاماً في خدمة كبرى العلامات التجارية في مجالات الإنتاج التلفزيوني واللوحات الإعلانية والتسويق الرقمي.<br><br>كيف يمكننا مساعدة علامتك التجارية اليوم؟",
          pills: ["📺 خدماتنا", "🎬 إنتاج الإعلانات", "🏢 اللوحات الإعلانية", "💰 باقات الأسعار", "📱 محادثة واتساب"]
        };
      } else if (lang === "es") {
        return {
          text: "¡Hola! Bienvenido a AdPulse Pakistán 😊<br><br>Somos una agencia integral de publicidad y medios 360° con más de 15 años liderando campañas para marcas de primer nivel.<br><br>¿En qué podemos ayudarte hoy?",
          pills: ["📺 Nuestros Servicios", "🎬 Comerciales TV", "🏢 Vallas Publicitarias", "💰 Precios y Cotizaciones", "📱 WhatsApp Directo"]
        };
      } else {
        return {
          text: "Hello! Welcome to AdPulse Pakistan 😊<br><br>I'm your AdPulse Brand Strategist. For over 15 years, we've helped leading national and multinational brands (like Toyota, Diners, Imtiaz Super Market, and Abbott) dominate their markets with 360° advertising.<br><br>How can we help propel your brand today?",
          pills: ["📺 All Services", "🎬 TV Commercials", "🏢 Outdoor Billboards", "💰 Pricing & Quotes", "💼 Client Work", "📱 Chat on WhatsApp"]
        };
      }
    }

    function answer(inputTxt) {
      turn++;
      var t = inputTxt.trim();
      var low = t.toLowerCase();
      lang = detectLanguage(t);

      var foundName = extractUserName(t);
      var isNameIntro = foundName && (hasWord(low, ["mera naam", "my name", "i am", "iam", "this is", "main", "mein"]) && !hasWord(low, ["tvc", "billboard", "price", "office", "rate"]));
      if (foundName) userName = foundName;

      var uName = userName ? (" " + userName) : "";
      var hit = function (arr) { return hasWord(low, arr); };

      var hasGreet = hit(["salam", "assalam", "aoa", "walaikum", "hello", "hi", "hey", "hola", "kese ho", "kaise ho", "kia hal", "kya haal", "subha bakhair", "good morning", "good evening", "سلام", "السلام علیکم", "آداب", "مرحبا", "مرحب"]);

      var greetAck = hasGreet
        ? (lang === "ur_ro"
            ? ("Walaikum Assalam" + uName + "! 😊 ")
            : (lang === "ur"
                ? ("وعلیکم السلام" + uName + "! 😊 ")
                : (lang === "ar"
                    ? ("أهلاً وسهلاً" + uName + "! 😊 ")
                    : (lang === "es"
                        ? ("¡Hola" + uName + "! 😊 ")
                        : ("Hello" + uName + "! 😊 ")))))
        : "";

      if (isNameIntro) {
        if (lang === "ur_ro") {
          return {
            text: "Aap se mil kar boht khushi hui" + uName + " bhai! 😊<br><br>Main AdPulse ka Senior Brand & Media Consultant hoon. Hum Pakistan ke premier brands ki 360° marketing, TV commercials, outdoor billboards aur digital campaigns lead karte hain.<br><br>Aap batayein, aaj kis project ya campaign ke hawalay se baat karna chahenge?",
            pills: ["📺 Hamari Services", "🎬 TV Commercials", "🏢 Billboards / OOH", "💰 Pricing Packages", "💼 Client Work", "📱 Direct WhatsApp"]
          };
        } else if (lang === "ur") {
          return {
            text: "آپ سے مل کر بہت خوشی ہوئی" + uName + "! 😊<br><br>میں ایڈپلس کا سینئر برانڈ سٹریٹجسٹ ہوں۔ ہم پاکستان کے نمایاں برانڈز کی 360 ڈگری مارکیٹنگ اور ایڈورٹائزنگ لیڈ کرتے ہیں۔<br><br>آپ بتائیں، آج آپ کس پراجیکٹ کے حوالے سے رہنمائی چاہتے ہیں؟",
            pills: ["📺 ہماری سروسز", "🎬 ٹی وی کمرشلز", "🏢 بل بورڈز", "💰 پرائسنگ", "💼 کلائنٹس", "📱 واٹس ایپ"]
          };
        } else {
          return {
            text: "A pleasure to meet you" + uName + "! 😊<br><br>I'm your AdPulse Brand Strategist. We partner with forward-thinking businesses across Pakistan to deliver standout TV commercials, high-impact billboards, and high-ROI digital campaigns.<br><br>What kind of project or campaign are you planning right now?",
            pills: ["📺 Explore Services", "🎬 TV Commercials", "🏢 Outdoor Billboards", "💰 Pricing & Quotes", "💼 Portfolio", "📱 WhatsApp Chat"]
          };
        }
      }

      var hasTopic = hit([
        "tvc", "commercial", "commercials", "ad film", "video shoot", "shoot", "film", "dvc", "cinematography", "کمرشل", "اشتہار", "ویڈیو",
        "outdoor", "ooh", "billboard", "billboards", "hoarding", "smd", "screen", "gantry", "shahrah-e-faisal", "mm alam", "بل بورڈ", "لوحات",
        "digital", "social media", "meta", "facebook", "instagram", "google ads", "seo", "tiktok", "ecommerce", "website", "ڈیجیٹل", "سوشل",
        "media buying", "radio", "newspaper", "tv slot", "channel", "ary", "geo", "hum", "میڈیا",
        "event", "conference", "exhibition", "stall", "gala", "ایونٹ",
        "pr", "public relations", "influencer", "press release", "press conference", "پی آر",
        "btl", "activation", "sampling", "promoter", "float", "roadshow",
        "ai video", "avatar", "generative ai",
        "client", "clients", "portfolio", "case study", "samples", "showreel", "past work", "کلائنٹ", "پورٹ فولیو",
        "price", "pricing", "rate", "rates", "cost", "budget", "package", "packages", "kharcha", "qeemat", "قیمت", "ریٹ", "اسعار", "precio",
        "where", "location", "address", "office", "kahan", "map", "timings", "timing", "clifton", "karachi", "lahore", "islamabad", "پتہ", "دفتر", "موقع", "oficina",
        "contact", "phone", "number", "email", "whatsapp", "call", "rabta", "رابطہ", "اتصال", "contacto",
        "real estate", "clothing", "fashion", "service", "services", "sarvis", "tamam", "kaam", "خدمات"
      ]);

      // 1. Pure Greeting
      if (hasGreet && !hasTopic) {
        return getInitialGreeting();
      }

      // 2. Gratitude / Closing
      if (hit(["shukriya", "thanks", "thank you", "boht shukriya", "jazakallah", "great thanks", "ok bye", "allah hafiz", "شکریہ", "شكرا", "gracias"])) {
        if (lang === "ur_ro") {
          return {
            text: "Boht shukriya" + uName + "! Aap se baat kar ke boht acha laga. Agar koi bhi sawal ho ya campaign plan karni ho to hum 24/7 WhatsApp per bhi available hain:<br><br>📲 <a href=\"https://wa.me/" + WA + "?text=Hi%20AdPulse,%20I%20would%20like%20to%20discuss%20my%20marketing%20campaign\" target=\"_blank\" rel=\"noopener\">+92 300 8463041</a><br><br>AdPulse team aapke brand ko grow karne ke liye hamesha tayyar hai!",
            pills: ["💬 WhatsApp Rabta", "📋 Quote Request", "📍 Office Map"]
          };
        } else if (lang === "ur") {
          return {
            text: "بہت شکریہ" + uName + "! آپ سے بات کر کے بہت خوشی ہوئی۔ کسی بھی وقت کیمپین کی منصوبہ بندی یا سوال کے لیے ہم واٹس ایپ پر دستیاب ہیں:<br><br>📲 <a href=\"https://wa.me/" + WA + "?text=السلام%20علیکم%20ایڈپلس\" target=\"_blank\" rel=\"noopener\">+92 300 8463041</a>",
            pills: ["💬 واٹس ایپ", "📋 کوٹیشن", "📍 دفتر کا پتہ"]
          };
        } else {
          return {
            text: "You're very welcome" + uName + "! It was a pleasure chatting with you. Whenever you're ready to launch or scale your campaign, our strategy team is just a message away:<br><br>📲 <a href=\"https://wa.me/" + WA + "?text=Hi%20AdPulse,%20let's%20discuss%20our%20campaign\" target=\"_blank\" rel=\"noopener\">+92 300 8463041</a><br><br>Have a fantastic day ahead!",
            pills: ["💬 WhatsApp Us", "📋 Request Quote", "📍 Visit Office"]
          };
        }
      }

      // 3. TVC Production
      if (hit(["tvc", "commercial", "commercials", "ad film", "video shoot", "shoot", "film", "documentary", "dvc", "video production", "arri", "cinematography", "کمرشل", "اشتہار", "ویڈیو"])) {
        topic = "tvc";
        if (lang === "ur_ro") {
          return {
            text: greetAck + "<b>🎬 TVC & DVC Production:</b><br>AdPulse Pakistan me high-end TV commercials aur digital video ads produce karta hai:<br><ul><li><b>Script & Creative Concept:</b> Storyboarding aur compelling storytelling.</li><li><b>Cinema-Grade Production:</b> Arri Alexa / Red cameras, expert lighting, top directors aur celebrity talent casting.</li><li><b>Post-Production:</b> Advanced VFX, color grading (DaVinci Resolve), custom jingles, aur voiceovers.</li></ul>Pura process dekhne ke liye: <a href=\"/services/tvc-production/\">TVC Production Details</a>.<br><br>Kya aapka koi specific concept ya campaign idea tayyar hai, ya hum scratch se brainstorm karein?",
            pills: ["💰 TVC Ka Kharcha?", "⏱️ Production Time Kitna?", "💬 WhatsApp Creative Team", "📋 Custom Quote"]
          };
        } else if (lang === "ur") {
          return {
            text: greetAck + "<b>🎬 ٹی وی کمرشلز اور ویڈیو پروڈکشن:</b><br>ایڈپلس جدید سینما ٹیکنالوجی (Arri Alexa / Red)، نامور ڈائریکٹرز اور ٹاپ ٹیلنٹ کے ساتھ براڈکاسٹ کوالٹی کمرشلز اور ڈی وی سی تیار کرتا ہے:<br><ul><li><b>سکرپٹ اور تخلیقی تصور:</b> دلکش سٹوری بورڈنگ اور برانڈ میسج۔</li><li><b>اعلیٰ درجے کی پروڈکشن:</b> سینما کیمرے، لائٹنگ اور مشہور شخصیات کی کاسٹنگ۔</li><li><b>پوسٹ پروڈکشن:</b> جدید وی ایف ایکس، کلر گریڈنگ اور اوریجنل میوزک ٹریک۔</li></ul>تفصیلات: <a href=\"/services/tvc-production/\">ٹی وی سی سروس تفصیلات</a>۔ کیا آپ کا کوئی سکرپٹ تیار ہے؟",
            pills: ["💰 ٹی وی سی قیمت؟", "⏱️ کتنا وقت درکار ہے؟", "💬 واٹس ایپ پر ڈائریکٹر سے بات کریں", "📋 کوٹیشن فارم"]
          };
        } else {
          return {
            text: greetAck + "<b>🎬 TVC & Video Production:</b><br>We deliver cinematic TV commercials and digital video ads that move audiences and build brand equity:<br><ul><li><b>Concept & Scriptwriting:</b> Strategic messaging and visual storytelling.</li><li><b>Production:</b> Arri Alexa / Red cinema camera rigs, world-class art direction, and premier talent casting.</li><li><b>Post-Production:</b> High-end VFX, 3D CGI, DaVinci color grading, and broadcast audio mastering.</li></ul>View full service scope: <a href=\"/services/tvc-production/\">TVC Production Overview</a>. Would you like to schedule a creative briefing call?",
            pills: ["💰 TVC Cost Breakdown", "⏱️ Production Timelines", "💬 Chat with Director", "📋 Request Proposal"]
          };
        }
      }

      // 4. Outdoor Media / Billboards
      if (hit(["outdoor", "ooh", "billboard", "billboards", "hoarding", "hoardings", "smd", "screen", "screens", "gantry", "gantries", "shahrah-e-faisal", "mm alam", "highway", "pole sign", "streamer", "streamers", "بل بورڈ", "لوحات"])) {
        topic = "outdoor";
        if (lang === "ur_ro") {
          return {
            text: greetAck + "<b>🏢 Outdoor Media & Billboards (OOH):</b><br>AdPulse ke paas Pakistan bhar ke prime highways aur commercial hubs me premium outdoor inventory available hai:<br><ul><li><b>Karachi:</b> Shahrah-e-Faisal, Clifton, Defense, Karsaz, Airport Route aur University Road.</li><li><b>Lahore:</b> MM Alam Road, Gulberg Main Boulevard, DHA, Jail Road, Ring Road.</li><li><b>Islamabad & Pindi:</b> Blue Area, Kashmir Highway, Expressway, Saddar.</li><li><b>High-Impact Formats:</b> Mega Billboards, High-brightness SMD Digital Screens, Gantries, Pole Signs, aur Airport Screens.</li></ul>Mazeed maloomat: <a href=\"/services/outdoor-media/\">Outdoor Media Locations</a>.<br><br>Aap kis shehar aur kis specific ilaqay me billboard lagwana chahte hain?",
            pills: ["📍 Karachi Locations", "📍 Lahore Locations", "💰 Billboard Rates", "💬 WhatsApp Site Availability"]
          };
        } else if (lang === "ur") {
          return {
            text: greetAck + "<b>🏢 آؤٹ ڈور میڈیا اور پرائم بل بورڈز:</b><br>ایڈپلس کے پاس کراچی (شاہراہ فیصل، کلفٹن، ڈیفنس)، لاہور (ایم ایم عالم، گلبرگ، رنگ روڈ) اور اسلام آباد (بلیو ایریا، ایکسپریس وے) میں بہترین لوکیشنز دستیاب ہیں جن میں بڑی ایس ایم ڈی اسکرینز، میگا بل بورڈز اور برج پینلز شامل ہیں۔<br><br>تفصیلات: <a href=\"/services/outdoor-media/\">آؤٹ ڈور میڈیا سروسز</a>۔ آپ کس شہر میں سائٹ بک کرنا چاہتے ہیں؟",
            pills: ["📍 کراچی لوکیشنز", "📍 لاہور لوکیشنز", "💰 بل بورڈ ریٹس", "💬 واٹس ایپ دستیابی"]
          };
        } else {
          return {
            text: greetAck + "<b>🏢 Outdoor Media (OOH & Digital OOH):</b><br>We hold exclusive and network access to Pakistan's highest-visibility billboard inventory:<br><ul><li><b>Karachi:</b> Shahrah-e-Faisal arterial corridor, Clifton, DHA, Airport Expressway.</li><li><b>Lahore:</b> MM Alam Road, Main Boulevard Gulberg, DHA, Ring Road gantries.</li><li><b>Islamabad / Rawalpindi:</b> Blue Area, Srinagar Highway, Murree Road.</li><li><b>Formats:</b> High-resolution curved SMD screens, mega hoardings, pedestrian bridges, and transit media.</li></ul>Explore details: <a href=\"/services/outdoor-media/\">Outdoor Media Services</a>. Which city and corridor are you targeting?",
            pills: ["📍 Karachi Inventory", "📍 Lahore Inventory", "💰 Pricing & Availability", "💬 Reserve a Site"]
          };
        }
      }

      // 5. Timelines
      if (hit(["time", "kitna time", "kitne din", "kab tak", "duration", "timeline", "kitna waqt", "وقت", "کتنے دن"])) {
        if (topic === "tvc") {
          return {
            text: greetAck + (lang === "ur_ro"
              ? "<b>⏱️ TVC Production Timelines:</b><br>Ek high-end broadcast TV commercial typically <b>2 se 4 hafton (weeks)</b> me complete hota hai:<br><ul><li><b>Script & Storyboard:</b> 3 se 5 din</li><li><b>Pre-production & Casting:</b> 5 se 7 din</li><li><b>Cinema Shoot:</b> 1 se 2 din</li><li><b>Post-production (Editing, Color Grading, VFX, Jingles):</b> 7 se 10 din</li></ul>Urgent launches ke liye hum <b>Fast-Track / Express Production</b> bhi provide karte hain!"
              : "<b>⏱️ TVC Production Timeline:</b><br>A broadcast-ready commercial typically takes <b>2 to 4 weeks</b> from concept approval to delivery. Fast-track production is also available for urgent market launches."),
            pills: ["💰 TVC Ka Kharcha?", "💬 Talk to Director on WhatsApp", "📋 Share Script Brief", "🎬 TVC Showreel"]
          };
        } else {
          return {
            text: greetAck + (lang === "ur_ro"
              ? "<b>⏱️ Campaign Timelines:</b><br><ul><li><b>Digital & Social Ads:</b> 2 se 4 din me live.</li><li><b>Outdoor Billboards:</b> Printing & mounting 3 se 5 din me complete.</li><li><b>TVC & Video Shoot:</b> 2 se 4 hafte.</li><li><b>Corporate Events & Expo:</b> 1 se 3 hafte preparation.</li></ul>Aapki deadline kab ki hai? Hum express turnaround me execute kar sakte hain."
              : "<b>⏱️ Execution Timelines:</b><br><ul><li><b>Digital Campaigns:</b> 2 to 4 days setup & launch.</li><li><b>Outdoor Billboards:</b> 3 to 5 days printing and site mounting.</li><li><b>TV Commercials:</b> 2 to 4 weeks for full cinema production.</li></ul>What is your target launch date?"),
            pills: ["📋 Request Quote", "💬 Discuss Deadline on WhatsApp", "📺 Services Overview"]
          };
        }
      }

      // 6. Clients & Portfolio
      if (hit(["client", "clients", "portfolio", "past work", "kaam dikhao", "case study", "case studies", "toyota", "honda", "diners", "imtiaz", "abbott", "sample", "samples", "showreel", "previous work", "کلائنٹ", "پورٹ فولیو", "اعمال"])) {
        topic = "portfolio";
        if (lang === "ur_ro") {
          return {
            text: greetAck + "Humne Pakistan ke top national aur multinational brands ke sath iconic campaigns execute ki hain, jin me shamil hain:<br><ul><li>🚗 <b>Automotive:</b> Toyota, Honda, Haval</li><li>🛒 <b>Retail & FMCG:</b> Imtiaz Super Market, Diners, Service Shoes, Diamond Foam</li><li>💊 <b>Healthcare & Corporate:</b> Abbott Healthcare, Jubilee Insurance, PSO</li></ul>Aap hamare real TV commercials, billboards aur digital campaigns ka showreel yahan dekh sakte hain:<br>👉 <a href=\"/portfolio/\"><b>Hamara Portfolio & Case Studies Dekhein</b></a><br><br>Agar aapko kisi specific industry (e.g. Fashion, Real Estate ya FMCG) ke samples dekhne hain to batayein!",
            pills: ["🎬 TVC Samples", "🏢 Outdoor Sites", "📱 Digital Case Studies", "💬 WhatsApp for Deck"]
          };
        } else if (lang === "ur") {
          return {
            text: greetAck + "ہم نے پاکستان کے ٹاپ برانڈز (ٹویوٹا، ہونڈا، امتیاز سپر مارکیٹ، ڈائنرز، سروس شوز، ایبٹ) کے ساتھ شاندار مہمات مکمل کی ہیں۔<br><br>👉 <a href=\"/portfolio/\"><b>ہمارا پورٹ فولیو اور کیس اسٹڈیز ملاحظہ کریں</b></a>",
            pills: ["🎬 کمرشلز پورٹ فولیو", "🏢 بل بورڈ تصاویر", "📱 ڈیجیٹل نتائج", "💬 واٹس ایپ ڈیک"]
          };
        } else {
          return {
            text: greetAck + "Over 15 years, we've partnered with Pakistan's most respected conglomerates and challenger brands, including:<br><ul><li>🚗 <b>Automotive:</b> Toyota, Honda, Haval</li><li>🛒 <b>Retail & FMCG:</b> Imtiaz Super Market, Diners, Service, Diamond Foam</li><li>💊 <b>Corporate & Pharma:</b> Abbott Healthcare, Jubilee Life, PSO</li></ul>You can inspect our live case studies and broadcast showreels here:<br>👉 <a href=\"/portfolio/\"><b>Explore AdPulse Portfolio & Work</b></a>",
            pills: ["🎬 TVC Reels", "🏢 Billboard Photos", "📱 Digital Results", "💬 Get PDF Credentials"]
          };
        }
      }

      // 7. Media Buying
      if (hit(["media buying", "media planning", "tv slot", "channel", "ary", "geo", "hum", "radio", "fm", "newspaper", "akhbar", "jang", "dawn", "print ad", "psl", "میڈیا"])) {
        topic = "media_buying";
        if (lang === "ur_ro") {
          return {
            text: greetAck + "<b>📺 Media Buying & Planning (TV, Radio, Print):</b><br>AdPulse Pakistan Broadcasters Association (PBA) aur All Pakistan Newspapers Society (APNS) se accredited agency hai. Hamari bulk buying power se clients ko market ke sab se behtareen discounts miltay hain:<br><ul><li><b>Television:</b> ARY News/Digital, Geo, Hum TV, Ten Sports, Geo Super samait tamam channels per prime time slots aur live sports (PSL/ICC).</li><li><b>Print Media:</b> Daily Jang, Dawn, The News, Daily Express, Nawa-i-Waqt me front/back page aur classified display ads.</li><li><b>Radio Networks:</b> FM 106.2, FM 89, FM 107 across 40+ cities.</li></ul>Tafseelat: <a href=\"/services/media-buying/\">Media Buying Solutions</a>.",
            pills: ["💰 TV Channel Rates", "📰 Newspaper Rates", "🎯 Media Plan Banwayen", "💬 WhatsApp Media Desk"]
          };
        } else {
          return {
            text: greetAck + "<b>📺 Media Buying & Planning:</b><br>As a PBA and APNS accredited agency, AdPulse commands institutional bargaining power across Pakistan's media spectrum:<br><ul><li><b>Broadcast TV:</b> Prime slots, sponsorships, and ticker integrations on ARY, Geo, Hum TV, Dawn News, and live sports properties.</li><li><b>Print Newspapers:</b> Guaranteed positioning in Daily Jang, Dawn, Express, and The News.</li><li><b>Radio Broadcasting:</b> Nationwide FM coverage across Tier-1, Tier-2, and motorway listeners.</li></ul>See our approach: <a href=\"/services/media-buying/\">Media Buying & Planning</a>.",
            pills: ["💰 Media Rate Card", "🎯 Custom Media Plan", "💬 Direct WhatsApp Enquiry"]
          };
        }
      }

      // 8. Digital Marketing
      if (hit(["digital", "social media", "meta", "facebook", "fb ad", "instagram", "insta", "google ads", "seo", "tiktok", "lead generation", "ecommerce", "website", "web design", "ڈیجیٹل", "سوشل"])) {
        topic = "digital";
        if (lang === "ur_ro") {
          return {
            text: greetAck + "<b>📱 Digital & Performance Marketing:</b><br>Hum data-driven digital strategies banate hain jo sirf 'likes' nahi balkay real sales aur business growth deliver karti hain:<br><ul><li><b>Paid Social:</b> High-converting Meta (Facebook & Instagram) ads aur viral TikTok campaigns.</li><li><b>Search & Intent:</b> Google Search, Display Network, aur YouTube TrueView video campaigns.</li><li><b>Lead Gen & E-Commerce:</b> Real estate leads, B2B inquiries, aur direct Shopify/WooCommerce sales scaling.</li><li><b>Web & Tech:</b> Fast, mobile-first websites aur high-converting landing pages.</li></ul>Tafseelat: <a href=\"/services/digital-marketing/\">Digital Marketing Services</a>.<br><br>Aapka primary goal kya hai — brand awareness ya qualified leads / sales?",
            pills: ["🎯 Lead Generation", "🛍️ E-Commerce Sales", "💰 Monthly Retainers", "💬 Free Strategy Session"]
          };
        } else if (lang === "ur") {
          return {
            text: greetAck + "<b>📱 ڈیجیٹل مارکیٹنگ اور پرفارمنس ایڈز:</b><br>ہم فیس بک، انسٹاگرام، گوگل سرچ اور ٹک ٹاک کے ذریعے ٹارگٹڈ کسٹمرز، آن لائن سیلز اور کوالیفائیڈ لیڈز فراہم کرتے ہیں۔ ویب سائٹ ڈیزائن اور سرچ انجن آپٹیمائزیشن (SEO) بھی دستیاب ہے۔<br><br>تفصیلات: <a href=\"/services/digital-marketing/\">ڈیجیٹل مارکیٹنگ سروسز</a>",
            pills: ["🎯 لیڈ جنریشن", "🛍️ ای کامرس سیلز", "💰 پیکیجز اور ریٹس", "💬 واٹس ایپ کنسلٹیشن"]
          };
        } else {
          return {
            text: greetAck + "<b>📱 Digital & Performance Marketing:</b><br>We engineer full-funnel digital campaigns that convert impressions into paying customers:<br><ul><li><b>Performance Media:</b> Precision-targeted Meta (Instagram/Facebook) & TikTok ad funnels.</li><li><b>Search & Intent:</b> High-intent Google Search, Performance Max, and YouTube video ads.</li><li><b>E-commerce & Lead Gen:</b> Optimized ROAS for retail brands and verified B2B/real-estate pipeline.</li><li><b>Modern Web:</b> Fast, 3D interactive web experiences that maximize conversion rates.</li></ul>Read more: <a href=\"/services/digital-marketing/\">Digital Marketing Overview</a>. What is your immediate objective?",
            pills: ["🎯 Lead Gen Campaign", "🛍️ Scale E-Commerce", "💰 Packages & Retainers", "💬 WhatsApp Digital Lead"]
          };
        }
      }

      // 9. BTL Activations
      if (hit(["btl", "activation", "mall", "sampling", "promoter", "float", "roadshow", "canopy", "stunt", "ground activation"])) {
        topic = "btl";
        if (lang === "ur_ro") {
          return {
            text: greetAck + "<b>⚡ BTL Marketing & On-Ground Activations:</b><br>Jab brand ko directly consumer se connect karna ho, AdPulse nationwide ground activations execute karta hai:<br><ul><li><b>Mall & High-Street Kiosks:</b> LuckyOne, Dolmen Mall, Packages Mall, Emporium me interactive brand zones.</li><li><b>Mobile Floats & Roadshows:</b> Customized branded trucks aur floats jo shehar-ba-shehar tour karte hain.</li><li><b>Trained Brand Ambassadors:</b> Professional male & female promoters jo customer experience aur sampling lead karte hain.</li></ul>Check details: <a href=\"/services/btl-marketing/\">BTL Marketing</a>.",
            pills: ["📍 Mall Kiosk Setup", "🚚 Branded Float Tour", "💰 Activation Budget", "💬 WhatsApp BTL Team"]
          };
        } else {
          return {
            text: greetAck + "<b>⚡ BTL Marketing & Brand Activations:</b><br>Direct consumer engagement that drives brand trial and memorable physical interactions:<br><ul><li><b>Mall Activations:</b> Interactive experience booths in Dolmen, LuckyOne, Packages, and Centaurus.</li><li><b>Promotional Floats:</b> Mobile highway and city roadshow floats outfitted with sound and branding.</li><li><b>Product Sampling:</b> Controlled sampling campaigns in universities, corporate towers, and markets.</li></ul>Explore: <a href=\"/services/btl-marketing/\">BTL Marketing & Activations</a>.",
            pills: ["📍 Top Malls Setup", "🚚 Roadshow Fleet", "💰 Pricing Breakdown", "💬 Talk to Activation Manager"]
          };
        }
      }

      // 10. Corporate Events
      if (hit(["event", "conference", "gala", "annual dinner", "exhibition", "stall", "fabrication", "launch event", "stage", "ایونٹ"])) {
        topic = "events";
        if (lang === "ur_ro") {
          return {
            text: greetAck + "<b>🎪 Corporate Events & Exhibitions:</b><br>AdPulse corporate events ko turnkey fashion me seamlessly manage karta hai:<br><ul><li><b>Stall Design & Fabrication:</b> Expo Centre Karachi & Lahore me custom 3D stalls.</li><li><b>Annual Conferences & Gala Dinners:</b> Audio-visual setups, LED backdrop walls, bespoke stage lighting.</li><li><b>Product Launches & Dealer Meets:</b> Complete choreography, emcee/host selection, aur guest management.</li></ul>Tafseelat: <a href=\"/services/corporate-events/\">Corporate Events</a>.",
            pills: ["🏗️ Expo Stall Design", "🎤 Gala / Conference", "💰 Event Budgeting", "💬 WhatsApp Event Team"]
          };
        } else {
          return {
            text: greetAck + "<b>🎪 Corporate Events & Expo Stalls:</b><br>From high-profile brand launches to international trade show booths:<br><ul><li><b>Custom Booth Fabrication:</b> High-finish expo stands at Karachi Expo Centre and Lahore Expo.</li><li><b>Conferences & Galas:</b> End-to-end audiovisual, massive LED stage backdrops, and atmospheric lighting.</li><li><b>Turnkey Execution:</b> Venue booking, guest coordination, and media coverage.</li></ul>Learn more: <a href=\"/services/corporate-events/\">Corporate Events Scope</a>.",
            pills: ["🏗️ Expo Booth Quote", "🎤 Corporate Dinner Setup", "💰 Pricing Estimate", "💬 Chat with Event Lead"]
          };
        }
      }

      // 11. PR & Influencers
      if (hit(["pr", "public relations", "influencer", "blogger", "press release", "press conference", "celebrity", "media coverage", "crisis", "پی آر"])) {
        topic = "pr";
        if (lang === "ur_ro") {
          return {
            text: greetAck + "<b>📰 PR & Influencer Marketing:</b><br>Hum aapki brand story ko Pakistan ke sab se baray media outlets aur top digital creators tak pohnchate hain:<br><ul><li><b>Print & Digital Press Releases:</b> Dawn, Jang, Tribune, Profit, ProPakistani me guaranteed placement.</li><li><b>Influencer Management:</b> Tech, lifestyle, beauty aur corporate niche creators ke sath authentic campaigns.</li><li><b>Press Conferences:</b> Turnkey press briefings, journalist invitations, aur television crew coordination.</li></ul>Tafseelat: <a href=\"/services/pr-promotion/\">PR & Promotion Services</a>.",
            pills: ["🎙️ Press Release Distribution", "🌟 Influencer Roster", "💰 PR Packages", "💬 WhatsApp PR Desk"]
          };
        } else {
          return {
            text: greetAck + "<b>📰 PR & Influencer Marketing:</b><br>Build authentic social proof and editorial media credibility:<br><ul><li><b>Top-Tier Press Coverage:</b> Guaranteed editorial reach across Dawn, Tribune, Jang, and ProPakistani.</li><li><b>Celebrity & Creator Collaborations:</b> Curated influencer rosters matching your brand persona.</li><li><b>Press Conferences & Media Days:</b> On-ground media management and wire distribution.</li></ul>Check details: <a href=\"/services/pr-promotion/\">PR & Promotion</a>.",
            pills: ["🎙️ Press Distribution", "🌟 Influencer Campaigns", "💰 Retainer Details", "💬 Speak to PR Strategist"]
          };
        }
      }

      // 12. AI Video Ads
      if (hit(["ai video", "generative ai", "ai ads", "midjourney", "runway", "virtual presenter", "avatar", "synthetic"])) {
        topic = "ai";
        if (lang === "ur_ro") {
          return {
            text: greetAck + "<b>🤖 AI Video Ads & Generative Creative:</b><br>AdPulse Pakistan ki pehli agencies me shamil hai jo AI video production offer karti hai:<br><ul><li><b>Rapid Production:</b> Traditional shoots ke muqablay me 10x fast delivery.</li><li><b>Cost-Effective:</b> Baghair baray set aur crew ke high-end visuals aur animations.</li><li><b>Multilingual Avatars:</b> English, Urdu, Arabic me lifelike virtual presenters aur voice dubbing.</li></ul>Dekhein: <a href=\"/services/ai-video-ads/\">AI Video Ads Showcase</a>.",
            pills: ["🎬 AI Ad Demo", "💰 AI vs Shoot Cost", "💬 WhatsApp AI Lab"]
          };
        } else {
          return {
            text: greetAck + "<b>🤖 AI Video Ads & Synthetic Media:</b><br>Harness generative AI to build photorealistic commercials at fraction of typical shoot expense:<br><ul><li><b>Hyper-Fast Iterations:</b> Test dozens of creative angles in days rather than months.</li><li><b>AI Presenters & Dubbing:</b> Ultra-realistic virtual spokespersons in English, Urdu, and regional languages.</li><li><b>Social-First Reels:</b> High-velocity creative generation for Meta & TikTok algorithms.</li></ul>Discover more: <a href=\"/services/ai-video-ads/\">AI Video Ads</a>.",
            pills: ["🎬 Watch Demos", "💰 Cost Comparison", "💬 Request AI Concept"]
          };
        }
      }

      // 13. All Services
      if (hit(["service", "services", "sarvis", "tamam", "all service", "what do you do", "kia karte ho", "kya karte ho", "kaam kya hai", "خدمات"])) {
        topic = "services";
        var svcLinks = SVC.map(function (s) { return "• <a href=\"" + s[1] + "\"><b>" + s[2] + " " + s[0] + "</b></a>"; }).join("<br>");
        if (lang === "ur_ro") {
          return {
            text: greetAck + "AdPulse Pakistan ek complete 360° Agency hai. Hamari 8 Core Services ye hain:<br><br>" + svcLinks + "<br><br>Aap batayein in me se kis service ki details ya quotation aapko chahiye?",
            pills: ["🎬 TV Commercials", "🏢 Billboards (OOH)", "📺 Media Buying", "📱 Digital Marketing", "💰 Pricing Details"]
          };
        } else if (lang === "ur") {
          return {
            text: greetAck + "ایڈپلس ایک مکمل 360 ڈگری ایجنسی ہے۔ ہماری 8 بنیادی سروسز یہ ہیں:<br><br>" + svcLinks + "<br><br>آپ کس سروس کے بارے میں مزید تفصیلات جاننا چاہتے ہیں؟",
            pills: ["🎬 ٹی وی کمرشلز", "🏢 بل بورڈز", "📺 میڈیا بائینگ", "📱 ڈیجیٹل مارکیٹنگ", "💰 پرائسنگ"]
          };
        } else {
          return {
            text: greetAck + "AdPulse operates as a complete 360° integrated marketing partner. Our 8 core disciplines are:<br><br>" + svcLinks + "<br><br>Which area would you like to explore first?",
            pills: ["🎬 TVC Production", "🏢 Outdoor Media", "📺 Media Buying", "📱 Digital Marketing", "💰 Pricing Packages"]
          };
        }
      }

      // 14. Pricing
      if (hit(["price", "pricing", "rate", "rates", "cost", "costs", "package", "packages", "budget", "kharcha", "qeemat", "kitna kharcha", "kitna lagega", "kitne paise", "pesa", "expensive", "discount", "quotation", "quote", "charges", "قیمت", "ریٹ", "اسعار", "precio"])) {
        topic = "pricing";
        if (lang === "ur_ro") {
          return {
            text: greetAck + "<b>💰 AdPulse Pricing & Investment Structure:</b><br>Advertising me har campaign custom hoti hai, kyunke cost aapke specific requirements per depend karti hai:<br><ul><li><b>🎬 TV Commercials:</b> Concept, camera package (Arri/Red), days of shoot, aur cast per depend karta hai.</li><li><b>🏢 Billboards & OOH:</b> Specific location (e.g. Shahrah-e-Faisal vs Highway) aur monthly rental duration per depend karta hai.</li><li><b>📱 Digital & Performance:</b> Monthly management retainer + media ad spend.</li><li><b>📺 Media Buying:</b> Channel mix, time-bands, aur GRP volume ke mutabiq direct bulk discounts.</li></ul>👉 <b>Hum har scale ke budget ke mutabiq best ROI solution design karte hain.</b><br><br>Aap direct hamari management team se WhatsApp per budget discuss kar sakte hain:<br>📲 <a href=\"https://wa.me/" + WA + "?text=Assalam-o-Alaikum%20AdPulse,%20mujhe%20campaign%20pricing%20ke%20hawalay%20se%20maloomat%20chahiye\" target=\"_blank\" rel=\"noopener\"><b>WhatsApp (+92 300 8463041)</b></a> ya hamara <a href=\"/contact/\">Quote Form</a> fill karein!",
            pills: ["📋 Request Custom Quote", "💬 WhatsApp Discussion", "📞 Call Office", "🎬 TVC Production Scope"]
          };
        } else if (lang === "ur") {
          return {
            text: greetAck + "<b>💰 پرائسنگ اور بجٹ:</b><br>ہر پروجیکٹ کا تخمینہ آپ کے میڈیا مکس، دورانیے اور پروڈکشن اسکوپ کے مطابق تیار کیا جاتا ہے تاکہ زیادہ سے زیادہ منافع (ROI) حاصل ہو۔<br><br>فوری کسٹم کوٹیشن کے لیے ہماری ٹیم سے رابطہ کریں:<br>📲 <a href=\"https://wa.me/" + WA + "?text=السلام%20علیکم%20ایڈپلس،%20مجھے%20پرائسنگ%20کی%20معلومات%20چاہئیں\" target=\"_blank\" rel=\"noopener\"><b>واٹس ایپ (+92 300 8463041)</b></a> یا <a href=\"/contact/\">کوٹیشن فارم</a> پر تفصیلات بھیجیں۔",
            pills: ["📋 کوٹیشن فارم", "💬 واٹس ایپ ڈائریکٹر", "📍 دفتر کا پتہ"]
          };
        } else {
          return {
            text: greetAck + "<b>💰 AdPulse Pricing Philosophy & Estimates:</b><br>Because we serve both emerging challenger brands and large conglomerates, our campaigns are tailored specifically to your brief and ROI expectations:<br><ul><li><b>🎬 TVC / DVC:</b> Structured around creative scope, shoot duration, equipment tier, and talent tier.</li><li><b>🏢 OOH Billboards:</b> Dependent on prime corridor location (e.g. Shahrah-e-Faisal vs Ring Road) and duration.</li><li><b>📱 Digital Marketing:</b> Tailored monthly retainers with transparent performance targets.</li><li><b>📺 Media Buying:</b> Bulk agency rates through our PBA/APNS credentials for maximum airtime efficiency.</li></ul>Let our account directors send you an exact line-item proposal:<br>👉 <a href=\"/contact/\"><b>Submit Your Campaign Brief</b></a> or ping us directly on <a href=\"https://wa.me/" + WA + "?text=Hello%20AdPulse,%20I%20would%20like%20a%20pricing%20quotation\" target=\"_blank\" rel=\"noopener\"><b>WhatsApp (+92 300 8463041)</b></a>.",
            pills: ["📋 Submit Campaign Brief", "💬 Instant WhatsApp Quote", "📞 Call +92 300 8463041", "🏢 Visit Our Office"]
          };
        }
      }

      // 15. Office Location
      if (hit(["where", "location", "address", "office", "kahan", "karachi", "lahore", "islamabad", "clifton", "map", "timings", "timing", "open", "visit", "پتہ", "دفتر", "موقع", "oficina"])) {
        topic = "location";
        if (lang === "ur_ro") {
          return {
            text: greetAck + "<b>📍 AdPulse Head Office & Timings:</b><br><b>Address:</b> Office #213, 2nd Floor, Pak Tower, Block 5 Clifton, Karachi, Pakistan.<br><b>Timings:</b> Monday to Saturday, 10:00 AM – 6:30 PM (Sunday Closed).<br><b>Nationwide Execution:</b> Karachi head office ke ilawa hum Lahore, Islamabad, Rawalpindi, Faisalabad aur poore Pakistan me projects aur outdoor media manage karte hain.<br><br>🗺️ <a href=\"https://maps.google.com/?q=Pak+Tower+Block+5+Clifton+Karachi\" target=\"_blank\" rel=\"noopener\"><b>Google Maps per Directions Dekhein</b></a><br>Aap office visit karna chahte hain to ek call ya WhatsApp message kar dein taake meeting schedule ho sake!",
            pills: ["🗺️ Open Google Maps", "💬 Schedule Meeting on WhatsApp", "📞 Call +92 300 8463041", "📺 View Services"]
          };
        } else if (lang === "ur") {
          return {
            text: greetAck + "<b>📍 ایڈپلس ہیڈ آفس اور اوقات:</b><br><b>پتہ:</b> آفس نمبر 213، دوسری منزل، پاک ٹاور، بلاک 5 کلفٹن، کراچی، پاکستان۔<br><b>اوقات:</b> پیر تا ہفتہ، صبح 10:00 تا شام 6:30 بجے۔<br><br>🗺️ <a href=\"https://maps.google.com/?q=Pak+Tower+Block+5+Clifton+Karachi\" target=\"_blank\" rel=\"noopener\"><b>گوگل میپس پر دیکھیں</b></a>",
            pills: ["🗺️ گوگل میپس", "💬 واٹس ایپ میٹنگ", "📞 کال کریں", "📺 سروسز"]
          };
        } else {
          return {
            text: greetAck + "<b>📍 AdPulse Office & Operating Hours:</b><br><b>Headquarters:</b> Office #213, 2nd Floor, Pak Tower, Block 5 Clifton, Karachi, Pakistan.<br><b>Office Hours:</b> Monday – Saturday, 10:00 AM – 6:30 PM.<br><b>Regional Reach:</b> Full-scale production and media activation across Lahore, Islamabad, Multan, and nationwide.<br><br>🗺️ <a href=\"https://maps.google.com/?q=Pak+Tower+Block+5+Clifton+Karachi\" target=\"_blank\" rel=\"noopener\"><b>Open in Google Maps</b></a><br>Would you like to drop by for a cup of coffee and a campaign brainstorm?",
            pills: ["🗺️ Get Directions", "💬 Book In-Person Meeting", "📞 Call +92 300 8463041", "📺 Explore Services"]
          };
        }
      }

      // 16. Contact
      if (hit(["contact", "phone", "number", "email", "whatsapp", "call", "rabta", "mobile", "director", "meeting", "appointment", "talk", "رابطہ", "اتصال", "contacto"])) {
        topic = "contact";
        if (lang === "ur_ro") {
          return {
            text: greetAck + "<b>📞 AdPulse Direct Contact Channels:</b><br>Hamari team hamesha ready hai aapki call ya message lene ke liye:<br><ul><li>📱 <b>WhatsApp / Mobile:</b> <a href=\"https://wa.me/" + WA + "?text=Assalam-o-Alaikum%20AdPulse,%20mujhe%20rabta%20karna%20hai\" target=\"_blank\" rel=\"noopener\"><b>+92 300 8463041</b></a></li><li>✉️ <b>Email:</b> <a href=\"mailto:info@adpulse.pk\">info@adpulse.pk</a></li><li>🏢 <b>Office:</b> Office #213, 2nd Floor, Pak Tower, Block 5 Clifton, Karachi</li><li>🌐 <b>Online Form:</b> <a href=\"/contact/\">Contact Form Fill Karein</a></li></ul>Aap direct WhatsApp button click kar ke abhi chat shuru kar sakte hain!",
            pills: ["💬 Chat on WhatsApp (+92 300 8463041)", "📋 Fill Contact Form", "📍 Office Location", "📺 View Services"]
          };
        } else if (lang === "ur") {
          return {
            text: greetAck + "<b>📞 رابطہ کی تفصیلات:</b><br>فون / واٹس ایپ: <a href=\"https://wa.me/" + WA + "\" target=\"_blank\" rel=\"noopener\">+92 300 8463041</a><br>ای میل: info@adpulse.pk<br>دفتر: پاک ٹاور، بلاک 5 کلفٹن، کراچی۔",
            pills: ["💬 واٹس ایپ", "📋 رابطہ فارم", "📍 گوگل میپس"]
          };
        } else {
          return {
            text: greetAck + "<b>📞 Connect with AdPulse Leadership:</b><br>Reach out through any of our direct communications desks:<br><ul><li>📱 <b>Direct WhatsApp / Phone:</b> <a href=\"https://wa.me/" + WA + "?text=Hello%20AdPulse,%20I'd%20like%20to%20discuss%20a%20project\" target=\"_blank\" rel=\"noopener\"><b>+92 300 8463041</b></a></li><li>✉️ <b>Email:</b> <a href=\"mailto:info@adpulse.pk\">info@adpulse.pk</a></li><li>🏢 <b>Physical Address:</b> Office #213, 2nd Floor, Pak Tower, Block 5 Clifton, Karachi</li><li>🌐 <b>Brief Submission:</b> <a href=\"/contact/\">Online Project Inquiry</a></li></ul>Click WhatsApp to immediately connect with our account director.",
            pills: ["💬 Open WhatsApp Chat", "📋 Submit Brief Online", "📍 Directions to Office", "📺 Our Services"]
          };
        }
      }

      // 17. Industry Specific
      if (hit(["real estate", "property", "housing", "builder"])) {
        return {
          text: greetAck + (lang === "ur_ro"
            ? "<b>🏡 Real Estate Marketing Solutions:</b><br>Hum housing societies aur commercial projects ke liye specialized 360° launches execute karte hain: 3D architectural walkthroughs, site billboard dominance (highways aur entrance gantries), digital lead generation (overseas Pakistani buyers ke liye Meta/Google ads), aur launch events.<br><br>Aapke project ka naam kya hai? Hamari team custom proposal share karegi."
            : "<b>🏡 Real Estate Marketing Expertise:</b><br>We specialize in full-scale property launches: 3D architectural visualizations, strategic highway billboard domination, international overseas buyer lead funnels, and VIP launch galas.<br><br>Let us build a customized investor acquisition strategy for your project."),
          pills: ["🏢 Outdoor Highway Sites", "🎯 Overseas Buyer Leads", "💬 WhatsApp Proposal", "📋 Request Quote"]
        };
      }

      if (hit(["clothing", "fashion", "apparel", "brand launch", "lawn", "retail"])) {
        return {
          text: greetAck + (lang === "ur_ro"
            ? "<b>👗 Fashion & Retail Marketing:</b><br>Diners, Service Shoes aur kai fashion brands ke sath humne seasonal launches aur fashion films execute ki hain: high-fashion model shoots, influencer gifting campaigns, mall activations, aur high-ROI Shopify meta ads.<br><br>Aap batayein aapka brand women's wear, men's wear ya footwear me hai?"
            : "<b>👗 Fashion & Apparel Growth:</b><br>Having partnered with heavyweights like Diners and Service, we specialize in seasonal collection campaigns, high-fashion TV commercials, lifestyle influencer buzz, and profitable e-commerce sales funnels."),
          pills: ["🎬 Fashion Video Shoots", "🌟 Influencer Buzz", "🛍️ E-Commerce Meta Ads", "💬 Discuss with Strategist"]
        };
      }

      // 18. Smart Warm Fallback
      if (lang === "ur_ro") {
        return {
          text: "Boht acha sawal hai" + uName + "! Is baray me mazeed specific maloomat share karne ke liye hamari creative & strategy team foran available hai.<br><br>Aapka requirement thora explain karein, ya direct hamare Senior Account Manager se WhatsApp per rabta karein:<br>📲 <a href=\"https://wa.me/" + WA + "?text=" + encodeURIComponent("Hi AdPulse, I have an inquiry: " + t) + "\" target=\"_blank\" rel=\"noopener\"><b>WhatsApp (+92 300 8463041)</b></a><br><br>Aap mujhse hamari <a href=\"/services/\">Services</a>, <a href=\"/portfolio/\">Portfolio</a>, <a href=\"/contact/\">Pricing</a> ya <a href=\"/about/\">Agency Background</a> ke baray me bhi pooch sakte hain.",
          pills: ["📺 Services List", "🎬 TV Commercials", "🏢 Billboards / OOH", "💰 Pricing Packages", "💬 WhatsApp Chat"]
        };
      } else if (lang === "ur") {
        return {
          text: "بہت شکریہ" + uName + "! آپ کی رہنمائی کے لیے ہماری ٹیم فوری حاضر ہے۔ آپ مزید تفصیلات کے لیے ہمارے سینئر اکاؤنٹ ڈائریکٹر سے براہ راست واٹس ایپ پر رابطہ کر سکتے ہیں:<br>📲 <a href=\"https://wa.me/" + WA + "?text=" + encodeURIComponent("السلام علیکم ایڈپلس، مجھے مزید معلومات درکار ہیں") + "\" target=\"_blank\" rel=\"noopener\"><b>واٹس ایپ رابطہ (+92 300 8463041)</b></a>",
          pills: ["📺 ہماری سروسز", "🎬 کمرشلز", "🏢 بل بورڈز", "💰 پرائسنگ", "💬 واٹس ایپ"]
        };
      } else {
        return {
          text: "Thank you for asking" + uName + "! To give you the most accurate and thoughtful answer tailored to your specific campaign goals, our senior strategy team is on standby.<br><br>Would you like to connect directly with our Account Director via WhatsApp?<br>📲 <a href=\"https://wa.me/" + WA + "?text=" + encodeURIComponent("Hi AdPulse, I would like to discuss: " + t) + "\" target=\"_blank\" rel=\"noopener\"><b>Chat on WhatsApp (+92 300 8463041)</b></a><br><br>Or feel free to ask me anything about our services, client portfolio, pricing, or office locations!",
          pills: ["📺 Our Services", "🎬 TVC Production", "🏢 Outdoor Billboards", "💰 Pricing & Quotes", "💬 WhatsApp Director"]
        };
      }
    }

    var LANG_SWITCH = [
      ["ur_ro", "🇵🇰 Roman Urdu"],
      ["ur", "🇵🇰 اردو"],
      ["en", "🇬🇧 English"],
      ["ar", "🇸🇦 العربية"],
      ["es", "🇪🇸 Español"]
    ];

    function handlePillClick(label) {
      say(label, "me");
      triggerBotReply(label);
    }

    function renderQuick(customPills) {
      quick.innerHTML = "";
      var pillsToShow = (customPills && customPills.length) ? customPills : getInitialGreeting().pills;
      pillsToShow.forEach(function (label) {
        var b = d.createElement("button");
        b.type = "button";
        b.textContent = label;
        b.addEventListener("click", function () {
          handlePillClick(label);
        });
        quick.appendChild(b);
      });

      LANG_SWITCH.filter(function (l) { return l[0] !== lang; }).forEach(function (l) {
        var b = d.createElement("button");
        b.type = "button";
        b.textContent = l[1];
        b.style.opacity = "0.75";
        b.addEventListener("click", function () {
          lang = l[0];
          say(l[1], "me");
          triggerBotReply(l[1]);
        });
        quick.appendChild(b);
      });
    }

    function triggerBotReply(userText) {
      var typing = showTyping();
      var delay = 450 + Math.floor(Math.random() * 250);
      setTimeout(function () {
        if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
        var res = answer(userText);
        var dir = (lang === "ur" || lang === "ar") ? "rtl" : "ltr";
        say(res.text, "bot", dir);
        renderQuick(res.pills);
      }, delay);
    }

    function toggle(v) {
      chat.classList.toggle("is-open", v);
      fab.setAttribute("aria-expanded", v ? "true" : "false");
      chat.setAttribute("aria-hidden", v ? "false" : "true");
      if (v && !greeted) {
        greeted = true;
        var typing = showTyping();
        setTimeout(function () {
          if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
          var initRes = getInitialGreeting();
          say(initRes.text, "bot", (lang === "ur" || lang === "ar") ? "rtl" : "ltr");
          renderQuick(initRes.pills);
        }, 400);
      }
      if (v) setTimeout(function () { input.focus(); }, 300);
    }

    fab.addEventListener("click", function () { toggle(!chat.classList.contains("is-open")); });
    q(".chat__close", chat).addEventListener("click", function () { toggle(false); fab.focus(); });

    q(".chat__form", chat).addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;
      say(v, "me");
      input.value = "";
      triggerBotReply(v);
    });
  }

  /* ---------- Misc ---------- */
  qa("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  if (hasGsap) w.addEventListener("load", function () { w.ScrollTrigger.refresh(); });
})();
