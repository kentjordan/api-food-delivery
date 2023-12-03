import { BadRequestException, HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {

  constructor(private readonly db: DatabaseService) { }

  async create(createProductDto: CreateProductDto) {

    const createdProduct = await this.db.product.create({
      data: createProductDto
    });

    return {
      createdProduct,
      message: 'Product has been successfully CREATED.',
      statusCode: HttpStatus.OK
    }

  }

  async findAllStoreProducts(store_id: string) {

    const storeProducts = await this.db.product.findMany({
      where: { store_id }
    });

    return {
      storeProducts,
      message: 'Store\'s products has been successfully FETCHED.',
      statusCode: HttpStatus.OK
    }

  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const updatedProduct = await this.db.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        updated_at: new Date().toISOString()
      }
    });

    return {
      updatedProduct,
      message: 'Product has been successfully UPDATED.',
      statusCode: HttpStatus.OK
    }

  }

  async remove(id: string) {

    const deletedProduct = await this.db.product.delete({
      where: { id }
    });

    return {
      deletedProduct,
      message: 'Product has been successfully DELETED.',
      statusCode: HttpStatus.OK
    }

  }
}
