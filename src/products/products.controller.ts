import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, HttpCode, HttpStatus, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProductResponse } from './dto/product-response.dto';
import { Product } from './entities/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from 'src/common/upload.config';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    findAll(@Req() req) {
        const userId = (req.user as any).sIdUser;
        return this.productsService.findAll(userId);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    async create(@Body() dto: CreateProductDto, @Req() req) : Promise<ProductResponse<Product>>{
        const ownerId = (req.user as any).sIdUser;
        const product = await this.productsService.create(dto, ownerId);
        return { message: 'Producto creado', data: product };
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateProductDto,
    ) : Promise<ProductResponse<Product>> {
        const product = await this.productsService.update(id, dto);
        return { message: 'Producto actualizado', data: product };
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }


    @Post(':id/images')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Añade una URL de imagen a un producto' })
    @UseInterceptors(FileInterceptor('file', imageUploadOptions))
    async addImage(
        @Param('id') sIdProduct: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const image = await this.productsService.addImage(sIdProduct, file);
        return {
            message: 'Imagen agregada correctamente'
        };
    }
  
    @Get(':id/images')
    @ApiOperation({ summary: 'Lista todas las imágenes de un producto' })
    async findImages(@Param('id') id: string) {
        const images = await this.productsService.findImages(id);
        return { images };
    }
}
