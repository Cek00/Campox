import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly userRepository: UsersRepository,
    ) {}

    getAllOrdersService() {
        return this.orderRepository.getAllOrdersRepository();
    }

    async getOrderByIdService(uuid: string) {
        const order = await this.orderRepository.getOrderByIdRepository(uuid);
        if (!order) {
            throw new NotFoundException('Este pedido no existe');
        }
        return order;
    }

    async createOrderService(data: CreateOrderDto) {
        const userExisting = await this.userRepository.getUserByIDRepository(
            data.uuidUser,
        );
        if (!userExisting) {
            throw new NotFoundException('Este usuario no existe');
        }

        return this.orderRepository.createOrderRepository(data);
    }

    async updateOrderService(data: UpdateOrderDto) {
        const orderExiting = await this.getOrderByIdService(data.uuid);
        return this.orderRepository.updateOrderRepository(orderExiting, data);
    }

    async deleteOrderService(uuid: string) {
        await this.getOrderByIdService(uuid);
        return this.orderRepository.deleteOrderRepository(uuid);
    }
}
