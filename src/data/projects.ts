/**
 * FEATURED PROJECTS DATA SOURCE
 * 
 * Update your project descriptions, repo links, and live URLs here.
 */

export interface FeaturedProject {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  techStack: string[];
  githubUrl: string; // <-- Paste your exact GitHub Repo URL here
  liveUrl: string;   // <-- Paste your exact Live Demo / Deployed URL here
  videoSrc?: string; // Optional custom video or animation asset
  metrics?: { label: string; value: string }[];
  stats?: { label: string; value: string }[];
  heroInspiration?: boolean;
  architectureDetails?: string[];
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "wheatspectral-ai",
    category: "Collaborative AI / Voice Integration",
    title: "WheatSpectral AI — Hyperspectral Crop Intelligence & Voice Interface",
    description:
      "Integrated a conversational Voice AI interface into a hyperspectral image processing pipeline trained to evaluate crop health. Enabled non-technical end-users (farmers) to query complex spectral ML predictions and diagnostic data using real-time natural language voice interaction.",
    techStack: [
      "Python",
      "Voice AI",
      "Machine Learning",
      "Hyperspectral Data",
      "System Integration"
    ],
    githubUrl: "https://github.com/aniketpuri689/wheatspectral-ai",
    liveUrl: "https://wheatspectral-ai.demo.app",
    metrics: [
      { label: "SPECTRAL BANDS", value: "224 Channels" },
      { label: "INTERFACE", value: "Voice AI" },
      { label: "ACCURACY", value: "96.4%" }
    ]
  },
  {
    id: "edge-ai-face",
    category: "Computer Vision & Hardware Integration",
    title: "Edge-AI Facial Recognition & IoT Hardware Execution",
    description:
      "Built a real-world biometric recognition engine connecting local computer vision pipelines with hardware execution. Utilized OpenCV for face detection and feature recognition, bridging Python backend processing with microcontroller triggers to execute physical actions upon target recognition.",
    techStack: [
      "Python",
      "OpenCV",
      "Computer Vision",
      "Edge Computing",
      "IoT / Microcontrollers"
    ],
    githubUrl: "https://github.com/aniketpuri689/edge-ai-face-recognition",
    liveUrl: "https://github.com/aniketpuri689/edge-ai-face-recognition#demo",
    videoSrc: "", // Optional path to 3D orbs video
    metrics: [
      { label: "INFERENCE", value: "30+ FPS" },
      { label: "HARDWARE", value: "Microcontroller" },
      { label: "LATENCY", value: "<45ms" }
    ]
  },
  {
    id: "ai-forge",
    category: "Full-Stack Web Platform",
    title: "AI Forge — Interactive Learning & Collaborative Developer Hub",
    description:
      "Architected a full-stack interactive educational web platform engineered for students and peer developers. Features built-in code practice environments, dynamic quiz engines, hackathon tracking, and client-side persistent state management without heavy database overhead.",
    techStack: [
      "TypeScript",
      "React / JS",
      "Node.js",
      "LocalStorage API",
      "Tailwind CSS"
    ],
    githubUrl: "https://github.com/aniketpuri689/ai-forge-platform",
    liveUrl: "https://ai-forge-platform.vercel.app",
    metrics: [
      { label: "STATE ENGINE", value: "Client Persistent" },
      { label: "BUNDLE", value: "<25KB Raw" },
      { label: "FRAMEWORK", value: "Next.js / React" }
    ]
  },
  {
    id: "movie-recommendation",
    category: "Data Science & Vector ML",
    title: "High-Dimensional Movie Recommendation Engine (50K+ Dataset)",
    description:
      "Developed a content-based recommendation system handling a 50,000+ movie dataset. Implemented TF-IDF vectorization and Cosine Similarity matrices to compute high-dimensional feature vectors and deliver instant, real-time contextual recommendations.",
    techStack: [
      "Python",
      "Scikit-Learn",
      "TF-IDF",
      "Cosine Similarity",
      "Pandas",
      "Data Pipelines"
    ],
    githubUrl: "https://github.com/aniketpuri689/movie-recommendation-engine",
    liveUrl: "https://movie-recommendation-engine.demo.app",
    metrics: [
      { label: "DATASET SIZE", value: "50,000+ Movies" },
      { label: "VECTOR ENGINE", value: "TF-IDF / Cosine" },
      { label: "QUERY SPEED", value: "<15ms" }
    ]
  }
];
