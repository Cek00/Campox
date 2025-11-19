import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { OrderDetailEntity } from './order-detail.entity';
import { ReviewEntity } from './review.entity';

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'varchar',
        length: 25,
        unique: true,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'text',
        default: 'https://postimg.cc/NKBCrXGm',
        nullable: false,
    })
    imgUrl: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    description: string;

    @Column({
        type: 'decimal',
        scale: 2,
        nullable: false,
    })
    price: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    stock: number;

    @ManyToMany(() => Category, (category) => category.products)
    categories: Category[];

    @OneToMany(() => OrderDetailEntity, (order_detail) => order_detail.product)
    order_detail: OrderDetailEntity[];

    @OneToMany(() => ReviewEntity, (review) => review.products)
    reviews: ReviewEntity[];
}
