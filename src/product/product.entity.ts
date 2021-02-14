import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShopEntity } from "../shop/shop.entity";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 64 })
    code: string;

    @Column({ nullable: false })
    unit_price: number;

    @Column({ default: 0 })
    stock: number;

    @Column({ length: 255 })
    description: string;

    @ManyToOne(type => ShopEntity, shop => shop.products)
    @JoinColumn() // this decorator is optional for @ManyToOne, but required for @OneToOne
    shop: ShopEntity
}