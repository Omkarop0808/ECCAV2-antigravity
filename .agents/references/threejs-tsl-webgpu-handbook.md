# Three.js TSL & WebGPU Architecture Handbook

A comprehensive reference for building modern 3D graphics, WebGPU pipelines, and node-based shaders using Three.js (r160+) and TSL (Three.js Shading Language).

---

## 1. WebGPURenderer & Modern Initialization

Three.js now features `WebGPURenderer` as the primary next-generation renderer, with automatic fallback to WebGL 2 when WebGPU is unavailable.

### Setup

```javascript
import * as THREE from 'three';
import { WebGPURenderer } from 'three/webgpu';

const renderer = new WebGPURenderer({ 
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Initialization promise is required in modern WebGPU
await renderer.init();
```

---

## 2. Core TSL (Three.js Shading Language) Concepts

TSL replaces raw GLSL strings with modular, type-safe, JavaScript-native nodes imported from `'three/tsl'`. TSL code cross-compiles automatically to WGSL for WebGPU or GLSL for WebGL.

### Key Imports

```javascript
import { 
  Fn, float, vec2, vec3, vec4, color,
  uniform, attribute, texture, uv, time,
  positionLocal, positionWorld, normalLocal, normalWorld,
  cameraPosition, sin, cos, mix, smoothstep, length,
  MeshStandardNodeMaterial, MeshBasicNodeMaterial
} from 'three/tsl';
```

### Syntax & Functional Nodes (`Fn`)

Functions in TSL are defined using `Fn`:

```javascript
const waveDisplacement = Fn(([pos, t]) => {
  const frequency = float(3.0);
  const amplitude = float(0.2);
  const elevation = sin(pos.x.mul(frequency).add(t)).mul(amplitude);
  return elevation;
});
```

---

## 3. Node-Based Materials

Instead of overriding shaders via `onBeforeCompile`, TSL allows direct assignment to material node properties:

### Custom Vertex Deformation & Dynamic Colors

```javascript
const material = new MeshStandardNodeMaterial({
  roughness: 0.2,
  metalness: 0.8
});

// Dynamic time uniform
const uTime = uniform(0);

// Vertex position displacement
const wave = sin(positionLocal.x.mul(4.0).add(uTime)).mul(0.15);
material.positionNode = positionLocal.add(vec3(0, wave, 0));

// Procedural color based on displacement and UV
const baseColor = color('#4f46e5'); // Indigo
const crestColor = color('#06b6d4'); // Cyan
material.colorNode = mix(baseColor, crestColor, wave.mul(4.0).add(0.5));
```

---

## 4. Compute Shaders in TSL (GPU Simulation)

WebGPU enables general-purpose GPU computing directly in Three.js without ping-pong framebuffer hacks:

### GPU Particle Compute Example

```javascript
import { storage, Fn, uniform, instanceIndex, vec3 } from 'three/tsl';

const particleCount = 100000;
const positionBuffer = new Float32Array(particleCount * 3);
// Initialize particle positions...

const positionStorage = storage(
  new THREE.InstancedBufferAttribute(positionBuffer, 3), 
  'vec3', 
  particleCount
);

const computeParticles = Fn(() => {
  const index = instanceIndex;
  const pos = positionStorage.element(index);
  
  // Velocity calculation on GPU
  const newPos = pos.add(vec3(0.0, 0.01, 0.0));
  positionStorage.element(index).assign(newPos);
})().compute(particleCount);

// In render loop:
renderer.compute(computeParticles);
renderer.render(scene, camera);
```

---

## 5. Performance Optimization & Memory Cleanup

Three.js resources allocated on the GPU (buffers, textures, shaders, framebuffers) are **never automatically garbage-collected** by JavaScript. Failing to dispose of them causes severe memory leaks.

### Proper Resource Lifecycle Management

```javascript
function disposeHierarchy(node) {
  if (!node) return;

  if (node.geometry) {
    node.geometry.dispose();
  }

  if (node.material) {
    if (Array.isArray(node.material)) {
      node.material.forEach(disposeMaterial);
    } else {
      disposeMaterial(node.material);
    }
  }

  while (node.children.length > 0) {
    const child = node.children[0];
    node.remove(child);
    disposeHierarchy(child);
  }
}

function disposeMaterial(mat) {
  mat.dispose();
  // Dispose associated texture maps
  for (const key of ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'envMap']) {
    if (mat[key] && mat[key].dispose) {
      mat[key].dispose();
    }
  }
}
```

### Golden Rules for 60fps Three.js Apps

- **Clamp Pixel Ratio:** Never use raw `window.devicePixelRatio` on high-DPI displays. Always clamp to 2: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`.
- **Use InstancedMesh:** Never render 1,000 separate `THREE.Mesh` instances with the same geometry. Use `THREE.InstancedMesh` to render them in a single draw call.
- **Animate on Demand:** If the scene is not constantly moving, only render when controls change or animations fire (`OrbitControls.addEventListener('change', render)`).
- **Draco & KTX2 Textures:** Always compress 3D models with Draco/Meshopt and use KTX2/Basis Universal textures to minimize VRAM bandwidth.
