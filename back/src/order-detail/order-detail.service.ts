import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDetailRepository } from './order-detail.repository';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { OrderRepository } from 'src/order/order.repository';
import { ProductRepository } from 'src/products/products.repository';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Injectable()
export class OrderDetailService {
    constructor(
        private readonly orderDetailRepository: OrderDetailRepository,
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductRepository,
    ) {}

    async getByIdService(uuid: string) {
        const found = await this.orderDetailRepository.getByIdRepository(uuid);
        if (!found) throw new NotFoundException('Detalle de pedido no existe');
        return found;
    }

    async createService(data: CreateOrderDetailDto) {
        const orderExisting = await this.orderRepository.getOrderByIdRepository(
            data.uuidOrder,
        );
        if (!orderExisting) {
            throw new NotFoundException('Este pedido no existe');
        }

        const productExisting = await this.productRepository.getProductById(
            data.uuidProduct,
        );
        if (!productExisting) {
            throw new NotFoundException('Este producto no existe');
        }

        return this.orderDetailRepository.createRepository(data);
    }

    async updateService(data: UpdateOrderDetailDto) {
        const orderDetailExiting = await this.getByIdService(data.uuid);
        return await this.orderDetailRepository.updateRepository(
            orderDetailExiting,
            data,
        );
    }

    async deleteService(uuid: string) {
        await this.getByIdService(uuid);
        return await this.orderDetailRepository.deleteRepository(uuid);
    }
}
