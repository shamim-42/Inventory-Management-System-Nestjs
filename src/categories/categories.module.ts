import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from './categories.entity'
import { CategoriesResolvers } from './categories.resolvers';
import { CategoriesService } from './categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  providers: [CategoriesService, CategoriesResolvers],
  exports: [CategoriesService]
})
export class CategoriesModule {}