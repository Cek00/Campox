import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, DataLoaderUsers } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersEntity } from './entities/users.entity';
import { CredentialsEntity } from './entities/credentials.entity';
import { CredentialModule } from './credential/credential.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentModule } from './payment/payment.module';

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
        TypeOrmModule.forFeature([UsersEntity, CredentialsEntity]),
        SeedModule,
        AuthModule,
        UsersModule,
        CredentialModule,
        PaymentModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '9h' },
        }),
    ],
    controllers: [AppController],
    providers: [AppService, DataLoaderUsers],
})
export class AppModule {}
