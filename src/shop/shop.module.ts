import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'product/product.entity';
import { ProductModule } from '../product/product.module';
import { ShopEntity } from './shop.entity';
import { ShopResolver } from './shop.resolver';
import { ShopService } from './shop.service';
// import { UserShopsEntity } from './user-shops.entity';

@Module({
    imports: [
        forwardRef(() => ProductModule),
        TypeOrmModule.forFeature([ShopEntity])
    ],
    providers: [ShopService, ShopResolver],
    exports: [ShopService]
})
export class ShopModule { }
