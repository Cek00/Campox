import { InjectRepository } from '@nestjs/typeorm';
import { OrderHistoryEntity } from 'src/entities/order-history.entity';
import { Repository } from 'typeorm';
import { CreateOrderHistoryDto } from './dto/create-order-history.dto';
import { UpdateOrderHistoryDto } from './dto/update-order-history.dto';

export class OrderHistoryRepository {
    constructor(
        @InjectRepository(OrderHistoryEntity)
        private readonly orderHistoryDB: Repository<OrderHistoryEntity>,
    ) {}

    async getByIdRepository(uuid: string) {
        return await this.orderHistoryDB.findOne({
            where: { uuid },
            relations: ['order'],
        });
    }

    async createRepository(data: CreateOrderHistoryDto) {
        const newOrderHistory = this.orderHistoryDB.create({
            ...data,
            order: { uuid: data.uuidOrder },
        });
        await this.orderHistoryDB.save(newOrderHistory);
        return { message: 'Historial pedido creado exitosamente' };
    }

    async updateRepository(
        orderHistoryExiting: OrderHistoryEntity,
        data: UpdateOrderHistoryDto,
    ) {
        if (data.status) {
            orderHistoryExiting.status = data.status;
        }

        if (data.observation) {
            orderHistoryExiting.observation = data.observation;
        }

        await this.orderHistoryDB.save(orderHistoryExiting);
        return { message: 'Historial de pedido actualizado con exito.' };
    }

    async deleteRepository(uuid: string) {
        await this.orderHistoryDB.delete(uuid);
        return { message: 'Historial de pedido eliminado con exito.' };
    }
}
