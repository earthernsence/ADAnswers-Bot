import { bold, inlineCode } from "discord.js";
import Achievement from "./Achievement";
import { DoublyLinkedList } from "@/types/DoublyLinkedList";

export const achievements: Record<number, Achievement> = {
  11: new Achievement({
    id: 11,
    fullName: "You gotta start somewhere",
    requirement: "Buy a 1st Antimatter Dimension",
  }),
  12: new Achievement({
    id: 12,
    fullName: "100 antimatter is a lot",
    requirement: "Buy a 2nd Antimatter Dimension.",
  }),
  13: new Achievement({
    id: 13,
    fullName: "Half life 3 CONFIRMED",
    requirement: "Buy a 3rd Antimatter Dimension.",
  }),
  14: new Achievement({
    id: 14,
    fullName: "L4D: Left 4 Dimensions",
    requirement: "Buy a 4th Antimatter Dimension.",
  }),
  15: new Achievement({
    id: 15,
    fullName: "5 Dimension Antimatter Punch",
    requirement: "Buy a 5th Antimatter Dimension.",
  }),
  16: new Achievement({
    id: 16,
    fullName: "We couldn't afford 9",
    requirement: "Buy a 6th Antimatter Dimension.",
  }),
  17: new Achievement({
    id: 17,
    fullName: "Not a luck related achievement",
    requirement: "Buy a 7th Antimatter Dimension.",
  }),
  18: new Achievement({
    id: 18,
    fullName: "90 degrees to infinity",
    requirement: "Buy an 8th Antimatter Dimension.",
  }),
  21: new Achievement({
    id: 21,
    fullName: "To infinity!",
    requirement: "Go Infinite.",
    reward: "Start with 100 antimatter.",
  }),
  22: new Achievement({
    id: 22,
    fullName: "FAKE NEWS!",
    requirement: "Encounter 50 different news messages.",
  }),
  23: new Achievement({
    id: 23,
    fullName: "The 9th Dimension is a lie",
    requirement: "Have exactly 99 8th Antimatter Dimensions.",
    unlockStrategy: "Once you have the 8th Antimatter Dimension autobuyer, set it to \"buy singles\" and wait.",
    reward: "8th Antimatter Dimensions are 10% stronger."
  }),
  24: new Achievement({
    id: 24,
    fullName: "Antimatter Apocalypse",
    requirement: "Get over 1e80 antimatter.",
  }),
  25: new Achievement({
    id: 25,
    fullName: "Boosting to the max",
    requirement: "Buy 10 Dimension Boosts.",
  }),
  26: new Achievement({
    id: 26,
    fullName: "You got past The Big Wall",
    requirement: "Buy an Antimatter Galaxy.",
  }),
  27: new Achievement({
    id: 27,
    fullName: "Double Galaxy",
    requirement: "Buy 2 Antimatter Galaxies.",
  }),
  28: new Achievement({
    id: 28,
    fullName: "There's no point in doing that...",
    requirement: "Buy a single 1st Antimatter Dimension when you have over 1e150 of them.",
    unlockStrategy: "Once you have 1e150 1st Antimatter Dimensions, toggle the 1st Antimatter Dimension autobuyer to \"buy singles\"",
    reward: "1st Antimatter Dimensions are 10% stronger.",
  }),
  31: new Achievement({
    id: 31,
    fullName: "I forgot to nerf that",
    requirement: "Get any Antimatter Dimension multiplier over 1e31",
    reward: "1st Antimatter Dimensions are 5% stronger.",
  }),
  32: new Achievement({
    id: 32,
    fullName: "The Gods are pleased",
    requirement: "Get over ×600 from Dimensional Sacrifice outside of Challenge 8.",
    reward: "Dimensional Sacrifice is stronger",
    rewardFormula: "`AD1 ^ 0.010` -> `AD1 ^ 0.011`"
  }),
  33: new Achievement({
    id: 33,
    fullName: "That's a lot of infinities",
    requirement: "Reach Infinite 10 times.",
  }),
  34: new Achievement({
    id: 34,
    fullName: "You didn't need it anyway",
    requirement: "Infinity without having any 8th Antimatter Dimensions.",
    reward: "Antimatter Dimensions 1-7 are 2% stronger.",
  }),
  35: new Achievement({
    id: 35,
    fullName: "Don't you dare sleep",
    requirement: "Be offline for a period of over 6 hours (real time).",
  }),
  36: new Achievement({
    id: 36,
    fullName: "Claustophobic",
    requirement: "Infinity with just 1 Antimatter Galaxy. (Your Antimatter Galaxies are reset on Infinity.)",
    reward: "Multiply starting tick speed by 1.02",
  }),
  37: new Achievement({
    id: 37,
    fullName: "That's FAST!",
    requirement: "Infinity in under 2 hours.",
    reward: "Start with 5000 antimatter.",
  }),
  38: new Achievement({
    id: 38,
    fullName: "I don't believe in Gods",
    requirement: "Buy an Antimatter Galaxy without Dimensional Sacrificing. (Your Antimatter Galaxies are reset on Infinity.)",
  }),
  41: new Achievement({
    id: 41,
    fullName: "No DLC required",
    requirement: "Buy 16 Infinity Upgrades.",
    reward: "Unlock two new Infinity Upgrades - ×2 IP multipier and offline IP generation.",
  }),
  42: new Achievement({
    id: 42,
    fullName: "Super Sanic",
    requirement: "Have antimatter per second exceed your current antimatter above 1e63.",
  }),
  43: new Achievement({
    id: 43,
    fullName: "How the antitables have turned...",
    requirement: "Get the 8th Antimatter Dimension multiplier to be highest, 7th Antimatter Dimension multiplier second highest, etc.",
    unlockStrategy: `Use the ${inlineCode("/antitables")} command for specific strategy depending on your current game stage.`,
    reward: "Each Antimatter Dimension gains a boost proportional to tier (8th gets 8%, 7th gets 7%, etc.)"
  }),
  44: new Achievement({
    id: 44,
    fullName: "Over in 30 Seconds",
    requirement: "Have antimatter per second exceed your current antimatter for 30 consecutive seconds.",
  }),
  45: new Achievement({
    id: 45,
    fullName: "Faster than a potato",
    requirement: "Get more than 1e29 ticks per second.",
    reward: "Multiply starting tickspeed by ×1.02",
  }),
  46: new Achievement({
    id: 46,
    fullName: "Multidimensional",
    requirement: "Reach 1e12 of all Antimatter Dimensions except the 8th.",
  }),
  47: new Achievement({
    id: 47,
    fullName: "Daredevil",
    requirement: "Complete 3 Normal Challenges.",
  }),
  48: new Achievement({
    id: 48,
    fullName: "Antichallenged",
    requirement: "Complete all 12 Normal Challenges.",
  }),
  51: new Achievement({
    id: 51,
    fullName: "Limit Break",
    requirement: "Break Infinity.",
  }),
  52: new Achievement({
    id: 52,
    fullName: "Age of Automation",
    requirement: "Max the interval for Antimatter Dimension and Tickspeed upgrade autobuyers."
  }),
  53: new Achievement({
    id: 53,
    fullName: "Definitely not worth it",
    requirement: "Max the intervals for all normal autobuyers."
  }),
  54: new Achievement({
    id: 54,
    fullName: "That's FASTER!",
    requirement: "Infinity in 10 minutes or less.",
    reward: "Start with 5e5 antimatter.",
  }),
  55: new Achievement({
    id: 55,
    fullName: "Forever isn't that long",
    requirement: "Infinity in 1 minute or less.",
    reward: "Start with 5e10 antimatter.",
  }),
  56: new Achievement({
    id: 56,
    fullName: "Many Deaths",
    requirement: "Complete the 2nd Antimatter Dimension Autobuyer Challenge in 3 minutes or less.",
    reward: "All Antimatter Dimensions are stronger in the first 3 minutes of Infinities.",
    rewardFormula: "`max(6 / (minutes + 3), 1)`"
  }),
  57: new Achievement({
    id: 57,
    fullName: "Gift from the Gods",
    requirement: "Complete the 8th Antimatter Dimension Autobuyer Challenge in 3 minutes or less.",
    reward: "Dimensional Sacrifice is stronger.",
    rewardFormula: "`AD1 ^ 0.011` -> `AD1 ^ 0.012`"
  }),
  58: new Achievement({
    id: 58,
    fullName: "This is fine.",
    requirement: "Complete the Tickspeed Autobuyer Challenge in 3 minutes or less.",
    reward: "Increase the multiplier for buying 10 Antimatter Dimensions by +1%.",
  }),
  61: new Achievement({
    id: 61,
    fullName: "Bulked Up",
    requirement: "Get all of your Antimatter Dimension Autobuyer bulk amounts to 512.",
    reward: "Dimension Autobuyer bulks are unlimited.",
  }),
  62: new Achievement({
    id: 62,
    fullName: "Oh, hey... You're still here?",
    requirement: "Reach 1e8 Infinity Points per minute.",
  }),
  63: new Achievement({
    id: 63,
    fullName: "A new beginning",
    requirement: "Begin generation of Infinity Power."
  }),
  64: new Achievement({
    id: 64,
    fullName: "Zero Deaths",
    requirement: "Get to Infinity without Dimension Boosts or Antimatter Galaxies while in a Normal Challenge.",
    reward: "Antimatter Dimensions 1-4 are 25% stronger.",
  }),
  65: new Achievement({
    id: 65,
    fullName: "Not-so-challenging",
    requirement: "Get the sum of all of your Normal Challenge times under 3 minutes.",
    reward: "All Antimatter Dimensions are stronger in the first 3 minutes of Infinities, but only in Challenges.",
    rewardFormula: "`max(4 / (minutes + 1), 1)`"
  }),
  66: new Achievement({
    id: 66,
    fullName: "Faster than a squared potato",
    requirement: "Get more than 1e58 ticks per second.",
    reward: "Multiply starting tickspeed by ×1.02",
  }),
  67: new Achievement({
    id: 67,
    fullName: "Infinitely Challenging",
    requirement: "Complete an Infinity Challenge.",
  }),
  68: new Achievement({
    id: 68,
    fullName: "You did this again just for the achievement right?",
    requirement: "Complete the 3rd Antimatter Dimension Autobuyer in 10 seconds or less.",
    reward: "1st Antimatter Dimensions are 50% stronger.",
  }),
  71: new Achievement({
    id: 71,
    fullName: "Error 909: Dimension Not Found",
    requirement: "Get to infinity with only a single 1st Antimatter Dimension without Dimension Boosts or Antimatter Galaxies, while in the 2nd Antimatter DImension Autobuyer Challenge.",
    reward: "1st Antimatter Dimensions are 3 times stronger."
  }),
  72: new Achievement({
    id: 72,
    fullName: "Can't hold all these infinities",
    requirement: "Get all Antimatter Dimension multipliers over ×1.8e308",
    reward: "All Antimatter Dimensions are 10% stronger.",
  }),
  73: new Achievement({
    id: 73,
    fullName: "THIS ACHIEVEMENT DOESN'T EXIST",
    requirement: "Get 9.9999e9999 antimatter.",
    reward: "Antimatter Dimensions gain a multiplier based on current antimatter.",
    rewardFormula: "`antimatter ^ 0.00002 + 1`"
  }),
  74: new Achievement({
    id: 74,
    fullName: "Not a second lost",
    requirement: "Get the sum of all best Normal Challenge times under 5 seconds.",
    reward: "All Antimatter Dimensions are 40% stronger, but only in Challenges.",
  }),
  75: new Achievement({
    id: 75,
    fullName: "NEW DIMENSIONS???",
    requirement: "Unlock the 4th Infinity Dimension.",
    reward: "Your achievement bonus affects Infinity Dimensions.",
  }),
  76: new Achievement({
    id: 76,
    fullName: "One for each dimension",
    requirement: "Play for 8 days.",
    reward: "Extremely small multiplier to Antimatter Dimensions based on time played.",
    rewardFormula: "`max((days / 2) ^ 0.05, 1)`"
  }),
  77: new Achievement({
    id: 77,
    fullName: "1 Million is a lot",
    requirement: "Reach 1e6 Infinity Power."
  }),
  78: new Achievement({
    id: 78,
    fullName: "Blink of an eye",
    requirement: "Infinity in under 250ms.",
    reward: "Start with 5e25 antimatter.",
  }),
  81: new Achievement({
    id: 81,
    fullName: "Game Design Is My Passion",
    requirement: "Beat Infinity Challenge 5 in 15 seconds or less."
  }),
  82: new Achievement({
    id: 82,
    fullName: "Anti-antichallenged",
    requirement: "Complete all 8 Infinity Challenges.",
  }),
  83: new Achievement({
    id: 83,
    fullName: "YOU CAN GET 50 GALAXIES?!?!",
    requirement: "Get 50 Antimatter Galaxies.",
    reward: "Tickspeed is just over 5% faster per Antimatter Galaxy.",
    rewardFormula: "`0.95 ^ galaxies`"
  }),
  84: new Achievement({
    id: 84,
    fullName: "I got a few to spare",
    requirement: "Reach 1e35000 antimatter.",
    reward: "Antimatter Dimensions are stronger the more unspent antimatter you have.",
    rewardFormula: "`antimatter ^ 0.00002 + 1`",
  }),
  85: new Achievement({
    id: 85,
    fullName: "ALL YOUR IP ARE BELONG TO US",
    requirement: "Big Crunch for 1e150 Infinity Points.",
    reward: "Additional ×4 multiplier to Infinity Points.",
  }),
  86: new Achievement({
    id: 86,
    fullName: "Do you even bend time bro?",
    requirement: "Reach ×1000 faster per tickspeed upgrade",
    reward: "All Galaxies are 1% stronger."
  }),
  87: new Achievement({
    id: 87,
    fullName: "2 MILLION INFINITIES",
    requirement: "Infinity 2e6 times.",
    reward: "Infinities longer than 5 seconds long give ×250 more Infinities.",
    unlockStrategy: "Buy Time Study 32, disable the Antimatter Galaxy autobuyer, set Dimension Boost autobuyer to 0s, and Big Crunch autobuyer to 0.1-1s depending on how long it takes to buy Dimension Boosts."
  }),
  88: new Achievement({
    id: 88,
    fullName: "Yet another infinity reference",
    requirement: "Get a ×1.8e308 multiplier in a single Dimensional Sacrifice.",
    reward: "Dimensional Sacrifice is stronger.",
    rewardFormula: "`AD1 ^ 0.012` -> `AD1 ^ 0.013`"
  }),
  91: new Achievement({
    id: 91,
    fullName: "Ludicrous Speed",
    requirement: "Big Crunch for 1e200 Infinity Points in 2 seconds or less.",
    reward: "All Antimatter Dimensions are significantly stronger in the first 5 seconds of Infinities.",
    rewardFormula: "`max((5 - seconds) * 60, 1)`"
  }),
  92: new Achievement({
    id: 92,
    fullName: "I brake for NOBODY!",
    requirement: "Big Crunch for 1e250 Infinity Points in 20 seconds or less.",
    reward: "All Antimatter Dimensions are significantly stronger in the first 60 seconds of Infinities.",
    rewardFormula: "`max((1 - minutes) * 100, 1)`"
  }),
  93: new Achievement({
    id: 93,
    fullName: "MAXIMUM OVERDRIVE",
    requirement: "Big Crunch for 1e300 Infinity Points.",
    reward: "Additional ×4 multiplier to Infinity Points."
  }),
  94: new Achievement({
    id: 94,
    fullName: "4.3333 minutes of Infinity",
    requirement: "Reach 1e260 Infinity Power",
    reward: "Double Infinity Power gain."
  }),
  95: new Achievement({
    id: 95,
    fullName: "Is this safe?",
    requirement: "Gain 1.8e308 Replicanti in 1 hour.",
    reward: "You keep your Replicanti and 1 Replicanti Galaxy on Infinity."
  }),
  96: new Achievement({
    id: 96,
    fullName: "Time is relative",
    requirement: "Go Eternal.",
  }),
  97: new Achievement({
    id: 97,
    fullName: "Like jumping on a lego",
    requirement: "Get the sum of Infinity Challenge times under 6.66 seconds.",
  }),
  98: new Achievement({
    id: 98,
    fullName: "0 degrees from Infinity",
    requirement: "Unlock the 8th Infinity Dimension",
  }),
  101: new Achievement({
    id: 101,
    fullName: "8 nobody got time for that",
    requirement: "Eternity without buying Antimatter Dimensions 1-7."
  }),
  102: new Achievement({
    id: 102,
    fullName: "This mile took an eternity",
    requirement: "Get all Eternity milestones"
  }),
  103: new Achievement({
    id: 103,
    fullName: "Tätä saavutusta ei ole olemassa II",
    requirement: "Reach 9.99999e999 Infinity Points.",
    reward: "Make the Infinity Point formula better.",
    rewardFormula: "`log(x) / 308` -> `log(x) / 307.8`"
  }),
  104: new Achievement({
    id: 104,
    fullName: "That wasn't an eternity",
    requirement: "Eternity in under 30 seconds.",
    reward: "Start Eternities with 5e25 Infinity Points."
  }),
  105: new Achievement({
    id: 105,
    fullName: "Infinite Time",
    requirement: "Have 308 Tickspeed upgrades from Time Dimensions",
    reward: "Time Dimensions gain a multiplier based on tickspeed.",
    rewardFormula: "`tickspeed ^ 0.000005`"
  }),
  106: new Achievement({
    id: 106,
    fullName: "The swarm",
    requirement: "Get 10 Replicanti Galaxies in 15 seconds.",
  }),
  107: new Achievement({
    id: 107,
    fullName: "Do you really need a guide for this?",
    requirement: "Eternity with less than 10 Infinities",
    unlockStrategy: "Respec out of Time Study 32 and Infinity in under 5 seconds to avoid multiplying your Infinity gain. Effortless with Time Study 181."
  }),
  108: new Achievement({
    id: 108,
    fullName: "We COULD afford 9",
    requirement: "Eternity with exactly 9 Replicanti."
  }),
  111: new Achievement({
    id: 111,
    fullName: "Yo dawg, I heard you liked infinities...",
    requirement: "Have all your Infinities in your past 10 Infinitites be at least 1.8e308 times higher Infinity Points than the previous one.",
    reward: "Your antimatter doesn't reset on Dimension Boosts or Antimatter Galaxies.",
  }),
  112: new Achievement({
    id: 112,
    fullName: "Never again",
    requirement: "Get the sum of Infinity Challenge times below 750ms",
  }),
  113: new Achievement({
    id: 113,
    fullName: "Eternities are the new infinity",
    requirement: "Eternity in under 250ms",
    reward: "Gain ×2 more Eternities."
  }),
  114: new Achievement({
    id: 114,
    fullName: "You're a mistake",
    requirement: "Fail an Eternity Challenge",
    reward: "A fading sense of accomplishment.",
    rewardFormula: "Sense of accomplishment (fading)"
  }),
  115: new Achievement({
    id: 115,
    fullName: "I wish I had gotten 7 eternities",
    requirement: "Start an Infinity Challenge inside an Eternity Challenge"
  }),
  116: new Achievement({
    id: 116,
    fullName: "Do I really need to Infinity",
    requirement: "Eternity with only 1 Infinity",
    reward: "Multiplier to Infinity Points based on Infinities",
    rewardFormula: "`Infinities ^ log_10(2) / 4` (affected by Time Study 31)"
  }),
  117: new Achievement({
    id: 117,
    fullName: "Costco sells Dimboosts now!",
    requirement: "Bulk buy 750 Dimension Boosts at once.",
    reward: "The multiplier from Dimension Boosts to Antimatter Dimensions is 1% higher.",
  }),
  118: new Achievement({
    id: 118,
    fullName: "IT'S OVER 9000",
    requirement: "Get a total Dimensional Sacrifice multiplier of 1e9000",
    reward: "Dimensional Sacrifice doesn't reset your Antimatter Dimensions."
  }),
  121: new Achievement({
    id: 121,
    fullName: "Can you get infinite IP?",
    requirement: "Reach 1e30008 Infinity Points.",
  }),
  122: new Achievement({
    id: 122,
    fullName: "You're already dead.",
    requirement: "Eternity without buying Antimatter Dimensions 2-8."
  }),
  123: new Achievement({
    id: 123,
    fullName: "5 more eternities until the update",
    requirement: "Complete 50 unique Eternity Challenge tiers.",
  }),
  124: new Achievement({
    id: 124,
    fullName: "Long lasting relationship",
    requirement: "Have your Infinity Power per second exceed your Infinity Power for 60 consecutive seconds during a single Infinity.",
    unlockStrategy: `${bold("This will likely happen naturally!")} Remember that Infinity Power is the stuff generated by Infinity Dimensions.`
  }),
  125: new Achievement({
    id: 125,
    fullName: "Like feasting on a behind.",
    requirement: "Reach 1e90 Infinity Points without having any Infinities or any 1st Antimatter Dimensions in your current Eternity.",
    reward: "Infinity Point multiplier based on time spent this Infinity",
    rewardFormula: "thisInfinity = `seconds in infinity * 10 + 1`\n effect = `2 ^ log_10(thisInfinity) * min(thisInfinity ^ 0.11, 500)`",
    unlockStrategy: `Only possible after you buy TS181. Using idle, disable AD/ID autobuyers and eternity, enter Challenge 12, and buy a 4th Antimatter Dimension.`
  }),
  126: new Achievement({
    id: 126,
    fullName: "Popular music",
    requirement: "Have 180 times more Replicanti Galaxies than Antimatter Galaxies",
    reward: "Replicanti Galaxies divide your replicanti 1.8e308 instead of resetting them to 1",
    unlockStrategy: "Reach at least 180 maximum Replicanti Galaxies in an Eternity (using active path will help). Then, disable your Antimatter Galaxy autobuyer, Infinity, and buy your Replicanti Galaxies."
  }),
  127: new Achievement({
    id: 127,
    fullName: "But I wanted another prestige layer...",
    requirement: "Reach 1.8e308 Eternity Points."
  }),
  128: new Achievement({
    id: 128,
    fullName: "What do I have to do get rid of you",
    requirement: "Reach 1e22000 Infinity Points without any Time Studies.",
    reward: "Time Dimensions are multiplied by the number of Time Studies you have.",
    rewardFormula: "×`max(study amount, 1)`"
  }),
  131: new Achievement({
    id: 131,
    fullName: "No ethical consumption",
    requirement: "Get 2e9 Banked Infinities",
    reward: "You gain 2x more Infinities and after Eternity, you permanently keep 5% of your Infinities as Banked Infinities (stacks with TS191 to a total of 10%)",
    unlockStrategy: `Set your Big Crunch autobuyer to 5 seconds (due to achievement 87's reward). Done in conjunction with achievement 134.`
  }),
  132: new Achievement({
    id: 132,
    fullName: "Unique snowflakes",
    requirement: "Have 569 Antimatter Galaxies without getting any Replicanti Galaxies in your current Eternity.",
    reward: "Gain a multiplier to Tachyon Particle and Dilated Time gain based on Antimatter Galaxies.",
    rewardFormula: "×`max(galaxies ^ 0.04, 1)`"
  }),
  133: new Achievement({
    id: 133,
    fullName: "I never liked this infinity stuff anyways",
    requirement: "Reach 1e200,000 Infinity Points without buying any Infinity Dimensions or the ×2 Infinity Point multiplier",
    reward: "You start Eternities with all Infinity Challenges unlocked and completed.",
    rewardFormula: "Due to Eternity Mileston 7, ICs are automatically beaten when they are unlocked. This achievement reward grants Infinity Challenges without having to reach a certain amount of Antimatter to unlock them."
  }),
  134: new Achievement({
    id: 134,
    fullName: "When will it be enough?",
    requirement: "Reach 1e18,000 Replicanti",
    reward: "You gain Replicanti 2 times faster under 1.8e308 Replicanti.",
    unlockStrategy: "Disable the Replicanti Galaxy autobuyer while grinding Banked Infinities (achievement 131)."
  }),
  135: new Achievement({
    id: 135,
    fullName: "Faster than a potato^286078",
    requirement: "Get more than 1e8,296,262 ticks per second.",
  }),
  136: new Achievement({
    id: 136,
    fullName: "I told you already, time is relative",
    requirement: "Dilate time."
  }),
  137: new Achievement({
    id: 137,
    fullName: "Now you're thinking with dilation!",
    requirement: "Get 1e260,000 antimatter in 1 minute or less while Dilated.",
    reward: "Gain ×2 Dilated Time and Time Theorems while Dilated."
  }),
  138: new Achievement({
    id: 138,
    fullName: "This is what I have to do to get rid of you.",
    requirement: "Reach 1e26,000 Infinity Points without any Time Studies while Dilated.",
    reward: "Removes the downsides from Time Study 131 (disabling Replicanti Galaxy autobuyer) and Time Study 133 (10x slower Replicanti) in the Active and Idle Time Study paths.",
  }),
  181: new Achievement({
    id: 181,
    fullName: "Antimatter Dimensions Eternal",
    requirement: "Doom your Reality.",
  })
};

export const achievementsList: DoublyLinkedList<Achievement> = new DoublyLinkedList<Achievement>();

for (const achievement of Object.values(achievements)) {
  achievementsList.insertAtEnd(achievement);
}