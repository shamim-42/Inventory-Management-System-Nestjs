import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PrimaryColumn, Repository } from "typeorm";
import { CategoriesEntity } from "./categories.entity";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoriesEntity)
        private readonly categoryRepository: Repository<CategoriesEntity>,
    ) { }

    create(category: CategoriesEntity): Promise<CategoriesEntity> {
        return this.categoryRepository.save(category);
    }

    findAll(): Promise<CategoriesEntity[]> {
        return this.categoryRepository.find();
    }

    findOneById(uid: number): Promise<CategoriesEntity> {
        return this.categoryRepository.findOne(uid);
    }

    // updateOneById(uid: number, user: CategoriesEntity) {
    //     user = Object.setPrototypeOf(user, {});
    //     return this.categoryRepository.update(uid, user);
    //     // const qb = this.userRepository.createQueryBuilder('user');
    //     // return qb.update(CategoryEntity).setParameters(user).where("user.id = :id", { id: uid }).execute();
    // }

    delOneById(uid: number) {
        return this.categoryRepository.delete(uid);
    }
}