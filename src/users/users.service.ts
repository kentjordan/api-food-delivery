import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.db.user.update({
        data: updateUserDto,
        where: {
          id
        }
      });

      return {
        updated_user: {
          ...updatedUser,
          password: undefined
        },
        message: "User has been successfully updated.",
        statusCode: HttpStatus.OK
      }

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaError.RecordsNotFound:
            throw new NotFoundException('Record to update was not found.');
          default:
            throw new BadRequestException();
        }
      }
      throw new BadRequestException();
    }
  }

  async remove(id: string) {

    try {
      const deletedUser = await this.db.user.delete({ where: { id } });

      return {
        deleted_user: {
          ...deletedUser,
          password: undefined
        },
        message: "User has been successfully deleted.",
        statusCode: HttpStatus.OK
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaError.RecordsNotFound:
            throw new NotFoundException('Record to delete was not found.');
          default:
            throw new BadRequestException();
        }
      }
      throw new BadRequestException();
    }
  }

  async findAll() {
    const users = await this.db.user.findMany();
    return users.map((user, index) => {
      return {
        ...user,
        password: undefined
      };
    });

  }
}
