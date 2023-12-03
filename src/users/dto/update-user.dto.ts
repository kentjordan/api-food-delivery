import { z } from "zod";

export const updateUserSchema = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    city: z.string().optional(),
    barangay: z.string().optional(),
    gender: z.string().optional(),
    role: z.enum(['DELIVERY', 'CUSTOMER', 'SELLER', 'ADMIN']).optional()
}).strict();

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
