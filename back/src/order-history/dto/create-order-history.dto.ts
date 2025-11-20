import { ApiProperty } from '@nestjs/swagger';
import {
    IsUUID,
    IsEnum,
    IsOptional,
    IsString,
    IsNotEmpty,
    Matches,
} from 'class-validator';
import { OrderStatusEnum } from 'src/enum/orderStatus.enum';

export class CreateOrderHistoryDto {
    @ApiProperty({
        description: 'Fecha del historial de pedido',
        example: '20/11/2025',
        pattern: 'dd/mm/aaaa',
    })
    @IsNotEmpty({ message: 'La fecha del historial de pedido es requerida' })
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
        message:
            'La fecha del historial de pedido debe estar en formato dd/mm/aaaa',
    })
    createdAt: Date;

    @ApiProperty({ enum: OrderStatusEnum })
    @IsNotEmpty({ message: 'El estado del historial de pedido es requerido' })
    @IsEnum(OrderStatusEnum, {
        message: 'El estado del historial de pedido no es válido',
    })
    status: OrderStatusEnum;

    @ApiProperty({
        description: 'Observaciones',
        required: false,
        example: 'Creacion de pedido',
    })
    @IsOptional()
    @IsString({ message: 'La observación debe ser un texto' })
    observation?: string;

    @ApiProperty({ description: 'UUID del pedido', example: 'uuid-order' })
    @IsNotEmpty({ message: 'El ID del pedido es requerido' })
    @IsUUID('4', { message: 'El ID del pedido debe ser un UUID válido' })
    @IsUUID()
    uuidOrder: string;
}
