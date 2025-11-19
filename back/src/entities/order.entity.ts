import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { OrderDetailEntity } from './order-detail.entity';
import { OrderHistoryEntity } from './order-history.entity';
import { OrderStatusEnum } from 'src/enum/orderStatus.enum';
import { UsersEntity } from './users.entity';

@Entity({ name: 'order' })
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'enum',
        enum: OrderStatusEnum,
        default: OrderStatusEnum.CREAD,
    })
    status: OrderStatusEnum;

    @Column({
        type: 'date',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        type: 'date',
        name: 'estimated_time',
        nullable: true,
    })
    estimatedTime: Date;

    @Column({
        type: 'decimal',
        nullable: false,
    })
    total: number;

    @ManyToOne(() => UsersEntity, (user) => user.orders)
    @JoinColumn()
    user: UsersEntity;

    @OneToMany(() => OrderDetailEntity, (detail) => detail.order)
    detail: OrderDetailEntity[];

    @OneToMany(() => OrderHistoryEntity, (history) => history.order)
    history: OrderHistoryEntity[];
}
