import type Decimal from "break_infinity.js";

export enum VAchievementShardReductionType {
  Divide = "Divding by",
  Subtract = "Subtracting"
}

export type VAchievement = {
  name: string;
  description: string;
  goals: {
    currency: string;
    // I'm choosing to convert all of these values to Decimals because
    // a few values are actually...very big in V (namely Se7en, Young Boy).
    // In essence, everything will work the same as Decimals, but using Decimals
    // will allow me to more effectively work with the larger numbers.
    values: Array<Decimal>;
    shardReduction?: {
      amount: Decimal;
      type: VAchievementShardReductionType;
    };
  };
  hard?: boolean;
};

type VUnlock = {
  reward: string;
  requirement: number;
  formula?: string;
};

export type VCelestial = {
  info: string;
  reality: string;
  achievements: Record<string, VAchievement>;
  unlocks: Array<VUnlock>;
};
