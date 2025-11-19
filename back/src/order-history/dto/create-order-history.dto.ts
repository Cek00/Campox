import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/entities/order-history.entity';


export class CreateOrderHistoryDto {
  @ApiProperty({ description: 'UUID del pedido', example: 'uuid-order' })
  @IsUUID()
  orderUuid: string;

  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ description: 'Nota opcional', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'UUID del usuario que cambia el estado', required: false })
  @IsOptional()
  @IsUUID()
  changedByUuid?: string;
}
