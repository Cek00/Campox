import { Injectable } from '@nestjs/common';
import { SeedRepository } from './seed.repository';

@Injectable()
export class SeedService {
    constructor(private readonly seedRepository: SeedRepository) {}

    seedUsersService() {
        return this.seedRepository.seedUsersRepository();
    }

    seedCredentialService() {
        return this.seedRepository.seedCredentialRepository();
    }
}
