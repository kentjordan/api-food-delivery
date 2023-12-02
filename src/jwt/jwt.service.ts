import { Injectable } from '@nestjs/common';
import { JwtService as JwtServiceCore } from '@nestjs/jwt';

@Injectable()
export class JwtService {

    private ACCESS_TOKEN_EXPIRY = '8h';
    private REFRESH_TOKEN_EXPIRY = '30d';

    constructor(private readonly jwt: JwtServiceCore) { }

    makeAccessToken(id: string, role: string) {
        return this.jwt.sign({ id, role }, { expiresIn: this.ACCESS_TOKEN_EXPIRY });
    }

    makeRefreshToken(access_token: string) {
        return this.jwt.sign({ access_token }, { expiresIn: this.REFRESH_TOKEN_EXPIRY });
    }

}
