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
  }),
  "27mult": new ChargedInfinityUpgrade({
    baseUpgrade: InfinityUpgrades["27mult"],
    charged: {
      effect: "2nd and 7th Antimatter Dimensions gain a power effect based on Infinities and Teresa level",
      formula: "`1 + log10(max(1, log10(infinities))) * sqrt(Teresa level) / 150`"
    }
  }),
  "36mult": new ChargedInfinityUpgrade({
    baseUpgrade: InfinityUpgrades["36mult"],
    charged: {
      effect: "3rd and 6th Antimatter Dimensions gain a power effect based on Infinities and Teresa level",
      formula: "`1 + log10(max(1, log10(infinities))) * sqrt(Teresa level) / 150`"
    }
  }),
  "45mult": new ChargedInfinityUpgrade({
    baseUpgrade: InfinityUpgrades["45mult"],
    charged: {
      effect: "4th and 5th Antimatter Dimensions gain a power effect based on Infinities and Teresa level",
      formula: "`1 + log10(max(1, log10(infinities))) * sqrt(Teresa level) / 150`"
    }
  }),
  "resetBoost": new ChargedInfinityUpgrade({
    baseUpgrade: InfinityUpgrades.resetBoost,
    charged: {
      effect: "Decrease Dimension Boost requirement based on Teresa level",
      formula: "`1 / (1 + sqrt(Teresa level) / 10)`"
    }
  }),
  "buy10mult": new ChargedInfinityUpgrade({
    baseUpgrade: InfinityUpgrades.buy10mult,
    charged: {
      effect: "The multiplier for buying 10 Antimatter Dimensions gains a power effect based on Teresa level",
      formula: "`1 + (Teresa level) / 200`"
    }
  }),
  "galaxyBoost": new ChargedInfinityUpgrade({
    baseUpgrade: InfinityUpgrades.galaxyBoost,
    charged: {
      effect: "All Galaxies are stronger based on Teresa level",
      formula: "`2 + sqrt(Teresa level) / 100`\nThis upgrade in the code is a multiplier, so this is x times stronger galaxies. Subtract 1, and turn it into a percent to find the value on the upgrade."
    }
  }),
  "thisInfinityTimeMult": new ChargedInfinityUpgrade({
    baseUpgrade: InfinityUpgrades.thisInfinityTimeMult,
    charged: {
      effect: "Antimatter Dimensions gain a power effect based on time spent in current Infinity and Teresa level",
      formula: "`1 + (log10(log10(time played in milliseconds)) * sqrt(Teresa level)) / 150`"
    }
  }),
  "unspentIPMult": new ChargedInfinityUpgrade({
    baseUpgrade: InfinityUpgrades.unspentIPMult,
    charged: {
      effect: "Multiplier to 1st Antimatter Dimension based on unspent Infinity Points, powered by Teresa level",
      formula: "`((IP / 2) ^ (sqrt(Teresa level) * 1.5)) + 1`"
    }
  }),
  "dimboostMult": new ChargedInfinityUpgrade({
    baseUpgrade: InfinityUpgrades.dimboostMult,
    charged: {
      effect: "Dimension Boost multiplier gains a power effect based on Teresa level",
      formula: "`1 + Teresa level / 200`"
    }
  }),
  "ipGen": new ChargedInfinityUpgrade({
    baseUpgrade: InfinityUpgrades.ipGen,
    charged: {
      effect: "Gain Reality Machines each real-time second proportional to amount gained on Reality, increasing with Teresa level",
      formula: "`Teresa level ^ 2`\nBoosted by V level 10 by a factor of `1 + 2.4 * (min(10, max(0, log10(TT) - 350) / 50))`"
    }
  })
};
