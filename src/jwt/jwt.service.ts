import { Injectable } from '@nestjs/common';
import { JwtService as JwtServiceCore } from '@nestjs/jwt';

@Injectable()
export class JwtService extends JwtServiceCore {

    private ACCESS_TOKEN_EXPIRY = '8h';
    private REFRESH_TOKEN_EXPIRY = '30d';

    constructor() {
        super();
    }

    makeAccessToken(id: string, role: string) {
        return this.sign({ id, role }, {
            secret: process.env.SECRET_KEY,
            expiresIn: this.ACCESS_TOKEN_EXPIRY
        });
    }

    makeRefreshToken(access_token: string) {
        return this.sign({ access_token }, {
            secret: process.env.SECRET_KEY,
            expiresIn: this.REFRESH_TOKEN_EXPIRY
        });
    }

}
