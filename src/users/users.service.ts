import { BadRequestException, Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaError } from 'prisma-error-enum';
import { JwtService } from 'src/jwt/jwt.service';
import * as argon2 from 'argon2'

@Injectable()
export class UsersService {

  constructor(
    private readonly db: DatabaseService,
    private readonly jwt: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {

    try {

      const hashedPassword = await argon2.hash(createUserDto.password)

      const userCreated = await this.db.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword
        },
      });

      const accessToken = this.jwt.makeAccessToken(userCreated.id, userCreated.role as string)
      const refreshToken = this.jwt.makeRefreshToken(accessToken);

      return {
        accessToken,
        refreshToken
      }

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaError.UniqueConstraintViolation:
            throw new UnprocessableEntityException('Email is not available.');
          default:
            throw new BadRequestException();
        }
      }
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
