import { BaseUpgrade, type BaseUpgradeProps } from "./BaseUpgrade";

export class DilationUpgrade extends BaseUpgrade {
  override type: string = "dilation";

  constructor({ id, name, effect, cost, increment, formula }: BaseUpgradeProps) {
    super({ id, name, effect, cost, increment, formula });
  }
}
