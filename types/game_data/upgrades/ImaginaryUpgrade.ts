import { RealityUpgrade, type RealityUpgradeProps } from "./RealityUpgrade";

interface ImaginaryUpgradeProps extends RealityUpgradeProps {
  strategy?: string;
}

export class ImaginaryUpgrade extends RealityUpgrade {
  type: string = "imaginary";
  strategy?: string;

  constructor({ id, name, effect, cost, increment, requirement, strategy }: ImaginaryUpgradeProps) {
    super({ id, name, effect, cost, increment, requirement });
    this.strategy = strategy;
  }
}
