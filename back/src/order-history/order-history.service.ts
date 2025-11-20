import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderHistoryRepository } from './order-history.repository';
import { CreateOrderHistoryDto } from './dto/create-order-history.dto';
import { UpdateOrderHistoryDto } from './dto/update-order-history.dto';
import { OrderRepository } from 'src/order/order.repository';

@Injectable()
export class OrderHistoryService {
    constructor(
        private readonly orderHistoryRepository: OrderHistoryRepository,
        private readonly orderRepository: OrderRepository,
    ) {}

    async getByIdService(uuid: string) {
        const found = await this.orderHistoryRepository.getByIdRepository(uuid);
        if (!found)
            throw new NotFoundException('Historial de pedido no existe');
        return found;
    }

    async createService(data: CreateOrderHistoryDto) {
        const orderExisting = await this.orderRepository.getOrderByIdRepository(
            data.uuidOrder,
        );
        if (!orderExisting) {
            throw new NotFoundException('Este pedido no existe');
        }

        return this.orderHistoryRepository.createRepository(data);
    }

    async updateService(data: UpdateOrderHistoryDto) {
        const orderHistoryExiting = await this.getByIdService(data.uuid);
        return await this.orderHistoryRepository.updateRepository(
            orderHistoryExiting,
            data,
        );
    }

    async deleteService(uuid: string) {
        await this.getByIdService(uuid);
        return await this.orderHistoryRepository.deleteRepository(uuid);
    }
}
