import * as THREE from 'three';

// Generates procedural canvas textures for architectural realism without external network dependencies
export function createWoodFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Warm base tone
  ctx.fillStyle = '#34261C';
  ctx.fillRect(0, 0, 512, 512);

  // Chevron / herringbone plank lines
  const plankWidth = 32;
  const plankLength = 128;

  for (let y = 0; y < 512; y += plankWidth) {
    for (let x = 0; x < 512; x += plankLength) {
      const shade = Math.floor(Math.random() * 24 - 12);
      ctx.fillStyle = `rgb(${52 + shade}, ${38 + shade}, ${28 + Math.floor(shade * 0.8)})`;
      ctx.fillRect(x + 1, y + 1, plankLength - 2, plankWidth - 2);

      // Fine wood grain lines
      ctx.strokeStyle = 'rgba(20, 14, 10, 0.25)';
      ctx.lineWidth = 1;
      for (let g = 0; g < plankWidth; g += 4) {
        ctx.beginPath();
        ctx.moveTo(x, y + g);
        ctx.lineTo(x + plankLength, y + g + (Math.random() * 2 - 1));
        ctx.stroke();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

export function createTravertineTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Creamy ivory base
  ctx.fillStyle = '#E3D7C5';
  ctx.fillRect(0, 0, 512, 512);

  // Soft horizontal sediment bands
  for (let i = 0; i < 40; i++) {
    const y = Math.random() * 512;
    const h = 4 + Math.random() * 16;
    const alpha = 0.08 + Math.random() * 0.12;
    const isDark = Math.random() > 0.4;
    ctx.fillStyle = isDark ? `rgba(165, 148, 126, ${alpha})` : `rgba(245, 239, 230, ${alpha * 1.5})`;
    ctx.fillRect(0, y, 512, h);
  }

  // Micro-pores and mineral flecks
  for (let p = 0; p < 800; p++) {
    const px = Math.random() * 512;
    const py = Math.random() * 512;
    const pw = 1 + Math.random() * 3;
    const ph = 1 + Math.random() * 2;
    ctx.fillStyle = 'rgba(140, 122, 102, 0.35)';
    ctx.fillRect(px, py, pw, ph);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export function createFlutedWoodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Rich walnut fluted slats
  const fluteWidth = 16;
  for (let x = 0; x < 256; x += fluteWidth) {
    const grad = ctx.createLinearGradient(x, 0, x + fluteWidth, 0);
    grad.addColorStop(0, '#2B1E16');
    grad.addColorStop(0.3, '#4B3527');
    grad.addColorStop(0.7, '#5C4130');
    grad.addColorStop(1, '#1A120D');
    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, fluteWidth, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  return texture;
}

export function createPlasterWallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Warm limewash plaster base
  ctx.fillStyle = '#201D1A';
  ctx.fillRect(0, 0, 512, 512);

  // Broad soft trowel strokes
  for (let i = 0; i < 30; i++) {
    const cx = Math.random() * 512;
    const cy = Math.random() * 512;
    const rad = 60 + Math.random() * 120;
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, rad);
    const tint = Math.random() > 0.5 ? 'rgba(45, 41, 37, 0.35)' : 'rgba(24, 21, 19, 0.4)';
    grad.addColorStop(0, tint);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  // Micro stipple
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 8;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

export function createArtworkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Minimalist gallery canvas: Sand & Charcoal abstract composition
  ctx.fillStyle = '#E8E2D5';
  ctx.fillRect(0, 0, 512, 768);

  // Large geometric curved dark mass
  ctx.fillStyle = '#1C1A18';
  ctx.beginPath();
  ctx.ellipse(320, 420, 220, 290, Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();

  // Warm terracotta accent arc
  ctx.strokeStyle = '#B37D56';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(180, 260, 110, 0.2 * Math.PI, 1.3 * Math.PI);
  ctx.stroke();

  // Subtle gold leaf line
  ctx.strokeStyle = '#C79D67';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(80, 680);
  ctx.lineTo(440, 200);
  ctx.stroke();

  // Studio signature
  ctx.fillStyle = 'rgba(30, 26, 22, 0.4)';
  ctx.font = 'italic 16px serif';
  ctx.fillText('SOMA Atelier — Study N° 07', 60, 720);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createBoucleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#E6E0D5';
  ctx.fillRect(0, 0, 256, 256);

  // High frequency organic loops
  for (let i = 0; i < 2200; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const r = 1 + Math.random() * 2.5;
    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(255, 253, 248, 0.6)' : 'rgba(180, 170, 155, 0.35)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  return texture;
}
