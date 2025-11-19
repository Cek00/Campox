import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { OrdersEntity } from 'src/entities/orders.entity';
import { Product } from 'src/entities/products.entity';

@Entity({ name: 'order_detail' })
export class OrderDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  note?: string;

 // @ManyToOne(() => OrdersEntity, (order) => (order.details ?? []), { nullable: false, onDelete: 'CASCADE' })
  //order: OrdersEntity;

  @ManyToOne(() => Product, (product) => (product.order_detail ?? []), { nullable: false })
  product: Product;
}
