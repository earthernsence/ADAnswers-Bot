import { DoublyLinkedList } from "@/types/DoublyLinkedList";
import { enumerate } from "../utils_formatting";
import { inlineCode } from "discord.js";
import SecretAchievement from "./SecretAchievement";
import { SecretAchievementType } from "@/types/game_data/SecretAchievements";

export const secretAchievements: Record<string, SecretAchievement> = {
  // Naming scheme here:
  // bXX = secret achievement exists (in some way, shape, or form) on both web and mobile
  // (unlock might be different (e.g. s13))
  // wXX = secret achievement is exclusive to web
  // mXX = secret achievement is excusive to mobile
  b11: new SecretAchievement({
    id: 11,
    name: "The first one's always free",
    description: "Click on this Achievement.",
    unlock: "Click on this Achievement.",
    type: SecretAchievementType.Both
  }),
  w12: new SecretAchievement({
    id: 12,
    name: "Just in case",
    description: "Save 100 times without refreshing.",
    unlock: "Save 100 times, manually, without refreshing",
    type: SecretAchievementType.Web
  }),
  m12: new SecretAchievement({
    id: 12,
    name: "The second one isn't so free.",
    description: "Click on this achievement 100 times.",
    unlock: "Click on this achievement 100 times.",
    type: SecretAchievementType.Mobile
  }),
  b13: new SecretAchievement({
    id: 13,
    name: "It pays to have respect",
    description: "Pay respects.",
    unlock: "On web, press `F`. On mobile, import `F`.",
    type: SecretAchievementType.Both
  }),
  b14: new SecretAchievement({
    id: 14,
    name: "So do I",
    description: "Say something naughty.",
    unlock: `Import ${inlineCode("ieatass")} as a savefile.`,
    type: SecretAchievementType.Both
  }),
  b15: new SecretAchievement({
    id: 15,
    name: "Do a barrel roll!",
    description: "Do a barrel roll.",
    unlock: `Import ${inlineCode("doabarrelroll")} as a savefile.`,
    type: SecretAchievementType.Both
  }),
  b16: new SecretAchievement({
    id: 16,
    name: "Do you enjoy pain?",
    description: `Use a "painful" notation for 10 real-time minutes after doing an Eternity.`,
    unlock: `After you have Eternitied at least once, use one of the following notations for 10 real-time minutes:
(Web) Standard, Emoji, Brackets, Roman, Dots, Zalgo, Hex, Imperial, Clock, Prime, Bar, Shi, Blind, Blobs, ALL
(Mobile) The above notations, as well as True Blind, Flag, Greek, Omega, Random, YesNo`,
    type: SecretAchievementType.Both
  }),
  w17: new SecretAchievement({
    id: 17,
    name: "30 Lives",
    description: "Input the Konami code.",
    unlock: `On your keyboard, press the following keys in order, with no other keypresses: up, up, down down, left, right, left, right, B, A. If under 30 antimatter, your antimatter will be set to 30.`,
    type: SecretAchievementType.Web
  }),
  m17: new SecretAchievement({
    id: 17,
    name: "Shaken, not stirred",
    description: "Shake the phone.",
    unlock: "Shake the phone.",
    type: SecretAchievementType.Mobile
  }),
  b18: new SecretAchievement({
    id: 18,
    name: "Do you feel lucky? Well do ya punk?",
    description: "You have a 1/100,000 chance of getting this achievement every second.",
    unlock: "Can only be triggered during online time.",
    type: SecretAchievementType.Both
  }),
  b21: new SecretAchievement({
    id: 21,
    name: "Go study in real life instead.",
    description: "Purchase the secret Time Study.",
    unlock:
      "The secret Time Study is where Time Study 10 would be (i.e. to the left of TS11). Click in that area, and it will appear.",
    type: SecretAchievementType.Both
  }),
  b22: new SecretAchievement({
    id: 22,
    name: "Deep fried",
    description: "Buy 100,000 Antimatter Galaxies in total while using Emoji notation.",
    unlock:
      "Using Emoji notation, set your Big Crunch autobuyer to a small time value (like 1 second), and wait for a good while. Easier with more progress.",
    type: SecretAchievementType.Both
  }),
  w23: new SecretAchievement({
    id: 23,
    name: "Stop right there criminal scum!",
    description: "Open the console.",
    unlock: "One of F12, Ctrl+Shift+C or +I or +J, will trigger the unlock.",
    type: SecretAchievementType.Web
  }),
  m23: new SecretAchievement({
    id: 23,
    name: "Professional landscaper",
    description: "Play in landscape mode for 10 real-time minutes",
    unlock: "You can change the orientation in Options.",
    type: SecretAchievementType.Mobile
  }),
  b24: new SecretAchievement({
    id: 24,
    name: "Real news",
    description: "Click on a news ticker message that does something when you click on it.",
    unlock: `There are several interactable news tickers. Any of them will work. You can visit a list of news tickers by using ${inlineCode("/news")}.`,
    type: SecretAchievementType.Both
  }),
  b25: new SecretAchievement({
    id: 25,
    name: "Shhh...It's a secret",
    description: "Discover a secret theme.",
    unlock: `Import any of the following to unlock a secret theme (on web): \
${enumerate(
  [
    "design",
    "christmas",
    "finnish",
    "confused",
    "nicolas",
    "galactic",
    "work",
    "bliss",
    "blind",
    "stellar",
    "aero",
    "blob"
  ].map(theme => inlineCode(theme)),
  "disjunction"
)}.\
Note that secret themes do not exist on the mobile verison of the game.`,
    type: SecretAchievementType.Both
  }),
  b26: new SecretAchievement({
    id: 26,
    name: "You're a failure",
    description: "Fail Eternity Challenges 10 times without refreshing. What are you doing with your life...",
    unlock: "Using either EC4 or EC12, fail 10 times in a row.",
    type: SecretAchievementType.Both
  }),
  b27: new SecretAchievement({
    id: 27,
    name: "It's not calsled matter dimensions is it?",
    description: "Get Infinite matter.",
    unlock: "Using C11 or IC6, reach 1.8e308 matter.",
    type: SecretAchievementType.Both
  }),
  b28: new SecretAchievement({
    id: 28,
    name: "Nice.",
    description: "Don't act like you don't know what you did.",
    unlock: `In any Autobuyer text box, input ${inlineCode("69")}.`,
    type: SecretAchievementType.Both
  }),
  b31: new SecretAchievement({
    id: 31,
    name: "You should download some more RAM",
    description: "Set your update rate to 200ms",
    unlock: "In Options, set your visual update rate to 200ms.",
    type: SecretAchievementType.Both
  }),
  b32: new SecretAchievement({
    id: 32,
    name: "Less than or equal to 0.001",
    description: "Get a fastest Infinity or Eternity time of less than or equal to 0.001 seconds.",
    unlock: "Most easily done in EC12 and repeatedly Big Crunching.",
    type: SecretAchievementType.Both
  }),
  b33: new SecretAchievement({
    id: 33,
    name: "A sound financial decision",
    description: "Click on the button to purchase STD coins.",
    unlock: "Click on the button to purchase STD coins in the Shop tab.",
    type: SecretAchievementType.Both
  }),
  b34: new SecretAchievement({
    id: 34,
    name: "You do know how these work, right?",
    description: "Respec with an empty Time Study tree.",
    unlock: "Respec with an empty Time Study tree.",
    type: SecretAchievementType.Both
  }),
  b35: new SecretAchievement({
    id: 35,
    name: "Should we tell them about buy max...",
    description: "Buy single Tickspeed upgrades 100,000 times.",
    unlock:
      "Most easily done with the Tickspeed autobuyer set to Singles. Easier with more progress, but will take >1h",
    type: SecretAchievementType.Both
  }),
  b36: new SecretAchievement({
    id: 36,
    name: "While you were away...Nothing happened.",
    description: "See nothing happen while you were away.",
    unlock:
      "Can be done at pretty much any time, but post-Eternity, EC1 will disable TD production and can be easily used for the Achievement.",
    type: SecretAchievementType.Both
  }),
  b37: new SecretAchievement({
    id: 37,
    name: "You followed the instructions",
    description: "Follow instructions.",
    unlock: `Import ${inlineCode("tree")} as a Time Study tree or import ${inlineCode("save")} as a savefile. The text to import is dependent on language on the mobile version.`,
    type: SecretAchievementType.Both
  }),
  w38: new SecretAchievement({
    id: 38,
    name: "Knife's edge",
    description: "Close the Hard Reset modal after typing in the confirmation.",
    unlock: "Close the Hard Reset modal after typing in the confirmation.",
    type: SecretAchievementType.Web
  }),
  m38: new SecretAchievement({
    id: 38,
    name: "Theoretical degree in physics",
    description: "Open and read all pre-Reality pages in the How to Play tab.",
    unlock: "Open and read all pre-Reality pages in the How to Play tab.",
    type: SecretAchievementType.Mobile
  }),
  w41: new SecretAchievement({
    id: 41,
    name: "That dimension doesn't exist",
    description: "Try to purchase the 9th dimension.",
    unlock: "Press 9 on your keyboard.",
    type: SecretAchievementType.Web
  }),
  m41: new SecretAchievement({
    id: 41,
    name: "Sorry, we are not looking for a developer",
    description: "Click on the version number seven times.",
    unlock: "Click on the version number seven times.",
    type: SecretAchievementType.Mobile
  }),
  b42: new SecretAchievement({
    id: 42,
    name: "SHAME ON ME",
    description: "Try to use Eternity Challenge 12 to speed up time.",
    unlock: "Enter EC12 while having an inverted Black Hole inside V's Reality.",
    type: SecretAchievementType.Both
  }),
  b43: new SecretAchievement({
    id: 43,
    name: "A cacophonus chorus",
    description: "Have all equipped Glyphs be Music Glyphs.",
    unlock: "In Teresa's Perk Shop, create Music Glyphs and equip five.",
    type: SecretAchievementType.Both
  }),
  b44: new SecretAchievement({
    id: 44,
    name: "Are you statisfied now?",
    description: "Stare intently at the Statistics tab for 15 real-time minutes.",
    unlock: "Open the Statistics tab for 15 minutes.",
    type: SecretAchievementType.Both
  }),
  w45: new SecretAchievement({
    id: 45,
    name: "This dragging is dragging on",
    description: "Drag around the Perks for a minute.",
    unlock: "Hold any Perk node and movew them around for at least a minute without letting go.",
    type: SecretAchievementType.Web
  }),
  m45: new SecretAchievement({
    id: 45,
    name: "Accelerated Destruction",
    description: "Wipe out the Credits from existence. You can now skip the Credits.",
    unlock:
      "During the ending sequence, go to Options > Save & Load > Reset save and enter the confirmation. Do not reset.",
    type: SecretAchievementType.Mobile
  }),
  b46: new SecretAchievement({
    id: 46,
    name: "For a rainy day",
    description: "Store a day of real time.",
    unlock: "In The Nameless Ones' tab, store a day of real time.",
    type: SecretAchievementType.Both
  }),
  b47: new SecretAchievement({
    id: 47,
    name: "ALT+",
    description: "Hide every possible tab.",
    unlock: `(Web) In Options > Visual > Modify Visible Tabs, hide everything possible. \n (Mobile) In Options > UI > Hide tabs, hide everything possible.`,
    type: SecretAchievementType.Both
  }),
  b48: new SecretAchievement({
    id: 48,
    name: "Stack overflow",
    description: `(Web) Have more Automator errors than lines \n (Mobile) Have equal and non-zero amount of Automator errors and comments`,
    unlock: `(Web) Use the script ${inlineCode("if;if{}")} \n (Mobile) Use the script ${inlineCode("a//")}`,
    type: SecretAchievementType.Both
  })
};

export const webSecretAchievementsList: DoublyLinkedList<SecretAchievement> = new DoublyLinkedList<SecretAchievement>();
export const mobileSecretAchievementsList: DoublyLinkedList<SecretAchievement> =
  new DoublyLinkedList<SecretAchievement>();

for (const achievement of Object.values(secretAchievements)) {
  switch (achievement.type) {
    case SecretAchievementType.Both:
      webSecretAchievementsList.insertAtEnd(achievement);
      mobileSecretAchievementsList.insertAtEnd(achievement);
      break;
    case SecretAchievementType.Mobile:
      mobileSecretAchievementsList.insertAtEnd(achievement);
      break;
    case SecretAchievementType.Web:
      webSecretAchievementsList.insertAtEnd(achievement);
      break;
    default:
      throw new Error(`Unexpected Secret Achievement type ${achievement.type} in DoublyLinkedList creation.`);
  }
}
