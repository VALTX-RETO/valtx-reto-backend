import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { ProductImage } from './product-image.entity';

@Entity({ name: 'products' })

export class Product {
        @PrimaryGeneratedColumn('uuid')
        sIdProduct: string;
    
        @Column({ type: 'varchar', length: 255 })
        sNombre: string;
    
        @Column({ type: 'varchar', length: 100 })
        sCategoria: string;
    
        @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
        @JoinColumn({ name: 'sIdUser' })
        user: User;
    
        @OneToMany(() => ProductImage, (img) => img.product, { cascade: true })
        images: ProductImage[];
}
  