import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        try {
            await this.$connect();
        } catch (error) {
            throw new InternalServerErrorException('Can\'t reach the database server. Please contact the developers.')
        }
    }
}
