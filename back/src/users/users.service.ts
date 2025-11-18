import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './Dtos/updateUser.dto';
import { CreatedUserDto } from './Dtos/createUrser.dto';
import { UsersRepository } from './users.repository';
import { CredentialRepository } from 'src/credential/credential.repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly credentialRepository: CredentialRepository,
    ) {}

    getAllUserService() {
        return this.usersRepository.getAllUserRepository();
    }

    async getUserByIdService(uuid: string) {
        const userExisting =
            await this.usersRepository.getUserByIDRepository(uuid);
        if (!userExisting) {
            throw new NotFoundException('Este usuario no existe');
        }
        return userExisting;
    }

    async createUserService(data: CreatedUserDto) {
        const emailExisting = await this.usersRepository.getUserByEmail(
            data.email,
        );
        if (emailExisting) {
            throw new ConflictException(
                'Este correo ya se encuentra registrado',
            );
        }

        const usernameExisting =
            await this.credentialRepository.getCredentialByUsernameRepository(
                data.userName,
            );
        if (usernameExisting) {
            throw new ConflictException(
                'Este nombre de usuario ya se encuentra en uso',
            );
        }

        const phoneNumberExisting =
            await this.usersRepository.getByUserPhoneNumber(data.phoneNumber);
        if (phoneNumberExisting) {
            throw new ConflictException(
                'Este numero de telefono ya esta en uso',
            );
        }

        return this.usersRepository.createdUserRepository(data);
    }

    async updateUserService(data: UpdateUserDto) {
        const userExisting = await this.usersRepository.getUserByIDRepository(
            data.uuid,
        );
        if (!userExisting) {
            throw new NotFoundException('No existe el usuario');
        }

        if (data.email) {
            const emailExisting = await this.usersRepository.getUserByEmail(
                data.email,
            );
            if (emailExisting) {
                throw new ConflictException(
                    'Este correo ya se encuentra registrado',
                );
            }
        }

        if (data.userName) {
            const usernameExisting =
                await this.credentialRepository.getCredentialByUsernameRepository(
                    data.userName,
                );
            if (usernameExisting) {
                throw new ConflictException(
                    'Este nombre de usuario ya se encuentra en uso',
                );
            }
        }
        if (data.phoneNumber) {
            const phoneNumberExisting =
                await this.usersRepository.getByUserPhoneNumber(
                    data.phoneNumber,
                );
            if (phoneNumberExisting) {
                throw new ConflictException(
                    'Este numero de telefono ya esta en uso',
                );
            }
        }

        return this.usersRepository.updateUserRepository(userExisting, data);
    }

    async deleteUserService(uuid: string) {
        const userExisting =
            await this.usersRepository.getUserByIDRepository(uuid);
        if (!userExisting) {
            throw new NotFoundException('No existe el usuario');
        }
        return this.usersRepository.deleteUserRepository(userExisting);
    }
}
