import type { NodeId } from "../utils/graphData";

interface ControlsProps {
  onStart: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  onAutoPlay: () => void;
  isPlaying: boolean;
  hasStarted: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  currentStepIndex: number;
  totalSteps: number;
  startNode: NodeId;
  endNode: NodeId;
  onStartNodeChange: (node: NodeId) => void;
  onEndNodeChange: (node: NodeId) => void;
}

const nodeOptions: NodeId[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
];

export default function Controls({
  onStart,
  onNext,
  onPrevious,
  onReset,
  onAutoPlay,
  isPlaying,
  hasStarted,
  canGoNext,
  canGoPrevious,
  currentStepIndex,
  totalSteps,
  startNode,
  endNode,
  onStartNodeChange,
  onEndNodeChange,
}: ControlsProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 20,
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        borderRadius: 12,
        border: "1px solid #334155",
        width: 260,
        flexShrink: 0,
        height: "100%",
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: 20,
          fontWeight: "bold",
          color: "#f1f5f9",
          textAlign: "center",
        }}
      >
        Controls
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: "500",
              color: "#cbd5e1",
            }}
          >
            Start Node
          </label>
          <select
            value={startNode}
            onChange={(e) => onStartNodeChange(e.target.value as NodeId)}
            disabled={hasStarted}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #475569",
              background: "#0f172a",
              color: "#f1f5f9",
              fontSize: 14,
              cursor: hasStarted ? "not-allowed" : "pointer",
              opacity: hasStarted ? 0.6 : 1,
            }}
          >
            {nodeOptions.map((node) => (
              <option key={node} value={node}>
                {node}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: "500",
              color: "#cbd5e1",
            }}
          >
            End Node
          </label>
          <select
            value={endNode}
            onChange={(e) => onEndNodeChange(e.target.value as NodeId)}
            disabled={hasStarted}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #475569",
              background: "#0f172a",
              color: "#f1f5f9",
              fontSize: 14,
              cursor: hasStarted ? "not-allowed" : "pointer",
              opacity: hasStarted ? 0.6 : 1,
            }}
          >
            {nodeOptions.map((node) => (
              <option key={node} value={node}>
                {node}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {!hasStarted ? (
          <button
            onClick={onStart}
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              color: "white",
              fontSize: 14,
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(59, 130, 246, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Start Algorithm
          </button>
        ) : (
          <>
            <button
              onClick={onAutoPlay}
              style={{
                padding: "12px 20px",
                borderRadius: 8,
                border: "none",
                background: isPlaying
                  ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                  : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "white",
                fontSize: 14,
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = isPlaying
                  ? "0 4px 12px rgba(239, 68, 68, 0.4)"
                  : "0 4px 12px rgba(16, 185, 129, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {isPlaying ? "⏸ Pause" : "▶ Auto Play"}
            </button>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={onPrevious}
                disabled={!canGoPrevious}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "1px solid #475569",
                  background: canGoPrevious ? "#1e293b" : "#0f172a",
                  color: canGoPrevious ? "#f1f5f9" : "#64748b",
                  fontSize: 14,
                  fontWeight: "600",
                  cursor: canGoPrevious ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  if (canGoPrevious) {
                    e.currentTarget.style.background = "#334155";
                  }
                }}
                onMouseOut={(e) => {
                  if (canGoPrevious) {
                    e.currentTarget.style.background = "#1e293b";
                  }
                }}
              >
                ◀ Previous
              </button>

              <button
                onClick={onNext}
                disabled={!canGoNext}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "1px solid #475569",
                  background: canGoNext ? "#1e293b" : "#0f172a",
                  color: canGoNext ? "#f1f5f9" : "#64748b",
                  fontSize: 14,
                  fontWeight: "600",
                  cursor: canGoNext ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  if (canGoNext) {
                    e.currentTarget.style.background = "#334155";
                  }
                }}
                onMouseOut={(e) => {
                  if (canGoNext) {
                    e.currentTarget.style.background = "#1e293b";
                  }
                }}
              >
                Next ▶
              </button>
            </div>

            <button
              onClick={onReset}
              style={{
                padding: "10px 16px",
                borderRadius: 8,
                border: "1px solid #ef4444",
                background: "transparent",
                color: "#f87171",
                fontSize: 14,
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#7f1d1d";
                e.currentTarget.style.borderColor = "#f87171";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "#ef4444";
              }}
            >
              🔄 Reset
            </button>
          </>
        )}
      </div>

      {hasStarted && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 12,
            background: "#0f172a",
            borderRadius: 8,
            border: "1px solid #334155",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: "#94a3b8",
            }}
          >
            <span>Step {currentStepIndex + 1}</span>
            <span>of {totalSteps}</span>
          </div>
          <div
            style={{
              height: 6,
              background: "#1e293b",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${((currentStepIndex + 1) / totalSteps) * 100}%`,
                background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
