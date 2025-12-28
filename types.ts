
export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  role: 'user' | 'admin';
  hasVoted: boolean;
  voteTargetId?: string;
}

export interface Editor {
  id: string;
  name: string;
  videoUrl: string;
  thumbnailUrl: string;
  votes: number;
}

export interface GiftPackage {
  id: string;
  stars: number;
  votes: number;
  label: string;
}

export interface Rating {
  id: string;
  userId: string;
  username: string;
  stars: number;
  timestamp: number;
}
