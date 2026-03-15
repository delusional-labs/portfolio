import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, Float, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/modelo3D/notorius_face_abstract_geometry_animation_loop.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play all animations found in the GLB at a much slower pace
    Object.values(actions).forEach((action) => {
      if (action) {
        action.setEffectiveTimeScale(0.3).play();
      }
    });
  }, [actions]);

  return (
    <primitive 
      ref={group} 
      object={scene} 
      scale={1.2} 
      position={[-1.5, 0.2, 0]} 
      rotation={[0, -Math.PI / 2, 0]} 
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
        <pointLight position={[-3, 2, 2]} intensity={5} color="#aa3bff" />
        <pointLight position={[3, -1, 2]} intensity={3} color="#00ffff" />
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
