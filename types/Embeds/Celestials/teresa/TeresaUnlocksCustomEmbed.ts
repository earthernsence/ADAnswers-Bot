import { AttachmentBuilder, type ChatInputCommandInteraction, type EmbedBuilder, type EmbedField } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "../../CustomEmbed";
import { format } from "@/utils/utils_formatting";
import teresa from "@/utils/game_data/celestials/teresa";

interface TeresaUnlocksCustomEmbedProps {
  interaction: ChatInputCommandInteraction;
}

export class TeresaUnlocksCustomEmbed extends CustomEmbed {
  constructor({ interaction }: TeresaUnlocksCustomEmbedProps) {
    super({ interaction });
  }

  public override create(): EmbedBuilder {
    this.setTitle(`Teresa's Unlocks`).setColour(Colours.Teresa);

    this.setFields(this.getFields());

    return this.finalise();
  }

  public override getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder("images/celestials/teresa.png");
    this.embed.setThumbnail("attachment://teresa.png");
    return image;
  }

  protected getFields(): Array<EmbedField> {
    return teresa.unlocks.map(unlock => ({
      name: `${format(unlock.requirement)} Reality Machines`,
      value: unlock.reward,
      inline: false
    }));
  }
}
