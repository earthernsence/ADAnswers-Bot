import { ChargedInfinityUpgrade } from "@/types/game_data/upgrades/ChargedInfinityUpgrade";
import { InfinityUpgrades } from "./infinity_upgrades";

interface IChargedUpgrades {
  [key: string]: ChargedInfinityUpgrade
}

export const ChargedInfinityUpgrades: IChargedUpgrades = {
  "timeMult": new ChargedInfinityUpgrade({
    baseUpgrade: InfinityUpgrades.timeMult,
    charged: {
      effect: "Antimatter Dimensions gain a power effect based on time played and Teresa level",
      formula: "`1 + (log10(log10(time played in milleseconds)) * (Teresa level ^ 0.5)) / 150`"
    }
  })
};
