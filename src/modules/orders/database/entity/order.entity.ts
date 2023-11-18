import { Address } from 'src/modules/addresses/database/entity/addresses.entity';
import { OrderItem } from 'src/modules/order-item/database/entity/order-item.entity';
import { Users } from 'src/modules/users/database/entity/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, } from 'typeorm';

@Entity('orders')
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: "Pending"})
    status: string;

    @Column()
    totalAmount: number;

    @Column()
    shippingFee: number;

    @Column("userId")
    userId: number;

    @Column("addressId")
    addressId: number;

    @Column()
    orderDate: Date;

    @ManyToOne(() => Users, (user) => user.order)
    user: Users

    @ManyToOne(() => Address, (address) => address.order)
    address: Address

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItem: OrderItem[]
    
}

