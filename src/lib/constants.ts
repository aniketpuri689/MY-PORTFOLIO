/**
 * PORTFOLIO DATA CONSTANTS
 * 
 * Centralized data source for easy customization and extensibility.
 */

import { FEATURED_PROJECTS, FeaturedProject } from "@/data/projects";

export type { FeaturedProject };
export type Project = FeaturedProject;
export const PROJECTS = FEATURED_PROJECTS;

export type CapabilityCategory = "web-dev" | "ai-ml" | "agentic-ai" | "backend-systems";

export interface CapabilityItem {
  id: string;
  name: string;
  category: CapabilityCategory;
  categoryLabel: string;
  level: string;
  proficiency: number; // 0 - 100
  role: string;
  description: string;
  tags: string[];
  highlight?: boolean;
}

export interface HackathonItem {
  id: string;
  title: string;
  organizer: string;
  award: string;
  badgeType: "winner" | "finalist" | "featured";
  date: string;
  project: string;
  description: string;
  impactMetric: string;
  metricLabel: string;
  technologies: string[];
  link?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  credentialId?: string;
  date: string;
  skills: string[];
  verificationUrl?: string;
}

export interface ExtracurricularItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  keyContributions: string[];
  badge: string;
}

export const PERSONAL_INFO = {
  name: "Aniket",
  title: "Full-Stack Web Architect & AI/ML Systems Engineer",
  subtitle: "1st-Year B.Tech CSE (AI/ML) • GLA University • Full-Stack Web, AI/ML & Agentic Systems",
  heroQuote: "I BUILD WHAT DOESN'T EXIST YET.",
  heroMetadata: "FULL-STACK ENGINEERING | AI/ML SYSTEMS | AGENTIC AI",
  location: "Mathura / Delhi NCR, India",
  university: "GLA University",
  program: "B.Tech in Computer Science & Engineering (Artificial Intelligence & Machine Learning)",
  year: "1st Year (Class of 2029)",
  status: "OPEN FOR FULL-STACK & AI/ML BUILDS",
  email: "Aniketpuri689@gmail.com",
  socials: {
    github: "https://github.com/aniketpuri689",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://x.com/",
  },
  bio: [
    "I am a 1st-year B.Tech CSE student specializing in Artificial Intelligence and Machine Learning at GLA University, with a core focus on modern Full-Stack Web Development, Machine Learning, and Agentic AI Systems.",
    "I approach software engineering from a build-first perspective: I design high-performance, responsive web architectures paired with intelligent predictive models and autonomous agentic workflows.",
    "From reactive Next.js frontends and asynchronous FastAPI backends to multi-modal AI agents and computer vision pipelines, I engineer complete end-to-end production systems."
  ]
};

export const CAPABILITIES_DATA: CapabilityItem[] = [
  // 1. Full-Stack Web Development
  {
    id: "nextjs-app",
    name: "Next.js 15 & React 19",
    category: "web-dev",
    categoryLabel: "FULL-STACK WEB",
    level: "Core Specialty",
    proficiency: 95,
    role: "Modern Application Architecture",
    description: "Production-grade web apps with modern App Router, SSR, and clean reactive state architectures.",
    tags: ["Next.js 15", "React 19", "App Router", "SSR", "Vercel"],
    highlight: true
  },
  {
    id: "react-typescript",
    name: "TypeScript & Typed Systems",
    category: "web-dev",
    categoryLabel: "FULL-STACK WEB",
    level: "Production Ready",
    proficiency: 93,
    role: "Type Safety & Interfaces",
    description: "Strictly typed component architectures, custom hooks, and reliable event-driven systems.",
    tags: ["TypeScript", "Strict Typing", "Component Systems", "Hooks"],
    highlight: true
  },
  {
    id: "tailwind-canvas",
    name: "Modern UI, Tailwind & Canvas",
    category: "web-dev",
    categoryLabel: "FULL-STACK WEB",
    level: "Creative Engineering",
    proficiency: 90,
    role: "Visual Systems & Interactions",
    description: "High-contrast dark design systems, 60fps micro-interactions, and procedural 2D canvas visuals.",
    tags: ["Tailwind CSS", "HTML5 Canvas", "Responsive UX", "Micro-Animations"],
    highlight: false
  },

  // 2. AI & Machine Learning
  {
    id: "python-ml",
    name: "Python for AI/ML",
    category: "ai-ml",
    categoryLabel: "AI & MACHINE LEARNING",
    level: "Primary Language",
    proficiency: 95,
    role: "Data Pipelines & Modeling",
    description: "End-to-end data processing, feature engineering, and predictive mathematical modeling.",
    tags: ["Python", "NumPy", "Pandas", "Scikit-Learn"],
    highlight: true
  },
  {
    id: "scikit-ml",
    name: "Machine Learning & Scikit-Learn",
    category: "ai-ml",
    categoryLabel: "AI & MACHINE LEARNING",
    level: "Production Ready",
    proficiency: 92,
    role: "Predictive Models & Algorithms",
    description: "Supervised & unsupervised models, distance metrics (KNN), and dimensional evaluation matrices.",
    tags: ["Scikit-Learn", "KNN", "Classification", "Regression"],
    highlight: true
  },
  {
    id: "dl-vision",
    name: "Deep Learning & Computer Vision",
    category: "ai-ml",
    categoryLabel: "AI & MACHINE LEARNING",
    level: "Core Specialization",
    proficiency: 90,
    role: "Neural Nets & Image Processing",
    description: "Feedforward neural nets, backpropagation, and real-time computer vision detection with OpenCV.",
    tags: ["Neural Nets", "OpenCV", "Feature Extraction", "Backpropagation"],
    highlight: true
  },

  // 3. Agentic AI & Integration
  {
    id: "agentic-orchestration",
    name: "Autonomous AI Agents & Tools",
    category: "agentic-ai",
    categoryLabel: "AGENTIC AI & SYSTEMS",
    level: "Core Mastery",
    proficiency: 94,
    role: "Tool Calling & Multi-Agent Workflows",
    description: "Multi-step reasoning agents, function calling, and structured LLM tool orchestration loops.",
    tags: ["Tool Calling", "Multi-Agent Systems", "Autonomous Loops", "LLM APIs"],
    highlight: true
  },
  {
    id: "voice-ai-interface",
    name: "Voice AI & Natural Language",
    category: "agentic-ai",
    categoryLabel: "AGENTIC AI & SYSTEMS",
    level: "Production Ready",
    proficiency: 91,
    role: "Conversational Interfaces",
    description: "Real-time natural language voice interactions bridging users directly with ML pipelines.",
    tags: ["Voice AI", "Speech-to-Text", "Conversational UI", "Real-Time"],
    highlight: true
  },
  {
    id: "vector-search",
    name: "Vector Embeddings & Search",
    category: "agentic-ai",
    categoryLabel: "AGENTIC AI & SYSTEMS",
    level: "Specialized Engine",
    proficiency: 89,
    role: "Semantic Matching & Retrieval",
    description: "High-dimensional similarity matching, TF-IDF vectorization, and Cosine Similarity retrieval.",
    tags: ["TF-IDF", "Cosine Similarity", "Vector Space", "Semantic Search"],
    highlight: false
  },

  // 4. Backends & APIs
  {
    id: "fastapi-uvicorn",
    name: "FastAPI & Async Backends",
    category: "backend-systems",
    categoryLabel: "BACKENDS & APIS",
    level: "Core Backend Standard",
    proficiency: 93,
    role: "High-Throughput APIs",
    description: "Sub-50ms asynchronous REST backends, streaming coroutines, Pydantic, and WebSockets.",
    tags: ["FastAPI", "Uvicorn", "Async Coroutines", "Pydantic"],
    highlight: true
  },
  {
    id: "node-rest",
    name: "Node.js & RESTful Services",
    category: "backend-systems",
    categoryLabel: "BACKENDS & APIS",
    level: "Production Ready",
    proficiency: 88,
    role: "Server Runtimes & Integrations",
    description: "Lightweight microservices, asynchronous I/O, API gateways, and seamless client integrations.",
    tags: ["Node.js", "Express", "REST APIs", "JSON Services"],
    highlight: false
  },
  {
    id: "postgres-supabase",
    name: "Supabase & PostgreSQL",
    category: "backend-systems",
    categoryLabel: "BACKENDS & APIS",
    level: "Database & Auth",
    proficiency: 87,
    role: "Cloud Persistence & Auth",
    description: "Relational database schema modeling, row-level security (RLS), and persistent storage.",
    tags: ["PostgreSQL", "Supabase", "RLS", "Auth"],
    highlight: false
  }
];

export const CAPABILITY_FILTERS = [
  { id: "all", label: "ALL CAPABILITIES" },
  { id: "web-dev", label: "FULL-STACK WEB" },
  { id: "ai-ml", label: "AI & MACHINE LEARNING" },
  { id: "agentic-ai", label: "AGENTIC AI & SYSTEMS" },
  { id: "backend-systems", label: "BACKENDS & APIS" }
];

export const PHILOSOPHY_PILLARS = [
  {
    index: "01",
    title: "Full-Stack Web Engineering",
    description: "Architecting high-performance, modern web applications with Next.js, React, and TypeScript, focusing on intuitive UX, speed, and clean code."
  },
  {
    index: "02",
    title: "AI & Machine Learning Systems",
    description: "Developing predictive models, real-time computer vision pipelines with OpenCV, and high-dimensional vector similarity engines deployed to production."
  },
  {
    index: "03",
    title: "Agentic AI & System Integration",
    description: "Orchestrating autonomous AI agents, tool-calling coroutines, and conversational voice interfaces embedded directly into web platforms."
  }
];

export const HACKATHONS: HackathonItem[] = [
  {
    id: "devpost-paritok",
    title: "Build with Paritok: Token-Efficiency Hackathon",
    organizer: "Devpost / Paritok",
    award: "AST Token-Efficiency Winner / Featured Project",
    badgeType: "winner",
    date: "2024",
    project: "Lean-PR (Automated Pull-Request Reviewer)",
    description: "Built an Abstract Syntax Tree (AST) pruning engine that strips code boilerplate to compress Git diff tokens by 65% before LLM processing.",
    impactMetric: "-65%",
    metricLabel: "TOKEN COMPRESSION",
    technologies: ["Python", "AST Parsing", "Streamlit", "Git Diff Heuristics"],
    link: "https://github.com/aniketpuri689"
  },
  {
    id: "gla-ai-hackathon",
    title: "GLA University AI & Web Innovation Sprint",
    organizer: "GLA University Technical Council",
    award: "1st Place — AI & Systems Innovation Award",
    badgeType: "winner",
    date: "2024",
    project: "WheatSpectral AI & Real-Time Biometric Verifier",
    description: "Engineered full-stack integration connecting computer vision and conversational voice AI with responsive Next.js web applications under 45ms.",
    impactMetric: "<45ms",
    metricLabel: "VERIFICATION SPEED",
    technologies: ["Python", "Voice AI", "OpenCV", "Next.js"],
    link: "https://github.com/aniketpuri689"
  },
  {
    id: "code-innovation-sprint",
    title: "National Student AI Buildathon",
    organizer: "National Developer Guild",
    award: "Top Finalist & Technical Excellence",
    badgeType: "finalist",
    date: "2024",
    project: "AI Forge & Mini Jarvis",
    description: "Designed a multi-modal asynchronous AI assistant using FastAPI coroutines and WebSockets with an interactive React frontend operating under 120ms.",
    impactMetric: "<120ms",
    metricLabel: "ROUNDTRIP STREAM",
    technologies: ["FastAPI", "React", "WebSockets", "Coroutines"],
    link: "https://github.com/aniketpuri689"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "fullstack-cert",
    title: "Modern Full-Stack Web Architecture & TypeScript",
    issuer: "Frontend Masters / Advanced Developer Track",
    date: "2024",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST & Async APIs"]
  },
  {
    id: "dl-spec",
    title: "Deep Learning & Neural Network Architectures",
    issuer: "DeepLearning.AI / Accredited Program",
    date: "2024",
    skills: ["Neural Networks", "Backpropagation", "Loss Functions", "Gradient Descent", "CNNs"]
  },
  {
    id: "opencv-cert",
    title: "Computer Vision & Image Processing with OpenCV",
    issuer: "Computer Vision Guild / Accredited Track",
    date: "2024",
    skills: ["OpenCV", "Feature Extraction", "Image Transformations", "Biometric Processing"]
  },
  {
    id: "python-ml-cert",
    title: "Machine Learning Algorithms & Data Science Foundations",
    issuer: "Python AI Institute",
    date: "2024",
    skills: ["Scikit-Learn", "KNN", "Dimensionality Reduction", "Statistical Modeling", "NumPy"]
  }
];

export const EXTRACURRICULARS: ExtracurricularItem[] = [
  {
    id: "gla-ai-club",
    role: "Core Technical Member & Full-Stack / AI Lead",
    organization: "GLA University AI & Developer Society",
    period: "2024 — Present",
    description: "Leading hands-on technical workshops in Next.js full-stack development, ML pipelines, and Agentic AI workflows for university engineers.",
    keyContributions: [
      "Led workshops on building full-stack web applications with Next.js and FastAPI.",
      "Mentored 40+ peers on structuring end-to-end TypeScript & ML projects.",
      "Organized coding sprints focused on agentic AI and algorithmic problem-solving."
    ],
    badge: "CAMPUS LEADERSHIP"
  },
  {
    id: "open-source-dev",
    role: "Full-Stack & Open Source Contributor",
    organization: "Open-Source Web & AI Community",
    period: "2023 — Present",
    description: "Developing developer tooling, client sandboxes, and modern frontend utilities for students and engineers.",
    keyContributions: [
      "Built open-source client-side sandboxing components for browser code runners.",
      "Engineered lightweight API bridges connecting AI pipelines with React interfaces.",
      "Published reproducible full-stack boilerplates with TypeScript and Tailwind CSS."
    ],
    badge: "OPEN SOURCE"
  },
  {
    id: "math-mentorship",
    role: "Mathematics & Algorithmic Peer Guide",
    organization: "GLA University Academic Circle",
    period: "2024 — Present",
    description: "Helping students master mathematical foundations of artificial intelligence and systems engineering.",
    keyContributions: [
      "Authored visual breakdowns mapping matrix dot products to neural layer weights.",
      "Created practice sets connecting calculus concepts directly to gradient descent code.",
      "Fostered a build-first culture where mathematical rigor powers working software."
    ],
    badge: "PEER MENTORSHIP"
  }
];

export interface TechItem {
  name: string;
  category: string;
  level: string;
  highlight?: boolean;
}

export const TECH_STACK: TechItem[] = CAPABILITIES_DATA.map((item) => ({
  name: item.name,
  category: item.category,
  level: item.level,
  highlight: item.highlight
}));
