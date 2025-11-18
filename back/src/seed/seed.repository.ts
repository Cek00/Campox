import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsEntity } from 'src/entities/credentials.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { RolesEnum } from 'src/enum/roles.enum';
import { Repository } from 'typeorm';

@Injectable()
export class SeedRepository {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersDataBase: Repository<UsersEntity>,

        @InjectRepository(CredentialsEntity)
        private readonly credentialDataBase: Repository<CredentialsEntity>,
    ) {}

    async seedUsersRepository() {
        const contador = await this.usersDataBase.count();
        if (contador !== 0) {
            throw new ConflictException(
                'La base de datos ya contiene usuarios',
            );
        }

        await this.usersDataBase.save([
            {
                id: '991cfafd-05cb-4e0f-86b2-3fcc7924366b',
                name: 'Angy',
                lastName: 'Ariza',
                email: 'angy@gmail.com',
                phoneNumber: 314464276,
                adress: 'avenida 1',
                birthDate: new Date('1995-05-15'),
                isActive: true,
            },
        ]);

        return { message: 'Usuario creado con exito' };
    }

    async seedCredentialRepository() {
        const contador = await this.credentialDataBase.count();
        if (contador !== 0) {
            throw new ConflictException(
                'La base de datos ya contiene credenciales',
            );
        }

        await this.credentialDataBase.save([
            {
                username: 'angy12',
                password: 'Angy1221',
                roles: RolesEnum.ADMIN,
                user: {
                    uuid: '991cfafd-05cb-4e0f-86b2-3fcc7924366b',
                },
            },
        ]);

        return { message: 'Credencial creada con exito' };
    }
}
