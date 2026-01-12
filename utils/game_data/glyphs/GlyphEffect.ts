import type { AlteredGlyphEffect, GlyphEffect as TGlyphEffect } from "@/types/game_data/glyphs/GlyphEffect";

interface GlyphEffectProps {
  name: string;
  primary?: boolean;
  effect: string;
  formula: string;
  altered?: AlteredGlyphEffect;
}

export class GlyphEffect implements TGlyphEffect {
  name: string;
  primary: boolean;
  effect: string;
  formula: string;
  altered?: AlteredGlyphEffect;

  constructor({ name, primary, effect, formula, altered }: GlyphEffectProps) {
    this.name = name;
    this.primary = primary ?? false;
    this.effect = effect;
    this.formula = formula;
    this.altered = altered;
  }
}
