import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      author: z.string().default('Chittapriya Mondal'),
      description: z.string(),
      tags: z.array(z.string()).default([]),
      cover: image(),
      coverFit: z.enum(['cover', 'contain']).default('cover'),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
