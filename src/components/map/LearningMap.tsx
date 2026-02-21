'use client';

import type { MapLayout } from '@/lib/curriculum/map-layout';
import { MapNodeComponent } from './MapNode';

type LearningMapProps = {
  layout: MapLayout;
};

const NODE_W = 80;
const NODE_H = 80;
const ROW_GAP = 40;
const COL_GAP = 16;
const PADDING = 24;

export function LearningMap({ layout }: LearningMapProps) {
  const { nodes, edges, totalRows, maxCols } = layout;

  const svgWidth = maxCols * (NODE_W + COL_GAP) + PADDING * 2;
  const svgHeight = totalRows * (NODE_H + ROW_GAP) + PADDING * 2;

  // Pre-compute node positions for edge drawing
  const posMap = new Map<string, { cx: number; cy: number }>();
  for (const node of nodes) {
    // Center nodes within their row
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
        {/* SVG edges */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={svgWidth}
          height={svgHeight}
          aria-hidden="true"
        >
          {edges.map((edge) => {
            const from = posMap.get(edge.from);
            const to = posMap.get(edge.to);
            if (!from || !to) return null;

            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={from.cx}
                y1={from.cy + NODE_H / 2 - 4}
                x2={to.cx}
                y2={to.cy - NODE_H / 2 + 4}
                stroke="var(--color-primary)"
                strokeWidth={2}
                strokeOpacity={0.3}
                strokeDasharray="4 4"
              />
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
              style={{
                left: x,
                top: y,
                width: NODE_W,
                height: NODE_H,
              }}
            >
              <MapNodeComponent node={node} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
