import { ArgumentMetadata, BadRequestException, ParseUUIDPipe, PipeTransform } from "@nestjs/common";
import { ZodAny, ZodError, ZodObject, ZodRawShape, infer } from "zod";

export class BodyValidation implements PipeTransform {

    constructor(private readonly schema: ZodObject<ZodRawShape>) { }

    transform(value: typeof this.schema, metadata: ArgumentMetadata) {

        try {
            return this.schema.parse(value);
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                throw new BadRequestException(error);
            }
        }

    }

}