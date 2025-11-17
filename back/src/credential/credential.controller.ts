import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';

@Controller('credential')
export class CredentialController {
    constructor(private readonly credentialService: CredentialService) {}

    @Get('getCredentialByUsername/:name')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    getCredentialByUsername(@Param('name') nombre: string) {
        return this.credentialService.getCredentialByUsernameService(nombre);
    }
}
