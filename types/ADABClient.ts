import type { Client, Collection } from "discord.js";
import { Command } from "./Commands/Command";

// We hold all of our commands within our Client object using this interface.
export interface ADABClient extends Client {
  commands: Collection<string, Command>;
  commandsByPage: Collection<string, Collection<string, Command>>,
  version?: string,
}