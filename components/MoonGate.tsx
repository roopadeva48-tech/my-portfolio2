import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stars, Html, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Define the type for the MoonGate component props
interface MoonGateProps {
  onMoonClick: () => void;
}

// Helper component for the Astronaut model and dialogue logic
const AstronautScene: React.FC<MoonGateProps> = ({ onMoonClick }) => {
  // Load the GLB model from the assets directory.
  // NOTE: Ensure your 'astronaut.png' is correctly mapped as a texture if needed, 
  // or that 'astronaut.glb' is in a public folder accessible via the root path.
  const gltf = useGLTF('/astronaut.glb');
  const astronautRef = useRef<THREE.Group>(null!);
  const moonRef = useRef<THREE.Mesh>(null!);
  
  const [dialogue, setDialogue] = useState<string>("Where is it?");
  const [astronautState, setAstronautState] = useState<'hiding' | 'moving' | 'idle'>('hiding');
  const [isHoveringMoon, setIsHoveringMoon] = useState(false);

  // --- Animation and State Logic ---
  useEffect(() => {
    // Initial text display
    const timer1 = setTimeout(() => {
      setAstronautState('moving');
    }, 2000); // 2 seconds delay for "Where is it?"

    // Astronaut dialogue progression
    const timer2 = setTimeout(() => {
        if (astronautRef.current) {
            astronautRef.current.rotation.y = Math.PI / 4; // Face the user
        }
        setDialogue("Can I help you...");
    }, 4500);

    const timer3 = setTimeout(() => {
        setDialogue("It's behind the moon!");
        setAstronautState('idle');
    }, 7000);

    return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
    };
  }, []);

  // Frame-based animation logic
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Floating animation for the astronaut
    if (astronautRef.current) {
      astronautRef.current.position.y = 0.5 + Math.sin(t * 1.5) * 0.1;
      astronautRef.current.rotation.z = Math.cos(t * 1.5) * 0.05;

      // Astronaut movement from left bottom behind sidebar (approx X:-3, Y:-1) to center (X:0, Y:0)
      if (astronautState === 'moving') {
        const targetX = 0;
        const targetY = 0.5;
        const speed = 0.01;
        
        astronautRef.current.position.x += (targetX - astronautRef.current.position.x) * speed;
        astronautRef.current.position.y += (targetY - astronautRef.current.position.y) * speed;

        // Check if movement is complete
        if (astronautRef.current.position.distanceTo(new THREE.Vector3(targetX, targetY, 0)) < 0.1) {
          setAstronautState('idle');
        }
      }
    }

    // Moon glow/distortion animation on hover
    if (moonRef.current) {
      const material = moonRef.current.material as THREE.Material & { distort: number };
      const targetDistort = isHoveringMoon ? 0.4 : 0;
      material.distort += (targetDistort - material.distort) * 0.1;

      // Spin the moon slightly
      moonRef.current.rotation.y += 0.001;
    }
  });

  // --- JSX Rendering ---
  return (
    <>
      {/* 3D Moon - The Gate */}
      <mesh 
        ref={moonRef}
        position={[4, 1.5, -5]} // Position on the right side
        onClick={onMoonClick}
        onPointerEnter={() => setIsHoveringMoon(true)}
        onPointerLeave={() => setIsHoveringMoon(false)}
      >
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshDistortMaterial
            color={isHoveringMoon ? '#b026ff' : '#6c757d'} // Neon glow color when clicked
            distort={0}
            speed={2}
            roughness={0.9}
        />
      </mesh>

      {/* Background Stars (from Drei) */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Ambient Light */}
      <ambientLight intensity={0.5} />
      {/* Directional Light for Moon and Astronaut */}
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Astronaut Model and Initial Position/Dialogue */}
      <group 
        ref={astronautRef} 
        position={[-3, -2, 0]} // Initial position: left bottom, hidden
        scale={[0.5, 0.5, 0.5]}
      >
        <primitive object={gltf.scene.clone()} />

        {/* Dialogue Bubble (HTML overlay) */}
        <Html position={[0.5, 2.5, 0]} transform>
            <div className={`p-2 rounded-lg text-sm transition-opacity duration-500 max-w-xs
              ${dialogue === "Where is it?" ? 'text-4xl text-white font-bold backdrop-blur-sm' : 'bg-white/10 text-neon-blue border border-neon-blue/50'}
            `}>
                {dialogue}
            </div>
        </Html>
      </group>
    </>
  );
};

// Main MoonGate component wrapped in a Canvas
const MoonGate: React.FC<MoonGateProps> = (props) => {
    return (
        <div className="w-full h-screen absolute inset-0 z-10">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <AstronautScene {...props} />
            </Canvas>
        </div>
    );
};

// Export the component
export default MoonGate;
