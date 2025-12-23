import type { Client, Collection } from "discord.js";
import { Command } from "./Commands/Command";
import type { ContextMenuCommand } from "./Commands/ContextMenuCommand";

// We hold all of our commands within our Client object using this interface.
export interface ADABClient extends Client {
  commands: Collection<string, Command>;
  contextCommands: Collection<string, ContextMenuCommand>;
  commandsByPage: Collection<string, Collection<string, Command>>,
  version?: string,
}