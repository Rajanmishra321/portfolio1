"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdditiveBlending, NormalBlending, type Group } from "three";
import { useTheme } from "./useTheme";

const palette = {
  dark: { primary: "#22d3ee", secondary: "#3b82f6", additive: true },
  light: { primary: "#0284c7", secondary: "#2563eb", additive: false },
};

// Evenly distributed points on a sphere.
function fibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions.set([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius], i * 3);
  }
  return positions;
}

function Globe({ primary, secondary, additive }: (typeof palette)["dark"]) {
  const group = useRef<Group>(null);
  const ring = useRef<Group>(null);
  const ring2 = useRef<Group>(null);
  const positions = useMemo(() => fibonacciSphere(2400, 1.9), []);
  const { viewport } = useThree();

  // Sit on the right on wide screens, centered behind the text on mobile.
  const x = viewport.width > 7 ? viewport.width / 4.2 : 0;

  useFrame((state, delta) => {
    if (!group.current || !ring.current || !ring2.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += (state.pointer.y * 0.3 - group.current.rotation.x) * 0.04;
    group.current.rotation.z += (-state.pointer.x * 0.15 - group.current.rotation.z) * 0.04;
    ring.current.rotation.z += delta * 0.2;
    ring2.current.rotation.z -= delta * 0.12;
  });

  return (
    <group position={[x, 0, 0]}>
      <group ref={group}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.04}
            color={primary}
            transparent
            opacity={1}
            depthWrite={false}
            blending={additive ? AdditiveBlending : NormalBlending}
          />
        </points>
        <mesh>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshBasicMaterial color={secondary} wireframe transparent opacity={0.6} />
        </mesh>
        {/* Soft glowing core */}
        <mesh>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshBasicMaterial color={primary} transparent opacity={additive ? 0.12 : 0.08} blending={additive ? AdditiveBlending : NormalBlending} />
        </mesh>
      </group>
      <group ref={ring} rotation={[1.2, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[2.6, 0.008, 8, 220]} />
          <meshBasicMaterial color={primary} transparent opacity={0.8} />
        </mesh>
        <mesh position={[2.6, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={primary} />
        </mesh>
      </group>
      <group ref={ring2} rotation={[1.7, -0.5, 0.3]}>
        <mesh>
          <torusGeometry args={[3, 0.005, 8, 220]} />
          <meshBasicMaterial color={secondary} transparent opacity={0.5} />
        </mesh>
        <mesh position={[-3, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={secondary} />
        </mesh>
      </group>
    </group>
  );
}

export default function Scene({ active }: { active: boolean }) {
  const { theme } = useTheme();
  // This component is client-only (loaded with ssr: false), so matchMedia is safe here.
  const reducedMotion = useMemo(() => matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const frameloop = reducedMotion ? "demand" : active ? "always" : "never";

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.75]}
      frameloop={frameloop}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <Globe {...palette[theme]} />
    </Canvas>
  );
}
