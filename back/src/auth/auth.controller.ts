import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/users/Dtos/loginUser.dto';
import { AuthService } from './auth.service';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiNotFoundResponse,
    ApiConflictResponse,
} from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión de usuario' })
    @ApiResponse({
        status: 201,
        description: 'Inicio de sesion exitoso',
    })
    @ApiNotFoundResponse({
        description: 'Credenciales Invalidas',
    })
    @ApiConflictResponse({
        description:
            'El usuario esta inactivo comuniquese con el administrador',
    })
    signIn(@Body() loginUserDto: LoginUserDto) {
        return this.authService.signInService(loginUserDto);
    }
}
