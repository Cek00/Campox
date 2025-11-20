import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { PaymentStatus } from 'src/enum/paymentStatus.enum';
import { PaymentType } from 'src/enum/paymentType.enum';
import { OrderEntity } from './order.entity';

@Entity({ name: 'payment' })
export class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    //monto
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    amount: number;

    //metodo de pago (enum: 'credit_card', 'debit_card', 'paypal', 'bank_transfer')
    @Column({
        type: 'enum',
        enum: PaymentType,
    })
    paymentmethod: PaymentType;

    //estado del pago (enum: 'pending', 'completed', 'failed', 'refunded')
    @Column({
        type: 'enum',
        enum: PaymentStatus,
    })
    status: PaymentStatus;
    //fecha de pago
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    paymentDate: Date;

    //relacion uno a uno con order (pedido)
    @OneToOne(() => OrderEntity, (order) => order.payment)
    @JoinColumn()
    order: OrderEntity;
}
