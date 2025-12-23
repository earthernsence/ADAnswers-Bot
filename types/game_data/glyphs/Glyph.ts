import type { GlyphEffect } from "./GlyphEffect";

export type Glyph = {
  name: string,
  effects: Record<string, GlyphEffect>,
  sacrifice?: {
    effect: string,
    formula: string
  }
};