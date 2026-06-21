import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export const EconomicNode = ({ 
  node, 
  state, 
  isSelected, 
  onClick,
  scale = 1 
}) => {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(1);
  const targetGlow = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current || !glowRef.current) return;

    // Floating animation
    const time = Date.now() * 0.001;
    meshRef.current.position.y = node.position[1] + Math.sin(time + node.position[0]) * 0.05;

    // Hover và selection scale
    const baseScale = scale;
    const targetScaleValue = (hovered || isSelected) ? baseScale * 1.2 : baseScale;
    targetScale.current = THREE.MathUtils.lerp(targetScale.current, targetScaleValue, delta * 8);
    meshRef.current.scale.setScalar(targetScale.current);

    // Glow effect
    const targetGlowValue = (hovered || isSelected) ? 0.5 : 0.2;
    targetGlow.current = THREE.MathUtils.lerp(targetGlow.current, targetGlowValue, delta * 6);
    glowRef.current.material.opacity = targetGlow.current;

    // Pulse khi crisis cho node TP
    if (state === 'crisis' && node.id === 'TP') {
      glowRef.current.material.opacity = 0.1 + Math.sin(time * 3) * 0.05;
    }
  });

  const getNodeColor = () => {
    if (state === 'crisis' && node.id === 'TP') {
      return '#7a8a9f'; // Locked state
    }
    if (state === 'recovery' && node.id === 'TP') {
      return '#6ecd9a'; // Recovery state
    }
    return node.color;
  };

  return (
    <group position={node.position}>
      {/* Glow ring */}
      <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.45, 32]} />
        <meshBasicMaterial 
          color={getNodeColor()} 
          transparent 
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main node sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(node);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color={getNodeColor()}
          emissive={getNodeColor()}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Inner core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>

      {/* Label - HTML based */}
      <Html 
        position={[0, 0.5, 0]} 
        center 
        style={{ pointerEvents: 'none', transition: 'all 0.3s ease' }}
        zIndexRange={[100, 0]}
      >
        <div className={`node-3d-label ${isSelected ? 'active' : ''} ${state === 'crisis' && node.id === 'TP' ? 'locked' : ''}`}>
          <div className="label-connector"></div>
          <div className="label-content">
            <div className="label-key" style={{ color: getNodeColor() }}>{node.key}</div>
            {isSelected && <div className="label-title">{node.title}</div>}
          </div>
        </div>
      </Html>

      {/* Crisis indicator for TP */}
      {state === 'crisis' && node.id === 'TP' && (
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.28, 0.32, 32]} />
          <meshBasicMaterial color="#ff6e5c" transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
};
