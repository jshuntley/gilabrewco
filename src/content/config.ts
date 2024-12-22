import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    image: z.string().url().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});

const brewsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    style: z.string(),
    abv: z.number(),
    status: z.enum([
      'upcoming',
      'waiting for ingredients',
      'fermenting',
      'soft crashing',
      'crashing',
      'secondary fermentation',
      'conditioning',
      'carbonating',
      'kegged',
      'on tap',
      'gone'
    ]),
    date: z.coerce.date().or(z.string()),
    details: z.string(),
    notes: z.string().optional()
  })
});

export const collections = {
  brews: brewsCollection,
  blog: blogCollection,
}; 