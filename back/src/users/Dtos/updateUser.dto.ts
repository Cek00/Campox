import { PartialType } from '@nestjs/mapped-types';
import { CreatedUserDto } from './createUrser.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateUserDto extends PartialType(CreatedUserDto) {
    @IsNotEmpty({ message: 'El id del usuario es obligatorio' })
    @IsUUID('4', { message: 'El id del usuario debe tener un formato UUID' })
    uuid: string;
}
