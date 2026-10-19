"use client";

import React, { useEffect, useRef } from "react";
import { sampleImageParticles, ParticleTarget } from "@/lib/particleSampler";

interface FaceCanvasProps {
  progressRef: React.RefObject<number>;
  reducedMotion?: boolean;
}

interface Particle {
  // Current position
  x: number;
  y: number;
  // Starting random void position
  originX: number;
  originY: number;
  // Target face position (normalized [-0.5, 0.5])
  targetNormX: number;
  targetNormY: number;
  // Disintegration explosion vectors
  explosionVx: number;
  explosionVy: number;
  // Appearance
  baseSize: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  baseAlpha: number;
  isCircuit: boolean;
  driftSpeed: number;
  driftOffset: number;
  // Interactive dynamic disturbance
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

    // Pointer & Touch Interactive Forcefield
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
      radius: isMobile ? 85 : 135
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

    // Playable mode controlled by the Atmosphere button in top right
    let isPlayable = typeof window !== "undefined" && !!(window as unknown as { __ATMOSPHERE_ACTIVE__?: boolean }).__ATMOSPHERE_ACTIVE__;

    const handleAtmosphereToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ active: boolean }>;
      isPlayable = !!customEvent.detail?.active;
      if (!isPlayable) {
        pointer.active = false;
      }
    };

    window.addEventListener("atmosphere-toggle", handleAtmosphereToggle);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Load actual user face image for 100% faithful crossfade
    const faceImage = new Image();
    faceImage.src = "/images/profile-face.jpg";
    let isImageLoaded = false;
    faceImage.onload = () => {
      isImageLoaded = true;
    };

    let particles: Particle[] = [];
    const targetParticleCount = isMobile ? 1800 : 5800;

    const initParticles = (targets: ParticleTarget[]) => {
      particles = [];
      const count = Math.min(targets.length, targetParticleCount);

      for (let i = 0; i < count; i++) {
        const pt = targets[i];

        // Random starting positions spread in the outer void
        const angle = Math.random() * Math.PI * 2;
        const spreadDist = 0.65 + Math.random() * 1.1;
        const originX = Math.cos(angle) * spreadDist;
        const originY = Math.sin(angle) * spreadDist;

        // Disintegration vectors
        const radAngle = Math.atan2(pt.y, pt.x) + (Math.random() - 0.5) * 0.7;
        const blastSpeed = 650 + Math.random() * 900;
        const explosionVx = Math.cos(radAngle) * blastSpeed;
        const explosionVy = Math.sin(radAngle) * blastSpeed;

        particles.push({
          x: 0,
          y: 0,
          originX,
          originY,
          targetNormX: pt.x,
          targetNormY: pt.y,
          explosionVx,
          explosionVy,
          baseSize: pt.isCircuit ? 1.6 : 0.8 + pt.brightness * 1.1,
          r: pt.r,
          g: pt.g,
          b: pt.b,
          alpha: pt.isCircuit ? 0.95 : 0.25 + pt.brightness * 0.7,
          baseAlpha: pt.isCircuit ? 0.95 : 0.25 + pt.brightness * 0.7,
          isCircuit: !!pt.isCircuit,
          driftSpeed: 0.3 + Math.random() * 0.6,
          driftOffset: Math.random() * Math.PI * 2,
          dispX: 0,
          dispY: 0
        });
      }
    };

    // Sample directly from the user's uploaded portrait image
    sampleImageParticles("/images/profile-face.jpg", targetParticleCount).then(
      (loadedTargets) => {
        if (!isDestroyed && loadedTargets.length > 0) {
          initParticles(loadedTargets);
        }
      }
    );

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Smoothstep utility
    const smoothstep = (min: number, max: number, value: number) => {
      const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
      return x * x * (3 - 2 * x);
    };

    // Set up IntersectionObserver to pause rendering when scrolled offscreen
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

    // Main 60 FPS Render Loop (Pure luminous orbs + faithful photo reveal + tactile forcefield)
    const render = (currentTime: number) => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      const rawProgress = progressRef.current ?? 0;
      const progress = reducedMotion ? 0.85 : Math.max(0, Math.min(1, rawProgress));

      // Clear Canvas to pure deep obsidian black
      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Unify photo & particle scale: EXACT 1:1 DIMENSIONS!
      const renderSize = Math.min(width * 0.74, height * 0.74);
      const imgW = renderSize;
      const imgH = renderSize;
      const imgX = centerX - imgW * 0.5;
      const imgY = centerY - imgH * 0.5;

      // Camera depth push-in during peak face state
      let cameraZoom = 1.0;
      if (progress >= 0.75 && progress <= 0.90) {
        const peakT = (progress - 0.75) / 0.15;
        cameraZoom = 1.0 + Math.sin(peakT * Math.PI) * 0.06;
      } else if (progress > 0.90) {
        cameraZoom = 1.0 + (progress - 0.90) * 0.5;
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(cameraZoom, cameraZoom);
      ctx.translate(-centerX, -centerY);

      // Fast initial convergence (0.05 to 0.38)
      // When text begins fading in at ~0.40, convergenceFactor is ALREADY 1.0!
      const convergenceFactor = smoothstep(0.05, 0.38, progress);
      const isDisintegrating = progress > 0.90;
      const disintegrationT = isDisintegrating ? (progress - 0.90) / 0.10 : 0;

      // =========================================================================
      // 1. FAITHFUL HIGH-DEFINITION PHOTO REVEAL (Your Actual Real Face!)
      // Fades in smoothly as orbs lock together so it is visibly 100% YOU!
      // =========================================================================
      if (isImageLoaded && progress >= 0.28) {
        let photoAlpha = 0;
        if (progress >= 0.28 && progress < 0.44) {
          // Smooth fade in as orbs assemble
          photoAlpha = smoothstep(0.28, 0.44, progress) * 0.96;
        } else if (progress >= 0.44 && progress <= 0.90) {
          // Perfectly clear while the text is on screen!
          photoAlpha = 0.96;
        } else if (isDisintegrating) {
          photoAlpha = Math.max(0, 0.96 * (1.0 - disintegrationT * 1.5));
        }

        if (photoAlpha > 0.01) {
          ctx.save();
          ctx.globalAlpha = photoAlpha;

          // Draw the actual user portrait with exact dimensions
          ctx.drawImage(faceImage, imgX, imgY, imgW, imgH);

          // Subtle outer circular edge feathering (keeps full face/hair 100% clear)
          const maskGrad = ctx.createRadialGradient(
            centerX,
            centerY,
            imgW * 0.44,
            centerX,
            centerY,
            imgW * 0.50
          );
          maskGrad.addColorStop(0, "rgba(3, 3, 3, 0)");
          maskGrad.addColorStop(0.6, "rgba(3, 3, 3, 0.35)");
          maskGrad.addColorStop(1, "rgba(3, 3, 3, 1)");
          ctx.fillStyle = maskGrad;
          ctx.fillRect(imgX - 5, imgY - 5, imgW + 10, imgH + 10);

          ctx.restore();
        }
      }

      // =========================================================================
      // 2. LUMINOUS PARTICLE ORBS (Mathematically mapped 1:1 onto the photo!)
      // =========================================================================
      const count = particles.length;

      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // EXACT SUBPIXEL MAPPING TO PHOTO:
        // p.targetNormX is [-0.5, 0.5] => (p.targetNormX + 0.5) is [0, 1] relative to photo
        const targetX = imgX + (p.targetNormX + 0.5) * imgW;
        const targetY = imgY + (p.targetNormY + 0.5) * imgH;

        let curX: number;
        let curY: number;

        if (progress >= 0.38 && progress <= 0.90) {
          // PERFECT LOCK: When text appears, all orbs fit precisely onto the photo!
          curX = targetX;
          curY = targetY;
        } else if (isDisintegrating) {
          const tSq = disintegrationT * disintegrationT;
          curX = targetX + p.explosionVx * tSq * 1.4;
          curY = targetY + p.explosionVy * tSq * 1.4;
        } else {
          // Smooth convergence from outer void
          const driftTime = currentTime * 0.001 * p.driftSpeed + p.driftOffset;
          const driftX = centerX + (p.originX + Math.sin(driftTime) * 0.05) * renderSize;
          const driftY = centerY + (p.originY + Math.cos(driftTime * 0.8) * 0.05) * renderSize;

          curX = driftX + (targetX - driftX) * convergenceFactor;
          curY = driftY + (targetY - driftY) * convergenceFactor;
        }

        // Tactile Pointer / Touch Forcefield Repulsion (ACTIVE ONLY WHEN PLAYABLE ATMOSPHERE IS ON)
        if (isPlayable && pointer.active) {
          const pdx = curX - pointer.x;
          const pdy = curY - pointer.y;
          const pdistSq = pdx * pdx + pdy * pdy;
          const pradiusSq = pointer.radius * pointer.radius;

          if (pdistSq < pradiusSq && pdistSq > 0.001) {
            const pdist = Math.sqrt(pdistSq);
            const normForce = 1 - pdist / pointer.radius;
            const push = normForce * normForce * (isMobile ? 22 : 36);
            p.dispX += (pdx / pdist) * push;
            p.dispY += (pdy / pdist) * push;
          }
        }

        // Elastic return dampening back to zero
        p.dispX *= 0.85;
        p.dispY *= 0.85;

        curX += p.dispX;
        curY += p.dispY;

        const isDisturbed = isPlayable && (Math.abs(p.dispX) + Math.abs(p.dispY) > 2.2);

        // Alpha calculation
        let curAlpha = p.baseAlpha;
        if (progress < 0.08) {
          curAlpha = p.baseAlpha * 0.3;
        } else if (progress >= 0.38 && progress <= 0.90) {
          // Luminous accent atop the photo
          curAlpha = p.isCircuit ? 1.0 : 0.85;
        } else if (isDisintegrating) {
          curAlpha = Math.max(0, p.baseAlpha * (1.0 - disintegrationT * 1.4));
        }

        p.x = curX;
        p.y = curY;

        if (curAlpha <= 0.02) continue;

        // Draw clean circular orb with disturbance amplification
        ctx.beginPath();
        const displaySize = isDisturbed ? p.baseSize * 1.4 : p.baseSize;
        ctx.arc(curX, curY, displaySize, 0, Math.PI * 2);

        if (isDisturbed) {
          // Energetic reactive pulse when touched/dragged
          ctx.fillStyle = `rgba(0, 240, 255, ${Math.min(1, curAlpha + 0.35)})`;
        } else if (p.isCircuit) {
          // Distinct glowing cyan cyber circuit
          ctx.fillStyle = `rgba(0, 240, 255, ${curAlpha})`;
        } else if (progress >= 0.38) {
          // Natural colors sampled directly from your photo pixels!
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${curAlpha * 0.82})`;
        } else {
          // Soft cosmic dust during initial approach
          ctx.fillStyle = `rgba(180, 200, 220, ${curAlpha * 0.5})`;
        }
        ctx.fill();

        // Extra delicate glow for circuit lines or disturbed orbs
        if (p.isCircuit || isDisturbed) {
          ctx.beginPath();
          ctx.arc(curX, curY, displaySize * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 240, 255, ${curAlpha * 0.28})`;
          ctx.fill();
        }
      }

      ctx.restore();

      // Outer Edge Vignette
      const vignette = ctx.createRadialGradient(
        centerX,
        centerY,
        Math.min(width, height) * 0.36,
        centerX,
        centerY,
        Math.max(width, height) * 0.74
      );
      vignette.addColorStop(0, "rgba(3, 3, 3, 0)");
      vignette.addColorStop(1, "rgba(3, 3, 3, 0.92)");
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
