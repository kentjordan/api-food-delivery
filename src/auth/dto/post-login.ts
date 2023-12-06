import { z } from 'zod';

export const postLoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
}).strict();

export type PostLoginDto = z.infer<typeof postLoginSchema>;
