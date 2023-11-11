import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './database/entity/carts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartsRepository {

    constructor(@InjectRepository(Cart) private cartRepository: Repository<Cart>) { }

    async getCartByUser(idUser) {

        const userId = idUser.idUser
        return this.cartRepository
            .createQueryBuilder('cart')
            .innerJoinAndSelect('cart.product', 'product')
            .innerJoinAndSelect('product.category', 'category')
            .innerJoinAndSelect('product.image', 'image')
            .where('cart.userId = :userId', { userId })
            .getMany();

    }

    async productIncartUser(idUser, productId) {

        const userId = idUser.idUser;
        const productIdd = productId.productId
        const result = await this.cartRepository.findOne({ where: { productId: productIdd, userId: userId } })
        return result

    }

    async updateQuantityProduct(quantityProduct, id) {

        return await this.cartRepository.update(id, { quantity: quantityProduct })

    }
    
    async createCarts(body, idUser) {
console.log(body, idUser);

        return await this.cartRepository.save({ userId: idUser.idUser, quantity: body.quantity, productId: body.productId })
   
    }

    async changeQuantity(idCart, body) {

        return await this.cartRepository.update(idCart, { quantity: Number(body.quantity) })

    }

    async deleteCart(idCart) {

        return await this.cartRepository.delete(idCart)

    }

    async getCart(idCart) {

        return await this.cartRepository.findOne({ where: { id: idCart } })
        
    }

}