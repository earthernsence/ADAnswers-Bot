import { AttachmentBuilder, type EmbedBuilder, type EmbedField, type RepliableInteraction } from "discord.js";
import { time, TimestampStyles } from "@discordjs/builders";
import type Achievement from "@/utils/game_data/Achievement";
import { Caesar } from "@/utils/utils_formatting";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "./CustomEmbed";

interface AchievementCustomEmbedProps {
  interaction: RepliableInteraction;
  achievement: Achievement;
}

export class AchievementCustomEmbed extends CustomEmbed {
  achievement: Achievement;

  constructor({ interaction, achievement }: AchievementCustomEmbedProps) {
    super({ interaction });
    this.achievement = achievement;
  }

  public override create(): EmbedBuilder {
    this.setTitle(`Achievement ${this.achievement.id} - "${this.achievement.fullName}"`)
      .setDescription(`Updated ${time(Math.floor(Date.now() / 1000), TimestampStyles.RelativeTime)}`)
      .setColour(Colours.Achievement);

    this.setFields(this.getFields());

    if (this.achievement.isDoomed) {
      this.finalise();
      return this.doom();
    }

    return this.finalise();
  }

  public doom(): EmbedBuilder {
    this.setColour(Colours.Pelle);

    this.setTitle(Caesar.randomEncrypt(`Achievement ${this.achievement.id} - "${this.achievement.fullName}"`));

    const fields: Array<EmbedField> = [];

    for (const field of this.embed.data.fields ?? []) {
      fields.push({
        name: Caesar.randomEncrypt(field.name),
        value: Caesar.randomEncrypt(field.value),
        inline: field.inline ?? false
      });
    }

    this.setFields(fields);

    this.embed.setFooter({
      text: Caesar.randomEncrypt("END / IS / NIGH / DESTRUCTION / IS / IMMINENT / HELP / US / GOODBYE / FOREVER"),
      iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png`
    });

    return this.embed;
  }

  public override getAndSetThumbnail(): AttachmentBuilder {
    if (this.achievement.isDoomed) {
      const image: AttachmentBuilder = new AttachmentBuilder(`images/misc/doomed.png`);
      this.embed.setThumbnail(`attachment://doomed.png`);
      return image;
    }

    const image: AttachmentBuilder = new AttachmentBuilder(`images/achievements/${this.achievement.id}.png`);
    this.embed.setThumbnail(`attachment://${this.achievement.id}.png`);
    return image;
  }

  private getFields(): Array<EmbedField> {
    const fields: Array<EmbedField> = [{ name: "Achievement", value: this.achievement.requirement, inline: false }];

    if (this.achievement.unlockStrategy) {
      fields.push({ name: "Strategy", value: this.achievement.unlockStrategy, inline: false });
    }

    if (this.achievement.reward) {
      fields.push({ name: "Reward", value: this.achievement.reward, inline: false });
      if (this.achievement.rewardFormula) {
        fields.push({ name: "Reward formula", value: this.achievement.rewardFormula, inline: false });
      }
    }

    return fields;
  }
}