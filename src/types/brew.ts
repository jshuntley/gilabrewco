export interface Brew {
  name: string;
  style: string;
  abv: number;
  description: string;
  notes?: string;
  details: string;
  date: string;
  status: "upcoming" | "waiting for ingredients" | // Upcoming phases
         "fermenting" | "soft crashing" | "crashing" | "secondary fermentation" | // brewing phases
         "conditioning" | "carbonating" | "kegged" | "on tap" | "gone"; // conditioning phases
} 