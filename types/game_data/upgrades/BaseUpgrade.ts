export type TBaseUpgrade = {
  id: number;
  name: string;
  effect: string;
  cost: number;
  increment?: number;
  formula?: string;
};

export interface BaseUpgradeProps {
  id: number;
  name: string;
  effect: string;
  cost: number;
  increment?: number;
  formula?: string;
}

export class BaseUpgrade implements TBaseUpgrade {
  type: string = "base";
  id: number;
  name: string;
  effect: string;
  cost: number;
  increment?: number;
  formula?: string;

  constructor({ id, name, effect, cost, formula, increment }: BaseUpgradeProps) {
    this.id = id;
    this.name = name;
    this.effect = effect;
    this.cost = cost;
    this.increment = increment;
    this.formula = formula;
  }
}
