import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDetailDto {
  @ApiProperty({ description: 'UUID del pedido (order)', example: 'uuid-order' })
  @IsUUID()
  orderUuid: string;

  @ApiProperty({ description: 'UUID del producto', example: 'uuid-product' })
  @IsUUID()
  productUuid: string;

  @ApiProperty({ description: 'Cantidad', example: 2 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Precio unitario', example: 100.5 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Nota opcional', required: false })
  @IsOptional()
  @IsString()
  note?: string;
}
