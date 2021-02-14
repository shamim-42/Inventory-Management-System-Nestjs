import { forwardRef, Inject, UseGuards } from "@nestjs/common";
import { Query, Mutation, Resolver } from "@nestjs/graphql";
import { ProductEntity } from "product/product.entity";
import { ProductService } from "product/product.service";
import { AuthGuard } from "shared/auth.gaurd";
import { ShopEntity } from "./shop.entity";
import { ShopService } from "./shop.service";
import { UserShopEntity } from "./user-shop.entity";
import { UserShopService } from "./user-shop.service";

@Resolver('Shop')
export class ShopResolver {
    constructor(
        private readonly shopService: ShopService,
    ) { };


    @Query('shops')
    async getShops(): Promise<ShopEntity[]> {
        return await this.shopService.findAll();
    }

    @Query('shop')
    async getShop(obj, args, context, info): Promise<ShopEntity> {
        const { id } = args;
        return await this.shopService.findOneById(id)
    }

    @Mutation('createShop')
    @UseGuards(new AuthGuard())
    async create(obj, args: { data: ShopEntity }, context, info): Promise<ShopEntity> {
        const { id: userId } = context.user
        const newShop = args.data
        const creatingUser = userId
        return this.shopService.create(newShop, creatingUser);
    }

    @Mutation('updateShop')
    @UseGuards(new AuthGuard())
    async updateShop(obj, args: { id: number, data: ShopEntity }, context, info): Promise<any> {
        return await this.shopService.updateOneById(args.id, args.data);
    }

    @Mutation('deleteShop')
    @UseGuards(new AuthGuard())
    async delShop(obj, args: { id: number }, context, info): Promise<any> {
        return await this.shopService.delOneById(args.id);
    }
}