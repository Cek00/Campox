import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsEnum,
    IsNumber,
    IsPositive,
    IsDateString,
} from 'class-validator';
import { PaymentType } from 'src/enum/paymentType.enum';
import { PaymentStatus } from 'src/enum/paymentStatus.enum';

export class CreatePaymentDto {
    @ApiProperty({
        description: 'Monto del pago',
        example: 150000.50,
    })
    @IsNotEmpty({ message: 'El monto es requerido' })
    @IsNumber({}, { message: 'El monto debe ser un número' })
    @IsPositive({ message: 'El monto debe ser mayor que cero' })
    amount: number;

    @ApiProperty({
        description: 'Método de pago',
        example: 'credit_card',
        enum: PaymentType,
    })
    @IsNotEmpty({ message: 'El método de pago es requerido' })
    @IsEnum(PaymentType, {
        message: 'El método de pago no es válido',
    })
    paymentmethod: PaymentType;

    @ApiProperty({
        description: 'Estado del pago',
        example: 'completed',
        enum: PaymentStatus,
    })
    @IsNotEmpty({ message: 'El estado del pago es requerido' })
    @IsEnum(PaymentStatus, {
        message: 'El estado no es válido',
    })
    status: PaymentStatus;

    @ApiProperty({
        description: 'Fecha del pago (ISO string)',
        example: '2025-03-15T10:30:00Z',
    })
    @IsNotEmpty({ message: 'La fecha del pago es requerida' })
    @IsDateString({}, { message: 'La fecha debe estar en formato ISO válido' })
    paymentDate: Date;
}
