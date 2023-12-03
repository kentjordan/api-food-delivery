import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseUUIDPipe, UseGuards, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDto, updateUserSchema } from './dto/update-user.dto';
import { BodyValidation } from 'src/pipes/body_validation.pipe';
import { JWTGuard } from 'src/guards/jwt.guard';
import Role from 'src/decorators/role.decorator';
import Roles from 'src/enums/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body(new BodyValidation(createUserSchema)) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @Role([Roles.ADMIN])
  @UseGuards(JWTGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new BodyValidation(updateUserSchema)) updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get()
  @Role([Roles.ADMIN])
  @UseGuards(JWTGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  @Role([Roles.ADMIN])
  @UseGuards(JWTGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
