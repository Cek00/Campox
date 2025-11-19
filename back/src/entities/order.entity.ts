import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderDetailEntity } from './order-detail.entity';
import { OrderHistoryEntity } from './order-history.entity';

@Entity({ name: 'order' })
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 100 })
    status: string;

    @Column({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @OneToMany(() => OrderDetailEntity, (detail) => detail.order)
    detail: OrderDetailEntity[];

    @OneToMany(() => OrderHistoryEntity, (history) => history.order)
    history: OrderHistoryEntity[];
}
