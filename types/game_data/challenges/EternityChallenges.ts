export interface EternityChallengeReward {
  reward: string,
  formula: string,
}

export interface EternityChallengeRewards {
  [key: number]: EternityChallengeReward
}

export interface EternityChallengeDescriptions {
  [key: number]: string,
}

export interface EternityChallengeSecondaryUnlock {
  // eslint-disable-next-line no-unused-vars
  [key: number]: (completions: number) => string;
}

export interface EternityChallengeCompletionGoals {
  // eslint-disable-next-line no-unused-vars
  [key: number]: (completions: number) => string;
}

export interface EternityChallengeUnlock {
  currency: string,
  amount: string,
  theorems: number
}

export type EC = {
  challenge: number,
  completion: number,
  theorems: number,
  ip: string,
  note?: string,
  tree: string,
  completionReqs?: string,
  description: string,
  reward: EternityChallengeReward,
  unlock: EternityChallengeUnlock,
};

export type ECsAtTTInfo = {
  completions: string
  nextEC: EC,
  nextECs: string[],
  nextChallengeTT: number
};