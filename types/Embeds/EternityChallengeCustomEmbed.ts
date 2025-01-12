import { AttachmentBuilder, type CommandInteraction, TimestampStyles, inlineCode, time } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "./CustomEmbed";
import type { EmbedBuilder } from "@discordjs/builders";
import type EternityChallenge from "@/utils/game_data/challenges/EternityChallenge";

interface EternityChallengeCustomEmbedProps {
  interaction: CommandInteraction,
  challenge: EternityChallenge,
  expirationTimestamp: number,
}

export class EternityChallengeCustomEmbed extends CustomEmbed {
  challenge: EternityChallenge;
  expirationTimestamp: number;

  constructor({ interaction, challenge, expirationTimestamp }: EternityChallengeCustomEmbedProps) {
    super({ interaction });
    this.challenge = challenge;
    this.expirationTimestamp = expirationTimestamp;
  }

  public create(): EmbedBuilder {
    // TODO: figure out why this doesn't change at the end
    const shouldBeDisabled: boolean = Math.floor((Date.now() + 60000) / 1000) <= this.expirationTimestamp;

    this.setTitle(`Eternity Challenge ${this.challenge.shortName}`)
      .setDescription(`Expire${shouldBeDisabled ? "d" : "s"} ${time(this.expirationTimestamp, TimestampStyles.RelativeTime)} on ${time(this.expirationTimestamp, TimestampStyles.LongDateTime)}`)
      .setColour(Colours.Eternity);

    this.setFields([
      { name: "Unlock requirements", value: this.challenge.formatUnlock(), inline: false },
      { name: "Challenge description", value: this.challenge.description, inline: false, },
      { name: "Goal", value: this.challenge.formatGoal(), inline: false },
      { name: "Strategy", value: this.challenge.formatStrategy(), inline: false },
      { name: "Recommended Time Studies", value: inlineCode(this.challenge.tree), inline: false },
      { name: "Reward", value: this.challenge.reward.reward, inline: false },
      { name: "Reward formula", value: this.challenge.reward.formula, inline: false },
      { name: "Next recommended Eternity Challenge", value: this.challenge.nextRecommendedEternityChallenge, inline: false }
    ]);

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder(`images/challenges/eternity_challenges/ec${this.challenge.challenge}.png`);
    this.embed.setThumbnail(`attachment://ec${this.challenge.challenge}.png`);
    return image;
  }
}