import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './createPayment.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    @ApiProperty({
        description: 'UUID del pago a actualizar',
        example: 'd4fbd461-5c3c-4c32-8c3c-c897b17c1b58',
        format: 'uuid',
    })
    @IsNotEmpty({ message: 'El id del pago es obligatorio' })
    @IsUUID('4', { message: 'El id debe tener un formato UUID' })
    uuid: string;
}
