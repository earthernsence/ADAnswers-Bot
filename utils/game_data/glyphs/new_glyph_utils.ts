/**
 * Original Python library created by Gaunter.
 * GitHub: https://github.com/lrobt97/glyphapi
 * Rewritten in TypeScript by Earth for ADAB v6 (rewrite update).
 * This updated version for ADAB v6.2 originally written in Python
 * by Alex9127 & transcripted to TypeScript by Earth. Original
 * Python is provided in the ADAB repository.
 *
 * Note that these are only for the raw calculations of numbers.
 * Formatted output is now handled in a separate GlyphUtilsMessages
 * class layer to avoid complicating the glyph command or invading
 * the calculations here.
 *
 * You can also visit the testing suite for this transcription
 * on the ADAB repository.
 */

import { normDist } from "@/utils/utils_math";

export interface RarityProbabilityProps {
  rarity: number;
  ru16: boolean;
  bonus: number;
}

export interface EffectProbabilityProps {
  effects: number;
  level: number;
  rarity: number;
  ru17: boolean;
  isEffarig: boolean;
}

export interface GlobalEffectProbabilityProps {
  effects: number;
  level: number;
  minRarity: number;
  ru16: boolean;
  ru17: boolean;
  bonus: number;
  isEffarig: boolean;
}

export class GlyphUtilsHelpers {
  public static rarityToStrength(rarity: number): number {
    return (2.5 * rarity) / 100 + 1;
  }
}

/**
 * This function reflects the rarityProbability function from the original Glyph Utilities library.
 * Determines the probability of seeing a Glyph with a specified rarity, or better, including the effects
 * of any Reality Upgrades or bonus rarity.
 * @param information Object containing all pertinent information used for the calculation.
 * @returns {number} Final calculated probability for use in other calculations
 */
export function rarityProbabilityAtLeast({ rarity, ru16, bonus }: RarityProbabilityProps): number {
  const clampedRarity = Math.round(rarity * 10) / 10;
  if (clampedRarity > 100) return 0;

  // The minimum value a normally distributed variable would need to be for the specified rarity.
  // This, along with the theoretical minimum rarity, is what is adjusted with the inclusion
  // of Reality Upgrade 16.
  let minimumStrength = (2.5 * (clampedRarity - bonus)) / 100 + 1;

  // Calculate the lowest possible strength value for the Glyph of that rarity,
  // then see if our theoretical minium is bigger than that to determine if
  // generating that specific Glyph is possible at all.
  const baseStrength = clampedRarity / 40 + 1;

  // The theoretical minimum rarity that could be generated
  const theoreticalMinimum = ru16 ? Math.min(1.3 + bonus / 40, 3.5) : Math.min(1 + bonus / 40, 3.5);

  // If needed: const theoreticalMinimumRarity = Math.ceil(400 * (((theoreticalMinimum - 1) * 100) / 2.5)) / 400;
  if (baseStrength < theoreticalMinimum) return 1;

  if (ru16) minimumStrength /= 1.3;

  const zScore = Math.pow(minimumStrength, 1 / 0.65) - 1;
  const probability = Math.min(2 * (1 - normDist(zScore)), 1);
  return probability;
}

/**
 * Calculates the probability of seeing a Glyph with *exactly* the specified rarity, including the effects
 * of Reality Upgrade 16 and any bonus rarity.
 * @param information Object containing all pertinent information used for the calculation.
 * @returns probability as a decimal
 */
export function rarityProbabilityExact({ rarity, ru16, bonus }: RarityProbabilityProps): number {
  return (
    rarityProbabilityAtLeast({ rarity, ru16, bonus }) - rarityProbabilityAtLeast({ rarity: rarity + 0.1, ru16, bonus })
  );
}

function simpleEffectProbability({
  rarity,
  level,
  effects
}: {
  rarity: number;
  level: number;
  effects: number;
}): number {
  const strength = GlyphUtilsHelpers.rarityToStrength(rarity);

  const opThreshold = Math.ceil(10_000 / strength);

  if (effects < 1) return 0;
  if (effects === 1) return 1;
  if (level * strength === 10_000) {
    if (effects <= 2) return 100;
    if (effects === 3) return 50;
    return 0;
  }

  const breakpoint = Math.pow((effects - 1) / 1.5, 1 / (1 - Math.sqrt(level * strength) / 100));

  if (level < opThreshold) return Math.max(1 - breakpoint, 0);
  return Math.min(breakpoint, 1);
}

export function effectProbabilityAtLeast({ effects, level, rarity, ru17, isEffarig }: EffectProbabilityProps): number {
  if (effects < 1) return 0;
  if (effects === 1) return 1;
  if ((!isEffarig && effects > 4) || (isEffarig && effects > 7)) return 0;

  const strength = GlyphUtilsHelpers.rarityToStrength(rarity);
  const opThreshold = Math.ceil(10_000 / strength);

  // If level is below the threshold and # of effects is greater than or equal to 4,
  // or the level is below the threshold and # of effects if greater than 3, but no ru17,
  // or the level is above the threshold and # of effects is 1,
  // then the Glyph is impossible.
  if (
    (level < opThreshold && effects >= 4) ||
    (level < opThreshold && effects >= 3 && !ru17) ||
    (level > opThreshold && effects === 1)
  )
    return 0;

  if (level * strength === 10_000) {
    if (effects === 2) return 1;
    if (effects === 3) return 0.5;
    return 0;
  }

  return ru17
    ? simpleEffectProbability({ rarity, level, effects }) / 2 +
        simpleEffectProbability({ rarity, level, effects: effects - 1 }) / 2
    : simpleEffectProbability({ rarity, level, effects });
}

export function effectProbabilityExact({ effects, level, rarity, ru17, isEffarig }: EffectProbabilityProps): number {
  return (
    effectProbabilityAtLeast({ effects, level, rarity, ru17, isEffarig }) -
    effectProbabilityAtLeast({ effects: effects + 1, level, rarity, ru17, isEffarig })
  );
}

export function globalEffectProbabilityAtLeast({
  effects,
  level,
  minRarity,
  ru16,
  ru17,
  bonus,
  isEffarig
}: GlobalEffectProbabilityProps) {
  // Theoretical minimum rarity that could be generated
  const minimumRarity = Math.round(10 * (ru16 ? Math.min(12 + bonus, 100) : Math.min(bonus, 100))) / 10;

  const possibleRarities: Array<number> = [];
  for (let i = minimumRarity; i <= 100; i += 0.1) {
    // Floating-point attempted prevention stuff
    possibleRarities.push(Number(i.toFixed(1)));
  }

  const rarityProbabilities: Array<number> = [];
  for (let rarity of possibleRarities) {
    rarityProbabilities.push(rarity >= minRarity ? rarityProbabilityExact({ rarity, ru16, bonus }) : 0);
  }

  const effectProbabilities: Array<number> = [];
  for (let rarity of possibleRarities) {
    effectProbabilities.push(effectProbabilityAtLeast({ effects, level, rarity, ru17, isEffarig }));
  }

  let finalProbability = 0;

  for (let i = 0; i < possibleRarities.length; i++) {
    finalProbability += rarityProbabilities[i]! * effectProbabilities[i]!;
  }

  return finalProbability;
}

export function globalEffectProbabilityExact({
  effects,
  level,
  minRarity,
  ru16,
  ru17,
  bonus,
  isEffarig
}: GlobalEffectProbabilityProps) {
  return (
    globalEffectProbabilityAtLeast({ effects, level, minRarity, ru16, ru17, bonus, isEffarig }) -
    globalEffectProbabilityAtLeast({ effects: effects + 1, level, minRarity, ru16, ru17, bonus, isEffarig })
  );
}
