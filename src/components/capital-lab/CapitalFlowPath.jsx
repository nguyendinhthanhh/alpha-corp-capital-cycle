import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FlowLine = ({ from, to, color, state, isCritical, isSecondary }) => {
  const lineRef = useRef();
  const pulseRef = useRef();

  const curve = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const mid = new THREE.Vector3(
      (start.x + end.x) / 2,
      Math.max(start.y, end.y) + 0.8,
      (start.z + end.z) / 2
    );
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [from, to]);

  const points = useMemo(() => curve.getPoints(50), [curve]);

  useFrame(() => {
    if (!pulseRef.current) return;

    const time = Date.now() * 0.001;
    
    // Pulse animation
    if (state !== 'crisis' || !isCritical) {
      const offset = (time % 2) / 2;
      pulseRef.current.position.copy(curve.getPoint(offset));
    } else {
      // Stop at critical point during crisis
      pulseRef.current.position.copy(curve.getPoint(0.85));
    }
  });

  const getLineOpacity = () => {
    if (state === 'crisis' && isCritical) return 0.2;
    if (isSecondary) return 0.15;
    return 0.4;
  };

  const getPulseOpacity = () => {
    if (state === 'crisis' && isCritical) return 0;
    return 0.8;
  };

  return (
    <group>
      {/* Flow line */}
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={state === 'crisis' && isCritical ? '#ff6e5c' : color}
          transparent
          opacity={getLineOpacity()}
          linewidth={2}
        />
      </line>

      {/* Pulse indicator */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={getPulseOpacity()}
        />
      </mesh>

      {/* Critical bottleneck indicator */}
      {state === 'crisis' && isCritical && (
        <mesh position={curve.getPoint(0.85)}>
          <ringGeometry args={[0.15, 0.2, 32]} />
          <meshBasicMaterial color="#ff6e5c" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

export const CapitalFlowPath = ({ paths, nodes, state }) => {
  return (
    <group>
      {paths.map((path, index) => {
        const fromNode = nodes.find(n => n.id === path.from);
        const toNode = nodes.find(n => n.id === path.to);
        
        if (!fromNode || !toNode) return null;

        return (
          <FlowLine
            key={index}
            from={fromNode.position}
            to={toNode.position}
            color="#c2a558"
            state={state}
            isCritical={path.critical}
            isSecondary={path.secondary}
          />
        );
      })}
    </group>
  );
};
