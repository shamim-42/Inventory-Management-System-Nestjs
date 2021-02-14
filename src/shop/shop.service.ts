import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductService } from "product/product.service";
import { Repository } from "typeorm";
import { UserEntity } from "user/user.entity";
import { ShopEntity } from "./shop.entity";

@Injectable()
export class ShopService {
    constructor(
        // @Inject(forwardRef(() => ProductService))
        @InjectRepository(ShopEntity)
        private readonly shopRepository: Repository<ShopEntity>,
    ) { }

    private toResponseObject(shop: ShopEntity) {
        return {
            ...shop,
            products: shop.products,
        };
    }

    async create(data: ShopEntity, creatingUser: UserEntity): Promise<any> {
        const newShop = await this.shopRepository.create({ ...data })
        // newShop.members = [creatingUser]
        const createdShop = await this.shopRepository.save(newShop);
        console.log('sldkfjo')
        console.log(createdShop);
        return createdShop
    }

    findAll(): Promise<ShopEntity[]> {
        return this.shopRepository.find({
            relations: ['products']
        });
    }

    findOneById(id: number): Promise<ShopEntity> {
        return this.shopRepository.findOne(id);
    }

    updateOneById(id: number, data: ShopEntity) {
        let shop = Object.setPrototypeOf(data, {});
        return this.shopRepository.update(id, { ...shop });
    }

    delOneById(id: number) {
        return this.shopRepository.delete(id);
    }
}