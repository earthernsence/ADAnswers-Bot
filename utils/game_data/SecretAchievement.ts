import type { SecretAchievementType, SecretAchievement as TSecretAchievement } from "@/types/game_data/SecretAchievements";

interface SecretAchievementProps {
  id: number,
  name: string,
  description: string,
  unlock: string,
  type: SecretAchievementType
}

export default class SecretAchievement implements TSecretAchievement {
  id: number;
  name: string;
  description: string;
  unlock: string;
  type: SecretAchievementType;

  constructor({ id, name, description, unlock, type }: SecretAchievementProps) {
    if (id < 11 || id > 48) throw new Error(`Cannot initialise Secret Achievement! Requested ID: ${id}`);

    this.id = id;
    this.name = name;
    this.description = description;
    this.unlock = unlock;
    this.type = type;
  }

  public get title(): string {
    return `Secret Achievement ${this.id} - "${this.name}" (${this.type})`;
  }
}