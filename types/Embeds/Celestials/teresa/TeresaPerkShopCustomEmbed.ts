import { AttachmentBuilder, bold, type CommandInteraction, type EmbedBuilder, type EmbedField } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "../../CustomEmbed";
import { quantify } from "@/utils/utils_commands";
import teresa from "@/utils/game_data/celestials/teresa";

interface TeresaPerkShopCustomEmbedProps {
  interaction: CommandInteraction;
}

export class TeresaPerkShopCustomEmbed extends CustomEmbed {
  constructor({ interaction }: TeresaPerkShopCustomEmbedProps) {
    super({ interaction });
  }

  public create(): EmbedBuilder {
    this.setTitle(`Teresa's Perk Shop`).setColour(Colours.Teresa);

    this.setFields(this.getFields());

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder("images/celestials/teresa.png");
    this.embed.setThumbnail("attachment://teresa.png");
    return image;
  }

  protected getFields(): Array<EmbedField> {
    return teresa.shop.map(upgrade => ({
      name: upgrade.name,
      value: `${upgrade.description}\n${bold("Cost:")} ${quantify("Perk Point", upgrade.cost)}${upgrade.increment ? `, increasing by a factor of ${upgrade.increment} per purchase` : ""}\n${bold("Cap:")} ${upgrade.cap}`,
      inline: false
    }));
  }
}
