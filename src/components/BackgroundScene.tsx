"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdditiveBlending, NormalBlending, type Group, type Mesh } from "three";
import { useTheme } from "./useTheme";

// How far (in world units) the camera travels down while scrolling the whole page.
const RANGE = 32;

const palette = {
  dark: { primary: "#22d3ee", secondary: "#3b82f6", additive: true },
  light: { primary: "#0284c7", secondary: "#2563eb", additive: false },
};

type Kind = "icosahedron" | "torus" | "octahedron" | "torusKnot" | "dodecahedron";

const CAMERA_Z = 8;
const FOV = 60;

// Wireframe shapes floating along the left (-1) / right (1) screen edges, spread over the page height.
const shapes: { kind: Kind; side: -1 | 1; y: number; z: number; scale: number; speed: number }[] = [
  { kind: "icosahedron", side: -1, y: -5, z: -4, scale: 1.1, speed: 0.25 },
  { kind: "torus", side: 1, y: -10, z: -5, scale: 1.2, speed: 0.2 },
  { kind: "octahedron", side: -1, y: -16, z: -3, scale: 1, speed: 0.3 },
  { kind: "torusKnot", side: 1, y: -22, z: -5, scale: 0.9, speed: 0.18 },
  { kind: "dodecahedron", side: -1, y: -28, z: -4, scale: 1.1, speed: 0.22 },
  { kind: "icosahedron", side: 1, y: -33, z: -4, scale: 1, speed: 0.26 },
];

function starField(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = 6 - Math.random() * (RANGE + 14);
    positions[i * 3 + 2] = -14 + Math.random() * 14;
  }
  return positions;
}

function Geometry({ kind }: { kind: Kind }) {
  switch (kind) {
    case "torus":
      return <torusGeometry args={[1, 0.35, 12, 40]} />;
    case "octahedron":
      return <octahedronGeometry args={[1, 0]} />;
    case "torusKnot":
      return <torusKnotGeometry args={[0.8, 0.25, 80, 10]} />;
    case "dodecahedron":
      return <dodecahedronGeometry args={[1, 0]} />;
    default:
      return <icosahedronGeometry args={[1, 0]} />;
  }
}

function Shape({ kind, side, y, z, scale, speed, color }: (typeof shapes)[number] & { color: string }) {
  const mesh = useRef<Mesh>(null);
  const aspect = useThree((state) => state.size.width / state.size.height);
  // Keep shapes near the screen edge (out from behind the content) at any screen width.
  const halfWidth = Math.tan(((FOV / 2) * Math.PI) / 180) * (CAMERA_Z - z) * aspect;
  const position: [number, number, number] = [side * halfWidth * 0.88, y, z];

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * speed;
    mesh.current.rotation.y += delta * speed * 0.8;
    mesh.current.position.y = y + Math.sin(state.clock.elapsedTime * 0.5 + y) * 0.4;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <Geometry kind={kind} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function World({ primary, secondary, additive }: (typeof palette)["dark"]) {
  const group = useRef<Group>(null);
  const stars = useMemo(() => starField(1400), []);

  useFrame((state) => {
    // Camera follows page scroll, so the 3D world scrolls with slight parallax.
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const target = max > 0 ? -(window.scrollY / max) * RANGE : 0;
    state.camera.position.y += (target - state.camera.position.y) * 0.08;

    if (group.current) {
      group.current.rotation.y += (state.pointer.x * 0.08 - group.current.rotation.y) * 0.03;
      group.current.rotation.x += (-state.pointer.y * 0.05 - group.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[stars, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={primary}
          transparent
          opacity={additive ? 0.8 : 0.5}
          depthWrite={false}
          blending={additive ? AdditiveBlending : NormalBlending}
        />
      </points>
      {shapes.map((s, i) => (
        <Shape key={i} {...s} color={i % 2 ? secondary : primary} />
      ))}
    </group>
  );
}

export default function BackgroundScene() {
  const { theme } = useTheme();
  // Client-only component (loaded with ssr: false), so matchMedia is safe here.
  const reducedMotion = useMemo(() => matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA_Z], fov: FOV }}
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <World {...palette[theme]} />
    </Canvas>
  );
}
