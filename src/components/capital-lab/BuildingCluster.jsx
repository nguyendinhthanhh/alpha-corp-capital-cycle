import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PLATFORM_COLOR = '#2a3540';
const STRUCTURE_COLOR = '#b8a46a';
const CRISIS_COLOR = '#7a8a9f';
const RECOVERY_COLOR = '#6ecd9a';

const Building = ({ position, height, state, index, opacity = 1, activeMission }) => {
  const groupRef = useRef();
  const targetScale = useRef(1);
  const buildProgress = useRef(0);
  const floorsRef = useRef([]);

  const floorCount = Math.floor(height / 0.4);

  // Pre-compute floor slab edges geometry
  const floorEdgesGeom = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.9, 0.12, 0.9)),
    []
  );

  // Determine if towers should be building/built
  const shouldBuild = ['production', 'commodity', 'crisis', 'recovery'].includes(activeMission);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Very subtle float
    const t = Date.now() * 0.0003;
    groupRef.current.position.y = position[1] + Math.sin(t + index * 0.5) * 0.02;

    // Scale transition for crisis
    const targetS = state === 'crisis' ? 0.95 : 1;
    targetScale.current = THREE.MathUtils.lerp(targetScale.current, targetS, delta * 2);
    groupRef.current.scale.setScalar(targetScale.current);

    // Sequential build animation (Signature Moment 2)
    const targetProgress = shouldBuild ? 1 : 0;
    const buildSpeed = shouldBuild ? 0.6 : 2; 
    buildProgress.current = THREE.MathUtils.lerp(buildProgress.current, targetProgress, delta * buildSpeed);

    // Apply scale to each floor based on buildProgress
    floorsRef.current.forEach((floorGroup, i) => {
      if (!floorGroup) return;
      const floorStart = i / floorCount;
      const floorEnd = (i + 1) / floorCount;
      
      let floorScale;
      if (buildProgress.current >= floorEnd) {
        floorScale = 1;
      } else if (buildProgress.current <= floorStart) {
        floorScale = 0;
      } else {
        // Interpolate between 0 and 1
        floorScale = (buildProgress.current - floorStart) / (floorEnd - floorStart);
        // Add a slight bounce effect
        const s = 1.70158;
        const p = floorScale;
        floorScale = (p - 1) * (p - 1) * ((s + 1) * (p - 1) + s) + 1; 
      }
      
      floorScale = Math.max(0.001, floorScale);
      floorGroup.scale.setScalar(floorScale);
      floorGroup.visible = floorScale > 0.01;
    });
  });

  const getStructureColor = () => {
    switch (state) {
      case 'crisis': return CRISIS_COLOR;
      case 'recovery': return RECOVERY_COLOR;
      default: return STRUCTURE_COLOR;
    }
  };

  const structureColor = getStructureColor();
  const edgeColor = state === 'crisis' ? '#ff6e5c' : '#68cdd8';

  return (
    <group position={position}>
      <group ref={groupRef}>
        {/* Base platform */}
        <mesh position={[0, 0.075, 0]} receiveShadow>
          <boxGeometry args={[1.4, 0.15, 1.4]} />
          <meshStandardMaterial
            color={PLATFORM_COLOR}
            roughness={0.8}
            metalness={0.2}
            transparent
            opacity={opacity}
          />
        </mesh>

        {/* Stacked floor slabs */}
        {Array.from({ length: floorCount }).map((_, i) => {
          const floorY = 0.15 + 0.12 / 2 + i * 0.4;
          return (
            <group 
              key={`floor-${i}`} 
              position={[0, floorY, 0]}
              ref={el => floorsRef.current[i] = el}
            >
              {/* Floor slab */}
              <mesh castShadow>
                <boxGeometry args={[0.9, 0.12, 0.9]} />
                <meshStandardMaterial
                  color={structureColor}
                  roughness={0.6}
                  metalness={0.3}
                  transparent
                  opacity={opacity}
                />
              </mesh>
              {/* Floor wireframe */}
              <lineSegments geometry={floorEdgesGeom}>
                <lineBasicMaterial
                  color={edgeColor}
                  transparent
                  opacity={0.25 * opacity}
                />
              </lineSegments>
            </group>
          );
        })}

        {/* Corner columns */}
        {[
          [-0.4, 0, -0.4],
          [0.4, 0, -0.4],
          [-0.4, 0, 0.4],
          [0.4, 0, 0.4],
        ].map((corner, ci) => {
          const colHeight = 0.15 + floorCount * 0.4;
          return (
            <mesh
              key={`col-${ci}`}
              position={[corner[0], colHeight / 2, corner[2]]}
              castShadow
            >
              <boxGeometry args={[0.05, colHeight, 0.05]} />
              <meshStandardMaterial
                color={structureColor}
                roughness={0.5}
                metalness={0.4}
                transparent
                opacity={opacity * 0.8}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

export const BuildingCluster = ({ buildings, state, opacity = 1, activeMission }) => {
  return (
    <group>
      {buildings.map((building, index) => (
        <Building
          key={index}
          position={building.position}
          height={building.height}
          state={state}
          index={index}
          opacity={opacity}
          activeMission={activeMission}
        />
      ))}
    </group>
  );
};
