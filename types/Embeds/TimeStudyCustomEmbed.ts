import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder, type EmbedField, bold } from "discord.js";
import { capitalise, enumerate } from "@/utils/utils_formatting";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "./CustomEmbed";
import type { TimeStudy } from "../game_data/TimeStudy";
import { quantify } from "@/utils/utils_commands";

interface TimeStudyCustomEmbedProps {
  interaction: CommandInteraction,
  study: TimeStudy
}

export class TimeStudyCustomEmbed extends CustomEmbed {
  study: TimeStudy;

  constructor({ interaction, study }: TimeStudyCustomEmbedProps) {
    super({ interaction });
    this.study = study;
  }

  public create(): EmbedBuilder {
    this.setTitle(`Time Study ${this.study.id}`)
      .setColour(Colours[capitalise(this.study.type) as keyof typeof Colours]);

    this.setFields(this.getFields());

    return this.finalise();
  }

  private getFields(): Array<EmbedField> {
    const fields: Array<EmbedField> = [
      { name: "Effect", value: `${this.study.effect}`, inline: false },
      { name: "Cost", value: `${quantify(this.study.isTriad ? "Space Theorem" : "Time Theorem", this.study.cost)}`, inline: false },
    ];

    if (this.study.prerequisites.length === 0 || this.study.id >= 231) {
      fields.push({
        name: "Prerequisites",
        value: this.study.reqType,
        inline: false
      });
    } else {
      fields.push({
        name: "Prerequisites",
        value: `${this.study.reqType} ${enumerate(this.study.prerequisites.map(study => `TS${study}`), "disjunction")} ${this.study.additionalPrerequisites ? `and ${this.study.additionalPrerequisites}` : ``}`,
        inline: false
      });
    }

    if (this.study.formula) {
      fields.push({ name: "Formula", value: `${this.study.formula}`, inline: false });
    }
    if (this.study.exclusiveWith) {
      fields.push({ name: "Cannot be purchased if", value: `${this.study.exclusiveWith}`, inline: false });
    }
    if (this.study.isBestWaifu) {
      fields.push({ name: "Is best waifu?", value: `${this.study.isBestWaifu}`, inline: false });
    }

    this.addImage();

    return fields;
  }

  private addImage(): void {
    if (this.study.hasGraph) {
      this.embed.addFields({
        name: "Effect formula graph",
        value: `${bold("")}`,
        inline: false,
      });

      if (!this.study.graph) {
        throw new Error(`This study (TS${this.study.id}) tried to add a graph, but it didn't have a URL provided.`);
      }

      this.embed.setImage(this.study.graph);
    }
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder(`images/studies/${this.study.type}.png`);
    this.embed.setThumbnail(`attachment://${this.study.type}.png`);
    return image;
  }
}