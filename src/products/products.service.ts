import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly repo: Repository<Product>,

        @InjectRepository(ProductImage)
        private readonly imageRepo: Repository<ProductImage>,
    ) {}

    async create(data: CreateProductDto, ownerId: string): Promise<Product> {
        const product = this.repo.create({
            ...data,
            user: { sIdUser: ownerId },     // ← aquí inyectas realmente el owner
        });
        return this.repo.save(product);
    }

    findAll(): Promise<Product[]> {
        return this.repo.find({
            relations: ['images', 'user'],
        });
    }

    async findOne(sIdProduct: string): Promise<Product> {
        const product = await this.repo.findOne({
            where: { sIdProduct },
            select: {
                // campos del producto
                sIdProduct: true,
                sNombre:     true,
                sCategoria:  true,
                // para la relación user, solo estos subcampos:
                user: {
                  sIdUser:     true,
                  sEmail:      true,
                },
            },
            relations: ['images', 'user'],
        });
        if (!product) {
            throw new NotFoundException(`Producto ${sIdProduct} no encontrado`);
        }
        return product;
    }

    async update(sIdProduct: string, dto: UpdateProductDto): Promise<Product> {
        await this.repo.update(sIdProduct, dto);
        return this.findOne(sIdProduct);
    }

    async remove(sIdProduct: string) {
        const product = await this.findOne(sIdProduct);
        await this.repo.remove(product);
        return { message: 'Producto eliminado correctamente' };
    }


    async addImage(sIdProduct: string, file: Express.Multer.File) {
        const product = await this.findOne(sIdProduct);

        const url = `/uploads/${ file.filename }`;

        const image = this.imageRepo.create({
            sUrl: url,              // aquí no puede ser null
            product,                // inyecta la relación FK
        });

        if ( image ){
            await this.imageRepo.save(image);   
        }

        return {
            message: 'Imagen agregada correctamente',
        };
    }
    
    async findImages(sIdProduct: string): Promise<ProductImage[]> {
        await this.findOne(sIdProduct);
        return this.imageRepo.find({
            where: { product: { sIdProduct } },
        });
    }
}
