import { ActionRowBuilder, bold, ButtonBuilder, italic } from "@discordjs/builders";
import {
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  ComponentType,
  type InteractionReplyOptions,
  MessageComponentInteraction,
  MessageFlags,
  roleMention,
  SlashCommandBuilder
} from "discord.js";
import { BasicTextCustomEmbed } from "@/types/Embeds/BasicTextCustomEmbed";
import { Channels } from "@/utils/utils_channels";
import { Colours } from "@/utils/utils_colours";
import { Command } from "@/types/Commands/Command";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import { Roles } from "@/utils/utils_roles";

interface RoleRequestMessages {
  [key: string]: {
    add: string;
    remove: string;
  };
}

const requestMessages: RoleRequestMessages = {
  [Roles.ADABUpdates]: {
    add: `Doing so will mean that you will be mentioned in relevant ADAB update notifications.`,
    remove: `Doing so will mean that you are no longer mentioned in relevant ADAB update notifications.`
  },
  [Roles.HelperRole]: {
    add: `Doing so will allow you to ${bold("visibly")} use the bot in public-facing Discord channels, like the Progression discussion chats. \
To become a Helper, understand that you agree to keep all ${italic("personal")} use of ADAB to <#351479640755404820> or the bot's DMs, \
and only use the bot outside of those places to assist others in Antimatter Dimensions. ${bold("You are not free from consequences")}. \
Moderators and Admins reserve the right to pursue appropriate avenues of punishment in the event that this is not respected.
    `,
    remove: `Doing so will prevent your usage of ADAB being visible in the Antimatter Dimensions Discord server.`
  },
  [Roles.TestRole]: {
    add: `Test lorem ipsum ADDING ROLE dolor sit amet.`,
    remove: `Test lorem ipsum REMOVING ROLE dolor sit amet.`
  }
};

export default new Command({
  data: new SlashCommandBuilder()
    .setName("rolerequest")
    .setDescription("Command used to request various roles on the AD server")
    .addStringOption(option =>
      option
        .setName("role")
        .setDescription("Which role would you like to add/remove from yourself?")
        .setRequired(true)
        .setChoices([
          { name: "ADAnswersBot Updates", value: Roles.ADABUpdates },
          { name: "Helper", value: Roles.HelperRole },
          // TODO: remove for public release
          { name: "Test role", value: Roles.TestRole }
        ])
    ),
  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    // TODO: Add helper role eligibility condition stuff
    // TODO: Change to AD server for release
    if (!interaction.inGuild() || interaction.guildId !== Channels.TestingServer) {
      const errorEmbed = new ErrorCustomEmbed({
        interaction,
        text: `You can only request a role inside the Antimatter Dimensions Discord server.`
      });

      const errorImage = errorEmbed.getAndSetThumbnail();

      await interaction.reply({
        embeds: [errorEmbed.create()],
        files: [errorImage],
        flags: MessageFlags.Ephemeral
      });

      return;
    }

    const roleID = interaction.options.getString("role", true);
    const role = interaction.guild?.roles.cache.find(r => r.id === roleID);

    if (!role) {
      const errorEmbed = new ErrorCustomEmbed({
        interaction,
        text: `There was an issue fetching your requested role. Please try again.`
      });

      const errorImage = errorEmbed.getAndSetThumbnail();

      await interaction.reply({
        embeds: [errorEmbed.create()],
        files: [errorImage],
        flags: MessageFlags.Ephemeral
      });

      return;
    }

    const hasRole = role.members.has(interaction.user.id);
    const expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);

    const embed = new BasicTextCustomEmbed({
      interaction,
      title: `"${role?.name}" Role Request`,
      field: {
        name: `${hasRole ? "Removing" : "Adding"} the "${role.name}" role`,
        value: `You are requesting to ${hasRole ? "remove" : "add"} the ${roleMention(roleID)} role from yourself. ${requestMessages[roleID][hasRole ? "remove" : "add"]}`,
        inline: false
      },
      colour: hasRole ? Colours.Forbidden : Colours.Antimatter
    }).setDescription(
      `Are you sure you want to ${hasRole ? "remove" : "add"} the "${role.name}" role?\nExpires <t:${expirationTimestamp}:R> at <t:${expirationTimestamp}:T>`
    );

    const picture = embed.getAndSetThumbnail();

    const button = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setStyle(hasRole ? ButtonStyle.Danger : ButtonStyle.Success)
        .setEmoji({ name: hasRole ? "❌" : "✅" })
        .setLabel(hasRole ? "Remove role" : "Add role")
        .setCustomId(`role_request_button_${expirationTimestamp}`)
    );

    const initialContent: InteractionReplyOptions = {
      embeds: [embed.create()],
      files: [picture],
      flags: MessageFlags.Ephemeral,
      components: [button]
    };

    const sentReply = await interaction.reply(initialContent);

    const filter = (i: MessageComponentInteraction) => i.customId.endsWith(String(expirationTimestamp));
    const collector = sentReply.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter,
      time: 60000
    });

    collector.once("collect", async (i: ButtonInteraction) => {
      await interaction.guild?.members.fetch(interaction.user.id).then(async member => {
        if (hasRole) member.roles.remove(roleID);
        else member.roles.add(roleID);

        await i.update({
          content: `You have successfully ${hasRole ? "removed" : "added"} the "${roleMention(roleID)}" role. You can safely remove this message. Remember, you can always run /rolerequest again to reverse your decision.`,
          embeds: [],
          components: [],
          files: []
        });
      });
    });

    collector.on("end", async () => {
      await interaction.editReply({
        content: `The embed has expired. Your requested role was not ${hasRole ? "removed" : "added"}. You can use \`/rolerequest\` to try again.`,
        embeds: [],
        components: [],
        files: []
      });
    });
  }
});
