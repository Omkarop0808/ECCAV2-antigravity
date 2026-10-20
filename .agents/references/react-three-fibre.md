# React Three Fiber (R3F) Production Playbook

A comprehensive guide for building performant, scalable, and visually stunning 3D web applications using React Three Fiber (@react-three/fiber) and @react-three/drei.

---

## 1. Core Mental Model & Reconciliation

React Three Fiber is a declarative React renderer for Three.js. It does not wrap Three.js in an abstraction layer; every JSX element maps directly to an underlying Three.js class instance.

```text
React JSX:            Underlying Three.js Instance:
<mesh>             -> new THREE.Mesh()
<boxGeometry />    -> new THREE.BoxGeometry()
<meshStandardMaterial /> -> new THREE.MeshStandardMaterial()
```

- **Declarative Hierarchy:** Parent-child relationships in JSX handle `scene.add()` and `scene.remove()` automatically on mount and unmount.
- **Direct Property Binding:** Props map to Three.js properties (`position={[x, y, z]}`, `rotation={[rx, ry, rz]}`). Constructor arguments are passed via `args={[width, height, depth]}`.
- **Resource Ownership:** Geometries and materials attached via JSX are automatically disposed when components unmount, eliminating manual memory leak vulnerabilities.

---

## 2. Canvas Setup & Performance Configuration

Configure the R3F `<Canvas>` root component with strict performance bounds:

```tsx
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

export function SceneCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      dpr={[1, 2]} // Clamps device pixel ratio between 1 and 2 to protect mobile GPUs
      camera={{ position: [0, 2, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </Canvas>
  );
}
```

---

## 3. Essential Hooks & Render Loop

### `useFrame` — Per-Frame Animation

Runs on every tick of the render loop. Always update objects by mutating their direct references (`ref.current`), never by triggering React state updates:

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function RotatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    // Delta-time independent rotation
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4f46e5" roughness={0.2} metalness={0.8} />
    </mesh>
  );
}
```

### `useThree` — Scene Access

Access the active `camera`, `scene`, `gl` renderer, and viewport metrics:

```tsx
const { camera, size, viewport } = useThree();
```

---

## 4. Asset Loading with Suspense & Preloading

Always wrap asynchronous 3D assets in `<Suspense>`:

```tsx
import { Suspense } from 'react';
import { useGLTF, Center, Float } from '@react-three/drei';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// Preload assets for instantaneous rendering
useGLTF.preload('/models/hero-asset.glb');

export function Scene() {
  return (
    <Suspense fallback={null}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Center>
          <Model url="/models/hero-asset.glb" />
        </Center>
      </Float>
    </Suspense>
  );
}
```

---

## 5. Lighting, Shadows & Environment Craft

Realistic rendering requires a balanced lighting hierarchy:

```tsx
import { Environment, ContactShadows } from '@react-three/drei';

export function LightingEnvironment() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      
      {/* High-fidelity ambient HDR environment reflections */}
      <Environment preset="city" />

      {/* Ground contact soft shadows without expensive shadow map passes */}
      <ContactShadows 
        position={[0, -0.8, 0]} 
        opacity={0.65} 
        scale={10} 
        blur={1.5} 
        far={4} 
      />
    </>
  );
}
```

---

## 6. High-Performance Instancing (10,000+ Objects)

For particle fields, grids, or massive object counts, use `InstancedMesh` with a single draw call:

```tsx
import { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

export function InstancedField({ count = 2000 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = new THREE.Object3D();

  useLayoutEffect(() => {
    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="#38bdf8" roughness={0.3} metalness={0.7} />
    </instancedMesh>
  );
}
```

---

## 7. Golden Rules for R3F Production

1. **Never Set State in `useFrame`:** Calling `setState` inside `useFrame` runs 60 times a second and triggers massive React re-render cascades. Mutate refs directly.
2. **Always Clamp DPR:** Set `dpr={[1, 2]}` on `<Canvas>`. Defaulting to native DPR on Retina screens (3x) renders 9x the pixel count and destroys framerates.
3. **Use GLTF Compression:** Export GLTF assets compressed with Draco or Meshopt.
4. **Demand-Driven Rendering:** For interactive product viewers that don't animate continuously, pass `frameloop="demand"` to `<Canvas>` and trigger updates with `invalidate()`.
