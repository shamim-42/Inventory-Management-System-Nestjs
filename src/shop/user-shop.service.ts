import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShopEntity } from "./shop.entity";
import { UserShopEntity } from "./user-shop.entity";

@Injectable()
export class UserShopService {
    constructor(
        @InjectRepository(UserShopEntity)
        private readonly userShopsRepository: Repository<UserShopEntity>,
    ) { }

    // create(shop: UserShopEntity): Promise<UserShopEntity> {
    //     return this.userShopsRepository.save(shop)
    // }

    findAll(): Promise<UserShopEntity[]> {
        return this.userShopsRepository.find();
    }

    // findOneById(id: number): Promise<UserShopEntity> {
    //     return this.userShopsRepository.findOne(id);
    // }

    // updateOneById(id: number, data: UserShopEntity) {
    //     let user_shop_mapping = Object.setPrototypeOf(data, {});
    //     return this.userShopsRepository.update(id, { ...user_shop_mapping });
    // }

    // delOneById(id: number) {
    //     return this.userShopsRepository.delete(id);
    // }
}