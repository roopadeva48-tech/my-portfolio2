import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

interface MoonGateProps {
  onMoonClick: () => void;
}

// Helper component for the Astronaut model and dialogue logic
const AstronautScene: React.FC<MoonGateProps> = () => {
  const gltf = useGLTF('/astronaut.glb');
  const astronautRef = useRef<THREE.Group>(null!);
  const materialsRef = useRef<any[]>([]);
  const handNodesRef = useRef<THREE.Object3D[]>([]);
  
  const [dialogue, setDialogue] = useState<string>(""); 
  const [astronautState, setAstronautState] = useState<'hiding' | 'moving' | 'idle'>('hiding');

  // Apply colorful material to the astronaut
  useEffect(() => {
    if(!gltf.scene) return;
    gltf.scene.traverse((object) => {
      if ((object as any).isMesh) {
        const mesh = object as THREE.Mesh;
        const mat = mesh.material as any;
        materialsRef.current.push({
          mat,
          originalColor: mat && mat.color ? mat.color.clone() : null,
          originalEmissive: mat && mat.emissive ? mat.emissive.clone() : null,
          originalEmissiveIntensity: mat && typeof mat.emissiveIntensity !== 'undefined' ? mat.emissiveIntensity : 0,
        });

        if (mesh.name && /hand/i.test(mesh.name)) {
          handNodesRef.current.push(mesh);
        }
      }
      if (object.name && /hand/i.test(object.name) && !((object as any).isMesh)) {
        handNodesRef.current.push(object as THREE.Object3D);
      }
    });
  }, [gltf.scene]);

  // --- Animation and State Logic ---
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAstronautState('moving');
    }, 1300); 

    const timer2 = setTimeout(() => {
        if (astronautRef.current) {
            astronautRef.current.rotation.y = Math.PI / 4; 
        }
        setDialogue("Psst...");
    }, 2500); 

    const timer3 = setTimeout(() => {
        setDialogue("Catch the drifting Moon to unlock!");
        setAstronautState('idle');
    }, 4500); 

    return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (astronautRef.current) {
      astronautRef.current.position.y = 0.2 + Math.sin(t * 1.5) * 0.05; 
      astronautRef.current.rotation.z = Math.cos(t * 1.5) * 0.03; 

      if (astronautState === 'moving') {
        const targetX = 0; 
        const targetY = 0;
        const speed = 0.02;
        
        astronautRef.current.position.x += (targetX - astronautRef.current.position.x) * speed;
        astronautRef.current.position.y += (targetY - astronautRef.current.position.y) * speed;
        
        const targetScale = new THREE.Vector3(0.8, 0.8, 0.8);
        astronautRef.current.scale.lerp(targetScale, 0.02);

        if (astronautRef.current.position.distanceTo(new THREE.Vector3(targetX, targetY, 0)) < 0.1) {
          setAstronautState('idle');
        }
      }
    }

    if (handNodesRef.current.length > 0) {
      const handSwing = Math.sin(t * 3.0) * 0.35; 
      handNodesRef.current.forEach((hand, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        hand.rotation.x = THREE.MathUtils.lerp(hand.rotation.x, handSwing * direction * 0.6, 0.1);
        hand.rotation.z = THREE.MathUtils.lerp(hand.rotation.z, handSwing * direction * 0.2, 0.08);
      });
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 10, 5]} intensity={1} color={0xffffff} /> 
      <directionalLight position={[5, 5, -5]} intensity={0.5} color={0xffffff} /> 

      <group 
        ref={astronautRef} 
        position={[-8, -2, 0]} 
        scale={[0.6, 0.6, 0.6]}
      >
        <primitive object={gltf.scene.clone()} /> 

        <Html position={[1.5, 2.5, 0]} center>
            {dialogue && ( 
              <div className="relative">
                  <div className="px-4 py-2 rounded-xl text-sm font-bold bg-black/80 text-neon-blue border border-neon-blue/50 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.4)] whitespace-nowrap animate-pulse">
                      {dialogue}
                  </div>
                  {/* Triangle for speech bubble */}
                  <div className="absolute -bottom-2 left-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-neon-blue/50"></div>
              </div>
            )}
        </Html>
      </group>
    </>
  );
};

// Main MoonGate component
const MoonGate: React.FC<MoonGateProps> = (props) => {
    return (
        // KEY FIX: pointer-events-none added here
        <div className="w-full h-full absolute inset-0 pointer-events-none"> 
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <AstronautScene {...props} />
            </Canvas>
        </div>
    );
};

useGLTF.preload('/astronaut.glb');

export default MoonGate;
