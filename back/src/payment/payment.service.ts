import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { CreatePaymentDto } from './Dtos/createPayment.dto';
import { UpdatePaymentDto } from './Dtos/updatePayment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  //servicio para obtener todos los pagos
  getAllPaymentsService() {
    return this.paymentRepository.getAllPaymentsRepository();
  }

  //servicio para obtener un pago por su id
  async getPaymentByIdService(uuid: string) {
    const paymentExisting = await this.paymentRepository.getPaymentByIdRepository(
      uuid,
    );

    if (!paymentExisting) throw new NotFoundException('El pago no existe');

    return paymentExisting;
  }

  //servicio para crear un nuevo pago
  createPaymentService(data: CreatePaymentDto) {
    return this.paymentRepository.createPaymentRepository(data);
  }

  //servicio para actualizar un pago
  async updatePaymentService(uuid: string, data: UpdatePaymentDto) {
    const paymentExisting = await this.paymentRepository.getPaymentByIdRepository(
      uuid,
    );

    if (!paymentExisting) throw new NotFoundException('El pago no existe');

    return this.paymentRepository.updatePaymentRepository(
      paymentExisting,
      data,
    );
  }

  //servicio para eliminar un pago
  async deletePaymentService(uuid: string) {
    const paymentExisting = await this.paymentRepository.getPaymentByIdRepository(
      uuid,
    );

    if (!paymentExisting) throw new NotFoundException('El pago no existe');

    return this.paymentRepository.deletePaymentRepository(paymentExisting);
  }
}