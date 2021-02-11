import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { CategoriesEntity } from "../categories/categories.entity";

@Entity()
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 16 })
    role: string // like superadmin, admin, user, contractor etc.
}