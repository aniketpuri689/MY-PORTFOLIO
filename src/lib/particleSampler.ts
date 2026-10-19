/**
 * PARTICLE SAMPLER & CYBERNETIC MESH ENGINE
 * 
 * Extracts high-contrast facial coordinates from /images/profile-face.jpg.
 * Preserves authentic photographic colors and maps strictly within the photo boundaries.
 * Includes resilient fallback targets to guarantee the animation always loads on all devices.
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
 * Procedural fallback targets in case image loading fails or network times out.
 */
function getFallbackTargets(maxParticles: number): ParticleTarget[] {
  const targets: ParticleTarget[] = [];
  const count = Math.min(maxParticles, 4000);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random());
    const normX = Math.cos(angle) * r * 0.28;
    const normY = (Math.sin(angle) * r * 0.38) + 0.02;
    const isCircuit = i % 8 === 0;

    targets.push({
      x: normX,
      y: normY,
      brightness: isCircuit ? 1.0 : 0.5 + Math.random() * 0.4,
      r: isCircuit ? 0 : 200,
      g: isCircuit ? 240 : 210,
      b: isCircuit ? 255 : 220,
      isCircuit,
      isKeyPoint: isCircuit
    });
  }

  return targets;
}

/**
 * Loads /images/profile-face.jpg, samples luminance, natural skin tones, and circuit lines.
 * Strictly filters out background noise so all particles sit directly within the subject.
 */
export async function sampleImageParticles(
  imageSrc: string = "/images/profile-face.jpg",
  maxParticles: number = 8000
): Promise<ParticleTarget[]> {
  return new Promise((resolve) => {
    let resolved = false;

    // Safety timeout: if image takes > 2500ms on cellular/slow device, resolve fallback
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(getFallbackTargets(maxParticles));
      }
    }, 2500);

    const img = new Image();
    // Do NOT set crossOrigin = "anonymous" to prevent iOS/Android CORS blocking on local assets
    img.src = imageSrc;

    img.onload = () => {
      if (resolved) return;
      clearTimeout(timeout);
      resolved = true;

      try {
        const offscreen = document.createElement("canvas");
        const ctx = offscreen.getContext("2d");
        if (!ctx) {
          resolve(getFallbackTargets(maxParticles));
          return;
        }

        const sampleW = 200;
        const sampleH = 200; // 1:1 square
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
            // Reject outer corners (beyond subject perimeter)
            const distFromCenter = Math.hypot(normX, normY);
            if (distFromCenter > 0.48) continue;

            if (luminance > 0.10 || isCircuit) {
              const prob = isCircuit
                ? 1.0 // always keep circuit traces
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
        } else if (candidates.length > 50) {
          resolve(candidates);
        } else {
          resolve(getFallbackTargets(maxParticles));
        }
      } catch (err) {
        console.warn("Error sampling image particles, using fallback:", err);
        resolve(getFallbackTargets(maxParticles));
      }
    };

    img.onerror = () => {
      if (resolved) return;
      clearTimeout(timeout);
      resolved = true;
      resolve(getFallbackTargets(maxParticles));
    };
  });
}
