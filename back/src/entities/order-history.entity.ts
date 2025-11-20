import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderStatusEnum } from 'src/enum/orderStatus.enum';

@Entity({ name: 'order_history' })
export class OrderHistoryEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'date',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({ type: 'enum', enum: OrderStatusEnum })
    status: OrderStatusEnum;

    @Column({ type: 'text', nullable: true })
    observation?: string;

    @ManyToOne(() => OrderEntity, (order) => order.history ?? [], {
        nullable: false,
        onDelete: 'CASCADE',
    })
    order: OrderEntity;
}
