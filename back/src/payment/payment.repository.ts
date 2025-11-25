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

  //metodo para obtener todos los pagos
  getAllPaymentsRepository() {
    return this.paymentDB.find();
  }

  //metodo para obtener el pago por su id
  getPaymentByIdRepository(uuid: string) {
    return this.paymentDB.findOne({ where: { uuid } });
  }

  //metodo para crear un nuevo pago
  async createPaymentRepository(data: CreatePaymentDto) {
    const newPayment = this.paymentDB.create({
      amount: data.amount,
      paymentmethod: data.paymentmethod,
      status: data.status,
      paymentDate: new Date(data.paymentDate),
    });

    await this.paymentDB.save(newPayment);

    return { message: 'El pago ha sido creado exitosamente.' };
  }

  //metodo para actualizar un pago
  async updatePaymentRepository(
    paymentExisting: PaymentEntity,
    data: UpdatePaymentDto,
  ) {
    if (data.amount !== undefined) paymentExisting.amount = data.amount;
    if (data.paymentmethod) paymentExisting.paymentmethod = data.paymentmethod;
    if (data.status) paymentExisting.status = data.status;
    if (data.paymentDate)
      paymentExisting.paymentDate = new Date(data.paymentDate);

    await this.paymentDB.save(paymentExisting);

    return { message: 'Pago actualizado correctamente.' };
  }

  //metodo para eliminar un pago
  async deletePaymentRepository(paymentExisting: PaymentEntity) {
    await this.paymentDB.remove(paymentExisting);
    return { message: 'Pago eliminado exitosamente.' };
  }
}