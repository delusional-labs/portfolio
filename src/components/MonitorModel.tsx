import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "framer-motion";
import { useState } from "react";

function Model({ visible }: { visible: boolean }) {
  const { scene } = useGLTF("/modelo3D/monitor.glb?v=2");
  const group = useRef<THREE.Group>(null);
  const [animatedScale, setAnimatedScale] = useState(0);
  const [animatedRotation, setAnimatedRotation] = useState(-Math.PI / 2);
  const [animatedY, setAnimatedY] = useState(-12);

  useFrame(() => {
    if (group.current && visible) {
      // Slower and cinematic lerp (0.01)
      setAnimatedScale(prev => THREE.MathUtils.lerp(prev, 10, 0.01));
      setAnimatedRotation(prev => THREE.MathUtils.lerp(prev, 0, 0.01));
      setAnimatedY(prev => THREE.MathUtils.lerp(prev, -3, 0.01));
      
      group.current.scale.set(animatedScale, animatedScale, animatedScale);
      group.current.rotation.x = animatedRotation;
      group.current.position.y = animatedY;
    }
  });

  return (
    <primitive 
      ref={group} 
      object={scene} 
      position={[0, animatedY, -2]} 
    />
  );
}

export default function MonitorScene() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
        
        {/* Cinematic Lighting with strong Purple Theme */}
        <ambientLight intensity={0.1} />
        <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={100} color="#aa3bff" />
        <pointLight position={[-10, 0, 5]} intensity={50} color="#aa3bff" />
        <rectAreaLight width={50} height={50} intensity={1} position={[0, 10, -10]} color="#fff" />
        
        <Environment preset="studio" />

        <Model visible={isInView} />
      </Canvas>
    </div>
  );
}
