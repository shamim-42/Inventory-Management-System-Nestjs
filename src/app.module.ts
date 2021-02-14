import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiModule } from './api.module';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { DateScalar } from 'shared/date.scalar';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from 'user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
    }),
    ApiModule,
    CategoriesModule,
    ProductModule,
    ShopModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [DateScalar],
})
export class AppModule {}
