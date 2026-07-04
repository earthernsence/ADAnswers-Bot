type RaCelestialMemory = {
  level: number;
  effect: string;
  formula?: string;
};

export type RaCelestialMemories = {
  name: string;
  chunkGain: {
    currency: string;
    formula: string;
  };
  unlocks: Array<RaCelestialMemory>;
};

export type RaCelestials = "Teresa" | "Effarig" | "Nameless" | "V";

export type RaCelestial = {
  info: string;
  reality: string;
  memories: Record<RaCelestials, RaCelestialMemories>;
};
