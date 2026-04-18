import React from "react";

export default function AnimatedBlobs() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary neon green blob */}
      <div
        className="blob-animate absolute"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          background:
            "radial-gradient(ellipse at center, rgba(0,255,136,0.12) 0%, rgba(0,255,136,0.04) 50%, transparent 70%)",
          top: "-150px",
          left: "-100px",
          filter: "blur(40px)",
          animationDelay: "0s",
        }}
      />

      {/* Secondary neon purple blob */}
      <div
        className="blob-animate absolute"
        style={{
          width: "700px",
          height: "700px",
          borderRadius: "40% 60% 30% 70% / 60% 40% 50% 50%",
          background:
            "radial-gradient(ellipse at center, rgba(183,0,255,0.10) 0%, rgba(183,0,255,0.04) 50%, transparent 70%)",
          top: "30%",
          right: "-200px",
          filter: "blur(50px)",
          animationDelay: "2s",
        }}
      />

      {/* Mid green-purple blend blob */}
      <div
        className="blob-animate absolute"
        style={{
          width: "500px",
          height: "500px",
          borderRadius: "50% 50% 60% 40% / 40% 60% 50% 50%",
          background:
            "radial-gradient(ellipse at center, rgba(100,50,255,0.08) 0%, rgba(0,200,100,0.05) 50%, transparent 70%)",
          bottom: "10%",
          left: "20%",
          filter: "blur(45px)",
          animationDelay: "4s",
        }}
      />

      {/* Small accent blob */}
      <div
        className="blob-animate absolute"
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "70% 30% 40% 60% / 40% 70% 30% 60%",
          background:
            "radial-gradient(ellipse at center, rgba(0,255,136,0.08) 0%, transparent 70%)",
          bottom: "5%",
          right: "10%",
          filter: "blur(35px)",
          animationDelay: "1s",
        }}
      />
    </div>
  );
}
