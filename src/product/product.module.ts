import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ProductEntity } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopModule } from 'shop/shop.module';

@Module({
    imports: [
        forwardRef(() => ShopModule),
        TypeOrmModule.forFeature([ProductEntity]),
    ],
    providers: [ProductResolver, ProductService],
    exports: [ProductService, ProductResolver]
})
export class ProductModule { }
