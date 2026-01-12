import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder, type EmbedField } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "../../CustomEmbed";
import { formatDecimal } from "@/utils/utils_formatting";
import { pluralise } from "@/utils/utils_commands";
import v from "@/utils/game_data/celestials/v";

interface VUnlocksCustomEmbedProps {
  interaction: CommandInteraction;
}

export class VUnlocksCustomEmbed extends CustomEmbed {
  constructor({ interaction }: VUnlocksCustomEmbedProps) {
    super({ interaction });
  }

  public create(): EmbedBuilder {
    this.setTitle(`V's Unlocks`).setColour(Colours.V);

    this.setFields(this.getFields());

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder("images/celestials/v.png");
    this.embed.setThumbnail("attachment://v.png");
    return image;
  }

  protected getFields(): Array<EmbedField> {
    return v.unlocks.map(unlock => ({
      name: `${formatDecimal(unlock.requirement)} ${pluralise("V-Achievement", unlock.requirement)}`,
      value: `${unlock.reward}${unlock.formula ? `\nFormula: ${unlock.formula}` : ""}`,
      inline: false
    }));
  }
}
