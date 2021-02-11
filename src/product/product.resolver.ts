
import { forwardRef, Inject } from "@nestjs/common";
import { Query, Mutation, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductService } from './product.service'
import { ProductEntity } from './product.entity'
// import { CategoryService } from "category/category.service";
import { CategoriesService } from "categories/categories.service";
import { ShopEntity } from "shop/shop.entity";

@Resolver()
export class ProductResolver {
    constructor(
        // @Inject(forwardRef(() => ShopEntity))
        private readonly productsService: ProductService,
    ) { }

    @Query('products')
    async getCategories() {
        return await this.productsService.findAll();
    }


    // @Query('product')
    // async findOneById(obj, args, context, info): Promise<ProductEntity> {
    //     const id = args['id']
    //     return await this.productsService.findOneById(id);
    // }

    // @Mutation('createProduct')
    // async create(obj, args: { data: ProductEntity }, context, info): Promise<ProductEntity> {
    //     return this.productsService.create(args.data);
    // }

    // @Mutation('updateProduct')
    // async updateproduct(obj, args: { id: number, data: ProductEntity }, context, info): Promise<any> {
    //     return await this.productsService.updateOneById(args.id, args.data);
    // }

    // @Mutation('deleteProduct')
    // async deleteproduct(obj, args: { id: number }, context, info): Promise<any> {
    //     return await this.productsService.delOneById(args.id);
    // }

}