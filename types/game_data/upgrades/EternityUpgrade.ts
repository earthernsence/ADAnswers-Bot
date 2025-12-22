import { BaseUpgrade, type BaseUpgradeProps } from "./BaseUpgrade";

interface EternityUpgradeProps extends BaseUpgradeProps {
  graph?: string
}

export class EternityUpgrade extends BaseUpgrade {
  type: string = "eternity";
  graph?: string;

  constructor({
    id,
    name,
    effect,
    formula,
    cost,
    graph
  }: EternityUpgradeProps) {
    super({ id, name, effect, formula, cost });
    this.graph = graph;
  }
}