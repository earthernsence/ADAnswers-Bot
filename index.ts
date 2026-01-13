import { Client, Collection, GatewayIntentBits } from "discord.js";
import type { ADABClient } from "@/types/ADABClient";
import { Command } from "@/types/Commands/Command";
import { ContextMenuCommand } from "./types/Commands/ContextMenuCommand";
import fs from "node:fs";
import Keyv from "keyv";
import KeyvSqlite from "@keyv/sqlite";
import path from "node:path";
import reportMessage from "./context_commands/reportMessage";

const client: ADABClient = <ADABClient>new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages]
});

client.commands = new Collection<string, Command>();
client.contextCommands = new Collection<string, ContextMenuCommand>();
client.commandsByPage = new Collection<string, Collection<string, Command>>();

client.version = process.env.VERSION ?? "Unknown version";
client.restartTime = Date.now();

const commandsDatabase = new KeyvSqlite("sqlite://keyv_commands.sqlite");
client.commandsDB = new Keyv<number>({ store: commandsDatabase });
const usersDatabase = new KeyvSqlite("sqlite://keyv_users.sqlite");
client.usersDB = new Keyv<number>({ store: usersDatabase });

// Handle importing of all commands

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath).filter(folder => !folder.startsWith("_"));

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    await import(filePath)
      .then((command: { default: Command }) => {
        client.commands.set(command.default.data.name, command.default);

        // For the help command.
        if (client.commandsByPage.get(folder))
          client.commandsByPage.get(folder)?.set(command.default.data.name, command.default);
        else
          client.commandsByPage.set(
            folder,
            new Collection<string, Command>([[command.default.data.name, command.default]])
          );

        for (const alias of command.default.aliases) {
          client.commands.set(alias, command.default);
        }
      })
      .catch(e => {
        console.log(`Error importing command file: ${filePath}`, ` ${e}`);
      });
  }
}

client.contextCommands.set("Report message", reportMessage);

// Create our event handlers

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".ts"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  await import(filePath)
    .then((event: { default: { name: string; once: boolean; execute: Function } }) => {
      if (event.default.once) {
        client.once(event.default.name, (...args) => event.default.execute(...args));
      } else {
        client.on(event.default.name, (...args) => event.default.execute(...args));
      }
    })
    .catch(e => {
      console.log(`Error importing event file: ${filePath}`, ` ${e}`);
    });
}

client.login(process.env.DISCORD_TOKEN);
