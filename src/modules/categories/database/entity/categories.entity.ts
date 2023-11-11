import { Products } from 'src/modules/products/database/entity/products.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @OneToMany(() => Products, (product) => product.category, { cascade: true })
    product: Products[]
    
}