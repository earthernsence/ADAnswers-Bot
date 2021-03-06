import { Model } from "sequelize";

export type Trees = {
  requirement: number,
  ts: number[],
  desc?: string
}

export type AchievementInfo = {
  id: number;
  fullName: string;
  achievement: string;
  strategy?: string;
  reward?: string;
  rewardFormula?: string;
}

export type EC = {
  challenge: number,
  completion: number,
  tt: number,
  ip: string,
  note: null | string,
  tree: string,
  completionReqs?: string,
  unlock: {
    currency: string,
    amount: number | string,
    tt: number,
  }
}

export type StudyInfo = {
  id: number;
  effect: string;
  formula?: string;
  cost: number;
  colour: string;
  prerequisites: number[];
  reqType: string;
  type: string;
  additionalPrerequisites?: string[];
  exclusiveWith?: string;
  isBestWaifu?: string;
  hasGraph?: boolean;
  graph?: string;
}

export type UpgradeInfo = {
  id: string;
  name: string;
  effect: string;
  requirement?: string;
  cost?: number | string;
  formula?: string;
  initialCost?: number;
  rebuyable?: boolean;
  formatNicely?: boolean;
  increment?: number;
  hasGraph?: boolean;
  graph?: string;
}

export type StringIndexedStringObjectType = {
  [key: string]: string;
}

export type TimeWithClock = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  clock: string;
}

export type TimeNoDays = {
  hours: number;
  minutes: number;
  seconds: number;
}

export type UserInfo = {
  fullPerson: string;
  rolesUnjoined: string[];
  roles: string;
  nick: string;
  joined: string;
  avatar: string;
  tag: Model<any, any> | null;
  tagInfo: Function
}

export type TagInfo = {
  top5commands: string;
  top5hours: string;
  top5users: string;
  requests: string;
  successes: string;
}