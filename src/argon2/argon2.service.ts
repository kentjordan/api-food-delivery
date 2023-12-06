import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class Argon2Service {

    getArgon2() {
        return argon
    }

}
