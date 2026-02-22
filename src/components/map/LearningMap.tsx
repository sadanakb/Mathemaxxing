'use client';

import type { MapLayout } from '@/lib/curriculum/map-layout';
import { MapNodeComponent } from './MapNode';

type LearningMapProps = {
  layout: MapLayout;
};

const NODE_W = 80;
const NODE_H = 80;
const ROW_GAP = 50;
const COL_GAP = 16;
const PADDING = 24;

export function LearningMap({ layout }: LearningMapProps) {
  const { nodes, edges, totalRows, maxCols } = layout;

  const svgWidth = maxCols * (NODE_W + COL_GAP) + PADDING * 2;
  const svgHeight = totalRows * (NODE_H + ROW_GAP) + PADDING * 2;

  const posMap = new Map<string, { cx: number; cy: number }>();
  for (const node of nodes) {
    const rowNodes = nodes.filter((n) => n.row === node.row);
    const rowWidth = rowNodes.length * (NODE_W + COL_GAP) - COL_GAP;
    const offsetX = (svgWidth - rowWidth) / 2;
    const x = offsetX + node.col * (NODE_W + COL_GAP);
    const y = PADDING + node.row * (NODE_H + ROW_GAP);
    posMap.set(node.topicId, { cx: x + NODE_W / 2, cy: y + NODE_H / 2 });
  }

  return (
    <div className="relative overflow-auto touch-pan-x touch-pan-y" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="relative" style={{ width: svgWidth, height: svgHeight, minWidth: '100%' }}>
        {/* SVG edges — Bezier curves */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={svgWidth}
          height={svgHeight}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="edge-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          {edges.map((edge) => {
            const from = posMap.get(edge.from);
            const to = posMap.get(edge.to);
            if (!from || !to) return null;

            const y1 = from.cy + NODE_H / 2 - 4;
            const y2 = to.cy - NODE_H / 2 + 4;
            const midY = (y1 + y2) / 2;

            // Bezier curve for smooth S-shape
            const path = `M ${from.cx} ${y1} C ${from.cx} ${midY}, ${to.cx} ${midY}, ${to.cx} ${y2}`;

            return (
              <path
                key={`${edge.from}-${edge.to}`}
                d={path}
                stroke="url(#edge-gradient)"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
              />
            );
          })}

          {/* Decorative dots between rows */}
          {Array.from({ length: Math.max(0, totalRows - 1) }).map((_, row) => {
            const y = PADDING + (row + 0.5) * (NODE_H + ROW_GAP) + NODE_H / 2;
            return (
              <g key={`deco-${row}`}>
                <circle cx={svgWidth * 0.2} cy={y} r={2} fill="var(--color-secondary)" opacity={0.2} />
                <circle cx={svgWidth * 0.8} cy={y} r={3} fill="var(--color-primary)" opacity={0.1} />
              </g>
            );
          })}
        </svg>

        {/* HTML nodes */}
        {nodes.map((node) => {
          const rowNodes = nodes.filter((n) => n.row === node.row);
          const rowWidth = rowNodes.length * (NODE_W + COL_GAP) - COL_GAP;
          const offsetX = (svgWidth - rowWidth) / 2;
          const x = offsetX + node.col * (NODE_W + COL_GAP);
          const y = PADDING + node.row * (NODE_H + ROW_GAP);

          return (
            <div
              key={node.topicId}
              className="absolute"
              style={{ left: x, top: y, width: NODE_W, height: NODE_H }}
            >
              <MapNodeComponent node={node} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
