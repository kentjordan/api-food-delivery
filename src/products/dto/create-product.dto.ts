import { z } from 'zod';

export const createProductSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    variety: z.string().optional(),
    price: z.number(),
    store_id: z.string()
}).strict();

export type CreateProductDto = z.infer<typeof createProductSchema>;