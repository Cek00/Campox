import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({
        description: 'UUID del pedido a actualizar',
        example: '5ea486f8-6e51-4f5b-8e74-9b53e28b2b91',
        format: 'uuid',
    })
    @IsNotEmpty({ message: 'El id del pedido es obligatorio' })
    @IsUUID('4', { message: 'El id del pedido debe tener un formato UUID' })
    uuid: string;
}
