import {
  AttachmentBuilder,
  type ColorResolvable,
  type CommandInteraction,
  type EmbedBuilder,
  type EmbedField
} from "discord.js";
import type { BaseUpgrade } from "@/types/game_data/upgrades/BaseUpgrade";
import { capitalise } from "@/utils/utils_formatting";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "../CustomEmbed";
import { NotImplementedError } from "@/types/NotImplementedError";

interface BaseUpgradeCustomEmbedProps {
  interaction: CommandInteraction;
  upgrade: BaseUpgrade;
  colour?: ColorResolvable;
}

export class BaseUpgradeCustomEmbed extends CustomEmbed {
  upgrade: BaseUpgrade;
  colour: ColorResolvable;

  constructor({ interaction, upgrade, colour }: BaseUpgradeCustomEmbedProps) {
    super({ interaction });
    this.upgrade = upgrade;
    this.colour = colour ?? Colours[capitalise(this.upgrade.type) as keyof typeof Colours];
  }

  public create(): EmbedBuilder {
    this.setTitle(this.upgrade.name).setColour(this.colour);

    this.setFields(this.getFields());

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder(`images/upgrades/${this.upgrade.type}.png`);
    this.embed.setThumbnail(`attachment://${this.upgrade.type}.png`);
    return image;
  }

  protected getFields(): Array<EmbedField> {
    throw new NotImplementedError();
  }
}
