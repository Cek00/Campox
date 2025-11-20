import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHistoryController } from './order-history.controller';
import { OrderHistoryService } from './order-history.service';
import { OrderHistoryRepository } from './order-history.repository';
import { OrderHistoryEntity } from 'src/entities/order-history.entity';
import { OrderModule } from 'src/order/order.module';

@Module({
    imports: [TypeOrmModule.forFeature([OrderHistoryEntity]), OrderModule],
    controllers: [OrderHistoryController],
    providers: [OrderHistoryService, OrderHistoryRepository],
    exports: [OrderHistoryRepository],
})
export class OrderHistoryModule {}
