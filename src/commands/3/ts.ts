import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { Tree } from "../../classes/Tree";
import { ecsAtTTAmount } from "../../functions/ecs";
import { isHelper, makeEnumeration } from "../../functions/Misc";

export const ts: Command = {
  name: "ts",
  description: "Generates a Time Study tree based on your total Time Theorems.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "theorems",
      description: "The number of Time Theorems you have.",
      type: ApplicationCommandOptionType.Integer,
      required: true,
      // eslint-disable-next-line camelcase
      min_value: 1,
    },
    {
      name: "path",
      description: "The path you want to use; only has effect 54 < x < 123 where x is TT",
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: [
        { name: "Passive", value: "passive" },
        { name: "Active", value: "active" },
        { name: "Idle", value: "idle" },
      ]
    },
    {
      name: "showecs",
      description: "Will show current ECs for that TT amount; x >= 130 where 130 is TT",
      type: ApplicationCommandOptionType.Boolean,
      required: false
    },
    {
      name: "mobile",
      description: "Removes codeblock so copying on mobile is simpler",
      type: ApplicationCommandOptionType.Boolean,
      required: false,
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const theorems: number = interaction.options.getInteger("theorems") as number;
    const path: string = interaction.options.getString("path") as string;
    const showECs: boolean = interaction.options.getBoolean("showecs") as boolean;
    let mobile: boolean = interaction.options.getBoolean("mobile") as boolean;
    const tree = new Tree(theorems, path, mobile).generateTree();
    const ecs = ecsAtTTAmount(theorems);
    const next = typeof ecs === "string" ? "" : `(Next: ${makeEnumeration<string>(ecs.nextECs, ", ", "", "and")} at ${ecs.nextEC.tt} TT)`;
    const ecString: string = showECs && theorems >= 130 ? `EC completions for ${theorems} TT: ${typeof ecs === "string" ? ecs : ecs.completions} ${next}` : "";

    await interaction.reply({ content: `${tree}\n${ecString}`, ephemeral: !isHelper(interaction) });
  }
};
