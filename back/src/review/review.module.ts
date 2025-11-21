import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from 'src/entities/review.entity';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { UsersEntity } from 'src/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import { CredentialsEntity } from 'src/entities/credentials.entity';
import { CredentialRepository } from 'src/credential/credential.repository';
import { Products } from 'src/entities/products.entity';
import { ProductRepository } from 'src/products/products.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      UsersEntity,
      CredentialsEntity,
      Products,
    ]),
  ],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    ReviewRepository,

    // repos que usa ReviewService
    UsersRepository,
    CredentialRepository,
    ProductRepository,
  ],
  exports: [ReviewRepository],
})
export class ReviewModule {}
