import type { NodeId } from "../utils/graphData";
import { nodes, edges } from "../utils/graphData";

interface GraphProps {
  visitedNodes: Set<NodeId>;
  currentNode?: NodeId;
  distances: Record<NodeId, number>;
  path: NodeId[];
  relaxedEdge?: {
    from: NodeId;
    to: NodeId;
  };
}

export default function Graph({
  visitedNodes,
  currentNode,
  distances,
  path,
  relaxedEdge,
}: GraphProps) {
  const pathSet = new Set(path);

  const isNodeInPath = (nodeId: NodeId) => pathSet.has(nodeId);

  const isEdgeInPath = (from: NodeId, to: NodeId) => {
    const fromIndex = path.indexOf(from);
    const toIndex = path.indexOf(to);
    return (
      fromIndex !== -1 && toIndex !== -1 && Math.abs(fromIndex - toIndex) === 1
    );
  };

  const renderEdge = (from: NodeId, to: NodeId, cost: number) => {
    const fromPos = nodes[from];
    const toPos = nodes[to];

    const isRelaxed =
      relaxedEdge &&
      ((relaxedEdge.from === from && relaxedEdge.to === to) ||
        (relaxedEdge.from === to && relaxedEdge.to === from));

    const inPath = isEdgeInPath(from, to);

    const midX = (fromPos.x + toPos.x) / 2;
    const midY = (fromPos.y + toPos.y) / 2;

    return (
      <g key={`${from}-${to}`}>
        <line
          x1={fromPos.x}
          y1={fromPos.y}
          x2={toPos.x}
          y2={toPos.y}
          stroke={isRelaxed ? "#fbbf24" : inPath ? "#10b981" : "#475569"}
          strokeWidth={isRelaxed ? 3 : inPath ? 3 : 2}
          opacity={inPath ? 1 : 0.6}
          style={{
            transition: "all 0.3s ease",
          }}
        />
        <circle
          cx={midX}
          cy={midY}
          r={12}
          fill="#1e293b"
          stroke={isRelaxed ? "#fbbf24" : inPath ? "#10b981" : "#64748b"}
          strokeWidth={isRelaxed ? 2 : inPath ? 2 : 1}
          style={{
            transition: "all 0.3s ease",
          }}
        />
        <text
          x={midX}
          y={midY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={isRelaxed ? "#fbbf24" : inPath ? "#10b981" : "#94a3b8"}
          fontSize={11}
          fontWeight={isRelaxed || inPath ? "bold" : "normal"}
          style={{
            transition: "all 0.3s ease",
          }}
        >
          {cost}
        </text>
      </g>
    );
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 0,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 440"
        preserveAspectRatio="xMidYMid meet"
        style={{
          background: "#0f172a",
          borderRadius: 12,
          border: "1px solid #334155",
          maxHeight: "100%",
        }}
      >
        {Object.entries(edges).map(([fromId, edgeList]) =>
          edgeList.map((edge) => {
            const from = fromId as NodeId;
            const to = edge.n;
            if (from < to) {
              return renderEdge(from, to, edge.cost);
            }
            return null;
          })
        )}

        {Object.entries(nodes).map(([nodeId, pos]) => {
          const id = nodeId as NodeId;
          const distance = distances[id];
          const isVisited = visitedNodes.has(id);
          const isCurrent = currentNode === id;
          const inPath = isNodeInPath(id);

          return (
            <g key={id}>
              {isCurrent && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={28}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  opacity={0.4}
                  style={{
                    animation: "pulse 1.5s ease-in-out infinite",
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
              )}

              <circle
                cx={pos.x}
                cy={pos.y}
                r={20}
                fill={
                  isCurrent
                    ? "#3b82f6"
                    : inPath
                    ? "#10b981"
                    : isVisited
                    ? "#6366f1"
                    : "#1e293b"
                }
                stroke={
                  isCurrent
                    ? "#60a5fa"
                    : inPath
                    ? "#34d399"
                    : isVisited
                    ? "#818cf8"
                    : "#475569"
                }
                strokeWidth={2}
                style={{
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              />

              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={14}
                fontWeight="bold"
              >
                {id}
              </text>

              <text
                x={pos.x}
                y={pos.y + 35}
                textAnchor="middle"
                fill={
                  distance === Infinity
                    ? "#64748b"
                    : inPath
                    ? "#10b981"
                    : isVisited
                    ? "#818cf8"
                    : "#94a3b8"
                }
                fontSize={12}
                fontWeight={inPath ? "bold" : "normal"}
                style={{
                  transition: "all 0.3s ease",
                }}
              >
                {distance === Infinity ? "∞" : distance}
              </text>
            </g>
          );
        })}

        <defs>
          <style>
            {`
            @keyframes pulse {
              0%, 100% {
                opacity: 0.4;
                transform: scale(1);
              }
              50% {
                opacity: 0.6;
                transform: scale(1.1);
              }
            }
          `}
          </style>
        </defs>
      </svg>
    </div>
  );
}
