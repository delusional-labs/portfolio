import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

(function() {
  const container = document.getElementById('hero-3d-canvas');
  if (!container) return;

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 5);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 10);
  spotLight.position.set(5, 5, 5);
  spotLight.angle = 0.25;
  spotLight.penumbra = 1;
  spotLight.castShadow = true;
  scene.add(spotLight);

  const greenLight1 = new THREE.PointLight(0x10b981, 8);
  greenLight1.position.set(-3, 2, 2);
  scene.add(greenLight1);

  const greenLight2 = new THREE.PointLight(0x059669, 5);
  greenLight2.position.set(3, -1, 2);
  scene.add(greenLight2);

  // Mouse tracking
  const mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Load model
  let mixer = null;
  let model = null;
  const loader = new GLTFLoader();

  loader.load('/modelo3D/notorius_face_abstract_geometry_animation_loop.glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(1.3, 1.3, 1.3);
    scene.add(model);

    // Play animations slowly
    if (gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.setEffectiveTimeScale(0.3);
        action.play();
      });
    }
  });

  // Float animation
  let floatTime = 0;

  // Animation loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    if (mixer) mixer.update(delta);

    if (model) {
      // Magnetic mouse follow
      const targetX = mouse.x * 0.5;
      const targetY = mouse.y * 0.3;
      model.position.x = THREE.MathUtils.lerp(model.position.x, targetX, 0.05);
      model.position.y = THREE.MathUtils.lerp(model.position.y, targetY, 0.05);

      // Rotation follow
      model.rotation.y = THREE.MathUtils.lerp(model.rotation.y, (mouse.x * 0.2) - Math.PI / 2, 0.05);
      model.rotation.x = THREE.MathUtils.lerp(model.rotation.x, -mouse.y * 0.1, 0.05);

      // Float effect
      floatTime += delta * 2;
      model.position.y += Math.sin(floatTime) * 0.003;
    }

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
})();
