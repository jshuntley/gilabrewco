import type { CollectionEntry } from "astro:content";

// Status groupings
export const STATUS_GROUPS = {
  tapped: ["on tap", "kegged", "carbonating", "conditioning", "gone"],
  brewing: ["fermenting", "soft crashing", "crashing", "secondary fermentation"],
  upcoming: ["upcoming", "waiting for ingredients"]
} as const;

// Create a union type of all possible status values
export type BrewStatus = (typeof STATUS_GROUPS.tapped)[number] | 
                        (typeof STATUS_GROUPS.brewing)[number] | 
                        (typeof STATUS_GROUPS.upcoming)[number];

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
}

export type BrewEntry = CollectionEntry<'brews'>; 