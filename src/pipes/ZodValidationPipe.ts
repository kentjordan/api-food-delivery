import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodError, ZodObject } from "zod";

export class ZodValidationPipe implements PipeTransform {

    constructor(private readonly schema: ZodObject<any>) { }

    transform(value: any, metadata: ArgumentMetadata) {
        try {
            this.schema.parse(value);
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                throw new BadRequestException(error);
            }
        }
        return value;
    }

}