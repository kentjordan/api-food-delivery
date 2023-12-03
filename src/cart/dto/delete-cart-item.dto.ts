import { z } from 'zod';

export const deleteCartItemScheme = z.object({
    product_id: z.string().uuid(),
    store_id: z.string().uuid()
}).strict();

export type DeleteCartItemDto = z.infer<typeof deleteCartItemScheme>;