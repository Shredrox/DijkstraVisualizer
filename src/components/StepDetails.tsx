import type { DijkstraStep } from "../utils/dijkstra";
import type { NodeId } from "../utils/graphData";

interface StepDetailsProps {
  step: DijkstraStep | null;
}

export default function StepDetails({ step }: StepDetailsProps) {
  if (!step) {
    return (
      <div
        style={{
          padding: 20,
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          borderRadius: 12,
          border: "1px solid #334155",
          width: 320,
          flexShrink: 0,
          height: "100%",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            margin: 0,
            marginBottom: 16,
            fontSize: 20,
            fontWeight: "bold",
            color: "#f1f5f9",
          }}
        >
          Algorithm Details
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "#94a3b8",
            lineHeight: 1.6,
          }}
        >
          Select start and end nodes, then click "Start Algorithm" to begin the
          visualization.
        </p>
      </div>
    );
  }

  const getStepTitle = () => {
    switch (step.type) {
      case "init":
        return "Initialization";
      case "visit":
        return "Visiting Node";
      case "relax":
        return "Edge Relaxation";
      case "complete":
        return "Algorithm Complete";
      default:
        return "Step";
    }
  };

  return (
    <div
      style={{
        padding: 20,
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        borderRadius: 12,
        border: "1px solid #334155",
        width: 320,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        height: "100%",
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: "bold",
              color: "#f1f5f9",
            }}
          >
            {getStepTitle()}
          </h2>
        </div>
      </div>

      <div
        style={{
          padding: 16,
          background: "#0f172a",
          borderRadius: 8,
          border: "1px solid #334155",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "#cbd5e1",
            lineHeight: 1.6,
          }}
        >
          {step.description}
        </p>
      </div>

      {step.relaxedEdge && (
        <div
          style={{
            padding: 16,
            background: "#0f172a",
            borderRadius: 8,
            border: "1px solid #fbbf24",
          }}
        >
          <h3
            style={{
              margin: 0,
              marginBottom: 12,
              fontSize: 14,
              fontWeight: "600",
              color: "#fbbf24",
            }}
          >
            Edge Update
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
              }}
            >
              <span style={{ color: "#94a3b8" }}>From → To:</span>
              <span style={{ color: "#f1f5f9", fontWeight: "600" }}>
                {step.relaxedEdge.from} → {step.relaxedEdge.to}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
              }}
            >
              <span style={{ color: "#94a3b8" }}>Old Distance:</span>
              <span style={{ color: "#ef4444", fontWeight: "600" }}>
                {step.relaxedEdge.oldDistance === Infinity
                  ? "∞"
                  : step.relaxedEdge.oldDistance}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
              }}
            >
              <span style={{ color: "#94a3b8" }}>New Distance:</span>
              <span style={{ color: "#10b981", fontWeight: "600" }}>
                {step.relaxedEdge.newDistance}
              </span>
            </div>
          </div>
        </div>
      )}

      {step.currentNode && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: 12,
            background: "#0f172a",
            borderRadius: 8,
            border: "1px solid #3b82f6",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {step.currentNode}
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>Current Node</div>
            <div style={{ fontSize: 14, color: "#f1f5f9", fontWeight: "600" }}>
              Distance: {step.distances[step.currentNode]}
            </div>
          </div>
        </div>
      )}

      {step.path && step.path.length > 0 && (
        <div
          style={{
            padding: 16,
            background: "#0f172a",
            borderRadius: 8,
            border: "1px solid #10b981",
          }}
        >
          <h3
            style={{
              margin: 0,
              marginBottom: 12,
              fontSize: 14,
              fontWeight: "600",
              color: "#10b981",
            }}
          >
            Shortest Path Found
          </h3>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {step.path.map((node, index) => (
              <div
                key={node}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <div
                  style={{
                    padding: "6px 12px",
                    background: "#10b981",
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {node}
                </div>
                {index < (step.path?.length || 0) - 1 && (
                  <span style={{ color: "#64748b", fontSize: 16 }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        <div
          style={{
            padding: 12,
            background: "#0f172a",
            borderRadius: 8,
            border: "1px solid #334155",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#6366f1" }}>
            {step.visitedNodes.size}
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
            Visited
          </div>
        </div>
        <div
          style={{
            padding: 12,
            background: "#0f172a",
            borderRadius: 8,
            border: "1px solid #334155",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#8b5cf6" }}>
            {step.unvisitedNodes.size}
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
            Remaining
          </div>
        </div>
      </div>

      <div
        style={{
          maxHeight: 200,
          overflowY: "auto",
          padding: 12,
          background: "#0f172a",
          borderRadius: 8,
          border: "1px solid #334155",
        }}
      >
        <h3
          style={{
            margin: 0,
            marginBottom: 12,
            fontSize: 14,
            fontWeight: "600",
            color: "#f1f5f9",
          }}
        >
          Current Distances
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {Object.entries(step.distances)
            .sort(([, a], [, b]) => {
              if (a === Infinity && b === Infinity) return 0;
              if (a === Infinity) return 1;
              if (b === Infinity) return -1;
              return a - b;
            })
            .map(([node, distance]) => (
              <div
                key={node}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  background: step.visitedNodes.has(node as NodeId)
                    ? "#1e293b"
                    : "transparent",
                  borderRadius: 4,
                  fontSize: 13,
                }}
              >
                <span
                  style={{
                    color: step.visitedNodes.has(node as NodeId)
                      ? "#818cf8"
                      : "#94a3b8",
                    fontWeight: step.currentNode === node ? "bold" : "normal",
                  }}
                >
                  {node}
                </span>
                <span
                  style={{
                    color:
                      distance === Infinity
                        ? "#64748b"
                        : step.visitedNodes.has(node as NodeId)
                        ? "#a5b4fc"
                        : "#cbd5e1",
                    fontWeight: "600",
                  }}
                >
                  {distance === Infinity ? "∞" : distance}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
