import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface RocketEntryProps {
  onAnimationComplete: () => void;
  // This prop will be used to track the rocket's progress (0 to 1)
  onProgressUpdate: (progress: number) => void;
}

// 3D Scene Controller
const RocketScene: React.FC<RocketEntryProps> = ({ onAnimationComplete, onProgressUpdate }) => {
  // NOTE: Ensure your 'rocket-astronaut.glb' file is in your public folder.
  const gltf = useGLTF('/rocket-astronaut.glb');
  const rocketRef = useRef<THREE.Group>(null!);
  
  const startTime = useRef(performance.now());
  const animationDuration = 2.5; // Duration in seconds for the rocket travel

  // Adjust initial scene setup and scaling if necessary
  useEffect(() => {
    if (rocketRef.current) {
        rocketRef.current.scale.set(0.08, 0.08, 0.08); // Adjust scale as needed for your model size
        rocketRef.current.rotation.y = -Math.PI / 2; // Point the rocket right (assuming it faces +Z normally)
    }
  }, []);

  useFrame(() => {
    if (!rocketRef.current) return;

    const elapsed = (performance.now() - startTime.current) / 1000;
    let progress = Math.min(elapsed / animationDuration, 1);

    // Rocket starts far left (e.g., X: -10) and moves right (e.g., X: 0)
    const startX = -10;
    const endX = 0; 
    
    rocketRef.current.position.x = startX + (endX - startX) * progress;
    
    // Slight vertical bobbing/floating motion during travel
    rocketRef.current.position.y = Math.sin(elapsed * 5) * 0.1 + 0.5;

    // Report progress back to the parent to control the page drag
    onProgressUpdate(progress);

    if (progress >= 1) {
      onAnimationComplete();
      // Optional: Stop further movement or animation updates here if needed
    }
  });

  return (
    <>
      <primitive object={gltf.scene} ref={rocketRef} />
      
      {/* Lighting and Environment */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="night" />
    </>
  );
};

// Main Canvas Wrapper
const RocketEntry: React.FC<RocketEntryProps> = (props) => {
    return (
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
            <Canvas camera={{ position: [0, 10, -35], fov: 50 }}>
                <RocketScene {...props} />
            </Canvas>
        </div>
    );
};

useGLTF.preload('/rocket-astronaut.glb');
export default RocketEntry;