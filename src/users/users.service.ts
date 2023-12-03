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

  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const updatedUser = await this.db.user.update({
      data: {
        ...updateUserDto,
        updated_at: new Date().toISOString()
      },
      where: {
        id
      }
    });

    return {
      updatedUser: {
        ...updatedUser,
        password: undefined
      },
      message: "User has been successfully updated.",
      statusCode: HttpStatus.OK
    }

  }

  async remove(id: string) {

    const deletedUser = await this.db.user.delete({ where: { id } });

    return {
      deletedUser: {
        ...deletedUser,
        password: undefined
      },
      message: "User has been successfully deleted.",
      statusCode: HttpStatus.OK
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
