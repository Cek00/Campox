import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductRepository } from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository]
})
export class ProductsModule {}
