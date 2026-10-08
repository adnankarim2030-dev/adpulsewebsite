/* AdPulse IMC — particle 3D engine (Three.js r128)
   One points cloud that morphs between 9 procedural scenes:
   0 TVC cinema camera rig · 1 billboard · 2 media orbit · 3 event stage · 4 megaphone
   5 BTL activation booth · 6 digital phone + growth · 7 AI core · 8 pulse ring */
(function () {
  "use strict";
  if (!window.THREE) return;
  var THREE = window.THREE;

  var COL = {
    R: [0.93, 0.05, 0.02], r: [0.45, 0.03, 0.02],
    G: [0.02, 0.78, 0.38], g: [0.01, 0.34, 0.18],
    W: [1, 1, 1], w: [0.42, 0.46, 0.44]
  };

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function Sampler(n) {
    this.n = n; this.i = 0;
    this.p = new Float32Array(n * 3);
    this.c = new Float32Array(n * 3);
    this.tf = null;
  }
  Sampler.prototype.add = function (x, y, z, col) {
    if (this.i >= this.n) return;
    if (this.tf) { var t = this.tf(x, y, z); x = t[0]; y = t[1]; z = t[2]; }
    var k = this.i * 3, c = COL[col] || col;
    this.p[k] = x; this.p[k + 1] = y; this.p[k + 2] = z;
    this.c[k] = c[0]; this.c[k + 1] = c[1]; this.c[k + 2] = c[2];
    this.i++;
  };
  Sampler.prototype.pick = function (cols) { return cols[(Math.random() * cols.length) | 0]; };
  Sampler.prototype.line = function (a, b, count, cols, jit) {
    jit = jit || 0;
    for (var i = 0; i < count; i++) {
      var t = Math.random();
      this.add(a[0] + (b[0] - a[0]) * t + rnd(-jit, jit), a[1] + (b[1] - a[1]) * t + rnd(-jit, jit), a[2] + (b[2] - a[2]) * t + rnd(-jit, jit), this.pick(cols));
    }
  };
  Sampler.prototype.boxEdges = function (cx, cy, cz, w, h, d, count, cols) {
    var x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2, z0 = cz - d / 2, z1 = cz + d / 2;
    var E = [
      [[x0, y0, z0], [x1, y0, z0]], [[x0, y1, z0], [x1, y1, z0]], [[x0, y0, z1], [x1, y0, z1]], [[x0, y1, z1], [x1, y1, z1]],
      [[x0, y0, z0], [x0, y1, z0]], [[x1, y0, z0], [x1, y1, z0]], [[x0, y0, z1], [x0, y1, z1]], [[x1, y0, z1], [x1, y1, z1]],
      [[x0, y0, z0], [x0, y0, z1]], [[x1, y0, z0], [x1, y0, z1]], [[x0, y1, z0], [x0, y1, z1]], [[x1, y1, z0], [x1, y1, z1]]
    ];
    var lens = E.map(function (e) { return Math.hypot(e[1][0] - e[0][0], e[1][1] - e[0][1], e[1][2] - e[0][2]); });
    var tot = lens.reduce(function (a, b) { return a + b; }, 0);
    for (var i = 0; i < E.length; i++) this.line(E[i][0], E[i][1], Math.round(count * lens[i] / tot), cols, 0.008);
  };
  Sampler.prototype.boxSurf = function (cx, cy, cz, w, h, d, count, cols) {
    var A = [w * h, w * h, h * d, h * d, w * d, w * d], tot = A.reduce(function (a, b) { return a + b; }, 0);
    for (var i = 0; i < count; i++) {
      var r = Math.random() * tot, f = 0; while (r > A[f]) { r -= A[f]; f++; }
      var u = rnd(-.5, .5), v = rnd(-.5, .5), x, y, z;
      if (f < 2) { x = u * w; y = v * h; z = (f ? .5 : -.5) * d; }
      else if (f < 4) { z = u * d; y = v * h; x = (f === 3 ? .5 : -.5) * w; }
      else { x = u * w; z = v * d; y = (f === 5 ? .5 : -.5) * h; }
      this.add(cx + x, cy + y, cz + z, this.pick(cols));
    }
  };
  // ring in a plane defined by axis: 'x' | 'y' | 'z' (normal)
  Sampler.prototype.ring = function (cx, cy, cz, R, axis, count, cols, jit, arc0, arc1) {
    jit = jit || 0; arc0 = arc0 || 0; arc1 = arc1 === undefined ? Math.PI * 2 : arc1;
    for (var i = 0; i < count; i++) {
      var a = rnd(arc0, arc1), rr = R + rnd(-jit, jit), u = Math.cos(a) * rr, v = Math.sin(a) * rr, x, y, z;
      if (axis === "z") { x = u; y = v; z = rnd(-jit, jit); }
      else if (axis === "x") { x = rnd(-jit, jit); y = v; z = u; }
      else { x = u; y = rnd(-jit, jit); z = v; }
      this.add(cx + x, cy + y, cz + z, this.pick(cols));
    }
  };
  Sampler.prototype.disc = function (cx, cy, cz, R, axis, count, cols) {
    for (var i = 0; i < count; i++) {
      var a = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * R, u = Math.cos(a) * rr, v = Math.sin(a) * rr;
      if (axis === "z") this.add(cx + u, cy + v, cz, this.pick(cols));
      else if (axis === "x") this.add(cx, cy + v, cz + u, this.pick(cols));
      else this.add(cx + u, cy, cz + v, this.pick(cols));
    }
  };
  // cylinder / frustum along x axis
  Sampler.prototype.tubeX = function (x0, x1, r0, r1, cy, cz, count, cols) {
    for (var i = 0; i < count; i++) {
      var t = Math.random(), r = r0 + (r1 - r0) * t, a = Math.random() * Math.PI * 2;
      this.add(x0 + (x1 - x0) * t, cy + Math.sin(a) * r, cz + Math.cos(a) * r, this.pick(cols));
    }
  };
  Sampler.prototype.sphere = function (cx, cy, cz, R, count, cols, shell) {
    for (var i = 0; i < count; i++) {
      var u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u);
      var rr = shell ? R : R * Math.cbrt(Math.random());
      this.add(cx + s * Math.cos(a) * rr, cy + u * rr, cz + s * Math.sin(a) * rr, this.pick(cols));
    }
  };
  Sampler.prototype.rectOutline = function (cx, cy, cz, w, h, count, cols) {
    var x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2, per = 2 * (w + h);
    this.line([x0, y0, cz], [x1, y0, cz], Math.round(count * w / per), cols, 0.006);
    this.line([x0, y1, cz], [x1, y1, cz], Math.round(count * w / per), cols, 0.006);
    this.line([x0, y0, cz], [x0, y1, cz], Math.round(count * h / per), cols, 0.006);
    this.line([x1, y0, cz], [x1, y1, cz], Math.round(count * h / per), cols, 0.006);
  };
  Sampler.prototype.dust = function () {
    while (this.i < this.n) {
      this.tf = null;
      var u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u), r = rnd(5.5, 11);
      this.add(s * Math.cos(a) * r, u * r * 0.6, s * Math.sin(a) * r - 3, this.pick(["w", "w", "r", "g"]));
    }
  };

  function rotX(a) { var c = Math.cos(a), s = Math.sin(a); return function (x, y, z) { return [x, y * c - z * s, y * s + z * c]; }; }
  function rotY(a) { var c = Math.cos(a), s = Math.sin(a); return function (x, y, z) { return [x * c + z * s, y, -x * s + z * c]; }; }
  function compose(f, g) { return function (x, y, z) { var t = g(x, y, z); return f(t[0], t[1], t[2]); }; }

  // ---------------- Scenes ----------------
  var SCENES = [];

  // 0 · TVC — modern large-format cinema camera rig on a fluid-head tripod
  //     (body, cine prime with gear rings, matte box + flag, follow focus, rods,
  //      top handle, side monitor, EVF, V-mount battery, tally light, lens beam)
  SCENES.push(function (s) {
    var base = compose(rotY(0.62), rotX(-0.14));
    s.tf = function (x, y, z) { return base(x, y + 0.35, z); };
    function gear(x, r, n, teeth, col) {            // lens gear ring with teeth (axis = x)
      for (var i = 0; i < n; i++) { var a = Math.random() * Math.PI * 2, t = Math.floor(a / (Math.PI * 2) * teeth) % 2 ? 0.05 : 0;
        s.add(x + (Math.random() - .5) * 0.07, Math.sin(a) * (r + t), Math.cos(a) * (r + t), col); }
    }
    // camera body
    s.boxEdges(0.3, 0, 0, 1.55, 1.25, 1.05, 900, ["W"]);
    s.boxSurf(0.3, 0, 0, 1.55, 1.25, 1.05, 1500, ["w", "w", "W"]);
    s.boxEdges(0.3, -0.2, 0, 1.25, 0.5, 1.07, 220, ["w"]);                      // body panel line
    s.rectOutline(0.45, 0.12, 0.53, 0.62, 0.42, 160, ["G"]);                     // side status display
    s.tf = function (x, y, z) { return base(x, y + 0.35, z); };
    for (var i = 0; i < 260; i++) s.add(0.45 + (Math.random() - .5) * 0.58, 0.12 + (Math.random() - .5) * 0.38, 0.53, "g");
    [[-0.05, -0.3], [0.1, -0.3], [0.25, -0.3], [0.8, 0.3]].forEach(function (b, k) {          // buttons + record
      s.sphere(b[0], b[1], 0.54, k === 3 ? 0.07 : 0.035, k === 3 ? 60 : 20, [k === 3 ? "R" : "W"], true); });
    // lens mount + cine prime
    s.tubeX(-0.45, -0.55, 0.5, 0.5, 0, 0, 260, ["W"]);
    s.tubeX(-0.55, -1.75, 0.4, 0.44, 0, 0, 1400, ["w", "w", "W"]);
    gear(-0.85, 0.44, 420, 70, "W"); gear(-1.2, 0.46, 420, 70, "W"); gear(-1.5, 0.46, 380, 70, "G");
    s.ring(-1.76, 0, 0, 0.44, "x", 200, ["W"], 0.01);
    s.disc(-1.78, 0, 0, 0.36, "x", 520, ["G", "g", "W"]);                            // front glass
    s.ring(-1.79, 0, 0, 0.2, "x", 90, ["W"], 0.01);
    // matte box + top flag
    var m0 = -1.85, m1 = -2.45, h0 = 0.62, w0 = 0.72, h1 = 0.95, w1 = 1.3;
    [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (c) { s.line([m0, c[0] * h0 / 2, c[1] * w0 / 2], [m1, c[0] * h1 / 2, c[1] * w1 / 2], 110, ["W"]); });
    s.tf = function (x, y, z) { return base(x, y + 0.35, z); };
    for (var j = 0; j < 2; j++) { var mx = j ? m1 : m0, hh = j ? h1 : h0, ww = j ? w1 : w0;
      s.line([mx, hh / 2, -ww / 2], [mx, hh / 2, ww / 2], 120, ["W"]); s.line([mx, -hh / 2, -ww / 2], [mx, -hh / 2, ww / 2], 120, ["W"]);
      s.line([mx, -hh / 2, -ww / 2], [mx, hh / 2, -ww / 2], 90, ["W"]); s.line([mx, -hh / 2, ww / 2], [mx, hh / 2, ww / 2], 90, ["W"]); }
    for (var k = 0; k < 600; k++) { var t = Math.random(), u = Math.random() - 0.5;               // matte box side panels
      var x = m0 + (m1 - m0) * t, hh2 = h0 + (h1 - h0) * t, ww2 = w0 + (w1 - w0) * t, side = k % 4;
      if (side === 0) s.add(x, hh2 / 2, u * ww2, "w"); else if (side === 1) s.add(x, -hh2 / 2, u * ww2, "w");
      else if (side === 2) s.add(x, u * hh2, ww2 / 2, "w"); else s.add(x, u * hh2, -ww2 / 2, "w"); }
    for (var f = 0; f < 420; f++) s.add(m1 + (Math.random()) * -0.55, h1 / 2 + 0.02, (Math.random() - 0.5) * w1, "R");   // top flag
    // rods, bridge plate, follow focus
    [-0.26, 0.26].forEach(function (z) { s.line([-2.2, -0.82, z], [1.25, -0.82, z], 360, ["W"], 0.012); });
    s.boxEdges(0.3, -0.72, 0, 1.4, 0.16, 0.9, 260, ["w"]);
    s.boxEdges(-1.2, -0.62, 0.36, 0.28, 0.34, 0.22, 140, ["W"]);
    s.ring(-1.2, -0.62, 0.48, 0.13, "z", 90, ["R"], 0.01);                        // follow-focus wheel
    // top handle
    s.line([-0.35, 0.95, 0], [1.0, 0.95, 0], 260, ["W"], 0.02);
    s.line([-0.2, 0.62, 0], [-0.2, 0.95, 0], 60, ["W"]); s.line([0.85, 0.62, 0], [0.85, 0.95, 0], 60, ["W"]);
    s.sphere(-0.3, 0.75, -0.2, 0.05, 40, ["R"], true);                              // tally light
    // on-board monitor (left) + EVF (right)
    s.line([0.1, 0.95, -0.1], [0.1, 1.2, -0.6], 60, ["W"]);
    for (var q = 0; q < 700; q++) { var mzz = (Math.random() - .5) * 0.9, myy = (Math.random() - .5) * 0.56, edge = Math.abs(mzz) > 0.42 || Math.abs(myy) > 0.26;
      s.add(0.1 + (Math.random() - .5) * 0.05, 1.35 + myy, -0.95 + mzz, edge ? "W" : (myy > 0.05 ? "g" : "G")); }
    s.line([-0.25, 0.66, 0.4], [-0.25, 0.85, 0.85], 50, ["W"]);
    s.tubeX(-0.05, -0.6, 0.12, 0.14, 0.88, 0.95, 260, ["W", "w"]);
    s.disc(-0.02, 0.88, 0.95, 0.13, "x", 80, ["w"]);
    // V-mount battery on the back
    s.boxEdges(1.2, -0.05, 0, 0.3, 0.95, 0.7, 260, ["R"]);
    s.boxSurf(1.2, -0.05, 0, 0.3, 0.95, 0.7, 420, ["R", "r"]);
    for (var c2 = 0; c2 < 4; c2++) s.sphere(1.36, 0.25 - c2 * 0.08, 0.2, 0.02, 10, [c2 < 3 ? "G" : "w"], true);   // charge LEDs
    // fluid head + tripod
    s.boxEdges(0.3, -1.1, 0, 0.9, 0.45, 0.7, 240, ["W"]);
    s.sphere(0.3, -1.45, 0, 0.3, 260, ["w"], true);
    s.line([0.9, -1.1, 0.35], [2.0, -0.95, 0.9], 90, ["W"]);                        // pan bar
    [[0, 1.3], [2.1, 1.3], [4.2, 1.3]].forEach(function (lg) {
      var ang = lg[0], rr = lg[1];
      s.line([0.3, -1.6, 0], [0.3 + Math.cos(ang) * rr, -3.0, Math.sin(ang) * rr], 220, ["W", "w"], 0.015);
      s.line([0.3 + Math.cos(ang) * rr * 0.45, -2.25, Math.sin(ang) * rr * 0.45], [0.3, -2.4, 0], 60, ["w"]);
    });
    // lens beam — the shot being framed
    for (var bm = 0; bm < 900; bm++) { var tt = Math.pow(Math.random(), 0.8), sp = 0.3 + tt * 1.3, aa = Math.random() * Math.PI * 2;
      s.add(-2.5 - tt * 2.2, Math.sin(aa) * sp * 0.56 * Math.sqrt(Math.random()), Math.cos(aa) * sp * Math.sqrt(Math.random()), tt < 0.35 ? "W" : (Math.random() < 0.5 ? "g" : "r")); }
  });

  // 1 · Billboard over skyline
  SCENES.push(function (s) {
    s.tf = compose(rotY(-0.38), rotX(0.05));
    var W = 4.4, H = 2.2, cy = 0.75;
    s.boxEdges(0, cy, 0, W, H, 0.16, 900, ["W"]);
    for (var i = 0; i < 1700; i++) {
      var u = rnd(-.5, .5), v = rnd(-.5, .5), x = u * W, y = cy + v * H;
      var diag = u + v * 0.55;
      var col = diag < -0.08 ? "R" : diag > 0.12 ? "G" : "W";
      if (Math.abs(diag + 0.0) < 0.05) col = "W";
      s.add(x, y, 0.09, Math.random() < 0.18 ? "w" : col);
    }
    // lights
    [-1.4, 0, 1.4].forEach(function (lx) {
      s.line([lx, cy + H / 2 + 0.35, 0.5], [lx, cy + H / 2, 0.1], 30, ["W"]);
      for (var i = 0; i < 90; i++) { var t = Math.random(); s.add(lx + rnd(-0.5, 0.5) * t, cy + H / 2 + 0.35 - t * 0.9, 0.5 - t * 0.2, "w"); }
    });
    // structure
    s.line([-1, cy - H / 2, 0], [-1, -2.6, 0], 260, ["W", "w"], 0.04);
    s.line([1, cy - H / 2, 0], [1, -2.6, 0], 260, ["W", "w"], 0.04);
    s.line([-W / 2, cy - H / 2 - 0.12, 0.3], [W / 2, cy - H / 2 - 0.12, 0.3], 160, ["G"]);
    // skyline
    var bx = -4.4;
    while (bx < 4.4) {
      var bw = rnd(0.35, 0.8), bh = rnd(0.5, 2.1);
      s.boxEdges(bx + bw / 2, -2.6 + bh / 2, -1.6, bw, bh, 0.5, Math.round(70 * bh), ["w", "w", "g"]);
      for (var wi = 0; wi < bh * 10; wi++) s.add(bx + rnd(0.05, bw - 0.05), -2.6 + rnd(0.1, bh - 0.05), -1.34, Math.random() < 0.3 ? "R" : "w");
      bx += bw + rnd(0.03, 0.16);
    }
  });

  // 2 · Media buying orbit
  SCENES.push(function (s) {
    s.tf = rotX(0.18);
    s.sphere(0, 0, 0, 1.0, 1300, ["W", "w", "R"], true);
    s.sphere(0, 0, 0, 0.6, 200, ["R", "r"]);
    var tilts = [rotX(1.2), compose(rotX(1.35), rotY(0.6)), compose(rotX(0.9), rotY(-0.7))];
    var radii = [1.9, 2.5, 3.1], colors = [["G", "g"], ["R", "r"], ["W", "w"]];
    for (var k = 0; k < 3; k++) {
      s.tf = compose(rotX(0.18), tilts[k]);
      s.ring(0, 0, 0, radii[k], "z", 520, colors[k], 0.015);
    }
    // devices placed around the sphere (clear silhouettes)
    s.tf = rotY(0.15);
    // TV
    s.rectOutline(-2.6, 1.3, 0.4, 1.2, 0.78, 260, ["W"]);
    for (var i = 0; i < 160; i++) s.add(-2.6 + rnd(-.55, .55), 1.3 + rnd(-.34, .34), 0.4, Math.random() < 0.5 ? "r" : "R");
    s.line([-2.6, 0.91, 0.4], [-2.85, 0.65, 0.4], 30, ["W"]); s.line([-2.6, 0.91, 0.4], [-2.35, 0.65, 0.4], 30, ["W"]);
    // Newspaper
    s.rectOutline(2.55, 1.15, 0.2, 1.05, 1.3, 220, ["W"]);
    for (var l = 0; l < 6; l++) s.line([2.1, 1.6 - l * 0.18, 0.2], [2.1 + (l === 0 ? 0.9 : rnd(0.5, 0.9)), 1.6 - l * 0.18, 0.2], l === 0 ? 70 : 34, [l === 0 ? "G" : "w"]);
    // Phone
    s.rectOutline(2.35, -1.45, 0.5, 0.62, 1.15, 200, ["G"]);
    for (var p = 0; p < 90; p++) s.add(2.35 + rnd(-.25, .25), -1.45 + rnd(-.48, .48), 0.5, "g");
    // Radio
    s.rectOutline(-2.35, -1.4, 0.3, 1.1, 0.7, 200, ["R"]);
    s.ring(-2.6, -1.4, 0.3, 0.22, "z", 90, ["W"], 0.01);
    s.line([-2.25, -1.25, 0.3], [-1.9, -1.25, 0.3], 30, ["W"]);
    s.line([-2.25, -1.4, 0.3], [-1.9, -1.4, 0.3], 30, ["W"]);
    s.line([-2.0, -1.05, 0.3], [-1.75, -0.6, 0.3], 30, ["W"]);
  });

  // 3 · Corporate event stage
  SCENES.push(function (s) {
    s.tf = compose(rotY(-0.3), rotX(0.22));
    s.boxEdges(0, -1.55, 0, 5.2, 0.45, 2.2, 700, ["W", "w"]);
    s.boxSurf(0, -1.32, 0, 5.2, 0.02, 2.2, 400, ["w", "g"]);
    // truss
    s.line([-2.5, -1.3, -0.95], [-2.5, 2.0, -0.95], 220, ["W"]);
    s.line([2.5, -1.3, -0.95], [2.5, 2.0, -0.95], 220, ["W"]);
    s.line([-2.5, 2.0, -0.95], [2.5, 2.0, -0.95], 320, ["W"]);
    s.line([-2.5, 1.8, -0.95], [2.5, 1.8, -0.95], 260, ["w"]);
    for (var z = 0; z < 20; z++) s.line([-2.5 + z * 0.25, 1.8, -0.95], [-2.25 + z * 0.25, 2.0, -0.95], 10, ["w"]);
    // LED wall
    for (var i = 0; i < 1300; i++) {
      var u = rnd(-.5, .5), v = rnd(-.5, .5);
      var band = Math.sin((u * 3 + v * 1.4) * Math.PI);
      s.add(u * 4.0, 0.25 + v * 2.2, -1.0, band > 0.35 ? "R" : band < -0.35 ? "G" : "w");
    }
    // spotlights
    [[-1.8, "R"], [-0.6, "G"], [0.6, "R"], [1.8, "G"]].forEach(function (sp) {
      var tx = sp[0] * 0.5;
      for (var k = 0; k < 230; k++) {
        var t = Math.pow(Math.random(), 0.7), r = t * 0.55, a = Math.random() * Math.PI * 2;
        s.add(sp[0] + (tx - sp[0]) * t + Math.cos(a) * r, 1.95 - t * 3.2, -0.9 + t * 1.2 + Math.sin(a) * r * 0.5, Math.random() < 0.3 ? "W" : sp[1]);
      }
    });
    // audience
    for (var ax = 0; ax < 12; ax++) for (var az = 0; az < 4; az++) {
      s.sphere(-2.75 + ax * 0.5 + (az % 2) * 0.25, -2.05, 1.6 + az * 0.42, 0.09, 8, ["w", "W"], true);
    }
    // confetti
    for (var c = 0; c < 260; c++) s.add(rnd(-3, 3), rnd(-0.5, 2.8), rnd(-0.5, 1.8), s.pick(["R", "G", "W"]));
  });

  // 4 · PR megaphone with sound waves
  SCENES.push(function (s) {
    s.tf = compose(rotY(-0.45), rotX(0.08));
    s.tubeX(-1.6, 0.9, 0.36, 1.12, 0.1, 0, 1500, ["R", "R", "r", "W"]);
    s.ring(0.9, 0.1, 0, 1.12, "x", 320, ["W"], 0.02);
    s.ring(-1.6, 0.1, 0, 0.36, "x", 90, ["W"], 0.01);
    s.tubeX(-2.3, -1.6, 0.22, 0.26, 0.1, 0, 260, ["W", "w"]);
    s.boxEdges(-1.0, -0.75, 0, 0.26, 0.9, 0.3, 200, ["W"]);
    s.boxEdges(-1.25, -0.35, 0, 0.32, 0.18, 0.28, 60, ["G"]);
    for (var w = 0; w < 4; w++) {
      var x = 1.55 + w * 0.62, R = 1.15 + w * 0.42;
      s.ring(x, 0.1, 0, R, "x", 360 - w * 30, w % 2 ? ["W", "w"] : ["G", "G", "g"], 0.02, -1.25, 1.25);
      s.ring(x, 0.1, 0, R, "x", 180 - w * 20, w % 2 ? ["W", "w"] : ["G", "g"], 0.02, Math.PI - 1.25, Math.PI + 1.25);
    }
  });

  // 5 · BTL — brand activation: striped canopy booth, branded counter, product pyramid, roll-up banners, balloon arch, crowd
  SCENES.push(function (s) {
    var SC = 0.86, base = compose(rotY(-0.38), rotX(0.14));
    s.tf = function (x, y, z) { return base(x * SC, y * SC + 0.15, z * SC); };
    var FL = -2.0;
    // canopy
    var cw = 1.55, cd = 1.0, ch = 1.2, peak = 2.1;
    [[-cw, -cd], [cw, -cd], [-cw, cd], [cw, cd]].forEach(function (c) { s.line([c[0], FL, c[1]], [c[0], ch, c[1]], 160, ["W"], 0.01); });
    var corners = [[-cw, ch, -cd], [cw, ch, -cd], [cw, ch, cd], [-cw, ch, cd]];
    for (var e = 0; e < 4; e++) {
      var A = corners[e], B = corners[(e + 1) % 4];
      s.line(A, B, 160, ["W"], 0.01); s.line(A, [0, peak, 0], 130, ["W"], 0.01);
      for (var i = 0; i < 900; i++) {
        var u = Math.random(), v = Math.random(); if (u + v > 1) { u = 1 - u; v = 1 - v; }
        var x = A[0] + (B[0] - A[0]) * u - A[0] * v, y = A[1] + (B[1] - A[1]) * u + (peak - A[1]) * v, z = A[2] + (B[2] - A[2]) * u - A[2] * v;
        var stripe = Math.floor((u + v * 0.5) * 7) % 2;
        s.add(x, y, z, stripe ? "R" : "W");
      }
      for (var sc = 0; sc < 7; sc++) for (var k = 0; k < 40; k++) {
        var t = (sc + k / 39) / 7, dip = Math.sin(k / 39 * Math.PI) * 0.2;
        s.add(A[0] + (B[0] - A[0]) * t, ch - dip, A[2] + (B[2] - A[2]) * t, sc % 2 ? "R" : "W");
      }
    }
    // branded counter: red top band, white logo band, green base
    s.boxEdges(0, FL + 0.55, 0.2, 2.3, 1.1, 0.7, 700, ["W"]);
    for (var f = 0; f < 2200; f++) { var fx = Math.random() * 2.3 - 1.15, fy = Math.random() * 1.1;
      s.add(fx, FL + fy, 0.55, fy > 0.72 ? "R" : fy > 0.46 ? "W" : "G"); }
    s.boxSurf(0, FL + 1.1, 0.2, 2.3, 0.02, 0.7, 400, ["w"]);
    // product pyramid on the counter
    var BW = 0.32;
    [[-0.33, 0], [0, 0], [0.33, 0], [-0.165, 1], [0.165, 1], [0, 2]].forEach(function (pp) {
      var cy = FL + 1.1 + BW / 2 + pp[1] * BW;
      s.boxEdges(pp[0], cy, 0.2, BW - 0.03, BW - 0.03, BW - 0.03, 150, [pp[1] === 2 ? "R" : "W"]);
      s.boxSurf(pp[0], cy, 0.2, BW - 0.05, BW - 0.05, BW - 0.05, 160, [pp[1] === 2 ? "R" : "G"]);
    });
    // roll-up banners
    [[-2.35, "R"], [2.35, "G"]].forEach(function (b) {
      var bx = b[0], bw = 0.7, bh = 2.4, y0 = FL + 0.1;
      s.rectOutline(bx, y0 + bh / 2, 0.3, bw, bh, 420, ["W"]);
      for (var i = 0; i < 1500; i++) { var yy = Math.random() * bh; s.add(bx + (Math.random() - .5) * bw, y0 + yy, 0.3, yy > bh * 0.74 ? "W" : b[1]); }
      s.boxEdges(bx, FL + 0.05, 0.3, bw + 0.12, 0.1, 0.34, 120, ["W"]);
    });
    // balloon arch framing the booth
    var R = 2.9, N = 30;
    for (var bl = 0; bl <= N; bl++) {
      var ang = Math.PI * bl / N;
      s.sphere(-Math.cos(ang) * R, FL + Math.sin(ang) * R * 1.3, 1.25, 0.2, 120, [["R", "W", "G"][bl % 3]], true);
    }
    // crowd in front
    [[-1.3, 2.1], [-0.45, 2.4], [0.45, 2.3], [1.3, 2.1]].forEach(function (pp, i) {
      var col = "W", X = pp[0], Z = pp[1];
      s.sphere(X, FL + 1.12, Z, 0.15, 110, [col], true);
      s.line([X, FL + 0.95, Z], [X, FL + 0.38, Z], 90, [col], 0.02);
      s.line([X, FL + 0.38, Z], [X - 0.14, FL, Z], 50, [col]);
      s.line([X, FL + 0.38, Z], [X + 0.14, FL, Z], 50, [col]);
      s.line([X, FL + 0.82, Z], [X - 0.24, FL + 0.5, Z], 45, [col]);
      s.line([X, FL + 0.82, Z], [X + 0.26, FL + 1.15, Z], 45, [i % 2 ? "G" : "R"]);   // hand raised
    });
    // floor spotlight
    s.ring(0, FL, 0.9, 3.3, "y", 700, ["g", "G"], 0.03);
    s.ring(0, FL, 0.9, 2.2, "y", 450, ["r", "R"], 0.03);
  });

  // 6 · Digital — phone + growth chart
  SCENES.push(function (s) {
    s.tf = compose(rotY(-0.42), rotX(0.06));
    var px = -1.1, py = 0.05;
    s.rectOutline(px, py, 0, 1.7, 3.3, 700, ["W"]);
    s.rectOutline(px, py, 0, 1.52, 3.0, 380, ["w"]);
    s.line([px - 0.25, py + 1.43, 0], [px + 0.25, py + 1.43, 0], 30, ["W"]);
    // post cards on screen
    [[0.85, "R"], [0.0, "G"], [-0.85, "R"]].forEach(function (c) {
      s.rectOutline(px, py + c[0], 0.02, 1.3, 0.7, 150, [c[1]]);
      for (var i = 0; i < 90; i++) s.add(px - 0.55 + Math.random() * 0.45, py + c[0] + rnd(-0.28, 0.28), 0.02, c[1] === "R" ? "r" : "g");
      s.line([px + 0.0, py + c[0] + 0.15, 0.02], [px + 0.5, py + c[0] + 0.15, 0.02], 18, ["W"]);
      s.line([px + 0.0, py + c[0], 0.02], [px + 0.4, py + c[0], 0.02], 14, ["w"]);
    });
    // bars
    var hs = [0.7, 1.15, 1.65, 2.25, 3.0];
    hs.forEach(function (h, i) {
      var bx = 0.75 + i * 0.52;
      s.boxEdges(bx, -1.7 + h / 2, 0.2, 0.34, h, 0.34, Math.round(90 + h * 60), ["G", "G", "g"]);
      s.boxSurf(bx, -1.7 + h, 0.2, 0.34, 0.02, 0.34, 40, ["R"]);
    });
    s.line([0.35, -1.7, 0.2], [3.3, -1.7, 0.2], 140, ["w"]);
    // trend arrow
    s.line([0.45, -1.0, 0.7], [3.1, 1.85, 0.7], 320, ["R"], 0.02);
    s.line([3.1, 1.85, 0.7], [2.7, 1.8, 0.7], 50, ["R"]);
    s.line([3.1, 1.85, 0.7], [3.05, 1.45, 0.7], 50, ["R"]);
    // floating reactions
    s.ring(1.2, 1.7, 0.5, 0.2, "z", 70, ["W"], 0.01);
    s.ring(0.2, 2.25, 0.3, 0.14, "z", 50, ["G"], 0.01);
    s.ring(2.3, 2.5, 0.2, 0.17, "z", 60, ["W"], 0.01);
  });

  // 7 · AI core + network + generated frames
  SCENES.push(function (s) {
    s.tf = rotY(0.2);
    var geo = new THREE.IcosahedronGeometry(1.15, 1);
    var pos = geo.attributes.position, seen = {};
    for (var i = 0; i < pos.count; i += 3) {
      for (var e = 0; e < 3; e++) {
        var a = i + e, b = i + (e + 1) % 3;
        var A = [pos.getX(a), pos.getY(a), pos.getZ(a)], B = [pos.getX(b), pos.getY(b), pos.getZ(b)];
        var key = [A, B].map(function (v) { return v.map(function (n) { return n.toFixed(2); }).join(","); }).sort().join("|");
        if (seen[key]) continue; seen[key] = 1;
        s.line(A, B, 12, ["R", "R", "W"], 0.004);
      }
    }
    geo.dispose();
    s.sphere(0, 0, 0, 0.55, 260, ["G", "W"]);
    var nodes = [];
    for (var L = 0; L < 2; L++) for (var k = 0; k < 5; k++) nodes.push([L ? 3.0 : -3.0, -1.8 + k * 0.9, rnd(-0.6, 0.6)]);
    nodes.forEach(function (n) {
      s.sphere(n[0], n[1], n[2], 0.1, 36, ["W"], true);
      var len = Math.hypot(n[0], n[1], n[2]), t = 1.15 / len;
      s.line(n, [n[0] * t, n[1] * t, n[2] * t], 46, ["g", "G"]);
    });
    for (var f = 0; f < 4; f++) {
      var ang = f / 4 * Math.PI * 2 + 0.5, cx = Math.cos(ang) * 2.1, cz = Math.sin(ang) * 1.2 - 0.3, cy = f % 2 ? 1.75 : -1.75;
      s.rectOutline(cx, cy, cz, 1.0, 0.58, 170, [f % 2 ? "W" : "R"]);
      s.line([cx - 0.08, cy - 0.12, cz], [cx - 0.08, cy + 0.12, cz], 12, ["G"]);
      s.line([cx - 0.08, cy + 0.12, cz], [cx + 0.14, cy, cz], 12, ["G"]);
      s.line([cx - 0.08, cy - 0.12, cz], [cx + 0.14, cy, cz], 12, ["G"]);
    }
  });

  // 8 · Pulse ring (brand)
  SCENES.push(function (s) {
    s.tf = rotX(0.25);
    for (var i = 0; i < 2600; i++) {
      var a = Math.random() * Math.PI * 2, seg = (a / (Math.PI * 2)) * 8 % 1;
      var spike = seg > 0.42 && seg < 0.58 ? Math.sin((seg - 0.42) / 0.16 * Math.PI * 2) * 0.55 : 0;
      var R = 2.3 + spike + rnd(-0.03, 0.03);
      s.add(Math.cos(a) * R, Math.sin(a) * R, rnd(-0.05, 0.05), spike > 0.1 ? "R" : spike < -0.1 ? "G" : Math.random() < 0.5 ? "W" : "w");
    }
    s.sphere(0, 0, 0, 1.25, 1300, ["w", "W", "R"], true);
    s.ring(0, 0, 0, 3.1, "y", 500, ["g", "G"], 0.02);
    s.ring(0, 0, 0, 3.5, "z", 400, ["r"], 0.02);
  });

  /* Draw each scene generously, then sample evenly down to the particle budget,
     so every part of the object survives on phones as well as desktops. */
  function buildScene(idx, n) {
    var big = new Sampler(24000);
    SCENES[idx](big);
    var m = big.i, s = new Sampler(n), keep = Math.min(m, Math.round(n * 0.86));
    var order = new Uint32Array(m); for (var i = 0; i < m; i++) order[i] = i;
    for (var j = m - 1; j > 0; j--) { var r = (Math.random() * (j + 1)) | 0, t = order[j]; order[j] = order[r]; order[r] = t; }
    for (var k = 0; k < keep; k++) {
      var o = order[k] * 3, d = k * 3;
      s.p[d] = big.p[o]; s.p[d + 1] = big.p[o + 1]; s.p[d + 2] = big.p[o + 2];
      s.c[d] = big.c[o]; s.c[d + 1] = big.c[o + 1]; s.c[d + 2] = big.c[o + 2];
    }
    s.i = keep; s.keep = keep;
    s.dust();
    return s;
  }

  var VERT = [
    "attribute vec3 aTo; attribute vec3 cFrom; attribute vec3 cTo; attribute float aRand;",
    "uniform float uP; uniform float uTime; uniform float uSize; uniform float uPR; uniform float uScatter;",
    "varying vec3 vCol; varying float vA;",
    "void main(){",
    "  float t = clamp(uP * 1.4 - aRand * 0.4, 0.0, 1.0);",
    "  t = t * t * (3.0 - 2.0 * t);",
    "  vec3 p = mix(position, aTo, t);",
    "  float burst = sin(t * 3.14159265);",
    "  vec3 dir = normalize(p + vec3(0.0001, 0.0002, 0.0003));",
    "  p += dir * burst * uScatter * (0.6 + aRand * 1.6);",
    "  p += vec3(sin(uTime * 0.9 + aRand * 40.0), cos(uTime * 0.7 + aRand * 23.0), sin(uTime * 0.5 + aRand * 11.0)) * 0.025;",
    "  vCol = mix(cFrom, cTo, t);",
    "  vec4 mv = modelViewMatrix * vec4(p, 1.0);",
    "  gl_Position = projectionMatrix * mv;",
    "  gl_PointSize = uSize * uPR * (0.55 + aRand * 0.9) * (9.0 / -mv.z);",
    "  vA = 0.5 + 0.5 * aRand + burst * 0.3;",
    "}"
  ].join("\n");
  var FRAG = [
    "varying vec3 vCol; varying float vA;",
    "void main(){",
    "  vec2 c = gl_PointCoord - 0.5; float d = length(c);",
    "  if (d > 0.5) discard;",
    "  float a = smoothstep(0.5, 0.0, d);",
    "  gl_FragColor = vec4(vCol, a * a * vA);",
    "}"
  ].join("\n");

  function webglOK() {
    try { var c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))); }
    catch (e) { return false; }
  }

  /* real photo revealed once the dots have formed (scene index → image). Hotlinked from Unsplash. */
  var U = function (id) { return "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=1100&q=78"; };
  var IMAGES = {
    0: U("1548607634-e47cdc7a6b31"),   // TVC — cinema camera on set
    1: U("1521794414102-37606728dd9c"), // OOH — digital billboards
    2: U("1504711434969-e33886168f5c"), // media buying — print & press
    3: U("1496208612508-eb52fba7d94e"), // events — stage lights & crowd
    4: U("1555201441-7b166836415d"),    // PR — press microphones
    5: U("1785310106283-80d0e95f0bbc"), // BTL — in-store product activation
    6: U("1724862936518-ae7fcfc052c1"), // digital — social on mobile
    7: U("1716436329475-4c55d05383bb")  // AI — chip / neural core
  };

  /**
   * mount(canvas, { scene, offsetX, scale, mobileOffsetY, interactive })
   * returns controller { goTo(i), current, destroy() }
   */
  function mount(canvas, opts) {
    opts = opts || {};
    if (!canvas || !webglOK()) return null;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var small = window.innerWidth < 720;
    var N = small ? 4200 : 9000;

    var renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: true, powerPreference: "high-performance" }); }
    catch (e) { return null; }
    var pr = Math.min(window.devicePixelRatio || 1, 1.6);
    renderer.setPixelRatio(pr);
    renderer.setClearColor(0x000000, 0);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    var start = opts.from !== undefined ? opts.from : 8;
    var first = buildScene(start, N);
    var geo = new THREE.BufferGeometry();
    var from = new Float32Array(N * 3), to = new Float32Array(N * 3), cf = new Float32Array(N * 3), ct = new Float32Array(N * 3), rnds = new Float32Array(N);
    // start from a scattered cloud, morph into first scene
    for (var i = 0; i < N; i++) {
      var u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u), r = 14 + Math.random() * 10;
      from[i * 3] = s * Math.cos(a) * r; from[i * 3 + 1] = u * r; from[i * 3 + 2] = s * Math.sin(a) * r - 6;
      cf[i * 3] = 0.3; cf[i * 3 + 1] = 0.32; cf[i * 3 + 2] = 0.31;
      rnds[i] = Math.random();
    }
    to.set(first.p); ct.set(first.c);
    geo.setAttribute("position", new THREE.BufferAttribute(from, 3));
    geo.setAttribute("aTo", new THREE.BufferAttribute(to, 3));
    geo.setAttribute("cFrom", new THREE.BufferAttribute(cf, 3));
    geo.setAttribute("cTo", new THREE.BufferAttribute(ct, 3));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rnds, 1));

    var mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uP: { value: 0 }, uTime: { value: 0 }, uSize: { value: (small ? 2.6 : 3.1) * (opts.sizeMul || 1) }, uPR: { value: pr }, uScatter: { value: 2.4 } }
    });
    var points = new THREE.Points(geo, mat);
    var group = new THREE.Group();
    group.add(points);
    scene.add(group);

    var cache = {}; cache[start] = first;
    var current = start, busy = false, queued = null, progress = { v: 0 };
    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    function layout() {
      var w = canvas.clientWidth || canvas.parentNode.clientWidth, h = canvas.clientHeight || canvas.parentNode.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      var narrow = w < 720;
      var ox = narrow ? 0 : (opts.offsetX !== undefined ? opts.offsetX : 2.3);
      var sc = (opts.scale || 1) * (narrow ? 0.66 : Math.min(1, w / 1400 + 0.12));
      group.position.set(ox * Math.min(1, camera.aspect / 1.6), narrow ? (opts.mobileOffsetY !== undefined ? opts.mobileOffsetY : 1.6) : 0, 0);
      group.scale.setScalar(sc);
      if (typeof realOn !== "undefined" && realOn) placeReal(current);
    }
    layout();
    var ro = window.ResizeObserver ? new ResizeObserver(layout) : null;
    if (ro) ro.observe(canvas); else window.addEventListener("resize", layout);

    /* ---- real-image reveal ---- */
    var imgs = opts.images === false ? {} : (opts.images || IMAGES);
    var real = null, realImg = null, realOn = false, realTimer = 0, realTok = 0, V3 = THREE.Vector3;
    {
      real = document.createElement("div");
      real.className = "p3d-real"; real.setAttribute("aria-hidden", "true");
      real.innerHTML = '<div class="p3d-real__card"><img alt="" decoding="async"><i class="p3d-real__sweep"></i></div>';
      realImg = real.querySelector("img");
      var cs = window.getComputedStyle(canvas);
      if (cs.position === "static") canvas.style.position = "relative";
      real.style.zIndex = cs.zIndex;
      canvas.parentNode.insertBefore(real, canvas);
    }
    function bbox(sc) {
      if (sc.bb) return sc.bb;
      var xs = [], ys = [], n = sc.keep || sc.p.length / 3, st = Math.max(1, Math.floor(n / 1500));
      for (var k = 0; k < n; k += st) { xs.push(sc.p[k * 3]); ys.push(sc.p[k * 3 + 1]); }
      xs.sort(function (a, b) { return a - b; }); ys.sort(function (a, b) { return a - b; });
      var q = function (arr, f) { return arr[Math.floor(f * (arr.length - 1))]; };
      return (sc.bb = { x0: q(xs, 0.03), x1: q(xs, 0.97), y0: q(ys, 0.03), y1: q(ys, 0.97) });
    }
    function placeReal(idx) {
      if (!real) return;
      var b = bbox(cache[idx]), cw = canvas.clientWidth, ch = canvas.clientHeight;
      var w0 = b.x1 - b.x0, h0 = b.y1 - b.y0, cx = (b.x0 + b.x1) / 2, cy = (b.y0 + b.y1) / 2;
      // card aspect follows the formed object, kept in a sensible photo range
      var asp = Math.max(0.78, Math.min(1.5, w0 / h0)), hh = Math.max(h0, w0 / asp) * 0.98, ww = hh * asp;
      var sc = group.scale.x, gp = group.position;
      var a = new V3(gp.x + (cx - ww / 2) * sc, gp.y + (cy + hh / 2) * sc, 0).project(camera);
      var c = new V3(gp.x + (cx + ww / 2) * sc, gp.y + (cy - hh / 2) * sc, 0).project(camera);
      var L = (a.x + 1) / 2 * cw, T = (1 - a.y) / 2 * ch, R = (c.x + 1) / 2 * cw, B = (1 - c.y) / 2 * ch;
      // keep the photo a focused card: cap its size, keep its centre on the formed object
      var pw = R - L, ph = B - T, mx = (L + R) / 2, my = (T + B) / 2;
      var maxW = cw < 720 ? cw * 0.86 : Math.min(cw * 0.44, opts.offsetX > 0 ? cw * 0.48 - (cw >= 1080 ? (opts.rightPad || 8) : 8) : cw), maxH = ch * (cw < 720 ? 0.42 : 0.62), k = Math.min(1, maxW / pw, maxH / ph);
      pw *= k; ph *= k;
      if (cw >= 720 && opts.offsetX > 0) mx = Math.max(mx, cw * 0.5 + pw / 2 + 12);
      mx = Math.min(Math.max(mx, pw / 2 + 8), cw - pw / 2 - (cw >= 1080 ? (opts.rightPad || 8) : 8));
      my = Math.min(Math.max(my, ph / 2 + (cw < 720 ? 70 : 96)), ch - ph / 2 - 24);
      real.style.left = (canvas.offsetLeft + mx - pw / 2) + "px"; real.style.top = (canvas.offsetTop + my - ph / 2) + "px";
      real.style.width = pw + "px"; real.style.height = ph + "px";
    }
    function hideReal() {
      clearTimeout(realTimer); realTok++;
      if (!real || !realOn) return;
      realOn = false; real.classList.remove("is-on"); canvas.classList.remove("p3d-dim");
    }
    function showReal(idx) {
      clearTimeout(realTimer);
      var url = imgs[idx]; if (!real || !url) return;
      var tok = ++realTok;
      var go = function () {
        if (tok !== realTok || idx !== current || busy) return;
        placeReal(idx); realOn = true;
        real.classList.add("is-on"); canvas.classList.add("p3d-dim");
        // static heroes: breathe back to particles, then re-form the photo
        if (opts.cycle !== false) realTimer = setTimeout(function () {
          if (tok !== realTok) return; hideReal(); var t2 = realTok;
          realTimer = setTimeout(function () { if (t2 === realTok) showReal(idx); }, 3600);
        }, 6500);
      };
      if (realImg.getAttribute("src") === url && realImg.complete && realImg.naturalWidth) go();
      else { realImg.onload = go; realImg.onerror = function () {}; realImg.src = url; }
    }

    function onMove(e) {
      var rect = canvas.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    window.addEventListener("pointermove", onMove, { passive: true });

    function tween(dur) {
      var t0 = performance.now();
      busy = true;
      return new Promise(function (res) {
        (function step(now) {
          var k = Math.min(1, (now - t0) / dur);
          progress.v = k; mat.uniforms.uP.value = k;
          if (k < 1) requestAnimationFrame(step); else { busy = false; res(); }
        })(t0);
      });
    }

    function goTo(idx) {
      if (idx === current && !busy) return;
      if (busy) { queued = idx; return; }
      hideReal();
      var target = cache[idx] || (cache[idx] = buildScene(idx, N));
      // current end-state becomes new start
      from.set(to); cf.set(ct);
      to.set(target.p); ct.set(target.c);
      geo.attributes.position.needsUpdate = true; geo.attributes.aTo.needsUpdate = true;
      geo.attributes.cFrom.needsUpdate = true; geo.attributes.cTo.needsUpdate = true;
      mat.uniforms.uP.value = 0; mat.uniforms.uScatter.value = 1.6;
      current = idx;
      tween(reduced ? 10 : (opts.morphMs || 1700)).then(function () {
        if (queued !== null && queued !== current) { var q = queued; queued = null; goTo(q); } else { queued = null; showReal(current); }
      });
    }

    var visible = true, running = true, raf = 0, clock = new THREE.Clock();
    var io = window.IntersectionObserver ? new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) loop(); }, { threshold: 0 }) : null;
    if (io) io.observe(canvas);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) loop(); });

    function loop() {
      if (raf) return;
      raf = requestAnimationFrame(frame);
    }
    function frame() {
      raf = 0;
      if (!running) return;
      if (!visible || document.hidden) return;
      var t = clock.getElapsedTime();
      mat.uniforms.uTime.value = t;
      mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
      if (!reduced) {
        group.rotation.y = Math.sin(t * 0.22) * 0.38 + mouse.x * 0.32;
        group.rotation.x = Math.cos(t * 0.18) * 0.06 + mouse.y * 0.16;
      }
      if (realOn) real.style.setProperty("--ry", (group.rotation.y * 22).toFixed(2) + "deg"), real.style.setProperty("--rx", (-group.rotation.x * 30).toFixed(2) + "deg");
      renderer.render(scene, camera);
      loop();
    }

    // intro morph
    mat.uniforms.uScatter.value = 0.4;
    tween(reduced ? 10 : (opts.introMs || 2200)).then(function () { if (queued !== null && queued !== current) { var q = queued; queued = null; goTo(q); } else { queued = null; showReal(current); } });
    loop();

    return {
      goTo: goTo,
      get current() { return current; },
      destroy: function () { running = false; hideReal(); if (real && real.parentNode) real.parentNode.removeChild(real); if (ro) ro.disconnect(); if (io) io.disconnect(); window.removeEventListener("pointermove", onMove); geo.dispose(); mat.dispose(); renderer.dispose(); }
    };
  }

  window.AdPulse3D = { mount: mount, count: SCENES.length };
})();
