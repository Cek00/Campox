import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order.entity';
import { Repository } from 'typeorm';

export class OrderRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderDB: Repository<OrderEntity>,
    ) {}

    getAllOrdersRepository() {
        return this.orderDB.find({ relations: ['details', 'history'] });
    }

    getOrderByIdRepository(uuid: string) {
        return this.orderDB.findOne({
            where: { uuid },
            relations: ['details', 'history'],
        });
    }

    createOrderRepository(data: Partial<OrderEntity>) {
        const order = this.orderDB.create(data);
        return this.orderDB.save(order);
    }

    async updateOrderRepository(uuid: string, data: Partial<OrderEntity>) {
        await this.orderDB.update(uuid, data);
        return this.getOrderByIdRepository(uuid);
    }

    deleteOrderRepository(uuid: string) {
        return this.orderDB.delete(uuid);
    }
}
