import { EC, ECsAtTTInfo } from "../utils/types";
import { ECDescriptions, ECRewards, EternityChallenges, findEC, order } from "../utils/databases/eternitychallenges";
import { Colour } from "../utils/colours";
import { EmbedBuilder } from "discord.js";
import { footerText } from "./Misc";

function findCompletionsAtIndex(indexOfCompletion: number): string {
  const completions = Array(12);

  for (let i = 0; i < indexOfCompletion; i++) {
    const previous = order[i].split("x").map(Number);
    const previousId = previous[0] - 1;
    const previousCompletion = previous[1];

    completions[previousId] = previousCompletion;
  }

  return completions.filter(Number).map((value, index) => `${index + 1}x${value}`).join(", ");
}

export function otherCompletions(id: number, completion: number): string {
  if (id < 1 || id > 12) {
    return `Invalid challenge id: ${id}`;
  }

  if (completion < 1 || completion > 5) {
    return `Invalid challenge completion: ${completion}`;
  }

  const completionText = `${id}x${completion}`;
  const indexOfCompletion = order.indexOf(completionText);

  if (indexOfCompletion === -1) {
    return `Challenge ${completionText} completion not found.`;
  }

  if (indexOfCompletion === 0) {
    return `No other challenge completions required.`;
  }

  return findCompletionsAtIndex(indexOfCompletion);
}

export function ecsAtTTAmount(tt: number): ECsAtTTInfo | string {
  if (tt < 130) return "No ECs can be reasonably completed yet!";
  if (tt === 130) return "1x1";
  if (tt > 12350) return "all ECs completed!";

  let completions = Array(12);
  for (const chall of EternityChallenges) {
    if (chall.tt <= tt) {
      completions[chall.challenge - 1] = chall.completion;
    }
  }

  completions = completions.filter(Number).map((value, index) => `${index + 1}x${value}`);
  const completionIndices = [];

  for (const completion of completions) {
    completionIndices[completions.indexOf(completion) + 1] = order.indexOf(completion);
  }

  const highestInOrder = order[completionIndices.sort((a, b) => b - a)[0]];
  const next = order[order.indexOf(highestInOrder) + 1];
  const nextECs = [next];

  // It's easier to just bypass all of the while loop like this then messing with whatever the hell is happening there
  if (next === "12x5") return {
    completions: completions.join(", "),
    nextEC: findEC(12, 5),
    nextECs
  };

  while (findEC(
    Number(order[order.indexOf(nextECs[nextECs.length - 1]) + 1].split("x")[0]),
    Number(order[order.indexOf(nextECs[nextECs.length - 1]) + 1].split("x")[1])
  ).tt ===
  findEC(
    Number(next.split("x")[0]),
    Number(next.split("x")[1])
  ).tt) {
    nextECs.push(order[order.indexOf(nextECs[nextECs.length - 1]) + 1]);
  }

  return {
    completions: completions.join(", "),
    nextEC: findEC(Number(next.split("x")[0]), Number(next.split("x")[1])),
    nextECs
  };
}

export const eternityChallenge = (challengeInfo: EC, requestedFields?: string): EmbedBuilder => new EmbedBuilder()
  .setTitle(`Eternity Challenge ${challengeInfo.challenge}x${challengeInfo.completion}`)
  .setColor(Colour.eternity)
  .addFields(shownFields(challengeInfo, requestedFields))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

function ecRequirements(ec: EC) {
  if (ec.challenge === 11 || ec.challenge === 12) return `${ec.unlock.amount} and 1 Time Theorem`;
  return `${ec.unlock.amount} ${ec.unlock.currency} and ${ec.unlock.tt} Time Theorems`;
}

export const shownFields = (challengeInfo: EC, requestedFields?: string) => {
  const fullEC: string = `${challengeInfo.challenge}x${challengeInfo.completion}`;
  switch (requestedFields) {
    case "unlock": return [{ name: "Unlock requirements", value: `${ecRequirements(challengeInfo)}` }];
    case "challenge": return [{ name: "Challenge", value: `${ECDescriptions[challengeInfo.challenge]}` }];
    case "goal": return [{ name: "Goal", value: `${challengeInfo.ip} Infinity Points ${challengeInfo.completionReqs === undefined ? `` : `in ${challengeInfo.completionReqs}.`}` }];
    case "strategy": return [{ name: "Strategy", value: `${challengeInfo.tt} TT recommended
    Other completions: ${otherCompletions(challengeInfo.challenge, challengeInfo.completion)} 
    ${challengeInfo.note === null ? `` : `\n    Note: \`${challengeInfo.note}\``}` }];
    case "tree": return [{ name: "Tree", value: `${challengeInfo.tree}` }];
    case "reward": return [{ name: "Reward", value: `${ECRewards[challengeInfo.challenge].reward}` }, { name: "Reward formula", value: `${ECRewards[challengeInfo.challenge].formula}` }];
    default: {
      const nextEC = fullEC === "12x5" ? "none" : order[order.indexOf(fullEC) + 1].split("x");
      const fields = [
        { name: "Unlock requirements", value: `${ecRequirements(challengeInfo)}` },
        { name: "Challenge", value: `${ECDescriptions[challengeInfo.challenge]}` },
        { name: "Goal", value: `${challengeInfo.ip} Infinity Points ${challengeInfo.completionReqs === undefined ? `` : `in ${challengeInfo.completionReqs}.`}` },
        { name: "Strategy", value: `${challengeInfo.tt} TT recommended
    Other completions: ${otherCompletions(challengeInfo.challenge, challengeInfo.completion)} 
    ${challengeInfo.note === null ? `` : `\n    Note: \`${challengeInfo.note}\``}` },
        { name: "Tree", value: `${challengeInfo.tree}` },
        { name: "Reward", value: `${ECRewards[challengeInfo.challenge].reward}` },
        { name: "Reward formula", value: `${ECRewards[challengeInfo.challenge].formula}` },
        { name: "Next EC", value: `${fullEC === "12x5" ? "You have no more ECs left to complete!"
          : `${order[order.indexOf(fullEC) + 1]} (${findEC(Number(nextEC[0]), Number(nextEC[1])).tt} TT)`}` }
      ];
      return fields;
    }
  }
};