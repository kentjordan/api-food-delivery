import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseFilters, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, createProductSchema } from './dto/create-product.dto';
import { UpdateProductDto, updateProductSchema } from './dto/update-product.dto';
import Role from 'src/decorators/role.decorator';
import Roles from 'src/enums/roles.enum';
import { JWTGuard } from 'src/guards/jwt.guard';
import { BodyValidation } from 'src/pipes/body_validation.pipe';
import { PrismaExceptionFilter } from 'src/exceptions/PrismaException.filter';

@Controller('products')
@UseFilters(PrismaExceptionFilter)
export class ProductsController {

  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @Role([Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN])
  @UseGuards(JWTGuard)
  create(@Body(new BodyValidation(createProductSchema)) createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @Role([Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN])
  @UseGuards(JWTGuard)
  update(@Param('id', ParseUUIDPipe) id: string,
    @Body(new BodyValidation(updateProductSchema)) updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Role([Roles.SYSTEM_ADMIN, Roles.STORE_ADMIN])
  @UseGuards(JWTGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }

  @Get(':store_id')
  findAllStoreProducts(@Param('store_id', ParseUUIDPipe) store_id: string) {
    return this.productsService.findAllStoreProducts(store_id);
  }
}
