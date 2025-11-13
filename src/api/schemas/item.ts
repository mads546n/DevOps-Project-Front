import { z } from "zod";

export const ArtItemSchema = z.object({
    id: z.union([z.string(), z.number()]),
    imageUrl: z.string().url().optional(),
    title: z.string(),
    price: z.number(),
});

export type ArtItemDTO = z.infer<typeof ArtItemSchema>;
