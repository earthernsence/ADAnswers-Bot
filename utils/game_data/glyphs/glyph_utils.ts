/**
 * Original library created by Gaunter.
 * GitHub: https://github.com/lrobt97/glyphapi
 * Rewritten in TypeScript by Earth for ADAB v6 (rewrite update).
 */

import { inlineCode } from "discord.js";
import { normDist } from "@/utils/utils_math";
import { quantify } from "@/utils/utils_commands";

export function threshold(rarity: number): string {
  return `To be guaranteed two effect Glyph with rarity ${rarity}%, you need a Glyph of at least level ${inlineCode(String(Math.ceil(10_000 / (2.5 * rarity / 100 + 1))))}.`;
}

export function rarityProbability({
  rarity,
  ru16,
  bonus
}: {
  rarity: number,
  ru16: boolean,
  bonus: number
}): string {
  // The minimum value a normally distributed variable would need to be for the required rarity
  let minimumStrength = 2.5 * (rarity - bonus) / 100 + 1;

  // The theoretical minimum rarity that could be generated
  const theoreticalMinimum = ru16 ? Math.min(1.3 + bonus / 40, 3.5) : Math.min(1 + bonus / 40, 3.5);

  if (minimumStrength < theoreticalMinimum) {
    const theoreticalMinimumRarity = (Math.ceil(400 * ((theoreticalMinimum - 1) * 100 / 2.5)) / 400).toFixed(2);
    return `The given rarity (${rarity}%) would be impossible, but you are guaranteed a rarity of ${theoreticalMinimumRarity}%.`;
  }

  if (ru16) minimumStrength /= 1.3;

  const zScore = Math.pow(minimumStrength, 1 / 0.65) - 1;
  const probability = 2 * (1 - normDist(zScore)) * 100;
  if (probability < 0.01) {
    return `A Glyph with the given rarity (${rarity}%) would have a probability below 0.01%.`;
  }

  return `A Glyph with the given rarity (${rarity}%), or better, would have a probability of ${probability.toFixed(2)}%.`;
}

export function effectProbability({
  effects,
  level,
  rarity,
  ru17,
  effarig
}: {
  effects: number,
  level: number,
  rarity: number,
  ru17: boolean,
  effarig: boolean
}): string {
  if (!effarig && effects > 4) {
    return `You cannot get more than 4 effects on this Glyph type!`;
  }

  const strength = 2.5 * rarity / 100 + 1;
  const min = Math.ceil(10_000 / strength);

  // If level is below the threshold and # of effects is greater than or equal to 4,
  // or the level is below the threshold and # of effects if greater than 3, but no ru17,
  // or the level is above the threshold and # of effects is 1,
  // then the Glyph is impossible.
  if ((level < min && effects >= 4) || (level < min && effects >= 3 && !ru17) || (level > min && effects === 1)) {
    return `The given Glyph (GL${level}, rarity ${rarity}%, ${quantify("effect", effects)}) would be impossible.`;
  }

  if (level * strength === 10_000) {
    return ru17 ? `You have a 50/50 chance of getting 2 or 3 effects.` : "You can only get two effects at this level.";
  }

  const probability = getFinalProbability({ min, strength, level, effects, effarig, ru17 });

  return `The probability of finding the given${effarig ? " Effarig" : " "}Glyph (GL${level}, rarity ${rarity}%, ${quantify("effect", effects)}) is ${(probability * 100).toFixed(2)}%.`;
}

function probabilityModel({
  min,
  strength,
  level,
  effects,
  effarig
}: {
  min: number,
  strength: number,
  level: number,
  effects: number,
  effarig: boolean
}): number {
  if (effects <= 0) return 0;

  const uniformDistributionTargetBounds: [number, number] = [
    Math.pow(((effects - 1) / 1.5), (1 / (1 - Math.sqrt(level * strength) / 100))),
    Math.pow(((effects) / 1.5), (1 / (1 - Math.sqrt(level * strength) / 100)))
  ];

  let probability: number;

  if ((effects === 4 && !effarig) || (effects === 7 && effarig)) return Math.min(uniformDistributionTargetBounds[0], 1);

  if (level < min) probability = Math.max(
    Math.min(uniformDistributionTargetBounds[1], 1) - uniformDistributionTargetBounds[0],
    0
  );
  else probability = Math.max(
    Math.min(uniformDistributionTargetBounds[0], 1) - uniformDistributionTargetBounds[1],
    0
  );

  return probability;
}

function getFinalProbability({
  min,
  strength,
  level,
  effects,
  effarig,
  ru17
}: {
  min: number,
  strength: number,
  level: number,
  effects: number,
  effarig: boolean,
  ru17: boolean
}): number {
  const maxEffectGlyph = (!effarig && effects === 4) || (effarig && effects === 7);
  const baseProb = probabilityModel({ min, strength, level, effects, effarig });
  const prevEffectProb = probabilityModel({ min, strength, level, effects: effects - 1, effarig }) / 2;

  let probability: number;

  if (!ru17) {
    probability = baseProb;
  } else if (effects === 2 && level > min) {
    probability = baseProb / 2;
  } else if (level < min) {
    probability = (1 - (effects === 2 ? 0 : 0.5)) * baseProb + prevEffectProb;
  } else {
    probability = baseProb * (1 - (maxEffectGlyph ? 0 : 0.5)) + prevEffectProb;
  }

  return probability;
}