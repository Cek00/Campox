import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

export class OrderRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderDB: Repository<OrderEntity>,
    ) {}

    getAllOrdersRepository() {
        return this.orderDB.find({ relations: ['detail', 'history'] });
    }

    async getOrderByIdRepository(uuid: string) {
        return await this.orderDB.findOne({
            where: { uuid },
            relations: ['user', 'detail', 'history'],
        });
    }

    async createOrderRepository(data: CreateOrderDto) {
        const order = this.orderDB.create({
            ...data,
            user: { uuid: data.uuidUser },
        });
        await this.orderDB.save(order);
        return { message: 'Pedido creado exitosamente' };
    }

    async updateOrderRepository(
        orderExiting: OrderEntity,
        data: UpdateOrderDto,
    ) {
        if (data.status) {
            orderExiting.status = data.status;
        }

        if (data.createdAt) {
            orderExiting.createdAt = data.createdAt;
        }

        if (data.estimatedTime) {
            orderExiting.estimatedTime = data.estimatedTime;
        }

        if (data.total) {
            orderExiting.total = data.total;
        }

        await this.orderDB.save(orderExiting);
        return { message: 'Pedido actualizado con exito.' };
    }

    async deleteOrderRepository(uuid: string) {
        await this.orderDB.delete(uuid);
        return { message: 'Pedido eliminado con exito.' };
    }
}
