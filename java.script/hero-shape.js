/* Figura 3D del hero (Three.js) — red de nodos con forma de estrella de
   5 puntas (tipo Patricio Estrella) con volumen, que muta cada 5s entre
   la estrella y un triángulo/pirámide con la silueta del isologo de
   GROWTHMARK (incluyendo la muesca inferior izquierda), con muchas
   líneas conectadas.

   Carga como <script> clásico (no module) porque type="module" se bloquea
   por CORS al abrir el HTML directo con file:// — usa three.js global build. */

function init() {
  if (typeof THREE === "undefined") return;
  const container = document.getElementById("hero-shape");
  if (!container) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const OUTER_R = 70;
  const INNER_R = 28;
  const DEPTH = 22;
  const SEG_MS = 5000;

  function starRing(z) {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 * i) / 10 - Math.PI / 2;
      const r = i % 2 === 0 ? OUTER_R : INNER_R;
      pts.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, z));
    }
    return pts;
  }

  // Silueta del isologo GROWTHMARK (medida sobre el PNG real): ápice arriba,
  // pata derecha que baja entera hasta la base, muesca interior tipo "A" y
  // pata izquierda más corta que termina en punta antes de llegar a la base.
  function logoRing(z) {
    const apex = new THREE.Vector2(1, 60);
    const br = new THREE.Vector2(70, -60);
    const blBase = new THREE.Vector2(-24, -60);
    const v1 = new THREE.Vector2(34, -40);
    const innerApex = new THREE.Vector2(1, 18);
    const legTip = new THREE.Vector2(-39, -11);

    function along(a, b, t) { return a.clone().lerp(b, t); }

    const pts2d = [
      apex,
      along(apex, br, 1 / 3),
      along(apex, br, 2 / 3),
      br,
      along(br, blBase, 0.5),
      blBase,
      v1,
      innerApex,
      legTip,
      along(legTip, apex, 0.5),
    ];
    return pts2d.map(p => new THREE.Vector3(p.x, p.y, z));
  }

  const N = 20;
  const shapeStar = starRing(DEPTH / 2).concat(starRing(-DEPTH / 2));
  const shapeTriangle = logoRing(DEPTH / 2).concat(logoRing(-DEPTH / 2));
  const shapes = [shapeStar, shapeTriangle];

  const edges = [];
  for (let i = 0; i < 10; i++) edges.push(i, (i + 1) % 10);
  for (let i = 0; i < 10; i++) edges.push(10 + i, 10 + ((i + 1) % 10));
  for (let i = 0; i < 10; i++) edges.push(i, 10 + i);

  function makeGlowTexture() {
    const size = 64;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.5)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  } catch (e) {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
  camera.position.set(0, 0, 260);

  const group = new THREE.Group();
  group.rotation.x = 0.3;
  scene.add(group);

  const positions = new Float32Array(N * 3);
  shapeStar.forEach((p, i) => { positions[i * 3] = p.x; positions[i * 3 + 1] = p.y; positions[i * 3 + 2] = p.z; });

  const colorAccent1 = new THREE.Color(0x7b2fff);
  const colorAccent2 = new THREE.Color(0x00ff94);
  const baseColors = new Float32Array(N * 3);
  shapeStar.forEach((p, i) => {
    const t = (p.y + OUTER_R) / (OUTER_R * 2);
    const c = colorAccent1.clone().lerp(colorAccent2, t);
    baseColors[i * 3] = c.r; baseColors[i * 3 + 1] = c.g; baseColors[i * 3 + 2] = c.b;
  });
  const colors = baseColors.slice();

  const positionAttr = new THREE.BufferAttribute(positions, 3);
  positionAttr.setUsage(THREE.DynamicDrawUsage);
  const colorAttr = new THREE.BufferAttribute(colors, 3);
  colorAttr.setUsage(THREE.DynamicDrawUsage);

  const glowTexture = makeGlowTexture();

  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute("position", positionAttr);
  pointsGeo.setAttribute("color", colorAttr);
  const BASE_POINT_SIZE = 7;
  const BASE_LINE_OPACITY = 0.4;

  const pointsMat = new THREE.PointsMaterial({
    size: BASE_POINT_SIZE, map: glowTexture, vertexColors: true, transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  });
  group.add(new THREE.Points(pointsGeo, pointsMat));

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", positionAttr);
  lineGeo.setAttribute("color", colorAttr);
  lineGeo.setIndex(edges);
  const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: BASE_LINE_OPACITY });
  group.add(new THREE.LineSegments(lineGeo, lineMat));

  function ease(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function resize() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  new ResizeObserver(resize).observe(container);
  resize();

  let isVisible = true;
  new IntersectionObserver(entries => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.05 }).observe(container);

  let segIndex = 0;
  let segStart = performance.now();

  function tick(now) {
    requestAnimationFrame(tick);
    if (!isVisible) return;

    if (!prefersReducedMotion) {
      const tSec = now * 0.001;
      group.rotation.y = Math.sin(tSec * 0.25) * 0.4;
      group.rotation.x = 0.3 + Math.sin(tSec * 0.18) * 0.12;
      group.rotation.z = Math.sin(tSec * 0.14) * 0.06;

      const elapsed = now - segStart;
      const t = Math.min(elapsed / SEG_MS, 1);
      const et = ease(t);
      const glow = Math.sin(t * Math.PI); // pico a mitad de la mutación de forma
      const a = shapes[segIndex % shapes.length];
      const b = shapes[(segIndex + 1) % shapes.length];
      for (let i = 0; i < N; i++) {
        const pa = a[i], pb = b[i];
        positions[i * 3] = pa.x + (pb.x - pa.x) * et;
        positions[i * 3 + 1] = pa.y + (pb.y - pa.y) * et;
        positions[i * 3 + 2] = pa.z + (pb.z - pa.z) * et;

        colors[i * 3] = baseColors[i * 3] + (1 - baseColors[i * 3]) * glow * 0.7;
        colors[i * 3 + 1] = baseColors[i * 3 + 1] + (1 - baseColors[i * 3 + 1]) * glow * 0.7;
        colors[i * 3 + 2] = baseColors[i * 3 + 2] + (1 - baseColors[i * 3 + 2]) * glow * 0.7;
      }
      positionAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;

      pointsMat.size = BASE_POINT_SIZE + glow * 7;
      lineMat.opacity = BASE_LINE_OPACITY + glow * 0.55;

      if (t >= 1) { segIndex++; segStart = now; }
    }

    renderer.render(scene, camera);
  }
  requestAnimationFrame(tick);
}

init();
