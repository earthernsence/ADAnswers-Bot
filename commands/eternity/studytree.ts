import { ChatInputCommandInteraction, italic, MessageFlags, SlashCommandBuilder, userMention } from "discord.js";
import { ecsAtTTAmount, getRecommendedTree } from "@/utils/game_data/recommended_time_study_paths";
import { Command } from "@/types/Commands/Command";
import { enumerate } from "@/utils/utils_formatting";
import type EternityChallenge from "@/utils/game_data/challenges/EternityChallenge";
import { isUserHelper } from "@/utils/utils_commands";
import { orderAsDoublyLinkedList } from "@/utils/game_data/challenges/eternity_challenges";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("studytree")
    .setDescription("Generate a recommended Time Study tree based on total Time Theorems")
    .addIntegerOption(option =>
      option.setName("theorems").setDescription("your total time theorems").setRequired(true).setMinValue(1)
    )
    .addStringOption(option =>
      option
        .setName("second-split")
        .setDescription("(Optional) the second-split path you want to use; works when 54 < TT < 123")
        .setRequired(false)
        .setChoices([
          { name: "Active (TS121, 131, 141)", value: "active" },
          { name: "Passive (TS122, 132, 142)", value: "passive" },
          { name: "Idle (TS123, 133, 143)", value: "idle" }
        ])
    )
    .addBooleanOption(option =>
      option
        .setName("show-recommended-ecs")
        .setDescription("(Optional) will show current recommended EC completions for provided TT; TT >= 130")
        .setRequired(false)
    )
    .addUserOption(option =>
      option
        .setName("target")
        .setDescription("(Optional) what user would you like to show the information to?")
        .setRequired(false)
    ),
  execute: (interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    const theorems = interaction.options.getInteger("theorems") ?? 0;
    const path = interaction.options.getString("second-split") ?? "active";
    const showRecommendedECs = interaction.options.getBoolean("show-recommended-ecs");
    const target = interaction.options.getUser("target");

    const orderAsECs: Array<EternityChallenge> = orderAsDoublyLinkedList.traverse();
    const recommendedTree = getRecommendedTree(theorems, path);
    const recommendedECs = ecsAtTTAmount(theorems);
    const upcomingECs =
      theorems >= Math.max(...orderAsECs.map(ec => ec.theorems))
        ? ""
        : `(Next: ${enumerate(recommendedECs.nextECs)} at ${recommendedECs.nextChallengeTT} Time Theorems)`;
    const ecString =
      showRecommendedECs && theorems >= 130
        ? `Recommended EC completions for ${theorems} TT: ${recommendedECs.completions} ${upcomingECs}`
        : "";
    const targetString = target ? `${italic(`Suggested for ${userMention(target.id)}`)}\n` : "";

    interaction.reply({
      content: `${targetString}${recommendedTree}\n${ecString}`,
      flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral
    });
  },
  aliases: ["ts"]
});
