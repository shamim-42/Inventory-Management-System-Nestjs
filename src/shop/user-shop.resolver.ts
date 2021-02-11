import { Query, Mutation, Resolver } from "@nestjs/graphql";
import { ShopEntity } from "./shop.entity";
import { ShopService } from "./shop.service";
import { UserShopEntity } from "./user-shop.entity";
import { UserShopService } from "./user-shop.service";

@Resolver('UserShops')
export class UserShopsResolvers {
    constructor(
        private readonly userShopService: UserShopService,
    ) { };

    @Query('usershops')
    async getUserShops(): Promise<UserShopEntity[]> {
        return await this.userShopService.findAll();
    }

    // @Query('usershop')
    // async getUserShop(obj, args, context, info): Promise<UserShopEntity> {
    //     return await this.userShopService.findOneById(args['id']);
    // }

    // @Mutation('createUserShop')
    // async create(obj, args: { data: UserShopEntity }, context, info): Promise<UserShopEntity> {
    //     return this.userShopService.create(args.data);
    // }

    // @Mutation('updateShop')
    // async updateShop(obj, args: { id: number, data: ShopEntity }, context, info): Promise<any> {
    //     return await this.shopService.updateOneById(args.id, args.data);
    // }

    // @Mutation('deleteShop')
    // async delShop(obj, args: { id: number }, context, info): Promise<any> {
    //     return await this.shopService.delOneById(args.id);
    // }
}