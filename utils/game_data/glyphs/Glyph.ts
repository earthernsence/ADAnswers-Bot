import { GlyphEmotes, Symbols } from "@/utils/utils_symbols";
import type { AlteredGlyphEffect } from "@/types/game_data/glyphs/GlyphEffect";
import { bold } from "discord.js";
import { capitalise } from "@/utils/utils_formatting";
import { Colours } from "@/utils/utils_colours";
import type { GlyphEffect } from "./GlyphEffect";
import type { Glyph as TGlyph } from "@/types/game_data/glyphs/Glyph";

interface GlyphProps {
  name: string,
  effects: Record<string, GlyphEffect>,
  sacrifice?: {
    effect: string,
    formula: string
  }
}

export class Glyph implements TGlyph {
  name: string;
  effects: Record<string, GlyphEffect>;
  sacrifice?: { effect: string; formula: string; };
  colour: Colours;
  emote: GlyphEmotes;
  symbol: Symbols;

  constructor({ name, effects, sacrifice }: GlyphProps) {
    this.name = name;
    this.effects = effects;
    this.sacrifice = sacrifice;

    this.colour = Colours[this.capitalisedName as keyof typeof Colours];
    this.emote = GlyphEmotes[this.capitalisedName as keyof typeof GlyphEmotes];
    this.symbol = Symbols[this.capitalisedName as keyof typeof Symbols];
  }

  get capitalisedName(): string {
    return capitalise(this.name);
  }

  get alteredEffects(): Record<string, AlteredGlyphEffect> {
    const altered: Record<string, AlteredGlyphEffect> = {};

    for (const [location, effect] of Object.entries(this.effects)) {
      if (!effect.altered) continue;
      Object.assign(altered, { [location]: effect.altered });
    }

    return altered;
  }

  get canBeAltered(): boolean {
    return Object.keys(this.alteredEffects).length > 0;
  }

  public stylisedName(isADServer: boolean = true): string {
    if (isADServer) return `${this.emote} ${this.name} ${this.emote}`;
    return `${bold(this.symbol)} ${this.name} ${bold(this.symbol)}`;
  }
}