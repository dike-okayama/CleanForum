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
