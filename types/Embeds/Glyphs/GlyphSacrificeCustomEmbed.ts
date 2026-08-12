import { AttachmentBuilder, type ChatInputCommandInteraction, type EmbedBuilder, type EmbedField } from "discord.js";
import { capitalise } from "@/utils/utils_formatting";
import { CustomEmbed } from "../CustomEmbed";
import type { Glyph } from "@/utils/game_data/glyphs/Glyph";

interface GlyphSacrificeCustomEmbedProps {
  interaction: ChatInputCommandInteraction;
  glyph: Glyph;
}

export class GlyphSacrificeCustomEmbed extends CustomEmbed {
  glyph: Glyph;

  constructor({ interaction, glyph }: GlyphSacrificeCustomEmbedProps) {
    super({ interaction });
    this.glyph = glyph;
  }

  public override create(): EmbedBuilder {
    this.setTitle(this.glyph.stylisedName()).setColour(this.glyph.colour);

    this.setFields(this.getFields());

    return this.finalise();
  }

  public override getAndSetThumbnail(): AttachmentBuilder {
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
          name: `${this.glyph.capitalisedName} Sacrifice effect`,
          value: this.glyph.sacrifice.effect,
          inline: false
        },
        {
          name: `${this.glyph.capitalisedName} Sacrifice effect formula`,
          value: this.glyph.sacrifice.formula,
          inline: false
        }
      ];
    }

    if (this.glyph.name.toLowerCase() === "companion") {
      return [
        {
          name: "You monster!",
          value: "You wouldn't incinerate your Companion, would you?",
          inline: false
        }
      ];
    }

    return [
      {
        name: "Whoops!",
        value: `You can't Sacrifice ${capitalise(this.glyph.name)} Glyphs!`,
        inline: false
      }
    ];
  }
}
