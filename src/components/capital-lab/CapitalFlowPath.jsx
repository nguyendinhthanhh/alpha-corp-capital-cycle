import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FlowLine = ({ from, to, color, state, isCritical, isSecondary, delayOffset = 0 }) => {
  const pulseRef = useRef();
  const currentSpeed = useRef(1);
  const progress = useRef(delayOffset);

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
  const positionArray = useMemo(
    () => new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])),
    [points]
  );

  // Arrowhead orientation: tangent at end of curve
  const arrowData = useMemo(() => {
    const endPt = curve.getPoint(1);
    const tangent = curve.getTangent(1).normalize();
    const quat = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    quat.setFromUnitVectors(up, tangent);
    return { position: endPt, quaternion: quat };
  }, [curve]);

  // Crisis X marker position
  const crisisPoint = useMemo(() => curve.getPoint(0.85), [curve]);

  useFrame((_, delta) => {
    if (!pulseRef.current) return;

    const baseSpeed = 0.5;

    // Signature Moment 3: Freeze H' -> T'
    if (state === 'crisis' && isCritical) {
      currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, 0, delta * 3);
    } else {
      currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, 1, delta * 3);
    }

    progress.current += delta * baseSpeed * currentSpeed.current;
    
    if (state === 'crisis' && isCritical && progress.current >= 0.85) {
      progress.current = 0.85;
    } else if (progress.current > 1) {
      progress.current = progress.current % 1;
    }

    const pos = curve.getPoint(progress.current);

    // Add shake effect when slowing down in crisis
    if (state === 'crisis' && isCritical && currentSpeed.current < 0.6 && progress.current >= 0.8) {
       const shakeAmount = (0.6 - currentSpeed.current) * 0.15;
       pos.x += (Math.random() - 0.5) * shakeAmount;
       pos.y += (Math.random() - 0.5) * shakeAmount;
       pos.z += (Math.random() - 0.5) * shakeAmount;
    }

    pulseRef.current.position.copy(pos);
  });

  const lineOpacity = state === 'crisis' && isCritical ? 0.2 : isSecondary ? 0.2 : 0.5;
  const pulseOpacity = state === 'crisis' && isCritical ? 0.7 : 0.8;
  const lineColor = state === 'crisis' && isCritical ? '#ff6e5c' : color;

  return (
    <group>
      {/* Flow line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={positionArray}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={lineOpacity}
          linewidth={2}
        />
      </line>

      {/* Pulse sphere */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={pulseOpacity} />
      </mesh>

      {/* Arrowhead cone at end of path */}
      <mesh position={arrowData.position} quaternion={arrowData.quaternion}>
        <coneGeometry args={[0.06, 0.18, 8]} />
        <meshStandardMaterial
          color={lineColor}
          emissive={lineColor}
          emissiveIntensity={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Crisis X marker on critical path */}
      {state === 'crisis' && isCritical && (
        <group position={crisisPoint}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.22, 0.04, 0.04]} />
            <meshBasicMaterial color="#ff6e5c" transparent opacity={0.8} />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.22, 0.04, 0.04]} />
            <meshBasicMaterial color="#ff6e5c" transparent opacity={0.8} />
          </mesh>
        </group>
      )}
    </group>
  );
};

export const CapitalFlowPath = ({ paths, nodes, state, visibleNodes }) => {
  // Signature Moment 1: Capital Split (T -> H)
  // Define 4 offsets matching the InputsNode boxes
  const inputOffsets = [
    [0, 0, 0.3],
    [0.3, 0, 0],
    [0, 0, -0.3],
    [-0.3, 0, 0],
  ];

  return (
    <group>
      {paths.map((path, index) => {
        const fromNode = nodes.find((n) => n.id === path.from);
        const toNode = nodes.find((n) => n.id === path.to);

        if (!fromNode || !toNode) return null;

        // Only render if both endpoints are in visibleNodes
        if (
          visibleNodes &&
          (!visibleNodes.includes(path.from) || !visibleNodes.includes(path.to))
        ) {
          return null;
        }

        // Apply Capital Split if path is T -> H
        if (path.from === 'T' && path.to === 'H') {
          return (
            <group key={`split-${index}`}>
              {inputOffsets.map((offset, i) => (
                <FlowLine
                  key={`split-${index}-${i}`}
                  from={fromNode.position}
                  to={[
                    toNode.position[0] + offset[0],
                    toNode.position[1] + offset[1],
                    toNode.position[2] + offset[2]
                  ]}
                  color="#c2a558"
                  state={state}
                  isCritical={path.critical}
                  isSecondary={path.secondary}
                  delayOffset={i * 0.25} // Stagger pulses
                />
              ))}
            </group>
          );
        }

        return (
          <FlowLine
            key={index}
            from={fromNode.position}
            to={toNode.position}
            color="#c2a558"
            state={state}
            isCritical={path.critical}
            isSecondary={path.secondary}
            delayOffset={0}
          />
        );
      })}
    </group>
  );
};
