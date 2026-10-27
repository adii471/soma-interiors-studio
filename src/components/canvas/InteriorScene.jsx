import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  createWoodFloorTexture,
  createTravertineTexture,
  createFlutedWoodTexture,
  createPlasterWallTexture,
  createArtworkTexture,
  createBoucleTexture
} from '../../utils/proceduralTextures';
import WebGLFallback from '../ui/WebGLFallback';

gsap.registerPlugin(ScrollTrigger);

export default function InteriorScene({
  scrollContainerRef,
  onProgressUpdate,
  mood = 'golden',
  onSelectMaterial
}) {
  const mountRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  // References to dynamic lights for mood transitions
  const lightsRef = useRef({});
  const hotspotsRef = useRef([]);
  const animProxyRef = useRef({
    posX: 0,
    posY: 1.8,
    posZ: 7.5,
    targetX: 0,
    targetY: 1.2,
    targetZ: 0
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ─── WebGL Detection ───────────────────────────────────────────
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;

    // ─── Scene & Fog ───────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0D0C0B');
    scene.fog = new THREE.Fog('#0D0C0B', 14, 32);

    // ─── Camera ────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 60);
    camera.position.set(0, 1.8, 7.5);
    const lookTarget = new THREE.Vector3(0, 1.2, 0);
    camera.lookAt(lookTarget);

    const currentPos = new THREE.Vector3(0, 1.8, 7.5);
    const currentLook = new THREE.Vector3(0, 1.2, 0);

    // ─── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // ─── Procedural PBR Textures ───────────────────────────────────
    const floorTex = createWoodFloorTexture();
    const travertineTex = createTravertineTexture();
    const flutedTex = createFlutedWoodTexture();
    const plasterTex = createPlasterWallTexture();
    const artTex = createArtworkTexture();
    const boucleTex = createBoucleTexture();

    // ─── Lighting Setup ────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight('#2C221A', 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#FFE0B2', 2.2);
    sunLight.position.set(-8, 7, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0001;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 30;
    sunLight.shadow.camera.left = -9;
    sunLight.shadow.camera.right = 9;
    sunLight.shadow.camera.top = 9;
    sunLight.shadow.camera.bottom = -9;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight('#EBE3D5', 0.6);
    fillLight.position.set(6, 4, -4);
    scene.add(fillLight);

    // Recessed cove strips
    const coveLight1 = new THREE.PointLight('#FFB86C', 1.5, 7);
    coveLight1.position.set(0, 3.8, 2);
    scene.add(coveLight1);

    const coveLight2 = new THREE.PointLight('#FFB86C', 1.8, 8);
    coveLight2.position.set(1.5, 3.8, -5);
    scene.add(coveLight2);

    const coveLight3 = new THREE.PointLight('#FFB86C', 1.4, 8);
    coveLight3.position.set(-0.5, 3.8, -13);
    scene.add(coveLight3);

    lightsRef.current = { ambientLight, sunLight, coveLight1, coveLight2, coveLight3 };

    // Procedural room group container
    const proceduralGroup = new THREE.Group();
    scene.add(proceduralGroup);

    // ─── 1. ARCHITECTURAL SHELL ────────────────────────────────────
    // Floor
    const floorGeo = new THREE.PlaneGeometry(14, 32);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.45,
      metalness: 0.05
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, 0, -6);
    floorMesh.receiveShadow = true;
    proceduralGroup.add(floorMesh);

    // Ceiling
    const ceilGeo = new THREE.PlaneGeometry(14, 32);
    const ceilMat = new THREE.MeshStandardMaterial({ color: '#161514', roughness: 0.85, metalness: 0.1 });
    const ceilMesh = new THREE.Mesh(ceilGeo, ceilMat);
    ceilMesh.rotation.x = Math.PI / 2;
    ceilMesh.position.set(0, 4.0, -6);
    proceduralGroup.add(ceilMesh);

    // Ceiling Cove Glow Troughs
    const coveMat = new THREE.MeshBasicMaterial({ color: '#FFB86C' });
    const cove1 = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.04, 7), coveMat);
    cove1.position.set(0, 3.96, 2);
    proceduralGroup.add(cove1);

    const cove2 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.04, 5.5), coveMat);
    cove2.position.set(1.5, 3.96, -5);
    proceduralGroup.add(cove2);

    const cove3 = new THREE.Mesh(new THREE.BoxGeometry(5, 0.04, 6), coveMat);
    cove3.position.set(-0.5, 3.96, -13.5);
    proceduralGroup.add(cove3);

    // Back Plaster Wall
    const backWallMat = new THREE.MeshStandardMaterial({ map: plasterTex, color: '#221F1C', roughness: 0.9 });
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(14, 4.2), backWallMat);
    backWall.position.set(0, 2.0, -22);
    backWall.receiveShadow = true;
    proceduralGroup.add(backWall);

    // Left Wall
    const leftWallMat = new THREE.MeshStandardMaterial({ map: plasterTex, color: '#1E1C1A', roughness: 0.9 });
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(32, 4.2), leftWallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-5.5, 2.0, -6);
    leftWall.receiveShadow = true;
    proceduralGroup.add(leftWall);

    // Right Wall
    const rightWallMat = new THREE.MeshStandardMaterial({ map: plasterTex, color: '#1C1A18', roughness: 0.9 });
    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(32, 4.2), rightWallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(5.5, 2.0, -6);
    rightWall.receiveShadow = true;
    proceduralGroup.add(rightWall);

    // Panoramic Window
    const winGroup = new THREE.Group();
    winGroup.position.set(-5.4, 2.0, 3);

    const skyMesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 4.2), new THREE.MeshBasicMaterial({ color: '#EAE4D5' }));
    skyMesh.position.set(-0.2, 0, 0);
    skyMesh.rotation.y = Math.PI / 2;
    winGroup.add(skyMesh);

    const mullionMat = new THREE.MeshStandardMaterial({ color: '#22201D', metalness: 0.8, roughness: 0.3 });
    [-2, 0, 2].forEach((z) => {
      const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.8, 0.08), mullionMat);
      mullion.position.set(0, 0, z);
      winGroup.add(mullion);
    });

    const drapeMat = new THREE.MeshStandardMaterial({ color: '#FAF7F2', roughness: 0.85, transparent: true, opacity: 0.82 });
    [-3.8, 3.8].forEach((z) => {
      const drape = new THREE.Mesh(new THREE.BoxGeometry(0.25, 3.9, 0.9), drapeMat);
      drape.position.set(0.2, 0, z);
      winGroup.add(drape);
    });
    proceduralGroup.add(winGroup);

    // ─── 2. ZONE 1: THE LIVING SANCTUARY ───────────────────────────
    // Area Rug
    const rugMat = new THREE.MeshStandardMaterial({ map: boucleTex, color: '#D8CFBF', roughness: 0.95 });
    const rugMesh = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 4.4), rugMat);
    rugMesh.rotation.x = -Math.PI / 2;
    rugMesh.position.set(-0.8, 0.015, 2.6);
    rugMesh.receiveShadow = true;
    proceduralGroup.add(rugMesh);

    // Organic Curved Bouclé Sofa
    const sofaGroup = new THREE.Group();
    sofaGroup.position.set(-1.7, 0, 2.8);
    sofaGroup.rotation.y = 0.35;

    const sofaMat = new THREE.MeshStandardMaterial({
      map: boucleTex,
      color: '#EDE8DE',
      roughness: 0.9,
      metalness: 0.02
    });

    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.44, 1.1), sofaMat);
    sofaBase.position.set(0, 0.28, 0);
    sofaBase.castShadow = true;
    sofaBase.receiveShadow = true;
    sofaGroup.add(sofaBase);

    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.48, 0.32), sofaMat);
    sofaBack.position.set(-0.35, 0.65, -0.38);
    sofaBack.castShadow = true;
    sofaGroup.add(sofaBack);

    const sofaChaise = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.44, 1.3), sofaMat);
    sofaChaise.position.set(-1.15, 0.28, 0.6);
    sofaChaise.castShadow = true;
    sofaGroup.add(sofaChaise);

    const sofaChaiseBack = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.48, 0.28), sofaMat);
    sofaChaiseBack.rotation.y = Math.PI / 2;
    sofaChaiseBack.position.set(-1.48, 0.65, 0.55);
    sofaChaiseBack.castShadow = true;
    sofaGroup.add(sofaChaiseBack);

    // Designer Cushions
    const pillow1 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.35, 0.18), new THREE.MeshStandardMaterial({ color: '#8C7359', roughness: 0.8 }));
    pillow1.position.set(-0.8, 0.55, -0.15);
    pillow1.rotation.set(0.2, 0.1, 0.1);
    pillow1.castShadow = true;
    sofaGroup.add(pillow1);

    const pillow2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 0.15), new THREE.MeshStandardMaterial({ color: '#C5B29B', roughness: 0.8 }));
    pillow2.position.set(0.4, 0.55, -0.15);
    pillow2.rotation.set(0.15, -0.1, -0.05);
    pillow2.castShadow = true;
    sofaGroup.add(pillow2);

    proceduralGroup.add(sofaGroup);

    // Monolithic Roman Travertine Coffee Table
    const tableGroup = new THREE.Group();
    tableGroup.position.set(-0.4, 0, 2.5);

    const travMat = new THREE.MeshStandardMaterial({
      map: travertineTex,
      roughness: 0.38,
      metalness: 0.08
    });

    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, 0.85), travMat);
    tableTop.position.set(0, 0.26, 0);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    [-0.45, 0.45].forEach((x) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.2, 32), travMat);
      leg.position.set(x, 0.1, 0);
      leg.castShadow = true;
      leg.receiveShadow = true;
      tableGroup.add(leg);
    });

    // Decor on table
    const vessel = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 0.14, 16), new THREE.MeshStandardMaterial({ color: '#302923', roughness: 0.6 }));
    vessel.position.set(-0.25, 0.35, 0.05);
    vessel.castShadow = true;
    tableGroup.add(vessel);

    const book = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.02, 0.22), new THREE.MeshStandardMaterial({ color: '#F4EFE6', roughness: 0.9 }));
    book.position.set(0.2, 0.33, -0.05);
    book.rotation.y = 0.18;
    book.castShadow = true;
    tableGroup.add(book);

    proceduralGroup.add(tableGroup);

    // Arc Floor Lamp
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-3.2, 0, 4.2);

    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 32), new THREE.MeshStandardMaterial({ color: '#1C1B1A', roughness: 0.2 }));
    lampBase.position.set(0, 0.04, 0);
    lampBase.castShadow = true;
    lampGroup.add(lampBase);

    const brassMat = new THREE.MeshStandardMaterial({ color: '#D4AF37', metalness: 0.88, roughness: 0.22 });
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 2.6, 16), brassMat);
    stem.position.set(0.3, 1.4, -0.3);
    stem.rotation.z = -0.25;
    lampGroup.add(stem);

    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.3, 16), brassMat);
    arm.position.set(0.85, 2.45, -0.8);
    arm.rotation.set(0.4, 0, -0.8);
    lampGroup.add(arm);

    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 32, 32),
      new THREE.MeshStandardMaterial({ color: '#FFF4E0', emissive: '#FFD285', emissiveIntensity: 1.2, roughness: 0.1 })
    );
    orb.position.set(1.4, 2.3, -1.2);
    lampGroup.add(orb);

    const lampLight = new THREE.PointLight('#FFE2A3', 1.2, 4);
    lampLight.position.set(1.4, 2.3, -1.2);
    lampGroup.add(lampLight);
    proceduralGroup.add(lampGroup);

    // Wall Artwork
    const artGroup = new THREE.Group();
    artGroup.position.set(5.42, 2.1, 3.2);
    artGroup.rotation.y = -Math.PI / 2;

    const artFrame = new THREE.Mesh(new THREE.BoxGeometry(1.54, 2.14, 0.04), new THREE.MeshStandardMaterial({ color: '#171514', metalness: 0.6, roughness: 0.4 }));
    artFrame.position.set(0, 0, -0.02);
    artGroup.add(artFrame);

    const artCanvas = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 2.1), new THREE.MeshStandardMaterial({ map: artTex, roughness: 0.8 }));
    artCanvas.position.set(0, 0, 0.01);
    artGroup.add(artCanvas);
    proceduralGroup.add(artGroup);

    // ─── 3. ZONE 2: FEATURE WALL & MATERIALITY ─────────────────────
    const featGroup = new THREE.Group();
    featGroup.position.set(4.6, 2.0, 2.8);

    const flutedWall = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 4.0),
      new THREE.MeshStandardMaterial({ map: flutedTex, roughness: 0.5, metalness: 0.08 })
    );
    flutedWall.rotation.y = -Math.PI / 2;
    flutedWall.receiveShadow = true;
    featGroup.add(flutedWall);

    // Backlit Niche
    const nicheBox = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.4, 2.4), new THREE.MeshStandardMaterial({ color: '#151311', roughness: 0.8 }));
    nicheBox.position.set(0.2, 0, 0);
    featGroup.add(nicheBox);

    const nicheLight = new THREE.PointLight('#FF9E43', 1.6, 2.5);
    nicheLight.position.set(-0.05, 0.4, 0);
    featGroup.add(nicheLight);

    const nicheShelf = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.08, 2.2), travMat);
    nicheShelf.position.set(-0.05, -0.35, 0);
    nicheShelf.castShadow = true;
    featGroup.add(nicheShelf);

    // Shelf Vessels
    const sVessel1 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.06, 0.3, 24), new THREE.MeshStandardMaterial({ color: '#C5B6A0', roughness: 0.45 }));
    sVessel1.position.set(-0.05, -0.16, -0.6);
    sVessel1.castShadow = true;
    featGroup.add(sVessel1);

    const sVessel2 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 24), new THREE.MeshStandardMaterial({ color: '#38302A', roughness: 0.7 }));
    sVessel2.position.set(-0.05, -0.2, 0.4);
    sVessel2.castShadow = true;
    featGroup.add(sVessel2);

    proceduralGroup.add(featGroup);

    // ─── 4. ZONE 3: TIMBER SCREEN & DINING HEARTH ──────────────────
    // Slatted Divider
    const screenGroup = new THREE.Group();
    screenGroup.position.set(-0.2, 2.0, -1.6);
    const slatMat = new THREE.MeshStandardMaterial({ color: '#32241A', roughness: 0.6, metalness: 0.1 });
    for (let i = 0; i < 8; i++) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.06, 4.0, 0.18), slatMat);
      slat.position.set((i - 3.5) * 0.28, 0, 0);
      slat.castShadow = true;
      slat.receiveShadow = true;
      screenGroup.add(slat);
    }
    proceduralGroup.add(screenGroup);

    // Sculptural Pedestal
    const pedGroup = new THREE.Group();
    pedGroup.position.set(-2.4, 0, -2.5);
    const pedBase = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.0, 0.4), travMat);
    pedBase.position.set(0, 0.5, 0);
    pedBase.castShadow = true;
    pedGroup.add(pedBase);

    const pedSculpt = new THREE.Mesh(new THREE.TorusKnotGeometry(0.11, 0.035, 64, 16), new THREE.MeshStandardMaterial({ color: '#1C1815', roughness: 0.3, metalness: 0.4 }));
    pedSculpt.position.set(0, 1.15, 0);
    pedSculpt.castShadow = true;
    pedGroup.add(pedSculpt);
    proceduralGroup.add(pedGroup);

    // Dining Table & Chandelier
    const diningGroup = new THREE.Group();
    diningGroup.position.set(1.4, 0, -5.5);

    const diningTop = new THREE.Mesh(
      new THREE.CylinderGeometry(1.35, 1.35, 0.08, 48),
      new THREE.MeshStandardMaterial({ color: '#22201E', roughness: 0.35, metalness: 0.15 })
    );
    diningTop.position.set(0, 0.74, 0);
    diningTop.castShadow = true;
    diningTop.receiveShadow = true;
    diningGroup.add(diningTop);

    const diningBase = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.44, 0.7, 32), new THREE.MeshStandardMaterial({ map: flutedTex, roughness: 0.5 }));
    diningBase.position.set(0, 0.35, 0);
    diningBase.castShadow = true;
    diningGroup.add(diningBase);

    // 4 Dining Chairs
    const chairConfigs = [
      { pos: [0, 0, 1.1], rot: 0 },
      { pos: [0, 0, -1.1], rot: Math.PI },
      { pos: [1.1, 0, 0], rot: -Math.PI / 2 },
      { pos: [-1.1, 0, 0], rot: Math.PI / 2 }
    ];
    chairConfigs.forEach((c) => {
      const chair = new THREE.Group();
      chair.position.set(...c.pos);
      chair.rotation.y = c.rot;

      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.48), sofaMat);
      seat.position.set(0, 0.45, 0);
      seat.castShadow = true;
      chair.add(seat);

      const back = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.22, 0.05), new THREE.MeshStandardMaterial({ color: '#3A2A1E', roughness: 0.5 }));
      back.position.set(0, 0.75, -0.22);
      back.castShadow = true;
      chair.add(back);

      const legMat = new THREE.MeshStandardMaterial({ color: '#1F1D1B', metalness: 0.7 });
      [[-0.2, -0.18], [0.2, -0.18], [-0.2, 0.18], [0.2, 0.18]].forEach(([lx, lz]) => {
        const cLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.012, 0.44, 12), legMat);
        cLeg.position.set(lx, 0.22, lz);
        chair.add(cLeg);
      });
      diningGroup.add(chair);
    });

    // Chandelier
    const chandGroup = new THREE.Group();
    chandGroup.position.set(0, 3.2, 0);
    const dropCord = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.8, 8), new THREE.MeshStandardMaterial({ color: '#4A453F' }));
    dropCord.position.set(0, 0.4, 0);
    chandGroup.add(dropCord);

    [
      { x: -0.22, z: 0.15, y: -0.2, len: 0.7 },
      { x: 0.25, z: -0.1, y: -0.35, len: 0.85 },
      { x: 0.0, z: -0.22, y: -0.1, len: 0.6 },
      { x: 0.15, z: 0.22, y: -0.4, len: 0.95 }
    ].forEach((tube) => {
      const tMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, tube.len, 24), brassMat);
      tMesh.position.set(tube.x, tube.y, tube.z);
      tMesh.castShadow = true;
      chandGroup.add(tMesh);

      const tipMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16), new THREE.MeshBasicMaterial({ color: '#FFECC9' }));
      tipMesh.position.set(tube.x, tube.y - tube.len / 2 - 0.01, tube.z);
      chandGroup.add(tipMesh);
    });

    const diningSpot = new THREE.SpotLight('#FFDC9E', 2.8, 8, 0.65, 0.7);
    diningSpot.position.set(0, -0.6, 0);
    diningSpot.target.position.set(0, -3.2, 0);
    diningGroup.add(diningSpot.target);
    diningGroup.add(diningSpot);
    diningGroup.add(chandGroup);

    // Wall Credenza
    const credGroup = new THREE.Group();
    credGroup.position.set(3.8, 0.8, 0);
    const credMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.65, 2.6), new THREE.MeshStandardMaterial({ color: '#2B1E16', roughness: 0.5 }));
    credMesh.castShadow = true;
    credGroup.add(credMesh);
    diningGroup.add(credGroup);

    proceduralGroup.add(diningGroup);

    // ─── 5. ZONE 4: THE RESTFUL BEDROOM SUITE ──────────────────────
    const bedSuite = new THREE.Group();
    bedSuite.position.set(0, 0, -13.5);

    // Platform Step
    const platStep = new THREE.Mesh(new THREE.BoxGeometry(10, 0.3, 10), floorMat);
    platStep.position.set(0, 0.15, 0);
    platStep.receiveShadow = true;
    bedSuite.add(platStep);

    // Slatted Headboard Wall
    const headWall = new THREE.Mesh(new THREE.PlaneGeometry(9.5, 3.8), new THREE.MeshStandardMaterial({ map: flutedTex, roughness: 0.6 }));
    headWall.position.set(0, 2.0, -4.9);
    headWall.receiveShadow = true;
    bedSuite.add(headWall);

    const bedHalo = new THREE.PointLight('#FFB86C', 1.8, 5);
    bedHalo.position.set(0, 2.2, -4.7);
    bedSuite.add(bedHalo);

    // King Platform Bed
    const kingBed = new THREE.Group();
    kingBed.position.set(0, 0.3, -2.6);

    const bedBaseMesh = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, 2.6), new THREE.MeshStandardMaterial({ color: '#221C18', roughness: 0.5 }));
    bedBaseMesh.position.set(0, 0.15, 0);
    bedBaseMesh.castShadow = true;
    kingBed.add(bedBaseMesh);

    const headboard = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.8, 0.18), new THREE.MeshStandardMaterial({ map: boucleTex, color: '#D7CFBF', roughness: 0.9 }));
    headboard.position.set(0, 0.7, -1.25);
    headboard.castShadow = true;
    kingBed.add(headboard);

    const mattress = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.35, 2.3), new THREE.MeshStandardMaterial({ map: boucleTex, color: '#F3EFE7', roughness: 0.92 }));
    mattress.position.set(0, 0.45, 0.05);
    mattress.castShadow = true;
    kingBed.add(mattress);

    const throwBlanket = new THREE.Mesh(new THREE.BoxGeometry(2.12, 0.04, 0.7), new THREE.MeshStandardMaterial({ color: '#7E6A56', roughness: 0.85 }));
    throwBlanket.position.set(0, 0.48, 0.85);
    throwBlanket.castShadow = true;
    kingBed.add(throwBlanket);

    const pillowMat = new THREE.MeshStandardMaterial({ color: '#FAF7F0', roughness: 0.9 });
    [-0.55, 0.55].forEach((px) => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.18, 0.42), pillowMat);
      p.position.set(px, 0.7, -0.9);
      p.rotation.x = 0.2;
      p.castShadow = true;
      kingBed.add(p);
    });

    // Nightstands & Orb Lamps
    [-1.6, 1.6].forEach((nx) => {
      const ns = new THREE.Group();
      ns.position.set(nx, 0.35, -1.1);

      const nsMesh = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.14, 0.45), new THREE.MeshStandardMaterial({ color: '#322216', roughness: 0.4 }));
      nsMesh.castShadow = true;
      ns.add(nsMesh);

      const lampOrb = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 24, 24),
        new THREE.MeshStandardMaterial({ color: '#FFF3DC', emissive: '#FFAF4D', emissiveIntensity: 1.4 })
      );
      lampOrb.position.set(0, 0.16, 0);
      ns.add(lampOrb);

      const orbPt = new THREE.PointLight('#FFBA66', 0.9, 2.5);
      orbPt.position.set(0, 0.22, 0);
      ns.add(orbPt);

      kingBed.add(ns);
    });

    bedSuite.add(kingBed);
    proceduralGroup.add(bedSuite);

    // ─── OPTIONAL CUSTOM GLB MODEL LOADER ─────────────────────────
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/models/interior.glb',
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(gltf.scene);
        // Hide procedural geometries so the custom GLB model takes full focus
        proceduralGroup.visible = false;
        console.log('[SOMA] Custom interior.glb model loaded successfully!');
      },
      undefined,
      () => {
        // Model not yet provided, procedural suite remains active
      }
    );

    // ─── 6. INTERACTIVE 3D HOTSPOT MARKERS ─────────────────────────
    const hotspots = [
      { id: 'travertine', pos: [-0.4, 0.38, 2.5], label: 'Roman Travertine' },
      { id: 'walnut', pos: [4.4, 2.2, 2.6], label: 'Fluted Walnut' },
      { id: 'boucle', pos: [-2.1, 0.6, 2.8], label: 'Bouclé Wool' },
      { id: 'brass', pos: [1.4, 2.8, -5.5], label: 'Champagne Brass' }
    ];

    const hotspotMeshes = [];
    hotspots.forEach((hs) => {
      const hsGroup = new THREE.Group();
      hsGroup.position.set(...hs.pos);
      hsGroup.userData = { materialId: hs.id, label: hs.label };

      // Core jewel
      const jewel = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 16, 16),
        new THREE.MeshBasicMaterial({ color: '#D4AF37' })
      );
      hsGroup.add(jewel);

      // Ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.075, 0.095, 32),
        new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.65, side: THREE.DoubleSide })
      );
      hsGroup.add(ring);

      scene.add(hsGroup);
      hotspotMeshes.push(hsGroup);
    });
    hotspotsRef.current = hotspotMeshes;

    // ─── 7. GSAP SCROLLTRIGGER CHOREOGRAPHY ────────────────────────
    const scrollContainer = scrollContainerRef?.current;
    let st = null;

    if (scrollContainer) {
      st = ScrollTrigger.create({
        trigger: scrollContainer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          if (onProgressUpdate) onProgressUpdate(p);

          // Calibrated trajectory for the luxury interior
          // 0.00 -> 0.25: Wide Hero -> Glide towards Sofa
          if (p <= 0.25) {
            const t = p / 0.25;
            animProxyRef.current.posX = THREE.MathUtils.lerp(0.2, 1.8, t);
            animProxyRef.current.posY = THREE.MathUtils.lerp(1.7, 1.3, t);
            animProxyRef.current.posZ = THREE.MathUtils.lerp(4.8, 1.8, t);
            animProxyRef.current.targetX = THREE.MathUtils.lerp(0.5, 0.4, t);
            animProxyRef.current.targetY = THREE.MathUtils.lerp(1.0, 0.7, t);
            animProxyRef.current.targetZ = THREE.MathUtils.lerp(0.0, 0.15, t);
          }
          // 0.25 -> 0.55: Rotate towards Feature Wall & Stone Slab
          else if (p <= 0.55) {
            const t = (p - 0.25) / 0.30;
            animProxyRef.current.posX = THREE.MathUtils.lerp(1.8, 2.2, t);
            animProxyRef.current.posY = THREE.MathUtils.lerp(1.3, 1.45, t);
            animProxyRef.current.posZ = THREE.MathUtils.lerp(1.8, 0.8, t);
            animProxyRef.current.targetX = THREE.MathUtils.lerp(0.4, 4.6, t);
            animProxyRef.current.targetY = THREE.MathUtils.lerp(0.7, 1.4, t);
            animProxyRef.current.targetZ = THREE.MathUtils.lerp(0.15, -0.65, t);
          }
          // 0.55 -> 0.80: Glide across into Dining Area Hearth
          else if (p <= 0.80) {
            const t = (p - 0.55) / 0.25;
            animProxyRef.current.posX = THREE.MathUtils.lerp(2.2, -0.6, t);
            animProxyRef.current.posY = THREE.MathUtils.lerp(1.45, 1.5, t);
            animProxyRef.current.posZ = THREE.MathUtils.lerp(0.8, -0.8, t);
            animProxyRef.current.targetX = THREE.MathUtils.lerp(4.6, -2.55, t);
            animProxyRef.current.targetY = THREE.MathUtils.lerp(1.4, 0.85, t);
            animProxyRef.current.targetZ = THREE.MathUtils.lerp(-0.65, -2.15, t);
          }
          // 0.80 -> 1.00: Transition towards Sanctuary & Panoramic Perspective
          else {
            const t = (p - 0.80) / 0.20;
            animProxyRef.current.posX = THREE.MathUtils.lerp(-0.6, -1.8, t);
            animProxyRef.current.posY = THREE.MathUtils.lerp(1.5, 1.4, t);
            animProxyRef.current.posZ = THREE.MathUtils.lerp(-0.8, -3.2, t);
            animProxyRef.current.targetX = THREE.MathUtils.lerp(-2.55, -3.8, t);
            animProxyRef.current.targetY = THREE.MathUtils.lerp(0.85, 1.2, t);
            animProxyRef.current.targetZ = THREE.MathUtils.lerp(-2.15, 0.5, t);
          }
        }
      });
    }

    // ─── 8. INTERACTIVE RAYCASTING FOR 3D HOTSPOTS ─────────────────
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(hotspotMeshes, true);
      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'auto';
      }
    };

    const handleClick = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(hotspotMeshes, true);
      if (intersects.length > 0) {
        let root = intersects[0].object;
        while (root.parent && !root.userData?.materialId) {
          root = root.parent;
        }
        if (root.userData?.materialId && onSelectMaterial) {
          onSelectMaterial(root.userData.materialId);
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('click', handleClick);

    // ─── 9. RENDER LOOP ────────────────────────────────────────────
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const factor = Math.min(1, delta * 6.0);

      // Camera position interpolation
      currentPos.x += (animProxyRef.current.posX - currentPos.x) * factor;
      currentPos.y += (animProxyRef.current.posY - currentPos.y) * factor;
      currentPos.z += (animProxyRef.current.posZ - currentPos.z) * factor;

      // LookAt target interpolation
      currentLook.x += (animProxyRef.current.targetX - currentLook.x) * factor;
      currentLook.y += (animProxyRef.current.targetY - currentLook.y) * factor;
      currentLook.z += (animProxyRef.current.targetZ - currentLook.z) * factor;

      camera.position.copy(currentPos);
      camera.lookAt(currentLook);

      // Subtle pulse on hotspots
      const time = clock.getElapsedTime();
      hotspotMeshes.forEach((hs) => {
        const ring = hs.children[1];
        if (ring) {
          const s = 1.0 + Math.sin(time * 3 + hs.position.x) * 0.18;
          ring.scale.set(s, s, s);
          ring.lookAt(camera.position);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // ─── 10. RESIZE LISTENER ───────────────────────────────────────
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // ─── CLEANUP ───────────────────────────────────────────────────
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      if (st) st.kill();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [scrollContainerRef, onProgressUpdate, onSelectMaterial]);

  // Handle lighting mood dynamic updates
  useEffect(() => {
    const lights = lightsRef.current;
    if (!lights.ambientLight) return;

    if (mood === 'morning') {
      lights.sunLight.color.set('#FFF5E4');
      lights.sunLight.intensity = 2.4;
      lights.ambientLight.color.set('#ECE4D8');
      lights.coveLight1.color.set('#FFE9C8');
      lights.coveLight2.color.set('#FFE9C8');
      lights.coveLight3.color.set('#FFE9C8');
    } else if (mood === 'twilight') {
      lights.sunLight.color.set('#5D6882');
      lights.sunLight.intensity = 1.0;
      lights.ambientLight.color.set('#1A1822');
      lights.coveLight1.color.set('#FFAE5C');
      lights.coveLight2.color.set('#FFAE5C');
      lights.coveLight3.color.set('#FFAE5C');
    } else {
      // Golden Hour default
      lights.sunLight.color.set('#FFE0B2');
      lights.sunLight.intensity = 2.2;
      lights.ambientLight.color.set('#2C221A');
      lights.coveLight1.color.set('#FFB86C');
      lights.coveLight2.color.set('#FFB86C');
      lights.coveLight3.color.set('#FFB86C');
    }
  }, [mood]);

  if (!hasWebGL) {
    return <WebGLFallback />;
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto z-0 bg-[#0D0C0B]">
      <div ref={mountRef} className="w-full h-full" />
      <div className="vignette-overlay absolute inset-0 pointer-events-none" />
    </div>
  );
}
