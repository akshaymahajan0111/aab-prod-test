import { z } from 'zod';
export const schemas = {
  home: z.object({
    "hero": z.object({
      "kicker": z.string(),
      "headline": z.string(),
      "subtitle": z.string(),
      "ctaPrimary": z.string(),
      "ctaSecondary": z.string()
    }),
    "stats": z.array(z.object({
      "id": z.string(),
      "label": z.string(),
      "value": z.union([z.number(), z.string()]),
      "suffix": z.string()
    })),
    "cards": z.object({
      "message": z.object({
        "kicker": z.string(),
        "title": z.string(),
        "subtitle": z.string()
      }),
      "vibe": z.object({
        "kicker": z.string(),
        "title": z.string()
      }),
      "motion": z.object({
        "kicker": z.string(),
        "hint": z.string()
      }),
      "origin": z.object({
        "kicker": z.string(),
        "title": z.string(),
        "body": z.string(),
        "highlight": z.string()
      })
    }),
    "footer": z.object({
      "line1": z.string(),
      "line2": z.string()
    })
  })
};
export type Schemas = typeof schemas;