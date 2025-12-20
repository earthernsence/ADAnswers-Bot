import { BaseUpgrade } from "./BaseUpgrade";
import { InfinityUpgrade } from "./InfinityUpgrade";

interface ChargedInfinityUpgradeInfo {
  effect: string,
  formula: string
}

interface ChargedInfinityUpgradeProps {
  baseUpgrade: InfinityUpgrade
  charged: ChargedInfinityUpgradeInfo
}

export class ChargedInfinityUpgrade extends BaseUpgrade {
  type: string = "charged";
  charged: ChargedInfinityUpgradeInfo;

  constructor({ baseUpgrade, charged }: ChargedInfinityUpgradeProps) {
    super(...[baseUpgrade] as const);
    this.charged = charged;
  }
}