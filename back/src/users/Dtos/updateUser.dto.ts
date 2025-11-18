import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatedUserDto } from './createUrser.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateUserDto extends PartialType(CreatedUserDto) {
    @ApiProperty({
        description: 'UUID del usuario a actualizar',
        example: 'f8a0bd2e-6866-4e96-9acb-3972e3901ad5',
        format: 'uuid',
    })
    @IsNotEmpty({ message: 'El id del usuario es obligatorio' })
    @IsUUID('4', { message: 'El id del usuario debe tener un formato UUID' })
    uuid: string;
}
