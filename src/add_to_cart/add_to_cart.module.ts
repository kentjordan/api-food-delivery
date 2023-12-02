import { Module } from '@nestjs/common';
import { AddToCartService } from './add_to_cart.service';
import { AddToCartController } from './add_to_cart.controller';

@Module({
  controllers: [AddToCartController],
  providers: [AddToCartService],
})
export class AddToCartModule {}
