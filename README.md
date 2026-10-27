# SOMA INTERIORS STUDIO — Cinematic 3D Architectural Experience

> *"Spaces that feel like home. Designed to stay timeless."*

An interactive architectural digital experience created for **SOMA INTERIORS STUDIO**. Unlike conventional portfolio websites, this site is built around a real-time 3D spatial walkthrough whose camera trajectory is directly scrubbed and driven by page scrolling in both directions.

---

## 🏛️ Features & Architecture

### 1. Real-Time 3D Interior Scene & Scroll Choreography
- **GPU-Accelerated 3D Environment**: Built on Three.js and WebGL with PBR (Physically-Based Rendering) materials, directional sunlight casting soft contact shadows (`PCFSoftShadowMap`), atmospheric depth fog, and ACES Filmic tone mapping.
- **GSAP ScrollTrigger Camera Scrubbing**:
  1. **Stage 1 (Hero)**: Full-screen panoramic view of the luxury living room (`[0, 1.8, 7.5]`, looking at `[0, 1.2, 0]`).
  2. **Stage 2 (Living Sanctuary)**: Camera glides forward and rotates down towards the organic curved bouclé sofa (`[-1.4, 1.35, 3.8]`, target `[-1.8, 0.85, 1.2]`).
  3. **Stage 3 (Material Alchemy)**: Sweeps across to reveal the fluted American walnut wall with backlit travertine niche (`[1.6, 1.6, 2.2]`, target `[4.2, 1.7, 1.8]`).
  4. **Stage 4 (The Culinary Hearth)**: Traverses past the vertical timber partition into the dining hearth anchored by a dark honed stone table and tubular brass chandelier (`[2.2, 1.65, -3.2]`, target `[1.2, 1.1, -5.5]`).
  5. **Stage 5 (The Restful Suite)**: Transitions onto the elevated stepped platform bed suite with slatted headboard and glowing sphere sconces (`[-0.5, 1.5, -9.5]`, target `[0.0, 1.0, -13.5]`).
  - **Bidirectional Reversibility**: Scrolling backwards cleanly and smoothly reverses the choreography.

### 2. Procedural Luxury Material Textures
- **Zero-Latency Offline Textures**: Generated procedurally via HTML5 Canvas (0 KB external image assets, zero broken links, 100% offline):
  - Herringbone chevron parquet hardwood floor
  - Porous Roman travertine marble with sedimentary banding
  - Fluted smoked American walnut vertical slats
  - Fine limewash plaster wall texture
  - Merino bouclé looped fabric
  - Minimalist gallery canvas art study

### 3. Interactive 3D Hotspots & Material Inspection
- Real-time 3D raycasting markers located on key materials in the scene:
  - *Roman Travertine* (Coffee table)
  - *Fluted American Walnut* (Feature wall)
  - *Merino Bouclé Wool* (Curved sofa)
  - *Brushed Champagne Brass* (Suspension chandelier)
- Clicking any hotspot opens a detailed specification sheet detailing origin, finish, reflectance (LRV), acoustic rating, and quarry sustainability.

### 4. Atmosphere & Lighting Mood Controls
- Switch between 3 lighting atmospheres in real time:
  - **Morning Mist (5500K)**: Crisp daylight with soft ambient shadows.
  - **Golden Hour (3200K)**: Warm amber sunlight streaming through panoramic windows with long dramatic shadows.
  - **Twilight Noir (2700K)**: Moody evening ambiance with glowing cove strips, niche accent lighting, and warm bedside orbs.

### 5. Ambient Web Audio Soundscape
- Built-in soothing harmonic chord drone (432Hz root with low-pass resonance and gentle breathing LFO) that can be toggled on/off from the header.

### 6. Architectural Portfolio & Consultation Booking
- Filterable editorial project gallery (Residential, Hospitality, Penthouse) clearly designated as concept design studies.
- Commission inquiry modal with project scope, budget tiers, and location inputs.

---

## 🔄 How to Replace the Procedural Room with a GLB/GLTF Model

To drop in a realistic photorealistic 3D model exported from Blender, 3ds Max, or SketchUp:

1. Place your exported file at:
   ```
   public/models/interior.glb
   ```
2. In `src/components/canvas/InteriorScene.jsx`, import Three's `GLTFLoader`:
   ```javascript
   import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

   const loader = new GLTFLoader();
   loader.load('/models/interior.glb', (gltf) => {
     scene.add(gltf.scene);
     // Enable shadow casting and receiving on model meshes
     gltf.scene.traverse((child) => {
       if (child.isMesh) {
         child.castShadow = true;
         child.receiveShadow = true;
       }
     });
   });
   ```
3. Adjust the `animProxyRef` coordinates in `InteriorScene.jsx` to match your custom model's room origins.

---

## 🚀 Running the Project

```bash
# Navigate to the project directory
cd "C:\Users\Aditya Goud\.gemini\antigravity\scratch\soma-interiors-studio"

# Run development server
node .\node_modules\vite\bin\vite.js

# Or build for production
node .\node_modules\vite\bin\vite.js build

# Preview production build
node .\node_modules\vite\bin\vite.js preview
```
