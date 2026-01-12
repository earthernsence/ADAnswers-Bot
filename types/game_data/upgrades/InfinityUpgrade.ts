import { BaseUpgrade, type BaseUpgradeProps } from "./BaseUpgrade";

export interface InfinityUpgradeProps extends BaseUpgradeProps {
  requirement?: string;
}

export class InfinityUpgrade extends BaseUpgrade {
  type: string = "infinity";
  requirement?: string;

  constructor({ id, name, effect, cost, formula, requirement }: InfinityUpgradeProps) {
    super({ id, name, effect, cost, formula });
    this.requirement = requirement;
  }
}
