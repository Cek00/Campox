import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesEnum } from 'src/enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requeriredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
            'roles',
            [context.getHandler(), context.getClass()],
        );
        console.log('Roles requeridos para esta ruta:', requeriredRoles);

        const request = context.switchToHttp().getRequest();

        const Payload = request.user;
        console.log('Payload del usuario en el guard de roles:', Payload);

        const hasRole = requeriredRoles.some((role) =>
            Payload?.role?.includes(role),
        );

        const validate = Payload && Payload.role && hasRole;

        console.log('Validaciones de roles en el guard:', validate);
        if (!validate) {
            throw new ForbiddenException(
                'No tienes permisos para acceder a este contenido.',
            );
        }
        return validate;
    }
}
