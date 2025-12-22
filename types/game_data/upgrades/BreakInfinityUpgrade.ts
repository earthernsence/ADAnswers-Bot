import { BaseUpgrade, type BaseUpgradeProps } from "./BaseUpgrade";

export class BreakInfinityUpgrade extends BaseUpgrade {
  type: string = "break";

  constructor({
    id,
    name,
    effect,
    cost,
    increment,
    formula
  }: BaseUpgradeProps) {
    super({ id, name, effect, cost, increment, formula });
  }
}