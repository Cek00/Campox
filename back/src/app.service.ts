import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CredentialsEntity } from './entities/credentials.entity';
import { PaymentEntity } from './entities/payment.entity';
import path from 'path';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { RolesEnum } from './enum/roles.enum';
import { PaymentType } from './enum/paymentType.enum';
import { PaymentStatus } from './enum/paymentStatus.enum';
import { ReviewEntity } from './entities/review.entity';
import { ReviewStatus } from './enum/reviewStatus.enum';


@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
}

@Injectable()
export class DataLoaderUsers implements OnModuleInit {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userDataBase: Repository<UsersEntity>,

        @InjectRepository(CredentialsEntity)
        private readonly credentialDataBase: Repository<CredentialsEntity>,
        
    ) {}

    async onModuleInit() {
        const userContador = await this.userDataBase.count();

        if (userContador !== 0) {
            throw new ConflictException(
                'La base de datos ya contiene usuarios',
            );
        }

        console.log('Cargando usuarios iniciales...');
        const queryRunner =
            this.userDataBase.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const filePath = path.resolve(
                __dirname,
                '..',
                'src',
                'utils',
                'data.json',
            );
            const rawData = fs.readFileSync(filePath, 'utf-8');
            const users = JSON.parse(rawData) as Array<{
                uuid: string;
                name: string;
                lastName: string;
                email: string;
                phoneNumber: number;
                adress: string;
                birthDate: string;
                isActive: boolean;
                username: string;
                password: string;
                roles: RolesEnum;
            }>;

            await Promise.all(
                users.map(async (user) => {
                    const newUser = this.userDataBase.create({
                        uuid: user.uuid,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        adress: user.adress,
                        birthDate: new Date(user.birthDate),
                        isActive: user.isActive,
                    });
                    await queryRunner.manager.save(newUser);

                    const hashedPassword: string = await bcrypt.hash(
                        user.password,
                        10,
                    );

                    const newCredential = this.credentialDataBase.create({
                        username: user.username,
                        password: hashedPassword,
                        roles: user.roles,
                        user: newUser,
                    });
                    await queryRunner.manager.save(newCredential);
                }),
            );
            await queryRunner.commitTransaction();
            console.log('Los usuarios se guardaron exitosamente.');
        } catch (error) {
            console.error('Error al precargar usuario:', error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}

@Injectable()
export class DataLoaderPayments implements OnModuleInit {
    constructor(
        @InjectRepository(PaymentEntity)
        private readonly paymentDatabase: Repository<PaymentEntity>,
    ) {}

    async onModuleInit() {
        const paymentContador = await this.paymentDatabase.count();

        if (paymentContador !== 0) {
            console.log('La base de datos ya contiene pagos');
            return;
        }

        console.log('Cargando pagos iniciales...');
        
        const queryRunner = this.paymentDatabase.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        try {
            const filePath = path.resolve(
                __dirname,
                '..',
                'src',
                'utils',
                'payments.json',
            );
            const rawData = fs.readFileSync(filePath, 'utf-8');
            const payments = JSON.parse(rawData) as Array<{
                amount: number;
                paymentmethod: PaymentType;
                status: PaymentStatus;
                paymentDate: string;
            }>;

            await Promise.all(
                payments.map(async (payment) => {
                    const newPayment = this.paymentDatabase.create({
                        amount: payment.amount,
                        paymentmethod: payment.paymentmethod,
                        status: payment.status,
                        paymentDate: new Date(payment.paymentDate),
                    });
                    await queryRunner.manager.save(newPayment);
                }),
            );
            
            await queryRunner.commitTransaction();
            console.log('Los pagos se guardaron exitosamente.');
        } catch (error) {
            console.error('Error al precargar pagos:', error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}

@Injectable()
export class DataLoaderReviews implements OnModuleInit {
    constructor(
        @InjectRepository(ReviewEntity)
        private readonly reviewDatabase: Repository<ReviewEntity>,
    ) {}

    async onModuleInit() {
        const reviewContador = await this.reviewDatabase.count();

        if (reviewContador !== 0) {
            console.log('La base de datos ya contiene reviews');
            return;
        }

        console.log('Cargando reviews iniciales...');
        
        const queryRunner = this.reviewDatabase.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        try {
            const filePath = path.resolve(
                __dirname,
                '..',
                'src',
                'utils',
                'reviews.json',
            );
            const rawData = fs.readFileSync(filePath, 'utf-8');
            const reviews = JSON.parse(rawData) as Array<{
                review: number;
                description: string;
                createdAt: string;
                anonymous: boolean;
                status: ReviewStatus;
            }>;

            await Promise.all(
                reviews.map(async (review) => {
                    const newReview = this.reviewDatabase.create({
                        review: review.review,
                        description: review.description,
                        createdAt: new Date(review.createdAt),
                        anonymous: review.anonymous,
                        status: review.status,
                    });
                    await queryRunner.manager.save(newReview);
                }),
            );
            
            await queryRunner.commitTransaction();
            console.log('Los reviews se guardaron exitosamente.');
        } catch (error) {
            console.error('Error al precargar reviews:', error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
