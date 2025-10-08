import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Earth model component
function Earth(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={hovered ? 2.1 : 2}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        color={hovered ? '#4da6ff' : '#2c7be5'} 
        metalness={0.5}
        roughness={0.7}
      />
    </mesh>
  );
}

// Ocean data visualization component
function OceanData(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={2.1}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#1e88e5" 
        wireframe 
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

// Atmosphere visualization
function Atmosphere(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={2.2}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#64b5f6" 
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

// Main WebXR Scene component
export default function WebXRScene() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <Earth position={[0, 0, 0]} />
        <OceanData position={[0, 0, 0]} />
        <Atmosphere position={[0, 0, 0]} />
        
        <Environment preset="sunset" />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>
    </div>
  );
}