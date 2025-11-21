import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderHistoryDto } from './create-order-history.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateOrderHistoryDto extends PartialType(CreateOrderHistoryDto) {
    @ApiProperty({
        description: 'UUID del historial de pedido a actualizar',
        example: '',
        format: 'uuid',
    })
    @IsNotEmpty({ message: 'El id del historial de pedido es obligatorio' })
    @IsUUID('4', {
        message: 'El id del historial de pedido debe tener un formato UUID',
    })
    uuid: string;
}
