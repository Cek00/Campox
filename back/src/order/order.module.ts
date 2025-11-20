import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderEntity } from 'src/entities/order.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity]), UsersModule],
    controllers: [OrderController],
    providers: [OrderService, OrderRepository],
    exports: [OrderRepository],
})
export class OrderModule {}
