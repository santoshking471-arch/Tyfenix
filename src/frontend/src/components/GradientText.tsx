import { cn } from "@/lib/utils";
import type React from "react";

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "accent";
} & {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "label";
};

export default function GradientText({
  children,
  className,
  as: Tag = "span",
  variant = "primary",
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "text-transparent bg-clip-text inline-block",
        variant === "primary" && "glow-neon-primary",
        variant === "accent" && "glow-neon-accent",
        className,
      )}
      style={
        variant === "primary"
          ? {
              backgroundImage:
                "linear-gradient(135deg, oklch(0.68 0.25 150), oklch(0.62 0.28 270))",
            }
          : {
              backgroundImage:
                "linear-gradient(90deg, oklch(0.75 0.22 145), oklch(0.68 0.25 150))",
            }
      }
    >
      {children}
    </Tag>
  );
}
