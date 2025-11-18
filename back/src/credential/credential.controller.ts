import {
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Query,
    UseGuards,
} from '@nestjs/common';
import { CredentialService } from './credential.service';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Credenciales')
@Controller('credential')
export class CredentialController {
    constructor(private readonly credentialService: CredentialService) {}

    @Get('getAllCredentials')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Obtener todas las credenciales' })
    @ApiResponse({
        status: 200,
        description: 'Credenciales obtenidas exitosamente',
    })
    @ApiBearerAuth()
    getAllCredentials() {
        return this.credentialService.getAllCredentialsService();
    }

    @Get('getCredentialByUsername')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Obtener la credencial por el userName' })
    @ApiResponse({
        status: 200,
        description: 'Credencial obtenida exitosamente',
    })
    @ApiNotFoundResponse({
        description: 'Esta credencial no existe',
    })
    @ApiQuery({
        name: 'userName',
        required: true,
        description: 'userName de la credencial a buscar',
    })
    @ApiBearerAuth()
    getCredentialByUsername(@Query('userName') nombre: string) {
        return this.credentialService.getCredentialByUsernameService(nombre);
    }

    @Get('getCreentialById/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Obtener la credencial por el Id' })
    @ApiResponse({
        status: 200,
        description: 'Credencial obtenida exitosamente',
    })
    @ApiNotFoundResponse({
        description: 'Esta credencial no existe',
    })
    @ApiBearerAuth()
    getCredentialById(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.credentialService.getCredentialByIdService(uuid);
    }
}
