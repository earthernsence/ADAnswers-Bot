import { BaseUpgrade, type BaseUpgradeProps } from "./BaseUpgrade";

export interface RealityUpgradeProps extends BaseUpgradeProps {
  requirement?: string
}

export class RealityUpgrade extends BaseUpgrade {
  type: string = "reality";
  requirement?: string;

  constructor({
    id,
    name,
    effect,
    cost,
    increment,
    requirement
  }: RealityUpgradeProps) {
    super({ id, name, effect, cost, increment });
    this.requirement = requirement;
  }
}