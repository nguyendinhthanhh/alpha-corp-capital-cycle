import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { CapitalCityScene } from './CapitalCityScene';
import { prefersReducedMotion } from '../../utils/motion';
import * as THREE from 'three';

export const CapitalLabCanvas = ({
  nodes,
  paths,
  stakeholders,
  state,
  selectedNode,
  onNodeClick,
  onStakeholderClick,
  activeMission,
  mode = 'guided',
}) => {
  const [userInteracting, setUserInteracting] = useState(false);
  const controlsRef = useRef();
  const reducedMotion = prefersReducedMotion();

  const controlsEnabled = mode === 'explore';

  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 8, 16]}
        fov={50}
        near={0.1}
        far={100}
      />

      <Suspense fallback={null}>
        <CapitalCityScene
          nodes={nodes}
          paths={paths}
          stakeholders={stakeholders}
          state={state}
          selectedNode={selectedNode}
          onNodeClick={onNodeClick}
          onStakeholderClick={onStakeholderClick}
          activeMission={activeMission}
          controlsRef={controlsRef}
          userInteracting={userInteracting}
          mode={mode}
        />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        onStart={() => setUserInteracting(true)}
        onEnd={() => setUserInteracting(false)}
        enablePan={false}
        enableZoom={controlsEnabled}
        enableRotate={controlsEnabled}
        minDistance={5}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2.2}
        dampingFactor={0.08}
        enableDamping={!reducedMotion}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
      />
    </Canvas>
  );
};
