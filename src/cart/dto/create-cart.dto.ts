import { z } from 'zod';

export const createCartScheme = z.object({
    cart_item_instruction_id: z.string().optional(),
    product_extra_id: z.string().uuid().optional(),
    product_id: z.string().uuid(),
    user_id: z.string().uuid(),
    store_id: z.string().uuid(),
}).strict();

export type CreateCartDto = z.infer<typeof createCartScheme>;