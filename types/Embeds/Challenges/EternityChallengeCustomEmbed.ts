import { AttachmentBuilder, codeBlock, type EmbedBuilder, type RepliableInteraction, time, TimestampStyles } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "../CustomEmbed";
import type EternityChallenge from "@/utils/game_data/challenges/EternityChallenge";

interface EternityChallengeCustomEmbedProps {
  interaction: RepliableInteraction;
  challenge: EternityChallenge;
}

export class EternityChallengeCustomEmbed extends CustomEmbed {
  challenge: EternityChallenge;

  constructor({ interaction, challenge }: EternityChallengeCustomEmbedProps) {
    super({ interaction });
    this.challenge = challenge;
  }

  public override create(): EmbedBuilder {
    this.setTitle(`Eternity Challenge ${this.challenge.shortName}`)
      .setDescription(`Updated ${time(Math.floor(Date.now() / 1000), TimestampStyles.RelativeTime)}`)
      .setColour(Colours.Eternity);

    this.setFields([
      { name: "Unlock requirements", value: this.challenge.formatUnlock(), inline: false },
      { name: "Challenge description", value: this.challenge.description, inline: false },
      { name: "Goal", value: this.challenge.formatGoal(), inline: false },
      { name: "Strategy", value: this.challenge.formatStrategy(), inline: false },
      { name: "Recommended Time Studies", value: codeBlock(this.challenge.formattedTree), inline: false },
      { name: "Reward", value: this.challenge.reward.reward, inline: false },
      { name: "Reward formula", value: this.challenge.reward.formula, inline: false },
      {
        name: "Next recommended Eternity Challenge",
        value: this.challenge.nextRecommendedEternityChallenge,
        inline: false
      }
    ]);

    return this.finalise();
  }

  public override getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder(
      `images/challenges/eternity_challenges/ec${this.challenge.challenge}.png`
    );
    this.embed.setThumbnail(`attachment://ec${this.challenge.challenge}.png`);
    return image;
  }
}