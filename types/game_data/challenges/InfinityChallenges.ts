import type Decimal from "break_infinity.js";

export interface InfinityChallenge {
  number: number;
  requirements: Decimal;
  challenge: string;
  goal: Decimal;
  strategy: string;
  reward: string;
  rewardFormula: string;
}

export interface InfinityChallenges {
  [key: string]: InfinityChallenge;
}
