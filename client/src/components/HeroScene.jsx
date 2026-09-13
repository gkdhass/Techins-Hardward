import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// PCB Grid component
const PCBGrid = () => {
  const gridRef = useRef();
  const particlesRef = useRef();

  // Create grid lines
  const gridLines = useMemo(() => {
    const lines = [];
    const size = 20;
    const divisions = 40;
    const step = size / divisions;
    const halfSize = size / 2;

    for (let i = 0; i <= divisions; i++) {
      const pos = -halfSize + i * step;
      // Horizontal lines
      lines.push(
        new THREE.Vector3(-halfSize, 0, pos),
        new THREE.Vector3(halfSize, 0, pos)
      );
      // Vertical lines
      lines.push(
        new THREE.Vector3(pos, 0, -halfSize),
        new THREE.Vector3(pos, 0, halfSize)
      );
    }
    return lines;
  }, []);

  // Create particles
  const particles = useMemo(() => {
    const positions = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 20,
        Math.random() * 5,
        (Math.random() - 0.5) * 20
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Animate particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.01;
        if (positions[i] > 5) {
          positions[i] = 0;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Grid lines */}
      {gridLines.map((line, i) => {
        if (i % 2 === 0) {
          const nextLine = gridLines[i + 1];
          return (
            <line key={i}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    line.x,
                    line.y,
                    line.z,
                    nextLine.x,
                    nextLine.y,
                    nextLine.z,
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#3D2F1A" transparent opacity={0.3} />
            </line>
          );
        }
        return null;
      })}

      {/* Glowing particles - amber solder sparks */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#D4971E"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

// Floating hardware component
const FloatingComponent = ({ position, rotation, scale = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = rotation[0] + Math.sin(time * 0.3) * 0.1;
    meshRef.current.rotation.y = rotation[1] + Math.cos(time * 0.2) * 0.1;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 0.2, 1.5]} />
      <meshStandardMaterial
        color="#A97615"
        emissive="#D4971E"
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

// Main scene
const Scene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 3}
      />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#D4971E" />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#A97615" />

      <PCBGrid />

      {/* Floating hardware components */}
      <FloatingComponent position={[-3, 2, -2]} rotation={[0.2, 0.3, 0]} scale={0.8} />
      <FloatingComponent position={[3, 1.5, -1]} rotation={[0.1, -0.4, 0.1]} scale={0.6} />
      <FloatingComponent position={[0, 2.5, 1]} rotation={[0.3, 0, -0.2]} scale={0.7} />
      <FloatingComponent position={[-2, 1, 2]} rotation={[-0.1, 0.5, 0]} scale={0.5} />
    </>
  );
};

// Main component
const HeroScene = () => {
  return (
    <div className="hero-panel w-full h-[600px] bg-bg-base relative">
      <Canvas>
        <Scene />
      </Canvas>
      
      {/* Corner marks - amber */}
      <div className="absolute bottom-4 left-4 text-accent-primary text-2xl font-light">+</div>
      <div className="absolute bottom-4 right-4 text-accent-primary text-2xl font-light">+</div>
      
      {/* Scroll indicator */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
        <p className="eyebrow text-center">SCROLL TO EXPLORE</p>
      </div>
    </div>
  );
};

export default HeroScene;
