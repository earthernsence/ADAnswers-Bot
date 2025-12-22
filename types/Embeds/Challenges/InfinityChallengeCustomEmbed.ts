import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "../CustomEmbed";
import type { InfinityChallenge } from "../../game_data/challenges/InfinityChallenges";

interface InfinityChallengeCustomEmbedProps {
  interaction: CommandInteraction,
  challenge: InfinityChallenge,
  strategyOnly?: boolean
}

export class InfinityChallengeCustomEmbed extends CustomEmbed {
  challenge: InfinityChallenge;
  strategyOnly: boolean;

  constructor({ interaction, challenge, strategyOnly }: InfinityChallengeCustomEmbedProps) {
    super({ interaction });
    this.challenge = challenge;
    this.strategyOnly = strategyOnly ?? true;
  }

  // For the shorthands /c9, /ic4, and /ic5, we don't really care about the other things --
  // generally, when people use those commands, they want the strategy. Obviously, /challenge
  // would show everything if that's what the user requested.
  public create(): EmbedBuilder {
    this.setTitle(`Infinity Challenge ${this.challenge.number}`)
      .setColour(Colours.Infinity);

    if (this.strategyOnly) this.setFields([{ name: "Strategy", value: `${this.challenge.strategy}`, inline: false }]);
    else this.setFields([
      { name: "Unlock requirements", value: `${this.challenge.requirements}`, inline: false },
      { name: "Challenge", value: `${this.challenge.challenge}`, inline: false },
      { name: "Goal", value: `${this.challenge.goal}`, inline: false },
      { name: "Strategy", value: `${this.challenge.strategy}`, inline: false },
      { name: "Reward", value: `${this.challenge.reward}`, inline: false },
      { name: "Reward formula", value: `${this.challenge.rewardFormula}`, inline: false }
    ]);

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder(`images/challenges/infinity_challenges/ic${this.challenge.number}.png`);
    this.embed.setThumbnail(`attachment://ic${this.challenge.number}.png`);
    return image;
  }
}