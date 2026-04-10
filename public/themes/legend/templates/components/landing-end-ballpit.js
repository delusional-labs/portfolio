import {
  ACESFilmicToneMapping,
  AmbientLight,
  Clock,
  Color,
  DynamicDrawUsage,
  InstancedMesh,
  MathUtils,
  Matrix4,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
  SRGBColorSpace,
  PMREMGenerator
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const HOST = document.querySelector("[data-ballpit-footer]");
const BALLPIT_SETTINGS = {
  count: 100,
  gravity: 0,
  friction: 1,
  wallBounce: 0.95
};

if (!HOST) {
  console.error("Footer ballpit host not found.");
} else {
  initFooterBallpit(HOST);
}

function initFooterBallpit(host) {
  const scene = new Scene();
  const clock = new Clock();
  const camera = new PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 22);

  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";
  host.appendChild(renderer.domElement);

  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const ambient = new AmbientLight(0xc7a9ff, 0.55);
  scene.add(ambient);

  const key = new PointLight(0xfbf7ff, 38, 80, 2);
  key.position.set(-6, 8, 12);
  scene.add(key);

  const rim = new PointLight(0x8b3dff, 150, 100, 2);
  rim.position.set(8, -6, 10);
  scene.add(rim);

  const sphereGeometry = new SphereGeometry(1, 28, 28);
  const palette = ["#8b3dff"];
  const material = new MeshPhysicalMaterial({
    color: new Color("#8b3dff"),
    emissive: new Color("#2b0f57"),
    emissiveIntensity: 0.28,
    metalness: 0.08,
    roughness: 0.34,
    clearcoat: 0.55,
    clearcoatRoughness: 0.32,
    reflectivity: 0.42,
    transmission: 0,
    ior: 1.18,
    envMapIntensity: 0.48,
    vertexColors: true
  });

  const count = BALLPIT_SETTINGS.count;
  const mesh = new InstancedMesh(sphereGeometry, material, count);
  mesh.instanceMatrix.setUsage(DynamicDrawUsage);
  scene.add(mesh);

  const positions = Array.from({ length: count }, () => new Vector3());
  const velocities = Array.from({ length: count }, () => new Vector3());
  const scales = Array.from({ length: count }, (_, i) => (i === 0 ? 1.35 : MathUtils.randFloat(0.48, 1.1)));
  const dummyMatrix = new Matrix4();
  const dummyColor = new Color();

  let bounds = { x: 8.2, y: 5.4, z: 3.6 };
  let isVisible = false;
  let rafId = 0;

  function randomizeBodies() {
    for (let i = 0; i < count; i += 1) {
      positions[i].set(
        MathUtils.randFloatSpread(bounds.x * 1.92),
        MathUtils.randFloat(-bounds.y * 0.98, bounds.y * 1.02),
        MathUtils.randFloatSpread(bounds.z * 1.5)
      );
      velocities[i].set(
        MathUtils.randFloatSpread(0.06),
        MathUtils.randFloatSpread(0.04),
        MathUtils.randFloatSpread(0.035)
      );

      const colorIndex = i % palette.length;
      mesh.setColorAt(i, dummyColor.set(palette[colorIndex]));
    }

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }

  function resize() {
    const width = host.clientWidth || 1;
    const height = host.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const fov = MathUtils.degToRad(camera.fov);
    const visibleHeight = 2 * Math.tan(fov / 2) * camera.position.z;
    const visibleWidth = visibleHeight * camera.aspect;
    bounds = {
      x: visibleWidth * 0.52,
      y: visibleHeight * 0.62,
      z: Math.max(3.2, visibleWidth * 0.16)
    };
  }

  function resolveCollisions() {
    for (let i = 0; i < count; i += 1) {
      for (let j = i + 1; j < count; j += 1) {
        const delta = new Vector3().subVectors(positions[j], positions[i]);
        const distance = delta.length();
        const minDist = scales[i] + scales[j];

        if (!distance || distance >= minDist) continue;

        const normal = delta.normalize();
        const overlap = (minDist - distance) * 0.5;
        positions[i].addScaledVector(normal, -overlap);
        positions[j].addScaledVector(normal, overlap);

        const impulse = 0.022;
        velocities[i].addScaledVector(normal, -impulse);
        velocities[j].addScaledVector(normal, impulse);
      }
    }
  }

  function clampToBounds(index) {
    const position = positions[index];
    const velocity = velocities[index];
    const radius = scales[index];

    if (position.x + radius > bounds.x) {
      position.x = bounds.x - radius;
      velocity.x *= -BALLPIT_SETTINGS.wallBounce;
    } else if (position.x - radius < -bounds.x) {
      position.x = -bounds.x + radius;
      velocity.x *= -BALLPIT_SETTINGS.wallBounce;
    }

    if (position.y + radius > bounds.y) {
      position.y = bounds.y - radius;
      velocity.y *= -BALLPIT_SETTINGS.wallBounce;
    } else if (position.y - radius < -bounds.y) {
      position.y = -bounds.y + radius;
      velocity.y *= -BALLPIT_SETTINGS.wallBounce;
    }

    if (position.z + radius > bounds.z) {
      position.z = bounds.z - radius;
      velocity.z *= -BALLPIT_SETTINGS.wallBounce;
    } else if (position.z - radius < -bounds.z) {
      position.z = -bounds.z + radius;
      velocity.z *= -BALLPIT_SETTINGS.wallBounce;
    }
  }

  function updateBodies(delta) {
    const dt = Math.min(delta, 0.02);

    for (let i = 0; i < count; i += 1) {
      velocities[i].y -= BALLPIT_SETTINGS.gravity * scales[i] * (dt * 60);
      velocities[i].multiplyScalar(BALLPIT_SETTINGS.friction);
      velocities[i].clampLength(0, 0.16);
      positions[i].addScaledVector(velocities[i], dt * 60);
      clampToBounds(i);
    }

    resolveCollisions();

    for (let i = 0; i < count; i += 1) {
      dummyMatrix.makeScale(scales[i], scales[i], scales[i]);
      dummyMatrix.setPosition(positions[i]);
      mesh.setMatrixAt(i, dummyMatrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  function render() {
    rafId = requestAnimationFrame(render);
    if (!isVisible) return;
    const delta = clock.getDelta();
    updateBodies(delta);
    rim.position.x = Math.sin(clock.elapsedTime * 0.45) * 9;
    key.position.y = 7 + Math.cos(clock.elapsedTime * 0.3) * 1.5;
    renderer.render(scene, camera);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);

  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !clock.running) {
          clock.start();
        } else if (!isVisible && clock.running) {
          clock.stop();
        }
      });
    },
    { threshold: 0.05 }
  );
  visibilityObserver.observe(host);

  window.addEventListener("resize", resize);
  window.addEventListener("beforeunload", destroy);

  resize();
  randomizeBodies();
  render();

  function destroy() {
    cancelAnimationFrame(rafId);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    window.removeEventListener("resize", resize);
    window.removeEventListener("beforeunload", destroy);
    pmrem.dispose();
    sphereGeometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  }
}
