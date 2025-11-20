import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
    AppService,
    DataLoaderPayments,
    DataLoaderReviews,
    DataLoaderUsers,
} from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersEntity } from './entities/users.entity';
import { CredentialsEntity } from './entities/credentials.entity';
import { PaymentEntity } from './entities/payment.entity';
import { ReviewEntity } from './entities/review.entity';
import { CredentialModule } from './credential/credential.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { OrderHistoryModule } from './order-history/order-history.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeorm],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => config.get('typeorm') ?? {},
        }),
        TypeOrmModule.forFeature([
            UsersEntity,
            CredentialsEntity,
            PaymentEntity,
            ReviewEntity,
        ]),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '9h' },
        }),
        SeedModule,
        AuthModule,
        UsersModule,
        CredentialModule,
        PaymentModule,
        ReviewModule,
        OrderModule,
        ProductsModule,
        CategoryModule,
        OrderHistoryModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        DataLoaderUsers,
        DataLoaderPayments,
        DataLoaderReviews,
    ],
})
export class AppModule {}
