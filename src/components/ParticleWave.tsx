import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const count = 10000;
  const points = useRef<THREE.Points>(null);

  const [particles, colors] = useMemo(() => {
    const particles = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color("#a6fcf0");

    for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;
        
        particles.set([x, y, z], i * 3);
        colors.set([color.r, color.g, color.b], i * 3);
    }

    return [particles, colors];
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.getElapsedTime();
    
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];
      
      // Create a wave effect using sine and cosine
      positions[i * 3 + 1] = Math.sin(x * 0.5 + time) * 0.5 + Math.cos(z * 0.3 + time) * 0.3;
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function ParticleWave() {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />
        <Particles />
      </Canvas>
    </div>
  );
}
