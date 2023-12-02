import { Global, Module } from '@nestjs/common';
import { JwtModule as JwtModuleCore } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

@Global()
@Module({
  imports: [
    JwtModuleCore.register({
      secret: process.env.SECRET_KEY
    }),
  ],
  providers: [JwtService],
  exports: [JwtService]
})
export class JwtModule { }
