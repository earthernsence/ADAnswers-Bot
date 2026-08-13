import {
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  codeBlock,
  italic,
  MessageFlags,
  type RepliableInteraction,
  SlashCommandBuilder,
  userMention
} from "discord.js";
import type { DoublyLinkedList, DoublyLinkedListNode } from "@/types/DoublyLinkedList";
import { buildCustomId } from "@/utils/utils_commands";
import type { CollectorComponentInteraction } from "@/types/Commands/CollectorEmbedCommand";
import type EternityChallenge from "@/utils/game_data/challenges/EternityChallenge";
import { EternityChallengeCustomEmbed } from "@/types/Embeds/Challenges/EternityChallengeCustomEmbed";
import { LinkedListCollectorEmbedCommand } from "@/types/Commands/LinkedListCollectorEmbedCommand";
import { orderAsDoublyLinkedList } from "@/utils/game_data/challenges/eternity_challenges";

/**
 * `/eternitychallenge` - look up an Eternity Challenge guide and page through the full ordered
 * list with buttons, with an extra "Copy Tree" button for pulling just the recommended Time
 * Study tree as copy-pastable text.
 *
 * The `tree` boolean slash option is kept as a standalone shortcut alongside the button, for
 * anyone used to the old behaviour.
 */
class EternityChallengeCommand extends LinkedListCollectorEmbedCommand<EternityChallenge> {
  constructor() {
    super({
      data: new SlashCommandBuilder()
        .setName("eternitychallenge")
        .setDescription("Generates an Eternity Challenge guide for the requested challenge")
        .addIntegerOption(option =>
          option
            .setName("challenge")
            .setDescription("Which Eternity Challenge would you like a guide for?")
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(12)
        )
        .addIntegerOption(option =>
          option
            .setName("completion")
            .setDescription("Which completion of that challenge would you like a guide for?")
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(5)
        )
        .addUserOption(option =>
          option
            .setName("target")
            .setDescription("(Optional) Which user would you like to show the information to?")
            .setRequired(false)
        )
        .addBooleanOption(option =>
          option.setName("tree").setDescription("(Optional) Request only the tree for easy copying.").setRequired(false)
        ),
      prefix: "ec",
      aliases: ["ec"]
    });
  }

  protected findInitial(interaction: ChatInputCommandInteraction): EternityChallenge | undefined {
    const challengeRequested = interaction.options.getInteger("challenge", true);
    const completionRequested = interaction.options.getInteger("completion", true);

    return (
      orderAsDoublyLinkedList.search(
        value => value.challenge === challengeRequested && value.completion === completionRequested
      )?.value ?? undefined
    );
  }

  protected notFoundText(interaction: ChatInputCommandInteraction): string {
    const challengeRequested = interaction.options.getInteger("challenge", true);
    const completionRequested = interaction.options.getInteger("completion", true);

    return `That challenge doesn't exist!\nChallenge requested: ${challengeRequested}\nCompletion requested: ${completionRequested}`;
  }

  protected encodeIdentifier(item: EternityChallenge): string {
    return `${item.challenge}x${item.completion}`;
  }

  protected decodeIdentifier(encoded: string): EternityChallenge | undefined {
    const [challenge, completion] = encoded.split("x").map(Number);
    return (
      orderAsDoublyLinkedList.search(value => value.challenge === challenge && value.completion === completion)
        ?.value ?? undefined
    );
  }

  protected buildEmbed(interaction: RepliableInteraction, item: EternityChallenge): EternityChallengeCustomEmbed {
    return new EternityChallengeCustomEmbed({ interaction, challenge: item });
  }

  protected resolveList(): DoublyLinkedList<EternityChallenge> {
    return orderAsDoublyLinkedList;
  }

  protected findNode(item: EternityChallenge): DoublyLinkedListNode<EternityChallenge> | undefined {
    return (
      orderAsDoublyLinkedList.search(
        value => value.challenge === item.challenge && value.completion === item.completion
      ) ?? undefined
    );
  }

  protected getButtonLabel(item: EternityChallenge): string {
    return item.shortName;
  }

  protected override extraButtons(item: EternityChallenge, userId: string): Array<ButtonBuilder> {
    return [
      new ButtonBuilder()
        .setCustomId(buildCustomId(this.prefix, "tree", userId, this.encodeIdentifier(item)))
        .setEmoji({ name: "📋" })
        .setLabel("Copy tree")
        .setStyle(ButtonStyle.Secondary)
    ];
  }

  protected override async handleExtraAction(
    interaction: CollectorComponentInteraction,
    action: string,
    item: EternityChallenge
  ): Promise<boolean> {
    if (action !== "tree") return false;

    await interaction.reply({ content: codeBlock(item.formattedTree), flags: MessageFlags.Ephemeral });
    return true;
  }

  // Preserved as a fast, no-embed shortcut for anyone used to the old `tree` option
  protected override async performExecute(interaction: ChatInputCommandInteraction): Promise<void> {
    if (interaction.options.getBoolean("tree", false)) {
      const item = this.findInitial(interaction);

      if (!item) {
        this.error({ interaction, text: this.notFoundText(interaction) });
        return;
      }

      const targetUser = interaction.options.getUser("target") ?? undefined;

      await interaction.reply({
        content: `${targetUser ? `${italic(`Suggested for ${userMention(targetUser.id)}`)}\n` : ""}${codeBlock(item.formattedTree)}`,
        flags: this.getFlags(interaction)
      });

      return;
    }

    await super.performExecute(interaction);
  }
}

export default new EternityChallengeCommand();
