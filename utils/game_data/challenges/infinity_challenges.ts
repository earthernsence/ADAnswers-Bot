import Decimal from "break_infinity.js";

import type { InfinityChallenges } from "@/types/game_data/challenges/InfinityChallenges";

const icBase = (ic: number, ip: number) => `Attempt IC${ic} at ~e${ip} IP. No special strat for this challenge.`;

export const infinityChallenges: InfinityChallenges = {
  ic1: {
    number: 1,
    requirements: new Decimal("1e2000"),
    challenge: `All Normal Challenges, with the exception of Tickspeed (C9) and Big Crunch (C11) Challenges, are active at the same time.`,
    goal: new Decimal("1e650"),
    strategy: `As the reward of IC1 is not that good, it's recommended to do it once you have the galaxy upgrade for 5e11 IP. No special strat for this challenge.`,
    reward: `×1.3 on all Infinity Dimensions for each Infinity Challenge completed`,
    rewardFormula: `\`1.3 ^ ICs completed\` (to a max of ×8.2)`
  },
  ic2: {
    number: 2,
    requirements: new Decimal("1e11000"),
    challenge: `Automatically Dimensional Sacrifice every 400 milliseconds once you have an 8th Antimatter Dimension.`,
    goal: new Decimal("1e10500"),
    strategy: `Do not attempt IC2 before you reached ID4 at ~e45 IP. If you cannot get e10500 AM in a normal infinity, why would you try to reach it inside a challenge? No special strat for this challenge.`,
    reward: `Dimensional Sacrifice autobuyer and stronger Dimensional Sacrifice`,
    rewardFormula: `
Change the base of the Sacrifice formula from \`(log_10(AD1) / 10)\` to \`AD1\`.
For Achievements 32 / 57 / 88:
- Post-IC2 (base formula: AD1 ^ 0.008): Add 0.001 to exponent`
  },
  ic3: {
    number: 3,
    requirements: new Decimal("1e12000"),
    challenge: `Tickspeed upgrades are always ×1. For every Tickspeed upgrade purchase, you instead get a static multiplier on all Antimatter Dimensions which increases based on Antimatter Galaxies.`,
    goal: new Decimal("1e5000"),
    strategy: `Attempt IC3 after getting the ID1 for e56 IP. This might take an hour to do. No special strat for this challenge.`,
    reward: `Antimatter Dimension multiplier based on Antimatter Galaxies and Tickspeed purchases`,
    rewardFormula: `\`(1.05 + (galaxies * 0.005)) ^ tickspeed upgrade bought\``
  },
  ic4: {
    number: 4,
    requirements: new Decimal("1e14000"),
    challenge: `Only the latest bought Antimatter Dimension's production is normal, all other Antimatter Dimensions produce less (^0.25).`,
    goal: new Decimal("1e13000"),
    strategy: `
You can attempt IC4 at e68+ IP.

**Before challenge:**
- in the Dimboost autobuyer set "Activates every X seconds" to 0 and enable "Only Dimboost to unlock new Dimensions until X Galaxies" at 100
- in the Galaxy autobuyer disable "Limit Antimatter Galaxies to"
- disable Sacrifice autobuyer and AD autobuyers 1-7
- keep AD8, Tickspeed, Dimboost, and Galaxy autobuyers enabled

**In challenge:**
- hold M/Max + D until you get stuck
- press "Perform a Dimension Boost reset" button at the bottom of the AD tab
- press (not hold) M/Max one or two times
- repeatedly buy ADs 7 to 1 until you reach the next Galaxy (on web: press keys 7,6,5,4,3,2,1; on mobile: press the AD buttons)
- repeat

**After challenge:**
- enable Sacrifice autobuyer and AD autobuyers 1-7
- in the Dimboost autobuyer disable "Only Dimboost to unlock new Dimensions until X Galaxies" and set "Activates every X seconds" either to 0 or 0.3

PC guide: <https://youtu.be/R9v49lCAUk4>
Mobile guide: <https://youtu.be/lI70hBlpaqc>`,
    reward: `All Antimatter Dimension multipliers become multiplier^1.05`,
    rewardFormula: `\`multiplier ^ 1.05\``
  },
  ic5: {
    number: 5,
    requirements: new Decimal("1e18000"),
    challenge: `Buying Antimatter Dimensions 1-4 causes all smaller Antimatter Dimension costs to increase, and buying Antimatter Dimensions 5-8 causes all larger Antimatter Dimension costs to increase.`,
    goal: new Decimal("1e16500"),
    // eslint-disable-next-line @stylistic/max-len
    strategy: `Set Antimatter Dimension autobuyers 1-7 to "Buy Singles". Leave 8th dimension autobuyer enabled with "Buys until 10". Then just wait. All other autobuyers should remain on & purchasing (ie make sure you are still buying galaxies/dimboosts!)`,
    reward: `All Galaxies are 10% stronger and reduce the requirements for them and Dimension Boosts by 1`,
    rewardFormula: `Think really hard`
  },
  ic6: {
    number: 6,
    requirements: new Decimal("1e22500"),
    challenge: `Once you have at least 1 2nd Antimatter Dimension, exponentially rising matter divides the multiplier on all of your Antimatter Dimensions.`,
    goal: new Decimal("2e22222"),
    strategy: icBase(6, 102),
    reward: `Infinity Dimension multiplier based on tickspeed`,
    rewardFormula: `\`Tickspeed per second ^ 0.0005\``
  },
  ic7: {
    number: 7,
    requirements: new Decimal("1e23000"),
    challenge: `You can't get Antimatter Galaxies, but Dimension Boost multiplier ×2.5 ➜ ×10`,
    goal: new Decimal("1e10000"),
    strategy: icBase(7, 114),
    reward: `Dimension Boost multiplier ×2.5 ➜ ×4`,
    rewardFormula: `\`×2.5\` to \`×4\``
  },
  ic8: {
    number: 8,
    requirements: new Decimal("1e28000"),
    challenge: `Your production is at 100% after purchasing anything, after that it rapidly drops down.`,
    goal: new Decimal("1e27000"),
    strategy: icBase(8, 129),
    reward: `You get a multiplier to Antimatter Dimensions 2-7 based on 1st and 8th Antimatter Dimension multipliers.`,
    rewardFormula: `\`(AD1 multiplier * AD8 multiplier) ^ 0.02\``
  }
};
