import { Cart } from 'src/modules/carts/database/entity/carts.entity';
import { Category } from 'src/modules/categories/database/entity/categories.entity';
import { Favorite } from 'src/modules/favorites/database/entity/favorites.entity';
import { Images } from 'src/modules/images/database/entity/images.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity('products')
export class Products {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column({ type: 'int', unsigned: true })
    stock: number;

    @Column({ type: 'int', unsigned: true })
    price: number;

    @Column('text')
    description: string;

    @Column('categoryId')
    categoryId: number;


    @ManyToOne(() => Category, (category)=> category.product )
    category: Category

    @OneToMany(()=> Favorite, (favorite)=> favorite.product, {cascade: true} )
    favorite: Favorite[]

    @OneToMany(()=> Images, (image)=> image.product, {cascade: true} )
    image: Images[]
    
    @OneToMany(()=> Cart, (cart)=> cart.product, {cascade: true} )
    cart: Cart[]
    
}