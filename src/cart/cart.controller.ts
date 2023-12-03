import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, createCartScheme } from './dto/create-cart.dto';
import { UpdateCartDto, updateCartSchema } from './dto/update-cart.dto';
import { BodyValidation } from 'src/pipes/body_validation.pipe';
import { PrismaExceptionFilter } from 'src/exceptions/PrismaException.filter';
import { DeleteCartItemDto, deleteCartItemScheme } from './dto/delete-cart-item.dto';
import { JWTGuard } from 'src/guards/jwt.guard';
import Role from 'src/decorators/role.decorator';
import Roles from 'src/enums/roles.enum';

@Controller('cart')
@UseFilters(PrismaExceptionFilter)
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  @Role([Roles.SYSTEM_ADMIN, Roles.CUSTOMER])
  @UseGuards(JWTGuard)
  create(@Body(new BodyValidation(createCartScheme)) createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get(':user_id')
  @Role([Roles.SYSTEM_ADMIN, Roles.CUSTOMER])
  @UseGuards(JWTGuard)
  findUserCart(@Param('user_id', ParseUUIDPipe) user_id: string) {
    return this.cartService.findUserCart(user_id);
  }

  @Patch(':user_id/item/:item_id')
  @Role([Roles.SYSTEM_ADMIN, Roles.CUSTOMER])
  @UseGuards(JWTGuard)
  updateInstruction(
    @Param('user_id', ParseUUIDPipe) user_id: string,
    @Param('item_id', ParseUUIDPipe) item_id: string,
    @Body(new BodyValidation(updateCartSchema)) updateCartDto: UpdateCartDto) {
    return this.cartService.update(user_id, item_id, updateCartDto);
  }

  @Delete(':user_id/item')
  @Role([Roles.SYSTEM_ADMIN, Roles.CUSTOMER])
  @UseGuards(JWTGuard)
  remove(
    @Param('user_id', ParseUUIDPipe) user_id: string,
    @Body(new BodyValidation(deleteCartItemScheme)) body: DeleteCartItemDto
  ) {
    return this.cartService.remove(user_id, body);
  }
}
