"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

/**
 * El anillo 3D dorado de wedRing: una alianza de boda que viaja por la página
 * al hacer scroll —tejiendo de lado a lado y girando con nosotros—.
 * (Inspirado en el scroll-driven 3D del documento, aplicado con gusto.)
 *
 * Sin HDR de red: el metal refleja un entorno generado en escena con
 * Lightformers de colores de fiesta (rosa, sol, agua), así que se ve dorado
 * y festivo sin descargar nada. Respeta prefers-reduced-motion.
 */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function Band({ progress }: { progress: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const reduce = useReducedMotion();

  useFrame((_, delta) => {
    if (!group.current) return;
    const d = Math.min(delta, 0.05);
    const p = progress.current;

    // amplitud relativa al ancho visible → responsivo
    const amp = Math.min(viewport.width * 0.34, 3.4);
    // teje de lado a lado ~2 veces a lo largo del scroll
    const targetX = Math.sin(p * Math.PI * 2.2) * amp;
    const targetY = Math.cos(p * Math.PI * 3) * 0.5;

    if (reduce) {
      group.current.position.set(0, 0, 0);
      group.current.rotation.x = -0.5;
      group.current.rotation.y = 0.6;
      return;
    }

    group.current.position.x = lerp(group.current.position.x, targetX, 0.06);
    group.current.position.y = lerp(group.current.position.y, targetY, 0.06);
    // giro: idle continuo + acoplado al scroll
    group.current.rotation.y += d * 0.5;
    group.current.rotation.x = lerp(
      group.current.rotation.x,
      -0.5 + p * Math.PI * 3,
      0.05,
    );
    group.current.rotation.z = p * Math.PI * 2;
  });

  // tamaño según viewport (más pequeño en móvil)
  const scale = Math.min(Math.max(viewport.width * 0.13, 0.85), 1.5);

  return (
    <group ref={group} scale={scale}>
      <mesh castShadow>
        {/* alianza: torus chunky */}
        <torusGeometry args={[1, 0.34, 48, 180]} />
        <meshStandardMaterial
          color="#F0B240"
          metalness={1}
          roughness={0.18}
          envMapIntensity={1.4}
        />
      </mesh>
    </group>
  );
}

export default function Ring3D() {
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} />
      {/* luces de color para reflejos festivos en el oro */}
      <pointLight position={[-5, 2, 3]} intensity={40} color="#E91E79" />
      <pointLight position={[5, -2, 2]} intensity={26} color="#0EA89D" />
      <pointLight position={[0, 4, -3]} intensity={20} color="#FFC233" />

      <Band progress={progress} />

      {/* entorno generado en escena (sin red) para que el metal refleje */}
      <Environment resolution={256}>
        <Lightformer
          intensity={2.4}
          position={[0, 3, 4]}
          scale={[8, 4, 1]}
          color="#FFF7ED"
        />
        <Lightformer
          intensity={1.6}
          position={[-4, -2, 2]}
          scale={[5, 5, 1]}
          color="#FF8534"
        />
        <Lightformer
          intensity={1.4}
          position={[4, 1, -2]}
          scale={[5, 5, 1]}
          color="#FF75B2"
        />
      </Environment>
    </Canvas>
  );
}
