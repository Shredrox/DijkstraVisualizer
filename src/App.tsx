import { useState, useEffect, useRef } from "react";
import type { NodeId } from "./utils/graphData";
import { dijkstraGenerator } from "./utils/dijkstra";
import type { DijkstraStep } from "./utils/dijkstra";
import Graph from "./components/Graph";
import Controls from "./components/Controls";
import StepDetails from "./components/StepDetails";

export default function App() {
  const [startNode, setStartNode] = useState<NodeId>("A");
  const [endNode, setEndNode] = useState<NodeId>("O");
  const [steps, setSteps] = useState<DijkstraStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const autoPlayTimer = useRef<number | null>(null);

  const currentStep = currentStepIndex >= 0 ? steps[currentStepIndex] : null;

  const handleStart = () => {
    const generator = dijkstraGenerator(startNode, endNode);
    const allSteps: DijkstraStep[] = [];

    let result = generator.next();
    while (!result.done) {
      allSteps.push(result.value);
      result = generator.next();
    }
    if (result.value) {
      allSteps.push(result.value);
    }

    setSteps(allSteps);
    setCurrentStepIndex(0);
    setHasStarted(true);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setSteps([]);
    setCurrentStepIndex(-1);
    setHasStarted(false);
    setIsPlaying(false);
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }
  };

  const handleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying && hasStarted) {
      autoPlayTimer.current = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1000);
    } else if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
      autoPlayTimer.current = null;
    }

    return () => {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
        autoPlayTimer.current = null;
      }
    };
  }, [isPlaying, hasStarted, steps.length]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        background: "radial-gradient(circle at top left, #0f172a, #020617)",
        color: "white",
        padding: "16px",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          marginBottom: 16,
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 32,
            fontWeight: "bold",
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 4,
          }}
        >
          Dijkstra's Algorithm Visualizer
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "stretch",
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <Controls
          onStart={handleStart}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onReset={handleReset}
          onAutoPlay={handleAutoPlay}
          isPlaying={isPlaying}
          hasStarted={hasStarted}
          canGoNext={currentStepIndex < steps.length - 1}
          canGoPrevious={currentStepIndex > 0}
          currentStepIndex={currentStepIndex}
          totalSteps={steps.length}
          startNode={startNode}
          endNode={endNode}
          onStartNodeChange={setStartNode}
          onEndNodeChange={setEndNode}
        />

        <Graph
          visitedNodes={currentStep?.visitedNodes || new Set()}
          currentNode={currentStep?.currentNode}
          distances={currentStep?.distances || ({} as Record<NodeId, number>)}
          path={currentStep?.path || []}
          relaxedEdge={currentStep?.relaxedEdge}
        />

        <StepDetails step={currentStep} />
      </div>
    </div>
  );
}
