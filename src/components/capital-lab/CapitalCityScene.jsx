import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Grid, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { BuildingCluster } from './BuildingCluster';
import { EconomicNode } from './EconomicNode';
import { CapitalFlowPath } from './CapitalFlowPath';
import { StakeholderOrbit } from './StakeholderOrbit';
import { buildingData, labMissions } from '../../data/capitalLabData';

/* ─── Zone platform component ─── */
const ZonePlatform = ({ position, size, color, label }) => (
  <group position={position}>
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={size} />
      <meshBasicMaterial color={color} transparent opacity={0.06} side={THREE.DoubleSide} />
    </mesh>
    {/* Zone border */}
    <lineSegments rotation={[-Math.PI / 2, 0, 0]}>
      <edgesGeometry args={[new THREE.PlaneGeometry(...size)]} />
      <lineBasicMaterial color={color} transparent opacity={0.12} />
    </lineSegments>
    {/* Zone label */}
    <Html
      position={[0, 0, size[1] / 2 + 0.4]}
      center
      style={{ pointerEvents: 'none' }}
      zIndexRange={[50, 0]}
    >
      <div
        style={{
          color,
          opacity: 0.35,
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-mono, monospace)',
        }}
      >
        {label}
      </div>
    </Html>
  </group>
);

export const CapitalCityScene = ({
  nodes,
  paths,
  stakeholders,
  state,
  selectedNode,
  onNodeClick,
  onStakeholderClick,
  activeMission,
  controlsRef,
  userInteracting,
  mode,
}) => {
  const { camera } = useThree();

  // ─── Camera animation based on mission ───
  useEffect(() => {
    if (userInteracting || mode === 'explore') return;

    const currentMission = labMissions.find((m) => m.id === activeMission);
    if (!currentMission) return;

    const pos = currentMission.cameraPosition;
    const tgt = currentMission.cameraTarget;

    gsap.to(camera.position, {
      x: pos[0],
      y: pos[1],
      z: pos[2],
      duration: 1.2,
      ease: 'power2.inOut',
      overwrite: 'auto',
    });

    if (controlsRef?.current) {
      gsap.to(controlsRef.current.target, {
        x: tgt[0],
        y: tgt[1],
        z: tgt[2],
        duration: 1.2,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onUpdate: () => controlsRef.current.update(),
      });
    }
  }, [activeMission, camera, controlsRef, mode, userInteracting]);

  // ─── Buildings data ───
  const buildings = useMemo(
    () =>
      buildingData.positions.map((pos, i) => ({
        position: pos,
        height: buildingData.heights[i],
      })),
    []
  );

  // ─── Progressive reveal based on mission ───
  const visibleNodeIds = useMemo(() => {
    const mission = labMissions.find((m) => m.id === activeMission);
    return mission?.visibleNodes || ['T', 'H', 'SX', 'HP', 'TP'];
  }, [activeMission]);

  // ─── Building opacity based on mission progress ───
  const getBuildingOpacity = () => {
    switch (activeMission) {
      case 'source':
      case 'inputs':
        return 0.02;
      case 'production':
        return 0.15;
      default:
        return 1;
    }
  };

  // ─── Stakeholder visibility ───
  const showStakeholders =
    activeMission === 'crisis' || activeMission === 'recovery';

  return (
    <>
      {/* ─── Lighting (manual only, no Environment) ─── */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={0.7}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={40}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <hemisphereLight
        intensity={0.2}
        color="#ffffff"
        groundColor="#1a2a3a"
      />

      {/* ─── Ground plane ─── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#141c24" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* ─── Grid ─── */}
      <Grid
        position={[0, 0.01, 0]}
        args={[50, 50]}
        cellSize={2}
        cellThickness={0.4}
        cellColor="#1e2a34"
        sectionSize={10}
        sectionThickness={0.6}
        sectionColor="#253545"
        fadeDistance={35}
        fadeStrength={1.2}
        infiniteGrid={false}
      />

      {/* ─── Zone platforms ─── */}
      <ZonePlatform
        position={[-6, 0.02, 0]}
        size={[8, 6]}
        color="#68cdd8"
        label="Source Zone"
      />
      <ZonePlatform
        position={[0, 0.02, 0]}
        size={[6, 6]}
        color="#5a7ea5"
        label="Production Zone"
      />
      <ZonePlatform
        position={[7, 0.02, 0]}
        size={[8, 6]}
        color="#c2a558"
        label="Realization Zone"
      />

      {/* ─── Buildings ─── */}
      <BuildingCluster
        buildings={buildings}
        state={state}
        opacity={getBuildingOpacity()}
        activeMission={activeMission}
      />

      {/* ─── Economic Nodes (progressive reveal) ─── */}
      {nodes.map((node) => (
        <EconomicNode
          key={node.id}
          node={node}
          state={state}
          isSelected={selectedNode?.id === node.id}
          onClick={onNodeClick}
          isVisible={visibleNodeIds.includes(node.id)}
        />
      ))}

      {/* ─── Capital Flow Paths ─── */}
      <CapitalFlowPath
        paths={paths}
        nodes={nodes}
        state={state}
        visibleNodes={visibleNodeIds}
      />

      {/* ─── Stakeholders ─── */}
      {showStakeholders && (
        <StakeholderOrbit
          stakeholders={stakeholders}
          state={state}
          onStakeholderClick={onStakeholderClick}
        />
      )}

      {/* ─── Fog ─── */}
      <fog attach="fog" args={['#0f131c', 25, 50]} />
    </>
  );
};
