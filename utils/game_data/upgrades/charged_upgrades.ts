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
      formula: "`1 + (log10(log10(time played in milliseconds)) * sqrt(Teresa level)) / 150`"
    }
  }),
  "18mult": new ChargedInfinityUpgrade({
    baseUpgrade: InfinityUpgrades["18mult"],
    charged: {
      effect: "1st and 8th Antimatter Dimensions gain a power effect based on Infinities and Teresa level",
      formula: "`1 + log10(max(1, log10(infinities))) * sqrt(Teresa level) / 150`"
    }
  })
};
