import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const StakeholderNode = ({ stakeholder, state, onClick, index }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(1);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Floating (apply to the entire group so label floats too)
    const time = Date.now() * 0.001;
    groupRef.current.position.y = stakeholder.position[1] + Math.sin(time + index) * 0.1;

    // Scale
    const targetScaleValue = hovered ? 1.15 : 1;
    targetScale.current = THREE.MathUtils.lerp(targetScale.current, targetScaleValue, delta * 8);
    
    if (meshRef.current) {
      meshRef.current.scale.setScalar(targetScale.current);
    }
  });

  const isAffected = state === 'crisis' || state === 'ripple';

  return (
    <group position={stakeholder.position} ref={groupRef}>
      {/* Connection line to center */}
      {isAffected && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                0, 0, 0, // Local origin is the stakeholder
                -stakeholder.position[0], -stakeholder.position[1] + 0.5, -stakeholder.position[2] // Pointing to center
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ff6e5c" transparent opacity={0.3} />
        </line>
      )}

      {/* Node */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(stakeholder);
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
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial
          color={isAffected ? '#ff6e5c' : stakeholder.color}
          emissive={isAffected ? '#ff6e5c' : stakeholder.color}
          emissiveIntensity={isAffected ? 0.3 : 0.1}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      {/* Label */}
      <Html
        position={[0, -0.4, 0]}
        center
        distanceFactor={12}
        zIndexRange={[100, 0]}
        style={{
          pointerEvents: 'none',
          transition: 'all 0.2s',
          opacity: 1,
          transform: hovered ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        <div className={`node-3d-label active`}>
          <div className="label-connector" style={{ height: '20px' }}></div>
          <div className="label-content stakeholder-label-content">
            <div className="label-title" style={{ borderLeft: 'none', paddingLeft: 0, color: isAffected ? '#ff6e5c' : '#e8f0f8' }}>
              {stakeholder.title}
            </div>
          </div>
        </div>
      </Html>

      {/* Crisis indicator */}
      {isAffected && (
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[0.35, 0.4, 32]} />
          <meshBasicMaterial color="#ff6e5c" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

export const StakeholderOrbit = ({ stakeholders, state, onStakeholderClick }) => {
  return (
    <group>
      {stakeholders.map((stakeholder, index) => (
        <StakeholderNode
          key={stakeholder.id}
          stakeholder={stakeholder}
          state={state}
          onClick={onStakeholderClick}
          index={index}
        />
      ))}
    </group>
  );
};
