export type LogicalFallacy = {
  id: string;
  name: string;
  description: string;
  example: string;
};

export type Argument = {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  evidence: string[];
  type: 'pro' | 'con';
  fallacyFlags: {
    fallacyId: string;
    flaggerId: string;
    explanation: string;
    disputed: boolean;
  }[];
  votes: {
    userId: string;
    value: 1 | -1;
  }[];
};

export type Debate = {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  status: 'open' | 'closed';
  proArguments: Argument[];
  conArguments: Argument[];
  tags: string[];
  participants: string[];
  rules: {
    maxArgumentsPerUser: number;
    timeLimit?: number; // in minutes
    requireEvidence: boolean;
  };
};

export type UserProfile = {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  debatesParticipated: number;
  fallaciesIdentified: number;
  successfulDefenses: number;
  joinedAt: Date;
  badges: string[];
}; 