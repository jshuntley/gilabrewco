import { defineCollection, z } from 'astro:content';

const brewsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    style: z.string(),
    abv: z.number(),
    status: z.enum(['tapped', 'brewing', 'upcoming']),
    date: z.string(),
    details: z.string(),
    notes: z.string().optional()
  })
});

export const collections = {
  brews: brewsCollection,
}; 