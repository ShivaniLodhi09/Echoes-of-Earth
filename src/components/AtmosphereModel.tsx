import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, useTexture, Cloud as DreiCloud } from '@react-three/drei';
import * as THREE from 'three';
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "./ui/button";

// Earth model component
function Earth() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={2}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        color="#2c7be5" 
        metalness={0.5}
        roughness={0.7}
      />
    </mesh>
  );
}

// Atmosphere visualization
function Atmosphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  return (
    <mesh ref={meshRef} scale={2.2}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#64b5f6" 
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

// Cloud particles system
function CloudSystem() {
  return (
    <>
      <DreiCloud position={[0, 0, 0]} opacity={0.5} speed={0.4} width={10} depth={1.5} segments={20} />
      <DreiCloud position={[4, 2, -6]} opacity={0.25} speed={0.3} width={8} depth={2} segments={15} />
      <DreiCloud position={[-4, -2, -5]} opacity={0.3} speed={0.5} width={7} depth={2} segments={15} />
    </>
  );
}

// Aerosol particles
function AerosolParticles() {
  const particlesRef = useRef<THREE.Points>(null!);
  const [particles, setParticles] = useState<Float32Array | null>(null);
  
  useEffect(() => {
    // Create particles
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Create particles in a spherical shell around Earth
      const radius = 2.3 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    setParticles(positions);
  }, []);
  
  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
    }
  });
  
  if (!particles) return null;
  
  return (
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
        size={0.05}
        color="#f5a742"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Atmospheric flow visualization
function AtmosphericFlows() {
  const flowsRef = useRef<THREE.Group>(null!);
  
  useFrame((state, delta) => {
    if (flowsRef.current) {
      flowsRef.current.rotation.y += delta * 0.1;
    }
  });
  
  return (
    <group ref={flowsRef}>
      {Array.from({ length: 20 }).map((_, i) => {
        const startAngle = (i / 20) * Math.PI * 2;
        const radius = 2.4;
        const height = -0.5 + Math.random() * 1;
        
        const points = [];
        for (let j = 0; j < 50; j++) {
          const angle = startAngle + (j / 50) * Math.PI;
          points.push(
            new THREE.Vector3(
              radius * Math.cos(angle),
              height + 0.2 * Math.sin(j / 10),
              radius * Math.sin(angle)
            )
          );
        }
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <primitive 
            key={i} 
            object={new THREE.Line(
              lineGeometry, 
              new THREE.LineBasicMaterial({ 
                color: "#4fc3f7", 
                transparent: true, 
                opacity: 0.7 
              })
            )} 
          />
        );
      })}
    </group>
  );
}

// Main scene component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <Earth />
      <Atmosphere />
      <CloudSystem />
      <AerosolParticles />
      <AtmosphericFlows />
      
      <Environment preset="sunset" />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </>
  );
}

interface AtmosphereModelProps {
  isOpen: boolean;
  onClose: () => void;
  datasetTitle: string;
}

export const AtmosphereModel = ({ isOpen, onClose, datasetTitle }: AtmosphereModelProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[1200px] translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-card p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-2xl font-bold">
              {datasetTitle}: Atmospheric Visualization
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </Dialog.Close>
          </div>
          
          <div className="h-[600px] w-full">
            <Canvas camera={{ position: [0, 0, 6], fov: 75 }} gl={{ antialias: true, alpha: true }}>
              <Scene />
            </Canvas>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>This 3D model visualizes MODIS & VIIRS data showing clouds, aerosols, and atmospheric flows that connect Earth's systems.</p>
            <p className="mt-2">Interact with the model by dragging to rotate, scrolling to zoom, and right-clicking to pan.</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};