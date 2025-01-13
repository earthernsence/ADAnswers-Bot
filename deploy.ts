import { REST, type RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from "discord.js";
import { Channels } from "./Channels";
import fs from "node:fs";
import path from "node:path";

const commands: Array<RESTPostAPIChatInputApplicationCommandsJSONBody> = [];
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));
  console.log(`Preparing ${commandFiles.length} command(s) from ${commandsPath}...`);
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);
    if (!command.default) continue;
    if ("data" in command.default && "execute" in command.default) {
      commands.push(command.default.data.toJSON());

      // Aliases are stupid.
      for (const alias of command.default.aliases) {
        command.default.data.setName(alias);
        commands.push(command.default.data.toJSON());
      }
    } else {
      console.log(`Command at ${filePath} does not have a data and execute property`);
    }
  }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

(async() => {
  try {
    console.log(`Updating ${commands.length} commands...`);

    await rest.put(
      Routes.applicationGuildCommands(process.env.APPLICATION_ID as string, Channels.TestingServer),
      { body: commands },
    ).then(() => console.log(`Loaded ${commands.length} commands to the testing server`));

    // TODO: Global commands:
    // await rest.put(
    //   Routes.applicationCommands(process.env.APPLICATION_ID as string),
    //   { body: commands },
    // );

  } catch (e) {
    console.error(e);
  }
})();