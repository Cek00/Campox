import { Injectable, NotFoundException } from '@nestjs/common';
import { CredentialRepository } from './credential.repository';

@Injectable()
export class CredentialService {
    constructor(private readonly credentialRepository: CredentialRepository) {}

    getAllCredentialsService() {
        return this.credentialRepository.getAllCredentialsRepository();
    }

    async getCredentialByUsernameService(nombre: string) {
        const credentialExiting =
            await this.credentialRepository.getCredentialByUsernameRepository(
                nombre,
            );
        if (!credentialExiting) {
            throw new NotFoundException('Esta credencial no existe');
        }
        return credentialExiting;
    }

    async getCredentialByIdService(uuid: string) {
        const credentialExiting =
            await this.credentialRepository.getCredentialByIdRepository(uuid);
        if (!credentialExiting) {
            throw new NotFoundException('Esta credencial no existe');
        }

        return credentialExiting;
    }
}
