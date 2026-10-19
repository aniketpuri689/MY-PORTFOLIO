/**
 * PARTICLE SAMPLER & CYBERNETIC MESH ENGINE
 * 
 * Provides instantaneous procedural cybernetic face targets at Frame 0 (0ms latency),
 * and safely samples authentic photographic coordinates from /images/profile-face.jpg.
 * Guarantees that the orbs ALWAYS render immediately on any device, network, or browser.
 */

export interface ParticleTarget {
  x: number; // normalized [-0.5, 0.5]
  y: number; // normalized [-0.5, 0.5]
  z?: number; // optional 3D depth [-0.3, 0.3]
  brightness: number; // 0.0 - 1.0
  r: number;
  g: number;
  b: number;
  isCircuit?: boolean; // glowing cybernetic circuit trace
  isKeyPoint?: boolean;
}

/**
 * Procedurally generates a futuristic 3D cybernetic face and neural orb constellation.
 * Executes synchronously in < 1ms with 0 network dependencies so particles render instantly.
 */
export function generateProceduralFaceTargets(count: number = 3600): ParticleTarget[] {
  const targets: ParticleTarget[] = [];

  // Helper to add a target
  const add = (
    x: number,
    y: number,
    brightness: number,
    r: number,
    g: number,
    b: number,
    isCircuit = false,
    isKeyPoint = false
  ) => {
    targets.push({
      x: Math.max(-0.48, Math.min(0.48, x)),
      y: Math.max(-0.48, Math.min(0.48, y)),
      brightness,
      r,
      g,
      b,
      isCircuit,
      isKeyPoint
    });
  };

  // 1. Jawline & Chin Contour (smooth oval jaw curve)
  const jawCount = Math.floor(count * 0.12);
  for (let i = 0; i < jawCount; i++) {
    const t = (i / (jawCount - 1)) * Math.PI - Math.PI / 2; // -PI/2 to PI/2
    const jawWidth = 0.26 + Math.cos(t) * 0.04;
    const x = Math.sin(t) * jawWidth;
    const y = 0.04 + Math.abs(Math.sin(t)) * 0.12 + Math.cos(t) * 0.18;
    const isCircuit = i % 4 === 0;
    add(
      x + (Math.random() - 0.5) * 0.012,
      y + (Math.random() - 0.5) * 0.012,
      0.85,
      isCircuit ? 0 : 210,
      isCircuit ? 240 : 225,
      255,
      isCircuit,
      true
    );
  }

  // 2. Head & Forehead Crown Arch
  const crownCount = Math.floor(count * 0.10);
  for (let i = 0; i < crownCount; i++) {
    const angle = Math.PI + (i / (crownCount - 1)) * Math.PI; // PI to 2PI
    const radX = 0.28 + (Math.random() - 0.5) * 0.02;
    const radY = 0.30 + (Math.random() - 0.5) * 0.02;
    const x = Math.cos(angle) * radX;
    const y = -0.06 + Math.sin(angle) * radY;
    const isCircuit = Math.random() < 0.25;
    add(x, y, 0.75, isCircuit ? 0 : 190, isCircuit ? 240 : 210, 255, isCircuit);
  }

  // 3. Left & Right Eye Sockets, Irises & Eyebrows
  const eyeCount = Math.floor(count * 0.14);
  for (let i = 0; i < eyeCount; i++) {
    const isLeft = i % 2 === 0;
    const eyeCenterX = isLeft ? -0.12 : 0.12;
    const eyeCenterY = -0.06;

    // Eyebrows (upper arch)
    if (i < eyeCount * 0.4) {
      const archT = (i / (eyeCount * 0.4) - 0.5) * 2; // -1 to 1
      const browX = eyeCenterX + archT * 0.08;
      const browY = eyeCenterY - 0.07 - (1 - archT * archT) * 0.025;
      add(browX, browY, 0.95, 0, 240, 255, true, true);
    } else {
      // Eye Ellipse & Pupil
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() < 0.3 ? Math.random() * 0.02 : 0.02 + Math.random() * 0.035;
      const x = eyeCenterX + Math.cos(angle) * r * 1.35;
      const y = eyeCenterY + Math.sin(angle) * r * 0.75;
      const isIris = r < 0.022;
      add(
        x,
        y,
        isIris ? 1.0 : 0.85,
        isIris ? 0 : 170,
        isIris ? 240 : 210,
        255,
        isIris,
        isIris
      );
    }
  }

  // 4. Nose Bridge & Nostril Flare
  const noseCount = Math.floor(count * 0.08);
  for (let i = 0; i < noseCount; i++) {
    const t = i / noseCount; // 0 to 1
    const y = -0.06 + t * 0.15;
    const spread = t > 0.75 ? (t - 0.75) * 0.18 : 0.015;
    const x = (Math.random() - 0.5) * spread;
    const isCircuit = i % 3 === 0;
    add(x, y, 0.9, isCircuit ? 0 : 220, isCircuit ? 240 : 220, 255, isCircuit);
  }

  // 5. Mouth & Lip Curves
  const mouthCount = Math.floor(count * 0.09);
  for (let i = 0; i < mouthCount; i++) {
    const t = (i / mouthCount - 0.5) * 2; // -1 to 1
    const x = t * 0.10;
    // Upper lip curve
    const upperY = 0.15 - Math.abs(x) * 0.15;
    // Lower lip curve
    const lowerY = 0.17 + (1 - t * t) * 0.025;
    const isUpper = Math.random() < 0.5;
    add(
      x + (Math.random() - 0.5) * 0.008,
      (isUpper ? upperY : lowerY) + (Math.random() - 0.5) * 0.006,
      0.85,
      0,
      230,
      255,
      i % 5 === 0
    );
  }

  // 6. Cybernetic Circuit Traces & Forehead Matrix
  const circuitCount = Math.floor(count * 0.16);
  for (let i = 0; i < circuitCount; i++) {
    // Radiating vertical & diagonal circuit lines
    const branch = i % 5;
    let x = 0;
    let y = 0;
    if (branch === 0) {
      // Center forehead vertical trace
      x = (Math.random() - 0.5) * 0.02;
      y = -0.10 - Math.random() * 0.22;
    } else if (branch === 1 || branch === 2) {
      // Left / Right temple circuit lines
      const sign = branch === 1 ? -1 : 1;
      const progress = Math.random();
      x = sign * (0.16 + progress * 0.15);
      y = -0.08 - progress * 0.16;
    } else {
      // Cheek data buses
      const sign = branch === 3 ? -1 : 1;
      const progress = Math.random();
      x = sign * (0.10 + progress * 0.14);
      y = 0.02 + progress * 0.16;
    }
    add(x, y, 1.0, 0, 240, 255, true, Math.random() < 0.2);
  }

  // 7. Volumetric Facial Fill & Ambient Orbital Orbs
  const fillCount = count - targets.length;
  for (let i = 0; i < fillCount; i++) {
    // Fill within facial oval
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random());
    const x = Math.cos(angle) * r * 0.24;
    const y = 0.02 + Math.sin(angle) * r * 0.32;
    const brightness = 0.3 + Math.random() * 0.6;
    const isCyan = Math.random() < 0.35;
    add(
      x,
      y,
      brightness,
      isCyan ? 0 : 200,
      isCyan ? 230 : 210,
      isCyan ? 255 : 230,
      isCyan && Math.random() < 0.2
    );
  }

  return targets;
}

/**
 * Loads /images/profile-face.jpg, samples luminance, natural skin tones, and circuit lines.
 * Strictly resolves within a safety timeout and avoids CORS issues for local assets.
 */
export async function sampleImageParticles(
  imageSrc: string = "/images/profile-face.jpg",
  maxParticles: number = 6000
): Promise<ParticleTarget[]> {
  return new Promise((resolve) => {
    let resolved = false;

    // Timeout safety: if image takes > 1200ms on cellular/slow device, resolve with procedural targets
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(generateProceduralFaceTargets(maxParticles));
      }
    }, 1200);

    const img = new Image();
    // Do NOT set crossOrigin = "anonymous" for local relative path to avoid Safari CORS rejection
    img.src = imageSrc;

    img.onload = () => {
      if (resolved) return;
      clearTimeout(timeout);
      resolved = true;

      try {
        const offscreen = document.createElement("canvas");
        const ctx = offscreen.getContext("2d");
        if (!ctx) {
          resolve(generateProceduralFaceTargets(maxParticles));
          return;
        }

        const sampleW = 160;
        const sampleH = 160;
        offscreen.width = sampleW;
        offscreen.height = sampleH;

        ctx.drawImage(img, 0, 0, sampleW, sampleH);
        const imgData = ctx.getImageData(0, 0, sampleW, sampleH);
        const data = imgData.data;

        const candidates: ParticleTarget[] = [];

        for (let y = 0; y < sampleH; y++) {
          for (let x = 0; x < sampleW; x++) {
            const idx = (y * sampleW + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];

            if (a < 50) continue;

            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            // Detect vibrant cyan circuit lines on user's face
            const isCircuit = b > 140 && g > 130 && (b > r + 30 || g > r + 25);

            // Normalized coordinates centered at (0, 0) in range [-0.5, 0.5]
            const normX = (x + 0.5) / sampleW - 0.5;
            const normY = (y + 0.5) / sampleH - 0.5;

            // Reject pure black background (keep pixels belonging to subject)
            const distFromCenter = Math.hypot(normX, normY);
            if (distFromCenter > 0.48) continue;

            if (luminance > 0.10 || isCircuit) {
              const prob = isCircuit
                ? 1.0
                : Math.min(1.0, luminance * luminance * 2.2 + 0.08);

              if (Math.random() < prob) {
                candidates.push({
                  x: normX,
                  y: normY,
                  brightness: isCircuit ? 1.0 : luminance,
                  r: isCircuit ? 0 : r,
                  g: isCircuit ? 240 : g,
                  b: isCircuit ? 255 : b,
                  isCircuit,
                  isKeyPoint: isCircuit || (luminance > 0.85 && Math.random() < 0.08)
                });
              }
            }
          }
        }

        if (candidates.length > maxParticles) {
          for (let i = candidates.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
          }
          resolve(candidates.slice(0, maxParticles));
        } else if (candidates.length > 200) {
          resolve(candidates);
        } else {
          resolve(generateProceduralFaceTargets(maxParticles));
        }
      } catch (err) {
        console.warn("Falling back to procedural particle targets:", err);
        resolve(generateProceduralFaceTargets(maxParticles));
      }
    };

    img.onerror = () => {
      if (resolved) return;
      clearTimeout(timeout);
      resolved = true;
      resolve(generateProceduralFaceTargets(maxParticles));
    };
  });
}
