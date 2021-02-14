import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopService } from 'shop/shop.service';
import { ShopEntity } from 'shop/shop.entity';

@Injectable()
export class ProductService {

    constructor(
        // @Inject(forwardRef(() => ShopService))
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,

        @InjectRepository(ShopEntity)
        private readonly shopRepository: Repository<ShopEntity>,
    ) { }

    private toResponseObject(product: ProductEntity) {
        return {
            ...product,
            shop: product.shop,
        };
    }

    // async create(data: ProductEntity, shopId: Number): Promise<ProductEntity> {
    async create(data: ProductEntity, shopId: Number): Promise<any> {
        const shop = await this.shopRepository.findOne({ where: { id: shopId } })
        const product = this.productRepository.create({ ...data, shop: shop });
        await this.productRepository.save(product);
        return this.toResponseObject(product);
    }



    findAll(): Promise<ProductEntity[]> {
        return this.productRepository.find({
            relations: ['shop']
        });
    }



    findOneById(id: number): Promise<ProductEntity> {
        return this.productRepository.findOne({
            where: {
                id: id
            },
            relations: ['shop']
        });
    }


    updateOneById(id: number, data: ProductEntity) {
        let product = Object.setPrototypeOf(data, null);
        return this.productRepository.update(id, { ...product });
        // const qb = this.productRepository.createQueryBuilder('product');
        // return qb.update(ProductEntity).setParameters(product).where("product.id = :id", { id: id }).execute();
    }


    delOneById(id: number) {
        return this.productRepository.delete(id);
    }

}
