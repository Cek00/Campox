import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('El token es requerido');
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new BadRequestException(
                'Configuracion del servidor incorrecta',
            );
        }
        try {
            const payload = this.jwtService.verify(token, { secret });

            payload.exp = new Date(payload.exp * 1000);

            payload.iat = new Date(payload.iat * 1000);
            if (!payload.role) {
                throw new UnauthorizedException(
                    'No tienes los permisos necesarios',
                );
            }

            (request as any).user = payload;
            return true;
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException('El token ha expirado');
            }
            if (error instanceof JsonWebTokenError) {
                throw new UnauthorizedException('Token Invalido');
            }
            throw new UnauthorizedException('Error de autenticacion');
        }
    }
}
