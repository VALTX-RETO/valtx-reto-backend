import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'Camiseta', description: 'Nombre del producto' })
    @IsString() @IsNotEmpty()
    sNombre: string;

    @ApiProperty({ example: 'Ropa', description: 'Categoría' })
    @IsString() @IsNotEmpty()
    sCategoria: string;
}
