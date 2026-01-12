/* eslint-disable no-unused-vars */
export enum PERK_FAMILY {
  ANTIMATTER = "antimatter",
  INFINITY = "infinity",
  ETERNITY = "eternity",
  DILATION = "dilation",
  REALITY = "reality",
  AUTOMATION = "automation",
  ACHIEVEMENT = "achievement"
}
/* eslint-enable no-unused-vars */

export type Perk = {
  id: string;
  name: string;
  effect: string;
  family: PERK_FAMILY;
  prerequisites: Array<string>;
  ap: number;
};
