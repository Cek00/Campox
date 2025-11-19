import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './Dtos/createPayment.dto';
import { UpdatePaymentDto } from './Dtos/updatePayment.dto';

@Injectable()
export class PaymentRepository {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentDB: Repository<PaymentEntity>,
    ) {}

    async getAllPaymentsRepository() {
        return await this.paymentDB.find();
    }

    async getPaymentByIdRepository(uuid: string) {
        return await this.paymentDB.findOne({ where: { uuid } });
    }

    async createPaymentRepository(data: CreatePaymentDto) {
        const newPayment = this.paymentDB.create({
            amount: data.amount,
            paymentmethod: data.paymentmethod,
            status: data.status,
            paymentDate: data.paymentDate,
        });

        await this.paymentDB.save(newPayment);

        return { message: 'El pago ha sido creado exitosamente.' };
    }

    async updatePaymentRepository(paymentExisting: PaymentEntity, data: UpdatePaymentDto) {
        if (data.amount) paymentExisting.amount = data.amount;
        if (data.paymentmethod) paymentExisting.paymentmethod = data.paymentmethod;
        if (data.status) paymentExisting.status = data.status;
        if (data.paymentDate) paymentExisting.paymentDate = data.paymentDate;

        await this.paymentDB.save(paymentExisting);

        return { message: 'Pago actualizado correctamente.' };
    }

    async deletePaymentRepository(paymentExisting: PaymentEntity) {
        await this.paymentDB.remove(paymentExisting);
        return { message: 'Pago eliminado exitosamente.' };
    }
}
