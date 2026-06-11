import { eternityChallenges, orderAsDoublyLinkedList } from "./challenges/eternity_challenges";
import { codeBlock } from "discord.js";
import type { ECsAtTTInfo } from "@/types/game_data/challenges/EternityChallenges";
import type EternityChallenge from "./challenges/EternityChallenge";
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
  },
  // 11-62
  get ALL_PRE_SPLIT() {
    // Turn it into a set (so only unique values are kept), then transform back to an array
    return Array.from(new Set([...this.PRE_SPLIT, ...this.PRE_SPLIT_EARLY, ...this.EXTRA])).sort((a, b) => a - b);
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
  const BASE = [
    ...TREE_PATHS.PRE_SPLIT,
    ...TREE_PATHS.TIME,
    111,
    ...TREE_PATHS.ACTIVE,
    ...TREE_PATHS.POST_SPLIT,
    ...TREE_PATHS.EXTRA
  ];
  // All study trees must be sorted in descending order!
  return [
    // Light/Dark Paths
    {
      requirement: 12900,
      ts: BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, ...TREE_PATHS.INFINITY, 193, 214, 228, 234, 213, 226)
    },
    {
      requirement: 12750,
      ts: BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, ...TREE_PATHS.INFINITY, 193, 214, 228, 234, 213, 226),
      desc: "Note: If you cannot get the last TT to unlock dilation, use `/dilationgrind`."
    },
    {
      requirement: 4945,
      ts: BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, ...TREE_PATHS.INFINITY, 193, 214, 228, 234, 213, 226)
    },
    {
      requirement: 3925,
      ts: BASE.concat(191, 212, 223, 232, 192, 201, ...TREE_PATHS.INFINITY, 211, 193, 214, 213)
    },
    {
      requirement: 3712,
      ts: BASE.concat(191, 211, 222, 212, 224, 232, 193, 214)
    },
    {
      requirement: 3542,
      ts: BASE.concat(191, 211, 212, 223, 232, 192, 193, 214)
    },
    {
      requirement: 2692,
      ts: BASE.concat(191, 212, 223, 232, 193, 214, 211, 213)
    },
    {
      requirement: 2272,
      ts: BASE.concat(191, 212, 223, 232, 211)
    },
    {
      requirement: 2142,
      ts: BASE.concat(193, 214, 228, 234)
    },
    // Pre-Light/Dark
    {
      requirement: 1292,
      ts: BASE.concat(191, 212, 193, 214, 211, 213)
    },
    {
      requirement: 318,
      ts: BASE.concat(191, 212, 211)
    },
    {
      requirement: 147,
      ts: [...BASE]
    },
    // Remove 62 from BASE pre-EC5 recommendation
    {
      requirement: 123,
      ts: [...BASE.filter(study => study !== 62)]
    },
    // 2nd Split
    {
      requirement: 100,
      ts: [...TREE_PATHS.PRE_SPLIT, ...TREE_PATHS.TIME, 111, ...realPath, 151, 161, 171, 162, ...TREE_PATHS.EXTRA]
    },
    {
      requirement: 66,
      ts: [...TREE_PATHS.PRE_SPLIT, ...TREE_PATHS.INFINITY, 111, ...realPath, 151, 161, 162, 21, 33, 31]
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

function getAffordableStudiesFromStudyList(studiesToPurchase: Array<number>, theoremAmount: number): Array<number> {
  let remainingTheorems = theoremAmount;
  const affordableStudies: Array<number> = [];

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

function prettyPrintStudyList(studies: Array<number>): string {
  const studySet = new Set(studies);
  const consumed = new Set<number>();
  // Store the study at which the "group" starts, alongside its replacement
  const insertions = new Map<number, string>();

  // Checks if a particular group is in the study set,
  // and if it is, store the study at which the group starts and the
  // replacement for it.
  function tryGroup(group: Array<number>, label: string): boolean {
    if (group.every(s => studySet.has(s))) {
      const minStudy = Math.min(...group);
      group.forEach(s => consumed.add(s));
      insertions.set(minStudy, label);
      return true;
    }
    return false;
  }

  tryGroup(TREE_PATHS.ALL_PRE_SPLIT, "11-62");

  const dimPathGroups: Array<[Array<number>, string]> = [
    [TREE_PATHS.ANTIMATTER, "antimatter"],
    [TREE_PATHS.INFINITY, "infinity"],
    [TREE_PATHS.TIME, "time"]
  ];

  for (const [group, replacement] of dimPathGroups) tryGroup(group, replacement);

  tryGroup(TREE_PATHS.ACTIVE, "active");
  tryGroup(TREE_PATHS.PASSIVE, "passive");
  tryGroup(TREE_PATHS.IDLE, "idle");

  const postPaceGroups: Array<[Array<number>, string]> = [
    [[151, 161, 162, 171, 181, 191, 192, 193, 201, 211, 212, 213, 214], "151-214"],
    [[151, 161, 162, 171, 181, 191, 192, 193, 201], "151-201"],
    [[151, 161, 162, 171, 181, 191, 192, 193], "151-193"],
    [[151, 161, 162, 171, 181], "151-181"],
    [[151, 161, 162, 171], "151-171"]
  ];

  // We have to worry about 201 separately because it is the *purchase* of 201
  // that allows the second dimension path to be purchased. Instead of the second dimension path
  // appearing "sequentially" numerically (that is to say, by the first dimension path), we will
  // want to place it after 201 has been purchased.
  let has201 = false;

  for (const [group, replacement] of postPaceGroups) {
    if (tryGroup(group, replacement)) {
      has201 = group.includes(201);
      break;
    }
  }

  let secondPath: string | undefined;

  // Figure out where 201 is, then be rid of the insertion from above so that
  // we can re-insert after 201.
  if (has201) {
    const idx201 = studies.indexOf(201);
    for (const [group, replacement] of dimPathGroups) {
      if (studySet.has(group[0]) && studies.indexOf(group[0]) > idx201) {
        secondPath = replacement;
        insertions.delete(Math.min(...group));
      }
    }
  }

  const tokens: string[] = [];

  for (const study of [...studies].sort((a, b) => a - b)) {
    if (insertions.has(study)) tokens.push(insertions.get(study)!);
    // 151 is kind of hard-coded here, but it's because every post-pace path
    // grouping starts with 151. So, when the study is set to 151, it will insert
    // the grouping with 201, and then we'll manually push the second path replacement
    // here, since it's already been thrown out of insertions.
    if (study === 151 && secondPath) tokens.push(secondPath);
    if (!consumed.has(study)) tokens.push(String(study));
  }

  return `${tokens.join(", ")} | 0`;
}

export function getRecommendedTree(theoremAmount: number, path: string = "active"): string {
  let recommendedTree:
    | {
        ts: Array<number>;
        desc?: string;
        requirement: number;
      }
    | undefined = undefined;

  for (const tree of trees(path).reverse()) {
    if (Math.max(theoremAmount, 0) >= tree.requirement) {
      recommendedTree = tree;
    }
  }

  if (theoremAmount === 0 || !recommendedTree) return "You don't have any Time Theorems, silly!";

  const affordableStudies = getAffordableStudiesFromStudyList(recommendedTree.ts, theoremAmount);
  return `${recommendedTree.desc ?? ""}${codeBlock(`${prettyPrintStudyList(affordableStudies)}`)}`;
}

export function findEC(challenge: number, completion: number): EternityChallenge {
  return eternityChallenges[challenge][completion];
}

const orderAsECs: Array<EternityChallenge> = orderAsDoublyLinkedList.traverse();

// Function rewritten by Mirai
export function ecsAtTTAmount(tt: number): ECsAtTTInfo {
  if (tt >= 12350)
    return {
      completions: "All ECs completed!",
      nextEC: findEC(1, 1),
      nextECs: [],
      nextChallengeTT: Number.MAX_VALUE
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
