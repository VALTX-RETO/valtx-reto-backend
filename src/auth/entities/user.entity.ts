// src/auth/user.entity.ts
import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    sIdUser: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    sEmail: string;

    /** Password hasheado con bcrypt */
    @Column({ type: 'varchar', length: 255 })
    sPassword: string;

    @CreateDateColumn({
        type: 'datetime2',
        default: () => 'GETDATE()',
    })
    dCreatedAt: Date;

    @OneToMany(() => Product, prod => prod.user)
    products: Product[];
}