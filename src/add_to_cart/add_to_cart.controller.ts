import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddToCartService } from './add_to_cart.service';
import { CreateAddToCartDto } from './dto/create-add_to_cart.dto';
import { UpdateAddToCartDto } from './dto/update-add_to_cart.dto';

@Controller('add-to-cart')
export class AddToCartController {
  constructor(private readonly addToCartService: AddToCartService) {}

  @Post()
  create(@Body() createAddToCartDto: CreateAddToCartDto) {
    return this.addToCartService.create(createAddToCartDto);
  }

  @Get()
  findAll() {
    return this.addToCartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addToCartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddToCartDto: UpdateAddToCartDto) {
    return this.addToCartService.update(+id, updateAddToCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addToCartService.remove(+id);
  }
}
