import { forwardRef, Inject } from "@nestjs/common";
import { Query, Mutation, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriesEntity } from "./categories.entity";
import { CategoriesService } from './categories.service'

@Resolver('Categories')
export class CategoriesResolvers {
    constructor(
        @Inject(forwardRef(() => CategoriesService))
        private readonly categoriesService: CategoriesService,
    ) { }

    @Query('categories')
    async getCategories() {
        return await this.categoriesService.findAll();
    }


    @Query('category')
    async findOneById(obj, args, context, info): Promise<CategoriesEntity> {

        const id = args['id']
        return await this.categoriesService.findOneById(id);
    }

    @Mutation('createCategory')
    async create(obj, args: { data: CategoriesEntity }, context, info): Promise<CategoriesEntity> {
        return this.categoriesService.create(args.data);
    }

    // @Mutation('updateCategory')
    // async updateUser(obj, args: { id: number, category: CategoriesEntity }, context, info): Promise<any> {
    //     return await this.categoriesService.updateOneById(args.id, args.category);
    // }

    @Mutation('delCategory')
    async delCategory(obj, args: { id: number }, context, info): Promise<any> {
        return await this.categoriesService.delOneById(args.id);
    }

}