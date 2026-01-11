import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder, type EmbedField } from "discord.js";
import { capitalise } from "@/utils/utils_formatting";
import { Channels } from "@/utils/utils_channels";
import { CustomEmbed } from "../CustomEmbed";
import type { Glyph } from "@/utils/game_data/glyphs/Glyph";

interface GlyphSacrificeCustomEmbedProps {
  interaction: CommandInteraction,
  glyph: Glyph
}

export class GlyphSacrificeCustomEmbed extends CustomEmbed {
  glyph: Glyph;

  constructor({ interaction, glyph }: GlyphSacrificeCustomEmbedProps) {
    super({ interaction });
    this.glyph = glyph;
  }

  public create(): EmbedBuilder {
    this.setTitle(this.glyph.stylisedName(this.interaction.guildId === Channels.AntimatterDimensionsServer))
      .setColour(this.glyph.colour);

    this.setFields(this.getFields());

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    if (this.glyph.sacrifice) {
      const image: AttachmentBuilder = new AttachmentBuilder(`images/glyphs/sacrificed/${this.glyph.name}.png`);
      this.embed.setThumbnail(`attachment://${this.glyph.name}.png`);
      return image;
    }

    const image: AttachmentBuilder = new AttachmentBuilder(`images/glyphs/${this.glyph.name}.png`);
    this.embed.setThumbnail(`attachment://${this.glyph.name}.png`);
    return image;
  }

  protected getFields(): Array<EmbedField> {
    if (this.glyph.sacrifice) {
      return [
        {
          name: `${capitalise(this.glyph.name)} Sacrifice effect`,
          value: this.glyph.sacrifice.effect,
          inline: false
        },
        {
          name: `${capitalise(this.glyph.name)} Sacrifice effect formula`,
          value: this.glyph.sacrifice.formula,
          inline: false
        }
      ];
    }

    if (this.glyph.name === "companion") return [{
      name: "You monster!",
      value: "You wouldn't incinerate your Companion, would you?",
      inline: false
    }];

    return [{
      name: "Whoops!",
      value: `You can't Sacrifice ${capitalise(this.glyph.name)} Glyphs!`,
      inline: false
    }];
  }
}