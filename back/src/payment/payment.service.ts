import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './Dtos/createPayment.dto';
import { UpdatePaymentDto } from './Dtos/updatePayment.dto';

@Injectable()
export class PaymentService {
    constructor(private readonly paymentRepository: PaymentRepository) {}

    getAllPaymentsService() {
        return this.paymentRepository.getAllPaymentsRepository();
    }

    async getPaymentByIdService(uuid: string) {
        const paymentExisting = await this.paymentRepository.getPaymentByIdRepository(uuid);

        if (!paymentExisting) {
            throw new NotFoundException('El pago no existe');
        }

        return paymentExisting;
    }

    createPaymentService(data: CreatePaymentDto) {
        return this.paymentRepository.createPaymentRepository(data);
    }

    async updatePaymentService(data: UpdatePaymentDto) {
        const paymentExisting = await this.paymentRepository.getPaymentByIdRepository(
            data.uuid,
        );

        if (!paymentExisting) {
            throw new NotFoundException('El pago no existe');
        }

        return this.paymentRepository.updatePaymentRepository(paymentExisting, data);
    }

    async deletePaymentService(uuid: string) {
        const paymentExisting = await this.paymentRepository.getPaymentByIdRepository(
            uuid,
        );

        if (!paymentExisting) {
            throw new NotFoundException('El pago no existe');
        }

        return this.paymentRepository.deletePaymentRepository(paymentExisting);
    }
}
