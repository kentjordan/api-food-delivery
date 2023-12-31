import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "src/jwt/jwt.service";
import { Request } from "express";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import Role from "src/decorators/role.decorator";
import { TokenExpiredError } from "@nestjs/jwt";

interface DecodedJWT {
    id: string,
    role: 'DELIVERY' | 'CUSTOMER' | 'SYSTEM_ADMIN' | 'STORE_EMPLOYEE' | 'STORE_ADMIN',
    iat: number,
    exp: number
}

@Injectable()
export class JWTGuard implements CanActivate {

    constructor(
        private readonly jwt: JwtService,
        private readonly reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const role = this.reflector.get(Role, context.getHandler());
        const req: Request = context.switchToHttp().getRequest();
        const token = req.headers.authorization?.split(" ").at(1);

        if (token) {

            try {
                const verifiedUserToken: DecodedJWT = this.jwt.verify(token, { secret: process.env.SECRET_KEY });

                if (!role.includes(verifiedUserToken.role)) {
                    throw new ForbiddenException('This resource is restricted to authorized administrators only.')
                }

                return true;

            } catch (error) {

                if (error instanceof TokenExpiredError) {
                    throw new ForbiddenException('Log in session was expired.');
                }
            }

        }
        throw new ForbiddenException('Unauthorized')
    }

}