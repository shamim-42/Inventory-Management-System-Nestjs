import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "../product/product.entity";
import { UserEntity } from "../user/user.entity";

@Entity()
export class ShopEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128 })
    name: string;

    @Column({ length: 1028, nullable: true })
    description: string;

    @Column({ length: 1028, nullable: true })
    logo: string;

    @Column({
        length: 1028,
        nullable: true,
    })
    banner: string;


    @OneToMany((type) => ProductEntity, product => product.shop)
    products: ProductEntity[];

    @ManyToMany(
        type => UserEntity,
        user => {
            return (
                user.shops,
                { cascade: true }
            )

        }
    )
    @JoinTable() // @JoinTable() is must for ManyToMany relation but not for ManyToOne
    members: UserEntity[];

    @ManyToOne(() => UserEntity)
    @JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
    created_by: UserEntity;
}