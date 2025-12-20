import { BaseUpgrade } from "@/types/game_data/upgrades/BaseUpgrade";
import { ChargedInfinityUpgrades } from "./charged_upgrades";
import { InfinityUpgrades } from "./infinity_upgrades";

interface UpgradeInfo {
  [key: string]: {
    [key: string]: BaseUpgrade
  }
}

export const upgrades: UpgradeInfo = {
  infinity: InfinityUpgrades,
  charged: ChargedInfinityUpgrades
};

export function getUpgrade(type: string, name: string): BaseUpgrade | undefined {
  return Object.values(upgrades[type]).find(upgrade => upgrade.name === name);
}