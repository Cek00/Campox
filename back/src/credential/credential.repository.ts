import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsEntity } from 'src/entities/credentials.entity';
import { Repository } from 'typeorm';

export class CredentialRepository {
    constructor(
        @InjectRepository(CredentialsEntity)
        private readonly credentialDataBase: Repository<CredentialsEntity>,
    ) {}

    async getCredentialByUsernameRepository(nombre: string) {
        return await this.credentialDataBase.findOne({
            where: { username: nombre },
            relations: ['user'],
        });
    }
}
