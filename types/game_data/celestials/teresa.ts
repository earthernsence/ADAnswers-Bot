type TeresaUnlock = {
  reward: string;
  requirement: number;
};

type PerkShopUpgrade = {
  name: string;
  cost: number;
  increment?: number;
  description: string;
  cap: string;
};

export type TeresaCelestial = {
  info: string;
  reality: {
    challenge: string;
    reward: string;
    formula: string;
  };
  mechanic: {
    reward: string;
    formula: string;
  };
  shop: Array<PerkShopUpgrade>;
  unlocks: Array<TeresaUnlock>;
};
