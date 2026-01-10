export enum SecretAchievementType {
  /* eslint-disable no-unused-vars */
  Web = "Web",
  Mobile = "Mobile",
  Both = "Web/Mobile"
  /* eslint-enable no-unused-vars */
}

export type SecretAchievement = {
  id: number;
  name: string;
  // Post-unlock text
  description: string;
  unlock: string;
  type: SecretAchievementType;
};