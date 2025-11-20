import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Products } from 'src/entities/products.entity';
import { OrderEntity } from './order.entity';

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

    @ManyToOne(() => OrderEntity, (order) => order.detail ?? [], {
        nullable: false,
        onDelete: 'CASCADE',
    })
    order: OrderEntity;

    @ManyToOne(() => Products, (product) => product.order_detail ?? [], {
        nullable: false,
    })
    product: Products;
}
