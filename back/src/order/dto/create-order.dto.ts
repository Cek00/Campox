import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsUUID,
    Matches,
} from 'class-validator';
import { OrderStatusEnum } from 'src/enum/orderStatus.enum';

export class CreateOrderDto {
    @ApiProperty({ enum: OrderStatusEnum })
    @IsNotEmpty({ message: 'El estado del pedido es requerido' })
    @IsEnum(OrderStatusEnum, { message: 'El estado del pedido no es válido' })
    status: OrderStatusEnum;

    @ApiProperty({
        description: 'Fecha del pedido',
        example: '20/11/2025',
        pattern: 'dd/mm/aaaa',
    })
    @IsNotEmpty({ message: 'La fecha del pedido es requerida' })
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
        message: 'La fecha de pedido debe estar en formato dd/mm/aaaa',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Fecha estimada del pedido',
        example: '25/11/2025',
        pattern: 'dd/mm/aaaa',
    })
    @IsNotEmpty({ message: 'La fecha estimada del pedido es requerida' })
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
        message:
            'La fecha estimada del pedido debe estar en formato dd/mm/aaaa',
    })
    estimatedTime: Date;

    @ApiProperty({
        description: 'Total del pedido',
        example: 20000,
    })
    @IsNotEmpty({ message: 'El total del pedido es requerido' })
    @IsNumber({}, { message: 'El total debe ser un numero' })
    @IsPositive({ message: 'El total debe seer mayor que cero' })
    total: number;

    @ApiProperty({
        description: 'ID del usuario que realiza el pedido',
        example: '2387f1a9-0563-42cc-a39d-b89e05140d07',
    })
    @IsNotEmpty({ message: 'El ID del usuario es requerido' })
    @IsUUID('4', { message: 'El ID del usuario debe ser un UUID válido' })
    uuidUser: string;
}
