import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from 'src/entities/order-detail.entity';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

export class OrderDetailRepository {
    constructor(
        @InjectRepository(OrderDetailEntity)
        private readonly orderDetailDB: Repository<OrderDetailEntity>,
    ) {}

    async getByIdRepository(uuid: string) {
        return await this.orderDetailDB.findOne({
            where: { uuid },
            relations: ['order', 'product'],
        });
    }

    async createRepository(data: CreateOrderDetailDto) {
        const newOrderDetail = this.orderDetailDB.create({
            ...data,
            order: { uuid: data.uuidOrder },
            product: { uuid: data.uuidProduct },
        });
        await this.orderDetailDB.save(newOrderDetail);
        return { message: 'Detalle pedido creado exitosamente' };
    }

    async updateRepository(
        orderDetailExiting: OrderDetailEntity,
        data: UpdateOrderDetailDto,
    ) {
        if (data.quantity) {
            orderDetailExiting.quantity = data.quantity;
        }

        if (data.subtotal) {
            orderDetailExiting.subtotal = data.subtotal;
        }

        await this.orderDetailDB.save(orderDetailExiting);
        return { message: 'Detalle de pedido actualizado con exito.' };
    }

    async deleteRepository(uuid: string) {
        await this.orderDetailDB.delete(uuid);
        return { message: 'Detalle de pedido eliminado con exito.' };
    }
}
