import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsEntity } from 'src/entities/credentials.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CredentialModule } from 'src/credential/credential.module';
import { UsersRepository } from './users.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity, CredentialsEntity]),
        CredentialModule,
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersRepository],
})
export class UsersModule {}
