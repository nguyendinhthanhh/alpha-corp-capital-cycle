import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Sub-components for each nodeType ─── */

const CurrencyNode = ({ nodeRef, hovered }) => {
  const outerRef = useRef();
  const middleRef = useRef();
  const innerRef = useRef();

  useFrame(() => {
    const t = Date.now() * 0.001;
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.3;
      outerRef.current.rotation.y = t * 0.2;
    }
    if (middleRef.current) {
      middleRef.current.rotation.x = t * 0.4;
      middleRef.current.rotation.z = t * 0.25;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.5;
      innerRef.current.rotation.z = t * 0.3;
    }
  });

  const glowIntensity = hovered ? 0.4 : 0.15;

  return (
    <group ref={nodeRef}>
      {/* Outer ring */}
      <mesh ref={outerRef}>
        <torusGeometry args={[0.4, 0.04, 16, 32]} />
        <meshStandardMaterial
          color="#c2a558"
          emissive="#c2a558"
          emissiveIntensity={glowIntensity}
          roughness={0.3}
          metalness={0.7}
          transparent
        />
      </mesh>
      {/* Middle ring */}
      <mesh ref={middleRef}>
        <torusGeometry args={[0.3, 0.035, 16, 32]} />
        <meshStandardMaterial
          color="#68cdd8"
          emissive="#68cdd8"
          emissiveIntensity={glowIntensity}
          roughness={0.3}
          metalness={0.6}
          transparent
        />
      </mesh>
      {/* Inner ring */}
      <mesh ref={innerRef}>
        <torusGeometry args={[0.2, 0.03, 16, 32]} />
        <meshStandardMaterial
          color="#c2a558"
          emissive="#c2a558"
          emissiveIntensity={glowIntensity}
          roughness={0.3}
          metalness={0.7}
          transparent
        />
      </mesh>
    </group>
  );
};

const InputsNode = ({ nodeRef, hovered }) => {
  const orbitRef = useRef();
  const colors = ['#8B6F47', '#708090', '#D2691E', '#4682B4'];
  const offsets = [
    [0, 0, 0.3],
    [0.3, 0, 0],
    [0, 0, -0.3],
    [-0.3, 0, 0],
  ];

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = Date.now() * 0.0003;
    }
  });

  return (
    <group ref={nodeRef}>
      <group ref={orbitRef}>
        {offsets.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.15, 0.15, 0.15]} />
            <meshStandardMaterial
              color={colors[i]}
              emissive={colors[i]}
              emissiveIntensity={hovered ? 0.3 : 0.1}
              roughness={0.5}
              metalness={0.4}
              transparent
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const ProductionNode = ({ nodeRef }) => {
  const craneGeom = useMemo(() => {
    const pts = [];
    // Vertical pole
    pts.push(new THREE.Vector3(0, 0.05, 0));
    pts.push(new THREE.Vector3(0, 0.7, 0));
    // Horizontal arm
    pts.push(new THREE.Vector3(0, 0.7, 0));
    pts.push(new THREE.Vector3(0.5, 0.7, 0));
    // Cable
    pts.push(new THREE.Vector3(0.5, 0.7, 0));
    pts.push(new THREE.Vector3(0.5, 0.35, 0));

    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(pts.flatMap(p => [p.x, p.y, p.z]));
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, []);

  return (
    <group ref={nodeRef}>
      {/* Hexagonal platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 6]} />
        <meshStandardMaterial
          color="#5a7ea5"
          emissive="#5a7ea5"
          emissiveIntensity={0.1}
          roughness={0.5}
          metalness={0.4}
          transparent
        />
      </mesh>
      {/* Platform edges */}
      <lineSegments rotation={[-Math.PI / 2, 0, 0]}>
        <edgesGeometry args={[new THREE.CylinderGeometry(0.5, 0.5, 0.1, 6)]} />
        <lineBasicMaterial color="#68cdd8" transparent opacity={0.4} />
      </lineSegments>
      {/* Crane */}
      <lineSegments geometry={craneGeom}>
        <lineBasicMaterial color="#c2a558" transparent opacity={0.7} />
      </lineSegments>
    </group>
  );
};

const GatewayNode = ({ nodeRef, state, hovered }) => {
  const torusRef = useRef();

  useFrame(() => {
    if (!torusRef.current) return;
    if (state !== 'crisis') {
      torusRef.current.rotation.y += 0.008;
    }
  });

  const color = state === 'crisis' ? '#ff6e5c' : state === 'recovery' ? '#6ecd9a' : '#6ecd9a';

  return (
    <group ref={nodeRef}>
      <mesh ref={torusRef}>
        <torusGeometry args={[0.5, 0.06, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.4 : 0.15}
          roughness={0.3}
          metalness={0.6}
          transparent
        />
      </mesh>
    </group>
  );
};

/* ─── Main EconomicNode ─── */

export const EconomicNode = ({
  node,
  state,
  isSelected,
  onClick,
  isVisible = true,
  scale: scaleProp = 1,
}) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const currentScale = useRef(scaleProp);
  const currentOpacity = useRef(isVisible ? 1 : 0);

  // For commodity type, just render a small marker dot — BuildingCluster handles the visual
  const isCommodity = node.nodeType === 'commodity';

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Floating
    const t = Date.now() * 0.001;
    groupRef.current.position.y = node.position[1] + Math.sin(t + node.position[0]) * 0.05;

    // Smooth scale
    const targetS = (hovered || isSelected) ? scaleProp * 1.15 : scaleProp;
    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetS, delta * 8);
    groupRef.current.scale.setScalar(currentScale.current);

    // Smooth opacity
    const targetOp = isVisible ? 1 : 0;
    currentOpacity.current = THREE.MathUtils.lerp(currentOpacity.current, targetOp, delta * 4);

    // Apply opacity to all materials in the subtree
    groupRef.current.traverse((child) => {
      if (child.material && child.material.opacity !== undefined) {
        child.material.opacity = currentOpacity.current * (child.material.userData?.baseOpacity ?? 1);
      }
    });
  });

  const getNodeColor = () => {
    if (state === 'crisis' && node.id === 'TP') return '#7a8a9f';
    if (state === 'recovery' && node.id === 'TP') return '#6ecd9a';
    return node.color;
  };

  const renderShape = () => {
    switch (node.nodeType) {
      case 'currency':
        return <CurrencyNode nodeRef={meshRef} hovered={hovered} state={state} />;
      case 'inputs':
        return <InputsNode nodeRef={meshRef} hovered={hovered} />;
      case 'production':
        return <ProductionNode nodeRef={meshRef} />;
      case 'commodity':
        return null; // BuildingCluster handles visual
      case 'gateway':
        return <GatewayNode nodeRef={meshRef} state={state} hovered={hovered} />;
      default:
        return null;
    }
  };

  return (
    <group position={node.position}>
      <group
        ref={groupRef}
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
        {renderShape()}

        {/* Small marker dot for commodity so it remains clickable */}
        {isCommodity && (
          <mesh>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshBasicMaterial color={getNodeColor()} transparent opacity={0.5} />
          </mesh>
        )}
      </group>

      {/* Label */}
      <Html
        position={[0, 0.6, 0]}
        center
        style={{
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          opacity: isVisible ? 1 : 0,
        }}
        zIndexRange={[100, 0]}
      >
        <div
          className={`node-3d-label ${isSelected ? 'active' : ''} ${
            state === 'crisis' && node.id === 'TP' ? 'locked' : ''
          }`}
        >
          <div className="label-connector"></div>
          <div className="label-content">
            <div className="label-key" style={{ color: getNodeColor() }}>
              {node.key}
            </div>
            {isSelected && <div className="label-title">{node.title}</div>}
          </div>
        </div>
      </Html>
    </group>
  );
};
