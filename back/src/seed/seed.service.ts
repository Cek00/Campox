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

    seedPaymentService() {
        return this.seedRepository.seedPaymentRepository();
    }

    seedReviewsService() {
        return this.seedRepository.seedReviewsRepository();
    }

    seedOrdersService() {
        return this.seedRepository.seedOrdersRepository();
    }
    
    seedProductsService() {
        return this.seedRepository.seedProductsRepository();
    }
    seedCategoriesService() {
        return this.seedRepository.seedCategoriesRepository();
    }
    seedOrdersHistoryService() {
        return this.seedRepository.seedOrdersHistoryRepository();
    }
}
