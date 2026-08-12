import math
import matplotlib.pyplot as plt
import numpy as np


def norm_dist(z):
    t = 1 / (1 + 0.2315419 * abs(z))
    d = 0.3989423 * math.exp((-z * z) / 2)
    probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
    if z > 0:
        probability = 1 - probability
    return probability


def rarity_probability_at_least(rarity, ru16, bonus):
    rarity = round(rarity, 1)
    if rarity > 100:
        return 0
    # The minimum value a normally distributed variable would need to be for the required rarity
    minimumStrength = (2.5 * (rarity - bonus)) / 100 + 1

    # Calculate the lowest possible strength value for the glyph of that
    # rarity, then see if our theoretical minimum is bigger than that to
    # determine if generating that glyph is possible at all.
    baseStrength = rarity / 40 + 1

    # The theoretical minimum rarity that could be generated
    theoreticalMinimum = min(1.3 + bonus / 40, 3.5) if ru16 else min(1 + bonus / 40, 3.5)

    if baseStrength < theoreticalMinimum:
        return 1

    if ru16:
        minimumStrength /= 1.3

    zScore = minimumStrength ** (1 / 0.65) - 1
    probability = min(2 * (1 - norm_dist(zScore)), 1)
    return probability


def rarity_probability_exact(rarity, ru16, bonus):
    return rarity_probability_at_least(rarity, ru16, bonus) - rarity_probability_at_least(rarity + 0.1, ru16, bonus)


def effect_probability_simple(strength, level, effects):
    op_threshold = math.ceil(10_000 / strength)
    if effects < 1:
        return 0
    if effects == 1:
        return 1
    if level * strength == 10_000:
        if effects <= 2:
            return 100
        elif effects == 3:
            return 50
        else:
            return 0
    break_point_log10 = math.log10((effects - 1) / 1.5) * (1 / (1 - (level * strength) ** 0.5 / 100))
    if break_point_log10 > 100:
        if level < op_threshold:
            return 0
        else:
            return 1
    break_point = ((effects - 1) / 1.5) ** (1 / (1 - (level * strength) ** 0.5 / 100))
    if level < op_threshold:
        return max(1 - break_point, 0)
    else:
        return min(break_point, 1)


def effect_probability_at_least(effects, level, rarity, ru17, is_effarig):
    if effects < 1:
        return 0
    if effects == 1:
        return 1
    if (not is_effarig and effects > 4) or (is_effarig and effects > 7):
        return 0

    strength = (2.5 * rarity) / 100 + 1
    op_threshold = math.ceil(10_000 / strength)

    # If level is below the threshold and # of effects is greater than or equal to 4,
    # or the level is below the threshold and # of effects if greater than 3, but no ru17,
    # or the level is above the threshold and # of effects is 1,
    # then the Glyph is impossible.
    if (level < op_threshold and effects >= 4) or \
            (level < op_threshold and effects >= 3 and not ru17) or \
            (level > op_threshold and effects == 1):
        return 0

    if level * strength == 10_000:
        if effects == 2:
            return 1
        elif effects == 3:
            return 0.5
        else:
            return 0

    if not ru17:
        probability = effect_probability_simple(strength, level, effects)
    else:
        probability = effect_probability_simple(strength, level, effects) / 2 + \
                      effect_probability_simple(strength, level, effects - 1) / 2

    return probability


def effect_probability_exact(effects, level, rarity, ru17, effarig):
    return effect_probability_at_least(effects, level, rarity, ru17, effarig) - \
        effect_probability_at_least(effects + 1, level, rarity, ru17, effarig)


def global_effect_probability_at_least(effects, level, min_rarity, ru16, ru17, bonus, is_effarig):
    # The theoretical minimum rarity that could be generated
    minimum_rarity = round(min(12 + bonus, 100) if ru16 else min(bonus, 100), 1)

    possible_rarities = np.arange(minimum_rarity, 100.1, 0.1)
    rarity_probabilities = np.array([rarity_probability_exact(x, ru16, bonus) if x >= min_rarity else 0
                                     for x in possible_rarities])

    effect_probabilities = np.array([effect_probability_at_least(effects, level, x, ru17, is_effarig)
                                     for x in possible_rarities])
                                     
    final_probability = np.sum(rarity_probabilities * effect_probabilities)
    return final_probability


def global_effect_probability_exact(effects, level, rarity, ru16, ru17, bonus, is_effarig):
    return global_effect_probability_at_least(effects, level, rarity, ru16, ru17, bonus, is_effarig) - \
        global_effect_probability_at_least(effects + 1, level, rarity, ru16, ru17, bonus, is_effarig)


input_data = np.arange(0, 100.1, 0.1)
output_data_no_r16 = np.array([rarity_probability_exact(x, False, 0) for x in input_data])
output_data_yes_r16 = np.array([rarity_probability_exact(x, True, 0) for x in input_data])
plt.plot(input_data, output_data_no_r16, label='no r16')
plt.plot(input_data, output_data_yes_r16, label='yes r16')
plt.xlabel('rarity')
plt.ylabel('probability')
plt.title('Rarity Probability')
plt.legend()
# plt.show() # uncomment this line to see rarity comparison
print("--- Rarity probability ---")
print(rarity_probability_at_least(10, False, 0))
print(rarity_probability_at_least(25, False, 0))
print(rarity_probability_at_least(50, False, 0))
print(rarity_probability_at_least(75, False, 0))
print(rarity_probability_at_least(10, True, 0))
print(rarity_probability_at_least(25, True, 0))
print(rarity_probability_at_least(50, True, 0))
print(rarity_probability_at_least(75, True, 0))
print("- Exact")
print(rarity_probability_exact(10, False, 0))
print(rarity_probability_exact(25, False, 0))
print(rarity_probability_exact(50, False, 0))
print(rarity_probability_exact(75, False, 0))
print(rarity_probability_exact(10, True, 0))
print(rarity_probability_exact(25, True, 0))
print(rarity_probability_exact(50, True, 0))
print(rarity_probability_exact(75, True, 0))
print("--- At-least effect probability ---")
print(effect_probability_at_least(1, 100, 50, False, False))
print(effect_probability_at_least(2, 100, 50, False, False))
print(effect_probability_at_least(3, 100, 50, False, False))
print(effect_probability_at_least(1, 100, 50, True, False))
print(effect_probability_at_least(2, 100, 50, True, False))
print(effect_probability_at_least(3, 100, 50, True, False))
print(effect_probability_at_least(1, 3700, 100, False, False))
print(effect_probability_at_least(2, 3700, 100, False, False))
print(effect_probability_at_least(3, 3700, 100, False, False))
print(effect_probability_at_least(4, 3700, 100, False, False))
print(effect_probability_at_least(1, 3700, 100, True, False))
print(effect_probability_at_least(2, 3700, 100, True, False))
print(effect_probability_at_least(3, 3700, 100, True, False))
print(effect_probability_at_least(4, 3700, 100, True, False))
print(effect_probability_at_least(5, 3700, 100, True, False))
print(effect_probability_at_least(5, 3700, 100, True, True))
print("--- Exact effect probability ---")
print(effect_probability_exact(1, 100, 50, False, False))
print(effect_probability_exact(2, 100, 50, False, False))
print(effect_probability_exact(3, 100, 50, False, False))
print(effect_probability_exact(1, 100, 50, True, False))
print(effect_probability_exact(2, 100, 50, True, False))
print(effect_probability_exact(3, 100, 50, True, False))
print(effect_probability_exact(1, 3700, 100, False, False))
print(effect_probability_exact(2, 3700, 100, False, False))
print(effect_probability_exact(3, 3700, 100, False, False))
print(effect_probability_exact(4, 3700, 100, False, False))
print(effect_probability_exact(1, 3700, 100, True, False))
print(effect_probability_exact(2, 3700, 100, True, False))
print(effect_probability_exact(3, 3700, 100, True, False))
print(effect_probability_exact(4, 3700, 100, True, False))
print(effect_probability_exact(5, 3700, 100, True, False))
print(effect_probability_exact(5, 3700, 100, True, True))
print("--- Global effect probabilities ---")
print(global_effect_probability_at_least(3, 3700, 0, True, True, 0, False))
print(global_effect_probability_exact(3, 3700, 0, True, True, 0, False))
