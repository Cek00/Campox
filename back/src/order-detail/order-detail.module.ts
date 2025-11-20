import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailController } from './order-detail.controller';
//import { OrderDetailService } from './order-detail.service';
import { OrderDetailRepository } from './order-detail.repository';
import { OrderDetailEntity } from 'src/entities/order-detail.entity';


@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity])],
  controllers: [OrderDetailController],
  //providers: [OrderDetailService, OrderDetailRepository],
  exports: [OrderDetailRepository],
})
export class OrderDetailModule {}
