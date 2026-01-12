import { BaseUpgrade } from "@/types/game_data/upgrades/BaseUpgrade";
import { BreakInfinityUpgrades } from "./break_upgrades";
import { ChargedInfinityUpgrades } from "./charged_upgrades";
import { DilationUpgrades } from "./dilation_upgrades";
import { EternityUpgrades } from "./eternity_upgrades";
import { ImaginaryUpgrades } from "./imaginary_upgrades";
import { InfinityUpgrades } from "./infinity_upgrades";
import { RealityUpgrades } from "./reality_upgrades";

interface UpgradeInfo {
  [key: string]: {
    [key: string]: BaseUpgrade;
  };
}

export const upgrades: UpgradeInfo = {
  infinity: InfinityUpgrades,
  charged: ChargedInfinityUpgrades,
  break: BreakInfinityUpgrades,
  eternity: EternityUpgrades,
  dilation: DilationUpgrades,
  reality: RealityUpgrades,
  imaginary: ImaginaryUpgrades
};

export function getUpgrade(type: string, name: string): BaseUpgrade | undefined {
  return Object.values(upgrades[type]).find(upgrade => upgrade.name === name);
}
