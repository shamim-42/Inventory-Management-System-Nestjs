import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "../product/product.entity";
import { UserEntity } from "../user/user.entity";

@Entity()
export class ShopEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 128})
    name: string;

    @Column({length: 1028})
    description: string;

    @Column()
    logo: string;

    @Column()
    banner: string;

    // @OneToMany(()=>ProductEntity, product=>product.shop)
    // products: ProductEntity[];

    // @ManyToOne(()=>UserEntity)
    // created_by: UserEntity;
}