import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsEntity } from 'src/entities/credentials.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { RolesEnum } from 'src/enum/roles.enum';
import { Repository } from 'typeorm';
import { PaymentEntity } from 'src/entities/payment.entity';
import { PaymentType } from 'src/enum/paymentType.enum';
import { PaymentStatus } from 'src/enum/paymentStatus.enum';
import { ReviewEntity } from 'src/entities/review.entity';
import { ReviewStatus } from 'src/enum/reviewStatus.enum';

@Injectable()
export class SeedRepository {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersDataBase: Repository<UsersEntity>,

        @InjectRepository(CredentialsEntity)
        private readonly credentialDataBase: Repository<CredentialsEntity>,

        @InjectRepository(PaymentEntity)
        private readonly paymentDataBase: Repository<PaymentEntity>,

        @InjectRepository(ReviewEntity)
        private readonly reviewDatabase: Repository<ReviewEntity>,
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

    //implementacion del seed para payments (pagos)
    async seedPaymentRepository() {
        const contador = await this.paymentDataBase.count();
        if (contador !== 0) {
            throw new ConflictException(
                'La base de datos ya contiene pagos',
            );
        }

        await this.paymentDataBase.save([
            {
                amount: 150.75,
                paymentmethod: PaymentType.CREDIT_CARD,
                status: PaymentStatus.COMPLETED,
                paymentDate: new Date('2024-06-07'),
            },
            {
                amount: 75.00,
                paymentmethod: PaymentType.DEBIT_CARD,
                status: PaymentStatus.PENDING,
                paymentDate: new Date('2022-11-15'),
            },
            {
                amount: 200.50,
                paymentmethod: PaymentType.PAYPAL,
                status: PaymentStatus.FAILED,
                paymentDate: new Date('2025-01-20'),
            },
        ]);
        return { message: 'Pagos creados con exito' };
    }

    //implementacion del seed para reviews(reseñas)

    async seedReviewsRepository() {
        const contador = await this.reviewDatabase.count();
    
        if (contador !== 0) {
            throw new ConflictException(
                'La base de datos ya contiene reviews',
            );
        }

        await this.reviewDatabase.save([
            {
                review: 5,
                description: 'Excelente producto, superó mis expectativas. Muy recomendado.',
                createdAt: new Date('2024-11-01T10:30:00'),
                anonymous: false,
                status: ReviewStatus.VISIBLE,
            },
            {
                review: 4,
                description: 'Buen servicio, aunque el tiempo de entrega fue un poco largo.',
                createdAt: new Date('2024-11-05T14:20:00'),
                anonymous: true,
                status: ReviewStatus.VISIBLE,
            },
            {
                review: 3,
                description: 'Producto aceptable, pero esperaba mejor calidad por el precio.',
                createdAt: new Date('2024-11-10T09:15:00'),
                anonymous: false,
                status: ReviewStatus.HIDDEN,
            },
        ]);

    return { message: 'Reviews creados con éxito' };
    }

}
