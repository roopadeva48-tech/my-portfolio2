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
  // Load the GLB model (Ensure '/astronaut.glb' is in your public folder)
  const gltf = useGLTF('/astronaut.glb');
  const astronautRef = useRef<THREE.Group>(null!);
  const moonRef = useRef<THREE.Mesh>(null!);
  
  // States for game logic
  const [dialogue, setDialogue] = useState<string>(""); // Initial dialogue for astronaut starts empty
  const [astronautState, setAstronautState] = useState<'hiding' | 'moving' | 'idle'>('hiding');
  const [isHoveringMoon, setIsHoveringMoon] = useState(false);
  const [showMoonText, setShowMoonText] = useState(false);

  // Apply colorful material to the astronaut
  useEffect(() => {
    gltf.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        // You can customize the color here, e.g., using a random color or a specific theme color
        object.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x8a2be2), // A vibrant blue-violet color
          roughness: 0.7,
          metalness: 0.2
        });
      }
    });
  }, [gltf.scene]);

  // --- Animation and State Logic ---
  useEffect(() => {
    // 1. Start moving the astronaut after a short delay (aligned with "Where is it?" appearing)
    const timer1 = setTimeout(() => {
      setAstronautState('moving');
    }, 1300); 

    // 2. Astronaut dialogue progression: "Can I help you..."
    const timer2 = setTimeout(() => {
        if (astronautRef.current) {
            astronautRef.current.rotation.y = Math.PI / 4; // Face the user
        }
        setDialogue("Can I help you...");
    }, 2500); // Changed to 2.5s for smoother flow

    // 3. Final instruction: "It's behind the moon!"
    const timer3 = setTimeout(() => {
        setDialogue("It's behind the moon!");
        setAstronautState('idle');
        setShowMoonText(true); // Show the floating text pointing to the moon
    }, 5500); // Changed to 4.5s

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
      // Small vertical float
      astronautRef.current.position.y = 0.2 + Math.sin(t * 1.5) * 0.05; // Slightly reduced float
      // Gentle side-to-side rotation
      astronautRef.current.rotation.z = Math.cos(t * 1.5) * 0.03; // Slightly reduced rotation

      // Astronaut movement from left bottom behind sidebar (approx X:-3, Y:-2) to center (X:0, Y:0.5)
      if (astronautState === 'moving') {
        const targetX = -0.5; // Slightly left of center
        const targetY = 0.5;
        const speed = 0.01;
        
        astronautRef.current.position.x += (targetX - astronautRef.current.position.x) * speed;
        astronautRef.current.position.y += (targetY - astronautRef.current.position.y) * speed;

        // Stop moving once close to the target position
        if (astronautRef.current.position.distanceTo(new THREE.Vector3(targetX, targetY, 0)) < 0.1) {
          setAstronautState('idle');
        }
      }
    }

    // Moon glow/distortion animation on hover
    if (moonRef.current) {
      // Access the material's distort property
      const material = moonRef.current.material as THREE.Material & { distort: number };
      // Target a higher distortion on hover
      const targetDistort = isHoveringMoon ? 0.4 : 0; 
      // Smoothly transition the distortion value
      material.distort += (targetDistort - material.distort) * 0.1;

      // Enhanced Moon Motion: Gentle spin + slight bobbing
      moonRef.current.rotation.y += 0.003; // Faster spin
      moonRef.current.position.y = 1.5 + Math.sin(t * 0.7) * 0.1; // Bobbing motion
    }
  });

  // --- Event Handlers ---
  const handleMoonInteraction = () => {
      // Add a slight click effect before navigating
      if (moonRef.current) {
          const material = moonRef.current.material as THREE.Material & { distort: number };
          material.distort = 1.0; // Max distortion instantly
      }
      setTimeout(onMoonClick, 300); // Wait for a short visual transition before navigating
  }

  // --- JSX Rendering ---
  return (
    <>
      {/* 3D Moon - The Gate */}
      <mesh 
        ref={moonRef}
        position={[6, 1.5, -5]} // Position on the right side
        onClick={handleMoonInteraction}
        onPointerEnter={() => setIsHoveringMoon(true)}
        onPointerLeave={() => setIsHoveringMoon(false)}
        // Change cursor to pointer on hover
        onPointerOver={(e) => (e.stopPropagation(), document.body.style.cursor = 'pointer')}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <sphereGeometry args={[1.5, 32, 32]} />
        {/* Use MeshDistortMaterial for the glow/distortion effect */}
        <MeshDistortMaterial
            color={isHoveringMoon ? '#b12f9fff' : '#239cccff'} // Changed moon base color to Cyan
            distort={0}
            speed={2}
            roughness={0.9}
        />
        {/* Optional: Add a subtle light source to highlight the moon */}
        <pointLight intensity={isHoveringMoon ? 2 : 0.8} color={'#00FFFF'} distance={10} />
      </mesh>

      {/* Floating text pointing to the moon after dialogue */}
     

      {/* Background Stars (from Drei) */}
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      
      {/* Lights - Added a general directional light for better visibility of the astronaut */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1} color={0xffffff} /> {/* Main light */}
      <directionalLight position={[5, 5, -5]} intensity={0.5} color={0xffffff} /> {/* Secondary light */}


      {/* Astronaut Model and Initial Position/Dialogue */}
      <group 
        ref={astronautRef} 
        position={[-9, -2.5, 0]} // Adjusted initial position: further left and lower to start behind sidebar
        scale={[0.5, 0.5, 0.5]}
      >
        {/* Render the loaded GLB scene */}
        <primitive object={gltf.scene.clone()} /> 

        {/* Dialogue Bubble (HTML overlay) */}
        <Html position={[1.5, 2.5, 0]} transform>
            {dialogue && ( // Only render if dialogue is not empty
              <div className={`p-2 rounded-lg text-sm transition-opacity duration-500 whitespace-nowrap
                bg-black/50 text-white border border-neon-blue/50 backdrop-blur-sm
              `}>
                  {dialogue}
              </div>
            )}
        </Html>
      </group>
    </>
  );
};

// Main MoonGate component wrapped in a Canvas
const MoonGate: React.FC<MoonGateProps> = (props) => {
    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <AstronautScene {...props} />
            </Canvas>
        </div>
    );
};

// Pre-load the GLB model for faster rendering
useGLTF.preload('/astronaut.glb');

export default MoonGate;
