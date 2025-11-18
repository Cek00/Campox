import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import { CreatedUserDto } from './Dtos/createUrser.dto';
import { UpdateUserDto } from './Dtos/updateUser.dto';
import { UsersService } from './users.service';
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('getAllUsers')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({
        status: 200,
        description: 'Usuarios obtenidos exitosamente',
    })
    @ApiBearerAuth()
    getAllUsers() {
        return this.usersService.getAllUserService();
    }

    @Get('getUserById/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Obtener el usuario por el Id' })
    @ApiResponse({
        status: 200,
        description: 'Usuario obtenido exitosamente',
    })
    @ApiNotFoundResponse({
        description: 'Este usuario no existe',
    })
    @ApiBearerAuth()
    getUserById(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.usersService.getUserByIdService(uuid);
    }

    @Post('createUser')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Crear usuario' })
    @ApiResponse({
        status: 200,
        description: 'Usuario creado exitosamente',
    })
    @ApiNotFoundResponse({
        description: 'Este correo ya se encuentra registrado',
    })
    @ApiBearerAuth()
    createUser(@Body() data: CreatedUserDto) {
        return this.usersService.createUserService(data);
    }

    @Put('updateUser')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Actualizar usuario' })
    @ApiResponse({
        status: 200,
        description: 'Usuario actualizado exitosamente',
    })
    @ApiNotFoundResponse({
        description: 'No existe el usuario',
    })
    @ApiConflictResponse({
        description: 'Este correo ya se encuentra registrado',
    })
    @ApiBearerAuth()
    updateUser(@Body() data: UpdateUserDto) {
        return this.usersService.updateUserService(data);
    }

    @Delete('deleteUser/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'desactivar usuario' })
    @ApiResponse({
        status: 200,
        description: 'El usuario fue desactivado exitosamente',
    })
    @ApiNotFoundResponse({
        description: 'No existe el usuario',
    })
    @ApiBearerAuth()
    deleteUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.usersService.deleteUserService(uuid);
    }
}
