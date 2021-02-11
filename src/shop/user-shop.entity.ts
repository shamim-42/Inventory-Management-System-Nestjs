import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "user/role.entity";
import { UserEntity } from "user/user.entity";
import { ProductEntity } from "../product/product.entity";
import { ShopEntity } from "./shop.entity";

@Entity()
export class UserShopEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    user: UserEntity

    @ManyToOne(() => ShopEntity)
    shop: ShopEntity

    @ManyToOne(() => RoleEntity)
    role: RoleEntity
}