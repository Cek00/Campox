import { Controller, Get, UseGuards } from '@nestjs/common';
import { SeedService } from './seed.service';
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';

@ApiTags('Seeders')
@Controller('seed')
export class SeedController {
    constructor(private readonly seedService: SeedService) {}

    @Get('seedUsers')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Creacion de usuario' })
    @ApiResponse({
        status: 200,
        description: 'Usuario creado con exito',
    })
    @ApiConflictResponse({
        description: 'La base de datos ya contiene usuarios',
    })
    @ApiBearerAuth()
    seedUsers() {
        return this.seedService.seedUsersService();
    }

    @Get('seedCredentials')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Creacion de credenciales' })
    @ApiResponse({
        status: 200,
        description: 'Credencial creada con exito',
    })
    @ApiConflictResponse({
        description: 'La base de datos ya contiene credenciales',
    })
    @ApiBearerAuth()
    seedCredential() {
        return this.seedService.seedCredentialService();
    }

    // Nuevo endpoint para seed de payment(pagos)
    @Get('seedPayments')
    @ApiOperation({ summary: 'Creacion de pagos' })
    @ApiResponse({
        status: 200,
        description: 'Pagos creados con exito',
    })
    @ApiConflictResponse({
        description: 'La base de datos ya contiene pagos',
    })
    seedPayments() { 
        return this.seedService.seedPaymentService();
    }
}
