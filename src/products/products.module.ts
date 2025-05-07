import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, JwtStrategy],
    imports: [
        TypeOrmModule.forFeature([Product, ProductImage]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
})
export class ProductsModule {}
