
import { forwardRef, Inject, UseGuards } from "@nestjs/common";
import { Query, Mutation, Resolver, Args } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductService } from './product.service'
import { ProductEntity } from './product.entity'
// import { CategoryService } from "category/category.service";
import { CategoriesService } from "categories/categories.service";
import { ShopEntity } from "shop/shop.entity";
import { AuthGuard } from "shared/auth.gaurd";

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


    @Query('product')
    async findOneById(obj, args, context, info): Promise<ProductEntity> {
        const id = args['id']
        return await this.productsService.findOneById(id);
    }

    @Mutation('createProduct')
    @UseGuards(new AuthGuard())
    async create(
        @Args('data') data: any,
        @Args('shopId') shopId: Number,
    ): Promise<ProductEntity> {
        console.log(data);
        console.log(shopId);
        return this.productsService.create(data, shopId);
    }

    @Mutation('updateProduct')
    @UseGuards(new AuthGuard())
    async updateproduct(obj, args: { id: number, data: ProductEntity }, context, info): Promise<any> {
        return await this.productsService.updateOneById(args.id, args.data);
    }

    @Mutation('deleteProduct')
    @UseGuards(new AuthGuard())
    async deleteproduct(obj, args: { id: number }, context, info): Promise<any> {
        return await this.productsService.delOneById(args.id);
    }

}