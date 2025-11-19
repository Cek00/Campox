import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { Product } from './products.entity';
import { ReviewStatus } from 'src/enum/reviewStatus.enum';

@Entity({ name: 'reviews' })
export class ReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //calificacion
    @Column({
        type: 'int',
    })
    review: number;

    //descripcion
    @Column({
        type: 'varchar',
        length: 255,
    })
    description: string;

    //fecha de creacion
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    //indica si es anonimo
    @Column({
        type: 'boolean',
        default: false,
    })
    anonymous: boolean;

    //estado de la reseña
    @Column({
        type: 'enum',
        enum: ReviewStatus,
        default: ReviewStatus.VISIBLE,
    })
    status: ReviewStatus;

    //relaciones
    @ManyToOne(() => UsersEntity, (user) => user.reviews)
    user: UsersEntity;

    @ManyToMany(() => Product, (product) => product.reviews)
    @JoinTable()
    products: Product[];
}
