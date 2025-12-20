export interface AntimatterChallenge {
  number: number,
  requirements: string,
  challenge: string,
  goal: string,
  strategy: string,
  reward: string,
  imagePath: string,
}

export interface AntimatterChallenges {
  [key: string]: AntimatterChallenge
}