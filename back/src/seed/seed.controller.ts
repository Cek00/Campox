import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
    constructor(private readonly seedService: SeedService) {}

    @Get('seedUsers')
    seedUsers() {
        return this.seedService.seedUsersService();
    }

    @Get('seedCredentials')
    seedCredential() {
        return this.seedService.seedCredentialService();
    }
}
