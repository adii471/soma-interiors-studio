import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  createWoodFloorTexture,
  createTravertineTexture,
  createFlutedWoodTexture,
  createPlasterWallTexture,
  createArtworkTexture,
  createBoucleTexture
} from '../../utils/proceduralTextures';

export default function ProceduralRoom({ mood = 'golden', onSelectMaterial }) {
  // Generate procedural textures once
  const {
    floorTex,
    travertineTex,
    flutedTex,
    plasterTex,
    artTex,
    boucleTex
  } = useMemo(() => {
    return {
      floorTex: createWoodFloorTexture(),
      travertineTex: createTravertineTexture(),
      flutedTex: createFlutedWoodTexture(),
      plasterTex: createPlasterWallTexture(),
      artTex: createArtworkTexture(),
      boucleTex: createBoucleTexture()
    };
  }, []);

  // Mood-dependent lighting colors
  const moodColors = useMemo(() => {
    switch (mood) {
      case 'morning':
        return {
          sun: '#FFF5E4',
          ambient: '#ECE4D8',
          cove: '#FFE9C8',
          accent: '#E6D2B5',
          intensity: 1.1
        };
      case 'twilight':
        return {
          sun: '#5D6882',
          ambient: '#1A1822',
          cove: '#FFAE5C',
          accent: '#FF9436',
          intensity: 0.7
        };
      case 'golden':
      default:
        return {
          sun: '#FFE0B2',
          ambient: '#2C221A',
          cove: '#FFB86C',
          accent: '#FF9E43',
          intensity: 1.0
        };
    }
  }, [mood]);

  return (
    <group>
      {/* ─── ARCHITECTURAL LIGHTING ─── */}
      <ambientLight color={moodColors.ambient} intensity={0.8} />

      {/* Main architectural sun beam through panoramic window */}
      <directionalLight
        position={[-8, 7, 5]}
        intensity={moodColors.intensity * 2.2}
        color={moodColors.sun}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* Soft fill light from opposite corner */}
      <directionalLight
        position={[6, 4, -4]}
        intensity={0.6}
        color="#EBE3D5"
      />

      {/* Ceiling Recessed Cove Strip Lights (Warm Amber Architectural Glow) */}
      <pointLight position={[0, 3.8, 2]} color={moodColors.cove} intensity={1.5} distance={7} />
      <pointLight position={[1.5, 3.8, -5]} color={moodColors.cove} intensity={1.8} distance={8} />
      <pointLight position={[-0.5, 3.8, -13]} color={moodColors.cove} intensity={1.4} distance={8} />

      {/* ─── 1. ARCHITECTURAL SHELL (FLOOR, WALLS, CEILING) ─── */}

      {/* Herringbone Hardwood Floor (Z spans living, dining, and bedroom) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -6]} receiveShadow>
        <planeGeometry args={[14, 32]} />
        <meshStandardMaterial
          map={floorTex}
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>

      {/* Continuous Architectural Ceiling with Cove Recesses */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.0, -6]}>
        <planeGeometry args={[14, 32]} />
        <meshStandardMaterial
          color="#161514"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Ceiling Cove Lighting Strips (Glowing Emissive Troughs) */}
      <mesh position={[0, 3.96, 2]}>
        <boxGeometry args={[4.5, 0.04, 7]} />
        <meshBasicMaterial color={moodColors.cove} />
      </mesh>
      <mesh position={[1.5, 3.96, -5]}>
        <boxGeometry args={[4.2, 0.04, 5.5]} />
        <meshBasicMaterial color={moodColors.cove} />
      </mesh>
      <mesh position={[-0.5, 3.96, -13.5]}>
        <boxGeometry args={[5, 0.04, 6]} />
        <meshBasicMaterial color={moodColors.cove} />
      </mesh>

      {/* Back Boundary Wall (Limewash Plaster) */}
      <mesh position={[0, 2.0, -22]} receiveShadow>
        <planeGeometry args={[14, 4.2]} />
        <meshStandardMaterial
          map={plasterTex}
          color="#221F1C"
          roughness={0.9}
        />
      </mesh>

      {/* Left Wall with Window Openings */}
      <mesh position={[-5.5, 2.0, -6]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[32, 4.2]} />
        <meshStandardMaterial
          map={plasterTex}
          color="#1E1C1A"
          roughness={0.9}
        />
      </mesh>

      {/* Right Wall (Limewash Plaster Backdrop) */}
      <mesh position={[5.5, 2.0, -6]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[32, 4.2]} />
        <meshStandardMaterial
          map={plasterTex}
          color="#1C1A18"
          roughness={0.9}
        />
      </mesh>

      {/* Panoramic Window Frame (Left side of living room) */}
      <group position={[-5.4, 2.0, 3]}>
        {/* Exterior sky backdrop with subtle horizon gradient */}
        <mesh position={[-0.2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[10, 4.2]} />
          <meshBasicMaterial color={mood === 'twilight' ? '#1D2436' : '#EAE4D5'} />
        </mesh>
        {/* Minimalist Bronze Window Mullions */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.08, 3.8, 0.08]} />
          <meshStandardMaterial color="#22201D" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, -2]}>
          <boxGeometry args={[0.08, 3.8, 0.08]} />
          <meshStandardMaterial color="#22201D" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 2]}>
          <boxGeometry args={[0.08, 3.8, 0.08]} />
          <meshStandardMaterial color="#22201D" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Semi-transparent Sheer Linen Drapes framing the glass */}
        <mesh position={[0.2, 0, 3.8]}>
          <boxGeometry args={[0.25, 3.9, 0.9]} />
          <meshStandardMaterial
            color="#FAF7F2"
            roughness={0.85}
            transparent
            opacity={0.82}
          />
        </mesh>
        <mesh position={[0.2, 0, -3.8]}>
          <boxGeometry args={[0.25, 3.9, 0.9]} />
          <meshStandardMaterial
            color="#FAF7F2"
            roughness={0.85}
            transparent
            opacity={0.82}
          />
        </mesh>
      </group>


      {/* ─── 2. LIVING SANCTUARY (ZONE 1: Z = 0 to 6) ─── */}

      {/* Plush Organic Woven Area Rug */}
      <mesh position={[-0.8, 0.015, 2.6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.8, 4.4]} />
        <meshStandardMaterial
          map={boucleTex}
          color="#D8CFBF"
          roughness={0.95}
        />
      </mesh>

      {/* Designer Curved Bouclé Sofa */}
      <group position={[-1.7, 0, 2.8]} rotation={[0, 0.35, 0]}>
        {/* Main curved base cushion */}
        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.44, 1.1]} />
          <meshStandardMaterial
            map={boucleTex}
            color="#EDE8DE"
            roughness={0.9}
            metalness={0.02}
          />
        </mesh>
        {/* Curved Backrest */}
        <mesh position={[-0.35, 0.65, -0.38]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.48, 0.32]} />
          <meshStandardMaterial
            map={boucleTex}
            color="#EDE8DE"
            roughness={0.9}
            metalness={0.02}
          />
        </mesh>
        {/* Return chaise section */}
        <mesh position={[-1.15, 0.28, 0.6]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.44, 1.3]} />
          <meshStandardMaterial
            map={boucleTex}
            color="#EDE8DE"
            roughness={0.9}
          />
        </mesh>
        {/* Chaise backrest */}
        <mesh position={[-1.48, 0.65, 0.55]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.48, 0.28]} />
          <meshStandardMaterial
            map={boucleTex}
            color="#EDE8DE"
            roughness={0.9}
          />
        </mesh>
        {/* Decorative Designer Pillows */}
        <mesh position={[-0.8, 0.55, -0.15]} rotation={[0.2, 0.1, 0.1]} castShadow>
          <boxGeometry args={[0.45, 0.35, 0.18]} />
          <meshStandardMaterial color="#8C7359" roughness={0.8} />
        </mesh>
        <mesh position={[0.4, 0.55, -0.15]} rotation={[0.15, -0.1, -0.05]} castShadow>
          <boxGeometry args={[0.4, 0.35, 0.15]} />
          <meshStandardMaterial color="#C5B29B" roughness={0.8} />
        </mesh>
      </group>

      {/* Monolithic Roman Travertine Coffee Table */}
      <group position={[-0.4, 0, 2.5]}>
        {/* Table Slab */}
        <mesh position={[0, 0.26, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.12, 0.85]} />
          <meshStandardMaterial
            map={travertineTex}
            roughness={0.38}
            metalness={0.08}
          />
        </mesh>
        {/* Dual Fluted Cylinder Pedestals */}
        <mesh position={[-0.45, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.2, 32]} />
          <meshStandardMaterial
            map={travertineTex}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[0.45, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.2, 32]} />
          <meshStandardMaterial
            map={travertineTex}
            roughness={0.4}
          />
        </mesh>

        {/* Minimalist Decor: Ceramic Vessel & Open Art Book */}
        <mesh position={[-0.25, 0.35, 0.05]} castShadow>
          <cylinderGeometry args={[0.08, 0.05, 0.14, 16]} />
          <meshStandardMaterial color="#302923" roughness={0.6} />
        </mesh>
        <mesh position={[0.2, 0.33, -0.05]} rotation={[0, 0.18, 0]} castShadow>
          <boxGeometry args={[0.28, 0.02, 0.22]} />
          <meshStandardMaterial color="#F4EFE6" roughness={0.9} />
        </mesh>
      </group>

      {/* Sculptural Brushed Brass Arc Floor Lamp */}
      <group position={[-3.2, 0, 4.2]}>
        {/* Heavy marble round base */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.24, 0.24, 0.08, 32]} />
          <meshStandardMaterial color="#1C1B1A" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Curved stem */}
        <mesh position={[0.3, 1.4, -0.3]} rotation={[0, 0, -0.25]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 2.6, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.22} />
        </mesh>
        {/* Top cantilever arm */}
        <mesh position={[0.85, 2.45, -0.8]} rotation={[0.4, 0, -0.8]}>
          <cylinderGeometry args={[0.015, 0.015, 1.3, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.88} roughness={0.22} />
        </mesh>
        {/* Glowing Frosted Glass Orb Diffuser */}
        <mesh position={[1.4, 2.3, -1.2]}>
          <sphereGeometry args={[0.16, 32, 32]} />
          <meshStandardMaterial
            color="#FFF4E0"
            emissive="#FFD285"
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </mesh>
        {/* Dedicated Point Light from Orb */}
        <pointLight position={[1.4, 2.3, -1.2]} color="#FFE2A3" intensity={1.2} distance={4} />
      </group>

      {/* Framed Minimalist Abstract Canvas on Right Wall */}
      <group position={[5.42, 2.1, 3.2]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Slender Dark Bronze Frame */}
        <mesh position={[0, 0, -0.02]} castShadow>
          <boxGeometry args={[1.54, 2.14, 0.04]} />
          <meshStandardMaterial color="#171514" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Canvas Surface with Custom Procedural Art */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.5, 2.1]} />
          <meshStandardMaterial map={artTex} roughness={0.8} />
        </mesh>
      </group>


      {/* ─── 3. FEATURE WALL & MATERIALITY ZONE (ZONE 2: X = 3.5 to 5.4, Z = 0 to 6) ─── */}

      {/* 3D Vertical Fluted Walnut Wood Wall Panel */}
      <group position={[4.6, 2.0, 2.8]}>
        <mesh rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[5.2, 4.0]} />
          <meshStandardMaterial
            map={flutedTex}
            roughness={0.5}
            metalness={0.08}
          />
        </mesh>

        {/* Inset Backlit Architectural Niche */}
        <group position={[-0.1, 0.1, 0]}>
          {/* Niche Interior Box */}
          <mesh position={[0.2, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.4, 1.4, 2.4]} />
            <meshStandardMaterial color="#151311" roughness={0.8} />
          </mesh>
          {/* Perimeter Halo Light inside Niche */}
          <pointLight position={[-0.05, 0.4, 0]} color={moodColors.accent} intensity={1.6} distance={2.5} />

          {/* Floating Monolithic Travertine Display Shelf */}
          <mesh position={[-0.05, -0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.45, 0.08, 2.2]} />
            <meshStandardMaterial
              map={travertineTex}
              roughness={0.35}
              metalness={0.05}
            />
          </mesh>

          {/* Artisanal Ceramic Stoneware Display on Shelf */}
          <mesh position={[-0.05, -0.16, -0.6]} castShadow>
            <cylinderGeometry args={[0.1, 0.06, 0.3, 24]} />
            <meshStandardMaterial color="#C5B6A0" roughness={0.45} />
          </mesh>
          <mesh position={[-0.05, -0.2, 0.4]} castShadow>
            <sphereGeometry args={[0.12, 24, 24]} />
            <meshStandardMaterial color="#38302A" roughness={0.7} />
          </mesh>
        </group>
      </group>


      {/* ─── 4. TRANSITION PARTITION & DINING HEARTH (ZONE 3: Z = -2 to -8) ─── */}

      {/* Architectural Fluted Timber Slat Screen Divider */}
      <group position={[-0.2, 2.0, -1.6]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[(i - 3.5) * 0.28, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.06, 4.0, 0.18]} />
            <meshStandardMaterial color="#32241A" roughness={0.6} metalness={0.1} />
          </mesh>
        ))}
      </group>

      {/* Marble Sculptural Pedestal in Walkway */}
      <group position={[-2.4, 0, -2.5]}>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 1.0, 0.4]} />
          <meshStandardMaterial map={travertineTex} roughness={0.3} />
        </mesh>
        {/* Sculptural Minimalist Form on Pedestal */}
        <mesh position={[0, 1.15, 0]} castShadow>
          <torusKnotGeometry args={[0.11, 0.035, 64, 16]} />
          <meshStandardMaterial color="#1C1815" roughness={0.3} metalness={0.4} />
        </mesh>
      </group>

      {/* Monolithic Dining Hearth Table */}
      <group position={[1.4, 0, -5.5]}>
        {/* Heavy Oval Tabletop in Honed Charcoal Stone */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.35, 1.35, 0.08, 48]} />
          <meshStandardMaterial
            color="#22201E"
            roughness={0.35}
            metalness={0.15}
          />
        </mesh>
        {/* Central Ribbed Pedestal Base */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.38, 0.44, 0.7, 32]} />
          <meshStandardMaterial
            map={flutedTex}
            roughness={0.5}
          />
        </mesh>

        {/* 4 Minimalist Sculptural Dining Chairs */}
        {[
          { pos: [0, 0, 1.1], rot: 0 },
          { pos: [0, 0, -1.1], rot: Math.PI },
          { pos: [1.1, 0, 0], rot: -Math.PI / 2 },
          { pos: [-1.1, 0, 0], rot: Math.PI / 2 }
        ].map((chair, idx) => (
          <group key={idx} position={chair.pos} rotation={[0, chair.rot, 0]}>
            {/* Seat */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.06, 0.48]} />
              <meshStandardMaterial map={boucleTex} color="#E4DDD0" roughness={0.9} />
            </mesh>
            {/* Curved minimalist backrest */}
            <mesh position={[0, 0.75, -0.22]} castShadow>
              <boxGeometry args={[0.48, 0.22, 0.05]} />
              <meshStandardMaterial color="#3A2A1E" roughness={0.5} />
            </mesh>
            {/* Tapered dark bronze legs */}
            <mesh position={[-0.2, 0.22, -0.18]}>
              <cylinderGeometry args={[0.015, 0.012, 0.44, 12]} />
              <meshStandardMaterial color="#1F1D1B" metalness={0.7} />
            </mesh>
            <mesh position={[0.2, 0.22, -0.18]}>
              <cylinderGeometry args={[0.015, 0.012, 0.44, 12]} />
              <meshStandardMaterial color="#1F1D1B" metalness={0.7} />
            </mesh>
            <mesh position={[-0.2, 0.22, 0.18]}>
              <cylinderGeometry args={[0.015, 0.012, 0.44, 12]} />
              <meshStandardMaterial color="#1F1D1B" metalness={0.7} />
            </mesh>
            <mesh position={[0.2, 0.22, 0.18]}>
              <cylinderGeometry args={[0.015, 0.012, 0.44, 12]} />
              <meshStandardMaterial color="#1F1D1B" metalness={0.7} />
            </mesh>
          </group>
        ))}

        {/* Chandelier: Multi-tiered Tubular Brushed Brass Suspension */}
        <group position={[0, 3.2, 0]}>
          {/* Suspension cables */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.8, 8]} />
            <meshStandardMaterial color="#4A453F" />
          </mesh>
          {/* Brass Cylinders at varying heights */}
          {[
            { x: -0.22, z: 0.15, y: -0.2, len: 0.7 },
            { x: 0.25, z: -0.1, y: -0.35, len: 0.85 },
            { x: 0.0, z: -0.22, y: -0.1, len: 0.6 },
            { x: 0.15, z: 0.22, y: -0.4, len: 0.95 }
          ].map((tube, i) => (
            <group key={i} position={[tube.x, tube.y, tube.z]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.032, 0.032, tube.len, 24]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.25} />
              </mesh>
              {/* Warm LED Downlight tip */}
              <mesh position={[0, -tube.len / 2 - 0.01, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
                <meshBasicMaterial color="#FFECC9" />
              </mesh>
            </group>
          ))}
          {/* Dedicated Spotlight Illuminating Dining Center */}
          <spotLight
            position={[0, -0.6, 0]}
            target-position={[0, -3.2, 0]}
            angle={0.65}
            penumbra={0.7}
            intensity={2.8}
            color="#FFDC9E"
            castShadow
          />
        </group>

        {/* Floating Minimalist Sideboard / Credenza on Right Wall */}
        <group position={[3.8, 0.8, 0]}>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.65, 2.6]} />
            <meshStandardMaterial color="#2B1E16" roughness={0.5} />
          </mesh>
          {/* Brushed brass strip detail */}
          <mesh position={[-0.26, 0, 0]}>
            <boxGeometry args={[0.02, 0.02, 2.5]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Minimalist Ceramic Vessel on Sideboard */}
          <mesh position={[-0.1, 0.45, 0.5]} castShadow>
            <cylinderGeometry args={[0.08, 0.12, 0.24, 20]} />
            <meshStandardMaterial color="#EDE3D2" roughness={0.7} />
          </mesh>
        </group>
      </group>


      {/* ─── 5. THE RESTFUL BEDROOM SUITE (ZONE 4: Z = -9 to -18) ─── */}

      {/* Stepped Elevated Platform for Bedroom */}
      <group position={[0, 0, -13.5]}>
        {/* Oak Platform Step */}
        <mesh position={[0, 0.15, 0]} receiveShadow>
          <boxGeometry args={[10, 0.3, 10]} />
          <meshStandardMaterial map={floorTex} roughness={0.4} />
        </mesh>

        {/* Slatted Wood Feature Headboard Wall */}
        <mesh position={[0, 2.0, -4.9]} receiveShadow>
          <planeGeometry args={[9.5, 3.8]} />
          <meshStandardMaterial map={flutedTex} roughness={0.6} />
        </mesh>
        {/* Warm Hidden Perimeter Backlight behind Headboard */}
        <pointLight position={[0, 2.2, -4.7]} color={moodColors.cove} intensity={1.8} distance={5} />

        {/* Low-Slung Minimalist King Platform Bed */}
        <group position={[0, 0.3, -2.6]}>
          {/* Bed Base */}
          <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.4, 0.3, 2.6]} />
            <meshStandardMaterial color="#221C18" roughness={0.5} />
          </mesh>
          {/* Upholstered Linen Headboard */}
          <mesh position={[0, 0.7, -1.25]} castShadow receiveShadow>
            <boxGeometry args={[2.5, 0.8, 0.18]} />
            <meshStandardMaterial map={boucleTex} color="#D7CFBF" roughness={0.9} />
          </mesh>
          {/* Plush Layered Mattress & Crisp Linen Duvet */}
          <mesh position={[0, 0.45, 0.05]} castShadow receiveShadow>
            <boxGeometry args={[2.1, 0.35, 2.3]} />
            <meshStandardMaterial map={boucleTex} color="#F3EFE7" roughness={0.92} />
          </mesh>
          {/* Folded Waffle Throw Blanket at Foot of Bed */}
          <mesh position={[0, 0.48, 0.85]} castShadow>
            <boxGeometry args={[2.12, 0.04, 0.7]} />
            <meshStandardMaterial color="#7E6A56" roughness={0.85} />
          </mesh>
          {/* Sculptural Sleeping Pillows */}
          <mesh position={[-0.55, 0.7, -0.9]} rotation={[0.2, 0, 0]} castShadow>
            <boxGeometry args={[0.7, 0.18, 0.42]} />
            <meshStandardMaterial color="#FAF7F0" roughness={0.9} />
          </mesh>
          <mesh position={[0.55, 0.7, -0.9]} rotation={[0.2, 0, 0]} castShadow>
            <boxGeometry args={[0.7, 0.18, 0.42]} />
            <meshStandardMaterial color="#FAF7F0" roughness={0.9} />
          </mesh>

          {/* Floating Cantilevered Walnut Nightstands */}
          {[-1.6, 1.6].map((xOffset, i) => (
            <group key={i} position={[xOffset, 0.35, -1.1]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[0.55, 0.14, 0.45]} />
                <meshStandardMaterial color="#322216" roughness={0.4} />
              </mesh>
              {/* Glowing Warm Bedside Orb Lamp */}
              <mesh position={[0, 0.16, 0]}>
                <sphereGeometry args={[0.09, 24, 24]} />
                <meshStandardMaterial
                  color="#FFF3DC"
                  emissive="#FFAF4D"
                  emissiveIntensity={1.4}
                />
              </mesh>
              <pointLight position={[0, 0.22, 0]} color="#FFBA66" intensity={0.9} distance={2.5} />
            </group>
          ))}
        </group>
      </group>


      {/* ─── 6. INTERACTIVE 3D MATERIAL HOTSPOTS ─── */}
      {/* Travertine Spot */}
      <HotspotMarker
        position={[-0.4, 0.38, 2.5]}
        label="Roman Travertine"
        materialId="travertine"
        onSelect={onSelectMaterial}
      />
      {/* Fluted Walnut Spot */}
      <HotspotMarker
        position={[4.4, 2.2, 2.6]}
        label="Fluted Walnut"
        materialId="walnut"
        onSelect={onSelectMaterial}
      />
      {/* Bouclé Wool Spot */}
      <HotspotMarker
        position={[-2.1, 0.6, 2.8]}
        label="Bouclé Wool"
        materialId="boucle"
        onSelect={onSelectMaterial}
      />
      {/* Brushed Brass Spot */}
      <HotspotMarker
        position={[1.4, 2.8, -5.5]}
        label="Champagne Brass"
        materialId="brass"
        onSelect={onSelectMaterial}
      />
    </group>
  );
}

// Interactive Hotspot Marker inside 3D Scene
function HotspotMarker({ position, label, materialId, onSelect }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onSelect) onSelect(materialId);
      }}
    >
      {/* Core glowing jewel */}
      <mesh>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color={hovered ? '#FFFFFF' : '#D4AF37'} />
      </mesh>
      {/* Pulsing ring */}
      <mesh scale={hovered ? 1.4 : 1.0}>
        <ringGeometry args={[0.075, 0.095, 32]} />
        <meshBasicMaterial
          color={hovered ? '#C79D67' : '#FFFFFF'}
          transparent
          opacity={hovered ? 0.9 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
