import {
  effectProbabilityAtLeast,
  effectProbabilityExact,
  type EffectProbabilityProps,
  globalEffectProbabilityAtLeast,
  globalEffectProbabilityExact,
  type GlobalEffectProbabilityProps,
  GlyphUtilsHelpers,
  rarityProbabilityAtLeast,
  rarityProbabilityExact,
  type RarityProbabilityProps
} from "./new_glyph_utils";
import { formatPercent } from "@/utils/utils_formatting";
import { quantify } from "@/utils/utils_commands";
import { underline } from "discord.js";

type GlyphUtilsMessageRarityProbabilityProps = {
  exact: boolean;
} & RarityProbabilityProps;

type GlyphUtilsMessageEffectProbabilityProps = {
  exact: boolean;
} & EffectProbabilityProps;

type GlyphUtilsMessageGlobalEffectProbabilityProps = {
  exact: boolean;
} & GlobalEffectProbabilityProps;

// This is a utility class with static methods to provide an interfacing layer
// between the glyph command itself and the glyph utilities. Because there are some
// additional messages that show depending on the results of the calculations --
// and that the glyph utilities *only* handle the calculations --
// this layer will hopefully compartmentalise that away from overloading the glyph command.
// In a perfect world, these would simply be calls to the functions in new_glyph_utils.ts,
// but there are some additional calculations we will do here to see if there needs to be a
// different message sent.
export class GlyphUtilsMessages {
  public static rarityProbability({ rarity, ru16, bonus, exact }: GlyphUtilsMessageRarityProbabilityProps): string {
    const probability = exact
      ? rarityProbabilityExact({ rarity, ru16, bonus })
      : rarityProbabilityAtLeast({ rarity, ru16, bonus });

    const infoString = `with a rarity of ${underline(exact ? "exactly" : "at least")} \
    ${formatPercent(rarity / 100, 1)}, given that you have \
    ${bonus > 0 ? `+${formatPercent(bonus / 100, 1)} bonus rarity` : "no bonus rarity"} and have \
    ${ru16 ? "purchased RU16" : "not purchased RU16"}`;

    // Calculate the lowest possible strength value for the glyph of that
    // rarity, then see if our theoretical minimum is bigger than that to
    // determine if generating that glyph is possible at all.
    const baseStrength = Math.round(rarity * 10) / 10 / 40 + 1;
    const theoreticalMinimum = ru16 ? Math.min(1.3 + bonus / 40, 3.5) : Math.min(1 + bonus / 40, 3.5);

    if (baseStrength < theoreticalMinimum) {
      const theoreticalMinimumRarity = Math.ceil(400 * (((theoreticalMinimum - 1) * 100) / 2.5)) / 400;
      return `It would be impossible to find a Glyph ${infoString}. You are, however, guaranteed a rarity of at least \
        ${formatPercent(theoreticalMinimumRarity / 100, 1)}.`;
    }

    if (probability < 0.0001) {
      return `The probability of finding a Glyph ${infoString}, is below ${formatPercent(0.0001)}. Your odds are...not great. \
      (specifically: ${formatPercent(probability, 16)})`;
    }

    return `The probability of finding a Glyph ${infoString}, is ${formatPercent(probability, probability < 0.01 ? 3 : 2)}.`;
  }

  public static effectProbability({
    effects,
    level,
    rarity,
    ru17,
    isEffarig,
    exact
  }: GlyphUtilsMessageEffectProbabilityProps): string {
    if (effects === 1) {
      return `All Glyphs have at least one effect, silly.`;
    }

    if (!isEffarig && effects > 4) {
      return `You cannot get more than 4 effects on this Glyph type!`;
    }

    const probability = exact
      ? effectProbabilityExact({ effects, level, rarity, ru17, isEffarig })
      : effectProbabilityAtLeast({ effects, level, rarity, ru17, isEffarig });

    const infoString = `a level ${level} ${isEffarig ? "Effarig Glyph" : "Glyph"} with ${underline(exact ? "exactly" : "at least")} \
    ${quantify("effect", effects, false)}, given that it has a rarity of \
    ${formatPercent(rarity / 100, 1)} and that you have \
    ${ru17 ? "purchased RU17" : "not purchased RU17"}`;

    const strength = GlyphUtilsHelpers.rarityToStrength(rarity);
    const opThreshold = Math.ceil(10_000 / strength);

    if (!exact) {
      // If level is below the threshold and # of effects is greater than or equal to 4,
      // or the level is below the threshold and # of effects if greater than 3, but no ru17,
      // or the level is above the threshold and # of effects is 1,
      // then the Glyph is impossible.
      if (
        (level < opThreshold && effects >= 4) ||
        (level < opThreshold && effects >= 3 && !ru17) ||
        (level > opThreshold && effects === 1)
      )
        return `You are not able to find ${infoString}.`;

      if (level * strength === 10_000) {
        if (effects === 2) return `You are guaranteed to receive at least 2 effects on ${infoString}.`;
        if (effects === 3) return `You have a 50/50 chance of getting 2 or 3 effects on ${infoString}.`;
        return `It is not possible to see more than three effects on ${infoString}.`;
      }
    }

    return `The probability of finding ${infoString}, is ${formatPercent(probability, probability < 0.01 ? 3 : 2)}.`;
  }

  public static globalEffectProbability({
    effects,
    level,
    minRarity,
    ru16,
    ru17,
    bonus,
    isEffarig,
    exact
  }: GlyphUtilsMessageGlobalEffectProbabilityProps): string {
    const probability = exact
      ? globalEffectProbabilityExact({ effects, level, minRarity, ru16, ru17, bonus, isEffarig })
      : globalEffectProbabilityAtLeast({ effects, level, minRarity, ru16, ru17, bonus, isEffarig });

    const infoString = `a level ${level} ${isEffarig ? "Effarig Glyph" : "Glyph"} \
    ${minRarity > 0 ? `of a rarity of at least ${formatPercent(minRarity)}` : "of any rarity"} \
    with ${underline(exact ? "exactly" : "at least")} \
    ${quantify("effect", effects, false)}, \
    given that you have ${bonus > 0 ? `+${formatPercent(bonus / 100, 1)} bonus rarity` : "no bonus rarity"}, \
    ${ru16 ? "purchased RU16" : "not purchased RU16"}, and you have ${ru17 ? "purchased RU17" : "not purchased RU17"}`;

    return `The probability of finding ${infoString}, ${formatPercent(probability, probability < 0.01 ? 3 : 2)}.`;
  }
}
