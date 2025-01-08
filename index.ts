import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from "discord.js";
import type { Command } from "./types/Command";
import type { CommandClient } from "./types/CommandClient";
import fs from "node:fs";
import path from "node:path";

const client: CommandClient = <CommandClient>new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection<string, Command>();

// Handle importing of all commands

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    await import(filePath).then((command: { default: Command }) => {
      client.commands.set(command.default.data.name, command.default);
    }).catch((e) => {
      console.log("Error importing command file: " + filePath, " " + e);
    });
  }
}

// Create our event handlers

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".ts"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  await import(filePath).then((event: { default: { name: string, once: boolean, execute: Function } }) => {
    if (event.default.once) {
      client.once(event.default.name, (...args) => event.default.execute(...args));
    } else {
      client.on(event.default.name, (...args) => event.default.execute(...args));
    }
  }).catch((e) => {
    console.log("Error importing event file: " + filePath, " " + e);
  });
}

client.login(process.env.DISCORD_TOKEN);