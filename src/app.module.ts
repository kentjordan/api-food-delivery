import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './jwt/jwt.module';
import { StoresModule } from './stores/stores.module';
import { AuthModule } from './auth/auth.module';
import { Argon2Module } from './argon2/argon2.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CartModule,
    CheckoutModule,
    OrdersModule,
    PaymentModule,
    AnalyticsModule,
    DatabaseModule,
    JwtModule,
    StoresModule,
    AuthModule,
    Argon2Module
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
