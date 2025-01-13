import { eternityChallenges, orderAsDoublyLinkedList } from "./challenges/eternity_challenges";
import type { ECsAtTTInfo } from "@/types/game_data/EternityChallenges";
import type EternityChallenge from "./challenges/EternityChallenge";
import { inlineCode } from "discord.js";
import { timeStudies } from "./time_studies";

const TREE_PATHS: { [key: string]: Array<number> } = {
  PRE_SPLIT_EARLY: [11, 21, 33, 31, 41],
  PRE_SPLIT: [11, 22, 32, 42, 51, 61],
  EXTRA: [21, 31, 41, 33, 62],
  ANTIMATTER: [71, 81, 91, 101],
  INFINITY: [72, 82, 92, 102],
  TIME: [73, 83, 93, 103],
  ACTIVE: [121, 131, 141],
  PASSIVE: [122, 132, 142],
  IDLE: [123, 133, 143],
  POST_SPLIT: [151, 161, 171, 181, 162],
  get BASE() {
    return [...this.PRE_SPLIT, ...this.TIME, 111, ...this.ACTIVE, ...this.POST_SPLIT, ...this.EXTRA];
  }
};

export function trees(path?: string) {
  let realPath = undefined;
  switch (path) {
    case "active":
      realPath = TREE_PATHS.ACTIVE;
      break;
    case "passive":
      realPath = TREE_PATHS.PASSIVE;
      break;
    case "idle":
      realPath = TREE_PATHS.IDLE;
      break;
    default:
      realPath = TREE_PATHS.ACTIVE;
      break;
  }
  const BASE = [...TREE_PATHS.PRE_SPLIT, ...TREE_PATHS.TIME, 111, ...TREE_PATHS.ACTIVE, ...TREE_PATHS.POST_SPLIT, ...TREE_PATHS.EXTRA];
  // All study trees must be sorted in descending order!
  return [
    // Light-Dark Paths
    {
      requirement: 12900,
      ts: BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, ...TREE_PATHS.INFINITY, 193, 214, 228, 234, 213, 226)
    },
    {
      requirement: 12750,
      ts: BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, ...TREE_PATHS.INFINITY, 193, 214, 228, 234, 213, 226),
      desc: "If you cannot get the last TT to unlock dilation, use /dilationgrind."
    },
    {
      requirement: 4945,
      ts: BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, ...TREE_PATHS.INFINITY, 193, 214, 228, 234, 213, 226),
    },
    {
      requirement: 3925,
      ts: BASE.concat(191, 212, 223, 232, 192, 201, ...TREE_PATHS.INFINITY, 211, 193, 214, 213),
    },
    {
      requirement: 3712,
      ts: BASE.concat(191, 211, 222, 212, 224, 232, 193, 214),
    },
    {
      requirement: 3542,
      ts: BASE.concat(191, 211, 212, 223, 232, 192, 193, 214),
    },
    {
      requirement: 2692,
      ts: BASE.concat(191, 212, 223, 232, 193, 214, 211, 213),
    },
    {
      requirement: 2272,
      ts: BASE.concat(191, 212, 223, 232, 211),
    },
    {
      requirement: 2142,
      ts: BASE.concat(193, 214, 228, 234),
    },
    {
      requirement: 1292,
      ts: BASE.concat(191, 212, 193, 214, 211, 213),
    },
    {
      requirement: 318,
      ts: BASE.concat(191, 212, 211),
    },
    {
      requirement: 147,
      ts: [...BASE]
    },
    // Remove 62 from BASE pre-EC5 recommendation
    {
      requirement: 123,
      ts: [...BASE.filter(study => study !== 62)],
    },
    // 2nd Split
    {
      requirement: 100,
      ts: [...TREE_PATHS.PRE_SPLIT, ...TREE_PATHS.TIME, 111, ...realPath, 151, 161, 171, 162, ...TREE_PATHS.EXTRA]
    },
    {
      requirement: 85,
      ts: [...TREE_PATHS.PRE_SPLIT, ...TREE_PATHS.INFINITY, 111, ...realPath, 151, 161, 162, 21, 33, 31]
    },
    {
      requirement: 71,
      ts: [...TREE_PATHS.PRE_SPLIT, ...TREE_PATHS.ANTIMATTER, 111, ...realPath, 151, 161, 21, 33, 31]
    },
    {
      requirement: 70,
      ts: [...TREE_PATHS.PRE_SPLIT, ...TREE_PATHS.INFINITY, 111, ...realPath, 21, 33, 31, 41]
    },
    {
      requirement: 54,
      ts: [...TREE_PATHS.PRE_SPLIT, ...TREE_PATHS.ANTIMATTER, 111, ...realPath, 21, 31]
    },
    // Early Eternity
    {
      requirement: 52,
      ts: [...TREE_PATHS.PRE_SPLIT, ...TREE_PATHS.INFINITY, 111]
    },
    {
      requirement: 45,
      ts: [...TREE_PATHS.PRE_SPLIT, ...TREE_PATHS.ANTIMATTER, 111, 21, 33, 31]
    },
    {
      requirement: 40,
      ts: [...TREE_PATHS.PRE_SPLIT, ...TREE_PATHS.INFINITY, 21, 33, 31]
    },
    {
      requirement: 11,
      ts: [...TREE_PATHS.PRE_SPLIT, ...TREE_PATHS.ANTIMATTER, 21, 33]
    },
    {
      requirement: 0,
      ts: [...TREE_PATHS.PRE_SPLIT_EARLY]
    }
  ];
}

function getAffordableStudiesFromStudyList(studiesToPurchase: number[], theoremAmount: number): number[] {
  let remainingTheorems = theoremAmount;
  const affordableStudies: number[] = [];

  for (const study of studiesToPurchase.map(s => timeStudies[s])) {
    if (study.cost <= remainingTheorems) {
      // If ANY of the study's prerequisites are in affordable studies, we can purchase it. Otherwise, we can't.
      // Some studies have multiple possible prerequisites, but we only need one of them in order for us to purchase the next study
      // Some studies have no prerequisites so we can always purchase them
      // TS11 has no prerequisites, so we have an extra OR to see if it's the study we're thinking about buying
      if (study.prerequisites.some(r => affordableStudies.includes(r)) || study.id === 11) {
        affordableStudies.push(study.id);
        remainingTheorems -= study.cost;
      }
    }
  }

  return affordableStudies;
}

export function getRecommendedTree(theoremAmount: number, path: string = "active"): string {
  let recommendedTree: {
    ts: Array<number>,
    desc?: string,
    requirement: number,
  } | undefined = undefined;

  for (const tree of trees(path).reverse()) {
    if (Math.max(theoremAmount, 0) >= tree.requirement) {
      recommendedTree = tree;
    }
  }

  if (theoremAmount === 0 || !recommendedTree) return "You don't have any Time Theorems, silly!";

  const affordableStudies = getAffordableStudiesFromStudyList(recommendedTree.ts, theoremAmount);
  return `${recommendedTree.desc ?? ""} ${inlineCode(`${affordableStudies.join(",")}|0`)}`;
}

export function findEC(challenge: number, completion: number): EternityChallenge {
  return eternityChallenges[challenge][completion];
}

const orderAsECs: Array<EternityChallenge> = orderAsDoublyLinkedList.traverse();

// Function rewritten by Mirai
export function ecsAtTTAmount(tt: number): ECsAtTTInfo {
  if (tt >= 12350) return {
    completions: "All ECs completed!",
    nextEC: findEC(1, 1),
    nextECs: [],
    nextChallengeTT: Number.MAX_VALUE,
  };

  let completions = Array(12);
  const nextECs = [];
  let i: number = 0;
  let ec: EternityChallenge = orderAsECs[0];

  while (ec.theorems <= tt) {
    completions[ec.challenge - 1] = ec.completion;
    ec = orderAsECs[++i];
  }

  const nextChallengeTT = ec.theorems;

  // Hacky, but it works
  while (i <= 59 && ec.theorems === nextChallengeTT) {
    nextECs.push(`${ec.shortName}`);
    ec = orderAsECs[++i];
  }

  completions = completions.filter(Number);
  if (completions.length > 0) {
    for (let j = 0; j < completions.length; j++) {
      completions[j] = `${j + 1}x${completions[j]}`;
    }
  }

  const nextEC = ec;

  return {
    completions: tt < 130 ? "No ECs completed yet!" : completions.join(", "),
    nextECs,
    nextEC,
    nextChallengeTT
  };
}