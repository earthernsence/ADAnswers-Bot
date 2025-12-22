import type { EC, EternityChallengeReward, EternityChallengeUnlock } from "@/types/game_data/challenges/EternityChallenges";
import {
  eternityChallengeCompletionGoals,
  eternityChallengeCompletionRequirements,
  eternityChallengeDescriptions,
  eternityChallengeRewards,
  eternityChallengeSecondaryUnlockCurrency,
  eternityChallengeSecondaryUnlockRequirements,
  eternityChallengeTimeTheoremCost,
  orderAsDoublyLinkedList
} from "./eternity_challenges";
import type { DoublyLinkedListNode } from "@/types/DoublyLinkedList";
import { inlineCode } from "discord.js";
import { quantify } from "@/utils/utils_commands";

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
    // [Decimal].toString() formats with a positive/negative sign on the exponent; I don't want it in the response.
    return eternityChallengeCompletionGoals[this.challenge](this.completion - 1).replace("+", "");
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
    const completions: Array<number> = Array(12).fill(0);
    const challenge = orderAsDoublyLinkedList.search(value => value === this);

    if (!challenge) throw new Error(`EC not in order for some reason! EC: ${this.shortName}`);
    if (!challenge.prev) return "No other Eternity Challenge completions required!";

    let previous: DoublyLinkedListNode<EternityChallenge> | null = challenge.prev;

    while (previous) {
      // If the value is better, then add it to the completions.
      if (previous.value.completion >= completions[previous.value.challenge - 1]) {
        completions[previous.value.challenge - 1] = previous.value.completion;
      }

      previous = previous.prev;
    }

    return completions
      .filter(completion => completion !== 0)
      .map((value, index) => `${index + 1}x${value}`)
      .join(", ");
  }

  get nextRecommendedEternityChallenge(): string {
    const next = this.nextEC;

    if (!next) return "You have no more Eternity Challenges left to complete!";

    return `${next.shortName} at ${next.theorems} Time Theorems`;
  }

  public formatUnlock(): string {
    if (this.challenge === 11 || this.challenge === 12) return `${this.unlock.amount} and ${quantify("Time Theorem", this.unlock.theorems)}`;
    return `${this.unlock.amount} ${this.unlock.currency} and ${quantify("Time Theorem", this.unlock.theorems)}`;
  }

  public formatGoal(): string {
    if (this.challenge === 4 || this.challenge === 12) return `${this.ip} Infinity Points in ${eternityChallengeCompletionRequirements[this.challenge](this.completion - 1)}.`;
    return `${inlineCode(this.ip)} Infinity Points`;
  }

  public formatStrategy(): string {
    return `
Time Theorems recommended: ${this.theorems}
Other Eternity Challenge completions recommended: ${this.otherRecommendedCompletions}${this.note ? `\nNote: ${inlineCode(this.note)}` : ""}`;
  }

  private get nextEC(): EternityChallenge | undefined {
    return orderAsDoublyLinkedList.search(value =>
      value === this
    )?.next?.value;
  }
}