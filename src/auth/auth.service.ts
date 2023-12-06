import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PostLoginDto } from './dto/post-login';
import { JwtService } from 'src/jwt/jwt.service';
import { DatabaseService } from 'src/database/database.service';
import { Argon2Service } from 'src/argon2/argon2.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly db: DatabaseService,
        private readonly jwt: JwtService,
        private readonly argon2: Argon2Service
    ) { }

    async login(body: PostLoginDto) {

        const user = await this.db.user.findUnique({
            select: {
                id: true,
                role: true,
                password: true
            },
            where: {
                email: body.email
            }
        });

        if (user?.id && user.password && user.role) {
            const isPwdVerified = await this.argon2.getArgon2().verify(user?.password, body.password)

            if (isPwdVerified) {

                const accessToken = this.jwt.makeAccessToken(user.id, user?.role);
                const refreshToken = this.jwt.makeRefreshToken(accessToken);

                return {
                    accessToken,
                    refreshToken
                }

            }

            throw new BadRequestException('Invalid password.');
        }

        throw new NotFoundException('User doesn\'t exists.');
    }

}
