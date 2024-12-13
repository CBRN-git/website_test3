// src/content/config.ts

import { z, defineCollection } from 'astro:content';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

// Define the 'talks' collection with the required schema
const talksCollection = defineCollection({
  schema: z.object({
    // Mandatory Fields for Talks
    titlePresentation: z.string(), // Required for talks
    date: z.date(), // Required and parsed as a date
    speaker: z.string(), // Required
    biography: z.string(), // Required
    abstract: z.string(), // Required

    // Optional Fields
    papers: z
      .array(
        z.object({
          titlePaper: z.string(), // Paper title
          url: z.string().url().optional(), // Optional URL
        })
      )
      .optional(),

    // Generic Optional Fields (if needed)
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    metadata: metadataDefinition(),
  }),
});

export const collections = {
  talks: talksCollection, // Register the 'talks' collection
};
