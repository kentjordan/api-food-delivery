import { z } from 'zod';

export const createCartScheme = z.object({
    item_instruction: z.string().optional(),
    product_extra_id: z.string().uuid().optional(),
    product_id: z.string().uuid(),
    user_id: z.string().uuid(),
    store_id: z.string().uuid(),
}).strict();

export type CreateCartDto = z.infer<typeof createCartScheme>;