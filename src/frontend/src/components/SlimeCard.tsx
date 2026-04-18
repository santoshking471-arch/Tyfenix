import { cn } from "@/lib/utils";
import type React from "react";

interface SlimeCardProps {
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
  "data-ocid"?: string;
}

export default function SlimeCard({
  children,
  className,
  glowing = false,
  hoverable = false,
  onClick,
  "data-ocid": dataOcid,
}: SlimeCardProps) {
  return (
    <div
      className={cn(
        "glass-card float-entrance",
        glowing && "glow-border",
        hoverable && "hover-lift cursor-pointer",
        className,
      )}
      onClick={onClick}
      onKeyUp={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      data-ocid={dataOcid}
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Subtle inner gradient overlay */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,255,136,0.03) 0%, rgba(183,0,255,0.03) 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
