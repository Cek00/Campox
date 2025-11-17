import { Module } from '@nestjs/common';
import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';
import { CredentialRepository } from './credential.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsEntity } from 'src/entities/credentials.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CredentialsEntity])],
    controllers: [CredentialController],
    providers: [CredentialService, CredentialRepository],
    exports: [CredentialRepository],
})
export class CredentialModule {}
