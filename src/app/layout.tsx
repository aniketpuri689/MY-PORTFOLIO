import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030303",
};

export const metadata: Metadata = {
  title: "Aniket — AI & ML Engineer | ThunderFace Portfolio",
  description:
    "Portfolio of Aniket, 1st-Year B.Tech Computer Science & Engineering (AI/ML) student at GLA University. High-performance software-hardware bridges, edge computer vision, and full-stack systems.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Computer Vision",
    "GLA University",
    "ThunderFace",
    "ESP32",
    "OpenCV",
    "Next.js Portfolio",
    "Creative Developer"
  ],
  authors: [{ name: "Aniket" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark bg-[#030303] text-zinc-100 antialiased`}
    >
      <body className="font-sans bg-[#030303] text-zinc-100 min-h-screen selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
