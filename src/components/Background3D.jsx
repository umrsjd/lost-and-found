import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Float, Stars } from '@react-three/drei';

function FloatingObject({ position, scale, rotation }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x += rotation[0];
    meshRef.current.rotation.y += rotation[1];
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={1.5}
      floatIntensity={2}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry />
        <meshStandardMaterial color="#FFFFFF" wireframe />
      </mesh>
    </Float>
  );
}

export default function Background3D() {
  return (
    <Canvas style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars count={1000} depth={50} fade speed={1.5} />
      
      <FloatingObject position={[-4, 2, -5]} scale={1} rotation={[0.001, 0.002, 0]} />
      <FloatingObject position={[4, -2, -5]} scale={0.8} rotation={[0.002, -0.001, 0]} />
      <FloatingObject position={[0, 3, -5]} scale={1.2} rotation={[-0.001, 0.002, 0]} />
    </Canvas>
  );
}