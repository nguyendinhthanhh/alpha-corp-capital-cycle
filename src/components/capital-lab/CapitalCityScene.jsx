import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Grid, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { BuildingCluster } from './BuildingCluster';
import { EconomicNode } from './EconomicNode';
import { CapitalFlowPath } from './CapitalFlowPath';
import { StakeholderOrbit } from './StakeholderOrbit';
import { buildingData, labChapters } from '../../data/capitalLabData';

export const CapitalCityScene = ({ 
  nodes, 
  paths, 
  stakeholders,
  state, 
  selectedNode,
  onNodeClick,
  onStakeholderClick,
  activeChapter,
  controlsRef,
  userInteracting,
  mode
}) => {
  const { camera } = useThree();

  // Camera animation based on chapter
  useEffect(() => {
    if (userInteracting || mode === 'explore') return;

    // Find current chapter config
    const currentChapterData = labChapters.find(ch => ch.id === activeChapter);
    if (!currentChapterData) return;

    const config = {
      position: currentChapterData.cameraPosition,
      target: currentChapterData.cameraTarget
    };

    gsap.to(camera.position, {
      x: config.position[0],
      y: config.position[1],
      z: config.position[2],
      duration: 1.2,
      ease: 'power2.inOut',
      overwrite: 'auto'
    });

    if (controlsRef?.current) {
      gsap.to(controlsRef.current.target, {
        x: config.target[0],
        y: config.target[1],
        z: config.target[2],
        duration: 1.2,
        ease: 'power2.inOut',
        overwrite: 'auto',
        onUpdate: () => controlsRef.current.update()
      });
    }
  }, [activeChapter, camera, controlsRef, mode, userInteracting]);

  // Buildings data
  const buildings = buildingData.positions.map((pos, i) => ({
    position: pos,
    height: buildingData.heights[i]
  }));

  // Progressive reveal based on chapter
  const getVisibleNodes = () => {
    const chapterVisibility = {
      'intro': ['T'],
      'inputs': ['T', 'H'],
      'production': ['T', 'H', 'SX'],
      'commodity': ['T', 'H', 'SX', 'HP'],
      'return': ['T', 'H', 'SX', 'HP', 'TP'],
      'shock': ['T', 'H', 'SX', 'HP', 'TP'],
      'crisis': ['T', 'H', 'SX', 'HP', 'TP'],
      'ripple': ['T', 'H', 'SX', 'HP', 'TP'],
      'recovery': ['T', 'H', 'SX', 'HP', 'TP']
    };
    
    return chapterVisibility[activeChapter] || ['T', 'H', 'SX', 'HP', 'TP'];
  };

  const visibleNodeIds = getVisibleNodes();
  const visibleNodes = nodes.filter(node => visibleNodeIds.includes(node.id));

  // Buildings opacity based on chapter
  const getBuildingOpacity = () => {
    if (activeChapter === 'intro' || activeChapter === 'inputs') return 0.02; // Very faint
    if (activeChapter === 'production') return 0.15;
    return 1;
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={0.8} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <hemisphereLight intensity={0.3} groundColor="#1a2a3a" />

      {/* Environment */}
      <Environment preset="night" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial 
          color="#1a2530" 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Grid */}
      <Grid
        position={[0, 0.01, 0]}
        args={[40, 40]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#2a3a4a"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#3a4a5a"
        fadeDistance={30}
        fadeStrength={1}
        infiniteGrid={false}
      />

      {/* Blueprint lines - representing project site */}
      <lineSegments position={[0, 0.02, 0]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(16, 12)]} />
        <lineBasicMaterial color="#68cdd8" transparent opacity={0.15} />
      </lineSegments>

      {/* Buildings - with dynamic opacity */}
      <group opacity={getBuildingOpacity()}>
        <BuildingCluster buildings={buildings} state={state} opacity={getBuildingOpacity()} />
      </group>

      {/* Economic Nodes - progressive reveal */}
      {visibleNodes.map((node) => (
        <EconomicNode
          key={node.id}
          node={node}
          state={state}
          isSelected={selectedNode?.id === node.id}
          onClick={onNodeClick}
        />
      ))}

      {/* Capital Flow Paths */}
      <CapitalFlowPath paths={paths} nodes={visibleNodes} state={state} />

      {/* Stakeholders */}
      {(activeChapter === 'ripple' || activeChapter === 'recovery') && (
        <StakeholderOrbit 
          stakeholders={stakeholders} 
          state={state}
          onStakeholderClick={onStakeholderClick}
        />
      )}

      {/* Fog */}
      <fog attach="fog" args={['#0f131c', 20, 45]} />
    </>
  );
};
