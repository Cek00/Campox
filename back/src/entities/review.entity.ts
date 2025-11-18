import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';
import { ReviewStatus } from 'src/enum/reviewStatus.enum';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //calificacion
  @Column({ 
    type: 'int' 
  })
  review: number;

  //descripcion
  @Column({
    type: 'varchar', 
    length: 255 
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
    default: false
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
  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToMany(() => Product, product => product.reviews)
  @JoinTable() 
  products: Product[];
}
