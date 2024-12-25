// Status groupings
export const STATUS_GROUPS = {
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