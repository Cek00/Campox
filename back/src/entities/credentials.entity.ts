import { RolesEnum } from 'src/enum/roles.enum';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({ name: 'credential' })
export class CredentialsEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
        nullable: false,
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    password: string;

    @Column({
        type: 'enum',
        enum: RolesEnum,
        default: RolesEnum.USER,
    })
    roles: RolesEnum;

    @OneToOne(() => UsersEntity, (user) => user.credential)
    @JoinColumn()
    user: UsersEntity;
}
