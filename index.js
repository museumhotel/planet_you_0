import {
  FXInit,
  FXRandomBetween,
  getWeightedOption,
  FXRandomOption,
  FXRandomIntBetween,
} from "../public/helpers";

const randInt = fxrand();

FXInit(fxrand);

let seedHash = 0;

//frag shader glsl code
let hueVar0;
let hueVar;
const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float seed;

varying vec2 v_texcoord;


float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 48.5453);
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

mat2 rotation2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat2(
        c, -s,
        s, c
    );
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


void main(void)
{
    vec2 uv = v_texcoord;

		// find the distance between the mouse and points
		vec2 mouse = u_mouse / u_resolution;
		float dist = distance(uv, mouse);
		float strength = smoothstep(0.5, -0.015, dist);
    
    // where does the hue start
    float hue = u_time * 0.02 + seed;
    
    
    // make two hsv colors
    vec3 hsv1 = vec3(hue, ${(hueVar0 = getWeightedOption([
      [-0.9, 50],
      [0.9, 50],
    ]))},  ${(hueVar = getWeightedOption([
  [0.85, 50],
  [-0.85, 50],
]))});
    vec3 hsv2 = vec3(hue + -0.07, -0.85, 0.75);
    
    // convert them to RGB
    vec3 rgb1 = hsv2rgb(hsv1);
    vec3 rgb2 = hsv2rgb(hsv2);
    
    // colors in RGBA
    vec4 color1 = vec4(rgb1, 1.0);
    vec4 color2 = vec4(rgb2, 1.0);
    
    // sweet sweet grain
    float grain = rand(100.0 * uv) * mix(-0.25, 0.5, strength);
    
    // make movement for fbm
    vec2 movement = vec2(u_time * 0.01, u_time * -0.01);
    movement *= rotation2d(u_time * 0.005);
    
    // make a noise pattern
    float f = fbm(uv + movement + seed);  
    f *= 10.0;
    f += grain;
    f += u_time * 0.2;
    f = fract(f);
    
    // mix colors based on noise pattern
		float gap = mix(0.5, 0.01, strength);
    float mixer = smoothstep(0.0, gap, f) - smoothstep(1.0 - gap, -1.0, f);
 
    // final pixel color is...
    vec4 color = mix(color1, color2, mixer);
    
    gl_FragColor = color;
}

`;
let shaderHue; //dark / tone-on-tone
if (hueVar === 0.85) {
  shaderHue = "tone-on-tone";
}
if (hueVar === -0.85) {
  shaderHue = "negative";
}
if ((hueVar0 === 0.9) & (hueVar === 0.85)) {
  shaderHue = "contrast";
}
if ((hueVar0 === 0.9) & (hueVar === -0.85)) {
  shaderHue = "negative tone-on-tone";
}
//shader canvas
const shaderCanvas = document.createElement("canvas");

shaderCanvas.id = "shaderCanv";

const shaderOut = new GlslCanvas(shaderCanvas);

document.body.appendChild(shaderCanvas);

shaderOut.load(frag);

const sizer = () => {
  const ww = window.innerWidth;
  const wh = window.innerHeight;
  const dpi = window.devicePixelRatio;

  const square = Math.max(ww, wh);

  shaderCanvas.width = square * dpi;
  shaderCanvas.height = square * dpi;

  shaderCanvas.style.width = square + "px";
  shaderCanvas.style.height = square + "px";
};

sizer();

window.addEventListener("resize", function () {
  sizer();
});

//inner noise graphic vars
let graphics, col;

//terraform discoball texture variables
const rows = 50;
const columns = 50;
const fadeSpeed = 1;
let cells = [];
let isFaded = false;
let wrap;

//camera
let cam;

//rotation speed of noise graphic
let rotSpeed = getWeightedOption([
  [2, 60],
  [4, 30],
  [6, 7],
  [8, 3],
]);

//flav rbgs
/* let daffodil_lime =  (255, 0, 12.5);
let coral_aubergine = (0, 100, 15);
let grape_kool_aid = (0, 255, 15);
let cherry_molasses = (0, 0, 15);
let bubblegum_sakura = (150, 255, 15);
let guava_cantaloupe = (200, 200, 15);
let blueberry_slushy = (255, 255, 15);
let dusk = (100, 150, 12.5); */

//arrays to store colour values determining colour of the central planet motif and the weights at index[1] give the probability out of 100% of occurence
let terraCol1 = getWeightedOption([
  [255, 30],
  [200, 15],
  [150, 15],
  [100, 10],
  [0, 30],
]);
let terraCol2 = getWeightedOption([
  [255, 20],
  [200, 20],
  [150, 20],
  [100, 20],
  [0, 20],
]);

let terraCol;

//flavour distribution
if (terraCol1 === 255) {
  //add weights to prevent combos which aren't designated features
  terraCol2 = getWeightedOption([
    [255, 50],
    [200, 0],
    [150, 0],
    [100, 0],
    [0, 50],
  ]);
  if (terraCol2 === 0) {
    terraCol = "daffodil_lime";
  } else if (terraCol2 === 255) {
    terraCol = "blueberry_slushy";
  }
}

if (terraCol1 === 200) {
  terraCol2 = 200;
  terraCol = "guava_cantaloupe";
}

if (terraCol1 === 150) {
  terraCol2 = 255;
  terraCol = "bubblegum_sakura";
}

if (terraCol1 === 100) {
  terraCol2 = 150;
  terraCol = "dusk";
}

if (terraCol1 === 0) {
  terraCol2 = getWeightedOption([
    [255, 30],
    [200, 0],
    [150, 0],
    [100, 35],
    [0, 35],
  ]);
  if (terraCol2 === 0) {
    terraCol = "cherry_molasses";
  } else if (terraCol2 === 100) {
    terraCol = "coral_aubergine";
  } else if (terraCol2 === 255) {
    terraCol = "grape_kool_aid";
  }
}

let noiseGraphicRot;
// noise graphic rotation
if ((randInt <= 1.0) & (randInt >= 0.75)) {
  // y / x * harmony
  noiseGraphicRot = "➗ ⨷";
} else if ((randInt <= 0.74) & (randInt >= 0.5)) {
  // y * x / beauty
  noiseGraphicRot = "⨷ ➗";
} else if ((randInt <= 0.49) & (randInt >= 0.25)) {
  // y / x / slow slow
  noiseGraphicRot = "➗ ➗";
} else {
  // y * x * fast fast!
  noiseGraphicRot = "⨷ ⨷";
}

//feature assignment on the fxhash marketplace
window.$fxhashFeatures = {
  Terraform_Flavour: terraCol,
  Rotation_Speed: rotSpeed,
  Noise_Graphic_Rotation: noiseGraphicRot,
  Atmosphere: shaderHue,
};
//console.log(terraCol, rotSpeed, noiseGraphicRot, shaderHue);

window.setup = () => {
  seedHash = int(fxrand() * 100000000);
  randomSeed(seedHash);
  noiseSeed(seedHash);

  frameRate(20);
  const size = min(windowWidth, windowHeight);
  //declare WEBGL to allow for use of 3D shapes
  createCanvas(size, size, WEBGL);
  rectMode(CENTER);
  angleMode(DEGREES);
  colorMode(RGB, 255, 255, 255, 0.05);
  cam = createCamera();

  //randomly assigned col bg
  background(random(200, 255), random(200, 255), random(200, 255));

  //inner noise graphic motif setup
  col = color(random(100, 255), random(255), random(200, 255), 0.0005);
  //console.log(col);
  graphics = createGraphics(600, 600);
  drawNoiseBackground(graphics, col);

  //planetary terraform setup
  structureGrid();
  wrap = createGraphics(500, 500);
};

window.windowResized = () => {
  if (navigator.userAgent.indexOf("HeadlessChrome") == -1) {
    const size = min(windowWidth, windowHeight);
    resizeCanvas(size, size);
  }
};

window.onkeypress = () => {
  if (keyCode === 49) {
    const size = 1024 * 1;
    const cnv = createCanvas(size, size);
    save(cnv, "planet_you.png");
    windowResized();
  }
};

//form the grid covering the planet and it's ring
function structureGrid() {
  for (let r = 0; r < rows; r++) {
    cells[r] = [];
    for (let c = 0; c < columns; c++) {
      //change the random value to between 150 and 255 for best results
      cells[r][c] = random(255);
    }
  }
}

//draw the noise graphics which rotate around and behind the planet
function drawNoiseBackground(g, c) {
  g.clear();
  let noiseBase = 0.001;
  let rnd = random(0.00001, 0.00001);
  let noiseConst = 100;
  for (let i = 10000; i < 15000; i++) {
    const x = random(1) * width;
    const y = random(1) * height;
    const w = noise(noiseBase) * noiseConst;
    const h = noise(noiseBase) * noiseConst;

    //chartreuse strokes on rects outlining noise
    g.stroke("#e5fca4");
    //optimal stroke weight
    g.strokeWeight(0.0195);
    g.fill(c);
    g.rect(x, y, w, h);

    noiseBase += rnd;
  }
}

window.draw = () => {
  wrap.noStroke();
  noStroke();

  //set camera
  cam.setPosition(0, 0, 900);

  //terraform / discoball grid
  fillGrid();
  if (isFaded) {
    isFaded = false;
    cells = [];
    structureGrid();
  }

  //noise graphics
  push();
  let diviRotSpeed = window.frameCount / rotSpeed;
  let multiRotSpeed = window.frameCount * rotSpeed;

  // noise graphic rotation
  if ((randInt <= 1.0) & (randInt >= 0.75)) {
    // y / x * harmony
    rotateX(multiRotSpeed);
    rotateY(diviRotSpeed);
  } else if ((randInt <= 0.74) & (randInt >= 0.5)) {
    // y * x / beauty
    rotateX(diviRotSpeed);
    rotateY(multiRotSpeed);
  } else if ((randInt <= 0.49) & (randInt >= 0.25)) {
    // y / x / slow slow
    rotateX(diviRotSpeed);
    rotateY(diviRotSpeed);
  } else {
    // y * x * fast fast!
    rotateX(multiRotSpeed);
    rotateY(multiRotSpeed);
  }
  //layout of noise graphics, needs 2 instances to create natural edges
  translate(300, 300);
  image(graphics, -600, -600);
  rotate(180);
  image(graphics, -17.5, -17.5);
  pop();

  //planetary terraform discoball 3d obj
  push();
  rotateY(diviRotSpeed);
  rotateX(multiRotSpeed);
  texture(wrap);
  torus(200);
  sphere(150);
  pop();
};

//click window to change noise pattern
window.onmousedown = () => {
  drawNoiseBackground(graphics, col);
};

//grid structured earlier is filled in here wit colours assigned in weighted array
function fillGrid() {
  const cellWidth = width / columns;

  //numbers between pick 0 and loop will start from black pick 255 and its when bg is white
  if (cells[25][25] == 255) {
    isFaded = true;
    refillGrid();
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      cells[r][c] += fadeSpeed * 2;
      cells[r][c] = constrain(cells[r][c], 0, 255);
      const y = height * (r / rows);
      const x = width * (c / columns);

      let cellsRC = cells[r][c];

      wrap.fill(cellsRC, terraCol1, terraCol2, 10);
      wrap.rect(x, y, cellWidth, height);
    }
  }
}
//loop of the fill grid animation
function refillGrid() {
  const cellWidth = width / columns;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const y = height * (r / rows);
      const x = width * (c / columns);

      wrap.fill(cells[r][c], 255);

      wrap.square(x, y, cellWidth, height);
    }
  }
}
