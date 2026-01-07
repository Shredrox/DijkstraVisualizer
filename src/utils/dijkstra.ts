import type { NodeId } from "./graphData";
import { edges } from "./graphData";

export interface DijkstraStep {
  type: "init" | "visit" | "relax" | "complete";
  currentNode?: NodeId;
  visitedNodes: Set<NodeId>;
  distances: Record<NodeId, number>;
  previous: Record<NodeId, NodeId | null>;
  unvisitedNodes: Set<NodeId>;
  relaxedEdge?: {
    from: NodeId;
    to: NodeId;
    oldDistance: number;
    newDistance: number;
  };
  description: string;
  path?: NodeId[];
}

export function* dijkstraGenerator(
  start: NodeId,
  end: NodeId
): Generator<DijkstraStep> {
  const allNodes = Object.keys(edges) as NodeId[];
  const distances: Record<NodeId, number> = {} as Record<NodeId, number>;
  const previous: Record<NodeId, NodeId | null> = {} as Record<
    NodeId,
    NodeId | null
  >;
  const visitedNodes = new Set<NodeId>();
  const unvisitedNodes = new Set<NodeId>(allNodes);

  for (const node of allNodes) {
    distances[node] = node === start ? 0 : Infinity;
    previous[node] = null;
  }

  yield {
    type: "init",
    visitedNodes: new Set(visitedNodes),
    distances: { ...distances },
    previous: { ...previous },
    unvisitedNodes: new Set(unvisitedNodes),
    description: `Initialized: Starting from node ${start}. All distances set to ∞ except ${start} which is 0.`,
  };

  while (unvisitedNodes.size > 0) {
    let current: NodeId | null = null;
    let minDistance = Infinity;

    for (const node of unvisitedNodes) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        current = node;
      }
    }

    if (current === null || distances[current] === Infinity) {
      yield {
        type: "complete",
        visitedNodes: new Set(visitedNodes),
        distances: { ...distances },
        previous: { ...previous },
        unvisitedNodes: new Set(unvisitedNodes),
        description: "No more reachable nodes. Algorithm complete.",
        path: reconstructPath(previous, start, end),
      };
      break;
    }

    unvisitedNodes.delete(current);
    visitedNodes.add(current);

    yield {
      type: "visit",
      currentNode: current,
      visitedNodes: new Set(visitedNodes),
      distances: { ...distances },
      previous: { ...previous },
      unvisitedNodes: new Set(unvisitedNodes),
      description: `Visiting node ${current} (distance: ${distances[current]}). Checking all neighbors...`,
    };

    if (current === end) {
      yield {
        type: "complete",
        currentNode: current,
        visitedNodes: new Set(visitedNodes),
        distances: { ...distances },
        previous: { ...previous },
        unvisitedNodes: new Set(unvisitedNodes),
        description: `Reached destination ${end}! Shortest distance: ${distances[end]}`,
        path: reconstructPath(previous, start, end),
      };
      break;
    }

    const neighbors = edges[current] || [];
    for (const edge of neighbors) {
      const neighbor = edge.n;

      if (visitedNodes.has(neighbor)) {
        continue;
      }

      const alt = distances[current] + edge.cost;
      const oldDistance = distances[neighbor];

      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = current;

        yield {
          type: "relax",
          currentNode: current,
          visitedNodes: new Set(visitedNodes),
          distances: { ...distances },
          previous: { ...previous },
          unvisitedNodes: new Set(unvisitedNodes),
          relaxedEdge: {
            from: current,
            to: neighbor,
            oldDistance: oldDistance,
            newDistance: alt,
          },
          description: `Updated ${neighbor}: ${current} → ${neighbor} with cost ${
            edge.cost
          }. New distance: ${alt} (was ${
            oldDistance === Infinity ? "∞" : oldDistance
          })`,
        };
      }
    }
  }

  return {
    type: "complete",
    visitedNodes: new Set(visitedNodes),
    distances: { ...distances },
    previous: { ...previous },
    unvisitedNodes: new Set(unvisitedNodes),
    description: "Algorithm complete.",
    path: reconstructPath(previous, start, end),
  };
}

function reconstructPath(
  previous: Record<NodeId, NodeId | null>,
  start: NodeId,
  end: NodeId
): NodeId[] {
  const path: NodeId[] = [];
  let current: NodeId | null = end;

  while (current !== null) {
    path.unshift(current);
    if (current === start) {
      break;
    }
    current = previous[current];
  }

  return path.length > 1 && path[0] === start ? path : [];
}
