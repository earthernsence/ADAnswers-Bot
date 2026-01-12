import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder, type EmbedField } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "../../CustomEmbed";
import ra from "@/utils/game_data/celestials/ra";
import type { RaCelestialMemories } from "@/types/game_data/celestials/ra";

interface RaCelestialMemoriesCustomEmbedProps {
  interaction: CommandInteraction;
  celestial: keyof typeof ra.memories;
}

export class RaCelestialMemoriesCustomEmbed extends CustomEmbed {
  celestial: RaCelestialMemories;
  private _label: string;

  constructor({ interaction, celestial }: RaCelestialMemoriesCustomEmbedProps) {
    super({ interaction });
    this._label = celestial;
    this.celestial = ra.memories[celestial];
  }

  public create(): EmbedBuilder {
    this.setTitle(`Ra Celestial: ${this.celestial.name}`).setColour(
      Colours[this.celestial.name as keyof typeof Colours]
    );

    this.setFields(this.getFields());

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder(`images/celestials/memories/${this._label}.png`);
    this.embed.setThumbnail(`attachment://${this._label}.png`);
    return image;
  }

  protected getFields(): Array<EmbedField> {
    const fields: Array<EmbedField> = [
      {
        name: "Memory Chunk gain",
        value: `Memory Chunk gain is based on ${this.celestial.chunkGain.currency}\nFormula: ${this.celestial.chunkGain.formula}`,
        inline: false
      }
    ];

    for (const unlock of this.celestial.unlocks) {
      fields.push({
        name: `Ra-${this.celestial.name} Level ${unlock.level} Unlock`,
        value: `${unlock.effect}${unlock.formula ? `\nFormula: ${unlock.formula}` : ""}`,
        inline: false
      });
    }

    return fields;
  }
}
