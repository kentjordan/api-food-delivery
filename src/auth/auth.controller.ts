import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PostLoginDto, postLoginSchema } from './dto/post-login';
import { PrismaExceptionFilter } from 'src/exceptions/PrismaException.filter';
import { BodyValidation } from 'src/pipes/body_validation.pipe';

@Controller('auth')
@UseFilters(PrismaExceptionFilter)
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body(new BodyValidation(postLoginSchema)) body: PostLoginDto) {
        return this.authService.login(body);
    }
}

