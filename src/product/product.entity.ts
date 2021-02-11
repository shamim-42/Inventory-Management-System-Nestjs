import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShopEntity } from "../shop/shop.entity";

@Entity()
export class ProductEntity{
    @PrimaryGeneratedColumn() id: number;

    @Column({length: 255})
    name: string;

    @Column({length: 64})
    code: string;

    @Column({nullable: false})
    unit_price: number;

    @Column({default: 0})
    stock: number;

    @Column({length: 255})
    description: string;

    // @ManyToOne(()=>ShopEntity, shop => shop.products)
    // shop: ShopEntity
}