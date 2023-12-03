
import { z } from 'zod';

export const createStoreSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    city: z.string(),
    barangay: z.string(),
    street: z.string().optional(),
    store_type: z.string().optional(),
    cert_number: z.number()
}).strict();

export type CreateStoreDto = z.infer<typeof createStoreSchema>;
