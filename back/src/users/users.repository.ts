import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsEntity } from 'src/entities/credentials.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreatedUserDto } from './Dtos/createUrser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './Dtos/updateUser.dto';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userDataBase: Repository<UsersEntity>,

        @InjectRepository(CredentialsEntity)
        private readonly credentialDataBase: Repository<CredentialsEntity>,
    ) {}

    async getAllUserRepository() {
        const users = await this.userDataBase.find({
            relations: ['credential'],
        });
        return users;
    }

    async getUserByIDRepository(uuid: string) {
        return await this.userDataBase.findOne({
            where: { uuid: uuid },
            relations: ['credential'],
        });
    }

    async getUserByEmail(correo: string) {
        return await this.userDataBase.findOne({ where: { email: correo } });
    }

    async getByUserPhoneNumber(telefono: number) {
        return await this.userDataBase.findOne({
            where: { phoneNumber: telefono },
        });
    }

    async createdUserRepository(data: CreatedUserDto) {
        const newUser = this.userDataBase.create({
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            adress: data.adress,
            birthDate: data.birthDate,
        });
        await this.userDataBase.save(newUser);

        const hashedPassword: string = await bcrypt.hash(data.password, 10);
        const newCredential = this.credentialDataBase.create({
            username: data.userName,
            password: hashedPassword,
            user: newUser,
        });
        await this.credentialDataBase.save(newCredential);

        return {
            message: `El usuario ${newUser.name} se ha creado con exito`,
        };
    }

    async updateUserRepository(userExisting: UsersEntity, data: UpdateUserDto) {
        if (data.name) {
            userExisting.name = data.name;
        }

        if (data.lastName) {
            userExisting.lastName = data.lastName;
        }

        if (data.email) {
            userExisting.email = data.email;
        }

        if (data.phoneNumber) {
            userExisting.phoneNumber = data.phoneNumber;
        }

        if (data.adress) {
            userExisting.adress = data.adress;
        }

        if (data.birthDate) {
            userExisting.birthDate = data.birthDate;
        }

        if (data.userName) {
            await this.credentialDataBase.update(
                { user: { uuid: userExisting.uuid } },
                { username: data.userName },
            );
        }

        if (data.password) {
            const hashedPassword: string = await bcrypt.hash(data.password, 10);
            await this.credentialDataBase.update(
                { user: { uuid: userExisting.uuid } },
                { password: hashedPassword },
            );
        }

        await this.userDataBase.save(userExisting);
        return { message: 'Usuario actualizado.' };
    }

    async deleteUserRepository(userExisting: UsersEntity) {
        userExisting.isActive = false;
        await this.userDataBase.save(userExisting);
        return { message: 'Usuario desactivado' };
    }
}
