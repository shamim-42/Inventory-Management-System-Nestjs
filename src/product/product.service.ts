import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopService } from 'shop/shop.service';

@Injectable()
export class ProductService {

    constructor(
        @Inject(forwardRef(() => ShopService))
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) { }

    create(product: ProductEntity): Promise<ProductEntity> {
        return this.productRepository.save(product);
    }

    findAll(): Promise<ProductEntity[]> {
        return this.productRepository.find();
    }

    // findOneById(id: number): Promise<ProductEntity> {
    //     return this.productRepository.findOne(id);
    // }

    // updateOneById(id: number, data: ProductEntity) {
    //     console.log(data);
    //     let product = Object.setPrototypeOf(data, null);
    //     return this.productRepository.update(id, {...product});
    //     // const qb = this.productRepository.createQueryBuilder('product');
    //     // return qb.update(ProductEntity).setParameters(product).where("product.id = :id", { id: id }).execute();
    // }

    // delOneById(id: number) {
    //     return this.productRepository.delete(id);
    // }

}
