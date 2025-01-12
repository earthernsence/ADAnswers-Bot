import type { EC, EternityChallengeReward, EternityChallengeUnlock } from "@/types/game_data/EternityChallenges";
import {
  eternityChallengeCompletionGoals,
  eternityChallengeCompletionRequirements,
  eternityChallengeDescriptions,
  eternityChallengeRewards,
  eternityChallengeSecondaryUnlockCurrency,
  eternityChallengeSecondaryUnlockRequirements,
  eternityChallengeTimeTheoremCost,
  order
} from "./eternity_challenges";
import { findEC } from "../recommended_time_study_paths";
import { inlineCode } from "discord.js";

interface EternityChallengeProps {
  challenge: number,
  completion: number,
  recommendedTree: string,
  recommendedTheorems: number,
  note?: string,
}

export default class EternityChallenge implements EC {
  challenge: number;
  completion: number;
  theorems: number;
  note?: string;
  tree: string;

  constructor({ challenge, completion, recommendedTree, recommendedTheorems, note }: EternityChallengeProps) {
    if (challenge < 1 || challenge > 12) throw new Error(`Cannot initialise EC! Requested challenge: ${challenge}`);
    if (completion < 1 || completion > 5) throw new Error(`Cannot initialise EC! Requested completion: ${completion} `);

    this.challenge = challenge;
    this.completion = completion;
    this.tree = recommendedTree;
    this.theorems = recommendedTheorems;
    this.note = note;
  }

  get shortName(): string {
    return `${this.challenge}x${this.completion}`;
  }

  get ip(): string {
    return eternityChallengeCompletionGoals[this.challenge](this.completion - 1);
  }

  get description(): string {
    return eternityChallengeDescriptions[this.challenge];
  }

  get reward(): EternityChallengeReward {
    return eternityChallengeRewards[this.challenge];
  }

  get unlock(): EternityChallengeUnlock {
    return {
      currency: eternityChallengeSecondaryUnlockCurrency[this.challenge],
      amount: eternityChallengeSecondaryUnlockRequirements[this.challenge](this.completion - 1),
      theorems: eternityChallengeTimeTheoremCost[this.challenge],
    };
  }

  get otherRecommendedCompletions(): string {
    const indexOfCompletion = order.indexOf(this.shortName);

    if (indexOfCompletion === -1) throw new Error(`EC not in order for some reason! EC: ${this.shortName}`);

    if (indexOfCompletion === 0) return `No other Eternity Challenge completions required.`;

    return this.findCompletionsAtIndex(indexOfCompletion);
  }

  get nextRecommendedEternityChallenge(): string {
    if (this.shortName === "12x5") return "You have no more Eternity Challenges left to complete!";

    const nextInOrder = order[order.indexOf(this.shortName) + 1].split("x");
    const ec = findEC(Number(nextInOrder[0]), Number(nextInOrder[1]));

    return `${ec.shortName} at ${ec.theorems} Time Theorems`;
  }

  public formatUnlock(): string {
    if (this.challenge === 11 || this.challenge === 12) return `${this.unlock.amount} and ${this.unlock.theorems}`;
    return `${this.unlock.amount} ${this.unlock.currency} and ${this.unlock.theorems}`;
  }

  public formatGoal(): string {
    if (this.challenge === 4 || this.challenge === 12) return `${this.ip} Infinity Points in ${eternityChallengeCompletionRequirements[this.challenge](this.completion - 1)}.`;
    return `${inlineCode(this.ip)} Infinity Points`;
  }

  public formatStrategy(): string {
    return `
Time Theorems recommended: ${this.theorems}
Other Eternity Challenge completions recommended: ${this.otherRecommendedCompletions}${this.note ? `\nNote: ${inlineCode(this.note)}` : ""}
    `;
  }

  private findCompletionsAtIndex(indexOfCompletion: number): string {
    const completions = Array(12);

    for (let i = 0; i < indexOfCompletion; i++) {
      const previous = order[i].split("x").map(Number);
      const previousId = previous[0] - 1;
      const previousCompletion = previous[1];

      completions[previousId] = previousCompletion;
    }

    return completions.filter(Number).map((value, index) => `${index + 1}x${value}`).join(", ");
  }
}