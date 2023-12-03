import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaError } from "prisma-error-enum";
import { Response } from "express";

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {

    private response({ res, message, error, statusCode }: { res: Response, message: string, error: string, statusCode: number }) {
        res.status(statusCode).json({
            message,
            error,
            statusCode
        });
    }

    async catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {

        const res: Response = await host.switchToHttp().getResponse();

        switch (exception.code) {
            case PrismaError.ForeignConstraintViolation:
                this.response({
                    res,
                    message: 'Given id was not found on other resource.',
                    error: "Not found",
                    statusCode: HttpStatus.NOT_FOUND
                });
                break;

            case PrismaError.RecordsNotFound:
                this.response({
                    res,
                    message: 'Record was not found.',
                    error: "Not found",
                    statusCode: HttpStatus.NOT_FOUND
                });
                break;

            case PrismaError.UniqueConstraintViolation:
                this.response({
                    res,
                    message: 'Resource wanted to be added is not available.',
                    error: "Unprocessable Entity",
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY
                });
                break;

            default:
                this.response({
                    res,
                    message: 'Something went wrong. Please contact the developer.',
                    error: "Internal Server Error",
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR
                });
        }
    }

}