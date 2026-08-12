/**
 * Testing suite for transcripted implementation of the improved Glyph Utilities library
 * by Alex9127. These numbers are from his original implementation.
 *
 * To run from root of ADAB directory (for Windows machines):
 * bun test .\utils\game_data\glyphs\new_glyph_utils.test.ts
 * Currently: 60 tests, all pass
 */

import { describe, expect, test } from "bun:test";
import {
  effectProbabilityAtLeast,
  effectProbabilityExact,
  globalEffectProbabilityAtLeast,
  globalEffectProbabilityExact,
  rarityProbabilityAtLeast,
  rarityProbabilityExact
} from "./new_glyph_utils";

describe("rarity probability", () => {
  test("at least 10% rarity, no RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityAtLeast({
        rarity: 10,
        ru16: false,
        bonus: 0
      })
    ).toBeCloseTo(0.682188, 5);
  });

  test("at least 25% rarity, no RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityAtLeast({
        rarity: 25,
        ru16: false,
        bonus: 0
      })
    ).toBeCloseTo(0.266838, 5);
  });

  test("at least 50% rarity, no RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityAtLeast({
        rarity: 50,
        ru16: false,
        bonus: 0
      })
    ).toBeCloseTo(0.013072, 5);
  });

  test("at least 75% rarity, no RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityAtLeast({
        rarity: 75,
        ru16: false,
        bonus: 0
      })
    ).toBeCloseTo(Math.pow(10, -5) * 4.568623, 5);
  });

  test("at least 10% rarity, with RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityAtLeast({
        rarity: 10,
        ru16: true,
        bonus: 0
      })
    ).toBe(1);
  });

  test("at least 25% rarity, with RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityAtLeast({
        rarity: 25,
        ru16: true,
        bonus: 0
      })
    ).toBeCloseTo(0.682188, 5);
  });

  test("at least 50% rarity, with RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityAtLeast({
        rarity: 50,
        ru16: true,
        bonus: 0
      })
    ).toBeCloseTo(0.185045, 5);
  });

  test("at least 75% rarity, with RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityAtLeast({
        rarity: 75,
        ru16: true,
        bonus: 0
      })
    ).toBeCloseTo(0.016818, 5);
  });

  test("exactly 10% rarity, no RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityExact({
        rarity: 10,
        ru16: false,
        bonus: 0
      })
    ).toBeCloseTo(0.00318, 5);
  });

  test("exactly 25% rarity, no RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityExact({
        rarity: 25,
        ru16: false,
        bonus: 0
      })
    ).toBeCloseTo(0.002146, 5);
  });

  test("exactly 50% rarity, no RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityExact({
        rarity: 50,
        ru16: false,
        bonus: 0
      })
    ).toBeCloseTo(0.000216, 5);
  });

  test("exactly 75% rarity, no RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityExact({
        rarity: 75,
        ru16: false,
        bonus: 0
      })
    ).toBeCloseTo(Math.pow(10, -6) * 1.315686, 5);
  });

  test("exactly 10% rarity, with RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityExact({
        rarity: 10,
        ru16: true,
        bonus: 0
      })
    ).toBe(0);
  });

  test("exactly 25% rarity, with RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityExact({
        rarity: 25,
        ru16: true,
        bonus: 0
      })
    ).toBeCloseTo(0.002446, 5);
  });

  test("exactly 50% rarity, with RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityExact({
        rarity: 50,
        ru16: true,
        bonus: 0
      })
    ).toBeCloseTo(0.001314, 5);
  });

  test("exactly 75% rarity, with RU16, +0% bonus rarity", () => {
    expect(
      rarityProbabilityExact({
        rarity: 75,
        ru16: true,
        bonus: 0
      })
    ).toBeCloseTo(0.000206, 5);
  });
});

describe("at-least effect probability", () => {
  test("at least 1 effect, GL100, 50% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 1,
        level: 100,
        rarity: 50,
        ru17: false,
        isEffarig: false
      })
    ).toBe(1);
  });

  test("at least 2 effects, GL100, 50% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 2,
        level: 100,
        rarity: 50,
        ru17: false,
        isEffarig: false
      })
    ).toBeCloseTo(0.379368, 5);
  });

  test("at least 3 effects, GL100, 50% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 3,
        level: 100,
        rarity: 50,
        ru17: false,
        isEffarig: false
      })
    ).toBe(0);
  });

  test("at least 1 effect, GL100, 50% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 1,
        level: 100,
        rarity: 50,
        ru17: true,
        isEffarig: false
      })
    ).toBe(1);
  });

  test("at least 2 effects, GL100, 50% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 2,
        level: 100,
        rarity: 50,
        ru17: true,
        isEffarig: false
      })
    ).toBeCloseTo(0.689684, 5);
  });

  test("at least 3 effects, GL100, 50% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 3,
        level: 100,
        rarity: 50,
        ru17: true,
        isEffarig: false
      })
    ).toBeCloseTo(0.189684, 5);
  });

  test("at least 1 effect, GL3700, 100% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 1,
        level: 3700,
        rarity: 100,
        ru17: false,
        isEffarig: false
      })
    ).toBe(1);
  });

  test("at least 2 effects, GL3700, 100% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 2,
        level: 3700,
        rarity: 100,
        ru17: false,
        isEffarig: false
      })
    ).toBe(1);
  });

  test("at least 3 effects, GL3700, 100% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 3,
        level: 3700,
        rarity: 100,
        ru17: false,
        isEffarig: false
      })
    ).toBeCloseTo(0.124313, 5);
  });

  test("at least 4 effects, GL3700, 100% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 4,
        level: 3700,
        rarity: 100,
        ru17: false,
        isEffarig: false
      })
    ).toBeCloseTo(0.006581, 5);
  });

  test("at least 1 effect, GL3700, 100% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 1,
        level: 3700,
        rarity: 100,
        ru17: true,
        isEffarig: false
      })
    ).toBe(1);
  });

  test("at least 2 effects, GL3700, 100% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 2,
        level: 3700,
        rarity: 100,
        ru17: true,
        isEffarig: false
      })
    ).toBe(1);
  });

  test("at least 3 effects, GL3700, 100% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 3,
        level: 3700,
        rarity: 100,
        ru17: true,
        isEffarig: false
      })
    ).toBeCloseTo(0.562156, 5);
  });

  test("at least 4 effects, GL3700, 100% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 4,
        level: 3700,
        rarity: 100,
        ru17: true,
        isEffarig: false
      })
    ).toBeCloseTo(0.065447, 5);
  });

  test("at least 5 effects, GL3700, 100% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 5,
        level: 3700,
        rarity: 100,
        ru17: true,
        isEffarig: false
      })
    ).toBe(0);
  });

  test("at least 5 effects, GL3700, 100% rarity, with RU17, is Effarig", () => {
    expect(
      effectProbabilityAtLeast({
        effects: 5,
        level: 3700,
        rarity: 100,
        ru17: true,
        isEffarig: true
      })
    ).toBeCloseTo(0.003699, 5);
  });
});

describe("exact effect probability", () => {
  test("exactly 1 effect, GL100, 50% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 1,
        level: 100,
        rarity: 50,
        ru17: false,
        isEffarig: false
      })
    ).toBeCloseTo(0.620631, 5);
  });

  test("exactly 2 effects, GL100, 50% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 2,
        level: 100,
        rarity: 50,
        ru17: false,
        isEffarig: false
      })
    ).toBeCloseTo(0.379368, 5);
  });

  test("exactly 3 effects, GL100, 50% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 3,
        level: 100,
        rarity: 50,
        ru17: false,
        isEffarig: false
      })
    ).toBe(0);
  });

  test("exactly 1 effect, GL100, 50% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 1,
        level: 100,
        rarity: 50,
        ru17: true,
        isEffarig: false
      })
    ).toBeCloseTo(0.310315, 5);
  });

  test("exactly 2 effects, GL100, 50% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 2,
        level: 100,
        rarity: 50,
        ru17: true,
        isEffarig: false
      })
    ).toBeCloseTo(0.499999, 5);
  });

  test("exactly 3 effects, GL100, 50% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 3,
        level: 100,
        rarity: 50,
        ru17: true,
        isEffarig: false
      })
    ).toBeCloseTo(0.189684, 5);
  });

  test("exactly 1 effect, GL3700, 100% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 1,
        level: 3700,
        rarity: 100,
        ru17: false,
        isEffarig: false
      })
    ).toBe(0);
  });

  test("exactly 2 effects, GL3700, 100% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 2,
        level: 3700,
        rarity: 100,
        ru17: false,
        isEffarig: false
      })
    ).toBeCloseTo(0.875686, 5);
  });

  test("exactly 3 effects, GL3700, 100% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 3,
        level: 3700,
        rarity: 100,
        ru17: false,
        isEffarig: false
      })
    ).toBeCloseTo(0.117732, 5);
  });

  test("exactly 4 effects, GL3700, 100% rarity, no RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 4,
        level: 3700,
        rarity: 100,
        ru17: false,
        isEffarig: false
      })
    ).toBeCloseTo(0.006581, 5);
  });

  test("exactly 1 effect, GL3700, 100% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 1,
        level: 3700,
        rarity: 100,
        ru17: true,
        isEffarig: false
      })
    ).toBe(0);
  });

  test("exactly 2 effects, GL3700, 100% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 2,
        level: 3700,
        rarity: 100,
        ru17: true,
        isEffarig: false
      })
    ).toBeCloseTo(0.437843, 5);
  });

  test("exactly 3 effects, GL3700, 100% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 3,
        level: 3700,
        rarity: 100,
        ru17: true,
        isEffarig: false
      })
    ).toBeCloseTo(0.496709, 5);
  });

  test("exactly 4 effects, GL3700, 100% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 4,
        level: 3700,
        rarity: 100,
        ru17: true,
        isEffarig: false
      })
    ).toBeCloseTo(0.065447, 5);
  });

  test("exactly 5 effects, GL3700, 100% rarity, with RU17, not Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 5,
        level: 3700,
        rarity: 100,
        ru17: true,
        isEffarig: false
      })
    ).toBe(0);
  });

  test("exactly 5 effects, GL3700, 100% rarity, with RU17, is Effarig", () => {
    expect(
      effectProbabilityExact({
        effects: 5,
        level: 3700,
        rarity: 100,
        ru17: true,
        isEffarig: true
      })
    ).toBeCloseTo(0.003209, 5);
  });
});

describe("global effect probability", () => {
  test("at least 3 effects, GL3700, 0% minimum rarity, with RU16, with RU17, +0% bonus rarity, not Effarig", () => {
    expect(
      globalEffectProbabilityAtLeast({
        effects: 3,
        level: 3700,
        minRarity: 0,
        ru16: true,
        ru17: true,
        bonus: 0,
        isEffarig: false
      })
    ).toBeCloseTo(0.44475, 5);
  });

  test("at least 4 effects, GL4500, 0% minimum rarity, with RU16, with RU17, +0% bonus rarity, not Effarig", () => {
    expect(
      globalEffectProbabilityAtLeast({
        effects: 4,
        level: 4500,
        minRarity: 0,
        ru16: true,
        ru17: true,
        bonus: 0,
        isEffarig: false
      })
    ).toBeCloseTo(0.003359, 5);
  });

  test("at least 4 effects, GL4500, 0% minimum rarity, with RU16, with RU17, +5% bonus rarity, not Effarig", () => {
    expect(
      globalEffectProbabilityAtLeast({
        effects: 4,
        level: 4500,
        minRarity: 0,
        ru16: true,
        ru17: true,
        bonus: 5,
        isEffarig: false
      })
    ).toBeCloseTo(0.005653, 5);
  });

  test("at least 4 effects, GL4500, 0% minimum rarity, with RU16, with RU17, +10% bonus rarity, not Effarig", () => {
    expect(
      globalEffectProbabilityAtLeast({
        effects: 4,
        level: 4500,
        minRarity: 0,
        ru16: true,
        ru17: true,
        bonus: 10,
        isEffarig: false
      })
    ).toBeCloseTo(0.009095, 5);
  });

  test("at least 4 effects, GL4500, 0% minimum rarity, with RU16, with RU17, +15% bonus rarity, not Effarig", () => {
    expect(
      globalEffectProbabilityAtLeast({
        effects: 4,
        level: 4500,
        minRarity: 0,
        ru16: true,
        ru17: true,
        bonus: 15,
        isEffarig: false
      })
    ).toBeCloseTo(0.014027, 5);
  });

  test("at least 4 effects, GL4500, 55% minimum rarity, with RU16, with RU17, +15% bonus rarity, not Effarig", () => {
    expect(
      globalEffectProbabilityAtLeast({
        effects: 4,
        level: 4500,
        minRarity: 55,
        ru16: true,
        ru17: true,
        bonus: 15,
        isEffarig: false
      })
    ).toBeCloseTo(0.014026, 5);
  });

  test("at least 4 effects, GL4500, 60% minimum rarity, with RU16, with RU17, +15% bonus rarity, not Effarig", () => {
    expect(
      globalEffectProbabilityAtLeast({
        effects: 4,
        level: 4500,
        minRarity: 60,
        ru16: true,
        ru17: true,
        bonus: 15,
        isEffarig: false
      })
    ).toBeCloseTo(0.0139, 5);
  });

  test("at least 4 effects, GL4500, 70% minimum rarity, with RU16, with RU17, +15% bonus rarity, not Effarig", () => {
    expect(
      globalEffectProbabilityAtLeast({
        effects: 4,
        level: 4500,
        minRarity: 70,
        ru16: true,
        ru17: true,
        bonus: 15,
        isEffarig: false
      })
    ).toBeCloseTo(0.011519, 5);
  });

  test("at least 4 effects, GL4500, 80% minimum rarity, with RU16, with RU17, +15% bonus rarity, not Effarig", () => {
    expect(
      globalEffectProbabilityAtLeast({
        effects: 4,
        level: 4500,
        minRarity: 80,
        ru16: true,
        ru17: true,
        bonus: 15,
        isEffarig: false
      })
    ).toBeCloseTo(0.006853, 5);
  });

  test("at least 4 effects, GL4500, 90% minimum rarity, with RU16, with RU17, +15% bonus rarity, not Effarig", () => {
    expect(
      globalEffectProbabilityAtLeast({
        effects: 4,
        level: 4500,
        minRarity: 90,
        ru16: true,
        ru17: true,
        bonus: 15,
        isEffarig: false
      })
    ).toBeCloseTo(0.002905, 5);
  });

  test("at least 4 effects, GL4500, 100% minimum rarity, with RU16, with RU17, +15% bonus rarity, not Effarig", () => {
    expect(
      globalEffectProbabilityAtLeast({
        effects: 4,
        level: 4500,
        minRarity: 100,
        ru16: true,
        ru17: true,
        bonus: 15,
        isEffarig: false
      })
    ).toBeCloseTo(0.000839, 5);
  });

  test("exactly 3 effects, GL3700, 0% minimum rarity, with RU16, with RU17, +0% bonus rarity, not Effarig", () => {
    expect(
      globalEffectProbabilityExact({
        effects: 3,
        level: 3700,
        minRarity: 0,
        ru16: true,
        ru17: true,
        bonus: 0,
        isEffarig: false
      })
    ).toBeCloseTo(0.444593, 5);
  });
});
