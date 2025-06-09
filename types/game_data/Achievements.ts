export type Achievement = {
  id: number;
  fullName: string;
  requirement: string;
  unlockStrategy?: string;
  reward?: string;
  rewardFormula?: string;
};