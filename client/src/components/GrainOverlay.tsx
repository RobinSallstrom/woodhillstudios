// GrainOverlay — animated SVG noise texture at 7% opacity over the entire site
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay"
      style={{ pointerEvents: 'none' }}
    />
  );
}
