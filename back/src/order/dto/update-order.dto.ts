import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({
        description: 'UUID del pedido a actualizar',
        example: '',
        format: 'uuid',
    })
    @IsNotEmpty({ message: 'El id del pedido es obligatorio' })
    @IsUUID('4', { message: 'El id del pedido debe tener un formato UUID' })
    uuid: string;
}
