import { DoublyLinkedList } from "@/types/DoublyLinkedList";
import SecretAchievement from "./SecretAchievement";
import { SecretAchievementType } from "@/types/game_data/SecretAchievements";
import { inlineCode } from "discord.js";

// TODO: finish secret achievement data entry
export const secretAchievements: Record<string, SecretAchievement> = {
  // Naming scheme here:
  // bXX = secret achievement exists (in some way, shape, or form) on both web and mobile
  // (unlock might be different (e.g. s13))
  // wXX = secret achievement is exclusive to web
  // mXX = secret achievement is excusive to mobile
  "b11": new SecretAchievement({
    id: 11,
    name: "The first one's always free",
    description: "Click on this Achievement.",
    unlock: "Click on this Achievement.",
    type: SecretAchievementType.Both
  }),
  "w12": new SecretAchievement({
    id: 12,
    name: "Just in case",
    description: "Save 100 times without refreshing.",
    unlock: "Save 100 times, manually, without refreshing",
    type: SecretAchievementType.Web
  }),
  "m12": new SecretAchievement({
    id: 12,
    name: "The second one isn't so free.",
    description: "Click on this achievement 100 times.",
    unlock: "Click on this achievement 100 times.",
    type: SecretAchievementType.Mobile
  }),
  "b13": new SecretAchievement({
    id: 13,
    name: "It pays to have respect",
    description: "Pay respects.",
    unlock: "On web, press `F`. On mobile, import `F`.",
    type: SecretAchievementType.Both
  }),
  "w45": new SecretAchievement({
    id: 45,
    name: "This dragging is dragging on",
    description: "Drag around the Perks for a minute.",
    unlock: "Hold any Perk node and movew them around for at least a minute without letting go.",
    type: SecretAchievementType.Web
  }),
  "m45": new SecretAchievement({
    id: 45,
    name: "Accelerated Destruction",
    description: "Wipe out the Credits from existence. You can now skip the Credits.",
    unlock: "During the ending sequence, go to Options > Save & Load > Reset save and enter the confirmation. Do not reset.",
    type: SecretAchievementType.Mobile
  }),
  "b47": new SecretAchievement({
    id: 47,
    name: "ALT+",
    description: "Hide every possible tab.",
    unlock: `(Web) In Options > Visual > Modify Visible Tabs, hide everything possible. \n (Mobile) In Options > UI > Hide tabs, hide everything possible.`,
    type: SecretAchievementType.Both
  }),
  "b48": new SecretAchievement({
    id: 48,
    name: "Stack overflow",
    description: `(Web) Have more Automator errors than lines \n (Mobile) Have equal and non-zero amount of Automator errors and comments`,
    unlock: `(Web) Use the script ${inlineCode("if;if{}")} \n (Mobile) Use the script ${inlineCode("a//")}`,
    type: SecretAchievementType.Both
  })
};

export const webSecretAchievementsList: DoublyLinkedList<SecretAchievement> = new DoublyLinkedList<SecretAchievement>();
export const mobileSecretAchievementsList: DoublyLinkedList<SecretAchievement> = new DoublyLinkedList<SecretAchievement>();

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