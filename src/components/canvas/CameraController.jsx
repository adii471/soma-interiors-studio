import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * CameraController
 * Choreographs real-time 3D camera trajectory driven by GSAP ScrollTrigger.
 *
 * Sequence:
 * 1. Wide Hero: Full living room view [0, 1.8, 7.5], target [0, 1.2, 0]
 * 2. Move forward & rotate towards sofa: [-1.4, 1.4, 3.8], target [-1.8, 0.9, 1.2]
 * 3. Reveal feature wall & materials: [1.6, 1.6, 2.2], target [4.2, 1.7, 1.8]
 * 4. Move towards dining hearth: [2.2, 1.6, -3.2], target [1.2, 1.1, -5.5]
 * 5. Transition into bedroom sanctuary: [-0.5, 1.5, -9.5], target [0.0, 1.0, -13.5]
 *
 * Scrolling backward smoothly reverses every step.
 */
export default function CameraController({ scrollContainerRef, onProgressUpdate }) {
  const { camera } = useThree();

  // Animation values manipulated by GSAP timeline
  const animProxy = useRef({
    posX: 0,
    posY: 1.8,
    posZ: 7.5,
    targetX: 0,
    targetY: 1.2,
    targetZ: 0,
    progress: 0
  });

  // Current interpolated values for 60fps smoothing
  const currentCam = useRef({
    pos: new THREE.Vector3(0, 1.8, 7.5),
    target: new THREE.Vector3(0, 1.2, 0)
  });

  const lookAtVec = useRef(new THREE.Vector3(0, 1.2, 0));

  useEffect(() => {
    // Initial camera position
    camera.position.set(0, 1.8, 7.5);
    camera.lookAt(0, 1.2, 0);

    const container = scrollContainerRef?.current;
    if (!container) return;

    // Create scrubbed GSAP Timeline bound to scroll
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2, // Smooth buttery inertia
          onUpdate: (self) => {
            animProxy.current.progress = self.progress;
            if (onProgressUpdate) {
              onProgressUpdate(self.progress);
            }
          }
        }
      });

      // Keyframe 1 -> Keyframe 2: Move into living room & rotate towards sofa
      tl.to(animProxy.current, {
        posX: -1.4,
        posY: 1.35,
        posZ: 3.8,
        targetX: -1.8,
        targetY: 0.85,
        targetZ: 1.2,
        duration: 2,
        ease: 'power1.inOut'
      })
      // Keyframe 2 -> Keyframe 3: Pan to feature wall & materials alcove
      .to(animProxy.current, {
        posX: 1.6,
        posY: 1.6,
        posZ: 2.2,
        targetX: 4.2,
        targetY: 1.7,
        targetZ: 1.8,
        duration: 2.5,
        ease: 'power1.inOut'
      })
      // Keyframe 3 -> Keyframe 4: Glide past timber partition into dining hearth
      .to(animProxy.current, {
        posX: 2.2,
        posY: 1.65,
        posZ: -3.2,
        targetX: 1.2,
        targetY: 1.1,
        targetZ: -5.5,
        duration: 2.5,
        ease: 'power1.inOut'
      })
      // Keyframe 4 -> Keyframe 5: Transition into bedroom sanctuary suite
      .to(animProxy.current, {
        posX: -0.5,
        posY: 1.5,
        posZ: -9.5,
        targetX: 0.0,
        targetY: 1.0,
        targetZ: -13.5,
        duration: 3,
        ease: 'power1.inOut'
      });
    }, container);

    return () => ctx.revert();
  }, [camera, scrollContainerRef, onProgressUpdate]);

  // Per-frame camera smoothing & stable look-at update
  useFrame((_, delta) => {
    // Smooth lerp factor (handles variable frame rates)
    const factor = Math.min(1, delta * 6.5);

    currentCam.current.pos.x += (animProxy.current.posX - currentCam.current.pos.x) * factor;
    currentCam.current.pos.y += (animProxy.current.posY - currentCam.current.pos.y) * factor;
    currentCam.current.pos.z += (animProxy.current.posZ - currentCam.current.pos.z) * factor;

    currentCam.current.target.x += (animProxy.current.targetX - currentCam.current.target.x) * factor;
    currentCam.current.target.y += (animProxy.current.targetY - currentCam.current.target.y) * factor;
    currentCam.current.target.z += (animProxy.current.targetZ - currentCam.current.target.z) * factor;

    camera.position.copy(currentCam.current.pos);
    lookAtVec.current.copy(currentCam.current.target);
    camera.lookAt(lookAtVec.current);
  });

  return null;
}
