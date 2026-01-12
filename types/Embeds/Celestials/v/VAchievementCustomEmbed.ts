import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder, type EmbedField } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "../../CustomEmbed";
import { formatDecimal } from "@/utils/utils_formatting";
import v from "@/utils/game_data/celestials/v";
import type { VAchievement } from "@/types/game_data/celestials/v";

interface VAchievementCustomEmbedProps {
  interaction: CommandInteraction;
  achievement: keyof typeof v.achievements;
}

export class VAchievementCustomEmbed extends CustomEmbed {
  achievement: VAchievement;
  private _label: string;

  constructor({ interaction, achievement }: VAchievementCustomEmbedProps) {
    super({ interaction });
    this._label = achievement;
    this.achievement = v.achievements[achievement];
  }

  public create(): EmbedBuilder {
    this.setTitle(`V-Achievement - "${this.achievement.name}"`).setColour(Colours.V);

    this.setFields(this.getFields());

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder(`images/celestials/v-achievements/ach_${this._label}.png`);
    this.embed.setThumbnail(`attachment://ach_${this._label}.png`);
    return image;
  }

  protected getFields(): Array<EmbedField> {
    return [
      {
        name: "Requirement",
        value: this.achievement.description,
        inline: false
      },
      {
        name: "Goals",
        value: `${this.achievement.goals.values.map(value => formatDecimal(value)).join(", ")} ${this.achievement.goals.currency}
${this.achievement.goals.shardReduction ? `${this.achievement.goals.shardReduction.type} ${formatDecimal(this.achievement.goals.shardReduction.amount)} ${this.achievement.goals.currency} per Perk Point reduction` : ""}
        `,
        inline: false
      }
    ];
  }
}
