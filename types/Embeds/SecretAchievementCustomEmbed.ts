import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder, type EmbedField, spoiler, time, TimestampStyles } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "./CustomEmbed";
import type SecretAchievement from "@/utils/game_data/SecretAchievement";
import { SecretAchievementType } from "../game_data/SecretAchievements";

interface SecretAchievementCustomEmbedProps {
  interaction: CommandInteraction,
  achievement: SecretAchievement,
  expirationTimestamp: number,
}

export class SecretAchievementCustomEmbed extends CustomEmbed {
  achievement: SecretAchievement;
  expirationTimestamp: number;

  constructor({ interaction, achievement, expirationTimestamp }: SecretAchievementCustomEmbedProps) {
    super({ interaction });
    this.achievement = achievement;
    this.expirationTimestamp = expirationTimestamp;
  }

  private get disabled(): boolean {
    return Math.floor((Date.now()) / 1000) >= this.expirationTimestamp;
  }

  public create(): EmbedBuilder {
    this.setTitle(this.achievement.title)
      .setDescription(`Expire${this.disabled ? "d" : "s"} ${time(this.expirationTimestamp, TimestampStyles.RelativeTime)} on ${time(this.expirationTimestamp, TimestampStyles.FullDateShortTime)}`)
      .setColour(Colours.Achievement);

    this.setFields(this.getFields());

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    let image: AttachmentBuilder;

    switch (this.achievement.type) {
      case SecretAchievementType.Web:
      case SecretAchievementType.Both:
        image = new AttachmentBuilder(`images/achievements/secret/web/S${this.achievement.id}.png`);
        this.embed.setThumbnail(`attachment://S${this.achievement.id}.png`);
        break;
      case SecretAchievementType.Mobile:
        image = new AttachmentBuilder(`images/achievements/secret/mobile/S${this.achievement.id}.png`);
        this.embed.setThumbnail(`attachment://S${this.achievement.id}.png`);
        break;
      default:
        throw new Error(`Unexpected Secret Achievement type ${this.achievement.type} in getAndSetThumbnail()`);
    }

    return image;
  }

  private getFields(): Array<EmbedField> {
    return [
      {
        name: "Achievement",
        value: spoiler(this.achievement.description),
        inline: false,
      },
      {
        name: "Strategy",
        value: spoiler(this.achievement.unlock),
        inline: false
      }
    ];
  }
}