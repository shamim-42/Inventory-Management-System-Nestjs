import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from "./role.entity";

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(RoleEntity)
        // @InjectRepository(RoleEntity)
        private readonly userRoleRepository: Repository<RoleEntity>,
        // private readonly roleRepository: Repository<RoleEntity>,
    ) { }

    create(user: RoleEntity): Promise<RoleEntity> {
        return this.userRoleRepository.save(user);
    }

    findAll(): Promise<RoleEntity[]> {
        return this.userRoleRepository.find();
    }

    findOneById(id: number): Promise<RoleEntity> {
        return this.userRoleRepository.findOne(id);
    }

    updateOneById(id: number, data: RoleEntity) {
        let user = Object.setPrototypeOf(data, {});
        return this.userRoleRepository.update(id, { ...user });
        // const qb = this.userRoleRepository.createQueryBuilder('user');
        // return qb.update(RoleEntity).setParameters(user).where("user.id = :id", { id: uid }).execute();
    }

    delOneById(id: number) {
        return this.userRoleRepository.delete(id);
    }

    ///// ROLE /////
    // findAllRoles(): Promise<RoleEntity[]> {
    //     return this.roleRepository.find();
    // }

    // findRole(id: number): Promise<RoleEntity> {
    //     return this.roleRepository.findOneById(id);
    // }

    // createRole(role: RoleEntity): Promise<RoleEntity> {
    //     return this.roleRepository.save(role)
    // }

    // updateRoleById(id: number, data: RoleEntity) {
    //     let role = Object.setPrototypeOf(data, {});
    //     return this.userRoleRepository.updateById(id, { ...role });
    //     // const qb = this.userRoleRepository.createQueryBuilder('user');
    //     // return qb.update(RoleEntity).setParameters(user).where("user.id = :id", { id: uid }).execute();
    // }

    // deleteRoleById(id: number) {
    //     return this.roleRepository.deleteById(id);
    // }
}