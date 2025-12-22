import { ImaginaryUpgrade } from "@/types/game_data/upgrades/ImaginaryUpgrade";

interface IImaginaryUpgrades {
  [key: string]: ImaginaryUpgrade
}

export const ImaginaryUpgrades: IImaginaryUpgrades = {
  "temporalIntensifier": new ImaginaryUpgrade({
    id: 11,
    name: "Temporal Intensifier",
    effect: "Increase Temporal Amplifier multiplier by +0.15",
    cost: 3,
    increment: 60,
  }),
  "omnipresentObliteration": new ImaginaryUpgrade({
    id: 55,
    name: "Omnipresent Obliteration",
    effect: "Unlock Pelle, Celestial of Antimatter",
    cost: 1.6e15,
    requirement: "Reach Reality in Lai'tela's Reality with all Dimensions disabled and at least 4 empty glyph slots.",
    strategy: `Hint: ||no way to get around the Glyphs equipped this time. What Glyph has given you progress in Lai'tela this whole time? Worst case, try experimenting a bit.||
Solution: ||d, you'll need to wait for e4k EP (game speed increases as time goes by)||`
  })
};