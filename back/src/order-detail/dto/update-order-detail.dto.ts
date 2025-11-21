import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDetailDto } from './create-order-detail.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {
    @ApiProperty({
        description: 'UUID del detalle de pedido a actualizar',
        example: '',
        format: 'uuid',
    })
    @IsNotEmpty({ message: 'El id del detalle de pedido es obligatorio' })
    @IsUUID('4', {
        message: 'El id del detalle de pedido debe tener un formato UUID',
    })
    uuid: string;
}
