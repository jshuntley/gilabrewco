import type { Brew } from '../types/brew';

export async function getAllBrews(): Promise<Brew[]> {
  const brewFiles = import.meta.glob('../content/brews/*.json', { eager: true });
  
  console.log("getAllBrews - Available brews:", Object.keys(brewFiles));
  
  const brews = Object.values(brewFiles).map((brew) => {
    const brewData = brew as { default: Brew };
    return {
      ...brewData.default,
      brewfatherId: brewData.default.brewfatherId || undefined
    };
  });

  return brews;
}