/**
 * PROCEDURAL ORGANIC LIGHTNING GENERATOR
 * 
 * Generates dynamic, branching, flickering electrical arcs rendered on HTML5 Canvas.
 * Uses recursive midpoint displacement and stochastic branching for realistic fractal bolts.
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface LightningBranch {
  points: Point2D[];
  branches: LightningBranch[];
  width: number;
  alpha: number;
}

export interface LightningOptions {
  roughness?: number; // 0.0 - 1.0, higher = more jagged
  branchProbability?: number; // 0.0 - 1.0
  maxBranchDepth?: number;
  forkAngle?: number;
  coreWidth?: number;
}

/**
 * Recursively subdivides a line segment using perpendicular midpoint displacement.
 */
function subdivideSegment(
  p1: Point2D,
  p2: Point2D,
  roughness: number,
  displacement: number,
  minSegmentLength: number,
  points: Point2D[]
) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.hypot(dx, dy);

  if (dist < minSegmentLength) {
    points.push(p2);
    return;
  }

  // Perpendicular vector
  const nx = -dy / dist;
  const ny = dx / dist;

  // Random displacement scaled by distance and roughness
  const offset = (Math.random() - 0.5) * displacement;
  const midX = (p1.x + p2.x) * 0.5 + nx * offset;
  const midY = (p1.y + p2.y) * 0.5 + ny * offset;
  const mid: Point2D = { x: midX, y: midY };

  subdivideSegment(p1, mid, roughness, displacement * 0.55, minSegmentLength, points);
  subdivideSegment(mid, p2, roughness, displacement * 0.55, minSegmentLength, points);
}

/**
 * Generates a full lightning bolt with branching sub-arcs.
 */
export function generateLightningBolt(
  start: Point2D,
  end: Point2D,
  options: LightningOptions = {},
  depth: number = 0
): LightningBranch {
  const roughness = options.roughness ?? 0.65;
  const branchProb = options.branchProbability ?? 0.45;
  const maxDepth = options.maxBranchDepth ?? 2;
  const coreWidth = options.coreWidth ?? 2.5;

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dist = Math.hypot(dx, dy);
  const initialDisplacement = dist * (0.25 + roughness * 0.25);

  const points: Point2D[] = [start];
  subdivideSegment(start, end, roughness, initialDisplacement, 12, points);

  const branches: LightningBranch[] = [];

  // Spawn child branches along the main path if depth allows
  if (depth < maxDepth && points.length > 4) {
    const branchCount = Math.floor(Math.random() * 2) + 1;
    for (let b = 0; b < branchCount; b++) {
      if (Math.random() < branchProb) {
        // Pick a random internal node
        const idx = Math.floor(points.length * (0.2 + Math.random() * 0.6));
        const branchStart = points[idx];
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.2;
        const branchLen = dist * (0.3 + Math.random() * 0.45) * 0.65;

        const branchEnd: Point2D = {
          x: branchStart.x + Math.cos(angle) * branchLen,
          y: branchStart.y + Math.sin(angle) * branchLen
        };

        branches.push(
          generateLightningBolt(
            branchStart,
            branchEnd,
            {
              roughness: roughness * 1.1,
              branchProbability: branchProb * 0.5,
              maxBranchDepth: maxDepth,
              coreWidth: coreWidth * 0.65
            },
            depth + 1
          )
        );
      }
    }
  }

  return {
    points,
    branches,
    width: Math.max(0.75, coreWidth * Math.pow(0.7, depth)),
    alpha: Math.max(0.3, 1.0 - depth * 0.25)
  };
}

/**
 * Draws a single branch recursively with layered additive glow passes.
 */
export function renderLightningBranch(
  ctx: CanvasRenderingContext2D,
  branch: LightningBranch,
  intensity: number = 1.0,
  baseColor: string = "rgba(0, 240, 255, " // cyan tint
) {
  if (branch.points.length < 2 || intensity <= 0) return;

  const alpha = branch.alpha * intensity;

  // Pass 1: Outer cyan/blue diffusion glow
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.beginPath();
  ctx.moveTo(branch.points[0].x, branch.points[0].y);
  for (let i = 1; i < branch.points.length; i++) {
    ctx.lineTo(branch.points[i].x, branch.points[i].y);
  }
  ctx.strokeStyle = `${baseColor}${0.35 * alpha})`;
  ctx.lineWidth = branch.width * 5.0;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();

  // Pass 2: Sharp electric blue aura
  ctx.lineWidth = branch.width * 2.2;
  ctx.strokeStyle = `rgba(96, 165, 250, ${0.75 * alpha})`;
  ctx.stroke();

  // Pass 3: Blinding pure white core
  ctx.lineWidth = Math.max(1, branch.width * 0.8);
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 * alpha})`;
  ctx.stroke();
  ctx.restore();

  // Recursively render child branches
  for (const child of branch.branches) {
    renderLightningBranch(ctx, child, intensity * 0.85, baseColor);
  }
}

/**
 * Generates an electric aura/crown surrounding the central coordinates
 */
export function generateAuraBolts(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  count: number = 4
): LightningBranch[] {
  const bolts: LightningBranch[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const startR = 0.85 + Math.random() * 0.15;
    const endR = 1.25 + Math.random() * 0.45;

    const startX = cx + Math.cos(angle) * rx * startR;
    const startY = cy + Math.sin(angle) * ry * startR;

    const endAngle = angle + (Math.random() - 0.5) * 0.6;
    const endX = cx + Math.cos(endAngle) * rx * endR;
    const endY = cy + Math.sin(endAngle) * ry * endR;

    bolts.push(
      generateLightningBolt(
        { x: startX, y: startY },
        { x: endX, y: endY },
        {
          roughness: 0.7,
          branchProbability: 0.6,
          maxBranchDepth: 2,
          coreWidth: 2.2 + Math.random() * 1.5
        }
      )
    );
  }

  return bolts;
}
