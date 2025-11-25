import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './createPayment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}