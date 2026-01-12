import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  InteractionContextType,
  MessageContextMenuCommandInteraction,
  MessageFlags,
  ModalSubmitInteraction,
  TextChannel,
  TextInputStyle
} from "discord.js";
import {
  channelMention,
  LabelBuilder,
  ModalBuilder,
  roleMention,
  TextInputBuilder,
  time,
  userMention
} from "@discordjs/builders";
import { Channels } from "@/utils/utils_channels";
import { Colours } from "@/utils/utils_colours";
import { ContextMenuCommand } from "@/types/Commands/ContextMenuCommand";
import { CustomEmbed } from "@/types/Embeds/CustomEmbed";
import { link } from "@/utils/utils_commands";
import { Roles } from "@/utils/utils_roles";

export default new ContextMenuCommand({
  data: new ContextMenuCommandBuilder()
    .setName("Report message")
    .setContexts(InteractionContextType.Guild)
    .setType(ApplicationCommandType.Message),
  execute: async (interaction: MessageContextMenuCommandInteraction) => {
    const nowTimestamp = Math.floor(Date.now() / 1000);

    const { content, channelId, author, createdTimestamp, createdAt, id, guildId, url } = interaction.targetMessage;

    if (Date.now() - createdAt.getTime() > 6.048e8) {
      await interaction.reply({
        content: `The message you selected (id ${id}) was sent more than a week ago, so it cannot be reported.`,
        flags: MessageFlags.Ephemeral
      });
      return;
    }

    if (author.bot) {
      await interaction.reply({
        content: `The user who sent this message (${author.username}) is a bot!`,
        flags: MessageFlags.Ephemeral
      });
      return;
    }

    // TODO: Change to AD server for release
    if (guildId !== Channels.TestingServer) {
      await interaction.reply({
        content: `This message was not sent in the AD server!`,
        flags: MessageFlags.Ephemeral
      });
      return;
    }

    const reportModal = new ModalBuilder().setCustomId(`report_modal_${nowTimestamp}`).setTitle("Report message...");

    const reasonInput = new TextInputBuilder()
      .setCustomId(`report_modal_input_${nowTimestamp}`)
      .setStyle(TextInputStyle.Paragraph)
      .setMaxLength(400)
      .setRequired(false)
      .setPlaceholder("rude, inconsiderate, broke rule 9...");

    const reasonLabel = new LabelBuilder()
      .setLabel("Provide a reason for reporting this message.")
      .setDescription("You can also choose to not provide a reason, though it is strongly encouraged.")
      .setTextInputComponent(reasonInput);

    reportModal.addLabelComponents(reasonLabel);

    await interaction.showModal(reportModal);

    const filter = (i: ModalSubmitInteraction) => i.customId.endsWith(String(nowTimestamp));

    interaction
      .awaitModalSubmit({ time: 60000, filter })
      .then(async modalInteraction => {
        await modalInteraction.deferReply({ flags: MessageFlags.Ephemeral });

        const reason = modalInteraction.fields.getTextInputValue(`report_modal_input_${nowTimestamp}`);

        const messageReportEmbed = new CustomEmbed({ interaction })
          .setTitle("Message reported")
          .setColour(Colours.Forbidden)
          .setFields([
            {
              name: "Reason for reporting",
              value: `Reported by ${userMention(interaction.user.id)} because: ${reason.substring(0, 400)}`,
              inline: false
            },
            {
              name: "Message",
              value: `${content.substring(0, 400)}${content.length > 400 ? "..." : ""} \n ${link("__**[link]**__", url)}`,
              inline: false
            },
            {
              name: "Channel",
              value: channelMention(channelId),
              inline: false
            },
            {
              name: "Author",
              value: `${userMention(author.id)} (${author.username})`,
              inline: false
            },
            {
              name: "Sent/reported",
              value: `Sent at ${time(Math.floor(createdTimestamp / 1000))}\nReported at ${time(Math.floor(modalInteraction.createdTimestamp / 1000))}`,
              inline: false
            }
          ])
          .finalise();

        interaction.targetMessage.guild?.channels.fetch();

        const reportChannel = interaction.targetMessage.guild?.channels.cache.get(Channels.TestingModChannel);

        await (reportChannel as TextChannel).send({
          content: roleMention(Roles.TestMod),
          embeds: [messageReportEmbed]
        });

        await modalInteraction.editReply({
          content: "Your report was sent to the mod team with the following information:",
          embeds: [messageReportEmbed]
        });
      })
      .catch(error => {
        console.error(error);
        interaction.editReply({
          content: `No message was reported.`
        });
      });
  }
});
