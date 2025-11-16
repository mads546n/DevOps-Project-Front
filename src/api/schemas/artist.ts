import { z } from "zod";
import { ArtItemSchema } from "./item";

export const ArtistSchema = z.object({
    id: z.union([z.string(), z.number()]),
    name: z.string(),
    items: z.array(ArtItemSchema),
});

export type ArtistDTO = z.infer<typeof ArtistSchema>;
