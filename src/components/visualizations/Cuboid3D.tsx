'use client';

type Cuboid3DProps = {
  width: number;
  height: number;
  depth: number;
  labels?: boolean;
  color?: string;
};

export function Cuboid3D({
  width: w,
  height: h,
  depth: d,
  labels = true,
  color,
}: Cuboid3DProps) {
  // Scale factor to fit into viewBox
  const maxDim = Math.max(w, h, d);
  const scale = 160 / maxDim;

  const sw = w * scale; // Scaled width (along x-axis)
  const sh = h * scale; // Scaled height (along y-axis going down)
  const sd = d * scale; // Scaled depth (along isometric y-axis going up-right)

  // Isometric projection angles (cavalier oblique)
  const isoAngle = Math.PI / 6; // 30 degrees
  const depthX = sd * Math.cos(isoAngle);
  const depthY = sd * Math.sin(isoAngle);

  const padding = 50;

  // Front face: bottom-left corner as origin
  const originX = padding;
  const originY = padding + depthY + sh;

  // 8 vertices of the cuboid
  // Front face (z=0)
  const A: [number, number] = [originX, originY]; // bottom-left front
  const B: [number, number] = [originX + sw, originY]; // bottom-right front
  const C: [number, number] = [originX + sw, originY - sh]; // top-right front
  const D: [number, number] = [originX, originY - sh]; // top-left front

  // Back face (z=depth)
  const E: [number, number] = [A[0] + depthX, A[1] - depthY]; // bottom-left back
  const F: [number, number] = [B[0] + depthX, B[1] - depthY]; // bottom-right back
  const G: [number, number] = [C[0] + depthX, C[1] - depthY]; // top-right back
  const H: [number, number] = [D[0] + depthX, D[1] - depthY]; // top-left back

  const fillColor = color ?? 'var(--color-primary)';

  const viewW = sw + depthX + padding * 2;
  const viewH = sh + depthY + padding * 2;

  const ptStr = (p: [number, number]) => `${p[0]},${p[1]}`;

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      style={{ width: '100%', maxWidth: viewW }}
      role="img"
      aria-label={`Quader: ${w} x ${h} x ${d}`}
    >
      {/* Hidden (back) edges - dashed */}
      <line
        x1={E[0]} y1={E[1]} x2={H[0]} y2={H[1]}
        stroke="#9ca3af"
        strokeWidth={1}
        strokeDasharray="4,3"
      />
      <line
        x1={E[0]} y1={E[1]} x2={F[0]} y2={F[1]}
        stroke="#9ca3af"
        strokeWidth={1}
        strokeDasharray="4,3"
      />
      <line
        x1={E[0]} y1={E[1]} x2={A[0]} y2={A[1]}
        stroke="#9ca3af"
        strokeWidth={1}
        strokeDasharray="4,3"
      />

      {/* Front face */}
      <polygon
        points={`${ptStr(A)} ${ptStr(B)} ${ptStr(C)} ${ptStr(D)}`}
        fill={fillColor}
        fillOpacity={0.15}
        stroke={fillColor}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Top face */}
      <polygon
        points={`${ptStr(D)} ${ptStr(C)} ${ptStr(G)} ${ptStr(H)}`}
        fill={fillColor}
        fillOpacity={0.25}
        stroke={fillColor}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Right face */}
      <polygon
        points={`${ptStr(B)} ${ptStr(F)} ${ptStr(G)} ${ptStr(C)}`}
        fill={fillColor}
        fillOpacity={0.1}
        stroke={fillColor}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Hidden back edges that go from H to G and F to G are already drawn as part of faces */}
      {/* The remaining visible back edge */}
      <line
        x1={H[0]} y1={H[1]} x2={G[0]} y2={G[1]}
        stroke={fillColor}
        strokeWidth={2}
      />

      {/* Labels */}
      {labels && (
        <>
          {/* Width label (bottom front edge) */}
          <text
            x={(A[0] + B[0]) / 2}
            y={A[1] + 18}
            textAnchor="middle"
            fontSize={12}
            fontWeight="600"
            fill="#374151"
          >
            {w} cm
          </text>

          {/* Height label (left front edge) */}
          <text
            x={A[0] - 14}
            y={(A[1] + D[1]) / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fontWeight="600"
            fill="#374151"
            transform={`rotate(-90, ${A[0] - 14}, ${(A[1] + D[1]) / 2})`}
          >
            {h} cm
          </text>

          {/* Depth label (top edge going back) */}
          {(() => {
            const mx = (D[0] + H[0]) / 2;
            const my = (D[1] + H[1]) / 2;
            const angle = Math.atan2(H[1] - D[1], H[0] - D[0]) * (180 / Math.PI);
            return (
              <text
                x={mx - 10}
                y={my - 8}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={12}
                fontWeight="600"
                fill="#374151"
                transform={`rotate(${angle}, ${mx - 10}, ${my - 8})`}
              >
                {d} cm
              </text>
            );
          })()}
        </>
      )}

      {/* Vertex dots for clarity */}
      {[A, B, C, D, H, G, F].map((pt, i) => (
        <circle
          key={`dot-${i}`}
          cx={pt[0]}
          cy={pt[1]}
          r={2.5}
          fill={fillColor}
        />
      ))}
    </svg>
  );
}
