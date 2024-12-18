export interface Brew {
  name: string;
  description: string;
  style: string;
  abv: number;
  status: 'tapped' | 'brewing' | 'upcoming';
  date: string;
  details: string;
  notes?: string;
} 