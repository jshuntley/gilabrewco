import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});

const brews = defineCollection({
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
  'blog': blog,
  'brews': brews
}; 