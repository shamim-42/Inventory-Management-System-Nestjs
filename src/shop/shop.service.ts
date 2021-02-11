import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductService } from "product/product.service";
import { Repository } from "typeorm";
import { ShopEntity } from "./shop.entity";

@Injectable()
export class ShopService {
    constructor(
        @Inject(forwardRef(() => ProductService))
        @InjectRepository(ShopEntity)
        private readonly shopRepository: Repository<ShopEntity>,
    ) { }

    create(shop: ShopEntity): Promise<ShopEntity> {
        return this.shopRepository.save(shop)
    }

    findAll(): Promise<ShopEntity[]> {
        return this.shopRepository.find();
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