import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AddToCartModule } from './add_to_cart/add_to_cart.module';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [UsersModule, ProductsModule, AddToCartModule, CartModule, CheckoutModule, OrdersModule, PaymentModule, AnalyticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
