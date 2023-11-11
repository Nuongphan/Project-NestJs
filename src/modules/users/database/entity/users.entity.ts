
import { Exclude, Transform } from 'class-transformer';
import { Address } from 'src/modules/addresses/database/entity/addresses.entity';
import { Cart } from 'src/modules/carts/database/entity/carts.entity';
import { Favorite } from 'src/modules/favorites/database/entity/favorites.entity';
import { Order } from 'src/modules/orders/database/entity/order.entity';
import { Roles } from 'src/modules/roles/database/entity/roles.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('users')
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform((firstName) => firstName.value.toLowerCase())
    @Column()
    firstName: string;

    @Transform((lastName) => lastName.value.toLowerCase())
    @Column()
    lastName: string;

    @Exclude()
    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column("roleId")
    roleId: number;

    @Column({ default: 1 })
    rank: number;
 
    @Column({ default: 1 })
    status: number;

    @Column({ default: "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon-thumbnail.png" })
    avatar: string;

    @ManyToOne(() => Roles, (role) => role.user)
    role: Roles

    @OneToMany(() => Favorite, (favorite) => favorite.user, { cascade: true })
    favorite: Favorite[]

    @OneToMany(() => Address, (address) => address.user, { cascade: true })
    address: Address[]

    @OneToMany(() => Order, (order) => order.user)
    order: Order[]

    @OneToMany(() => Cart, (cart) => cart.user, { cascade: true })
    cart: Cart[]

}