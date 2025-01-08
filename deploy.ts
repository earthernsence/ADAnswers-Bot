import { REST, Routes, type RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { Channels } from "./Channels";

const commands: Array<RESTPostAPIChatInputApplicationCommandsJSONBody> = [];
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(filePath);
    if ("data" in command.default && "execute" in command.default) {
      commands.push(command.default.data.toJSON());
    } else {
      console.log(`Command at ${filePath} does not have a data and execute property`);
    }
  }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

(async () => {
  try {
    console.log(`Updating ${commands.length} commands...`);

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.APPLICATION_ID as string, Channels.TestingServer),
      { body: commands },
    );

    // TODO: Global commands:
    // const data = await rest.put(
    //   Routes.applicationCommands(process.env.APPLICATION_ID as string),
    //   { body: commands },
    // );

    console.log(`Reloaded all ${commands.length} commands!`);
  } catch (e) {
    console.error(e);
  }
})();