import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder, type EmbedField, bold } from "discord.js";
import type { AlteredGlyphEffect } from "@/types/game_data/glyphs/GlyphEffect";
import { Channels } from "@/utils/utils_channels";
import { CustomEmbed } from "../CustomEmbed";
import type { Glyph } from "@/utils/game_data/glyphs/Glyph";
import type { GlyphEffect } from "@/utils/game_data/glyphs/GlyphEffect";

interface GlyphEffectCustomEmbedProps {
  interaction: CommandInteraction,
  glyph: Glyph,
  isAltered: boolean
}

export class GlyphEffectCustomEmbed extends CustomEmbed {
  glyph: Glyph;
  isAltered: boolean;

  constructor({ interaction, glyph, isAltered }: GlyphEffectCustomEmbedProps) {
    super({ interaction });
    this.glyph = glyph;
    this.isAltered = isAltered;
  }

  public create(): EmbedBuilder {
    this.setTitle(this.glyph.stylisedName(this.interaction.guildId === Channels.AntimatterDimensionsServer))
      .setColour(this.glyph.colour);

    this.setFields(this.getFields());

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    if (this.isAltered && !this.glyph.canBeAltered) {
      const image: AttachmentBuilder = new AttachmentBuilder(`images/glyphs/altered/none_altered.png`);
      this.embed.setThumbnail(`attachment://none_altered.png`);
      return image;
    }

    const fileName = this.isAltered ? `${this.glyph.name}_altered` : this.glyph.name;
    const file = this.isAltered ? `altered/${fileName}` : fileName;
    const image: AttachmentBuilder = new AttachmentBuilder(`images/glyphs/${file}.png`);
    this.embed.setThumbnail(`attachment://${fileName}.png`);
    return image;
  }

  protected getFields(): Array<EmbedField> {
    if (this.isAltered && !this.glyph.canBeAltered) {
      return [{
        name: "Whoops!",
        value: `${this.glyph.capitalisedName} Glyphs can't be Altered!`,
        inline: false
      }];
    }

    const fields: Array<EmbedField> = [];
    const effectsToConsider: Record<string, GlyphEffect> | Record<string, AlteredGlyphEffect> = this.isAltered ? this.glyph.alteredEffects : this.glyph.effects;

    for (const [location, effect] of Object.entries(effectsToConsider)) {
      const primaryString = this.isAltered ? "" : `${(effect as GlyphEffect).primary ? ` (Primary Effect)` : ""}`;
      fields.push({
        name: `${location}: ${effect.name}${primaryString}`,
        value: `${effect.effect}\n${bold("Formula")}: ${effect.formula}`,
        inline: false
      });
    }

    return fields;
  }
}