import type { Achievement as IAchievement } from "@/types/game_data/Achievements";

interface AchievementProps {
  id: number;
  fullName: string;
  requirement: string;
  unlockStrategy?: string;
  reward?: string;
  rewardFormula?: string;
}

export default class Achievement implements IAchievement {
  id: number;
  fullName: string;
  requirement: string;
  unlockStrategy?: string;
  reward?: string;
  rewardFormula?: string;

  constructor({ id, fullName, requirement, unlockStrategy, reward, rewardFormula }: AchievementProps) {
    if (id < 11 || id > 188) throw new Error(`Cannot initialise Achievement! Requested ID: ${id}`);

    this.id = id;
    this.fullName = fullName;
    this.requirement = requirement;

    this.unlockStrategy = unlockStrategy;
    this.reward = reward;
    this.rewardFormula = rewardFormula;
  }

  public get isDoomed(): boolean {
    return this.id >= 181 && this.id <= 188;
  }
}