import { z } from "zod";

export const createUserSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string(),
    city: z.string(),
    barangay: z.string(),
    gender: z.string().optional(),
    role: z.enum(['DELIVERY', 'CUSTOMER', 'SELLER'])
}).strict();

export type CreateUserDto = z.infer<typeof createUserSchema>;
