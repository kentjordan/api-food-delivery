import { createProductSchema } from "src/products/dto/create-product.dto"
import { z } from "zod"
import { createCartScheme } from "./create-cart.dto";

export const updateCartSchema = createCartScheme.partial();

export type UpdateCartDto = z.infer<typeof updateCartSchema>;