import {StatusOrder} from 'src/enum/SatusOrder.enum';
import{Column, Entity, JoinColumn, ManyToOne,PrimaryGeneratedColumn} from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({ name: 'order'})
export class Order {
@PrimaryGeneratedColumn('uuid')
uuid: string;

@Column({
 type: 'enum',
 enum: StatusOrder,
 default: StatusOrder.CREAD,
})
statusOrder: StatusOrder; 

@Column({
 type: 'timestamp',
 default: () => 'CURRENT_TIMESTAMP',
})
dateCreated: Date;

@Column({
 type: 'int',
 nullable: false,
})
tiempo: number;

@Column({
 type: 'decimal',
 scale: 2,
 nullable: false,
})
total: number;

@ManyToOne(() => UsersEntity, (users) => users.orders)
@JoinColumn({ name: 'user_id' })
user: UsersEntity;

}