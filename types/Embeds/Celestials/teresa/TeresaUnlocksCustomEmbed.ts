import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder, type EmbedField } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "../../CustomEmbed";
import { formatDecimal } from "@/utils/utils_formatting";
import teresa from "@/utils/game_data/celestials/teresa";

interface TeresaUnlocksCustomEmbedProps {
  interaction: CommandInteraction;
}

export class TeresaUnlocksCustomEmbed extends CustomEmbed {
  constructor({ interaction }: TeresaUnlocksCustomEmbedProps) {
    super({ interaction });
  }

  public create(): EmbedBuilder {
    this.setTitle(`Teresa's Unlocks`).setColour(Colours.Teresa);

    this.setFields(this.getFields());

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder("images/celestials/teresa.png");
    this.embed.setThumbnail("attachment://teresa.png");
    return image;
  }

  protected getFields(): Array<EmbedField> {
    return teresa.unlocks.map(unlock => ({
      name: `${formatDecimal(unlock.requirement)} Reality Machines`,
      value: unlock.reward,
      inline: false
    }));
  }
}
