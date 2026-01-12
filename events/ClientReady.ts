import { Client, Events } from "discord.js";
import type { BaseEvent } from "@/types/BaseEvent";

export default <BaseEvent>{
  name: Events.ClientReady,
  once: true,
  execute: (client: Client<true>) => {
    console.log(`Logged in as ${client.user?.tag}`);
  }
};
