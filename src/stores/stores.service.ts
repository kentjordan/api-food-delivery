import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { DatabaseService } from 'src/database/database.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaError } from 'prisma-error-enum';

@Injectable()
export class StoresService {

  constructor(private readonly db: DatabaseService) { }

  async create(createStoreDto: CreateStoreDto) {

    try {
      const createdStore = await this.db.store.create({
        data: createStoreDto
      });

      return {
        created_store: createdStore,
        message: 'Store has been successfully CREATED.',
        statusCode: HttpStatus.OK
      }
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaError.UniqueConstraintViolation:
            throw new UnprocessableEntityException('Store certificate number has duplicate.');
          default:
            throw new BadRequestException();
        }
      }
    }
  }

  async findAll() {
    try {
      const stores = await this.db.store.findMany();
      return {
        stores,
        message: "Stores has been successully FETCHED.",
        statusCode: HttpStatus.OK
      }
    } catch (error: unknown) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {

    try {
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
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaError.RecordsNotFound:
            throw new NotFoundException('Record to UPDATE was not found.');
          default:
            throw new BadRequestException();
        }
      }
    }
  }

  async remove(id: string) {
    try {
      const deletedStore = await this.db.store.delete({
        where: { id }
      });

      return {
        deletedStore,
        message: 'Store has been successfully DELETED.',
        statusCode: HttpStatus.OK
      }
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaError.RecordsNotFound:
            throw new NotFoundException('Record to DELETE was not found.');
          default:
            throw new BadRequestException();
        }
      }
    }
  }
}
