export type TBaseUpgrade = {
  id: number,
  name: string,
  effect: string,
  cost: number,
  formula?: string,
};

export interface BaseUpgradeProps {
  id: number,
  name: string,
  effect: string,
  cost: number,
  formula?: string,
}

export class BaseUpgrade implements TBaseUpgrade {
  type: string = "base";
  id: number;
  name: string;
  effect: string;
  cost: number;
  formula?: string;

  constructor({ id, name, effect, cost, formula }: BaseUpgradeProps) {
    this.id = id;
    this.name = name;
    this.effect = effect;
    this.cost = cost;
    this.formula = formula;
  };
}