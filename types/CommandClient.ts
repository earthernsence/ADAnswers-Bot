import type { Client, Collection } from "discord.js";
import type { Command } from "./Command";

// We hold all of our commands within our Client object using this interface.
export interface CommandClient extends Client {
  commands: Collection<string, Command>;
}