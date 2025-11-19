import {
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CredentialsEntity } from './credentials.entity';
import { ReviewEntity } from './review.entity';
import { OrderEntity } from './order.entity';

@Entity({ name: 'users' })
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
        name: 'last_name',
        length: 100,
        nullable: false,
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type: 'bigint',
        name: 'phone_number',
        unique: true,
    })
    phoneNumber: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    adress: string;

    @Column({
        type: 'date',
        name: 'birth_date',
    })
    birthDate: Date;

    @Column({
        type: 'boolean',
        name: 'is_active',
        default: true,
    })
    isActive: boolean;

    @OneToOne(() => CredentialsEntity, (credential) => credential.user)
    credential: CredentialsEntity;

    @OneToMany(() => ReviewEntity, (review) => review.user)
    reviews: ReviewEntity[];

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[];
}
