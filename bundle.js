(() => {
  "use strict";
  let n;
  const e = function (e) {
      !(function () {
        if ("function" != typeof n)
          throw new Error("fxhash has not been defined, did you call FXInit?");
      })();
      let t = [];
      for (let n in e) t = t.concat(new Array(e[n][1]).fill(e[n][0]));
      return (o = t)[(n() * o.length) | 0];
      var o;
    },
    t = fxrand();
  var o;
  "function" == typeof (o = fxrand) && (n = o);
  let r,
    a,
    i = 0;
  const s = `\n#ifdef GL_ES\nprecision highp float;\n#endif\n\nuniform float u_time;\nuniform vec2 u_resolution;\nuniform vec2 u_mouse;\nuniform float seed;\n\nvarying vec2 v_texcoord;\n\n\nfloat rand(vec2 n) { \n    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 48.5453);\n}\n\nfloat noise(vec2 p){\n    vec2 ip = floor(p);\n    vec2 u = fract(p);\n    u = u*u*(3.0-2.0*u);\n    \n    float res = mix(\n        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),\n        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);\n    return res*res;\n}\n\nfloat fbm(vec2 x) {\n    float v = 0.0;\n    float a = 0.5;\n    vec2 shift = vec2(100);\n    // Rotate to reduce axial bias\n    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));\n    for (int i = 0; i < 5; ++i) {\n        v += a * noise(x);\n        x = rot * x * 2.0 + shift;\n        a *= 0.5;\n    }\n    return v;\n}\n\nmat2 rotation2d(float angle) {\n    float s = sin(angle);\n    float c = cos(angle);\n\n    return mat2(\n        c, -s,\n        s, c\n    );\n}\n\nvec3 hsv2rgb(vec3 c)\n{\n    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\n\nvoid main(void)\n{\n    vec2 uv = v_texcoord;\n\n\t\t// find the distance between the mouse and points\n\t\tvec2 mouse = u_mouse / u_resolution;\n\t\tfloat dist = distance(uv, mouse);\n\t\tfloat strength = smoothstep(0.5, -0.015, dist);\n    \n    // where does the hue start\n    float hue = u_time * 0.02 + seed;\n    \n    \n    // make two hsv colors\n    vec3 hsv1 = vec3(hue, ${(r =
    e([
      [-0.9, 50],
      [0.9, 50],
    ]))},  ${(a = e([
    [0.85, 50],
    [-0.85, 50],
  ]))});\n    vec3 hsv2 = vec3(hue + -0.07, -0.85, 0.75);\n    \n    // convert them to RGB\n    vec3 rgb1 = hsv2rgb(hsv1);\n    vec3 rgb2 = hsv2rgb(hsv2);\n    \n    // colors in RGBA\n    vec4 color1 = vec4(rgb1, 1.0);\n    vec4 color2 = vec4(rgb2, 1.0);\n    \n    // sweet sweet grain\n    float grain = rand(100.0 * uv) * mix(-0.25, 0.5, strength);\n    \n    // make movement for fbm\n    vec2 movement = vec2(u_time * 0.01, u_time * -0.01);\n    movement *= rotation2d(u_time * 0.005);\n    \n    // make a noise pattern\n    float f = fbm(uv + movement + seed);  \n    f *= 10.0;\n    f += grain;\n    f += u_time * 0.2;\n    f = fract(f);\n    \n    // mix colors based on noise pattern\n\t\tfloat gap = mix(0.5, 0.01, strength);\n    float mixer = smoothstep(0.0, gap, f) - smoothstep(1.0 - gap, -1.0, f);\n \n    // final pixel color is...\n    vec4 color = mix(color1, color2, mixer);\n    \n    gl_FragColor = color;\n}\n\n`;
  let c;
  0.85 === a && (c = "tone-on-tone"),
    -0.85 === a && (c = "negative"),
    (0.9 === r) & (0.85 === a) && (c = "contrast"),
    (0.9 === r) & (-0.85 === a) && (c = "negative tone-on-tone");
  const d = document.createElement("canvas");
  d.id = "shaderCanv";
  const l = new GlslCanvas(d);
  document.body.appendChild(d), l.load(s);
  const f = () => {
    const n = window.innerWidth,
      e = window.innerHeight,
      t = window.devicePixelRatio,
      o = Math.max(n, e);
    (d.width = o * t),
      (d.height = o * t),
      (d.style.width = o + "px"),
      (d.style.height = o + "px");
  };
  let u, m;
  f(),
    window.addEventListener("resize", function () {
      f();
    });
  const h = 50;
  let v,
    w,
    g,
    p,
    x = [],
    _ = !1,
    b = e([
      [2, 60],
      [4, 30],
      [6, 7],
      [8, 3],
    ]),
    y = e([
      [255, 30],
      [200, 15],
      [150, 15],
      [100, 10],
      [0, 30],
    ]),
    k = e([
      [255, 20],
      [200, 20],
      [150, 20],
      [100, 20],
      [0, 20],
    ]);
  function C() {
    for (let n = 0; n < 50; n++) {
      x[n] = [];
      for (let e = 0; e < h; e++) x[n][e] = random(255);
    }
  }
  function R(n, e) {
    n.clear();
    let t = 0.001,
      o = random(1e-5, 1e-5);
    for (let r = 1e4; r < 15e3; r++) {
      const r = random(1) * width,
        a = random(1) * height,
        i = 100 * noise(t),
        s = 100 * noise(t);
      n.stroke("#e5fca4"),
        n.strokeWeight(0.0195),
        n.fill(e),
        n.rect(r, a, i, s),
        (t += o);
    }
  }
  255 === y &&
    ((k = e([
      [255, 50],
      [200, 0],
      [150, 0],
      [100, 0],
      [0, 50],
    ])),
    0 === k ? (g = "daffodil_lime") : 255 === k && (g = "blueberry_slushy")),
    200 === y && ((k = 200), (g = "guava_cantaloupe")),
    150 === y && ((k = 255), (g = "bubblegum_sakura")),
    100 === y && ((k = 150), (g = "dusk")),
    0 === y &&
      ((k = e([
        [255, 30],
        [200, 0],
        [150, 0],
        [100, 35],
        [0, 35],
      ])),
      0 === k
        ? (g = "cherry_molasses")
        : 100 === k
        ? (g = "coral_aubergine")
        : 255 === k && (g = "grape_kool_aid")),
    (p =
      (t <= 1) & (t >= 0.75)
        ? "➗ ⨷"
        : (t <= 0.74) & (t >= 0.5)
        ? "⨷ ➗"
        : (t <= 0.49) & (t >= 0.25)
        ? "➗ ➗"
        : "⨷ ⨷"),
    (window.$fxhashFeatures = {
      Terraform_Flavour: g,
      Rotation_Speed: b,
      Noise_Graphic_Rotation: p,
      Atmosphere: c,
    }),
    console.log(`planet_you_paraterraformed
    parameters:
    Terraform_Flavour: ${g},
    Rotation_Speed: ${b},
    Noise_Graphic_Rotation: ${p},
    Atmosphere: ${c}`),
    (window.setup = () => {
      (i = int(1e8 * fxrand())), randomSeed(i), noiseSeed(i), frameRate(20);
      const n = min(windowWidth, windowHeight);
      createCanvas(n, n, WEBGL),
        rectMode(CENTER),
        angleMode(DEGREES),
        colorMode(RGB, 255, 255, 255, 0.05),
        (w = createCamera()),
        background(random(200, 255), random(200, 255), random(200, 255)),
        (m = color(random(100, 255), random(255), random(200, 255), 5e-4)),
        (u = createGraphics(600, 600)),
        R(u, m),
        C(),
        (v = createGraphics(500, 500));
    }),
    (window.windowResized = () => {
      if (-1 == navigator.userAgent.indexOf("HeadlessChrome")) {
        const n = min(windowWidth, windowHeight);
        resizeCanvas(n, n);
      }
    }),
    (window.onkeypress = () => {
      if (49 === keyCode) {
        const n = 1024;
        resizeCanvas(n, n), save("planet_you", png), windowResized();
      }
    }),
    (window.draw = () => {
      v.noStroke(),
        noStroke(),
        w.setPosition(0, 0, 900),
        (function () {
          const n = width / h;
          255 == x[25][25] &&
            ((_ = !0),
            (function () {
              const n = width / h;
              for (let e = 0; e < 50; e++)
                for (let t = 0; t < h; t++) {
                  const o = height * (e / 50),
                    r = width * (t / h);
                  v.fill(x[e][t], 255), v.square(r, o, n, height);
                }
            })());
          for (let e = 0; e < 50; e++)
            for (let t = 0; t < h; t++) {
              (x[e][t] += 2), (x[e][t] = constrain(x[e][t], 0, 255));
              const o = height * (e / 50),
                r = width * (t / h);
              let a = x[e][t];
              v.fill(a, y, k, 10), v.rect(r, o, n, height);
            }
        })(),
        _ && ((_ = !1), (x = []), C()),
        push();
      let n = window.frameCount / b,
        e = window.frameCount * b;
      (t <= 1) & (t >= 0.75)
        ? (rotateX(e), rotateY(n))
        : (t <= 0.74) & (t >= 0.5)
        ? (rotateX(n), rotateY(e))
        : (t <= 0.49) & (t >= 0.25)
        ? (rotateX(n), rotateY(n))
        : (rotateX(e), rotateY(e)),
        translate(300, 300),
        image(u, -600, -600),
        rotate(180),
        image(u, -17.5, -17.5),
        pop(),
        push(),
        rotateY(n),
        rotateX(e),
        texture(v),
        torus(200),
        sphere(150),
        pop();
    }),
    (window.onmousedown = () => {
      R(u, m);
    });
})();
