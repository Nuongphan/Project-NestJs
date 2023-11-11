import { Category } from 'src/modules/categories/database/entity/categories.entity';
import { Products } from 'src/modules/products/database/entity/products.entity';
import { Users } from 'src/modules/users/database/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('favorites')
export class Favorite {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('productId')
    productId: number;

    @Column('userId')
    userId: number;

    @ManyToOne(()=> Users, (user)=> user.favorite)
    user: Users

    @ManyToOne(()=> Products, (product)=> product.favorite)
    product: Products
    
}