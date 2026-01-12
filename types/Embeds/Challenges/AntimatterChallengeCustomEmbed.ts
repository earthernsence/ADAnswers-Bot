import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder } from "discord.js";
import type { AntimatterChallenge } from "../../game_data/challenges/AntimatterChallenges";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "../CustomEmbed";

interface AntimatterChallengeCustomEmbedProps {
  interaction: CommandInteraction;
  challenge: AntimatterChallenge;
  strategyOnly?: boolean;
}

export class AntimatterChallengeCustomEmbed extends CustomEmbed {
  challenge: AntimatterChallenge;
  strategyOnly: boolean;

  constructor({ interaction, challenge, strategyOnly }: AntimatterChallengeCustomEmbedProps) {
    super({ interaction });
    this.challenge = challenge;
    this.strategyOnly = strategyOnly ?? true;
  }

  // For the shorthands /c9, /ic4, and /ic5, we don't really care about the other things --
  // generally, when people use those commands, they want the strategy. Obviously, /challenge
  // would show everything if that's what the user requested.
  public create(strategyOnly = false): EmbedBuilder {
    this.setTitle(`Challenge ${this.challenge.number}`).setColour(Colours.Antimatter);

    if (strategyOnly) this.setFields([{ name: "Strategy", value: `${this.challenge.strategy}`, inline: false }]);
    else
      this.setFields([
        { name: "Unlock requirements", value: `${this.challenge.requirements}`, inline: false },
        { name: "Challenge", value: `${this.challenge.challenge}`, inline: false },
        { name: "Goal", value: `${this.challenge.goal}`, inline: false },
        { name: "Strategy", value: `${this.challenge.strategy}`, inline: false },
        { name: "Reward", value: `${this.challenge.reward}`, inline: false }
      ]);

    return this.finalise();
  }

  // We need to send the image with the reply, so set it here but also return it back.
  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder(
      `images/challenges/antimatter_challenges/c${this.challenge.number}.png`
    );
    this.embed.setThumbnail(`attachment://c${this.challenge.number}.png`);
    return image;
  }
}
