export type AlchemyResource = {
  name: string,
  // Ra-Effarig level that the resource unlocks at
  unlocksAt: number,
  effect: string,
  formula: string,
  // What ring the resource lies on
  tier: number,
  reagents?: Array<[string, number]>
};