export interface TimeStudy {
  id: number;
  effect: string;
  formula?: string;
  cost: number;
  prerequisites: number[];
  reqType: string;
  type: string;
  additionalPrerequisites?: string[];
  exclusiveWith?: string;
  isBestWaifu?: string;
  hasGraph?: boolean;
  graph?: string;
  isTriad?: boolean
};

export interface TimeStudies {
  [key: string]: TimeStudy
}