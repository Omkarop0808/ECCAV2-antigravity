---
name: threejs-tsl-webgpu
description: Build modern WebGPU 3D applications, node-based shaders, TSL (Three.js Shading Language) materials, compute shaders, and WebGPU postprocessing with Three.js (r160+). Covers WebGPURenderer setup, TSL nodes (Fn, uniform, float, vec3, storage, time, uv), node materials (MeshStandardNodeMaterial), and GPU compute passes.
---

# Three.js TSL & WebGPU Engineering Skill

## 1. When to Use

- Building modern 3D web applications with Three.js r160+ using WebGPU.
- Creating node-based materials without writing raw GLSL string shaders.
- Implementing high-performance GPU compute simulations (particles, physics, boids) via WebGPU storage buffers.
- Modern post-processing pipelines using WebGPU render passes.

---

## 2. Core Mental Model

```text
Traditional Three.js (WebGL):
  WebGLRenderer -> Raw GLSL strings (ShaderMaterial) -> Fragment/Vertex Shaders (No Compute)

Modern Three.js (WebGPU + TSL):
  WebGPURenderer -> Node System (TSL) -> Type-safe JS Nodes (Fn, vec3, uniform)
                                      -> Cross-compiles to WGSL (WebGPU) or GLSL (WebGL 2)
                                      -> Direct GPU Compute Passes via compute()
```

---

## 3. WebGPURenderer Initialization

In modern Three.js, initialize `WebGPURenderer` and await its initialization before rendering:

```javascript
import * as THREE from 'three';
import { WebGPURenderer } from 'three/webgpu';

const canvas = document.querySelector('#webgl-canvas');
const renderer = new WebGPURenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance'
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// MANDATORY: WebGPU requires async initialization
await renderer.init();
```

---

## 4. TSL (Three.js Shading Language) Fundamentals

Import nodes from `three/tsl`:

```javascript
import {
  Fn, float, vec2, vec3, vec4, color,
  uniform, attribute, uv, time,
  positionLocal, normalLocal, cameraPosition,
  sin, cos, mix, smoothstep, length,
  MeshStandardNodeMaterial
} from 'three/tsl';
```

### Recipe: Dynamic Wave Displacement Material

```javascript
const material = new MeshStandardNodeMaterial({
  roughness: 0.15,
  metalness: 0.85
});

// Uniforms
const uSpeed = uniform(1.5);
const uFrequency = uniform(3.0);
const uAmplitude = uniform(0.2);

// Calculate displacement node
const displacement = Fn(() => {
  const t = time.mul(uSpeed);
  const wave = sin(positionLocal.x.mul(uFrequency).add(t))
    .mul(cos(positionLocal.z.mul(uFrequency).add(t)))
    .mul(uAmplitude);
  return wave;
});

// Assign to material positionNode
const dispNode = displacement();
material.positionNode = positionLocal.add(vec3(0, dispNode, 0));

// Gradient coloring based on displacement
const deepColor = color('#0f172a'); // Dark slate
const glowColor = color('#38bdf8'); // Sky blue
material.colorNode = mix(deepColor, glowColor, dispNode.mul(3.0).add(0.5));
```

---

## 5. WebGPU Compute Pipelines

WebGPU permits writing compute shaders that mutate buffers directly on the GPU:

```javascript
import { storage, Fn, uniform, instanceIndex, vec3 } from 'three/tsl';

const count = 50000;
const positions = new Float32Array(count * 3);
// Populate initial positions...

const posBuffer = new THREE.InstancedBufferAttribute(positions, 3);
const posStorage = storage(posBuffer, 'vec3', count);

// Define GPU Compute Pass
const computeStep = Fn(() => {
  const idx = instanceIndex;
  const current = posStorage.element(idx);
  
  // Velocity logic on GPU
  const updated = current.add(vec3(0.0, 0.005, 0.0));
  posStorage.element(idx).assign(updated);
})().compute(count);

// In animation loop:
renderer.compute(computeStep);
renderer.render(scene, camera);
```

---

## 6. Critical Edge Cases & Failure Prevention

- **Missing `await renderer.init()`:** Calling `renderer.render()` before `renderer.init()` resolves will throw runtime WebGPU device errors or render black frames.
- **Device Pixel Ratio Clamping:** High-DPI screens will lag severely if `window.devicePixelRatio` (>3.0) is unconstrained. Always use `Math.min(window.devicePixelRatio, 2)`.
- **Resource Disposal:** Disposing a `Mesh` does not dispose its GPU resources. Always call:

```javascript
geometry.dispose();
material.dispose();
if (material.map) material.map.dispose();
```

- **Fallback Handling:** If the client browser or OS lacks WebGPU support, `WebGPURenderer` gracefully falls back to WebGL 2 if supported; ensure your host enables secure context (`https://` or `localhost`).
