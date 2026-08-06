import { BaseUpgrade, type BaseUpgradeProps } from "./BaseUpgrade";

export interface RealityUpgradeProps extends BaseUpgradeProps {
  requirement?: string;
}

export class RealityUpgrade extends BaseUpgrade {
  override type: string = "reality";
  requirement?: string;

  constructor({ id, name, effect, cost, formula, increment, requirement }: RealityUpgradeProps) {
    super({ id, name, effect, cost, formula, increment });
    this.requirement = requirement;
  }
}
