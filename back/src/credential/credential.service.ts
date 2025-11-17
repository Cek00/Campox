import { Injectable } from '@nestjs/common';
import { CredentialRepository } from './credential.repository';

@Injectable()
export class CredentialService {
    constructor(private readonly credentialRepository: CredentialRepository) {}

    getCredentialByUsernameService(nombre: string) {
        return this.credentialRepository.getCredentialByUsernameRepository(
            nombre,
        );
    }
}
