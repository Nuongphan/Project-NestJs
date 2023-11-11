import { Products } from 'src/modules/products/database/entity/products.entity';
import { Users } from 'src/modules/users/database/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, } from 'typeorm';

@Entity('carts')
export class Cart {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column('productId')
    productId: number;

    @Column('userId')
    userId: number;

    @ManyToOne(() => Products, (product) => product.cart)
    product: Products

    @ManyToOne(() => Users, (user) => user.cart)
    user: Users; 
}
