import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StoresService {

  constructor(private readonly db: DatabaseService) { }

  async create(createStoreDto: CreateStoreDto) {

    const createdStore = await this.db.store.create({
      data: createStoreDto
    });

    return {
      created_store: createdStore,
      message: 'Store has been successfully CREATED.',
      statusCode: HttpStatus.OK
    }
  }

  async findAll() {

    const stores = await this.db.store.findMany();

    return {
      stores,
      message: "Stores has been successully FETCHED.",
      statusCode: HttpStatus.OK
    }
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {

    const updatedStore = await this.db.store.update({
      where: { id },
      data: {
        ...updateStoreDto,
        updated_at: new Date().toISOString()
      }
    });

    return {
      updatedStore: updatedStore,
      message: 'Store has been successfully UPDATED.',
      statusCode: HttpStatus.OK
    }
  }

  async remove(id: string) {

    const deletedStore = await this.db.store.delete({
      where: { id }
    });

    return {
      deletedStore,
      message: 'Store has been successfully DELETED.',
      statusCode: HttpStatus.OK
    }
  }
}
