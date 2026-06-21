import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Building = ({ position, height, color, state, index, opacity = 1 }) => {
  const meshRef = useRef();
  const targetScale = useRef(1);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Floating animation nhẹ
    const time = Date.now() * 0.0003;
    meshRef.current.position.y = position[1] + height / 2 + Math.sin(time + index * 0.5) * 0.03;

    // Scale transition cho crisis
    const targetScaleValue = state === 'crisis' ? 0.95 : 1;
    targetScale.current = THREE.MathUtils.lerp(targetScale.current, targetScaleValue, delta * 2);
    meshRef.current.scale.setScalar(targetScale.current);
  });

  // Màu sắc thay đổi theo state
  const getColor = () => {
    switch (state) {
      case 'crisis':
        return '#7a8a9f';
      case 'recovery':
        return '#6ecd9a';
      default:
        return color;
    }
  };

  return (
    <group position={position}>
      {/* Base platform */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.2, 0.1, 1.2]} />
        <meshStandardMaterial color="#2a3a4a" transparent opacity={opacity} />
      </mesh>

      {/* Building structure */}
      <mesh ref={meshRef} position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[1, height, 1]} />
        <meshStandardMaterial 
          color={getColor()}
          roughness={0.7}
          metalness={0.2}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Window pattern */}
      {Array.from({ length: Math.floor(height / 0.4) }).map((_, i) => (
        <mesh key={i} position={[0.51, 0.3 + i * 0.4, 0]}>
          <planeGeometry args={[0.8, 0.15]} />
          <meshBasicMaterial 
            color={state === 'crisis' ? '#3a4a5a' : '#1a2a3a'}
            transparent
            opacity={0.6 * opacity}
          />
        </mesh>
      ))}

      {/* Edge wireframe */}
      <lineSegments position={[0, height / 2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1, height, 1)]} />
        <lineBasicMaterial 
          color={state === 'crisis' ? '#ff6e5c' : '#68cdd8'} 
          transparent
          opacity={0.3 * opacity}
        />
      </lineSegments>
    </group>
  );
};

export const BuildingCluster = ({ buildings, state, opacity = 1 }) => {
  return (
    <group>
      {buildings.map((building, index) => (
        <Building
          key={index}
          position={building.position}
          height={building.height}
          color="#c2a558"
          state={state}
          index={index}
          opacity={opacity}
        />
      ))}
    </group>
  );
};
