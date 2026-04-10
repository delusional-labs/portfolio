import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Float, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/modelo3D/notorius_face_abstract_geometry_animation_loop.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      if (action) {
        action.setEffectiveTimeScale(0.3).play();
      }
    });
  }, [actions]);

  useFrame((state) => {
    if (!group.current) return;
    
    // Target position based on mouse (-1 to 1 range)
    const targetX = state.mouse.x * 0.5;
    const targetY = state.mouse.y * 0.3;
    
    // Smoothly interpolate position (Magnet effect)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05);
    
    // Slight rotation following mouse
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (state.mouse.x * 0.2) - Math.PI / 2, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -state.mouse.y * 0.1, 0.05);
  });

  return (
    <primitive 
      ref={group} 
      object={scene} 
      scale={1.3} 
      position={[0, 0, 0]} 
    />
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        <ambientLight intensity={1} />
        <spotLight position={[5, 5, 5]} angle={0.25} penumbra={1} intensity={10} castShadow />
        <pointLight position={[-3, 2, 2]} intensity={8} color="#10b981" />
        <pointLight position={[3, -1, 2]} intensity={5} color="#059669" />
        <Environment preset="studio" />
        
        <Float
          speed={2} 
          rotationIntensity={0.8} 
          floatIntensity={0.8} 
        >
          <Model />
        </Float>

        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4.5} 
        />
      </Canvas>
    </div>
  );
}
