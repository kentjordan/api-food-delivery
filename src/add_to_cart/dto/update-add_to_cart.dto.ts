import { PartialType } from '@nestjs/mapped-types';
import { CreateAddToCartDto } from './create-add_to_cart.dto';

export class UpdateAddToCartDto extends PartialType(CreateAddToCartDto) {}