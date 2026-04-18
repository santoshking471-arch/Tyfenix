import type React from "react";
import AnimatedBlobs from "./AnimatedBlobs";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background">
      {/* Animated background blobs */}
      <AnimatedBlobs />

      {/* Main content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">{children}</main>

        {showFooter && (
          <footer className="border-t border-white/10 mt-16">
            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="text-xl font-bold glow-neon-primary font-display"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  SlimeMart
                </span>
                <span className="text-muted-foreground text-sm">
                  — Premium E-Commerce
                </span>
              </div>
              <div className="text-muted-foreground text-sm text-center">
                © {new Date().getFullYear()}.{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                    typeof window !== "undefined"
                      ? window.location.hostname
                      : "",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Built with love using caffeine.ai
                </a>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
