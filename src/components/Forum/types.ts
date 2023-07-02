export enum Threads {
  Global = "Global",
  Private = "Private",
}

export interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
}

interface Prediction {
  label: string;
  results: Array<{ probabilities: Float32Array; match: boolean }>;
}

export type Predictions = Prediction[];
