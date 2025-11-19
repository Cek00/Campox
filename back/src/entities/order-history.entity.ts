import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
//import { OrdersEntity } from 'src/entities/orders.entity';


export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

@Entity({ name: 'order_history' })
export class OrderHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @CreateDateColumn()
  changedAt: Date;

 // @ManyToOne(() => OrdersEntity, (order) => (order.history ?? []), { nullable: false, onDelete: 'CASCADE' })
 // order: OrdersEntity;


}
