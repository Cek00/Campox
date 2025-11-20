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
import { OrderEntity } from 'src/entities/order.entity';
import { Products } from 'src/entities/products.entity';
import { OrderStatusEnum } from 'src/enum/orderStatus.enum';
import { Category } from 'src/entities/category.entity';

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

        @InjectRepository(OrderEntity)
        private readonly orderDatabase: Repository<OrderEntity>,

        @InjectRepository(Products)
        private readonly productsDataBase: Repository<Products>,

        @InjectRepository(Category)
        private readonly categoryDataBase: Repository<Category>,
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
                uuid: '991cfafd-05cb-4e0f-86b2-3fcc7924366b',
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
            throw new ConflictException('La base de datos ya contiene pagos');
        }

        await this.paymentDataBase.save([
            {
                amount: 150.75,
                paymentmethod: PaymentType.CREDIT_CARD,
                status: PaymentStatus.COMPLETED,
                paymentDate: new Date('2024-06-07'),
            },
            {
                amount: 75.0,
                paymentmethod: PaymentType.DEBIT_CARD,
                status: PaymentStatus.PENDING,
                paymentDate: new Date('2022-11-15'),
            },
            {
                amount: 200.5,
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
            throw new ConflictException('La base de datos ya contiene reviews');
        }

        await this.reviewDatabase.save([
            {
                review: 5,
                description:
                    'Excelente producto, superó mis expectativas. Muy recomendado.',
                createdAt: new Date('2024-11-01T10:30:00'),
                anonymous: false,
                status: ReviewStatus.VISIBLE,
            },
            {
                review: 4,
                description:
                    'Buen servicio, aunque el tiempo de entrega fue un poco largo.',
                createdAt: new Date('2024-11-05T14:20:00'),
                anonymous: true,
                status: ReviewStatus.VISIBLE,
            },
            {
                review: 3,
                description:
                    'Producto aceptable, pero esperaba mejor calidad por el precio.',
                createdAt: new Date('2024-11-10T09:15:00'),
                anonymous: false,
                status: ReviewStatus.HIDDEN,
            },
        ]);

        return { message: 'Reviews creados con éxito' };
    }

    async seedOrdersRepository() {
        const contador = await this.orderDatabase.count();
        if (contador !== 0) {
            throw new ConflictException('La base de datos ya contiene productos');
        }

        await this.orderDatabase.save([
            {
                uuid: '5ea486f8-6e51-4f5b-8e74-9b53e28b2b91',
                status: OrderStatusEnum.PENDING,
                createdAt: new Date('2024-06-01T10:00:00'),
                estimatedTime: new Date('2024-06-05T10:00:00'),
                total: 20000,
                user: {
                    uuid: '5d662d4c-8211-423d-9c80-b3cf416b0f12',
                },
            },
        ]);

        return { message: 'Pedido creado con exito' };
    }
    // implementación del seed para products

   async seedProductsRepository() {
      const count = await this.productsDataBase.count();
        if (count !== 0) {
      throw new ConflictException('Ya existen productos en la base de datos');
}


    await this.productsDataBase.save([
        {
            name: 'Mermelada de mora artesanal',
            createAt: new Date('2025-02-02'),
            imgUrl: 'https://postimg.cc/4YtYc465',
            description: 'Mermelada casera elaborada con moras frescas',
            price: 12000.00,
            stock: 15,
            isActive: true,
        },
        {
            name: 'Café en Grano',
            createAt: new Date('2025-02-03'),
            imgUrl: 'https://i.postimg.cc/zvYcKdrd/cafe-en-grano-Colombiano.jpg',
            description: 'Café cultivado en la región andina, tostado artesanalmente',
            price: 18000.99,
            stock: 40,
            isActive: true,
        },
        {
            name: 'Lechuga',
            createAt: new Date('2025-02-02'),
            imgUrl: 'https://i.postimg.cc/mrFjjQVV/lechuga-fresca.webp',
            description: 'Lechuga fresca cultivada con técnicas sostenibles',
            price: 2500.00,
            stock: 100,
            isActive: true,
        },
    ]);

    return { message: 'Productos creados con éxito' };
    }

    // implementación del seed para categories 
    async seedCategoriesRepository() {
      const contador = await this.categoryDataBase.count();
    if (contador != 0) {
        throw new ConflictException('La base de datos ya contiene categorías');
    }

    await this.categoryDataBase.save([
        {
            name: 'Frutas',
            description: 'Productos frescos de origen frutal',
        },
        {
            name: 'Verduras',
            description: 'Hortalizas cultivadas con técnicas sostenibles.',
        },
        {
            name: 'Procesados artesanales ',
            description: 'Mermeladas, miel y otros productos caseros',
        }
    ]);

        return { message: 'Categorías creadas con éxito' };
    }

 
}
