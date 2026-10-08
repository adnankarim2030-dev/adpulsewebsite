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

  /* hero headline: light chase on "Campaigns," + glitch pulses on "Impact." */
  qa(".hero h1, .page-hero h1").forEach(function (h) {
    var start = function () {
      qa(".outline", h).forEach(chase);
      var red = q(".red", h);
      if (red && !reduced) {
        var glitch = function () { red.classList.add("glitch"); setTimeout(function () { red.classList.remove("glitch"); }, 520); };
        setTimeout(glitch, 400); setInterval(function () { if (!d.hidden) glitch(); }, 5200);
        h.addEventListener("mouseenter", function () {
          var cs = qa(".ch", red), orig = cs.map(function (c) { return c.textContent; }), t0 = performance.now();
          (function f(now) { var k = Math.min(1, (now - t0) / 700); cs.forEach(function (c, i) { c.textContent = i / cs.length < k ? orig[i] : GLYPHS[(Math.random() * 26) | 0]; }); if (k < 1) requestAnimationFrame(f); })(t0);
        });
      }
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

  /* ---------- Home hero: service-wise 3D ---------- */
  var hero = q("#hero");
  if (hero) {
    var slides = qa(".hero__index button", hero), nameEl = q(".now__name", hero), subEl = q(".now__sub", hero), linkEl = q(".now__link", hero), chEl = q(".onair b", hero), bar = q(".now__progress i", hero);
    var ctrl = w.AdPulse3D ? w.AdPulse3D.mount(q(".hero__canvas", hero), { from: 0, offsetX: 2.6, mobileOffsetY: 1.7, rightPad: 190, cycle: false }) : null;
    var idx = 0, DUR = 8000, t0 = performance.now(), paused = false, pausedAt = 0;
    function show(i, user) {
      idx = (i + slides.length) % slides.length;
      var b = slides[idx];
      slides.forEach(function (s, k) { s.classList.toggle("is-active", k === idx); s.setAttribute("aria-selected", k === idx ? "true" : "false"); });
      var swap = function () {
        nameEl.textContent = b.dataset.name; subEl.textContent = b.dataset.sub; linkEl.href = b.dataset.href;
        linkEl.setAttribute("aria-label", "Learn more about " + b.dataset.name);
        if (chEl) chEl.textContent = "CH " + ("0" + (idx + 1)).slice(-2);
      };
      if (hasGsap && !reduced) {
        w.gsap.to([nameEl, subEl], { y: -14, opacity: 0, duration: 0.25, ease: "power2.in", onComplete: function () { swap(); w.gsap.fromTo([nameEl, subEl], { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.06 }); } });
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
    var ctrl = w.AdPulse3D.mount(c, { from: +c.dataset.scene, offsetX: +(c.dataset.offset || 2.4), scale: +(c.dataset.scale || 1), mobileOffsetY: 1.2 });
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

  /* ---------- Chatbot ---------- */
  var fab = q(".chat-fab"), chat = q(".chat");
  if (fab && chat) {
    var log = q(".chat__log", chat), quick = q(".chat__quick", chat), input = q(".chat__form input", chat), lang = "en";
    var SVC = [
      ["TVC Production", "/services/tvc-production/"], ["Outdoor Media", "/services/outdoor-media/"], ["Media Buying", "/services/media-buying/"], ["Corporate Events", "/services/corporate-events/"],
      ["PR & Promotion", "/services/pr-promotion/"], ["BTL Marketing", "/services/btl-marketing/"], ["Digital Marketing", "/services/digital-marketing/"], ["AI Video Ads", "/services/ai-video-ads/"]
    ];
    var svcList = SVC.map(function (s) { return '<a href="' + s[1] + '">' + s[0] + "</a>"; }).join(" · ");
    var T = {
      en: { dir: "ltr", hi: "Hello! I am AdPulse Assistant. How can I help you grow your brand today?", q: ["📺 Our Services", "💰 Pricing Packages", "📍 Office Location", "✉️ Contact Details"],
        svc: "We are a 360° agency. Our services: " + svcList, price: 'Every campaign is priced to your brief: media mix, cities, duration and production. Share your requirement and our team will send you a custom quote. <a href="/contact/">Request a quote</a> or WhatsApp <a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">+92 300 8463041</a>.',
        loc: 'Office #213, 2nd Floor, Pak Tower, Block 5 Clifton, Karachi. Open Monday–Saturday, 10:00 AM – 6:30 PM. <a href="https://maps.google.com/?q=Pak+Tower+Block+5+Clifton+Karachi" target="_blank" rel="noopener">Get directions</a>',
        con: 'Phone / WhatsApp: <a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">+92 300 8463041</a><br>Email: info@adpulse.pk',
        fb: 'Thanks for your message! For a detailed answer, our team is on WhatsApp: <a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">+92 300 8463041</a>. You can also ask me about services, pricing, location or contact.' },
      ur: { dir: "rtl", hi: "السلام علیکم! میں ایڈپلس اسسٹنٹ ہوں۔ آج میں آپ کے برانڈ کی ترقی میں کیسے مدد کر سکتا ہوں؟", q: ["📺 ہماری سروسز", "💰 پرائسنگ پیکجز", "📍 دفتر کا پتہ", "✉️ رابطہ"],
        svc: "ہم 360° ایجنسی ہیں۔ ہماری سروسز: " + svcList, price: 'ہر کیمپین کی قیمت آپ کی ضرورت کے مطابق طے ہوتی ہے: میڈیا مکس، شہر، مدت اور پروڈکشن۔ اپنی تفصیل بھیجیں، ہماری ٹیم آپ کو کسٹم کوٹ بھیجے گی۔ <a href="/contact/">کوٹ حاصل کریں</a> یا واٹس ایپ <a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">+92 300 8463041</a>',
        loc: 'آفس نمبر 213، دوسری منزل، پاک ٹاور، بلاک 5 کلفٹن، کراچی۔ <a href="https://maps.google.com/?q=Pak+Tower+Block+5+Clifton+Karachi" target="_blank" rel="noopener">گوگل میپس پر دیکھیں</a>',
        con: 'فون / واٹس ایپ: <a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">+92 300 8463041</a><br>ای میل: info@adpulse.pk',
        fb: 'آپ کے پیغام کا شکریہ! تفصیلی جواب کے لیے ہماری ٹیم سے واٹس ایپ پر رابطہ کریں: <a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">+92 300 8463041</a>' },
      ar: { dir: "rtl", hi: "مرحباً! أنا مساعد AdPulse. كيف يمكنني مساعدتك في تنمية علامتك التجارية اليوم؟", q: ["📺 خدماتنا", "💰 باقات الأسعار", "📍 موقع المكتب", "✉️ معلومات الاتصال"],
        svc: "نحن وكالة متكاملة 360°. خدماتنا: " + svcList, price: 'يتم تسعير كل حملة حسب احتياجك: مزيج الوسائط والمدن والمدة والإنتاج. شاركنا متطلباتك وسيرسل لك فريقنا عرض سعر مخصص. <a href="/contact/">اطلب عرض سعر</a> أو واتساب <a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">+92 300 8463041</a>',
        loc: 'مكتب رقم 213، الطابق الثاني، برج باك، بلوك 5 كليفتون، كراتشي. <a href="https://maps.google.com/?q=Pak+Tower+Block+5+Clifton+Karachi" target="_blank" rel="noopener">افتح في خرائط Google</a>',
        con: 'الهاتف / واتساب: <a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">+92 300 8463041</a><br>البريد الإلكتروني: info@adpulse.pk',
        fb: 'شكراً لرسالتك! للحصول على إجابة مفصلة تواصل مع فريقنا عبر واتساب: <a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">+92 300 8463041</a>' },
      es: { dir: "ltr", hi: "¡Hola! Soy el asistente de AdPulse. ¿Cómo puedo ayudarte a hacer crecer tu marca hoy?", q: ["📺 Servicios", "💰 Paquetes y precios", "📍 Ubicación", "✉️ Contacto"],
        svc: "Somos una agencia 360°. Nuestros servicios: " + svcList, price: 'Cada campaña se cotiza según tu brief: mezcla de medios, ciudades, duración y producción. Comparte tu requerimiento y nuestro equipo te enviará una cotización personalizada. <a href="/contact/">Solicitar cotización</a> o WhatsApp <a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">+92 300 8463041</a>',
        loc: 'Oficina #213, 2º piso, Pak Tower, Block 5 Clifton, Karachi. <a href="https://maps.google.com/?q=Pak+Tower+Block+5+Clifton+Karachi" target="_blank" rel="noopener">Abrir en Google Maps</a>',
        con: 'Teléfono / WhatsApp: <a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">+92 300 8463041</a><br>Email: info@adpulse.pk',
        fb: '¡Gracias por tu mensaje! Para una respuesta detallada escríbenos por WhatsApp: <a href="https://wa.me/' + WA + '" target="_blank" rel="noopener">+92 300 8463041</a>' }
    };
    var LANGS = [["ur", "🇵🇰 اردو"], ["ar", "🇸🇦 العربية"], ["es", "🇪🇸 Español"], ["en", "🇬🇧 English"]];
    function say(html, who) {
      var m = d.createElement("div"); m.className = "msg msg--" + (who || "bot");
      if (who === "me") m.textContent = html; else { m.innerHTML = html; m.setAttribute("dir", T[lang].dir); }
      log.appendChild(m); log.scrollTop = log.scrollHeight;
    }
    function renderQuick() {
      quick.innerHTML = "";
      var keys = ["svc", "price", "loc", "con"];
      T[lang].q.forEach(function (label, i) {
        var b = d.createElement("button"); b.type = "button"; b.textContent = label;
        b.addEventListener("click", function () { say(label, "me"); setTimeout(function () { say(T[lang][keys[i]]); }, 350); });
        quick.appendChild(b);
      });
      LANGS.filter(function (l) { return l[0] !== lang; }).forEach(function (l) {
        var b = d.createElement("button"); b.type = "button"; b.textContent = l[1];
        b.addEventListener("click", function () { lang = l[0]; say(l[1], "me"); setTimeout(function () { say(T[lang].hi); renderQuick(); }, 300); });
        quick.appendChild(b);
      });
    }
    function answer(txt) {
      var t = txt.toLowerCase();
      var hit = function (arr) { return arr.some(function (k) { return t.indexOf(k) > -1; }); };
      if (hit(["price", "pricing", "rate", "cost", "package", "budget", "qeemat", "kitna", "قیمت", "سعر", "precio"])) return T[lang].price;
      if (hit(["where", "location", "address", "office", "kahan", "map", "پتہ", "موقع", "ubicación", "direccion", "dirección"])) return T[lang].loc;
      if (hit(["contact", "phone", "number", "email", "whatsapp", "call", "رابطہ", "اتصال", "contacto"])) return T[lang].con;
      for (var i = 0; i < SVC.length; i++) {
        var keys = [["tvc", "commercial", "documentar", "film"], ["outdoor", "ooh", "billboard", "hoarding", "screen"], ["media buying", "print", "newspaper", "radio", "tv slot"], ["event", "launch", "stage", "dealer"], ["pr", "press", "public relation", "influencer"], ["btl", "activation", "sampling", "in-store"], ["digital", "social", "seo", "meta", "google ads", "website"], ["ai", "generative", "ai video"]][i];
        if (hit(keys)) return '<b>' + SVC[i][0] + '</b> — <a href="' + SVC[i][1] + '">see what’s included</a>. ' + (lang === "en" ? "Want a quote? " : "") + '<a href="/contact/">Request a quote</a>';
      }
      if (hit(["service", "what do you do", "سروس", "خدمات", "servicio"])) return T[lang].svc;
      if (hit(["hi", "hello", "salam", "aoa", "hey", "سلام", "مرحب", "hola"])) return T[lang].hi;
      return T[lang].fb;
    }
    var greeted = false;
    function toggle(v) {
      chat.classList.toggle("is-open", v); fab.setAttribute("aria-expanded", v ? "true" : "false"); chat.setAttribute("aria-hidden", v ? "false" : "true");
      if (v && !greeted) { greeted = true; say(T.en.hi); renderQuick(); }
      if (v) setTimeout(function () { input.focus(); }, 300);
    }
    fab.addEventListener("click", function () { toggle(!chat.classList.contains("is-open")); });
    q(".chat__close", chat).addEventListener("click", function () { toggle(false); fab.focus(); });
    q(".chat__form", chat).addEventListener("submit", function (e) {
      e.preventDefault(); var v = input.value.trim(); if (!v) return;
      say(v, "me"); input.value = "";
      setTimeout(function () { say(answer(v)); }, 450);
    });
  }

  /* ---------- Misc ---------- */
  qa("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  if (hasGsap) w.addEventListener("load", function () { w.ScrollTrigger.refresh(); });
})();
