import { Reflector } from "@nestjs/core";

const Role = Reflector.createDecorator<string[]>();

export default Role;