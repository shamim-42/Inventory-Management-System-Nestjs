import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoriesEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({ length: 127 })
    category: string;
}