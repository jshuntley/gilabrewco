// Status groupings
export const STATUS_GROUPS = {
<<<<<<< HEAD
  tapped: ["on tap", "kegged", "carbonating", "conditioning", "gone"],
  brewing: ["fermenting", "dry hopping", "soft crashing", "crashing", "secondary fermentation"],
  upcoming: ["upcoming", "waiting for ingredients"]
=======
  tapped: ['on tap', 'kegged', 'gone'] as const,
  brewing: [
    'fermenting',
    'dry hopping',
    'diacetyl rest',
    'soft crashing',
    'crashing',
    'secondary fermentation',
    'conditioning',
    'carbonating'
  ] as const,
  upcoming: ['upcoming', 'waiting for ingredients'] as const,
>>>>>>> ef45d6ea1720a6d05eacef81e6a0343e786885c3
} as const;

// Create a union type of all possible status values
export type BrewStatus = 
  | 'upcoming'
  | 'waiting for ingredients'
  | 'fermenting'
  | 'dry hopping'
  | 'diacetyl rest'
  | 'soft crashing'
  | 'crashing'
  | 'secondary fermentation'
  | 'conditioning'
  | 'carbonating'
  | 'kegged'
  | 'on tap'
  | 'gone';

// Define the Brew interface
export interface Brew {
  name: string;
  description: string;
  style: string;
  abv: number;
  status: BrewStatus;
  date: string;
  details: string;
  notes?: string;
  brewfatherId?: string;
}

export type BrewsData = {
  [key: string]: Brew;
}; 