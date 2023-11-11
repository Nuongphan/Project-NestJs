import { Products } from 'src/modules/products/database/entity/products.entity';
import { Entity, Column, PrimaryGeneratedColumn,  ManyToOne } from 'typeorm';

@Entity('images')
export class Images {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imgSrc: string;

    @Column('productId')
    productId: number;

    @ManyToOne(() => Products, (product) => product.image)
    product: Products

}