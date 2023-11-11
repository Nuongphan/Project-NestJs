import { Order } from 'src/modules/orders/database/entity/order.entity';
import { Products } from 'src/modules/products/database/entity/products.entity';
import { Users } from 'src/modules/users/database/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, } from 'typeorm';

@Entity('orderitems')
export class OrderItem {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    productName: string;

    @Column()
    price: number;

    @Column("text")
    thumnail: string;

    @Column('productId')
    productId: number;

    @Column('orderId')
    orderId: number;

    @ManyToOne(() => Products, (product) => product.cart)
    product: Products

    @ManyToOne(() => Order, (order) => order.orderItem)
    order: Order; 
    
}
