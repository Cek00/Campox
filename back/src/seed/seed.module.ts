import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsEntity } from 'src/entities/credentials.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { PaymentEntity } from 'src/entities/payment.entity';
import { ReviewEntity } from 'src/entities/review.entity';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { SeedRepository } from './seed.repository';
import { OrderEntity } from 'src/entities/order.entity';
import { Products } from 'src/entities/products.entity';
import { Category } from 'src/entities/category.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsersEntity,
            CredentialsEntity,
            PaymentEntity,
            ReviewEntity,
            OrderEntity,
            Products,
            Category,
        ]),
    ],
    controllers: [SeedController],
    providers: [SeedService, SeedRepository],
})
export class SeedModule {}
