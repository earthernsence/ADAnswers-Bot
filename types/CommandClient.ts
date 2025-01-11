import type { Client, Collection } from "discord.js";
import { Command } from "./Commands/Command";

// We hold all of our commands within our Client object using this interface.
export interface CommandClient extends Client {
  commands: Collection<string, Command>;
}