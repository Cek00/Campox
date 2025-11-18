import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsEntity } from 'src/entities/credentials.entity';
import { Repository } from 'typeorm';

export class CredentialRepository {
    constructor(
        @InjectRepository(CredentialsEntity)
        private readonly credentialDataBase: Repository<CredentialsEntity>,
    ) {}

    async getAllCredentialsRepository() {
        const credential = await this.credentialDataBase.find({
            relations: ['user'],
        });
        return credential;
    }

    async getCredentialByUsernameRepository(nombre: string) {
        return await this.credentialDataBase.findOne({
            where: { username: nombre },
            relations: ['user'],
        });
    }

    async getCredentialByIdRepository(uuid: string) {
        return await this.credentialDataBase.findOne({
            where: { uuid: uuid },
            relations: ['user'],
        });
    }
}
