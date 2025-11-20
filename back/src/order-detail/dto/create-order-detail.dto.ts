import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDetailDto {
    @ApiProperty({ description: 'Cantidad', example: 2 })
    @IsNotEmpty({ message: 'La cantidad es requerida' })
    @IsNumber({}, { message: 'La cantidad debe ser un numero' })
    @IsPositive({ message: 'La cantidad debe ser mayor que cero' })
    quantity: number;

    @ApiProperty({
        description: 'Subtotal del pedido',
        example: 20000,
    })
    @IsNotEmpty({ message: 'El subtotal es requerido' })
    @IsNumber({}, { message: 'El subtotal debe ser un numero' })
    @IsPositive({ message: 'El subtotal debe ser mayor que cero' })
    subtotal: number;

    @ApiProperty({ description: 'UUID del pedido', example: '' })
    @IsNotEmpty({ message: 'El ID del pedido es requerido' })
    @IsUUID('4', { message: 'El ID del pedido debe ser un UUID válido' })
    @IsUUID()
    uuidOrder: string;

    @ApiProperty({ description: 'UUID del producto', example: '' })
    @IsNotEmpty({ message: 'El ID del producto es requerido' })
    @IsUUID('4', { message: 'El ID del producto debe ser un UUID válido' })
    @IsUUID()
    uuidProduct: string;
}
