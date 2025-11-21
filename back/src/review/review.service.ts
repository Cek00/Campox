import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './Dtos/createReview.dto';
import { UpdateReviewDto } from './Dtos/updateReview.dto';
import { UsersRepository } from 'src/users/users.repository';
import { ProductRepository } from 'src/products/products.repository';

@Injectable()
export class ReviewService {
    constructor(
        private readonly reviewRepository: ReviewRepository,
        private readonly usersRepository: UsersRepository,
        private readonly productRepository: ProductRepository,
    ) {}

    async create(createReviewDto: CreateReviewDto) {
        const { userId, productId } = createReviewDto;

        const user = await this.usersRepository.getUserByIDRepository(userId);
        if (!user) throw new NotFoundException('El usuario no existe');

        const product = await this.productRepository.getProductById(productId);
        if (!product) throw new NotFoundException('El producto no existe');

        const review = this.reviewRepository.create({
            ...createReviewDto,
            user,
            products: product,
        });

        return this.reviewRepository.save(review);
    }

    findAll() {
        return this.reviewRepository.find({
            relations: ['user', 'products'],
        });
    }

    async findOne(id: string) {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: ['user', 'products'],
        });

        if (!review) throw new NotFoundException('La reseña no existe');

        return review;
    }

    async update(id: string, updateReviewDto: UpdateReviewDto) {
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (!review) throw new NotFoundException('La reseña no existe');

        Object.assign(review, updateReviewDto);
        return this.reviewRepository.save(review);
    }

    async remove(id: string) {
        const review = await this.reviewRepository.findOne({ where: { id } });
        if (!review) throw new NotFoundException('La reseña no existe');

        await this.reviewRepository.remove(review);
        return { message: 'Reseña eliminada correctamente' };
    }
}
