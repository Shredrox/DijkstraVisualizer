export type NodeId =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O";

export interface NodePos {
  x: number;
  y: number;
}
export interface Edge {
  n: NodeId;
  cost: number;
}

export const nodes: Record<NodeId, NodePos> = {
  A: { x: 80, y: 200 },
  B: { x: 200, y: 100 },
  C: { x: 200, y: 300 },
  D: { x: 320, y: 60 },
  E: { x: 320, y: 160 },
  F: { x: 320, y: 260 },
  G: { x: 320, y: 360 },
  H: { x: 440, y: 40 },
  I: { x: 440, y: 120 },
  J: { x: 440, y: 200 },
  K: { x: 440, y: 280 },
  L: { x: 440, y: 360 },
  M: { x: 560, y: 120 },
  N: { x: 560, y: 240 },
  O: { x: 680, y: 180 },
};

export const edges: Record<NodeId, Edge[]> = {
  A: [
    { n: "B", cost: 2 },
    { n: "C", cost: 2 },
  ],
  B: [
    { n: "A", cost: 2 },
    { n: "D", cost: 3 },
    { n: "E", cost: 1 },
  ],
  C: [
    { n: "A", cost: 2 },
    { n: "F", cost: 2 },
    { n: "G", cost: 3 },
  ],
  D: [
    { n: "B", cost: 3 },
    { n: "H", cost: 2 },
  ],
  E: [
    { n: "B", cost: 1 },
    { n: "I", cost: 2 },
    { n: "J", cost: 2 },
  ],
  F: [
    { n: "C", cost: 2 },
    { n: "K", cost: 2 },
  ],
  G: [
    { n: "C", cost: 3 },
    { n: "L", cost: 2 },
  ],
  H: [{ n: "D", cost: 2 }],
  I: [
    { n: "E", cost: 2 },
    { n: "M", cost: 3 },
  ],
  J: [{ n: "E", cost: 2 }],
  K: [
    { n: "F", cost: 2 },
    { n: "N", cost: 3 },
  ],
  L: [{ n: "G", cost: 2 }],
  M: [
    { n: "I", cost: 3 },
    { n: "O", cost: 4 },
  ],
  N: [
    { n: "K", cost: 3 },
    { n: "O", cost: 2 },
  ],
  O: [
    { n: "M", cost: 4 },
    { n: "N", cost: 2 },
  ],
};

export const heuristic: Record<NodeId, number> = {
  A: 10,
  B: 8,
  C: 8,
  D: 7,
  E: 6,
  F: 6,
  G: 6,
  H: 6,
  I: 5,
  J: 5,
  K: 4,
  L: 4,
  M: 3,
  N: 2,
  O: 0,
};
