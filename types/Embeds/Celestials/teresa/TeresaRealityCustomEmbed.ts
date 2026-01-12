import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder, type EmbedField } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "../../CustomEmbed";
import teresa from "@/utils/game_data/celestials/teresa";

interface TeresaRealityCustomEmbedProps {
  interaction: CommandInteraction;
}

export class TeresaRealityCustomEmbed extends CustomEmbed {
  constructor({ interaction }: TeresaRealityCustomEmbedProps) {
    super({ interaction });
  }

  public create(): EmbedBuilder {
    this.setTitle("Teresa's Reality").setColour(Colours.Teresa);

    this.setFields(this.getFields());

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder("images/celestials/teresa.png");
    this.embed.setThumbnail("attachment://teresa.png");
    return image;
  }

  protected getFields(): Array<EmbedField> {
    return [
      {
        name: "Challenge",
        value: teresa.reality.challenge,
        inline: false
      },
      {
        name: "Reward for completion",
        value: teresa.reality.reward,
        inline: false
      },
      {
        name: "Teresa's Reality Machine Container",
        value: `${teresa.mechanic.reward} with formula ${teresa.mechanic.formula}`,
        inline: false
      }
    ];
  }
}
