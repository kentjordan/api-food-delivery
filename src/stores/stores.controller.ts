import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto, createStoreSchema } from './dto/create-store.dto';
import { UpdateStoreDto, updateStoreSchema } from './dto/update-store.dto';
import { BodyValidation } from 'src/pipes/body_validation.pipe';
import { JWTGuard } from 'src/guards/jwt.guard';
import Role from 'src/decorators/role.decorator';
import Roles from 'src/enums/roles.enum';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) { }

  @Post()
  @Role([Roles.SYSTEM_ADMIN])
  @UseGuards(JWTGuard)
  create(@Body(new BodyValidation(createStoreSchema)) createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  @Role([Roles.SYSTEM_ADMIN])
  @UseGuards(JWTGuard)
  findAll() {
    return this.storesService.findAll();
  }

  @Patch(':id')
  @Role([Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN])
  @UseGuards(JWTGuard)
  update(@Param('id', ParseUUIDPipe) id: string,
    @Body(new BodyValidation(updateStoreSchema)) updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  @Role([Roles.SYSTEM_ADMIN])
  @UseGuards(JWTGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.storesService.remove(id);
  }

}
