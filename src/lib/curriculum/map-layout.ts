/**
 * Map Layout — Topological sort + row-based layout for Learning Map
 *
 * Takes curriculum topics with prerequisites and produces
 * a visual layout with rows (levels) and positions.
 */

import type { CurriculumTopic, TopicProgress, MasteryLevel } from './types';

export type MapNode = {
  topicId: string;
  title: string;
  row: number;
  col: number;
  mastery: MasteryLevel;
  stars: number;
  locked: boolean;
  prerequisites: string[];
};

export type MapEdge = {
  from: string;
  to: string;
};

export type MapLayout = {
  nodes: MapNode[];
  edges: MapEdge[];
  totalRows: number;
  maxCols: number;
};

/**
 * Compute a topological layout for the curriculum topics.
 * Topics with no prerequisites come first (row 0).
 */
export function computeMapLayout(
  topics: CurriculumTopic[],
  progress: Record<string, TopicProgress>
): MapLayout {
  const topicMap = new Map(topics.map((t) => [t.id, t]));
  const topicIds = new Set(topics.map((t) => t.id));

  // Compute levels via topological sort (BFS-based)
  const inDegree = new Map<string, number>();
  const adj = new Map<string, string[]>();

  for (const t of topics) {
    inDegree.set(t.id, 0);
    adj.set(t.id, []);
  }

  const edges: MapEdge[] = [];
  for (const t of topics) {
    for (const preReq of t.prerequisites) {
      if (topicIds.has(preReq)) {
        adj.get(preReq)!.push(t.id);
        inDegree.set(t.id, (inDegree.get(t.id) ?? 0) + 1);
        edges.push({ from: preReq, to: t.id });
      }
    }
  }

  // BFS to assign rows
  const rowMap = new Map<string, number>();
  const queue: string[] = [];

  for (const [id, deg] of inDegree) {
    if (deg === 0) {
      queue.push(id);
      rowMap.set(id, 0);
    }
  }

  let qi = 0;
  while (qi < queue.length) {
    const curr = queue[qi++];
    const currRow = rowMap.get(curr)!;
    for (const next of adj.get(curr) ?? []) {
      const nextRow = Math.max(rowMap.get(next) ?? 0, currRow + 1);
      rowMap.set(next, nextRow);
      inDegree.set(next, (inDegree.get(next) ?? 0) - 1);
      if (inDegree.get(next) === 0) {
        queue.push(next);
      }
    }
  }

  // Handle any unprocessed topics (cycles or disconnected)
  for (const t of topics) {
    if (!rowMap.has(t.id)) {
      rowMap.set(t.id, 0);
    }
  }

  // Group by row and assign columns
  const rowGroups = new Map<number, string[]>();
  for (const [id, row] of rowMap) {
    if (!rowGroups.has(row)) rowGroups.set(row, []);
    rowGroups.get(row)!.push(id);
  }

  const totalRows = Math.max(0, ...rowGroups.keys()) + 1;
  let maxCols = 1;

  const nodes: MapNode[] = [];

  for (let row = 0; row < totalRows; row++) {
    const group = rowGroups.get(row) ?? [];
    maxCols = Math.max(maxCols, group.length);

    group.forEach((id, col) => {
      const topic = topicMap.get(id)!;
      const tp = progress[id];
      const mastery = tp?.masteryLevel ?? 'not-started';

      // A topic is locked if any prerequisite is not mastered
      const locked = topic.prerequisites.some((preId) => {
        if (!topicIds.has(preId)) return false;
        const preTp = progress[preId];
        return !preTp || preTp.masteryLevel !== 'mastered';
      });

      nodes.push({
        topicId: id,
        title: topic.title,
        row,
        col,
        mastery,
        stars: tp?.stars ?? 0,
        locked,
        prerequisites: topic.prerequisites.filter((p) => topicIds.has(p)),
      });
    });
  }

  return { nodes, edges, totalRows, maxCols };
}
