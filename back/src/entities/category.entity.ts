import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity({name:'categories'})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column ({
        type: 'varchar',
        length: 25,
        unique: true,
        nullable: false,
    })
    name:string;

    @Column ({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    description: string;

    @ManyToMany(()=> Products, (product) => product.categories)
      @JoinTable()
    products: Products[];
    product: any;

}