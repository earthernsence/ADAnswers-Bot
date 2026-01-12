export type AlteredGlyphEffect = {
  name: string;
  effect: string;
  formula: string;
};

export type GlyphEffect = {
  name: string;
  primary: boolean;
  effect: string;
  formula: string;
  altered?: AlteredGlyphEffect;
};
