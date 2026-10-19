"use client";

import React, { useEffect, useRef } from "react";
import {
  sampleImageParticles,
  generateProceduralFaceTargets,
  ParticleTarget
} from "@/lib/particleSampler";

interface FaceCanvasProps {
  progressRef: React.RefObject<number>;
  reducedMotion?: boolean;
}

interface Particle {
  x: number;
  y: number;
  targetNormX: number;
  targetNormY: number;
  explosionVx: number;
  explosionVy: number;
  baseSize: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  baseAlpha: number;
  isCircuit: boolean;
  driftSpeed: number;
  driftOffset: number;
  dispX: number;
  dispY: number;
}

export const FaceCanvas: React.FC<FaceCanvasProps> = ({
  progressRef,
  reducedMotion = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isDestroyed = false;
    let isVisible = true;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const targetParticleCount = isMobile ? 1600 : 4200;

    // Pointer & Touch Interactive Forcefield (active by default for organic feel)
    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
      radius: isMobile ? 90 : 140
    };

    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
        pointer.active = true;
      }
    };

    const handleTouchEnd = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    let isAtmosphereBoosted =
      typeof window !== "undefined" &&
      !!(window as unknown as { __ATMOSPHERE_ACTIVE__?: boolean }).__ATMOSPHERE_ACTIVE__;

    const handleAtmosphereToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ active: boolean }>;
      isAtmosphereBoosted = !!customEvent.detail?.active;
    };

    window.addEventListener("atmosphere-toggle", handleAtmosphereToggle);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Load actual user face image for faithful crossfade
    const faceImage = new Image();
    faceImage.src = "/images/profile-face.jpg";
    let isImageLoaded = false;
    faceImage.onload = () => {
      isImageLoaded = true;
    };
    faceImage.onerror = () => {
      isImageLoaded = false;
    };

    let particles: Particle[] = [];

    const initParticles = (targets: ParticleTarget[]) => {
      const count = Math.min(targets.length, targetParticleCount);
      const newParticles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const pt = targets[i];

        // Disintegration vectors radiating outwards
        const radAngle = Math.atan2(pt.y, pt.x) + (Math.random() - 0.5) * 0.7;
        const blastSpeed = 650 + Math.random() * 950;
        const explosionVx = Math.cos(radAngle) * blastSpeed;
        const explosionVy = Math.sin(radAngle) * blastSpeed;

        newParticles.push({
          x: 0,
          y: 0,
          targetNormX: pt.x,
          targetNormY: pt.y,
          explosionVx,
          explosionVy,
          baseSize: pt.isCircuit ? 1.7 : 0.9 + pt.brightness * 1.1,
          r: pt.r,
          g: pt.g,
          b: pt.b,
          alpha: pt.isCircuit ? 0.98 : 0.45 + pt.brightness * 0.55,
          baseAlpha: pt.isCircuit ? 0.98 : 0.45 + pt.brightness * 0.55,
          isCircuit: !!pt.isCircuit,
          driftSpeed: 0.35 + Math.random() * 0.65,
          driftOffset: Math.random() * Math.PI * 2,
          dispX: 0,
          dispY: 0
        });
      }

      particles = newParticles;
    };

    // 1. INSTANT ZERO-LATENCY FRAME-0 POPULATION:
    // Guarantees orbs render immediately on any phone/laptop with 0 waiting!
    initParticles(generateProceduralFaceTargets(targetParticleCount));

    // 2. BACKGROUND PHOTO PIXEL SAMPLING:
    // Enhances the coordinates with the exact photographic pixels when ready
    sampleImageParticles("/images/profile-face.jpg", targetParticleCount).then(
      (loadedTargets) => {
        if (!isDestroyed && loadedTargets && loadedTargets.length > 200) {
          // Smoothly update particle targets with photo pixels
          const updateCount = Math.min(particles.length, loadedTargets.length);
          for (let i = 0; i < updateCount; i++) {
            const pt = loadedTargets[i];
            const p = particles[i];
            p.targetNormX = pt.x;
            p.targetNormY = pt.y;
            p.r = pt.r;
            p.g = pt.g;
            p.b = pt.b;
            p.isCircuit = !!pt.isCircuit;
            if (pt.isCircuit) {
              p.baseSize = 1.7;
              p.baseAlpha = 0.98;
            }
          }
        }
      }
    );

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.4 : 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const smoothstep = (min: number, max: number, value: number) => {
      const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
      return x * x * (3 - 2 * x);
    };

    // Pause rendering loop when off-screen to preserve CPU/GPU battery
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId && !isDestroyed) {
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { rootMargin: "150px" }
    );
    observer.observe(canvas);

    // Main 60 FPS Render Loop
    const render = (currentTime: number) => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      const rawProgress = progressRef.current ?? 0;
      const progress = reducedMotion ? 0.75 : Math.max(0, Math.min(1, rawProgress));

      // Clear Canvas to pure deep obsidian black
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Responsive portrait & orb bounding dimensions
      const renderSize = Math.min(width * 0.78, height * 0.74);
      const imgW = renderSize;
      const imgH = renderSize;
      const imgX = centerX - imgW * 0.5;
      const imgY = centerY - imgH * 0.5;

      // Dynamic cinematic camera zoom on scroll
      let cameraZoom = 1.0;
      if (progress >= 0.70 && progress <= 0.88) {
        const peakT = (progress - 0.70) / 0.18;
        cameraZoom = 1.0 + Math.sin(peakT * Math.PI) * 0.05;
      } else if (progress > 0.88) {
        cameraZoom = 1.0 + (progress - 0.88) * 0.45;
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(cameraZoom, cameraZoom);
      ctx.translate(-centerX, -centerY);

      const isDisintegrating = progress > 0.88;
      const disintegrationT = isDisintegrating ? (progress - 0.88) / 0.12 : 0;

      // =========================================================================
      // 1. HIGH-DEFINITION PHOTO REVEAL (Smooth crossfade on scroll)
      // =========================================================================
      if (isImageLoaded && progress >= 0.22) {
        let photoAlpha = 0;
        if (progress >= 0.22 && progress < 0.40) {
          photoAlpha = smoothstep(0.22, 0.40, progress) * 0.95;
        } else if (progress >= 0.40 && progress <= 0.88) {
          photoAlpha = 0.95;
        } else if (isDisintegrating) {
          photoAlpha = Math.max(0, 0.95 * (1.0 - disintegrationT * 1.6));
        }

        if (photoAlpha > 0.01) {
          ctx.save();
          ctx.globalAlpha = photoAlpha;
          ctx.drawImage(faceImage, imgX, imgY, imgW, imgH);

          // Subtle circular edge feathering
          const maskGrad = ctx.createRadialGradient(
            centerX,
            centerY,
            imgW * 0.44,
            centerX,
            centerY,
            imgW * 0.50
          );
          maskGrad.addColorStop(0, "rgba(3, 3, 3, 0)");
          maskGrad.addColorStop(0.65, "rgba(3, 3, 3, 0.35)");
          maskGrad.addColorStop(1, "rgba(3, 3, 3, 1)");
          ctx.fillStyle = maskGrad;
          ctx.fillRect(imgX - 5, imgY - 5, imgW + 10, imgH + 10);

          ctx.restore();
        }
      }

      // =========================================================================
      // 2. LUMINOUS PARTICLE ORBS & 3D NEURAL MESH (Visible at Progress 0!)
      // =========================================================================
      const count = particles.length;
      const timeSec = currentTime * 0.001;

      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // 1:1 Subpixel Mapping to Face Frame
        const targetX = imgX + (p.targetNormX + 0.5) * imgW;
        const targetY = imgY + (p.targetNormY + 0.5) * imgH;

        let curX: number;
        let curY: number;

        if (isDisintegrating) {
          // Explosive sci-fi particle disintegration into next section
          const tSq = disintegrationT * disintegrationT;
          curX = targetX + p.explosionVx * tSq * 1.5;
          curY = targetY + p.explosionVy * tSq * 1.5;
        } else if (progress >= 0.35 && progress <= 0.88) {
          // Precision lock over photo during reading phase
          curX = targetX;
          curY = targetY;
        } else {
          // ORGANIC IDLE BREATHING & CONVERGENCE (Visible immediately at frame 0!)
          // Particles gently float and breathe in 3D space, converging smoothly on scroll
          const idleFactor = 1.0 - smoothstep(0.0, 0.35, progress);
          const breathX =
            Math.sin(timeSec * p.driftSpeed + p.driftOffset) * (renderSize * 0.02) * idleFactor;
          const breathY =
            Math.cos(timeSec * p.driftSpeed * 0.8 + p.driftOffset) * (renderSize * 0.02) * idleFactor;

          curX = targetX + breathX;
          curY = targetY + breathY;
        }

        // Tactile Pointer & Touch Repulsion
        if (pointer.active) {
          const pdx = curX - pointer.x;
          const pdy = curY - pointer.y;
          const pdistSq = pdx * pdx + pdy * pdy;
          const pradiusSq = pointer.radius * pointer.radius;

          if (pdistSq < pradiusSq && pdistSq > 0.001) {
            const pdist = Math.sqrt(pdistSq);
            const normForce = 1 - pdist / pointer.radius;
            const push = normForce * normForce * (isAtmosphereBoosted ? 40 : 25);
            p.dispX += (pdx / pdist) * push;
            p.dispY += (pdy / pdist) * push;
          }
        }

        // Elastic spring dampening return
        p.dispX *= 0.84;
        p.dispY *= 0.84;
        curX += p.dispX;
        curY += p.dispY;

        const isDisturbed = Math.abs(p.dispX) + Math.abs(p.dispY) > 2.0;

        // Alpha calculation - VIBRANT & LUMINOUS AT PROGRESS 0!
        let curAlpha = p.baseAlpha;
        if (isDisintegrating) {
          curAlpha = Math.max(0, p.baseAlpha * (1.0 - disintegrationT * 1.4));
        } else if (progress >= 0.35 && progress <= 0.88) {
          curAlpha = p.isCircuit ? 1.0 : 0.82;
        } else {
          // Gentle idle shimmer at the start
          const shimmer = Math.sin(timeSec * 2.0 + p.driftOffset) * 0.12;
          curAlpha = Math.min(1.0, Math.max(0.35, p.baseAlpha + shimmer));
        }

        p.x = curX;
        p.y = curY;

        if (curAlpha <= 0.02) continue;

        // Draw clean glowing circular orb
        ctx.beginPath();
        const displaySize = isDisturbed ? p.baseSize * 1.4 : p.baseSize;
        ctx.arc(curX, curY, displaySize, 0, Math.PI * 2);

        if (isDisturbed) {
          ctx.fillStyle = `rgba(0, 240, 255, ${Math.min(1, curAlpha + 0.4)})`;
        } else if (p.isCircuit) {
          ctx.fillStyle = `rgba(0, 240, 255, ${curAlpha})`;
        } else if (progress >= 0.35) {
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${curAlpha * 0.85})`;
        } else {
          // Vibrant cyan-tinted neural particles at start
          ctx.fillStyle = `rgba(${Math.floor(p.r * 0.3)}, ${Math.floor(p.g * 0.8 + 50)}, 255, ${curAlpha * 0.9})`;
        }
        ctx.fill();

        // Extra delicate glow for circuit lines or touched orbs
        if (p.isCircuit || isDisturbed) {
          ctx.beginPath();
          ctx.arc(curX, curY, displaySize * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 240, 255, ${curAlpha * 0.28})`;
          ctx.fill();
        }
      }

      ctx.restore();

      // Outer Edge Vignette (feathers edges without darkening the center face)
      const vignette = ctx.createRadialGradient(
        centerX,
        centerY,
        Math.min(width, height) * 0.46,
        centerX,
        centerY,
        Math.max(width, height) * 0.82
      );
      vignette.addColorStop(0, "rgba(3, 3, 3, 0)");
      vignette.addColorStop(0.7, "rgba(3, 3, 3, 0.45)");
      vignette.addColorStop(1, "rgba(3, 3, 3, 0.95)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("atmosphere-toggle", handleAtmosphereToggle);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [progressRef, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none block z-0"
      aria-label="Interactive Facial Orbs Simulation"
    />
  );
};

export default FaceCanvas;
