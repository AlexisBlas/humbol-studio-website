/**
 * Soft aurora mesh matching the former Figma hero-bg.jpg —
 * layered radial blobs + film grain, no image asset.
 */
export function HeroMeshBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-[#f4fbf9]" />

      {/* Cyan — upper left (brand #4ADED7) */}
      <div
        className="absolute -left-[12%] -top-[18%] h-[85%] w-[70%] rounded-full opacity-90 blur-[90px]"
        style={{
          background:
            "radial-gradient(ellipse at center, #4ADED7 0%, #4ADED7aa 35%, transparent 70%)",
        }}
      />

      {/* Mint — upper right */}
      <div
        className="absolute -right-[8%] top-[0%] h-[55%] w-[55%] rounded-full opacity-80 blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse at center, #9BE8C8 0%, #9BE8C866 40%, transparent 72%)",
        }}
      />

      {/* Soft white glow — center */}
      <div
        className="absolute left-[18%] top-[28%] h-[70%] w-[65%] rounded-full opacity-90 blur-[80px]"
        style={{
          background:
            "radial-gradient(ellipse at center, #ffffff 0%, #ffffffcc 45%, transparent 75%)",
        }}
      />

      {/* Pink — bottom right (brand glow) */}
      <div
        className="absolute -bottom-[15%] -right-[5%] h-[65%] w-[55%] rounded-full opacity-85 blur-[95px]"
        style={{
          background:
            "radial-gradient(ellipse at center, #FA99DB 0%, #FA99DB88 38%, transparent 70%)",
        }}
      />

      {/* Lavender — bottom center */}
      <div
        className="absolute bottom-[-10%] left-[28%] h-[45%] w-[40%] rounded-full opacity-75 blur-[85px]"
        style={{
          background:
            "radial-gradient(ellipse at center, #C9B8F5 0%, #C9B8F566 40%, transparent 70%)",
        }}
      />

      {/* Pale teal bleed — mid left */}
      <div
        className="absolute bottom-[10%] left-[-10%] h-[50%] w-[40%] rounded-full opacity-50 blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse at center, #A8EDE6 0%, transparent 68%)",
        }}
      />

      {/* Film grain */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.42] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="hero-mesh-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-mesh-grain)" />
      </svg>
    </div>
  );
}
