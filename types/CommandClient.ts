import type { Client, Collection } from "discord.js";
import type { Command } from "./Command";

export interface CommandClient extends Client {
  commands: Collection<string, Command>;
}