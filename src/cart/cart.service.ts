import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DatabaseService } from 'src/database/database.service';
import { DeleteCartItemDto } from './dto/delete-cart-item.dto';

@Injectable()
export class CartService {

  constructor(private readonly db: DatabaseService) { }

  async create(createCartDto: CreateCartDto) {

    const cartItem = await this.db.cart.create({
      data: createCartDto
    });

    return {
      cartItem,
      message: "Product has been successfully ADDED into cart.",
      statusCode: HttpStatus.OK
    }
  }

  async findUserCart(user_id: string) {

    const userCart = await this.db.$queryRaw`
        SELECT product_id, A.store_id, user_id, B.title, B.description, B.variety, item_instruction, B.price, qty, B.price * qty AS total
        FROM
            (SELECT product_id, store_id, user_id, item_instruction, COUNT(product_id) AS qty
            FROM cart
            WHERE user_id = ${user_id}
            GROUP BY item_instruction, product_id, store_id, user_id) AS A
        JOIN product AS B
        ON A.product_id = B.id
        `

    return {
      userCart,
      statusCode: HttpStatus.OK
    }
  }

  async remove(user_id: string, body: DeleteCartItemDto) {

    await this.db.$queryRaw`
      DELETE FROM cart
      WHERE user_id = ${user_id} AND
            product_id = ${body.product_id} AND
            store_id = ${body.store_id}
      LIMIT 1;
    `

    return {
      message: "Cart item has been successfully DELETED.",
      statusCode: HttpStatus.OK
    }
  }

  update(user_id: string, item_id: string, updateCartDto: UpdateCartDto) {

  }

}
