export interface InfinityChallenge {
  number: number;
  requirements: string;
  challenge: string;
  goal: string;
  strategy: string;
  reward: string;
  rewardFormula: string;
  imagePath: string;
}

export interface InfinityChallenges {
  [key: string]: InfinityChallenge;
}
