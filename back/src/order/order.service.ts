import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) {}

    getAllOrdersService() {
        return this.orderRepository.getAllOrdersRepository();
    }

    async getOrderByIdService(uuid: string) {
        const order = await this.orderRepository.getOrderByIdRepository(uuid);
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    createOrderService(dto: CreateOrderDto) {
        return this.orderRepository.createOrderRepository(dto);
    }

    async updateOrderService(uuid: string, dto: UpdateOrderDto) {
        await this.getOrderByIdService(uuid);
        return this.orderRepository.updateOrderRepository(uuid, dto);
    }

    async deleteOrderService(uuid: string) {
        await this.getOrderByIdService(uuid);
        return this.orderRepository.deleteOrderRepository(uuid);
    }
}
