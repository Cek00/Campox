import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/users/Dtos/loginUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    signIn(@Body() loginUserDto: LoginUserDto) {
        return this.authService.signInService(loginUserDto);
    }
}
