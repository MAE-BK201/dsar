export interface Position {
  x: number;
  y: number;
  z: number;
}

// A single cube instance
export interface Node {
  id: string;
  data: number;
  next?: Node;
  pos: Position;
}

export interface Line {
  from: Position;
  to: Position;
  color?: string;
}
