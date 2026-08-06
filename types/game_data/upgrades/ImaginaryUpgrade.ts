import { RealityUpgrade, type RealityUpgradeProps } from "./RealityUpgrade";

interface ImaginaryUpgradeProps extends RealityUpgradeProps {
  strategy?: string;
}

export class ImaginaryUpgrade extends RealityUpgrade {
  override type: string = "imaginary";
  strategy?: string;

  constructor({ id, name, effect, cost, increment, formula, requirement, strategy }: ImaginaryUpgradeProps) {
    super({ id, name, effect, cost, increment, formula, requirement });
    this.strategy = strategy;
  }
}
