import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'product_images' })
export class ProductImage {
    @PrimaryGeneratedColumn('uuid')
    sIdImage: string;

    @Column({ type: 'varchar', length: 500 })
    sUrl: string;

    @ManyToOne(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sIdProduct' })
    product: Product;
}
